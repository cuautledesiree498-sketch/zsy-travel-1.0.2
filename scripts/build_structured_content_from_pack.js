const fs = require('fs');
const path = require('path');

const root = 'C:/Users/Administrator/travel-website/my-travel-site/scripts/content_pack_v2026-04-11';
const outDir = path.join(root, 'structured');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readFiles(dir) {
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ name: f, text: fs.readFileSync(path.join(dir, f), 'utf8') }));
}

function getSection(text, name) {
  const lines = text.replace(/\r/g, '').split('\n');
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().toLowerCase() === name.toLowerCase()) {
      start = i + 1;
      break;
    }
  }
  if (start === -1) return [];
  const out = [];
  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (/^[A-Za-z][A-Za-z\s]+$/.test(trimmed) && !trimmed.startsWith('-')) break;
    out.push(trimmed);
  }
  return out;
}

function parseLangBlock(lines) {
  let en = [];
  let zh = [];
  for (const line of lines) {
    if (line.startsWith('- en:')) en.push(line.replace(/^- en:\s*/, '').trim());
    if (line.startsWith('- zh:')) zh.push(line.replace(/^- zh:\s*/, '').trim());
  }
  return { en: en.join('\n'), zh: zh.join('\n') };
}

function parseLocalizedList(lines) {
  const en = [];
  const zh = [];
  for (const line of lines) {
    if (line.startsWith('- en:')) en.push({ en: line.replace(/^- en:\s*/, '').trim(), zh: '' });
    if (line.startsWith('- zh:')) zh.push({ en: '', zh: line.replace(/^- zh:\s*/, '').trim() });
  }
  const max = Math.max(en.length, zh.length);
  const out = [];
  for (let i = 0; i < max; i++) {
    out.push({
      en: en[i]?.en || '',
      zh: zh[i]?.zh || '',
    });
  }
  return out;
}

function parseHeroFacts(lines) {
  return lines
    .filter((line) => line.startsWith('- '))
    .map((line) => line.replace(/^-\s*/, ''))
    .map((line) => {
      const parts = line.split(':');
      const label = (parts[0] || '').trim();
      const value = parts.slice(1).join(':').trim();
      const [labelEn = '', labelZh = ''] = label.split('/').map((s) => s.trim());
      const [valueEn = '', valueZh = ''] = value.split('/').map((s) => s.trim());
      return {
        label: { en: labelEn, zh: labelZh },
        value: { en: valueEn, zh: valueZh },
      };
    });
}

function parsePlan(lines) {
  const en = [];
  const zh = [];
  for (const line of lines) {
    if (line.startsWith('- en:')) en.push(line.replace(/^- en:\s*/, '').trim());
    if (line.startsWith('- zh:')) zh.push(line.replace(/^- zh:\s*/, '').trim());
  }
  const max = Math.max(en.length, zh.length);
  const out = [];
  for (let i = 0; i < max; i++) {
    const enLine = en[i] || '';
    const zhLine = zh[i] || '';
    const enParts = enLine.split('—');
    const zhParts = zhLine.split('—');
    out.push({
      title: { en: (enParts[0] || enLine).trim(), zh: (zhParts[0] || zhLine).trim() },
      description: { en: (enParts[1] || '').trim(), zh: (zhParts[1] || '').trim() },
    });
  }
  return out;
}

function parseItinerary(lines) {
  return lines
    .filter((line) => line.startsWith('- '))
    .map((line) => line.replace(/^-\s*/, '').trim())
    .map((line, idx) => {
      const parts = line.split('—');
      return {
        day: idx + 1,
        title: { en: (parts[0] || line).trim(), zh: '' },
        description: { en: (parts[1] || '').trim(), zh: '' },
      };
    });
}

function parseSlug(text) {
  const m = text.match(/slug:\s*([a-z0-9-]+)/i) || text.match(/- slug:\s*`([^`]+)`/i);
  return m ? m[1] : '';
}

function parseTitleLine(text) {
  const m = text.match(/^##\s+(.+)$/m);
  return m ? m[1].trim() : '';
}

function buildDestination(file) {
  const title = parseTitleLine(file.text);
  const [nameEn = '', nameZh = ''] = title.replace(/^##\s*/, '').split('/').map((s) => s.trim());
  return {
    name: { en: nameEn, zh: nameZh },
    slug: parseSlug(file.text) || file.name.replace('.md', ''),
    tagline: parseLangBlock(getSection(file.text, 'tagline')),
    description: parseLangBlock(getSection(file.text, 'description')),
    highlights: parseLocalizedList(getSection(file.text, 'highlights')),
    idealFor: parseLangBlock(getSection(file.text, 'idealFor')),
    bestTime: parseLangBlock(getSection(file.text, 'bestTime')),
    suggestedStay: parseLangBlock(getSection(file.text, 'suggestedStay')),
    heroFacts: parseHeroFacts(getSection(file.text, 'heroFacts')),
    experiences: parsePlan(getSection(file.text, 'experiences')),
    samplePlan: parsePlan(getSection(file.text, 'samplePlan')),
    imageNotes: [],
    galleryNotes: [],
  };
}

function buildTour(file) {
  const title = parseTitleLine(file.text).replace(/^##\s*/, '').trim();
  return {
    title: { en: title, zh: title },
    slug: parseSlug(file.text) || file.name.replace('.md', ''),
    tagline: parseLangBlock(getSection(file.text, 'tagline')),
    description: parseLangBlock(getSection(file.text, 'description')),
    idealFor: parseLangBlock(getSection(file.text, 'idealFor')),
    travelStyle: parseLangBlock(getSection(file.text, 'travelStyle')),
    howToUse: parseLangBlock(getSection(file.text, 'howToUse')),
    bestTime: parseLangBlock(getSection(file.text, 'bestTime')),
    extensions: parseLangBlock(getSection(file.text, 'extensions')),
    highlights: parseLocalizedList(getSection(file.text, 'highlights')),
    itinerary: parseItinerary(getSection(file.text, 'itinerary')),
    imageNotes: [],
  };
}

ensureDir(outDir);
const destinationFiles = readFiles(path.join(root, 'destinations'));
const tourFiles = readFiles(path.join(root, 'tours'));

const destinations = destinationFiles.map(buildDestination);
const tours = tourFiles.map(buildTour);

fs.writeFileSync(path.join(outDir, 'destinations.structured.json'), JSON.stringify(destinations, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'tours.structured.json'), JSON.stringify(tours, null, 2), 'utf8');

console.log('built', { destinations: destinations.length, tours: tours.length, outDir });
