// lib/sanity.ts - Sanity 客户端配置
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: apiVersion.replace(/-/g, '-'),
  useCdn: false,
});

export function imageUrlFor(source: any, width = 800) {
  if (!source?._ref) {
    return 'https://images.unsplash.com/photo-1548685913-fe6678babe8d?w=800';
  }

  const src = source._ref || source;
  const match = src.match(/image-([a-f0-9]+)-\d+-\w+/);
  const assetId = match ? match[1] : src.replace('image-', '').split('-')[0];

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}.jpg?w=${width}&auto=format`;
}

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
        published,
        order,
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
        mainImage,
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
        heroImage,
        heroBackground,
        contactEmail,
        contactPhone,
        whatsappNumber,
        wechat,
        address,
        headerCtaText,
        headerCtaLink,
        footerIntro,
        socialLinks[],
        faqTitle,
        faqSubtitle,
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
            _createdAt
          },
          selectedArticles[]->{
            _id,
            title,
            "slug": slug.current,
            author,
            publishDate,
            mainImage,
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
      *[_type == "destination" && published == true] | order(order asc) {
        _id,
        name,
        "slug": slug.current,
        description,
        image,
        order
      }
    `);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}
