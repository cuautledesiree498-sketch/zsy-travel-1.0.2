const { createClient } = require('next-sanity');
const fs = require('fs');
const path = require('path');
const { apiVersion, dataset, projectId } = require('../sanity/env.ts');

const token = fs.readFileSync(path.join(process.cwd(), 'secrets', 'sanity_token.txt'), 'utf8').trim();
const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

async function main() {
  const home = await client.fetch(`*[_type == "homeSettings"][0]{_id, pageTitle, sections[]{_key,_type,title,subtitle}}`);
  if (!home?._id) throw new Error('homeSettings not found');

  const patch = client.patch(home._id)
    .set({
      pageTitle: {
        en: 'Infinite Travel',
        zh: '无限旅途'
      }
    });

  const sections = Array.isArray(home.sections) ? home.sections : [];
  const heroSection = sections.find((section) => section?._type === 'heroSection');
  const faqSection = sections.find((section) => section?._type === 'faqPreviewSection');

  if (heroSection?._key) {
    patch.set({
      [`sections[_key==\"${heroSection._key}\"].title`]: {
        en: 'Infinite Travel',
        zh: '无限旅途'
      },
      [`sections[_key==\"${heroSection._key}\"].subtitle`]: {
        en: 'Tailor-Made China Journeys',
        zh: '中国高端定制旅行'
      }
    });
  }

  if (faqSection?._key) {
    patch.set({
      [`sections[_key==\"${faqSection._key}\"].title`]: {
        en: 'Frequently Asked Questions',
        zh: '常见问题'
      }
    });
  }

  const before = home;
  const result = await patch.commit();
  const after = await client.fetch(`*[_type == "homeSettings"][0]{_id, pageTitle, sections[]{_key,_type,title,subtitle}}`);

  console.log(JSON.stringify({ before, result, after }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
