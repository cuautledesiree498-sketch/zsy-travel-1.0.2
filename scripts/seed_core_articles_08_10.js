const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = process.env.SANITY_API_TOKEN || (fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : undefined);
const client = createClient({ projectId: 'j7fa6cf0', dataset: 'production', apiVersion: '2026-04-03', useCdn: false, token });

const span = (text) => ({ _type: 'span', text, marks: [] });
const block = (style, text) => ({ _type: 'block', style, children: [span(text)], markDefs: [] });

const articles = [
  {
    slug: 'is-xinjiang-right-for-first-trip-to-china',
    title: {
      en: 'Is Xinjiang Right for Your First Trip to China?',
      zh: '新疆适合第一次来中国吗？',
    },
    tagline: {
      en: 'Xinjiang can be unforgettable, but it should be chosen for the right reason and the right pace.',
      zh: '新疆很难忘，但前提是理由对、节奏对。',
    },
    excerpt: {
      en: 'Xinjiang is not an obvious first-trip destination for every traveler. Its scale is large, distances matter, and the route needs more time than a city-based China trip. This guide explains when Xinjiang is a strong first choice, when it is better saved for a later trip, and why timing, stamina and route design matter so much there.',
      zh: '新疆不是每个首次访华游客都适合立刻放进路线的目的地。它尺度大、距离长、对时间要求高。本文讲清楚：什么时候新疆适合作为第一次中国旅行的一部分，什么时候更适合留到后面，以及为什么它特别依赖时间、体力和路线设计。',
    },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'Travelers considering a long scenic route', zh: '考虑长线风景路线的游客' } },
      { label: { en: 'Main issue', zh: '主要问题' }, value: { en: 'Distance and pacing', zh: '距离与节奏' } },
      { label: { en: 'Good fit when', zh: '适合放入时机' }, value: { en: 'You have enough days and stamina', zh: '天数和体力都够' } },
      { label: { en: 'Rule of thumb', zh: '判断原则' }, value: { en: 'Treat it as a real chapter, not an add-on', zh: '把它当独立章节，不是尾巴' } },
    ],
    mainImage: '/media/custom/destinations/xinjiang/xinjiang-1.jpg',
    published: true,
    content: [
      block('normal', 'Xinjiang is one of the most memorable regions in China, but memorable does not mean easy. Its distances are large, its routes are more demanding, and the experience changes a lot depending on season, pace and the exact part of Xinjiang you are visiting.'),
      block('normal', 'That is why the question is not simply whether Xinjiang is “worth it”. The real question is whether it belongs on a first trip to China, and if so, what role it should play in the trip.'),
      block('h2', 'When Xinjiang can work for a first trip'),
      block('normal', 'Xinjiang can work if the traveler already has enough days, is comfortable with long scenic routes, and wants China to include a landscape chapter rather than only major cities. If the trip is 12–14 days or longer and the pacing is thoughtful, Xinjiang can be very powerful.'),
      block('normal', 'It also works better for travelers who are excited by distance, open space, different terrain and a more serious scenic journey. If that is the real goal, Xinjiang can be an excellent first encounter with China beyond the usual city line.'),
      block('h2', 'When it is better to save Xinjiang for later'),
      block('normal', 'If the traveler only has a short first China trip, Xinjiang is usually too much. The route needs too many days, too many transfers, and too much energy to fit comfortably into a first-time city route. In that case, saving it for a second trip is the smarter move.'),
      block('normal', 'It is also better saved for later if the traveler is still deciding between Beijing, Shanghai, Xi’an, Chengdu and a few other core cities. A first trip should not become a geography test. Xinjiang deserves space.'),
      block('h2', 'Why timing matters more here than in many other places'),
      block('normal', 'In Xinjiang, season is not a background detail. It affects comfort, scenery, road conditions and what kind of route can realistically be built. A good Xinjiang trip should be planned with season and route together, not separately.'),
      block('normal', 'That is one reason Xinjiang should not be casually attached to the end of a Beijing-Shanghai route. If the route is already full, Xinjiang can become the point where the trip stops feeling like a journey and starts feeling like a long chain of logistics.'),
      block('h2', 'A simple answer'),
      block('normal', 'Xinjiang is a strong first-trip choice only when the traveler really wants a scenic long route, has enough time, and accepts that the trip will need more careful design. Otherwise, it is usually better as a second trip or as the main focus of a future journey.'),
      block('normal', 'The mistake is not choosing Xinjiang. The mistake is choosing it without giving it the time and structure it needs.'),
      block('h2', '中文对应：新疆适合第一次来中国吗？'),
      block('normal', '新疆当然很值得去，但“值得去”不等于“适合第一次就硬塞进去”。它的尺度大，距离长，路线设计比普通城市线更吃天数、体力和节奏。'),
      block('normal', '所以，真正的问题不是“新疆好不好”，而是“它适不适合放进这次首访路线里”。'),
      block('h2', '什么时候可以放进首访路线'),
      block('normal', '如果客人本来就想做一条较长的风景线，天数足够，而且愿意接受长距离移动，那么新疆可以成为很强的第一趟中国旅行动机。特别是 12～14 天以上、节奏也安排得比较稳的时候，它会非常出彩。'),
      block('normal', '它更适合那些真的喜欢开阔地貌、长线旅行和景观变化的人。'),
      block('h2', '什么时候更适合留到后面'),
      block('normal', '如果第一次来中国总共只有几天，新疆通常太重了。因为它需要的不是“多加一个地方”，而是“专门为它留出一整段时间”。'),
      block('normal', '如果客人还在北京、上海、西安、成都这些核心城市之间做判断，那第一趟更适合先把城市线做好。新疆不适合变成一个临时尾巴。'),
      block('h2', '为什么新疆特别看季节'),
      block('normal', '新疆不是普通意义上的“哪个月都差不多”。季节会明显影响舒适度、风景状态、路况和整条路线的可执行性。好的新疆路线，必须把季节和路线一起设计。'),
      block('normal', '所以它不能像北京上海那样被随便接在最后。如果前面已经很满，再把新疆塞进去，整趟旅行很容易从“旅行”变成“赶路”。'),
      block('h2', '一句话结论'),
      block('normal', '新疆可以是第一次中国旅行的一部分，但前提是：天数够、体力够、节奏够，而且它是被当成独立章节来设计的。否则，更适合留给下一次。'),
    ],
  },
  {
    slug: 'china-family-travel-with-kids',
    title: {
      en: 'How to Plan a China Trip for Families with Kids',
      zh: '带孩子来中国旅游，怎么安排更省心？',
    },
    tagline: {
      en: 'Family routes work best when the day protects energy instead of chasing attraction count.',
      zh: '带孩子的路线，核心是保体力，不是堆景点。',
    },
    excerpt: {
      en: 'Family travel in China works best when the itinerary is built around energy, flexibility and simple movement. Children do not need a packed route to enjoy a trip, and parents usually need fewer transfers, cleaner hotel logic and more room for rest. This guide shows how to design a family-friendly China itinerary without making every day heavy.',
      zh: '带孩子来中国旅行，最重要的是体力、弹性和移动逻辑。孩子不需要满满当当的路线也能玩得开心，父母通常更需要少转场、酒店位置顺、每天留出休息余地。本文讲的是怎么把家庭路线做得省心，而不是把每天都排重。',
    },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'Families traveling with children', zh: '带孩子出行的家庭' } },
      { label: { en: 'Main goal', zh: '主要目标' }, value: { en: 'Protect energy', zh: '保护体力' } },
      { label: { en: 'Main risk', zh: '主要风险' }, value: { en: 'Too many long days and transfers', zh: '长日程和转场太多' } },
      { label: { en: 'Best route style', zh: '更适合的路线风格' }, value: { en: 'Fewer cities, easier rhythm', zh: '城市更少、节奏更轻' } },
    ],
    mainImage: '/media/custom/destinations/shanghai/shanghai-1.jpg',
    published: true,
    content: [
      block('normal', 'Family travel is not just adult travel with smaller travelers attached to it. Children change the route. They change the pace, the meal timing, the amount of walking, the tolerance for transfers and the amount of flexibility you need each day.'),
      block('normal', 'That is why the best family China trips are usually not the busiest ones. They are the ones that protect energy and leave room for adjustment.'),
      block('h2', 'Keep the route simple'),
      block('normal', 'For families, fewer cities are usually better. A route with one main city and one nearby extension often works better than a fast multi-city sequence. For example, Beijing plus the Great Wall, or Shanghai plus Suzhou, can be easier than a route that keeps changing hotels.'),
      block('normal', 'If the family really wants more, add slowly. But do not build the trip around the idea that children will somehow enjoy the same pace as adults.'),
      block('h2', 'Choose hotels that reduce friction'),
      block('normal', 'Hotel location matters a lot more for families. A better hotel is not simply one with a nice room. It is one that makes morning departure easier, keeps dinner simple, and avoids exhausting transfers after a long day.'),
      block('normal', 'In big cities, that usually means being careful about where you stay relative to the main activities. A family route should not spend its energy correcting a bad hotel choice every single day.'),
      block('h2', 'Leave room in the day'),
      block('normal', 'Children do not need every hour filled. In fact, too much structure usually makes the day harder. A family route works better when one or two major experiences are enough, and the rest of the day can stay flexible.'),
      block('normal', 'A slow lunch, a park stop, a return to the hotel, or one easy evening walk can do more for the trip than three extra attractions.'),
      block('h2', 'Pick activities that work in real life'),
      block('normal', 'Museums, parks, water towns, easy city views, short scenic visits and comfortable food stops often work better than long walking days or complicated sequences. The key is not to remove culture, but to shape it in a way the family can actually enjoy.'),
      block('normal', 'If the route includes children of different ages, this matters even more. The route should not require every child to have the same stamina.'),
      block('h2', 'Do not overestimate airport and train days'),
      block('normal', 'Travel days are usually the most tiring for families. Packing, waiting, moving luggage, and keeping everyone calm can easily consume the day. For that reason, a family route should avoid loading transfer days with major sightseeing.'),
      block('normal', 'If a move is unavoidable, keep the day light on purpose.'),
      block('h2', 'A good family route principle'),
      block('normal', 'The best family China trip is the one where parents do not spend every day solving logistics. When the hotel is right, the route is simple and the day has breathing room, children usually do better too.'),
      block('normal', 'A family trip should feel manageable, not heroic.'),
      block('h2', '中文对应：带孩子来中国旅游，怎么安排更省心？'),
      block('normal', '带孩子出行，不是成人旅行后面多带了一个小同行人，而是整条路线都会被改变。孩子会影响节奏、吃饭时间、步行量、转场承受度和每天需要多少弹性。'),
      block('normal', '所以，亲子路线真正重要的，不是“能不能多看几个景点”，而是“这条路线会不会太耗体力”。'),
      block('h2', '路线越简单，通常越省心'),
      block('normal', '带孩子时，城市越少通常越好。一城加周边，往往比快速切换多城更舒服。比如北京加长城，或者上海加苏州，都比不断换酒店更适合家庭。'),
      block('normal', '如果真的想加内容，也要慢慢加，不要默认孩子能跟上成人节奏。'),
      block('h2', '酒店位置很关键'),
      block('normal', '对家庭来说，酒店不是只看房间好不好，而是看它能不能减少每天的摩擦：早上出门是否方便、晚上吃饭是否顺路、一天结束后回去会不会太折腾。'),
      block('normal', '如果酒店选错了，路线每天都要替它“修补”，会非常累。'),
      block('h2', '每天都要留余地'),
      block('normal', '孩子不需要把每个小时都排满。反而是太满的日程，会让整天变得更难管理。对家庭来说，一天安排一两个重点，留一点自由时间，通常更好。'),
      block('normal', '慢一点的午饭、一个公园、回酒店休息、傍晚轻松散步，往往比再塞三个景点更有价值。'),
      block('h2', '活动要能落地'),
      block('normal', '博物馆、公园、水乡、轻松的城市观景点、舒服的餐厅，这些往往比长时间步行或者很复杂的转场更适合家庭。不是不要文化，而是要把文化做得孩子和父母都能消化。'),
      block('normal', '如果孩子年龄差很多，路线更要留弹性。不能要求每个孩子都用同样的体力走同样的路线。'),
      block('h2', '转场日别塞重项目'),
      block('normal', '对家庭来说，转场日通常最累。收拾行李、等待、移动、安抚情绪，很容易把一天耗掉。所以换城市那天尽量轻一些。'),
      block('normal', '真要移动，就让那天的内容少一点。'),
      block('h2', '一句话原则'),
      block('normal', '家庭路线最好的状态，是父母不用每天都在处理物流问题。酒店顺、路线简单、每天留余量，孩子通常也会更轻松。亲子旅行应该是可持续的，不是拼耐力的。'),
    ],
  },
  {
    slug: 'what-to-share-before-china-trip-design',
    title: {
      en: 'What to Tell Us Before We Design Your China Trip',
      zh: '我们帮你设计中国行程前，你最好先告诉我们什么？',
    },
    tagline: {
      en: 'Good route design starts with useful information, not vague interest in China.',
      zh: '好路线从有效信息开始，不从“我想去中国”开始。',
    },
    excerpt: {
      en: 'A better China itinerary starts when the traveler shares the right information: dates, number of travelers, age group, pace, hotel level, cities under consideration, interests, flights and any special needs. Without that, route design becomes guesswork. This article explains what helps us build a route that actually fits.',
      zh: '想把中国路线做得准，最重要的是先给出对的信息：日期、人数、年龄层、节奏、酒店档次、想去的城市、航班和特殊需求。没有这些，设计就只能猜。本文讲清楚，在真正开始设计前，最好先告诉我们哪些信息。',
    },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'Travelers requesting a custom route', zh: '希望定制路线的游客' } },
      { label: { en: 'Core idea', zh: '核心思路' }, value: { en: 'Give the route designer real constraints', zh: '给设计者真实约束' } },
      { label: { en: 'Bad input', zh: '低质量输入' }, value: { en: 'Just asking for a price', zh: '只问价格' } },
      { label: { en: 'Good input', zh: '高质量输入' }, value: { en: 'Dates, pace, cities, travelers, preferences', zh: '日期、节奏、城市、人数、偏好' } },
    ],
    mainImage: '/media/custom/destinations/beijing/beijing-1.jpg',
    published: true,
    content: [
      block('normal', 'Route design works best when the traveler shares real constraints instead of only a general interest. “We want to go to China” is a starting point, not a usable brief. To design a route that actually fits, the planner needs enough detail to understand who is traveling, when they are traveling, and what kind of trip they are trying to have.'),
      block('normal', 'The better the input, the better the route. That is true for almost any custom trip.'),
      block('h2', '1. Travel dates and flexibility'),
      block('normal', 'Dates matter because season, availability and route choice all depend on them. Even a good route can become awkward if the traveler only has a very narrow date window or if the dates overlap with a holiday period.'),
      block('normal', 'If there is any flexibility, say so. A trip with three possible departure weeks is easier to design than one locked to a single date.'),
      block('h2', '2. Number of travelers and age range'),
      block('normal', 'A family with children, a couple, a group of friends and a mixed-age group all need different pacing. The number of travelers also changes hotel choice, vehicle size and the way days should be structured.'),
      block('normal', 'Age range matters because walking tolerance, meal timing and transfer comfort all change the route.'),
      block('h2', '3. What kind of pace feels comfortable'),
      block('normal', 'Some travelers want a full day. Some want one main activity and a slower evening. Some dislike early starts. Some are fine with them. If the planner does not know the pace, the route may look good on paper but feel wrong in practice.'),
      block('normal', 'This is one of the most important things to explain early.'),
      block('h2', '4. Which cities or regions are already on your mind'),
      block('normal', 'If Beijing, Shanghai, Xi’an, Chengdu, Guilin, Yunnan or Xinjiang are already in your mind, say so. The route designer can then decide whether those cities fit the time and the group type, or whether the sequence needs to change.'),
      block('normal', 'Sometimes the most helpful answer is not “yes, add it”, but “this city should come later” or “this one does not fit this trip”.'),
      block('h2', '5. Hotel level and comfort expectations'),
      block('normal', 'A route changes a lot depending on whether the traveler wants simple, comfortable or higher-end hotels. Hotel level affects location, transit logic and budget. It is not a minor detail.'),
      block('normal', 'If the route designer does not know the comfort expectation, the quote will either be vague or mismatched.'),
      block('h2', '6. Interests and non-negotiables'),
      block('normal', 'Some travelers care most about history. Others care about food, shopping, scenery, art, family activity, photography or a more relaxed city experience. These priorities should be stated clearly because they change what belongs in the route.'),
      block('normal', 'It also helps to mention any non-negotiables: for example, “no very early starts”, “no long car transfers”, or “must include good vegetarian food”.'),
      block('h2', '7. Arrival and departure flights'),
      block('normal', 'Arrival and departure timing can change the whole route structure. A late-night arrival usually needs a softer first day. An early departure may need a simpler last night. Good route design always starts from the flight shape.'),
      block('normal', 'This is one of the easiest ways to make the trip feel calmer.'),
      block('h2', '8. Special needs and travel limits'),
      block('normal', 'If anyone in the group has mobility limits, food restrictions, health concerns, stroller needs or a low tolerance for crowded environments, say so early. These are not side notes; they are route-defining details.'),
      block('normal', 'A good planner does not treat them as exceptions at the end. They belong at the start.'),
      block('h2', 'A useful way to send the brief'),
      block('normal', 'The best brief is short but specific: dates, traveler count, age range, preferred pace, cities in mind, hotel level, key interests, flights and any special needs. That gives enough structure to design something real.'),
      block('normal', 'The route designer can then do actual work instead of guessing.'),
      block('h2', '中文对应：我们帮你设计中国行程前，你最好先告诉我们什么？'),
      block('normal', '路线设计最怕的不是需求多，而是信息太少。只说“我想去中国”是不够的，这只是一个起点，还不能拿来直接做路线。想把行程设计准，就要给出真实约束。'),
      block('normal', '信息越清楚，路线越容易做对。'),
      block('h2', '1. 出行日期和是否灵活'),
      block('normal', '日期很重要，因为季节、资源和路线选择都会受影响。如果日期卡得很死，或者正好碰到假期，路线就要更谨慎。'),
      block('normal', '如果日期有弹性，也最好提前说清楚。'),
      block('h2', '2. 人数和年龄层'),
      block('normal', '带孩子、两人出行、朋友拼团、老少混合团，路线都会不一样。人数还会影响房型、车辆和每天怎么安排。'),
      block('normal', '年龄层也很关键，因为步行能力、吃饭节奏和转场承受度都会不同。'),
      block('h2', '3. 能接受什么节奏'),
      block('normal', '有些人喜欢满一点，有些人只想每天一个重点；有些人不喜欢早起，有些人可以早出晚归。只要节奏没说清，路线就容易做偏。'),
      block('normal', '这是最该先讲的一项。'),
      block('h2', '4. 你已经想到的城市或区域'),
      block('normal', '如果你已经在想北京、上海、西安、成都、桂林、云南或新疆，直接说出来。我们才能判断这些地方到底适不适合当前时间和这组客人。'),
      block('normal', '很多时候，真正有用的答案不是“可以加”，而是“先别加”或者“放到后面更合适”。'),
      block('h2', '5. 酒店档次和舒适度'),
      block('normal', '酒店档次会直接影响路线。住得舒服不舒服、位置顺不顺、预算怎么分配，都会改变整条路线的设计方式。'),
      block('normal', '如果不说清楚，报价和方案都容易偏。'),
      block('h2', '6. 兴趣点和不能妥协的条件'),
      block('normal', '有人更重视历史，有人更重视美食、购物、风景、摄影、亲子活动或者轻松的城市体验。这些优先级要明确说出来，因为它们直接决定哪些内容该放进路线。'),
      block('normal', '如果有不能妥协的条件，也要提前讲，比如“不想太早起”“不想长途车”“需要素食”。'),
      block('h2', '7. 航班到达和离开时间'),
      block('normal', '到达和离开时间会改变整条路线的结构。晚到通常意味着第一天要轻一点；早走通常意味着最后一晚要简单一些。'),
      block('normal', '这一步处理好，整趟旅行会顺很多。'),
      block('h2', '8. 特殊需求和限制'),
      block('normal', '如果有行动不便、饮食禁忌、健康问题、推车需求或者对拥挤环境很敏感，也要提前讲。这些不是边角料，而是路线设计的基础信息。'),
      block('normal', '真正好的路线，不会把这些放到最后才处理。'),
      block('h2', '一句话总结'),
      block('normal', '最好的信息不是一大段愿望清单，而是能帮我们真正做路线的条件：日期、人数、年龄层、节奏、城市、酒店档次、兴趣、航班和特殊需求。把这些说清楚，路线才可能真的贴合你。'),
    ],
  },
];

async function upsertArticle(article) {
  if (!token) throw new Error('Missing Sanity token. Set SANITY_API_TOKEN or create secrets/sanity_token.txt');
  const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, { slug: article.slug });
  const payload = {
    _type: 'article',
    title: article.title,
    slug: { current: article.slug },
    author: 'Infinite Travel',
    publishDate: new Date('2026-04-26T04:00:00+08:00').toISOString(),
    tagline: article.tagline,
    excerpt: article.excerpt,
    heroFacts: article.heroFacts,
    mainImage: article.mainImage,
    published: true,
    content: article.content,
  };
  const doc = existing?._id ? await client.patch(existing._id).set(payload).commit() : await client.create(payload);
  return { id: doc._id, slug: article.slug, action: existing?._id ? 'patched' : 'created' };
}

(async () => {
  const results = [];
  for (const article of articles) {
    results.push(await upsertArticle(article));
  }
  console.log(JSON.stringify({ ok: true, results }, null, 2));
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
