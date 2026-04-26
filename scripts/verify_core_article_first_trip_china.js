const { createClient } = require('next-sanity');
const client = createClient({ projectId: 'j7fa6cf0', dataset: 'production', apiVersion: '2026-04-03', useCdn: false });

client.fetch(`*[_type == "article" && slug.current == "first-trip-to-china-route-guide"][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  tagline,
  heroFacts,
  content,
  published
}`).then((a) => {
  console.log(JSON.stringify({
    id: a && a._id,
    slug: a && a.slug,
    title: a && a.title,
    excerptEnLen: a && a.excerpt && a.excerpt.en && a.excerpt.en.length,
    excerptZhLen: a && a.excerpt && a.excerpt.zh && a.excerpt.zh.length,
    heroFacts: a && a.heroFacts && a.heroFacts.length,
    contentBlocks: a && a.content && a.content.length,
    published: a && a.published,
  }, null, 2));
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
