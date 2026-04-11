const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\Administrator\\travel-website\\my-travel-site';
const skeletonPath = path.join(root, 'memory/projects/zsy-travel-content-seeds-2026-04-11.md');

const destOut = path.join(root, 'sanity/destination-seeds.ndjson');
const tourOut = path.join(root, 'sanity/tour-seeds.ndjson');
const articleOut = path.join(root, 'sanity/article-seeds.ndjson');

const read = (p) => fs.readFileSync(p, 'utf8');
const writeNdjson = (outPath, docs) => {
  const lines = docs.map(d => JSON.stringify(d));
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');
};

function parseSkeleton(md){
  const getSlice = (startMarker, endMarker) => {
    const start = md.indexOf(startMarker);
    if (start === -1) return '';
    const from = md.slice(start + startMarker.length);
    if (!endMarker) return from;
    const end = from.indexOf(endMarker);
    return end === -1 ? from : from.slice(0, end);
  };

  const sectionDest = getSlice('# 1. Popular Destinations：建议先补的 10 个目的地', '---\n\n# 2. Featured Tour Packages：建议先补的 10 个线路骨架');
  const sectionTour = getSlice('# 2. Featured Tour Packages：建议先补的 10 个线路骨架', '---\n\n# 3. Travel Guides / Insights：建议先补的 10 个文章主题');
  const sectionArt = getSlice('# 3. Travel Guides / Insights：建议先补的 10 个文章主题', '---\n\n# 4. 执行建议');

  const parseBlockList = (sectionText) => {
    const re = /##\s+\d{2,}\.\s+([^\n]+)\n([\s\S]*?)(?=\n##\s+\d{2,}\.\s+|$)/g;
    const blocks = [];
    let m;
    while ((m = re.exec(sectionText))) {
      blocks.push({ header: m[1].trim(), body: m[2] });
    }
    return blocks;
  };

  return {
    destinations: parseBlockList(sectionDest),
    tours: parseBlockList(sectionTour),
    articles: parseBlockList(sectionArt),
  };
}

function extractBetween(body, key){
  // not used
}

function parseLocalizedStringFromBlock(body){
  // expects lines like "- tagline:" then indented "- en: ..." "- zh: ..."
  const res={};
  const m = body.match(new RegExp(`-\\s*slug:\s*`));
  return res;
}

function parseKeyValue(body, key){
  // key can appear as "- slug: `x`" or "- duration:" or "- suggestedStay:".
  const re = new RegExp(`-\\s*${key}:\\s*([\\s\\S]*?)(?=\\n-\\s*[a-zA-Z]`);
  const m = re.exec(body);
  return m?m[1].trim():null;
}

function parseSlug(body){
  const lines = String(body || '').split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    const m = line.match(/^-\s*slug:\s*`([^`]+)`\s*$/i) || line.match(/^-\s*slug:\s*([^`\n]+?)\s*$/i);
    if (m) return m[1].trim();
  }
  const fallback = String(body || '').match(/-\s*slug:\s*`([^`]+)`/i) || String(body || '').match(/-\s*slug:\s*([^\n]+)/i);
  return fallback ? fallback[1].trim() : null;
}

function parseTagline(body){
  const m = body.match(/-\\s*tagline:\s*\n([\s\S]*?)(?=\n-\\s*[a-zA-Z])/);
  if(!m) return null;
  const block=m[1];
  const en=block.match(/en:\s*([^\n]+)/);
  const zh=block.match(/zh:\s*([^\n]+)/);
  return {
    en: en?en[1].trim().replace(/\.$/,''):'',
    zh: zh?zh[1].trim().replace(/\.$/,''):'',
  };
}

function parseSuggestedStay(body){
  const m = body.match(/-\\s*suggestedStay:\s*\n([\s\S]*?)(?=\n-\\s*[a-zA-Z]|$)/);
  if(!m) return null;
  const block=m[1];
  const en=block.match(/en:\s*([^\n]+)/);
  const zh=block.match(/zh:\s*([^\n]+)/);
  // schema: localizedString (not text)
  return { en: en?en[1].trim():'', zh: zh?zh[1].trim():'' };
}

function parseHeroFacts(body){
  const m = body.match(/-\\s*heroFacts:\s*\n([\s\S]*?)(?=\n-\\s*[a-zA-Z]|$)/);
  if(!m) return [];
  const block=m[1];
  const items=[];
  const reLine = /-\\s*([^:]+)\s*\/\s*([^:]+)\s*:\s*([^\n]+)/g;
  let mm;
  while((mm=reLine.exec(block))){
    const labelEn=mm[1].trim();
    const labelZh=mm[2].trim();
    const val=mm[3].trim();
    // val line may contain "First-time visitors / 首次..."; split by '/'
    const parts=val.split('/');
    const vEn=(parts[0]||'').trim();
    const vZh=(parts.slice(1).join('/')).trim();
    items.push({
      label:{ en: labelEn, zh: labelZh },
      value:{ en: vEn, zh: vZh },
    });
  }
  // Also handle Pace / 节奏 etc where there may not be " / " clean.
  return items;
}

function parseHighlights(body){
  // for now convert heroFacts into highlights, keep minimal
  const hf=parseHeroFacts(body);
  if(!hf.length) return [];
  // highlights schema for destination is array of localizedString
  return hf.map(x=>({ en: `${x.label.en}: ${x.value.en}`.trim(), zh: `${x.label.zh}: ${x.value.zh}`.trim() }));
}

function parseExperiencesForTourStub(){
  return [];
}

function parseTaglineOnly(body){
  return parseTagline(body);
}

function parseLocalizedText(body, key){
  const m = body.match(new RegExp(`-\\s*${key}:\\s*\\n([\\s\\S]*?)(?=\\n-\\s*[a-zA-Z]|$)`));
  if(!m) return null;
  const block=m[1];
  const en=block.match(/en:\s*([^\n]+)/);
  const zh=block.match(/zh:\s*([^\n]+)/);
  return { en: en?en[1].trim():'', zh: zh?zh[1].trim():'' };
}

function parseRouteAndDuration(body){
  const duration = body.match(/-\\s*duration:\s*([^\n]+)/);
  const route = body.match(/-\\s*route:\s*([^\n]+)/);
  return {
    route: route?route[1].trim():null,
    durationText: duration?duration[1].trim():null,
  };
}

function parseDurationNumber(durationText){
  if(!durationText) return null;
  const m = durationText.match(/(\d+)/);
  return m?parseInt(m[1],10):null;
}

function parseTourTitleFromHeader(header){
  return header.split('/')[0].trim();
}

function parseArticleFromBlock(block){
  const slug = parseSlug(block.body);
  const angle = (block.body.match(/-\\s*angle:\s*([^\n]+)/)||[])[1];
  return { slug, angle: angle?angle.trim():'' };
}

function buildSeeds(parsed){
  const destinationDocs = parsed.destinations.map((b, idx)=>{
    const slug = parseSlug(b.body) || `destination-${idx+1}`;
    const tagline = parseTagline(b.body) || {en:'', zh:''};
    const suggestedStay = parseSuggestedStay(b.body) || {en:'', zh:''};
    const heroFacts = parseHeroFacts(b.body);

    return {
      _type: 'destination',
      name: {
        en: (b.header.split('/')[0]||'').trim(),
        zh: (b.header.split('/')[1]||'').trim(),
      },
      slug: { current: slug },
      tagline: tagline,
      description: {
        en: '',
        zh: '',
      },
      image: {
        // placeholder: Sanity image field can be empty, but CLI seed expects correct type.
      },
      highlights: parseHighlights(b.body),
      idealFor: {
        en: '',
        zh: '',
      },
      bestTime: {
        en: '',
        zh: '',
      },
      suggestedStay: suggestedStay,
      heroFacts: heroFacts,
      experiences: [],
      samplePlan: [],
      gallery: [],
      published: true,
      order: idx,
    };
  });

  const tourDocs = parsed.tours.map((b, idx)=>{
    const slug = parseSlug(b.body) || `tour-${idx+1}`;
    // header like "01. Classic China First Journey"
    const title = (b.header.split('/')[0]||b.header).trim();
    const tagline = {
      en: '',
      zh: '',
    };
    const { durationText, route } = parseRouteAndDuration(b.body);
    const duration = parseDurationNumber(durationText) || 7;

    return {
      _type: 'tour',
      title: { en: title, zh: title },
      slug: { current: slug },
      price: 0,
      duration: duration,
      image: {},
      description: { en: '', zh: '' },
      tagline: tagline,
      idealFor: { en: '', zh: '' },
      travelStyle: { en: '', zh: '' },
      howToUse: { en: '', zh: '' },
      bestTime: { en: '', zh: '' },
      extensions: { en: route || '', zh: route || '' },
      published: true,
      order: idx,
      highlights: [],
      itinerary: [],
    };
  });

  const articleDocs = parsed.articles.map((b, idx)=>{
    const slug = parseSlug(b.body) || `article-${idx+1}`;
    const title = (b.header.split('/')[0]||b.header).trim();
    const angle = (b.body.match(/-\\s*angle:\s*([^\n]+)/)||[])[1] || '';
    return {
      _type: 'article',
      title: { en: title, zh: title },
      slug: { current: slug },
      author: 'Infinite Travel Editorial Team',
      publishDate: '2026-04-11T01:05:00.000Z',
      excerpt: { en: angle, zh: angle },
      tagline: { en: angle, zh: angle },
      heroFacts: [],
      content: [],
      mainImage: {},
      published: true,
    };
  });

  return { destinationDocs, tourDocs, articleDocs };
}

const md = read(skeletonPath);
const parsed = parseSkeleton(md);
const { destinationDocs, tourDocs, articleDocs } = buildSeeds(parsed);

// Remove placeholder image objects that Sanity image expects; keep fields absent.
function stripEmptyImages(docs){
  return docs.map(doc=>{
    const out={...doc};
    if(out.image && Object.keys(out.image).length===0) delete out.image;
    if(out.mainImage && Object.keys(out.mainImage).length===0) delete out.mainImage;
    return out;
  });
}

writeNdjson(destOut, stripEmptyImages(destinationDocs));
writeNdjson(tourOut, stripEmptyImages(tourDocs));
writeNdjson(articleOut, stripEmptyImages(articleDocs));

console.log('WROTE', {
  destination: destinationDocs.length,
  tour: tourDocs.length,
  article: articleDocs.length,
  destOut, tourOut, articleOut
});
