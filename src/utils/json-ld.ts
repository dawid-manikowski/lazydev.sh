const SITE = 'https://lazydev.sh';
const AUTHOR_NAME = 'Dawid Manikowski';
const AUTHOR_URL = SITE;

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_NAME,
    url: AUTHOR_URL,
    jobTitle: 'Senior Site Reliability Engineer',
    sameAs: [
      'https://github.com/dawid-manikowski',
      'https://www.linkedin.com/in/dawid-manikowski/',
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'lazydev.sh',
    url: SITE,
    author: { '@type': 'Person', name: AUTHOR_NAME, url: AUTHOR_URL },
  };
}

export interface BlogPostingInput {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  tags?: string[];
  ogImage?: string;
  readingTimeIso8601?: string;
}

export function blogPostingJsonLd(input: BlogPostingInput) {
  const url = `${SITE}/blog/${input.slug}/`;
  const image = input.ogImage ? new URL(input.ogImage, SITE).toString() : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    datePublished: input.publishedTime,
    ...(input.modifiedTime ? { dateModified: input.modifiedTime } : {}),
    author: { '@type': 'Person', name: input.author, url: AUTHOR_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    ...(image ? { image } : {}),
    ...(input.tags?.length ? { keywords: input.tags.join(', ') } : {}),
    ...(input.readingTimeIso8601 ? { timeRequired: input.readingTimeIso8601 } : {}),
    publisher: { '@type': 'Person', name: AUTHOR_NAME, url: AUTHOR_URL },
  };
}

export function breadcrumbJsonLd(postTitle: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
      {
        '@type': 'ListItem',
        position: 3,
        name: postTitle,
        item: `${SITE}/blog/${slug}/`,
      },
    ],
  };
}
