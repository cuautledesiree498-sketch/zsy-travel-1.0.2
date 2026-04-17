const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const DRY_RUN = process.argv.includes('--dry-run');
const APPLY = process.argv.includes('--apply');

const tokenFromEnv = process.env.SANITY_API_TOKEN;
const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const tokenFromFile = fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : '';
const token = tokenFromEnv || tokenFromFile || undefined;

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
  if (!DRY_RUN && !APPLY) {
    console.error('Use --dry-run or --apply');
    process.exit(1);
  }

  const tours = await client.fetch(`*[_type == "tour"] { _id, title, "slug": slug.current, published, _createdAt }`);
  const destinations = await client.fetch(`*[_type == "destination"] { _id, name, "slug": slug.current, published, _createdAt }`);

  const deleteTours = tours.filter(isDirtyTour);
  const keepTours = tours.filter((item) => !isDirtyTour(item));
  const deleteDestinations = destinations.filter(isDirtyDestination);
  const keepDestinations = destinations.filter((item) => !isDirtyDestination(item));

  const summary = {
    mode: DRY_RUN ? 'dry-run' : 'apply',
    tokenSource: tokenFromEnv ? 'env' : tokenFromFile ? 'file' : 'none',
    counts: {
      keepTours: keepTours.length,
      deleteTours: deleteTours.length,
      keepDestinations: keepDestinations.length,
      deleteDestinations: deleteDestinations.length,
    },
    keepTours: keepTours.map((t) => ({ _id: t._id, slug: t.slug, title: t.title })),
    deleteTours: deleteTours.map((t) => ({ _id: t._id, slug: t.slug, title: t.title })),
    keepDestinations: keepDestinations.map((d) => ({ _id: d._id, slug: d.slug, name: d.name })),
    deleteDestinations: deleteDestinations.map((d) => ({ _id: d._id, slug: d.slug, name: d.name })),
  };

  console.log(JSON.stringify(summary, null, 2));

  if (APPLY) {
    if (!token) {
      throw new Error('SANITY_API_TOKEN or secrets/sanity_token.txt is required for --apply');
    }
    const tx = client.transaction();
    for (const item of [...deleteTours, ...deleteDestinations]) {
      tx.delete(item._id);
    }
    const result = await tx.commit();
    console.log(JSON.stringify({ deleted: deleteTours.length + deleteDestinations.length, result }, null, 2));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
