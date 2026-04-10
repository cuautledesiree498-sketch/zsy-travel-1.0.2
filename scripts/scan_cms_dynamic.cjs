const { createClient } = require('next-sanity');
const fs = require('fs');
const path = require('path');
const { apiVersion, dataset, projectId } = require('../sanity/env.ts');

const token = fs.readFileSync(path.join(process.cwd(), 'secrets', 'sanity_token.txt'), 'utf8').trim();
const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

const re = [
  /Infinite Travel\s*\/\s*无限旅途/i,
  /Tailor-Made China Journeys/i,
  /Frequently Asked Questions/i,
  /To be added/i,
  /coming soon/i,
  /待填写/,
  /待补充/,
  /test/i,
  /1234890/,
  /1234872/,
];

function scan(node, out = [], trail = []) {
  if (node == null) return out;
  if (typeof node === 'string') {
    const hit = re.some((x) => x.test(node));
    if (hit) out.push({ path: trail.join('.'), value: node });
    return out;
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => scan(v, out, trail.concat(`[${i}]`)));
    return out;
  }
  if (typeof node === 'object') {
    Object.entries(node).forEach(([k, v]) => scan(v, out, trail.concat(k)));
  }
  return out;
}

async function main() {
  const site = await client.fetch(`*[_type == "siteSettings"][0]`);
  const home = await client.fetch(`*[_type == "homeSettings"][0]`);
  const tours = await client.fetch(`*[_type == "tour" && published == true]{_id,title,slug,description,highlights,itinerary} [0...20]`);
  const articles = await client.fetch(`*[_type == "article" && published == true]{_id,title,slug,author,content} [0...20]`);

  const result = {
    site: scan(site),
    home: scan(home),
    tours: scan(tours),
    articles: scan(articles),
  };
  console.log(JSON.stringify(result, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
