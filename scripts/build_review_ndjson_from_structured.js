const fs = require('fs');
const path = require('path');

const root = 'C:/Users/Administrator/travel-website/my-travel-site/scripts/content_pack_v2026-04-11/structured';

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
}

function toLocalized(v) {
  return { en: v?.en || '', zh: v?.zh || '' };
}

function buildDestinationDoc(item, index) {
  return {
    _type: 'destination',
    name: toLocalized(item.name),
    slug: { current: item.slug },
    tagline: toLocalized(item.tagline),
    description: toLocalized(item.description),
    highlights: (item.highlights || []).map(toLocalized),
    idealFor: toLocalized(item.idealFor),
    bestTime: toLocalized(item.bestTime),
    suggestedStay: toLocalized(item.suggestedStay),
    heroFacts: (item.heroFacts || []).map((x) => ({ label: toLocalized(x.label), value: toLocalized(x.value) })),
    experiences: (item.experiences || []).map((x) => ({ title: toLocalized(x.title), description: toLocalized(x.description) })),
    samplePlan: (item.samplePlan || []).map((x) => ({ title: toLocalized(x.title), description: toLocalized(x.description) })),
    gallery: [],
    published: true,
    order: index + 1,
  };
}

function inferTourMeta(slug) {
  const map = {
    'classic-china-first-journey': { price: 1890, duration: 8 },
    'golden-triangle-china': { price: 2390, duration: 8 },
    'imperial-china-modern-skylines': { price: 2190, duration: 7 },
    'panda-and-spice-discovery': { price: 1490, duration: 5 },
    'southwest-china-escape': { price: 1990, duration: 5 },
    'silk-road-style-xinjiang': { price: 3290, duration: 7 },
    'yunnan-culture-landscape-journey': { price: 2090, duration: 5 },
    'scenic-china-nature-sampler': { price: 2290, duration: 5 },
    'china-luxury-city-nature-contrast': { price: 3590, duration: 6 },
    'multi-city-china-signature-journey': { price: 2690, duration: 8 },
  };
  return map[slug] || { price: 1990, duration: 6 };
}

function buildTourDoc(item, index) {
  const meta = inferTourMeta(item.slug);
  return {
    _type: 'tour',
    title: toLocalized(item.title),
    slug: { current: item.slug },
    price: meta.price,
    duration: meta.duration,
    tagline: toLocalized(item.tagline),
    description: toLocalized(item.description),
    idealFor: toLocalized(item.idealFor),
    travelStyle: toLocalized(item.travelStyle),
    howToUse: toLocalized(item.howToUse),
    bestTime: toLocalized(item.bestTime),
    extensions: toLocalized(item.extensions),
    published: true,
    order: index + 1,
    highlights: (item.highlights || []).map(toLocalized),
    itinerary: (item.itinerary || []).map((x, i) => ({
      day: x.day || i + 1,
      title: toLocalized(x.title),
      description: toLocalized(x.description),
    })),
  };
}

const destinations = readJson('destinations.structured.json');
const tours = readJson('tours.structured.json');

const destLines = destinations.map(buildDestinationDoc).map((x) => JSON.stringify(x));
const tourLines = tours.map(buildTourDoc).map((x) => JSON.stringify(x));

fs.writeFileSync(path.join(root, 'destination-seeds.review.ndjson'), destLines.join('\n') + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'tour-seeds.review.ndjson'), tourLines.join('\n') + '\n', 'utf8');

console.log('built review ndjson', { destinations: destLines.length, tours: tourLines.length });
