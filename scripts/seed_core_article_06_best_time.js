const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = process.env.SANITY_API_TOKEN || (fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : undefined);

const client = createClient({ projectId: 'j7fa6cf0', dataset: 'production', apiVersion: '2026-04-03', useCdn: false, token });

const slug = 'best-time-to-visit-china-by-travel-style';
const span = (text) => ({ _type: 'span', text, marks: [] });
const block = (style, text) => ({ _type: 'block', style, children: [span(text)], markDefs: [] });

const article = {
  _type: 'article',
  title: {
    en: 'Best Time to Visit China for Different Travel Styles',
    zh: '不同旅行方式下，中国什么时候最适合去？',
  },
  slug: { current: slug },
  author: 'Infinite Travel',
  publishDate: new Date('2026-04-26T03:35:00+08:00').toISOString(),
  tagline: {
    en: 'Spring and autumn are useful answers, but they are not the whole answer.',
    zh: '春秋是稳妥答案，但不是所有路线的唯一答案。',
  },
  excerpt: {
    en: 'The best time to visit China depends on what kind of trip you are planning. Spring and autumn are usually the safest seasons for first-time visitors, but city trips, food routes, family travel, scenic journeys and long-distance regions such as Xinjiang or Yunnan each need a different timing logic. This guide explains how to choose the season by route style, not by a generic calendar answer.',
    zh: '中国什么时候最适合去，取决于你要做哪一种旅行。春秋通常是首次访华最稳妥的季节，但城市观光、美食路线、家庭旅行、风景目的地，以及新疆、云南这类长线区域，都有不同的时间逻辑。本文按旅行方式判断季节，而不是只给一个笼统答案。',
  },
  heroFacts: [
    { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'Season and route planning', zh: '季节与路线规划' } },
    { label: { en: 'Safest general answer', zh: '通用稳妥答案' }, value: { en: 'Spring and autumn', zh: '春季和秋季' } },
    { label: { en: 'Main exception', zh: '主要例外' }, value: { en: 'Scenic and long-distance routes', zh: '风景线与长距离路线' } },
    { label: { en: 'Planning rule', zh: '规划原则' }, value: { en: 'Choose by route style', zh: '按路线类型选季节' } },
  ],
  mainImage: '/media/custom/destinations/xinjiang/xinjiang-1.jpg',
  published: true,
  content: [
    block('normal', 'People often ask for the best month to visit China, as if the country has one neat travel season. It does not. China is too large, and the right timing depends on what kind of trip you are trying to build. A city route, a family trip, a food-focused journey and a long scenic route should not be judged by the same calendar.'),
    block('normal', 'That said, spring and autumn are usually the safest general answers. The weather is more comfortable in many cities, walking is easier, and the trip is less likely to be affected by extreme heat or winter cold. But “spring and autumn” is only the starting point. A better answer comes from the route style.'),

    block('h2', 'For first-time city routes, spring and autumn are the easiest'),
    block('normal', 'If your first trip is built around Beijing, Shanghai, Xi’an, Chengdu or other major cities, spring and autumn are usually the most comfortable. You will probably walk a lot, move between museums, streets, landmarks, restaurants and stations, and spend long hours outside. Mild weather makes a big difference.'),
    block('normal', 'April, May, September and October are often easier months for city-heavy routes. They do not guarantee perfect weather, but they usually give a better balance of temperature, walking comfort and overall energy. For first-time visitors, that balance matters more than chasing one theoretically perfect week.'),

    block('h2', 'For Beijing and northern China, avoid building everything around deep winter unless you want that mood'),
    block('normal', 'Beijing can be powerful in winter, but it is not the softest choice for every traveler. Cold weather changes the rhythm of the day. Outdoor sites feel heavier, breaks become more important, and families or older travelers may need a slower schedule.'),
    block('normal', 'Winter can still work if the traveler likes crisp air, fewer crowds and a more austere northern atmosphere. But it should be chosen intentionally. Do not choose a winter Beijing route just because the calendar happens to be free.'),

    block('h2', 'For Shanghai and eastern China, shoulder seasons feel polished'),
    block('normal', 'Shanghai, Suzhou and Hangzhou often work well in spring and autumn because the route can mix city walks, water-town texture, food, gardens and riverside evenings. These places benefit from weather that allows people to wander rather than rush between indoor stops.'),
    block('normal', 'Summer can still work, especially if the traveler is used to humidity and wants a lively city rhythm. But for a more refined first experience, shoulder seasons usually feel better. The route becomes less about escaping heat and more about enjoying the city.'),

    block('h2', 'For food-focused trips, season matters less than pace'),
    block('normal', 'If the trip is mainly about food, cities such as Chengdu, Chongqing, Shanghai and Beijing can work in more seasons than a scenic route. Restaurants, markets, tea houses, hotpot, street snacks and local dining do not depend on one perfect month in the same way that mountain or grassland scenery might.'),
    block('normal', 'The key is pace. Food trips should not be packed with heavy sightseeing every day. Leave room for slower meals, evening walks and recovery. A food route that looks light on paper may actually be richer than a full sightseeing schedule.'),

    block('h2', 'For families, choose comfort over dramatic scenery'),
    block('normal', 'Families should usually choose a season that protects energy. Mild weather, shorter transfers and flexible days matter more than chasing the most dramatic photo conditions. Children may not care whether a landscape is at its absolute seasonal peak if every day feels too hot, too cold or too long.'),
    block('normal', 'For family travel, spring and autumn are again useful, but the real rule is comfort. Avoid routes that combine heat, long transfers and heavy walking. A simpler route in a comfortable season will usually beat a famous route at the wrong pace.'),

    block('h2', 'For Guilin and southern scenery, think about rain and softness'),
    block('normal', 'Guilin and nearby scenic areas have a softer landscape rhythm. Mist, water, hills and village texture can be beautiful in different seasons, but rain and humidity should be considered. The best time is not only about clear skies; sometimes the atmosphere is part of the appeal.'),
    block('normal', 'Still, if this is a first China trip and Guilin is added after major cities, avoid making the scenic section too tight. Weather may shift, and the route needs some room. A rushed scenic stop can be more frustrating than no scenic stop at all.'),

    block('h2', 'For Yunnan, do not treat it as a quick add-on'),
    block('normal', 'Yunnan has many possible rhythms: Kunming, Dali, Lijiang, Shangri-La and other areas do not all feel the same. The season question depends on altitude, route length and what kind of experience the traveler wants. A soft city-and-lifestyle Yunnan route is different from a more mountainous one.'),
    block('normal', 'This is why Yunnan should not be casually attached to the end of a classic Beijing-Shanghai trip unless there are enough days. It deserves its own timing logic. If you add it, let it become a real chapter.'),

    block('h2', 'For Xinjiang, timing is part of the route design'),
    block('normal', 'Xinjiang is not a place where you can ignore timing and simply choose any available week. Distances are large, landscapes vary, and different sections can feel very different across the year. A good Xinjiang route should be planned with season, driving time, scenery goals and traveler stamina together.'),
    block('normal', 'For many travelers, Xinjiang works better as a serious scenic journey rather than a small add-on to a first China city route. When the timing is right, it can be one of the most memorable parts of China. When the timing is careless, the scale can become tiring.'),

    block('h2', 'Avoid major holiday assumptions'),
    block('normal', 'Chinese public holidays can change the experience. Some periods bring heavier domestic travel demand, more crowded attractions and tighter hotel or transport availability. This does not mean travel is impossible, but the route should be planned with more care.'),
    block('normal', 'If your dates overlap with a major holiday, it is better to simplify the route, protect hotel and transport arrangements earlier, and avoid building the plan around too many fragile transfers.'),

    block('h2', 'A practical seasonal answer'),
    block('normal', 'If this is your first China trip and you want the safest answer, choose spring or autumn. If you are building a city route, those seasons are usually easiest. If you are building a scenic route, choose timing by the specific region. If you are traveling with family, choose comfort first. If you are going to Xinjiang or Yunnan, treat the season as part of the route design, not an afterthought.'),
    block('normal', 'The best time to visit China is not just the month with pleasant weather. It is the time when your route, traveler type and pace can work together without forcing the trip to fight the season.'),

    block('h2', '中文对应：不同旅行方式下，中国什么时候最适合去？'),
    block('normal', '很多人会问“中国几月份最好玩”，好像全国只有一个标准旅行季。其实不是。中国太大，不同路线对季节的要求完全不同。城市观光、美食旅行、家庭出行、风景路线和新疆、云南这种长线区域，不能用同一个日历答案判断。'),
    block('normal', '当然，春季和秋季通常是最稳妥的通用答案。很多城市天气更舒服，步行更轻松，也更不容易遇到极端炎热或寒冷。但“春秋合适”只是起点，真正要看你做的是哪一种路线。'),

    block('h2', '首次城市路线，春秋最省心'),
    block('normal', '如果第一次来中国主要去北京、上海、西安、成都这些城市，春秋通常最舒服。城市旅行会有大量步行，博物馆、街区、地标、餐厅和车站之间不断切换，天气温和会明显降低疲劳感。'),
    block('normal', '4 月、5 月、9 月、10 月通常更适合城市型路线。它们不能保证每天完美天气，但整体上更容易兼顾温度、步行舒适度和旅行体力。对首次访华游客来说，这种稳定性比追求某个理论上的最佳周更重要。'),

    block('h2', '北京和北方，不要随便选深冬'),
    block('normal', '北京冬天当然也有力量感，但它不是所有游客最舒服的选择。寒冷会改变一天的节奏，户外参观更消耗，休息点更重要，家庭和年长游客尤其需要放慢。'),
    block('normal', '如果客人本来就喜欢冷空气、人少和北方冬季气质，冬天可以做。但这应该是有意识的选择，而不是因为刚好有空就随便安排。'),

    block('h2', '上海和江南，肩季更有精致感'),
    block('normal', '上海、苏州、杭州这类路线，很适合春秋。城市漫步、江南水乡、餐厅、园林、江边夜景，都需要一种可以慢慢走的天气。'),
    block('normal', '夏天也不是不能去，尤其是能接受湿热、又喜欢热闹城市节奏的游客。但如果想让第一次体验更精致、更从容，春秋通常更好。'),

    block('h2', '美食路线，季节没那么绝对，节奏更重要'),
    block('normal', '如果旅行重点是美食，成都、重庆、上海、北京这些城市在很多季节都可以成立。餐厅、茶馆、火锅、小吃和本地饮食，不像山地或草原风景那样依赖某一个完美月份。'),
    block('normal', '美食路线真正要注意的是节奏。不要白天排满重景点，晚上还想认真吃饭。留出慢餐、散步和恢复时间，体验反而更丰富。'),

    block('h2', '家庭旅行，舒适度优先于照片效果'),
    block('normal', '家庭出行最好优先考虑舒适。天气温和、转场短、每天有弹性，比追求某个目的地的最美照片季更重要。孩子未必在意风景是不是巅峰状态，但一定会感受到太热、太冷或太累。'),
    block('normal', '所以家庭路线可以优先选春秋，但更核心的是避免高温、长转场和重步行叠加。舒服季节里的简单路线，通常比错误节奏里的著名路线更好。'),

    block('h2', '桂林和南方山水，要考虑雨和氛围'),
    block('normal', '桂林这类南方山水目的地，不一定只追求晴天。水、雾、山和村落质感，在不同季节都有不同味道。但雨水、湿度和行程弹性要考虑进去。'),
    block('normal', '如果桂林是接在北京、上海、西安之后的风景段，不要排得太紧。天气可能变化，风景路线需要一点余量。太赶的风景段，有时比不加还让人遗憾。'),

    block('h2', '云南不要当成随手加上的尾巴'),
    block('normal', '云南内部差异很大。昆明、大理、丽江、香格里拉和其他区域，海拔、气候和旅行节奏都不一样。云南的最佳时间，要看具体路线和客人想要的体验。'),
    block('normal', '所以云南不适合在天数不够时，随便接在北京上海路线后面。它更像一个独立章节。如果要加，就应该认真给它时间。'),

    block('h2', '新疆的时间，本身就是路线设计的一部分'),
    block('normal', '新疆不能只看“哪周有空”。它地域大，景观差异大，不同区域在一年里的状态也不同。好的新疆路线，要把季节、车程、风景目标和游客体力一起考虑。'),
    block('normal', '对很多游客来说，新疆更适合作为认真规划的风景长线，而不是第一次中国城市路线后面的一个小加项。时间选对，它会非常难忘；时间和节奏选错，它的尺度也会变成负担。'),

    block('h2', '不要忽略中国公共假期'),
    block('normal', '中国公共假期会明显改变旅行体验。部分时间段国内出行需求更高，景点更拥挤，酒店和交通资源也更紧。这不是说不能旅行，而是路线要更谨慎。'),
    block('normal', '如果日期正好碰到大假期，建议简化路线，提前保护酒店和交通安排，少做太多脆弱转场。'),

    block('h2', '实用结论'),
    block('normal', '如果是第一次来中国，想要最稳妥答案，春秋优先。城市路线，春秋通常最舒服；风景路线，要看具体区域；家庭旅行，先看舒适度；新疆和云南，要把季节当成路线设计的一部分，而不是最后才想。'),
    block('normal', '中国最适合去的时间，不只是天气舒服的月份，而是路线、同行人和节奏都能配合起来的时间。'),
  ],
};

async function main() {
  if (!token) throw new Error('Missing Sanity token. Set SANITY_API_TOKEN or create secrets/sanity_token.txt');
  const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, { slug });
  const doc = existing?._id ? await client.patch(existing._id).set(article).commit() : await client.create(article);
  console.log(JSON.stringify({ ok: true, action: existing?._id ? 'patched' : 'created', id: doc._id, slug }, null, 2));
}

main().catch((err) => { console.error(err); process.exit(1); });
