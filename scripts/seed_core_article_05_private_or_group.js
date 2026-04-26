const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = process.env.SANITY_API_TOKEN || (fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : undefined);

const client = createClient({ projectId: 'j7fa6cf0', dataset: 'production', apiVersion: '2026-04-03', useCdn: false, token });

const slug = 'private-tour-or-group-tour-china';
const span = (text) => ({ _type: 'span', text, marks: [] });
const block = (style, text) => ({ _type: 'block', style, children: [span(text)], markDefs: [] });

const article = {
  _type: 'article',
  title: {
    en: 'Private Tour or Group Tour in China: Which One Fits You Better?',
    zh: '来中国旅游，私人定制团和固定跟团怎么选？',
  },
  slug: { current: slug },
  author: 'Infinite Travel',
  publishDate: new Date('2026-04-26T03:20:00+08:00').toISOString(),
  tagline: {
    en: 'The right choice depends on how much control, flexibility and pace you need — not just on price.',
    zh: '真正的区别不只是价格，而是掌控感、灵活度和旅行节奏。',
  },
  excerpt: {
    en: 'Private tours and fixed group tours solve different travel problems. A group tour can be simple and efficient when the route is standard and the traveler does not need much control. A private tour works better when the trip involves families, older travelers, business visits, special interests, multiple cities or a pace that needs adjusting. This guide explains how to choose without treating one format as automatically better.',
    zh: '私人定制团和固定跟团解决的是不同问题。固定团适合路线标准、决策负担低、对灵活度要求不高的旅行；私人团更适合家庭、年长游客、商务接待、特殊兴趣、多城市路线或需要调整节奏的行程。本文不把某一种形式说成绝对更好，而是讲清楚什么情况下该选哪一种。',
  },
  heroFacts: [
    { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'Travelers choosing service format', zh: '正在选择旅行形式的游客' } },
    { label: { en: 'Group tour strength', zh: '固定团优势' }, value: { en: 'Simplicity and structure', zh: '简单、有结构' } },
    { label: { en: 'Private tour strength', zh: '私人团优势' }, value: { en: 'Flexibility and pace control', zh: '灵活度和节奏控制' } },
    { label: { en: 'Main question', zh: '核心问题' }, value: { en: 'How much adjustment will the trip need?', zh: '这趟行程需要多少调整空间？' } },
  ],
  mainImage: '/media/custom/destinations/chengdu/chengdu-1.jpg',
  published: true,
  content: [
    block('normal', 'The choice between a private tour and a fixed group tour is often discussed as if one is simply better than the other. That is too simple. The better format depends on the traveler, the route, the budget, and how much adjustment the trip will need once real people are inside it.'),
    block('normal', 'A fixed group tour can be perfectly reasonable for a standard route. It gives structure, a clear schedule and fewer decisions. A private tour is not automatically “luxury” in the decorative sense. Its real value is control: control over pace, timing, hotel logic, food preferences, vehicle use, guide style and how the day changes when someone gets tired.'),

    block('h2', 'Choose a fixed group tour when the route is simple and you do not need much control'),
    block('normal', 'A group tour can work well when the traveler wants an easy framework and does not want to make many decisions. If the itinerary is standard, the dates are fixed, the budget is the main concern, and the traveler is comfortable following a shared schedule, a group tour may be enough.'),
    block('normal', 'This is especially true for short city routes or very classic sightseeing plans. If the traveler mainly wants transportation, basic guidance and a known route, there is no need to pretend every trip must be custom-made.'),

    block('h2', 'Choose a private tour when pace matters'),
    block('normal', 'Pace is where private tours become much more useful. Families with children, older travelers, guests with limited walking tolerance, business travelers with meetings, and visitors who do not want early starts every day all need room to adjust. A fixed group tour rarely has much space for that.'),
    block('normal', 'In China, this matters because many travel days involve large stations, big sites, security checks, walking, traffic and meal timing. A private route can slow down when needed, start later, shorten one day, or move a lighter activity into the afternoon. That flexibility often decides whether the trip feels comfortable or exhausting.'),

    block('h2', 'Choose private planning for multi-city China routes'),
    block('normal', 'The more cities a route includes, the more private planning helps. Beijing plus Shanghai may be simple enough. But once Xi’an, Chengdu, Guilin, Zhangjiajie, Yunnan or Xinjiang enters the route, timing and transitions become more important. The issue is not just booking tickets. It is making the whole route flow.'),
    block('normal', 'A private plan can decide where the traveler should stay, which transfer should be protected, where a slower day is needed, and which scenic section should not be rushed. A group tour usually asks the traveler to fit the schedule. A private route makes the schedule fit the traveler.'),

    block('h2', 'Food, interests and travel style also matter'),
    block('normal', 'Some travelers care about food more than landmarks. Some want photography time. Some want museums. Some want shopping, tea, architecture, family-friendly activities, business visits, university visits or a softer lifestyle route. These preferences are not small details. They change the shape of the day.'),
    block('normal', 'A fixed group tour usually has limited ability to make those adjustments. A private tour can build the route around the parts that actually matter to the traveler. That is often more valuable than adding more attractions.'),

    block('h2', 'Private does not mean every minute should be customized'),
    block('normal', 'A good private tour is not a route where every minute is complicated. In fact, the best private itineraries are often cleaner than group itineraries because they remove what the traveler does not need. Customization should make the trip clearer, not busier.'),
    block('normal', 'For example, a family might need fewer museums and more recovery time. A couple might want a slower dinner and one good city walk instead of three rushed stops. A business guest might need one reliable transfer and a polished evening plan rather than a full sightseeing day.'),

    block('h2', 'When price is the main factor'),
    block('normal', 'If the main goal is to keep the cost as low as possible, a fixed group tour may be more practical. Shared transport, fixed arrangements and pre-set schedules can reduce the cost per person. That is a real advantage, and it should not be dismissed.'),
    block('normal', 'But price should be compared against the right thing. A cheaper route that wastes time, creates fatigue or misses the traveler’s actual needs may not feel like good value. A private route costs more because it buys flexibility and attention. Whether that is worth it depends on the trip.'),

    block('h2', 'A simple way to decide'),
    block('normal', 'Choose a group tour if you want a standard route, fixed dates, simpler decisions and lower control. Choose a private tour if the trip involves children, older travelers, special interests, business timing, multiple cities, scenic regions or a strong need for comfort and adjustment.'),
    block('normal', 'If you are unsure, ask one question: if the plan changes on day three, who should adapt — the traveler or the itinerary? If the answer is the traveler, a group tour may be fine. If the answer is the itinerary, private planning is probably the better fit.'),

    block('h2', '中文对应：私人定制团和固定跟团，怎么选？'),
    block('normal', '私人定制团和固定跟团，不应该被简单理解成“哪个更高级”。它们解决的是不同问题。固定团给的是结构、确定性和较少决策；私人团真正值钱的地方，是对节奏、时间、酒店位置、餐食偏好、用车、导游方式和临时调整的掌控。'),
    block('normal', '所以，选择哪一种，不只看价格，而要看这趟旅行到底需要多少调整空间。'),

    block('h2', '路线简单、控制需求低，可以选固定团'),
    block('normal', '如果路线很标准，日期固定，预算是主要考虑，游客也能接受按照统一时间表行动，固定跟团是可以成立的。特别是短线城市观光或非常经典的景点路线，固定团能减少很多决策成本。'),
    block('normal', '这种情况下，不必强行说每一趟旅行都要私人定制。客人如果只是需要交通、基础讲解和一个明确行程，固定团就可能够用。'),

    block('h2', '只要节奏重要，私人团优势就会明显'),
    block('normal', '私人团最大的价值，往往不是“看起来更高端”，而是节奏可以调整。带孩子的家庭、年长游客、步行能力有限的人、有商务安排的人、不想每天早起的人，都需要更多弹性。固定团很难为单个客人的状态频繁调整。'),
    block('normal', '在中国旅行，这一点尤其重要。大型车站、安检、景区步行、城市交通和用餐时间，都会影响真实体验。私人路线可以晚一点出发、减少一天内容、把轻松项目放到下午，或者临时缩短某段安排。这些细节会直接决定旅行是舒服还是疲惫。'),

    block('h2', '多城市路线，更适合私人规划'),
    block('normal', '城市越多，私人规划越有价值。北京 + 上海可能还比较简单；但如果加入西安、成都、桂林、张家界、云南或新疆，路线衔接就会变得关键。问题不只是订票，而是让整条路线顺起来。'),
    block('normal', '私人规划会考虑住哪里更合理，哪段转场要保护，哪一天应该放慢，哪个风景段不能赶。固定团通常是让客人适应行程，私人路线则是让行程适应客人。'),

    block('h2', '兴趣差异也会改变路线'),
    block('normal', '有些游客更重视美食，有些想拍照，有些爱博物馆，有些需要购物、茶文化、建筑、亲子活动、商务参访或大学访问。这些不是小偏好，它们会改变一天的结构。'),
    block('normal', '固定团通常很难围绕这些偏好调整。私人团可以把时间放在真正重要的地方，而不是为了把景点数量做多。'),

    block('h2', '私人定制不等于把每天排得更复杂'),
    block('normal', '好的私人定制，反而经常比固定团更干净。它不是把所有东西都塞进去，而是删掉不适合这组客人的内容。定制的目的不是让路线更花，而是让路线更清楚。'),
    block('normal', '比如家庭游客可能需要少一点博物馆、多一点休息；情侣游客可能更想要一顿慢晚餐和一次好走的城市散步；商务客人可能只需要一个稳定转场和一个体面的晚间安排，而不是满满一天观光。'),

    block('h2', '如果价格是第一因素'),
    block('normal', '如果最重要的是降低成本，固定团通常更现实。共享交通、统一安排和固定时间表，确实可以降低人均成本。这是固定团的真实优势。'),
    block('normal', '但价格要和正确的东西比较。一条便宜但很累、浪费时间、又不符合客人需求的路线，不一定是真正划算。私人团贵一些，买到的是灵活度和关注度。值不值得，要看这趟旅行本身。'),

    block('h2', '最后怎么判断？'),
    block('normal', '如果你要的是标准路线、固定日期、少决策、低控制感，固定团可以考虑。如果你带孩子、带老人、有特殊兴趣、有商务时间、多城市路线、风景目的地，或者很在意舒适和调整空间，私人定制更适合。'),
    block('normal', '最简单的问题是：如果第三天状态变了，应该是游客适应行程，还是行程适应游客？如果是前者，固定团可以；如果是后者，私人规划更合理。'),
  ],
};

async function main() {
  if (!token) throw new Error('Missing Sanity token. Set SANITY_API_TOKEN or create secrets/sanity_token.txt');
  const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, { slug });
  const doc = existing?._id ? await client.patch(existing._id).set(article).commit() : await client.create(article);
  console.log(JSON.stringify({ ok: true, action: existing?._id ? 'patched' : 'created', id: doc._id, slug }, null, 2));
}

main().catch((err) => { console.error(err); process.exit(1); });
