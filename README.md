# lazydev.sh

Personal portfolio and technical blog. Built with Astro, hosted on Cloudflare Pages.

## Stack

- **Framework**: Astro 6 (static output)
- **Blog**: MDX via `@astrojs/mdx`
- **Hosting**: Cloudflare Pages (auto-deploy from `main`)
- **Design**: Dark industrial theme

## Development

```sh
npm install
npm run dev       # localhost:4321
npm run build     # static output to dist/
npm run preview   # preview production build
```

## Blog Posts

Add MDX files to `src/content/blog/`:

```mdx
---
title: "Post Title"
description: "Short description"
pubDate: "2026-03-14"
tags: ["terraform", "sre"]
---

Your content here.
```

## Deployment

Cloudflare Pages is connected to this repo. Push to `main` to deploy.

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22 (`NODE_VERSION=22`)
