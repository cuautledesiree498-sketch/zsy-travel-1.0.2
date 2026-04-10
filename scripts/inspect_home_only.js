const fs = require('fs');
const { createClient } = require('next-sanity');

const token = fs.readFileSync('C:\\Users\\Administrator\\Desktop\\zsyTravel\\sanity_token.txt', 'utf8').trim();
const client = createClient({
  projectId: 'j7fa6cf0',
  dataset: 'production',
  apiVersion: '2026-04-03',
  useCdn: false,
  token,
});

async function main() {
  const home = await client.fetch(`*[_type == "homeSettings"][0]{_id, sections[]{_key,_type,sectionName,title,subtitle,eyebrow,viewMoreText,primaryButtonText,secondaryButtonText,items,titleCards,destinations}}`);
  console.log(JSON.stringify(home, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
