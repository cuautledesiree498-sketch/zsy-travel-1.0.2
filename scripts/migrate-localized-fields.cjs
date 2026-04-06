const fs = require('fs');
const {createClient} = require('next-sanity');

const token = JSON.parse(fs.readFileSync(process.env.USERPROFILE + '/.config/sanity/config.json', 'utf8')).authToken;
const client = createClient({
  projectId: 'j7fa6cf0',
  dataset: 'production',
  apiVersion: '2026-04-03',
  token,
  useCdn: false,
});

const hasCJK = (value) => /[\u3400-\u9FFF]/.test(value || '');

function toLocalized(value) {
  if (value == null) return null;
  if (typeof value === 'object' && (value.en !== undefined || value.zh !== undefined)) return value;
  if (typeof value !== 'string') return value;
  const raw = value.trim();
  if (!raw) return { en: '', zh: '' };
  if (raw.includes('|')) {
    const [en, zh] = raw.split('|').map((part) => (part || '').trim());
    return { en: en || '', zh: zh || '' };
  }
  if (hasCJK(raw)) return { en: '', zh: raw };
  return { en: raw, zh: '' };
}

function mapArray(items, mapper) {
  if (!Array.isArray(items)) return items;
  return items.map((item) => mapper(item));
}

async function patchIfNeeded(doc, nextValueBuilder) {
  const patch = nextValueBuilder(doc);
  if (!patch || Object.keys(patch).length === 0) return false;
  await client.patch(doc._id).set(patch).commit({ autoGenerateArrayKeys: true });
  console.log('Patched', doc._type, doc._id);
  return true;
}

async function migrateSiteSettings() {
  const docs = await client.fetch(`*[_type == "siteSettings"]`);
  for (const doc of docs) {
    await patchIfNeeded(doc, (d) => {
      const patch = {};
      const fields = [
        'siteTitle','siteDescription','address','headerCtaText','footerIntro',
        'aboutHeroTitle','aboutHeroSubtitle','aboutIntroTitle','aboutIntroBody','aboutPositioningTitle','aboutWhyTitle','aboutCtaTitle','aboutCtaSubtitle',
        'contactHeroTitle','contactHeroSubtitle','contactGuideTitle','contactStatusNote','contactCtaTitle','contactCtaSubtitle',
        'faqTitle','faqSubtitle','faqCtaTitle','faqCtaSubtitle'
      ];
      for (const field of fields) {
        const next = toLocalized(d[field]);
        if (next !== d[field] && next != null) patch[field] = next;
      }
      if (Array.isArray(d.aboutPositioningItems)) patch.aboutPositioningItems = mapArray(d.aboutPositioningItems, toLocalized);
      if (Array.isArray(d.contactGuideItems)) patch.contactGuideItems = mapArray(d.contactGuideItems, toLocalized);
      if (Array.isArray(d.faqItems)) {
        patch.faqItems = d.faqItems.map((item) => ({ ...item, question: toLocalized(item?.question), answer: toLocalized(item?.answer) }));
      }
      if (Array.isArray(d.aboutWhyItems)) {
        patch.aboutWhyItems = d.aboutWhyItems.map((item) => ({ ...item, title: toLocalized(item?.title), desc: toLocalized(item?.desc) }));
      }
      if (Array.isArray(d.socialLinks)) {
        patch.socialLinks = d.socialLinks.map((item) => ({ ...item, label: toLocalized(item?.label) }));
      }
      return patch;
    });
  }
}

async function migrateHomeSettings() {
  const docs = await client.fetch(`*[_type == "homeSettings"]`);
  for (const doc of docs) {
    await patchIfNeeded(doc, (d) => {
      if (!Array.isArray(d.sections)) return {};
      return {
        sections: d.sections.map((section) => ({
          ...section,
          title: toLocalized(section?.title),
          subtitle: toLocalized(section?.subtitle),
          viewMoreText: toLocalized(section?.viewMoreText),
          primaryButtonText: toLocalized(section?.primaryButtonText),
          secondaryButtonText: toLocalized(section?.secondaryButtonText),
          items: Array.isArray(section?.items)
            ? section.items.map((item) => ({
                ...item,
                title: toLocalized(item?.title),
                description: toLocalized(item?.description),
                quote: toLocalized(item?.quote),
                number: toLocalized(item?.number),
                label: toLocalized(item?.label),
                linkText: toLocalized(item?.linkText),
              }))
            : section?.items,
        })),
      };
    });
  }
}

async function migrateTours() {
  const docs = await client.fetch(`*[_type == "tour"]`);
  for (const doc of docs) {
    await patchIfNeeded(doc, (d) => ({
      title: toLocalized(d.title),
      description: toLocalized(d.description),
      highlights: mapArray(d.highlights, toLocalized),
      itinerary: mapArray(d.itinerary, (item) => ({ ...item, title: toLocalized(item?.title), description: toLocalized(item?.description) })),
    }));
  }
}

async function migrateArticles() {
  const docs = await client.fetch(`*[_type == "article"]`);
  for (const doc of docs) {
    await patchIfNeeded(doc, (d) => ({
      title: toLocalized(d.title),
    }));
  }
}

async function main() {
  await migrateSiteSettings();
  await migrateHomeSettings();
  await migrateTours();
  await migrateArticles();
  console.log('Done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
