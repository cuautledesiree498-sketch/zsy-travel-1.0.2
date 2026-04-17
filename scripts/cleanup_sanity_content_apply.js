const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenPath = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = fs.readFileSync(tokenPath, 'utf8').trim();

if (!token) {
  throw new Error('sanity_token.txt is empty');
}

const client = createClient({
  projectId: 'j7fa6cf0',
  dataset: 'production',
  apiVersion: '2026-04-03',
  useCdn: false,
  token,
});

const keepTourIds = new Set([
  'tour-20-day-china-journey',
  'tour-xinjiang-landscape-journey',
  'tour-yunnan-leisure-journey',
]);

const keepDestinationSlugs = new Set([
  'beijing',
  'shanghai',
  'xian',
  'chengdu',
  'chongqing',
  'xinjiang',
  'yunnan',
  'guilin',
  'zhangjiajie',
  'shenzhen',
]);

function localizedText(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return [value.en, value.zh].filter(Boolean).join(' ');
}

function isDirtyTour(tour) {
  const title = localizedText(tour.title);
  const slug = String(tour.slug || '');
  if (keepTourIds.has(tour._id)) return false;
  if (/^tour-\d+$/.test(slug)) return true;
  if (/测试|test/i.test(title) || /测试|test/i.test(slug)) return true;
  if (/跟团游|纯玩|一价全含|一价全包|双飞|双动|无自费|往返机票|豪华酒店|特色客栈|精品团/.test(title)) return true;
  if (tour._id.startsWith('tour-') && /^tour-\d+/.test(tour._id)) return true;
  return true;
}

function isDirtyDestination(destination) {
  const slug = String(destination.slug || '');
  if (keepDestinationSlugs.has(slug)) return false;
  if (/^destination-\d+$/.test(slug)) return true;
  return true;
}

async function main() {
  const tours = await client.fetch(`*[_type == "tour"] { _id, title, "slug": slug.current, published, _createdAt }`);
  const destinations = await client.fetch(`*[_type == "destination"] { _id, name, "slug": slug.current, published, _createdAt }`);

  const deleteTours = tours.filter(isDirtyTour);
  const keepTours = tours.filter((item) => !isDirtyTour(item));
  const deleteDestinations = destinations.filter(isDirtyDestination);
  const keepDestinations = destinations.filter((item) => !isDirtyDestination(item));

  console.log(JSON.stringify({
    keepTours: keepTours.map((t) => ({ _id: t._id, slug: t.slug, title: t.title })),
    deleteTours: deleteTours.map((t) => ({ _id: t._id, slug: t.slug, title: t.title })),
    keepDestinations: keepDestinations.map((d) => ({ _id: d._id, slug: d.slug, name: d.name })),
    deleteDestinations: deleteDestinations.map((d) => ({ _id: d._id, slug: d.slug, name: d.name })),
  }, null, 2));

  const tx = client.transaction();
  for (const item of [...deleteTours, ...deleteDestinations]) {
    tx.delete(item._id);
  }
  const result = await tx.commit();
  console.log(JSON.stringify({ deleted: deleteTours.length + deleteDestinations.length, result }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
