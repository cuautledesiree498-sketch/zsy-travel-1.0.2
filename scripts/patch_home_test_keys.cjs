const { createClient } = require('next-sanity');
const fs = require('fs');
const path = require('path');
const { apiVersion, dataset, projectId } = require('../sanity/env.ts');

const token = fs.readFileSync(path.join(process.cwd(), 'secrets', 'sanity_token.txt'), 'utf8').trim();
const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

async function main() {
  const home = await client.fetch(`*[_type == "homeSettings"][0]{_id, sections}`);
  if (!home?._id) throw new Error('homeSettings not found');

  const sections = Array.isArray(home.sections) ? home.sections : [];
  const nextSections = sections.map((section) => {
    if (section?._type !== 'testimonialsSection') return section;

    return {
      ...section,
      _key: section._key === 'test-main' ? 'testimonials-main' : section._key,
      items: Array.isArray(section.items)
        ? section.items.map((item, index) => ({
            ...item,
            _key: /^test-\d+$/i.test(item?._key || '') ? `testimonial-${index + 1}` : item?._key,
          }))
        : section.items,
    };
  });

  const before = sections
    .filter((section) => section?._type === 'testimonialsSection')
    .map((section) => ({ _key: section?._key, items: section?.items?.map((item) => item?._key) || [] }));

  await client.patch(home._id).set({ sections: nextSections }).commit();

  const afterDoc = await client.fetch(`*[_type == "homeSettings"][0]{sections}`);
  const after = (afterDoc?.sections || [])
    .filter((section) => section?._type === 'testimonialsSection')
    .map((section) => ({ _key: section?._key, items: section?.items?.map((item) => item?._key) || [] }));

  console.log(JSON.stringify({ before, after }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
