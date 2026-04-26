const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = process.env.SANITY_API_TOKEN || (fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : undefined);
const client = createClient({ projectId: 'j7fa6cf0', dataset: 'production', apiVersion: '2026-04-03', useCdn: false, token });

const slug = 'multi-city-china-itinerary-not-rushed';
const span = (text) => ({ _type: 'span', text, marks: [] });
const block = (style, text) => ({ _type: 'block', style, children: [span(text)], markDefs: [] });

const article = {
  _type: 'article',
  title: {
    en: 'How to Plan a Multi-City China Itinerary That Does Not Feel Rushed',
    zh: '中国多城市路线怎么排，才不会一路赶？',
  },
  slug: { current: slug },
  author: 'Infinite Travel',
  publishDate: new Date('2026-04-26T03:50:00+08:00').toISOString(),
  tagline: {
    en: 'A good China route is built by rhythm and roles, not by collecting city names.',
    zh: '好的中国路线靠节奏和分工，不靠堆城市名。',
  },
  excerpt: {
    en: 'A multi-city China itinerary can be rich and smooth, or it can become a tiring chain of transfers. The difference is rarely the number of famous places alone. A good route gives each city a clear role, protects travel days, avoids unnecessary hotel changes, and leaves one or two softer chapters so the trip can breathe.',
    zh: '中国多城市路线可以很丰富，也可以变成一路转场。差别通常不在于城市名够不够响，而在于每座城市有没有任务、转场日有没有被保护、换酒店次数是否合理，以及路线里有没有一两段能让人喘口气的章节。',
  },
  heroFacts: [
    { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'Travelers planning 2–5 city routes', zh: '规划 2–5 城路线的游客' } },
    { label: { en: 'Core rule', zh: '核心规则' }, value: { en: 'Every city needs a job', zh: '每座城市都要有任务' } },
    { label: { en: 'Main risk', zh: '主要风险' }, value: { en: 'Too many transitions', zh: '转场太多' } },
    { label: { en: 'Better rhythm', zh: '更好节奏' }, value: { en: 'Anchor, depth, balance', zh: '锚点、深度、平衡' } },
  ],
  mainImage: '/media/custom/destinations/xian/xian-1.jpg',
  published: true,
  content: [
    block('normal', 'A multi-city China itinerary looks easy when it is still a list. Beijing, Xi’an, Shanghai, Chengdu, Guilin, Yunnan — each name feels useful, and deleting one feels like losing value. But a trip is not lived as a list. It is lived as mornings, meals, transfers, hotel rooms, tired feet and the mood of the group on day six.'),
    block('normal', 'The goal is not to make the route smaller for no reason. The goal is to make it readable. A strong multi-city route should feel like a sequence of chapters, not a stack of unrelated stops.'),

    block('h2', 'Start by giving every city a role'),
    block('normal', 'Before deciding how many days each city gets, ask what job the city is doing. Beijing may be the historical anchor. Xi’an may deepen the ancient-capital layer. Shanghai may bring modern contrast. Chengdu may soften the route with food and daily life. Guilin may give the trip a landscape chapter.'),
    block('normal', 'If a city does not have a clear role, it may not belong in this version of the trip. This sounds strict, but it protects the route. Famous cities are not automatically useful if they repeat the same function or force the traveler into too many transfers.'),

    block('h2', 'Use one anchor city'),
    block('normal', 'Most first-time multi-city routes need one anchor city. This is the city that gives the trip its main frame. For classic China routes, the anchor is often Beijing. For a modern and softer opening, it may be Shanghai. For a more relaxed, food-led route, Chengdu can also work.'),
    block('normal', 'The anchor city should not be rushed. If the first city is too thin, the rest of the trip feels unstable. A good anchor gives travelers enough context to understand why the later stops matter.'),

    block('h2', 'Add one depth stop, not three'),
    block('normal', 'A depth stop gives the route more substance. Xi’an is the most obvious example for many first-time visitors because it adds ancient history without requiring a completely different travel style. It turns a Beijing-Shanghai route into something more grounded.'),
    block('normal', 'But depth stops should be chosen carefully. Adding Xi’an, Luoyang, Nanjing and several historic towns to the same first trip may sound cultured, but it can blur the route. One strong depth stop is often better than several rushed ones.'),

    block('h2', 'Add a balance stop only when there is enough time'),
    block('normal', 'A balance stop changes the mood of the trip. It can be scenic, slower, food-focused or lifestyle-led. Guilin, Hangzhou, Suzhou, Chengdu, Yunnan or a softer countryside section can all play this role depending on the route.'),
    block('normal', 'The balance stop should make the trip easier to enjoy, not harder to operate. If adding a scenic place creates two extra transfers and only one real day there, it may not be balancing anything. It may just be another item on the list.'),

    block('h2', 'Protect travel days'),
    block('normal', 'A common planning mistake is treating transfer time as empty space that can still hold major sightseeing. Sometimes that works. Often it does not. A travel day already includes packing, checking out, station or airport movement, security, waiting, arrival, another transfer and check-in.'),
    block('normal', 'For high-comfort routes, avoid putting the heaviest experience right after a major transfer. If you must include something, make it light: a simple dinner, a short walk, a view near the hotel, or one flexible activity that can be dropped without damaging the trip.'),

    block('h2', 'Count hotel changes before adding attractions'),
    block('normal', 'Hotel changes are one of the best ways to measure route pressure. A 12-day route with three hotel bases can feel elegant. A 12-day route with six hotel changes can feel like work. The traveler may technically see more, but remember less.'),
    block('normal', 'This is especially important for families, older travelers, honeymooners, business guests and anyone arriving after a long international flight. A good route protects the traveler’s attention. Too many transitions spend it too early.'),

    block('h2', 'Do not let high-speed rail make the route careless'),
    block('normal', 'China’s high-speed rail is excellent, and it makes many multi-city routes possible. But it can also create overconfidence. A two-hour train ride is not just two hours. Door to door, it may use half a day, especially with luggage and first-time station navigation.'),
    block('normal', 'Use high-speed rail where it genuinely improves the route. Do not use it as an excuse to add cities that do not have enough time to matter.'),

    block('h2', 'A few route shapes that usually work'),
    block('h3', 'Classic first route: Beijing — Xi’an — Shanghai'),
    block('normal', 'This route works because the roles are clear. Beijing anchors the trip, Xi’an adds historical depth, and Shanghai closes with modern contrast. It is not original, but it is stable.'),
    block('h3', 'Softer city route: Shanghai — Chengdu — Beijing'),
    block('normal', 'This route works for travelers who want a less formal middle section. Shanghai is an easy landing, Chengdu adds food and lifestyle, and Beijing gives the route its landmark weight.'),
    block('h3', 'Classic plus scenery: Beijing — Xi’an — Shanghai — Guilin'),
    block('normal', 'This can work when there are enough days. Guilin changes the texture of the trip, but it should not be reduced to a rushed photo stop.'),

    block('h2', 'A simple test before finalizing the itinerary'),
    block('normal', 'Read the itinerary out loud and listen for the rhythm. If every sentence starts with “transfer to” or “early departure”, the route is probably too heavy. If each city has a role and the travel days do not feel overloaded, the route is much more likely to work.'),
    block('normal', 'A good multi-city China trip should still have energy near the end. The traveler should feel that the route opened China gradually, not that it kept demanding one more check-in.'),

    block('h2', '中文对应：中国多城市路线怎么排，才不会一路赶？'),
    block('normal', '中国多城市路线在清单阶段看起来很容易。北京、西安、上海、成都、桂林、云南，每个名字都像有价值，删掉一个就像亏了。但真正旅行不是按清单体验的，而是按每天早上、每顿饭、每次转场、每次换酒店和第六天的精神状态体验的。'),
    block('normal', '所以，多城市路线的目标不是无缘无故减少城市，而是让路线读得懂、走得下去。好的路线应该像几个有顺序的章节，而不是一堆互相没关系的停靠点。'),

    block('h2', '先给每座城市一个任务'),
    block('normal', '在分配天数前，先问这座城市承担什么任务。北京可能是历史锚点，西安负责古都深度，上海负责现代对比，成都负责美食和生活气，桂林负责山水章节。'),
    block('normal', '如果一座城市没有清楚任务，它未必适合放进这次路线。这个判断看起来有点严格，但能保护整条行程。城市有名，不代表它在这条路线里一定有用。'),

    block('h2', '先定一个锚点城市'),
    block('normal', '大多数首次中国多城市路线，需要一个锚点城市。它负责给整趟旅行定调。经典路线里，锚点常常是北京；如果想更现代、更容易进入，可以是上海；如果想更松、更重视美食生活，也可以是成都。'),
    block('normal', '锚点城市不能太赶。如果第一站太薄，后面路线会显得不稳。好的锚点会帮游客理解后面的城市为什么值得去。'),

    block('h2', '加一个深度节点，不要一口气加三个'),
    block('normal', '深度节点负责让路线更有内容。对很多首次访华游客来说，西安就是最典型的深度节点。它能在北京和上海之间补上古都和历史层，让路线更扎实。'),
    block('normal', '但深度节点不能无限加。西安、洛阳、南京、古镇都放进去，听起来很有文化，实际可能会让路线变散。一个强节点，往往比几个匆忙节点更好。'),

    block('h2', '有足够天数，再加平衡节点'),
    block('normal', '平衡节点负责改变旅行情绪。它可以是风景、慢节奏、美食或生活方式。桂林、杭州、苏州、成都、云南或某个更松的乡村段，都可能承担这个任务。'),
    block('normal', '但平衡节点应该让路线更舒服，而不是更难执行。如果为了加一个风景点，多出两次转场，却只在那里停一天，那它可能不是平衡，而只是清单上的又一个名字。'),

    block('h2', '保护转场日'),
    block('normal', '很多路线最大的问题，是把转场时间当成空白时间，觉得还能塞重项目。但一次换城市本来就包括打包、退房、去车站或机场、安检、等待、抵达、再转车和入住。'),
    block('normal', '如果想做得舒服，不要把最重的体验放在大转场后面。真要安排，也尽量放轻一点：简单晚餐、酒店附近散步、一个容易取消的轻项目。'),

    block('h2', '先数换酒店次数，再数景点'),
    block('normal', '换酒店次数，是判断路线压力最直接的指标之一。12 天换三次酒店，可能很从容；12 天换六次酒店，就会像在工作。游客可能看得更多，但记住得更少。'),
    block('normal', '家庭、年长游客、蜜月客人、商务客人和长途飞行后抵达的人，尤其需要控制转场。好的路线要保护注意力，而不是一开始就把它花光。'),

    block('h2', '不要因为高铁方便，就随便加城市'),
    block('normal', '中国高铁确实很好，也让很多多城市路线成为可能。但它也容易让人高估自己的节奏承受力。两小时高铁不是只有两小时，从酒店到酒店，可能就是半天。'),
    block('normal', '高铁应该用在真正让路线更顺的地方，而不是成为继续加城市的理由。'),

    block('h2', '几个比较稳的路线形状'),
    block('h3', '经典首访：北京 — 西安 — 上海'),
    block('normal', '这条路线稳定，是因为分工清楚。北京定调，西安加深历史，上海用现代城市收尾。它不新奇，但很稳。'),
    block('h3', '更松的城市线：上海 — 成都 — 北京'),
    block('normal', '适合想要轻一点中段的游客。上海容易进入，成都提供美食和生活气，北京补上地标重量。'),
    block('h3', '经典加风景：北京 — 西安 — 上海 — 桂林'),
    block('normal', '天数足够时可以成立。桂林能改变路线质感，但不能被压缩成匆忙拍照点。'),

    block('h2', '最终检查'),
    block('normal', '把行程读一遍，听它的节奏。如果每一句都是“早起前往”“转车去”“抵达后继续参观”，大概率太重了。如果每座城市都有任务，转场日没有被塞满，路线就更可能成立。'),
    block('normal', '好的中国多城市旅行，到最后还应该有精神。游客应该感觉自己是一步步打开中国，而不是一路完成新的入住和打卡。'),
  ],
};

async function main() {
  if (!token) throw new Error('Missing Sanity token. Set SANITY_API_TOKEN or create secrets/sanity_token.txt');
  const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, { slug });
  const doc = existing?._id ? await client.patch(existing._id).set(article).commit() : await client.create(article);
  console.log(JSON.stringify({ ok: true, action: existing?._id ? 'patched' : 'created', id: doc._id, slug }, null, 2));
}
main().catch((err) => { console.error(err); process.exit(1); });
