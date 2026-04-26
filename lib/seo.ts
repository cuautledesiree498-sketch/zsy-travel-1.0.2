export const SITE_URL = 'https://infinitravel.net';

export type SeoBreadcrumbItem = {
  name: string;
  url: string;
};

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoItemListEntry = {
  name: string;
  url: string;
  description?: string;
};

export function toAbsoluteUrl(pathOrUrl: string, baseUrl = SITE_URL) {
  const value = pathOrUrl.trim();

  if (!value) return baseUrl;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('//')) return `https:${value}`;

  return new URL(value, baseUrl).toString();
}

function appendLang(pathname: string, lang: 'en' | 'zh') {
  const [pathWithQuery, hash = ''] = pathname.split('#');
  const [path, query = ''] = pathWithQuery.split('?');
  const params = new URLSearchParams(query);

  if (lang === 'en') {
    params.delete('lang');
  } else {
    params.set('lang', 'zh');
  }

  const search = params.toString();
  return `${path || '/'}${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
}

export function buildOrganizationJsonLd({
  name,
  description,
  email,
  url = SITE_URL,
}: {
  name: string;
  description?: string;
  email?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    description,
    contactPoint: email
      ? [
          {
            '@type': 'ContactPoint',
            contactType: 'travel inquiries',
            availableLanguage: ['en', 'zh'],
            email,
          },
        ]
      : undefined,
  };
}

export function buildWebSiteJsonLd({
  name,
  description,
  url = SITE_URL,
}: {
  name: string;
  description?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    inLanguage: ['en', 'zh'],
  };
}

export function buildLocalizedAlternates(pathname: string, lang: 'en' | 'zh' = 'en') {
  const normalizedPath = pathname ? (pathname.startsWith('/') ? pathname : `/${pathname}`) : '/';
  const enPath = appendLang(normalizedPath, 'en');
  const zhPath = appendLang(normalizedPath, 'zh');
  const canonical = lang === 'zh' ? zhPath : enPath;

  return {
    canonical,
    languages: {
      en: enPath,
      zh: zhPath,
    },
  };
}

export function buildFaqJsonLd(items: SeoFaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(items: SeoBreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.url),
    })),
  };
}

export function buildArticleJsonLd({
  headline,
  description,
  image,
  url,
  author,
  datePublished,
  dateModified,
}: {
  headline: string;
  description?: string;
  image?: string;
  url?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    image: image ? [image] : undefined,
    url,
    author: author
      ? {
          '@type': 'Person',
          name: author,
        }
      : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: ['en', 'zh'],
  };
}

export function buildItemListJsonLd(name: string, items: SeoItemListEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      description: item.description,
      item: toAbsoluteUrl(item.url),
    })),
  };
}
