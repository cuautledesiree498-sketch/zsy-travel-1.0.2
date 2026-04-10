const { createClient } = require('next-sanity');
const fs = require('fs');
const path = require('path');
const { apiVersion, dataset, projectId } = require('../sanity/env.ts');

async function main() {
  const token = fs.readFileSync(path.join(process.cwd(), 'secrets', 'sanity_token.txt'), 'utf8').trim();
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

  const doc = await client.fetch(`*[_type == "siteSettings"][0]{_id,contactEmail,whatsappNumber,wechat,address}`);
  console.log('before', JSON.stringify(doc));

  if (!doc?._id) {
    throw new Error('siteSettings not found');
  }

  await client.patch(doc._id).set({
    contactEmail: '',
    whatsappNumber: '',
    wechat: '',
    address: { zh: '', en: '' },
  }).commit();

  const updated = await client.fetch(`*[_type == "siteSettings"][0]{_id,contactEmail,whatsappNumber,wechat,address}`);
  console.log('after', JSON.stringify(updated));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
