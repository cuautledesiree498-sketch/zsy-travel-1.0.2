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
  'how-many-days-for-china-trip',
  'china-travel-planning-mistakes',
  'is-xinjiang-right-for-first-trip',
]);

function localized(value) {
  if (!value) return '';
  if (typeof value === 'string') return value.trim();
  return String(value.en || value.zh || '').trim();
}

function shouldRemove(article) {
  const slug = article.slug || '';
  const title = localized(article.title);

  if (keepArticleSlugs.has(slug)) return false;
  if (!slug) return true;
  if (/^article-\d+$/i.test(slug)) return true;
  if (/测试|test/i.test(title)) return true;
  if (/测试|test/i.test(slug)) return true;
  if (slug === 'yunnan-or-sichuan') return true;
  if (slug === 'luxury-travel-in-china') return true;
  return false;
}

async function main() {
  const articles = await client.fetch(`*[_type == "article"] | order(_createdAt desc) { _id, title, "slug": slug.current }`);
  const toRemove = articles.filter(shouldRemove);

  if (toRemove.length === 0) {
    console.log(JSON.stringify({ deleted: 0, ids: [] }, null, 2));
    return;
  }

  const tx = client.transaction();
  for (const article of toRemove) {
    tx.delete(article._id);
  }

  const result = await tx.commit();
  console.log(JSON.stringify({
    deleted: toRemove.length,
    ids: toRemove.map((item) => ({ _id: item._id, slug: item.slug, title: localized(item.title) })),
    transactionId: result.transactionId || null,
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
