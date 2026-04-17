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

function localized(value, lang) {
  if (!value) return '';
  if (typeof value === 'string') return value.trim();
  return String(value[lang] || value.en || value.zh || '').trim();
}

function hasLocalized(value, lang) {
  return localized(value, lang).length > 0;
}

function len(value, lang) {
  return localized(value, lang).length;
}

function auditArticle(article) {
  const contentCount = Array.isArray(article.content) ? article.content.length : 0;
  return {
    _id: article._id,
    slug: article.slug,
    titleZh: localized(article.title, 'zh'),
    titleEn: localized(article.title, 'en'),
    hasZhTitle: hasLocalized(article.title, 'zh'),
    hasEnTitle: hasLocalized(article.title, 'en'),
    excerptZhLength: len(article.excerpt, 'zh'),
    excerptEnLength: len(article.excerpt, 'en'),
    taglineZhLength: len(article.tagline, 'zh'),
    taglineEnLength: len(article.tagline, 'en'),
    contentBlockCount: contentCount,
    heroFactsCount: Array.isArray(article.heroFacts) ? article.heroFacts.length : 0,
    hasMainImage: Boolean(article.mainImage),
    risk: [
      !hasLocalized(article.title, 'zh') || !hasLocalized(article.title, 'en') ? 'missing bilingual title' : null,
      contentCount === 0 ? 'empty article body' : null,
      len(article.excerpt, 'zh') < 20 && len(article.tagline, 'zh') < 20 ? 'weak zh summary' : null,
      len(article.excerpt, 'en') < 40 && len(article.tagline, 'en') < 40 ? 'weak en summary' : null,
      !article.mainImage ? 'missing main image' : null,
    ].filter(Boolean),
  };
}

function auditDestination(destination) {
  return {
    _id: destination._id,
    slug: destination.slug,
    nameZh: localized(destination.name, 'zh'),
    nameEn: localized(destination.name, 'en'),
    descriptionZhLength: len(destination.description, 'zh'),
    descriptionEnLength: len(destination.description, 'en'),
    taglineZhLength: len(destination.tagline, 'zh'),
    taglineEnLength: len(destination.tagline, 'en'),
    highlightsCount: Array.isArray(destination.highlights) ? destination.highlights.length : 0,
    experiencesCount: Array.isArray(destination.experiences) ? destination.experiences.length : 0,
    samplePlanCount: Array.isArray(destination.samplePlan) ? destination.samplePlan.length : 0,
    heroFactsCount: Array.isArray(destination.heroFacts) ? destination.heroFacts.length : 0,
    galleryCount: Array.isArray(destination.gallery) ? destination.gallery.length : 0,
    hasImage: Boolean(destination.image),
    risk: [
      !hasLocalized(destination.name, 'zh') || !hasLocalized(destination.name, 'en') ? 'missing bilingual name' : null,
      len(destination.description, 'zh') < 30 ? 'weak zh description / likely fallback' : null,
      len(destination.description, 'en') < 60 ? 'weak en description / likely fallback' : null,
      !Array.isArray(destination.highlights) || destination.highlights.length < 3 ? 'few highlights' : null,
      !Array.isArray(destination.experiences) || destination.experiences.length < 3 ? 'few experiences' : null,
      !Array.isArray(destination.samplePlan) || destination.samplePlan.length < 2 ? 'weak sample plan' : null,
      !destination.image ? 'missing image' : null,
    ].filter(Boolean),
  };
}

function auditTour(tour) {
  return {
    _id: tour._id,
    slug: tour.slug,
    titleZh: localized(tour.title, 'zh'),
    titleEn: localized(tour.title, 'en'),
    descriptionZhLength: len(tour.description, 'zh'),
    descriptionEnLength: len(tour.description, 'en'),
    taglineZhLength: len(tour.tagline, 'zh'),
    taglineEnLength: len(tour.tagline, 'en'),
    highlightsCount: Array.isArray(tour.highlights) ? tour.highlights.length : 0,
    itineraryCount: Array.isArray(tour.itinerary) ? tour.itinerary.length : 0,
    hasImage: Boolean(tour.image),
    duration: tour.duration,
    price: tour.price,
    risk: [
      !hasLocalized(tour.title, 'zh') || !hasLocalized(tour.title, 'en') ? 'missing bilingual title' : null,
      len(tour.description, 'zh') < 40 ? 'weak zh description / likely fallback' : null,
      len(tour.description, 'en') < 80 ? 'weak en description / likely fallback' : null,
      !Array.isArray(tour.highlights) || tour.highlights.length < 3 ? 'few highlights' : null,
      !Array.isArray(tour.itinerary) || tour.itinerary.length < 2 ? 'weak itinerary' : null,
      !tour.image ? 'missing image' : null,
    ].filter(Boolean),
  };
}

async function main() {
  const [articles, destinations, tours] = await Promise.all([
    client.fetch(`*[_type == "article"] | order(_createdAt desc) { _id, title, tagline, excerpt, content, heroFacts, mainImage, "slug": slug.current, _createdAt }`),
    client.fetch(`*[_type == "destination"] | order(slug.current asc) { _id, name, tagline, description, highlights, experiences, samplePlan, heroFacts, gallery, image, "slug": slug.current }`),
    client.fetch(`*[_type == "tour"] | order(slug.current asc) { _id, title, tagline, description, highlights, itinerary, image, duration, price, "slug": slug.current }`),
  ]);

  const report = {
    generatedAt: new Date().toISOString(),
    counts: {
      articles: articles.length,
      destinations: destinations.length,
      tours: tours.length,
    },
    articles: articles.map(auditArticle),
    destinations: destinations.map(auditDestination),
    tours: tours.map(auditTour),
  };

  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
