// lib/sanity.ts - Sanity 客户端配置
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: apiVersion.replace(/-/g, '-'), // 确保格式正确
  useCdn: false, // 开发环境关闭 CDN 以获取实时数据
});

// Sanity 图片 URL 构建器
export function imageUrlFor(source: any, width = 800) {
  if (!source?._ref) {
    return 'https://images.unsplash.com/photo-1548685913-fe6678babe8d?w=800';
  }
  
  const src = source._ref || source;
  // 提取 asset ID: image-xxxxxxxxxxxxxx-123x123-abc123 -> xxxxxxxxxxxxxx
  const match = src.match(/image-([a-f0-9]+)-\d+-\w+/);
  const assetId = match ? match[1] : src.replace('image-', '').split('-')[0];
  
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}.jpg?w=${width}&auto=format`;
}

// 获取所有旅游套餐
export async function getTours() {
  try {
    const tours = await client.fetch(`
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
    return tours;
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
}

// 获取单个旅游套餐详情
export async function getTourBySlug(slug: string) {
  try {
    const tour = await client.fetch(`
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
    return tour;
  } catch (error) {
    console.error('Error fetching tour by slug:', error);
    return null;
  }
}

// 获取所有攻略文章
export async function getArticles() {
  try {
    const articles = await client.fetch(`
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
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// 获取单个文章详情
export async function getArticleBySlug(slug: string) {
  try {
    const article = await client.fetch(`
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
    return article;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

// 获取全局设置
export async function getSiteSettings() {
  try {
    const settings = await client.fetch(`
      *[_type == "siteSettings"][0] {
        _id,
        siteTitle,
        siteDescription,
        heroImage,
        contactEmail,
        contactPhone,
        wechat,
        address
      }
    `);
    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

// 获取首页配置
export async function getHomeSettings() {
  try {
    const settings = await client.fetch(`
      *[_type == "homeSettings"][0] {
        _id,
        heroTitle,
        heroSubtitle,
        heroImage,
        showDestinations,
        showTours,
        showArticles,
        "featuredTourIds": featuredTourIds[]->{_id, title, "slug": slug.current}
      }
    `);
    return settings;
  } catch (error) {
    console.error('Error fetching home settings:', error);
    return null;
  }
}

// 获取热门目的地
export async function getDestinations() {
  try {
    const destinations = await client.fetch(`
      *[_type == "destination" && published == true] | order(order asc) {
        _id,
        name,
        "slug": slug.current,
        description,
        image,
        order
      }
    `);
    return destinations;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}

