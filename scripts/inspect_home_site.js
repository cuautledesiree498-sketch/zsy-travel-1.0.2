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
  const home = await client.fetch(`*[_type == "homeSettings"][0]`);
  const site = await client.fetch(`*[_type == "siteSettings"][0]`);
  console.log('---HOME---');
  console.log(JSON.stringify(home, null, 2).slice(0, 20000));
  console.log('---SITE---');
  console.log(JSON.stringify(site, null, 2).slice(0, 20000));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
