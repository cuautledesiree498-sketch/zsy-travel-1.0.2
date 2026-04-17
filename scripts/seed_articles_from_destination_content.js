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

const articles = [
  {
    slug: 'first-time-in-china-where-to-start',
    title: {
      en: 'First Time in China: Where Should You Start?',
      zh: '第一次来中国，应该从哪里开始？',
    },
    tagline: {
      en: 'A practical first step for travelers who want the clearest China entry point.',
      zh: '给第一次来中国的游客一个最清晰、最实用的起点。',
    },
    excerpt: {
      en: 'If this is your first China trip, the hardest part is not choosing a city — it is choosing the right sequence. Beijing, Shanghai, Xi’an and other destinations each serve a different purpose, and the best starting point depends on the kind of China you want to understand first.',
      zh: '如果这是你第一次来中国，最难的往往不是选城市，而是选对顺序。北京、上海、西安等目的地各自承担不同作用，最佳起点取决于你想先理解怎样的中国。',
    },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'First-time visitors', zh: '首次访华游客' } },
      { label: { en: 'Core idea', zh: '核心思路' }, value: { en: 'Start with the right city sequence', zh: '先选对城市顺序' } },
      { label: { en: 'Recommended angle', zh: '推荐角度' }, value: { en: 'Culture, cities and pacing', zh: '文化、城市与节奏' } },
    ],
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The first trip to China should not be built around random cities. It works better when each stop has a clear role: one city for history, one for modern China, one for deeper cultural grounding, and one for scenery if you want balance.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Beijing is often the clearest opening city because it gives international travelers an immediate sense of scale, symbolism and historical depth. Shanghai works well if you want a more contemporary introduction. Xi’an adds the ancient-capital layer that makes the route feel grounded.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The best starting point is not always the most famous city. It is the one that helps you understand China fastest without making the trip feel overloaded.' }] },
    ],
    mainImage: '/media/custom/destinations/beijing/beijing-1.jpg',
  },
  {
    slug: 'beijing-vs-shanghai',
    title: {
      en: 'Beijing vs Shanghai: Which City Fits Your Trip Better?',
      zh: '北京和上海：哪座城市更适合你的行程？',
    },
    tagline: {
      en: 'Two very different ways to understand China, each with its own value.',
      zh: '理解中国的两种方式，各自有不同价值。',
    },
    excerpt: {
      en: 'Beijing and Shanghai are often compared as if one must be chosen over the other, but in many itineraries they play different roles. Beijing gives history, symbolism and landmark weight; Shanghai gives modern city rhythm, polish and a more contemporary China feel.',
      zh: '北京和上海常被放在一起比较，好像必须二选一，但在很多行程里，它们承担的是不同角色。北京负责历史、象征与地标重量；上海负责现代城市节奏、精致感和更当代的中国体验。',
    },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Trip planning comparison', zh: '行程对比选择' } },
      { label: { en: 'Beijing role', zh: '北京角色' }, value: { en: 'History + landmarks', zh: '历史 + 地标' } },
      { label: { en: 'Shanghai role', zh: '上海角色' }, value: { en: 'Modern city + skyline', zh: '现代城市 + 天际线' } },
    ],
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'If you want a trip that feels rooted in imperial history, major monuments and the political center of China, Beijing is the stronger choice. If you want to show travelers the modern side of China first, Shanghai is the easier entry point.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The best answer for many first-time visitors is not “either/or.” A Beijing plus Shanghai combination creates a clean contrast: one city explains the historical and symbolic China, the other shows the urban and contemporary China.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'If there is room for a third stop, Xi’an gives the route a deeper historical foundation. That is often what turns a simple city trip into a more complete China story.' }] },
    ],
    mainImage: '/media/custom/destinations/shanghai/shanghai-1.jpg',
  },
  {
    slug: 'best-time-to-visit-china',
    title: {
      en: 'Best Time to Visit China for Different Travel Styles',
      zh: '不同旅行方式下，中国什么时候最适合去？',
    },
    tagline: {
      en: 'The right season depends on whether you care more about cities, scenery or comfort.',
      zh: '最佳时间取决于你更看重城市、风景还是舒适度。',
    },
    excerpt: {
      en: 'There is no single best time to visit China. Spring and autumn are the safest general recommendations, but the ideal season shifts depending on whether you are planning city sightseeing, scenic routes, long road trips or food-focused travel.',
      zh: '中国并没有绝对统一的最佳旅行时间。春秋通常是最稳妥的通用推荐，但如果你更偏城市观光、风景线路、长线公路旅行或美食旅行，最佳季节会随之变化。',
    },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Season planning', zh: '季节规划' } },
      { label: { en: 'General rule', zh: '通用原则' }, value: { en: 'Spring and autumn are safest', zh: '春秋最稳妥' } },
      { label: { en: 'Exception', zh: '例外情况' }, value: { en: 'Route-specific logic matters', zh: '线路逻辑更关键' } },
    ],
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'For city routes such as Beijing and Shanghai, spring and autumn usually offer the best balance of weather and walking comfort. For scenic destinations, the best month can depend more heavily on visibility, greenery and local climate patterns.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'For Xinjiang, route timing is especially important because the region is large and different sections can behave differently. For Yunnan or Guilin, shoulder seasons often create a better balance of scenery and ease of movement.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The right answer is not to ask only “when should I go?”, but “what kind of China trip am I trying to make possible?”' }] },
    ],
    mainImage: '/media/custom/destinations/xinjiang/xinjiang-1.jpg',
  },
  {
    slug: 'how-to-build-a-multi-city-china-itinerary',
    title: {
      en: 'How to Build a Multi-City China Itinerary That Actually Works',
      zh: '怎样做出一条真正顺的中国多城市路线？',
    },
    tagline: {
      en: 'A route should feel like a story, not just a list of cities.',
      zh: '路线应该像故事，而不是城市清单。',
    },
    excerpt: {
      en: 'A multi-city China itinerary works best when the cities play different roles and the route has a clear rhythm. The strongest plans usually combine one or two major cities with one historical stop and one scenic or lifestyle-balanced stop.',
      zh: '中国多城市路线要真正顺，关键不是“堆城市”，而是让每个城市承担不同角色，并且路线本身有节奏。最强的组合通常是 1～2 个大城市 + 1 个历史节点 + 1 个风景或生活方式平衡节点。',
    },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Route design', zh: '路线设计' } },
      { label: { en: 'Core rule', zh: '核心规则' }, value: { en: 'Each city needs a job', zh: '每座城市都要有任务' } },
      { label: { en: 'Example logic', zh: '示例逻辑' }, value: { en: 'History + modernity + balance', zh: '历史 + 现代 + 平衡' } },
    ],
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'A good multi-city route is built on contrast and pacing. Beijing can open the historical frame, Shanghai can bring in modern energy, Xi’an can deepen the cultural layer, and a scenic city like Guilin, Yunnan or Zhangjiajie can keep the itinerary from feeling too dense.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The most common mistake is trying to put too many cities into too few days. That creates a trip that is technically full but practically tiring. A better route leaves space for movement, rest and one or two meaningful chapters instead of many shallow stops.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'If the itinerary already feels complete when you read it out loud, it is probably too full. A strong route should still feel breathable.' }] },
    ],
    mainImage: '/media/custom/destinations/xian/xian-1.jpg',
  },
  {
    slug: 'is-xinjiang-right-for-first-trip',
    title: {
      en: 'Is Xinjiang Right for Your First Trip to China?',
      zh: '新疆适合第一次来中国吗？',
    },
    tagline: {
      en: 'A beautiful destination, but one that works best for the right traveler and the right route.',
      zh: '它很美，但更适合对的人和对的路线。',
    },
    excerpt: {
      en: 'Xinjiang can be one of the most rewarding parts of a China trip, but it is not always the best first stop for every traveler. Because of its scale, travel rhythm and logistics, it usually works better when the route is already shaped around scenery and road-trip style travel.',
      zh: '新疆可以是中国行程里最有回报的部分之一，但并不总是适合作为每位游客的第一站。由于尺度、节奏与交通逻辑都比较特殊，它通常更适合已经按风景和公路线思路来设计的行程。',
    },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Scenery-first travelers', zh: '风景优先游客' } },
      { label: { en: 'Main question', zh: '核心问题' }, value: { en: 'Is your route ready for it?', zh: '你的路线是否适合它？' } },
      { label: { en: 'Travel style', zh: '旅行风格' }, value: { en: 'Landscape + road trip', zh: '风景 + 公路旅行' } },
    ],
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Xinjiang is strongest when the traveler wants scenery, open space and a route that feels very different from a standard city trip. If your first China trip is mainly about historical landmarks and easy city movement, Beijing, Shanghai and Xi’an are usually easier starting points.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'That does not mean Xinjiang is too difficult. It means the trip has to be designed around it instead of adding it casually at the end of a city-heavy route.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'For the right traveler, Xinjiang can become the most memorable part of the whole journey because it gives a sense of scale and scenery that few other parts of China can match.' }] },
    ],
    mainImage: '/media/custom/destinations/xinjiang/xinjiang-1.jpg',
  },
];

async function main() {
  const tx = client.transaction();
  for (const article of articles) {
    const slug = article.slug;
    const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, { slug });
    if (!existing?._id) continue;
    tx.patch(existing._id, {
      set: {
        title: article.title,
        tagline: article.tagline,
        excerpt: article.excerpt,
        heroFacts: article.heroFacts,
        content: article.content,
        mainImage: article.mainImage,
        author: 'Infinite Travel',
        publishDate: new Date('2026-04-18T00:00:00+08:00').toISOString(),
        published: true,
      },
    });
  }

  const result = await tx.commit();
  console.log(JSON.stringify({ patched: articles.length, transactionId: result.transactionId || null }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
