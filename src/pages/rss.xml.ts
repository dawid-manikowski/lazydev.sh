import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import type { APIContext } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getContainerRenderer } from '@astrojs/mdx';
import { loadRenderers } from 'astro:container';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const renderers = await loadRenderers([getContainerRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const items = await Promise.all(
    posts
      .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime())
      .map(async (post) => {
        const { Content } = await render(post);
        const html = await container.renderToString(Content);
        return {
          title: post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description,
          link: `/blog/${post.id}/`,
          content: html,
        };
      })
  );

  return rss({
    title: 'lazydev.sh',
    description: 'Writing about SRE, infrastructure as code, and reliability engineering.',
    site: context.site!,
    items,
    customData: `<language>en-us</language>`,
  });
}
