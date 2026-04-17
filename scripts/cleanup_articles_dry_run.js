const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = process.env.SANITY_API_TOKEN || (fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : undefined);

const client = createClient({
  projectId: 'j7fa6cf0',
  dataset: 'production',
  apiVersion: '2026-04-03',
  useCdn: false,
  token,
});

const keepArticleSlugs = new Set([
  'first-time-in-china-where-to-start',
  'private-vs-group-tours-china',
  'how-to-build-a-multi-city-china-itinerary',
  'beijing-vs-shanghai',
  'best-time-to-visit-china',
]);

function localized(value) {
  if (!value) return '';
  if (typeof value === 'string') return value.trim();
  return String(value.en || value.zh || '').trim();
}

function looksDirty(article) {
  const slug = article.slug || '';
  const title = localized(article.title);

  if (!slug) return true;
  if (/^article-\d+$/i.test(slug)) return true;
  if (/测试|test/i.test(title)) return true;
  if (/测试|test/i.test(slug)) return true;
  return false;
}

function summarize(article) {
  return {
    _id: article._id,
    slug: article.slug,
    title: localized(article.title),
    contentBlockCount: Array.isArray(article.content) ? article.content.length : 0,
    hasImage: Boolean(article.mainImage),
  };
}

async function main() {
  const articles = await client.fetch(`*[_type == "article"] | order(_createdAt desc) { _id, title, content, mainImage, "slug": slug.current, _createdAt }`);

  const keep = [];
  const remove = [];
  const review = [];

  for (const article of articles) {
    const item = summarize(article);
    if (keepArticleSlugs.has(article.slug)) {
      keep.push({ ...item, reason: 'keepArticleSlugs' });
      continue;
    }
    if (looksDirty(article)) {
      remove.push({ ...item, reason: 'dirty slug/title' });
      continue;
    }
    review.push({ ...item, reason: 'not in keep list but not obviously dirty' });
  }

  const report = {
    generatedAt: new Date().toISOString(),
    counts: {
      total: articles.length,
      keep: keep.length,
      remove: remove.length,
      review: review.length,
    },
    keep,
    remove,
    review,
  };

  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
