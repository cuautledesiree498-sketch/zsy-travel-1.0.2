const { createClient } = require('next-sanity');
const fs = require('fs');
const path = require('path');
const { apiVersion, dataset, projectId } = require('../sanity/env.ts');

const token = fs.readFileSync(path.join(process.cwd(), 'secrets', 'sanity_token.txt'), 'utf8').trim();
const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

const query = `{
  "siteSettings": *[_type == "siteSettings"][0]{
    _id,
    siteTitle,
    siteDescription,
    footerIntro,
    aboutHeroTitle,
    aboutHeroSubtitle,
    contactHeroTitle,
    contactHeroSubtitle,
    faqTitle,
    faqSubtitle,
    contactEmail,
    contactPhone,
    whatsappNumber,
    wechat,
    address,
    faqItems[]{question, answer}
  },
  "homeSettings": *[_type == "homeSettings"][0]{
    _id,
    pageTitle,
    sections[]{
      _type,
      anchorId,
      title,
      subtitle,
      viewMoreText,
      primaryButtonText,
      secondaryButtonText,
      items[]{title, description, linkText, quote, label, number},
      selectedTours[]->{title, description, highlights, itinerary},
      selectedArticles[]->{title, author, content}
    }
  },
  "tours": *[_type == "tour"] | order(_createdAt desc)[0...50]{
    _id,
    title,
    slug,
    description,
    highlights,
    itinerary,
    price,
    duration,
    published
  },
  "articles": *[_type == "article"] | order(_createdAt desc)[0...50]{
    _id,
    title,
    slug,
    author,
    content,
    published
  }
}`;

const suspiciousPatterns = [
  /Infinite Travel\s*\/\s*无限旅途/i,
  /ZSY Travel/i,
  /Infinite Journeys/i,
  /China Private Journeys/i,
  /To be added/i,
  /Coming soon/i,
  /to be filled/i,
  /test markers?/i,
  /待填写/,
  /待补充/,
  /1234890/,
  /1234872/,
  /All rights reserved/i,
  /Tailor-Made China Journeys/i,
  /Frequently Asked Questions/i,
  /About Us/i,
  /Contact\s*-\s*/i,
  /FAQ\s*-\s*/i,
  /Article title/i,
  /Case title/i,
  /Author/i,
  /Website Inquiry/i,
  /网站咨询表单提交/
];

const results = [];

function walk(node, trail = []) {
  if (node == null) return;
  if (typeof node === 'string') {
    const matches = suspiciousPatterns.filter((re) => re.test(node)).map((re) => re.toString());
    if (matches.length) {
      results.push({ path: trail.join('.'), value: node, matches });
    }
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, index) => walk(item, [...trail, `[${index}]`]));
    return;
  }
  if (typeof node === 'object') {
    Object.entries(node).forEach(([key, value]) => walk(value, [...trail, key]));
  }
}

async function main() {
  const data = await client.fetch(query);
  walk(data);
  console.log(JSON.stringify({ count: results.length, results }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
