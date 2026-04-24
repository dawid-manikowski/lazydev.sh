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
- `src/utils/` — reading-time, json-ld helpers
- `src/lib/` — og-template (satori element builder)
- `src/integrations/` — og-image (build-time PNG card generator)
- `src/assets/fonts/` — vendored JetBrains Mono for satori rendering

## Conventions
- No border-radius, no gradients — sharp industrial aesthetic
- Fonts: JetBrains Mono (headings), Inter (body) via Google Fonts
- Colors: bg `#0a0a0a`, accent `#f59e0b`, text `#e5e5e5`
- Blog posts use frontmatter: title, description, pubDate, tags, draft (optional: updatedDate, author, ogImage)

## Blog content strategy

### Goal

Niche topical authority for long-tail Google + occasional organic community pickup. No active social promotion.

### Topical cluster

The blog's spine is four buckets. New posts should fit one of them; posts outside the cluster are acceptable as standalone islands.

1. **Celery + Valkey/Redis broker ops** (Pillar A, target ~6 posts over 2 years) — failure modes, patching, chord semantics, result backends, reaper behavior. Tags: `celery`, `valkey`, `redis`, `python`, `sre`.
2. **ECS as platform (self-managed, sidecar-heavy)** (Pillar B, target ~5 posts) — ECS beyond vanilla Fargate: cgroups v2, sidecars, task vs container limits, execute-command, self-managed runtimes. Tags: `ecs`, `aws`, `sre`, `containers`.
3. **Terramate in multi-region Terraform** (helper, target ~3 posts) — Terramate layouts, migrations, gotchas. Tags: `terraform`, `terramate`, `iac`.
4. **AI/MCP/LLM in SRE practice** (helper, target ~3 posts) — team adoption of MCP, investigation prompts as artifacts, assistant workflows. Tags: `ai`, `llm`, `mcp`, `sre`.

### Conventions

- **Title:** primary keyword in the first ~60 characters; real-problem phrasing (avoid "Lessons from...", "Notes on...", "My journey with...").
- **Slug:** 3-5 words, keyword-front, no filler.
- **Description (frontmatter):** sentence 1 = one-line summary with primary keyword; sentence 2 (optional) = unique angle.
- **Body:** TL;DR at the top; mix narrative and directly-queryable H2/H3 headings (at least 2-3 "Why X" / "How to Y" style per post).
- **Internal links:** each niche post links to 1-3 other niche posts where naturally relevant. Pillars A and B cross-link. Bucket 3 links to Pillar B where Terramate manages ECS. Bucket 4 links to pillars only with a concrete case. Broader-SRE islands do not cross-link into the cluster.
- **Keyword sanity-check before publishing:** paste the draft title into Google; scan autocomplete + "People also ask" + "Related searches"; adjust title/headings if nothing matches.

### Excludes (do not propose post topics from these areas)

Home Assistant / homelab; personal finance / JDG / ZUS / taxes; home renovation / family; generic Python / Django / AWS / Terraform intros; generic on-call narratives; internal employer products by name; handed-over work owned by other teams; topics without lived depth.

### Distribution

Deferred until the blog has 3-4 posts in the cluster. Then: submit to 3-5 curated newsletters per post from `docs/blog-newsletters.md`, chosen to match the post's bucket. Never more.

**Non-goals:** self-submissions to HN / Reddit / Lobsters; cross-posting to dev.to / Hashnode / Medium; posting to X / Bluesky / Mastodon.
