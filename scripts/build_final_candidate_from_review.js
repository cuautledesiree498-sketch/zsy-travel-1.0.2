const fs = require('fs');
const path = require('path');

const root = 'C:/Users/Administrator/travel-website/my-travel-site/scripts';
const sources = {
  destination: path.join(root, 'content_pack_v2026-04-11/structured/destination-seeds.review.ndjson'),
  tour: path.join(root, 'content_pack_v2026-04-11/structured/tour-seeds.review.ndjson'),
  article: path.join(root, 'article_pack_v2026-04-11/article-seeds.review.ndjson'),
};

function readNdjson(file) {
  return fs.readFileSync(file, 'utf8').trim().split(/\r?\n/).map((line) => JSON.parse(line));
}

function localizedCopy(v) {
  return { en: v?.en || '', zh: v?.zh || '' };
}

function normalizeDestination(doc) {
  return {
    ...doc,
    name: localizedCopy(doc.name),
    tagline: localizedCopy(doc.tagline),
    description: localizedCopy(doc.description),
    highlights: (doc.highlights || []).map(localizedCopy),
    idealFor: localizedCopy(doc.idealFor),
    bestTime: localizedCopy(doc.bestTime),
    suggestedStay: localizedCopy(doc.suggestedStay),
    heroFacts: (doc.heroFacts || []).map((x) => ({ label: localizedCopy(x.label), value: localizedCopy(x.value) })),
    experiences: (doc.experiences || []).map((x) => ({ title: localizedCopy(x.title), description: localizedCopy(x.description) })),
    samplePlan: (doc.samplePlan || []).map((x) => ({ title: localizedCopy(x.title), description: localizedCopy(x.description) })),
  };
}

function normalizeTour(doc) {
  return {
    ...doc,
    title: localizedCopy(doc.title),
    tagline: localizedCopy(doc.tagline),
    description: localizedCopy(doc.description),
    idealFor: localizedCopy(doc.idealFor),
    travelStyle: localizedCopy(doc.travelStyle),
    howToUse: localizedCopy(doc.howToUse),
    bestTime: localizedCopy(doc.bestTime),
    extensions: localizedCopy(doc.extensions),
    highlights: (doc.highlights || []).map(localizedCopy),
    itinerary: (doc.itinerary || []).map((x) => ({ day: x.day, title: localizedCopy(x.title), description: localizedCopy(x.description) })),
  };
}

function normalizeArticle(doc) {
  return {
    ...doc,
    title: localizedCopy(doc.title),
    excerpt: localizedCopy(doc.excerpt),
    tagline: localizedCopy(doc.tagline),
    heroFacts: (doc.heroFacts || []).map((x) => ({ label: localizedCopy(x.label), value: localizedCopy(x.value) })),
  };
}

const destination = readNdjson(sources.destination).map(normalizeDestination);
const tour = readNdjson(sources.tour).map(normalizeTour);
const article = readNdjson(sources.article).map(normalizeArticle);

const outDir = path.join(root, 'content_pack_v2026-04-11/final_candidate');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, 'destination-seeds.final.candidate.ndjson'), destination.map(JSON.stringify).join('\n') + '\n', 'utf8');
fs.writeFileSync(path.join(outDir, 'tour-seeds.final.candidate.ndjson'), tour.map(JSON.stringify).join('\n') + '\n', 'utf8');
fs.writeFileSync(path.join(outDir, 'article-seeds.final.candidate.ndjson'), article.map(JSON.stringify).join('\n') + '\n', 'utf8');

console.log('built final candidate', { destination: destination.length, tour: tour.length, article: article.length, outDir });
