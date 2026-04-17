const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = process.env.SANITY_API_TOKEN || (fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : undefined);

const client = createClient({
  projectId: 'j7fa6cf0',
  dataset: 'production',
  apiVersion: '2026-04-03',
  useCdn: false,
  token,
});

async function main() {
  const doc = await client.fetch(`*[_type == "destination" && slug.current == "shenzhen"][0]{_id}`);
  if (!doc?._id) throw new Error('Shenzhen destination not found');

  const set = {
    tagline: { en: 'Technology, modern city energy and a more contemporary China entry point.', zh: '科技感、现代城市能量与更当代化的中国入口。' },
    description: {
      en: 'Shenzhen is a strong choice for travelers who want to see the newer, faster and more innovation-driven side of China. It works especially well as a contrast city after more historic or landmark-heavy stops.',
      zh: '深圳适合想看中国更新、更快、更具创新驱动一面的游客。它尤其适合作为历史型或地标型城市之后的反差节点。',
    },
    idealFor: {
      en: 'Ideal for business travelers, families, modern city lovers, technology-interested guests and travelers who want a clean contrast with older heritage cities.',
      zh: '适合商务客群、家庭游客、现代城市爱好者、对科技感兴趣的客人，以及希望和历史古城形成对照的游客。',
    },
    bestTime: {
      en: 'Autumn and winter are often the most comfortable, while spring also works well for city movement and outdoor time.',
      zh: '秋冬通常更舒适，春季也适合城市移动和户外停留。',
    },
    suggestedStay: { en: '2 days', zh: '2 天' },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Modern China contrast', zh: '现代中国对照' } },
      { label: { en: 'Suggested stay', zh: '建议停留' }, value: { en: '2 days', zh: '2 天' } },
      { label: { en: 'Travel style', zh: '旅行风格' }, value: { en: 'Tech city + urban', zh: '科技城市 + 都市' } },
    ],
    highlights: [
      { en: 'A strong showcase for the newer, innovation-driven side of China.', zh: '非常适合展示中国更新、更具创新驱动的一面。' },
      { en: 'Works well as a contrast stop after Beijing, Xi’an or other heritage-heavy cities.', zh: '放在北京、西安等历史型城市之后，对比效果很强。' },
      { en: 'Clean urban environment and modern city rhythm.', zh: '城市环境更干净，现代城市节奏感更明显。' },
      { en: 'A useful add-on for routes that want a contemporary China chapter.', zh: '适合作为需要补一个“当代中国”章节的路线补充。' },
    ],
    experiences: [
      { title: { en: 'Innovation-driven city layer', zh: '创新驱动城市层' }, description: { en: 'A modern urban chapter that highlights China’s newer development rhythm.', zh: '体现中国更现代、更快发展节奏的城市章节。' } },
      { title: { en: 'Contrast with older cities', zh: '与老城形成反差' }, description: { en: 'Useful after heritage-heavy stops to make the route feel more complete.', zh: '在历史型停留之后加入，能让路线更完整。' } },
      { title: { en: 'Contemporary China stop', zh: '当代中国节点' }, description: { en: 'A practical way to show the side of China shaped by business, design and technology.', zh: '展示由商业、设计和科技塑造的中国面貌。' } },
    ],
    samplePlan: [
      {
        title: { en: 'Arrive in Shenzhen and switch into the contemporary China layer', zh: '抵达深圳，切换到当代中国层' },
        description: { en: 'Shenzhen works best when the route needs a clear modern contrast after historical or classic sightseeing cities.', zh: '当路线需要在历史或经典观光城市之后切换到现代层时，深圳非常适合。' },
      },
      {
        title: { en: 'Urban movement, innovation vibe and city contrast', zh: '城市移动、创新氛围与反差感' },
        description: { en: 'Use the city to show a faster, cleaner and more contemporary side of China.', zh: '用这座城市展示中国更快、更干净、更当代的一面。' },
      },
      {
        title: { en: 'Close the route or connect onward through South China', zh: '收束路线，或继续向华南延展' },
        description: { en: 'Shenzhen can either end a modern China chapter or connect onward into other South China destinations.', zh: '深圳既可以收束现代中国章节，也可以继续衔接华南其他目的地。' },
      },
    ],
    image: '/media/custom/destinations/shenzhen/shenzhen-1.jpg',
  };

  await client.patch(doc._id).set(set).setIfMissing({ published: true }).commit();
  console.log(JSON.stringify({ patched: true, slug: 'shenzhen' }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
