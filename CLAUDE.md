# lazydev.sh

Personal portfolio + blog for Dawid Manikowski.

## Tech
- Astro 6, static output
- MDX blog posts in `src/content/blog/`
- Dark industrial design system in `src/styles/global.css`
- Cloudflare Pages deployment

## Structure
- `src/layouts/` — BaseLayout, PageLayout, BlogLayout
- `src/components/` — Header, Footer, Hero, About, ProjectCard, ExperienceTimeline, BlogPostCard, SEO
- `src/pages/` — index, projects, experience, blog/index, blog/[...slug], rss.xml
- `src/content.config.ts` — blog collection schema
- `src/styles/global.css` — design tokens and base styles

## Conventions
- No border-radius, no gradients — sharp industrial aesthetic
- Fonts: JetBrains Mono (headings), Inter (body) via Google Fonts
- Colors: bg `#0a0a0a`, accent `#f59e0b`, text `#e5e5e5`
- Blog posts use frontmatter: title, description, pubDate, tags, draft
