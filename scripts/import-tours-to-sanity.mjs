import fs from 'fs/promises';
import path from 'path';

const projectId = 'j7fa6cf0';
const dataset = 'production';
const apiVersion = '2026-04-03';

const sanityConfigPath = path.join(process.env.USERPROFILE || 'C:/Users/Administrator', '.config', 'sanity', 'config.json');
const sourceFile = 'C:/Users/Administrator/.openclaw/workspace/zsy-travel/scraped-tours.json';

function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96) || `tour-${Date.now()}`;
}

async function main() {
  const sanityConfig = JSON.parse(await fs.readFile(sanityConfigPath, 'utf8'));
  const token = sanityConfig.authToken;
  if (!token) throw new Error('Missing Sanity auth token');

  const raw = JSON.parse(await fs.readFile(sourceFile, 'utf8'));
  const tours = (raw.tours || []).slice(0, 12);
  if (!tours.length) throw new Error('No tours found in scraped-tours.json');

  const mutations = tours.map((tour, index) => {
    const itinerary = Array.isArray(tour.itinerary)
      ? tour.itinerary.map((dayItem, idx) => ({
          _key: `day-${dayItem.day || idx + 1}`,
          day: Number(dayItem.day || idx + 1),
          title: dayItem.title || `Day ${idx + 1}`,
          description: dayItem.description || dayItem.route || 'Travel itinerary details',
        }))
      : [];

    return {
      createOrReplace: {
        _id: `tour-${tour.id || index + 1}`,
        _type: 'tour',
        title: tour.title,
        slug: { _type: 'slug', current: slugify(tour.title) },
        price: Number(tour.price || tour.price_from || tour.priceMax || 0),
        duration: Number(tour.duration || tour.days || 0),
        description: (Array.isArray(tour.highlights) ? tour.highlights.slice(0, 2).join(' · ') : '') || tour.destination || 'Imported travel route',
        published: true,
        order: index,
        highlights: Array.isArray(tour.highlights) ? tour.highlights : [],
        itinerary,
      },
    };
  });

  const res = await fetch(`https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });

  const result = await res.text();
  if (!res.ok) throw new Error(`Sanity import failed: ${res.status} ${result}`);

  console.log(`Imported ${tours.length} tours to Sanity.`);
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
