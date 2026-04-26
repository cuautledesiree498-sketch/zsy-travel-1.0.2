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

const slug = 'first-trip-to-china-route-guide';

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
    en: 'How to Plan Your First Trip to China Without Overpacking the Route',
    zh: '第一次来中国怎么玩，才不容易把行程排得太满？',
  },
  slug: { current: slug },
  author: 'Infinite Travel',
  publishDate: new Date('2026-04-26T02:30:00+08:00').toISOString(),
  tagline: {
    en: 'A practical route guide for first-time visitors who want China to feel clear, not rushed.',
    zh: '给第一次来中国的游客一份更清楚、不赶路的路线判断指南。',
  },
  excerpt: {
    en: 'For a first China trip, the hardest question is usually not which famous places to see. It is how to put them in an order that still feels enjoyable after day three. This guide explains how to choose a starting city, when to add Xi’an, Chengdu or a scenic stop, and why a good first route is often calmer than the itinerary people first imagine.',
    zh: '第一次来中国，真正难的通常不是“有哪些著名景点”，而是怎么把城市顺序排得舒服。本文会讲清楚第一站怎么选，什么时候适合加西安、成都或风景目的地，以及为什么一条好的首访中国路线，往往比最初想象的更克制。',
  },
  heroFacts: [
    { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'First-time visitors to China', zh: '第一次来中国的游客' } },
    { label: { en: 'Useful trip length', zh: '参考天数' }, value: { en: '7–14 days', zh: '7–14 天' } },
    { label: { en: 'Core idea', zh: '核心判断' }, value: { en: 'Choose a route rhythm before adding cities', zh: '先定节奏，再加城市' } },
    { label: { en: 'Best starting points', zh: '常见起点' }, value: { en: 'Beijing, Shanghai or Chengdu', zh: '北京、上海或成都' } },
  ],
  mainImage: '/media/custom/destinations/beijing/beijing-1.jpg',
  published: true,
  content: [
    block('normal', 'Most first trips to China start with a long wish list. Beijing, Shanghai, Xi’an, Chengdu, Guilin, Zhangjiajie, Yunnan, Xinjiang — all of them sound worth seeing. The problem is that China is not a small country where every highlight can be stitched together casually. A route that looks exciting on a map can feel heavy once you add flights, train stations, hotel changes, early starts, meals and jet lag.'),
    block('normal', 'A better first route does not try to prove that you have seen everything. It gives you a clear first reading of China: one or two major cities, one deeper cultural chapter, and maybe one scenic or slower stop if you have enough days. That is usually enough for the trip to feel rich without turning into a transfer schedule.'),

    block('h2', 'Start with the kind of China you want to understand first'),
    block('normal', 'Before choosing cities, decide what kind of first impression matters most. If you want history, scale and landmarks, Beijing is the cleanest opening. If you want a softer landing with modern city life, skyline views and easier international rhythm, Shanghai can work well. If you care more about food, daily life and a warmer pace, Chengdu may feel more comfortable than people expect.'),
    block('normal', 'There is no single correct first city. Beijing is not “better” than Shanghai, and Shanghai is not “easier” for everyone. The right first stop is the one that gives the rest of the route a clear job. If the route begins with Beijing, the trip already has historical weight. If it begins with Shanghai, the trip starts with contemporary China. If it begins with Chengdu, the route feels more relaxed and lifestyle-led from the beginning.'),

    block('h2', 'For 7 days, keep the route simple'),
    block('normal', 'With 7 days, the safest plan is usually one main city plus one meaningful contrast, or two cities at most. Beijing and Shanghai can work if you want the classic old-and-new comparison. Beijing and Xi’an can work if history is the main reason for coming. Shanghai and Hangzhou or Suzhou can work if you prefer a gentler city-and-water-town rhythm.'),
    block('normal', 'What I would not do is squeeze Beijing, Xi’an, Shanghai and a scenic destination into the same 7 days. It may be technically possible, but the trip becomes too thin. You spend more time checking in, checking out and moving between places than actually understanding them.'),

    block('h2', 'For 10 days, add one deeper chapter'),
    block('normal', 'A 10-day first trip gives you more room. This is where a route like Beijing — Xi’an — Shanghai starts to make sense. Beijing gives the imperial and political frame. Xi’an adds the ancient-capital layer. Shanghai closes with a modern, polished city rhythm. The sequence feels logical because each city explains something different.'),
    block('normal', 'Another good 10-day version is Shanghai — Chengdu — Beijing, especially for travelers who want a softer mix of modern city life, food culture and landmarks. This is less “textbook classic”, but it can feel more human, especially for families or travelers who do not want every day to be monument-heavy.'),

    block('h2', 'For 12–14 days, you can add scenery — but choose carefully'),
    block('normal', 'Once you have 12 to 14 days, a scenic stop becomes more realistic. Guilin works well if you want a softer landscape chapter without making the route too remote. Zhangjiajie is stronger for dramatic scenery, but it needs careful pacing. Yunnan can be beautiful, but it is better treated as a route of its own rather than a quick add-on. Xinjiang is even more demanding: rewarding, but rarely a casual extra at the end of a first China trip.'),
    block('normal', 'The mistake is adding a scenic destination just because it looks impressive in photos. Some places need driving time, weather flexibility, and more patience with logistics. If the first half of the trip is already full, the scenic stop should calm the route down, not make it harder.'),

    block('h2', 'A good first route usually has three roles'),
    block('normal', 'Think of the route as three roles, not as a list of cities. First, an anchor city: Beijing, Shanghai or Chengdu. Second, a depth stop: often Xi’an, sometimes a cultural city or a slower regional base. Third, an optional balance stop: Guilin, Hangzhou, Suzhou, Yunnan or another place that changes the rhythm.'),
    block('normal', 'This way of planning prevents the common “city collection” problem. If two cities are doing the same job, one of them may be unnecessary. If every stop is intense, the trip needs a softer chapter. If every stop is soft, the route may lack a clear first-China impression.'),

    block('h2', 'Suggested first-trip routes'),
    block('h3', '7 days: Beijing + Shanghai'),
    block('normal', 'Best for travelers who want the simplest classic contrast. Beijing gives the Great Wall, Forbidden City and historical scale. Shanghai gives a modern skyline, urban polish and a very different rhythm. It is not the deepest route, but it is clean and easy to understand.'),
    block('h3', '10 days: Beijing + Xi’an + Shanghai'),
    block('normal', 'Best for a first China trip with a strong historical line. This is probably the most stable route for travelers who want famous landmarks but still need the itinerary to make sense. The key is not to overload each city with too many side trips.'),
    block('h3', '10–12 days: Shanghai + Chengdu + Beijing'),
    block('normal', 'Best for travelers who want cities, food and a more relaxed middle section. Chengdu gives the route warmth and a slower pace before or after the major landmark cities. It is especially useful when the trip should not feel too formal.'),
    block('h3', '12–14 days: Beijing + Xi’an + Shanghai + Guilin'),
    block('normal', 'Best when you want the classic route plus a scenic ending. Guilin works because it changes the mood of the trip without making the route feel as logistically heavy as some farther scenic regions. Still, it needs enough time to avoid becoming just a photo stop.'),

    block('h2', 'What to avoid on a first China trip'),
    block('normal', 'Avoid building the route only from famous names. Avoid changing hotels almost every night. Avoid adding a faraway scenic region without enough days. Avoid assuming high-speed rail solves every pacing problem. It helps with movement, but it does not remove the mental load of packing, transfers and new-city orientation.'),
    block('normal', 'Also avoid planning every day as if everyone will have full energy from morning to night. First-time visitors are often dealing with a new language environment, different food rhythm, payment habits, large stations, security checks and jet lag. A route with breathing room is not lazy. It is usually the reason the trip works.'),

    block('h2', 'What information helps us plan your route'),
    block('normal', 'If you are asking us to help shape your first China trip, the most useful details are simple: your rough dates, number of travelers, arrival and departure cities if known, travel pace, hotel comfort level, must-see places, and what you do not want. “We do not want to rush” is useful information. So is “we care more about food than museums” or “we have children and need shorter days”.'),
    block('normal', 'From there, we can usually tell whether your first idea is balanced, too full, or missing a stronger route logic. The goal is not to push you into a fixed package. It is to turn a loose wish list into a trip that feels coherent once you are actually in China.'),

    block('h2', '中文对应：第一次来中国，路线应该怎么想？'),
    block('normal', '第一次来中国，很多人一开始都会列出很长的愿望清单：北京、上海、西安、成都、桂林、张家界、云南、新疆，好像每个地方都值得去。但中国不是那种可以随手把所有亮点串起来的小目的地。地图上看起来很丰富的路线，真正落地后会变成航班、高铁站、换酒店、早起、吃饭、时差和每天重新适应一座城市。'),
    block('normal', '所以，第一次来中国更重要的不是“尽量多看”，而是先建立一条清楚的路线逻辑。通常来说，1～2 个主要城市，加上一个更有文化深度的节点，如果天数足够，再加一个风景或节奏更慢的目的地，就已经能让第一次中国旅行很完整。'),

    block('h2', '先想清楚：你想先理解怎样的中国？'),
    block('normal', '如果你想先看到历史、尺度和地标，北京通常是最清楚的开场。如果你更想从现代城市、天际线和国际化节奏进入，上海会更顺。如果你更在意美食、生活气和相对松弛的节奏，成都也可以成为很舒服的起点。'),
    block('normal', '没有哪座城市绝对正确。真正要看的是，它在整条路线里承担什么任务。北京负责历史重量，上海负责当代城市面貌，成都负责生活方式和松弛感。先把任务想清楚，再决定城市顺序，路线会稳很多。'),

    block('h2', '7 天以内，不要贪多'),
    block('normal', '如果只有 7 天，建议控制在一到两座主要城市。北京 + 上海适合做经典的新旧对比；北京 + 西安适合历史兴趣更强的游客；上海 + 杭州或苏州适合更轻一点的城市和江南节奏。'),
    block('normal', '不太建议 7 天里同时塞进北京、西安、上海和一个风景目的地。不是绝对做不到，而是会很薄：每个地方都只停一下，大量时间花在移动和换酒店上，真正留下来的体验反而不多。'),

    block('h2', '10 天，可以加入一个更深的章节'),
    block('normal', '10 天左右，北京 — 西安 — 上海是一条比较稳的首访中国路线。北京给你历史和国家尺度，西安补上古都和更深的文化层，上海最后收在现代城市节奏上。三座城市的角色不同，所以路线读起来比较顺。'),
    block('normal', '如果你不想每一天都很“地标导向”，也可以考虑上海 — 成都 — 北京。这个组合没有那么教科书式，但更有人味：现代城市、美食生活、历史地标都有，而且中段会松一些。'),

    block('h2', '12～14 天，可以加风景，但不要随便加'),
    block('normal', '如果有 12～14 天，再考虑加一个风景目的地会更合理。桂林适合作为比较轻的山水章节；张家界视觉冲击更强，但节奏要排好；云南很美，但更适合认真做成一段路线；新疆回报很高，但不适合随便塞在第一次中国旅行最后几天。'),
    block('normal', '风景目的地不能只因为照片好看就加。很多地方需要车程、天气弹性和更细的衔接。如果前半段已经很满，风景段应该让行程降速，而不是让它更累。'),

    block('h2', '一条好的首访路线，通常有三个角色'),
    block('normal', '可以把路线想成三个角色，而不是城市清单：第一是锚点城市，比如北京、上海或成都；第二是深度节点，比如西安或某个文化层更强的地方；第三是平衡节点，比如桂林、杭州、苏州、云南等，让路线不要一直处在高强度参观状态。'),
    block('normal', '这样规划的好处是，你会更容易发现哪些城市重复了，哪些地方只是“想去但不适合这次去”。如果两个城市承担同一个任务，就不一定都要放进来。如果每天都很满，就需要一个更松的章节。'),

    block('h2', '几个更稳的首访中国路线'),
    block('h3', '7 天：北京 + 上海'),
    block('normal', '适合想快速理解中国新旧对比的游客。北京看历史、长城、故宫和地标尺度；上海看现代城市、天际线和更精致的都市节奏。它不是最深的路线，但清楚、稳定、容易执行。'),
    block('h3', '10 天：北京 + 西安 + 上海'),
    block('normal', '适合第一次来中国、又希望历史线比较完整的游客。这条路线很经典，也相对不容易出错。关键是每座城市不要继续塞太多额外支线，否则经典路线也会变赶。'),
    block('h3', '10～12 天：上海 + 成都 + 北京'),
    block('normal', '适合想要城市、美食和更松节奏的游客。成都能让行程中段变得更有生活气，不至于一路都是强地标和强参观。家庭游客、朋友出行或者不想太正式的客人会更适合。'),
    block('h3', '12～14 天：北京 + 西安 + 上海 + 桂林'),
    block('normal', '适合想在经典路线后面加一点山水变化的游客。桂林的好处是能改变整趟旅行的气质，但又不会像更远的风景目的地那样重。前提是天数要够，不然它会变成一个匆忙拍照点。'),

    block('h2', '第一次来中国，最应该避免什么？'),
    block('normal', '不要只按名气排城市。不要几乎每天换酒店。不要在天数不够时硬加很远的风景区域。也不要以为高铁能解决所有节奏问题。高铁很方便，但它解决不了打包、进站、安检、换城市和重新适应环境带来的消耗。'),
    block('normal', '也不要把每一天都排成从早到晚满负荷。第一次来中国，本来就要适应语言、饮食、支付方式、大型车站和时差。留一点空白不是浪费，很多时候正是这些空白让旅行真正成立。'),

    block('h2', '如果你想让我们帮你规划，先准备这些信息'),
    block('normal', '最有用的信息其实不复杂：大致日期、人数、出入境城市、想去的地方、旅行节奏、酒店偏好、预算范围，以及明确不想要什么。比如“不想太赶”“更重视美食”“带孩子，希望每天短一点”，这些都比单纯列景点更有用。'),
    block('normal', '有了这些信息，我们就能判断你的初始想法是顺的、太满的，还是缺少一个更清楚的路线逻辑。我们的目标不是把你塞进固定产品，而是把一串松散愿望，整理成一条真正到了中国也能舒服执行的路线。'),
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
