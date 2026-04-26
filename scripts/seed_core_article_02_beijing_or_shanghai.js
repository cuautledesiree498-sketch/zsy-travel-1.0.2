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

const slug = 'beijing-or-shanghai-first-trip-china';

function span(text) {
  return { _type: 'span', text, marks: [] };
}

function block(style, text) {
  return {
    _type: 'block',
    style,
    children: [span(text)],
    markDefs: [],
  };
}

const article = {
  _type: 'article',
  title: {
    en: 'Beijing or Shanghai: Which City Should You Visit First in China?',
    zh: '第一次来中国，先去北京还是上海？',
  },
  slug: { current: slug },
  author: 'Infinite Travel',
  publishDate: new Date('2026-04-26T02:45:00+08:00').toISOString(),
  tagline: {
    en: 'A plain-spoken comparison for first-time visitors choosing the right opening city.',
    zh: '给首次来中国游客的一份直接对比：先从哪座城市进入更合适。',
  },
  excerpt: {
    en: 'Beijing and Shanghai both work for a first trip to China, but they do very different jobs. Beijing gives history, national scale and landmark weight. Shanghai gives modern rhythm, skyline, food, shopping and a softer international landing. The better first city depends less on fame and more on what kind of China you want the trip to explain first.',
    zh: '北京和上海都适合作为第一次中国旅行的起点，但它们承担的任务完全不同。北京给你历史、国家尺度和地标重量；上海给你现代城市节奏、天际线、美食购物和更容易进入的国际化落点。先去哪里，不取决于谁更有名，而取决于你希望这趟旅行先解释怎样的中国。',
  },
  heroFacts: [
    { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'First-time China travelers', zh: '第一次来中国的游客' } },
    { label: { en: 'Beijing gives', zh: '北京提供' }, value: { en: 'History, scale, landmarks', zh: '历史、尺度、地标' } },
    { label: { en: 'Shanghai gives', zh: '上海提供' }, value: { en: 'Modern rhythm, skyline, ease', zh: '现代节奏、天际线、便利感' } },
    { label: { en: 'Quick answer', zh: '快速判断' }, value: { en: 'Choose by trip purpose, not city ranking', zh: '按旅行目的选，不按城市排名选' } },
  ],
  mainImage: '/media/custom/destinations/shanghai/shanghai-1.jpg',
  published: true,
  content: [
    block('normal', 'Beijing and Shanghai are often treated like a simple choice: which one is better? That is not the right question. For a first trip to China, the better question is: which city should open the story? Beijing and Shanghai both matter, but they make the traveler feel very different things in the first two days.'),
    block('normal', 'Beijing gives you weight. It puts history, politics, ceremony and scale in front of you almost immediately. Shanghai gives you movement. It feels easier, more contemporary, more polished, and often less intimidating for travelers who are entering China for the first time.'),
    block('normal', 'So the answer is not universal. Some travelers should absolutely start in Beijing. Some will enjoy China more if they begin in Shanghai. And for many people, the best route is not choosing one city over the other, but arranging them in the right order.'),

    block('h2', 'Choose Beijing first if you want China to feel historical from day one'),
    block('normal', 'Beijing is the clearer first stop if your main reason for visiting China is history, landmarks and the sense of a major civilization. The Forbidden City, the Great Wall, Temple of Heaven, hutongs and old city structure give the trip a strong opening frame. You do not need to explain why Beijing matters. The city explains itself quickly.'),
    block('normal', 'This is useful for first-time visitors who want to feel, very early in the trip, that they have arrived somewhere with depth. Beijing is not always the softest landing. It can feel large, serious and a little formal. But if the route needs a strong beginning, Beijing does that job better than almost anywhere else in China.'),

    block('h2', 'Choose Shanghai first if you want an easier modern landing'),
    block('normal', 'Shanghai is usually easier for travelers who want to settle in before moving into heavier historical or cultural stops. The city has a more international rhythm, a strong hotel and dining scene, walkable waterfront areas, shopping districts, museums, cafes and familiar urban cues. It gives visitors time to adjust without making the first day feel too dense.'),
    block('normal', 'This does not mean Shanghai is shallow. It means its value is different. Shanghai helps you see contemporary China: speed, design, commerce, lifestyle, skyline and a kind of urban confidence that feels very different from Beijing. If your travelers are nervous about China, or if they want comfort before depth, Shanghai is a smart opening city.'),

    block('h2', 'The biggest difference is the mood of the first 48 hours'),
    block('normal', 'If you start in Beijing, the first 48 hours often feel like: we are in a major historical capital. If you start in Shanghai, the first 48 hours often feel like: China is big, modern, stylish and easier to enter than expected. Both impressions are true, but they lead the trip in different directions.'),
    block('normal', 'This matters because the first two days set the traveler’s pace. A family with children may appreciate Shanghai’s softer entry. A history-focused couple may prefer Beijing’s immediate sense of purpose. A business traveler adding leisure days may find Shanghai more natural. A culture-focused visitor may feel Beijing is the real beginning.'),

    block('h2', 'If you only have 5 to 6 days, do not force both unless the pace is acceptable'),
    block('normal', 'For a short trip, Beijing plus Shanghai is possible, but it leaves less room than many people expect. You need to account for airport or rail transfers, hotel changes, and the fact that both cities deserve more than a quick pass. If the traveler does not like rushing, one city plus a nearby extension may be better.'),
    block('normal', 'For example, Shanghai with Suzhou or Hangzhou can make a polished, lower-stress short trip. Beijing with the Great Wall and a slower old-city day can also feel complete. A short route is not weak just because it has fewer cities. It can actually feel more premium because it gives the traveler time to breathe.'),

    block('h2', 'If you have 8 to 10 days, Beijing plus Shanghai makes more sense'),
    block('normal', 'With 8 to 10 days, Beijing and Shanghai can create a clean first-China route. Start in Beijing if you want the route to move from history to modernity. Start in Shanghai if you want an easier landing and a stronger finish in Beijing. Both orders can work.'),
    block('normal', 'The Beijing-first order feels more classic: imperial history, ancient capital atmosphere, then modern city energy. The Shanghai-first order feels smoother for some travelers: settle in, enjoy the city, then move toward the heavier cultural landmarks. The right order depends on arrival flights, traveler energy and what you want the emotional arc of the trip to be.'),

    block('h2', 'Where does Xi’an fit?'),
    block('normal', 'Xi’an changes the comparison. If you add Xi’an, Beijing and Shanghai no longer need to carry the whole route by themselves. Beijing can introduce national history, Xi’an can deepen the ancient-capital layer, and Shanghai can close with modern city life. This is why Beijing — Xi’an — Shanghai is such a stable first-time route.'),
    block('normal', 'But Xi’an should not be added just to make the trip look more complete. It needs time. If the schedule is already tight, adding Xi’an can turn a good Beijing-Shanghai route into a rushed three-city route. It is better to do two cities well than three cities badly.'),

    block('h2', 'Food, hotels and comfort feel different too'),
    block('normal', 'Shanghai often feels easier for travelers who care about hotel comfort, restaurants, shopping, nightlife and a polished city base. Beijing can also be very comfortable, but the experience is more spread out, and the day-to-day movement may feel heavier depending on where you stay and what you plan to see.'),
    block('normal', 'Food is not a simple win for either city. Beijing has roast duck, noodles, hotpot, old-style snacks and northern flavors. Shanghai has refined local dishes, international dining, cafes and nearby Jiangnan food culture. If food is a major reason for the trip, the better choice depends on whether the traveler wants tradition, variety, elegance or convenience.'),

    block('h2', 'For families, Shanghai may be easier; for culture-focused travelers, Beijing may be stronger'),
    block('normal', 'Families often appreciate Shanghai because the city gives more flexible days. You can build a comfortable route around the Bund, museums, parks, shopping streets, a river view, a food stop and maybe a nearby water town. It is easier to adjust the day if children get tired.'),
    block('normal', 'Beijing is stronger when the traveler wants the big cultural chapters. The Great Wall, Forbidden City and Temple of Heaven are not casual fillers. They are major experiences. But they also take energy. For older travelers, children or anyone who dislikes heavy walking days, Beijing needs more careful pacing.'),

    block('h2', 'A simple way to decide'),
    block('normal', 'Start with Beijing if your sentence is: “We want the trip to feel deeply Chinese from the beginning.” Start with Shanghai if your sentence is: “We want a comfortable first landing before going deeper.” Choose both if you have enough days and want the old-new contrast. Add Xi’an only if you have the time to let the history breathe.'),
    block('normal', 'The wrong choice is not Beijing or Shanghai. The wrong choice is treating them as interchangeable city names. They are not. They do different jobs, and the route works better when each city has a clear reason for being there.'),

    block('h2', '中文对应：第一次来中国，先去北京还是上海？'),
    block('normal', '北京和上海经常被问成一个很简单的问题：哪个更值得去？但对第一次来中国的游客来说，这个问法不太准确。更应该问的是：你希望这趟旅行用哪种方式开场？北京和上海都重要，但它们给人的第一印象完全不同。'),
    block('normal', '北京给的是重量。历史、国家尺度、仪式感和地标，会很快摆在你面前。上海给的是进入感。它更现代、更流动、更精致，对第一次来中国、还需要适应环境的游客来说，通常会更轻一点。'),

    block('h2', '如果你想第一天就进入历史感，先选北京'),
    block('normal', '如果你来中国最想看的就是历史、地标和文明尺度，北京更适合作为第一站。故宫、长城、天坛、胡同和老城结构，会很快帮你建立“中国之旅”的框架。北京不需要太多解释，它本身就很有分量。'),
    block('normal', '北京的问题是，它不一定是最轻松的落点。城市大，参观点重，节奏也会更正式一些。但如果你希望这趟旅行一开始就有很强的历史开场，北京非常合适。'),

    block('h2', '如果你想先舒服进入中国，先选上海'),
    block('normal', '上海更适合想先适应一下中国的游客。它有更国际化的城市节奏、成熟的酒店餐饮、外滩和天际线、购物街区、博物馆、咖啡馆和更熟悉的都市线索。游客不需要一落地就进入高强度历史参观。'),
    block('normal', '这不是说上海浅。上海的价值在于，它让你看到当代中国：速度、设计、商业、生活方式和城市自信。如果客人对中国有点陌生，或者希望先舒服地进入，再慢慢加深，上海是很聪明的起点。'),

    block('h2', '真正的差别，是前 48 小时的情绪'),
    block('normal', '从北京开始，前两天的感觉通常是：我到了一个很有历史重量的首都。从上海开始，前两天的感觉通常是：中国比想象中现代、方便，也更容易进入。这两个感受都真实，只是它们会把整趟旅行带向不同方向。'),
    block('normal', '所以要看同行人是谁。带孩子的家庭，可能更适合上海先落地；历史兴趣很强的夫妻，可能更适合北京开场；商务客人顺带旅行，上海会自然一些；文化型游客，则可能觉得北京才是正门。'),

    block('h2', '如果只有 5～6 天，不一定要硬塞两座城市'),
    block('normal', '北京 + 上海当然可以做，但如果只有 5～6 天，节奏会比想象中紧。高铁或飞机、换酒店、进出站、城市适应，这些都会吃掉时间。如果客人不喜欢赶路，一座城市加周边延伸，反而会更舒服。'),
    block('normal', '比如上海 + 苏州或杭州，可以做得很顺；北京 + 长城 + 老城慢节奏，也能很完整。城市少不代表路线弱，有时候恰恰是因为少，旅行才显得更高级。'),

    block('h2', '如果有 8～10 天，北京和上海可以一起放'),
    block('normal', '8～10 天左右，北京和上海放在同一条路线里会更合理。先北京后上海，是从历史走向现代；先上海后北京，是先轻松落地，再进入更重的文化章节。两个顺序都可以，关键看航班、体力和你想让这趟旅行形成什么情绪线。'),
    block('normal', '如果想要更经典，北京先行会更像标准答案。如果担心一开始太累，上海先行更柔和。路线没有绝对模板，只有适不适合这组客人。'),

    block('h2', '西安加入后，路线会更完整，但也更需要天数'),
    block('normal', '如果加入西安，北京和上海的分工会更清楚。北京负责国家尺度和历史开场，西安补上古都和更深的历史层，上海负责当代城市收尾。所以北京 — 西安 — 上海是一条很稳的首次中国路线。'),
    block('normal', '但西安不能只是为了“看起来更完整”而硬加。它需要时间。如果行程本来已经很紧，硬加西安会把一条不错的北京上海线，变成一条匆忙的三城打卡线。两座城市做好，往往比三座城市做薄更好。'),

    block('h2', '一个简单判断'),
    block('normal', '如果你的想法是“希望一开始就感受到中国的历史和分量”，先选北京。如果你的想法是“希望先舒服进入，再慢慢深入”，先选上海。如果天数足够，又想看新旧对比，那就两个都放。如果还想加西安，先确认天数真的够。'),
    block('normal', '错误不在于选北京还是选上海。真正的问题是把它们当成两个可以随便替换的城市名。它们不是。北京和上海承担的任务不同，路线只有在每座城市都有清楚理由时，才会真正顺。'),
  ],
};

async function main() {
  if (!token) throw new Error('Missing Sanity token. Set SANITY_API_TOKEN or create secrets/sanity_token.txt');
  const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, { slug });
  const doc = existing?._id
    ? await client.patch(existing._id).set(article).commit()
    : await client.create(article);
  console.log(JSON.stringify({ ok: true, action: existing?._id ? 'patched' : 'created', id: doc._id, slug }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
