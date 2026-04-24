// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { readdir, readFile } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Build a {url -> lastmod} map of blog posts by reading frontmatter directly.
// We cannot use astro:content here — it is a virtual module only available
// inside Astro pages/components, not at config-load time.
async function buildPostLastmodMap(siteUrl) {
  const blogDir = join(__dirname, 'src/content/blog');
  const map = new Map();

  let files;
  try {
    files = await readdir(blogDir);
  } catch {
    return map;
  }

  for (const file of files) {
    if (!/\.(md|mdx)$/.test(file)) continue;

    const raw = await readFile(join(blogDir, file), 'utf8');

    // Extract frontmatter block between the first pair of ---
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) continue;

    const fm = fmMatch[1];

    // Skip drafts
    if (/^\s*draft\s*:\s*true/m.test(fm)) continue;

    // Parse updatedDate or pubDate (ISO / YYYY-MM-DD string or quoted)
    const updatedMatch = fm.match(/^\s*updatedDate\s*:\s*["']?([^\s"'\r\n]+)["']?/m);
    const pubMatch = fm.match(/^\s*pubDate\s*:\s*["']?([^\s"'\r\n]+)["']?/m);

    const dateStr = updatedMatch ? updatedMatch[1] : pubMatch ? pubMatch[1] : null;
    if (!dateStr) continue;

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) continue;

    // Slug = filename without extension
    const slug = basename(file).replace(/\.(md|mdx)$/, '');
    const absUrl = new URL(`/blog/${slug}/`, siteUrl).toString();
    map.set(absUrl, date.toISOString());
  }

  return map;
}

const SITE = 'https://lazydev.sh';
const postLastmod = await buildPostLastmodMap(SITE);

export default defineConfig({
  site: SITE,
  integrations: [
    mermaid({
      theme: 'dark',
      autoTheme: false,
    }),
    mdx(),
    sitemap({
      serialize(item) {
        const hit = postLastmod.get(item.url);
        if (hit) return { ...item, lastmod: hit };
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['heading-anchor'],
            'aria-label': 'Link to this section',
          },
          content: { type: 'text', value: '#' },
        },
      ],
    ],
  },
});
