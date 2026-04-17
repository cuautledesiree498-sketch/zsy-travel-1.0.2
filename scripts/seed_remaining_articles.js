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
    slug: 'private-vs-group-tours-china',
    title: {
      en: 'Private Tours vs Fixed Group Tours in China',
      zh: '中国私人定制团和固定拼团，到底差在哪？',
    },
    tagline: {
      en: 'The right format depends on flexibility, pacing and how much control you want over the trip.',
      zh: '选哪种形式，取决于你对灵活度、节奏和掌控感的要求。',
    },
    excerpt: {
      en: 'Private tours and fixed group tours solve different problems. Private tours are better when the route needs flexibility, pacing and customization; fixed group tours can work when the traveler mainly wants a simpler, lower-control option. In China, the difference becomes even more noticeable once the itinerary includes multiple cities or longer travel days.',
      zh: '私人定制团和固定拼团解决的是不同问题。私人团更适合需要灵活度、节奏控制和个性化安排的路线；固定拼团则适合想要更简单、低决策负担的游客。在中国，当行程涉及多城市或更长移动时，两者差异会更明显。',
    },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Choosing trip format', zh: '选择旅行形式' } },
      { label: { en: 'Private tour strength', zh: '私人团优势' }, value: { en: 'Flexibility and pacing', zh: '灵活与节奏' } },
      { label: { en: 'Group tour strength', zh: '拼团优势' }, value: { en: 'Simplicity', zh: '简单省心' } },
    ],
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Private tours are usually the better answer when the route has multiple cities, special timing needs or different traveler preferences inside one trip. They allow the itinerary to be adjusted around walking speed, meal preferences, arrival times and actual on-the-ground energy.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Fixed group tours can still be useful for travelers who want a simpler structure and do not need much control. But once the trip gets more complex, the lack of flexibility can make the route feel harder to enjoy.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'For China specifically, private tours often become the more practical option once the itinerary includes more than one major city or any scenic leg that needs timing control.' }] },
    ],
    mainImage: '/media/custom/destinations/shanghai/shanghai-1.jpg',
  },
  {
    slug: 'china-travel-planning-mistakes',
    title: {
      en: 'China Travel Planning Mistakes First-Time Visitors Often Make',
      zh: '第一次来中国，最常见的行程规划错误有哪些？',
    },
    tagline: {
      en: 'Most problems come from overload, bad pacing or choosing the wrong city sequence.',
      zh: '大多数问题都来自行程过满、节奏失衡或城市顺序不对。',
    },
    excerpt: {
      en: 'The most common planning mistakes are usually not about missing one famous attraction. They come from trying to fit too many cities into too few days, not leaving enough rest time, and building a route that looks good on paper but feels too heavy in practice.',
      zh: '最常见的规划错误，通常不是少看了一个著名景点，而是把太多城市塞进太少天数、没有留出休息时间，或者做出一条纸面上好看、实际却太累的路线。',
    },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Avoiding route mistakes', zh: '避免路线失误' } },
      { label: { en: 'Biggest risk', zh: '最大风险' }, value: { en: 'Overpacked itineraries', zh: '行程过满' } },
      { label: { en: 'Better approach', zh: '更好做法' }, value: { en: 'Fewer cities, better pacing', zh: '少一点城市，多一点节奏' } },
    ],
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'A very common mistake is treating China like a checklist. The route ends up with too many cities and too little time in each place, which makes the whole trip feel rushed and forgettable.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Another issue is ignoring the role of travel style. A route that works for a strong city traveler may not work for a scenic traveler, a family with children or someone who needs more recovery time between activities.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The best plans are usually simpler than people expect. A few strong chapters, with clear pacing, often produce a much better trip than a crowded route full of weak transitions.' }] },
    ],
    mainImage: '/media/custom/destinations/beijing/beijing-1.jpg',
  },
  {
    slug: 'how-many-days-for-china-trip',
    title: {
      en: 'How Many Days Do You Need for a China Trip?',
      zh: '去中国旅行，到底要留多少天才够？',
    },
    tagline: {
      en: 'The answer depends on whether you want one city, several cities or a scenic route.',
      zh: '答案取决于你是只去一座城市，还是要跑多个城市或风景线。',
    },
    excerpt: {
      en: 'There is no single correct trip length for China. A short city-focused trip can work in a few days, but once you add multiple cities or scenic destinations, the route usually needs more breathing room to feel comfortable and meaningful.',
      zh: '中国没有一个放之四海皆准的旅行天数。以城市为主的短途行程几天也可以成立，但一旦加入多城市或风景目的地，路线通常就需要更多呼吸空间，才会舒服且有内容。',
    },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Trip-length planning', zh: '旅行天数规划' } },
      { label: { en: 'Short answer', zh: '短答案' }, value: { en: 'More cities need more days', zh: '城市越多，天数越要加' } },
      { label: { en: 'Core principle', zh: '核心原则' }, value: { en: 'Breathing room matters', zh: '留呼吸空间很重要' } },
    ],
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'If your trip is mainly one city, you can keep it compact. But once the route involves Beijing plus Shanghai, or Beijing plus Xi’an plus one scenic stop, the trip usually starts to benefit from a longer window.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The biggest mistake is matching the trip length to the number of famous places rather than to the pace of the journey. A better question is how much time each chapter needs to feel complete.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'In practice, the right duration is the one that lets the traveler enjoy the trip without feeling like every day is a transfer day.' }] },
    ],
    mainImage: '/media/custom/destinations/xian/xian-1.jpg',
  },
];

async function main() {
  const tx = client.transaction();
  for (const article of articles) {
    const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, { slug: article.slug });
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
