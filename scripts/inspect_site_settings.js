const fs = require('fs');
const { createClient } = require('next-sanity');

const token = fs.readFileSync('C:\\Users\\Administrator\\travel-website\\my-travel-site\\secrets\\sanity_token.txt', 'utf8').trim();
const client = createClient({
  projectId: 'j7fa6cf0',
  dataset: 'production',
  apiVersion: '2026-04-03',
  useCdn: false,
  token,
});

async function main() {
  const site = await client.fetch(`*[_type == "siteSettings"][0]{_id,siteTitle,contactEmail,contactPhone,whatsappNumber,wechat,address,footerIntro,faqTitle,faqSubtitle}`);
  console.log(JSON.stringify(site, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
