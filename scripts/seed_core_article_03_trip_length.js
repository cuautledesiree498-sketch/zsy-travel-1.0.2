const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = process.env.SANITY_API_TOKEN || (fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : undefined);

const client = createClient({ projectId: 'j7fa6cf0', dataset: 'production', apiVersion: '2026-04-03', useCdn: false, token });

const slug = 'how-many-days-for-first-china-trip';
const span = (text) => ({ _type: 'span', text, marks: [] });
const block = (style, text) => ({ _type: 'block', style, children: [span(text)], markDefs: [] });

const article = {
  _type: 'article',
  title: {
    en: 'How Many Days Do You Need for a First Trip to China?',
    zh: '第一次来中国，安排几天比较合适？',
  },
  slug: { current: slug },
  author: 'Infinite Travel',
  publishDate: new Date('2026-04-26T02:55:00+08:00').toISOString(),
  tagline: {
    en: 'A realistic timing guide for travelers who want the route to feel complete, not rushed.',
    zh: '一份更现实的天数判断指南：让路线完整，而不是赶完。',
  },
  excerpt: {
    en: 'A first China trip can be 5 days or 15 days, but the right length depends on the number of cities, the travel pace and whether you are adding scenic regions. This guide explains what works for 5–6 days, 7–8 days, 10 days and 12–14 days, with plain advice on when to stop adding places.',
    zh: '第一次来中国可以是 5 天，也可以是 15 天。真正影响天数的不是景点名气，而是城市数量、移动节奏，以及是否加入风景目的地。本文会直接说明 5–6 天、7–8 天、10 天、12–14 天分别适合怎么安排，以及什么时候该停止继续加城市。',
  },
  heroFacts: [
    { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'Travelers choosing trip length', zh: '正在判断旅行天数的游客' } },
    { label: { en: 'Short trip', zh: '短线' }, value: { en: '5–6 days: one city or two light stops', zh: '5–6 天：一城或轻量两站' } },
    { label: { en: 'Balanced trip', zh: '平衡路线' }, value: { en: '8–10 days: two to three cities', zh: '8–10 天：两到三座城市' } },
    { label: { en: 'Scenic add-on', zh: '加入风景' }, value: { en: '12–14 days works better', zh: '12–14 天更稳' } },
  ],
  mainImage: '/media/custom/destinations/xian/xian-1.jpg',
  published: true,
  content: [
    block('normal', 'The honest answer is that a first trip to China does not have one perfect length. You can make a useful short trip in 5 or 6 days. You can build a strong first route in 8 to 10 days. You can add a scenic chapter if you have 12 to 14 days. The problem starts when people choose the number of days first, then try to force every famous place into that frame.'),
    block('normal', 'China is large, and movement takes energy even when the transport itself is efficient. A high-speed train may be fast, but the day still includes packing, checking out, station transfer, security, waiting, arrival, another transfer and hotel check-in. That is why a route can look easy on paper and still feel tiring in real life.'),

    block('h2', '5 to 6 days: keep it focused'),
    block('normal', 'With 5 to 6 days, the safest answer is one main city, or one main city plus a nearby extension. Beijing with the Great Wall can feel complete. Shanghai with Suzhou or Hangzhou can feel polished and easy. Chengdu with a slower food-and-city rhythm can also work if the traveler wants a softer trip.'),
    block('normal', 'What does not work well is treating 5 days as a compressed version of a 10-day China route. Beijing, Xi’an and Shanghai in 5 or 6 days may be technically possible, but it becomes a logistics exercise. You see names, not places.'),

    block('h2', '7 to 8 days: two cities can work'),
    block('normal', 'With 7 to 8 days, two cities are usually reasonable. Beijing and Shanghai is the classic old-new contrast. Beijing and Xi’an is better if the traveler is strongly interested in history. Shanghai and Chengdu can work for people who want modern city life, food and a more relaxed pace.'),
    block('normal', 'The key is not to add too many side trips. A 7-day route with two cities and well-paced days can feel much better than an 8-day route that tries to include three cities, two train rides and a scenic detour.'),

    block('h2', '10 days: the strongest first-trip length for many travelers'),
    block('normal', 'For many first-time visitors, 10 days is the most practical sweet spot. It is long enough for a route like Beijing — Xi’an — Shanghai, but not so long that the trip becomes difficult to schedule. Each city has a job: Beijing gives scale and landmarks, Xi’an gives historical depth, and Shanghai gives the modern closing chapter.'),
    block('normal', 'A 10-day trip can also be shaped differently. Shanghai — Chengdu — Beijing is softer and more lifestyle-led. Beijing — Chengdu — Shanghai gives a mix of landmark weight, food culture and modern city rhythm. The best version depends on the traveler, not on a universal checklist.'),

    block('h2', '12 to 14 days: add scenery only if it improves the rhythm'),
    block('normal', 'Once the trip reaches 12 to 14 days, adding one scenic destination becomes more realistic. Guilin is a common choice because it changes the mood without making the route too difficult. Zhangjiajie is more dramatic but needs careful timing. Yunnan is better when treated as a real route section, not a quick add-on. Xinjiang usually needs even more respect for distance and pacing.'),
    block('normal', 'The important question is whether the scenic stop gives the route breathing room or just adds another transfer. If the traveler already feels tired by reading the itinerary, the scenic stop may not be solving the problem. It may be creating it.'),

    block('h2', 'A simple rule: count hotel changes, not just days'),
    block('normal', 'One useful way to test a route is to count hotel changes. A 10-day trip with two hotel changes may feel comfortable. A 10-day trip with five hotel changes may feel busy even if every city is interesting. For first-time visitors, the number of transitions often matters more than the number of attractions.'),
    block('normal', 'This is especially true for families, older travelers, business travelers adding leisure days, and anyone arriving after a long international flight. A good itinerary protects the traveler’s energy. It does not spend all of it on movement.'),

    block('h2', 'How many days should you choose?'),
    block('normal', 'Choose 5 to 6 days if you want a focused city trip. Choose 7 to 8 days if you want two cities without too much pressure. Choose about 10 days if this is your main first China trip and you want a balanced route. Choose 12 to 14 days if you want to add scenery or build a slower, more complete journey.'),
    block('normal', 'If you are unsure, do not start by asking how many famous places can fit. Start by asking how you want the trip to feel on day five. If the answer is “still curious, not exhausted”, the route is probably moving in the right direction.'),

    block('h2', '中文对应：第一次来中国，到底安排几天比较合适？'),
    block('normal', '第一次来中国没有一个固定标准答案。5～6 天可以做一趟有价值的短线，8～10 天可以做出一条很稳的首访路线，12～14 天才更适合加入风景目的地。问题通常不是天数太少，而是先定了天数，又想把所有著名城市都塞进去。'),
    block('normal', '中国很大，即使高铁和航班方便，移动本身仍然消耗体力。一次换城市，不只是坐车那几个小时，还包括打包、退房、去车站、安检、等待、到达、再转车、再入住。所以很多路线纸面上看起来没问题，真正走起来会很累。'),

    block('h2', '5～6 天：集中一点，不要压缩大路线'),
    block('normal', '如果只有 5～6 天，最稳的是一座主城市，或者一座主城市加一个周边延伸。北京 + 长城可以很完整；上海 + 苏州或杭州会比较轻松精致；成都也适合做一段更松的美食和城市节奏。'),
    block('normal', '不建议把 5～6 天当成 10 天路线的压缩版。北京、西安、上海硬塞进去，不是绝对做不到，但游客大多会在移动里消耗掉太多体验。最后记住的是城市名，而不是城市本身。'),

    block('h2', '7～8 天：两座城市比较合理'),
    block('normal', '7～8 天可以考虑两座城市。北京 + 上海适合做经典的新旧对比；北京 + 西安更适合历史兴趣强的游客；上海 + 成都适合想要现代城市、美食和松一点节奏的人。'),
    block('normal', '关键是不要继续加太多支线。两座城市排得舒服，通常比三座城市加一堆转场更好。第一次来中国，路线不是越满越值。'),

    block('h2', '10 天：很多首访中国路线的黄金长度'),
    block('normal', '对很多游客来说，10 天是最实用的平衡点。北京 — 西安 — 上海这类路线，在 10 天左右会比较成立。北京负责历史和国家尺度，西安补上古都深度，上海用现代城市节奏收尾。'),
    block('normal', '当然，10 天不一定只有这一种答案。上海 — 成都 — 北京会更松、更生活化；北京 — 成都 — 上海则能把地标、美食和现代城市放在一条线上。真正的判断标准不是模板，而是这组客人更适合怎样的节奏。'),

    block('h2', '12～14 天：可以加风景，但要看是否让路线更舒服'),
    block('normal', '如果有 12～14 天，可以考虑加一个风景目的地。桂林比较适合作为轻一点的山水章节；张家界视觉冲击强，但节奏要排好；云南更适合认真做成一段路线；新疆则更需要尊重距离和移动成本。'),
    block('normal', '风景目的地不是越多越好。它应该让路线换一种呼吸，而不是多一次折腾。如果你光看行程表就觉得累，那这个风景段可能不是在解决问题，而是在制造问题。'),

    block('h2', '一个简单检查：数换酒店次数'),
    block('normal', '判断路线累不累，不只看天数，还要看换酒店次数。10 天只换两次酒店，可能很舒服；10 天换五次酒店，就算每个地方都好，也会明显变忙。对第一次来中国的游客来说，转场次数往往比景点数量更影响体验。'),
    block('normal', '家庭、年长游客、长途飞行后抵达的人、商务行程后顺带旅行的人，都更需要保护体力。好的路线不是把每天都排满，而是让客人走到第五天、第六天时，还愿意继续期待后面的内容。'),

    block('h2', '最后怎么选？'),
    block('normal', '5～6 天适合做一座城市或轻量周边；7～8 天适合两座城市；10 天适合做一条比较完整的首次中国路线；12～14 天更适合加入风景或做得更慢、更完整。'),
    block('normal', '如果你拿不准，不要先问“能塞几个地方”。先问“走到第五天时，我希望自己是什么状态”。如果答案是还有兴趣，而不是已经疲惫，那这条路线大概率就更接近正确。'),
  ],
};

async function main() {
  if (!token) throw new Error('Missing Sanity token. Set SANITY_API_TOKEN or create secrets/sanity_token.txt');
  const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, { slug });
  const doc = existing?._id ? await client.patch(existing._id).set(article).commit() : await client.create(article);
  console.log(JSON.stringify({ ok: true, action: existing?._id ? 'patched' : 'created', id: doc._id, slug }, null, 2));
}

main().catch((err) => { console.error(err); process.exit(1); });
