import type { AstroIntegration } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { ogTemplate } from '../lib/og-template';

interface PostMeta {
  id: string;
  title: string;
  draft: boolean;
  ogImage?: string;
}

async function readBlogPosts(blogDir: string): Promise<PostMeta[]> {
  let files: string[];
  try {
    files = await fs.readdir(blogDir);
  } catch {
    return [];
  }

  const posts: PostMeta[] = [];

  for (const file of files) {
    if (!/\.(md|mdx)$/.test(file)) continue;

    const raw = await fs.readFile(path.join(blogDir, file), 'utf8');

    // Extract frontmatter block between the first pair of ---
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) continue;

    const fm = fmMatch[1];

    // Skip drafts
    const isDraft = /^\s*draft\s*:\s*true/m.test(fm);

    // Parse title
    const titleMatch = fm.match(/^\s*title\s*:\s*["']?(.+?)["']?\s*$/m);
    if (!titleMatch) continue;
    const title = titleMatch[1].trim();

    // Parse ogImage override
    const ogImageMatch = fm.match(/^\s*ogImage\s*:\s*["']?([^\s"'\r\n]+)["']?/m);
    const ogImage = ogImageMatch ? ogImageMatch[1] : undefined;

    // Slug = filename without extension
    const id = path.basename(file).replace(/\.(md|mdx)$/, '');

    posts.push({ id, title, draft: isDraft, ogImage });
  }

  return posts;
}

export function ogImageIntegration(): AstroIntegration {
  return {
    name: 'lazydev:og-image',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(new URL('og/', dir));
        await fs.mkdir(outDir, { recursive: true });

        const here = fileURLToPath(new URL('.', import.meta.url));
        const fontsDir = path.resolve(here, '../assets/fonts');
        const [regular, bold] = await Promise.all([
          fs.readFile(path.join(fontsDir, 'JetBrainsMono-Regular.ttf')),
          fs.readFile(path.join(fontsDir, 'JetBrainsMono-Bold.ttf')),
        ]);

        const blogDir = path.resolve(here, '../content/blog');
        const posts = await readBlogPosts(blogDir);

        let generated = 0;
        for (const post of posts) {
          // Skip drafts
          if (post.draft) continue;
          // Skip posts that declare their own ogImage override.
          if (post.ogImage) continue;

          const svg = await satori(ogTemplate({ title: post.title }), {
            width: 1200,
            height: 630,
            fonts: [
              { name: 'JetBrainsMono', data: regular, weight: 400, style: 'normal' },
              { name: 'JetBrainsMono', data: bold, weight: 700, style: 'normal' },
            ],
          });

          const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
            .render()
            .asPng();

          await fs.writeFile(path.join(outDir, `${post.id}.png`), png);
          generated += 1;
        }

        logger.info(`og-image: generated ${generated} cards into ${outDir}`);
      },
    },
  };
}
