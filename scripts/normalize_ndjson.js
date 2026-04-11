const fs = require('node:fs');
const path = require('node:path');

const files = [
  'sanity/destination-seeds.ndjson',
  'sanity/tour-seeds.ndjson',
  'sanity/article-seeds.ndjson',
];

function splitPrettyJsonObjects(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  let buffer = [];
  let depth = 0;
  let inString = false;
  let escape = false;

  function scan(line) {
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (escape) {
        escape = false;
        continue;
      }
      if (ch === '\\') {
        if (inString) escape = true;
        continue;
      }
      if (ch === '"') {
        inString = !inString;
        continue;
      }
      if (inString) continue;
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
    }
  }

  for (const line of lines) {
    if (!line.trim() && buffer.length === 0) continue;
    buffer.push(line);
    scan(line);
    if (depth === 0 && buffer.join('').trim()) {
      out.push(buffer.join('\n').trim());
      buffer = [];
      inString = false;
      escape = false;
    }
  }

  if (buffer.join('').trim()) {
    throw new Error('Trailing incomplete JSON object');
  }

  return out;
}

for (const rel of files) {
  const full = path.join(process.cwd(), rel);
  const raw = fs.readFileSync(full, 'utf8');
  const chunks = splitPrettyJsonObjects(raw);
  const normalized = chunks.map((chunk, index) => {
    try {
      return JSON.stringify(JSON.parse(chunk));
    } catch (err) {
      throw new Error(`${rel} object #${index + 1} parse failed: ${err.message}`);
    }
  }).join('\n') + '\n';
  fs.writeFileSync(full, normalized, 'utf8');
  console.log(`${rel}: normalized ${chunks.length} docs`);
}
