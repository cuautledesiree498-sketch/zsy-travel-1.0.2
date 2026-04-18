// lib/sanity.ts - Sanity 客户端配置
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: apiVersion.replace(/-/g, '-'),
  useCdn: false,
});

const fallbackImages = {
  hero: '/media/custom/hero/hero-nature.jpg',
  tour: '/media/custom/hero/hero-nature.jpg',
  article: '/media/custom/hero/hero-nature.jpg',
  destination: '/media/custom/hero/hero-nature.jpg',
  icon: '/media/custom/hero/hero-nature.jpg',
};

const destinationFallbackBySlug: Record<string, string> = {
  beijing: '/media/custom/destinations/beijing/beijing-selected.jpg',
  shanghai: '/media/custom/destinations/shanghai/shanghai-selected.jpg',
  shenzhen: '/media/custom/destinations/shenzhen/shenzhen-selected.jpg',
  chengdu: '/media/custom/destinations/chengdu/chengdu-selected.jpg',
  xinjiang: '/media/custom/destinations/xinjiang/xinjiang-selected.jpg',
  xian: '/media/custom/destinations/xian/xian-selected.jpg',
  'xi-an': '/media/custom/destinations/xian/xian-selected.jpg',
  shaanxi: '/media/custom/destinations/xian/xian-selected.jpg',
  chongqing: '/media/custom/destinations/chongqing/chongqing-selected.jpg',
  yunnan: '/media/custom/destinations/yunnan/yunnan-selected.jpg',
  guilin: '/media/custom/destinations/guilin/guilin-selected.jpg',
  zhangjiajie: '/media/custom/destinations/zhangjiajie/zhangjiajie-selected.jpg',
};

const forceLocalDestinationImageSlugs = new Set([
  'beijing',
  'shanghai',
  'shenzhen',
  'chengdu',
  'xinjiang',
  'xian',
  'xi-an',
  'shaanxi',
  'chongqing',
  'yunnan',
  'guilin',
  'zhangjiajie',
]);

export function normalizeDestinationSlug(value?: string | null) {
  return (value || '')
    .toLowerCase()
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .split('?')[0]
    .split('#')[0]
    .split('/')
    .filter(Boolean)
    .pop()
    ?.replace(/%20/g, '-')
    ?.replace(/\s+/g, '-') || '';
}

export function shouldForceLocalDestinationImage(slugOrPath?: string | null) {
  const slug = normalizeDestinationSlug(slugOrPath);
  return forceLocalDestinationImageSlugs.has(slug);
}

export function getDestinationFallbackImage(slugOrPath?: string | null) {
  const slug = normalizeDestinationSlug(slugOrPath);
  return destinationFallbackBySlug[slug] || fallbackImages.destination;
}

export function imageUrlFor(source: any, width = 800, fallback = fallbackImages.hero) {
  if (!source?._ref) {
    return fallback;
  }

  const src = source._ref || source;
  const match = src.match(/image-([a-f0-9]+)-\d+-\w+/);
  const assetId = match ? match[1] : src.replace('image-', '').split('-')[0];

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}.jpg?w=${width}&auto=format`;
}

export { fallbackImages, destinationFallbackBySlug };

export async function getTours() {
  try {
    return await client.fetch(`
      *[_type == "tour" && published == true] | order(order asc, _createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        price,
        duration,
        image,
        description,
        tagline,
        idealFor,
        travelStyle,
        howToUse,
        bestTime,
        extensions,
        published,
        order,
        highlights,
        itinerary,
        _createdAt
      }
    `);
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
}

export async function getTourBySlug(slug: string) {
  try {
    return await client.fetch(`
      *[_type == "tour" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        price,
        duration,
        image,
        description,
        tagline,
        idealFor,
        travelStyle,
        howToUse,
        bestTime,
        extensions,
        published,
        order,
        highlights,
        itinerary,
        _createdAt
      }
    `, { slug });
  } catch (error) {
    console.error('Error fetching tour by slug:', error);
    return null;
  }
}

export async function getArticles() {
  try {
    return await client.fetch(`
      *[_type == "article" && published == true] | order(publishDate desc) {
        _id,
        title,
        "slug": slug.current,
        author,
        publishDate,
        excerpt,
        tagline,
        heroFacts,
        mainImage,
        content,
        _createdAt
      }
    `);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    return await client.fetch(`
      *[_type == "article" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        author,
        publishDate,
        excerpt,
        tagline,
        heroFacts,
        content,
        mainImage,
        published,
        _createdAt
      }
    `, { slug });
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

export async function getSiteSettings() {
  try {
    return await client.fetch(`
      *[_type == "siteSettings"][0] {
        _id,
        siteTitle,
        siteDescription,
        heroBackground,
        contactEmail,
        contactPhone,
        whatsappNumber,
        wechat,
        address,
        headerCtaText,
        headerCtaLink,
        footerIntro,
        socialLinks[]{...},
        aboutHeroTitle,
        aboutHeroSubtitle,
        aboutIntroTitle,
        aboutIntroBody,
        aboutPositioningTitle,
        aboutPositioningItems[],
        aboutWhyTitle,
        aboutWhyItems[],
        aboutCtaTitle,
        aboutCtaSubtitle,
        contactHeroTitle,
        contactHeroSubtitle,
        contactGuideTitle,
        contactGuideItems[],
        contactStatusNote,
        contactCtaTitle,
        contactCtaSubtitle,
        faqTitle,
        faqSubtitle,
        faqCtaTitle,
        faqCtaSubtitle,
        faqItems[]
      }
    `);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export async function getHomeSettings() {
  try {
    return await client.fetch(`
      *[_type == "homeSettings"][0] {
        _id,
        pageTitle,
        sections[]{
          ...,
          selectedTours[]->{
            _id,
            title,
            "slug": slug.current,
            price,
            duration,
            image,
            description,
            published,
            order,
            highlights,
            itinerary,
            _createdAt
          },
          selectedArticles[]->{
            _id,
            title,
            "slug": slug.current,
            author,
            publishDate,
            mainImage,
            content,
            published,
            _createdAt
          },
          items[]{
            ...,
            uploadedIcon,
            backgroundImage
          },
          backgroundImage
        }
      }
    `);
  } catch (error) {
    console.error('Error fetching home settings:', error);
    return null;
  }
}

export async function getDestinations() {
  try {
    return await client.fetch(`
      *[_type == "destination" && published == true] | order(order asc, _createdAt desc) {
        _id,
        name,
        "slug": slug.current,
        tagline,
        description,
        image,
        highlights,
        idealFor,
        bestTime,
        suggestedStay,
        heroFacts,
        experiences,
        samplePlan,
        gallery,
        published,
        order,
        _createdAt
      }
    `);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}

export async function getDestinationBySlug(slug: string) {
  try {
    return await client.fetch(`
      *[_type == "destination" && slug.current == $slug][0] {
        _id,
        name,
        "slug": slug.current,
        tagline,
        description,
        image,
        highlights,
        idealFor,
        bestTime,
        suggestedStay,
        heroFacts,
        experiences,
        samplePlan,
        gallery,
        published,
        order,
        _createdAt
      }
    `, { slug });
  } catch (error) {
    console.error('Error fetching destination by slug:', error);
    return null;
  }
}
