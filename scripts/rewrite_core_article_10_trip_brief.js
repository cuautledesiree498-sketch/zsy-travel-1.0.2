const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = process.env.SANITY_API_TOKEN || (fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : undefined);
const client = createClient({ projectId: 'j7fa6cf0', dataset: 'production', apiVersion: '2026-04-03', useCdn: false, token });

const slug = 'what-to-share-before-china-trip-design';
const span = (text) => ({ _type: 'span', text, marks: [] });
const block = (style, text) => ({ _type: 'block', style, children: [span(text)], markDefs: [] });

const article = {
  _type: 'article',
  title: {
    en: 'What to Tell Us Before We Design Your China Trip',
    zh: '我们帮你设计中国行程前，你最好先告诉我们什么？',
  },
  slug: { current: slug },
  author: 'Infinite Travel',
  publishDate: new Date('2026-04-26T04:40:00+08:00').toISOString(),
  tagline: {
    en: 'A better itinerary starts when the brief gives real constraints, not just a list of places.',
    zh: '好路线不是从城市清单开始，而是从真实约束开始。',
  },
  excerpt: {
    en: 'A good custom China itinerary depends on the quality of the travel brief. Dates, traveler count, age range, pace, hotel expectations, interests, flights, budget range and special needs all change the route. This guide explains what information is useful before we design your trip, and why a clearer brief usually leads to a smoother, more realistic itinerary.',
    zh: '一条好的中国定制路线，很大程度取决于前期信息是否准确。日期、人数、年龄层、节奏、酒店期待、兴趣点、航班、预算范围和特殊需求，都会直接改变路线。本文讲清楚：在我们开始设计行程前，你最好先告诉我们什么，以及为什么信息越清楚，方案越容易真正贴合你。',
  },
  heroFacts: [
    { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'Travelers requesting a custom China itinerary', zh: '准备定制中国行程的游客' } },
    { label: { en: 'Core idea', zh: '核心思路' }, value: { en: 'Constraints make the route better', zh: '约束越清楚，路线越准' } },
    { label: { en: 'Most useful info', zh: '最有用信息' }, value: { en: 'Dates, pace, travelers, hotels, interests', zh: '日期、节奏、人数、酒店、兴趣' } },
    { label: { en: 'Avoid', zh: '避免' }, value: { en: 'Asking only “how much” too early', zh: '一开始只问多少钱' } },
  ],
  mainImage: '/media/custom/destinations/beijing/beijing-1.jpg',
  published: true,
  content: [
    block('normal', 'A custom itinerary is only as good as the brief behind it. “We want to visit China” is a useful starting point, but it is not enough to design a trip that fits real people. China is too large, and the same city names can become very different trips depending on dates, pace, hotels, flights and traveler type.'),
    block('normal', 'The goal is not to make you fill out a complicated form. The goal is to avoid guessing. A clear brief helps us decide what belongs in the route, what should be removed, where the trip needs buffer, and where the budget should actually be spent.'),

    block('h2', '1. Your travel dates, or at least your possible window'),
    block('normal', 'Dates are the first practical constraint. They affect season, weather, hotel availability, flight logic, public holidays and the kind of route that makes sense. A route that works well in autumn may feel different in winter. A route that is easy in a quiet week may need more protection during a busy holiday period.'),
    block('normal', 'If your dates are fixed, tell us clearly. If they are flexible, that is also important. Even a small amount of date flexibility can improve the route, reduce pressure, or give better hotel and transport options.'),

    block('h2', '2. How many people are traveling, and who they are'),
    block('normal', 'A couple, a family with children, a group of friends, a business guest, and a mixed-age family do not need the same China trip. Traveler count affects rooms, vehicles, guide style, dining choices and the rhythm of the day. Age range matters too, because walking tolerance and transfer comfort change the route.'),
    block('normal', 'This is especially important when the group includes children, older travelers, or people who move at different speeds. A route that looks normal for two active adults may be too heavy for a family group.'),

    block('h2', '3. Your preferred pace'),
    block('normal', 'Pace is one of the most useful things to explain early. Some travelers like full days and do not mind early starts. Some want one main experience per day and a slower evening. Some want shopping time, long meals or quiet afternoons. None of these preferences are wrong, but they create different itineraries.'),
    block('normal', 'If you do not tell us your pace, we have to guess. That is how routes become technically correct but emotionally wrong. A trip can include the right cities and still feel too rushed if the pace does not match the traveler.'),

    block('h2', '4. The cities or regions already in your mind'),
    block('normal', 'If you already have Beijing, Shanghai, Xi’an, Chengdu, Guilin, Yunnan or Xinjiang in mind, say so. We can then judge whether those places fit your dates and group type. Sometimes the answer is yes. Sometimes the better answer is to change the order, reduce the number of cities, or save one region for another trip.'),
    block('normal', 'A good planner should not simply approve every place on a wish list. The job is to turn interest into a route that can actually be enjoyed.'),

    block('h2', '5. What kind of trip you want China to become'),
    block('normal', 'This is different from listing cities. Do you want the trip to feel historical, modern, scenic, food-focused, family-friendly, relaxed, high-end, educational, or more adventurous? The same destination can be used in different ways depending on the purpose.'),
    block('normal', 'For example, Chengdu can be a food stop, a family-friendly panda stop, a slower lifestyle stop, or a base for nearby extensions. Shanghai can be a modern opening, a shopping-focused city stay, a design-and-food chapter, or an easy final stop before departure. Purpose changes the route.'),

    block('h2', '6. Hotel level and comfort expectations'),
    block('normal', 'Hotel level is not only about price. It affects location, transfer logic, room comfort, breakfast, service expectations and how much energy the trip saves each day. A traveler who wants a polished private route and a traveler who wants a simple practical route should not receive the same hotel plan.'),
    block('normal', 'You do not need to know the exact hotel name at the beginning. But it helps to describe the comfort level: simple and clean, comfortable mid-range, boutique, luxury, family-friendly, business-style, or something else. This keeps the route and budget realistic.'),

    block('h2', '7. Budget range, even if it is approximate'),
    block('normal', 'Many travelers hesitate to share a budget because they worry the price will automatically rise to meet it. But without any budget range, the route designer has to guess hotel level, guide coverage, vehicle standard and how much private support to include. That can waste time on plans that are too high or too low for the real trip.'),
    block('normal', 'A budget range does not need to be exact. It simply helps decide the design lane. A private multi-city trip with higher-end hotels is a different product from a lighter route with selective private support.'),

    block('h2', '8. Flights, arrival city and departure city'),
    block('normal', 'Arrival and departure details can reshape the entire itinerary. A late-night arrival should not be followed by the heaviest sightseeing day. An early departure may require a calmer final night. Open-jaw flights, such as arriving in Beijing and leaving from Shanghai, can make a route smoother than returning to the same city.'),
    block('normal', 'If flights are not booked yet, tell us that too. Sometimes the route should be designed before flights are finalized, so the flight choice supports the trip instead of forcing awkward backtracking.'),

    block('h2', '9. Food preferences and restrictions'),
    block('normal', 'Food is a major part of China travel, but it should be planned honestly. Vegetarian needs, allergies, halal requirements, children’s food preferences, spice tolerance and comfort-food needs can all affect the route. These details are not minor once people are actually traveling.'),
    block('normal', 'If food is a highlight, we can shape the route around it. If food is a concern, we can build in safer meals and backup options. Either way, it is better to know early.'),

    block('h2', '10. Mobility limits, health concerns and travel habits'),
    block('normal', 'If anyone has mobility limits, back or knee issues, stroller needs, low tolerance for stairs, sensitivity to heat, or discomfort with long car rides, tell us before the route is built. These are not exceptions to fix later. They are design conditions.'),
    block('normal', 'This kind of information can change which hotel area is sensible, how long a walking day should be, whether a scenic region is realistic, and whether private vehicle support is important.'),

    block('h2', '11. What you definitely do not want'),
    block('normal', 'Negative preferences are often as useful as positive ones. If you do not like early mornings, heavy shopping, long museums, crowded markets, long drives, spicy food or very formal sightseeing days, say so. Removing the wrong content can improve a route as much as adding the right content.'),
    block('normal', 'A custom itinerary should not be a generic China tour with your name on it. It should reflect what you want and what you would rather avoid.'),

    block('h2', 'A short example of a useful brief'),
    block('normal', 'A useful message might look like this: “We are a family of four, children aged 8 and 12, hoping to travel for 10 days in October. We are considering Beijing, Xi’an and Shanghai, but do not want too many hotel changes. We prefer comfortable hotels, private guide support on key days, local food but not very spicy meals, and a pace with one major activity per day.”'),
    block('normal', 'That kind of brief is not long, but it gives real design information. From there, we can suggest a route with confidence instead of guessing.'),

    block('h2', 'The point is not to know everything in advance'),
    block('normal', 'You do not need to arrive with a perfect plan. That is what the planning process is for. But the more honestly you describe your travelers, constraints and priorities, the better the first proposal will be.'),
    block('normal', 'Good custom travel is not about filling a template. It is about matching a route to real people.'),

    block('h2', '中文对应：我们帮你设计中国行程前，你最好先告诉我们什么？'),
    block('normal', '一条定制路线好不好，很大程度取决于一开始的信息。只说“我想去中国”，当然是一个起点，但还不足以设计出真正适合人的行程。中国太大，同样是北京、上海、西安，因为日期、节奏、酒店、航班和同行人不同，会变成完全不同的旅行。'),
    block('normal', '我们不是要你填一张复杂表格，而是为了减少猜测。信息清楚，才能判断哪些地方该放、哪些地方该删、哪里需要留余量、预算应该花在哪里。'),

    block('h2', '1. 出行日期，或者大致时间范围'),
    block('normal', '日期是第一个真实约束。它会影响季节、天气、酒店资源、航班逻辑、公共假期和路线选择。同一条路线，秋天可能很顺，冬天就要换节奏；平日可行的安排，假期可能需要更多保护。'),
    block('normal', '如果日期固定，就直接说清楚。如果日期有弹性，也很重要。哪怕只是前后有几天余地，也可能让路线更顺、酒店选择更好、转场压力更小。'),

    block('h2', '2. 几个人出行，以及同行人是谁'),
    block('normal', '情侣、亲子家庭、朋友团、商务客人、老少混合家庭，需要的路线完全不同。人数会影响房型、车辆、导游方式、用餐选择和每天节奏。年龄层也重要，因为步行能力和转场承受度会改变路线。'),
    block('normal', '如果有孩子、年长者，或者同行人速度差异很大，一定要提前说。适合两个年轻人的路线，未必适合一个家庭。'),

    block('h2', '3. 你们能接受什么旅行节奏'),
    block('normal', '节奏是最该先说明的信息之一。有些人喜欢满一点，不介意早起；有些人一天只想一个重点，晚上慢慢吃饭；有些人需要购物时间、长餐时间或安静下午。没有哪种偏好是错的，但它们会做出完全不同的路线。'),
    block('normal', '如果节奏不说清，我们只能猜。很多路线城市选对了，但走起来仍然不舒服，原因就是节奏不匹配。'),

    block('h2', '4. 已经想到的城市或区域'),
    block('normal', '如果你已经在想北京、上海、西安、成都、桂林、云南或新疆，直接告诉我们。我们会判断这些地方是否适合当前日期和同行人。有时候答案是可以；有时候更好的答案是换顺序、减少城市，或者把某个区域留到下一次。'),
    block('normal', '好的规划不是把愿望清单全部批准，而是把兴趣变成真正能走、能享受的路线。'),

    block('h2', '5. 你希望这趟中国旅行是什么感觉'),
    block('normal', '这和列城市不一样。你希望它更历史、更现代、更风景、更美食、更亲子、更轻松、更高端、更有学习感，还是更有冒险感？同一个目的地，可以因为目标不同而被完全不同地使用。'),
    block('normal', '比如成都可以是美食停靠点，也可以是熊猫亲子点、慢生活章节或周边延伸基地。上海可以是现代开场、购物城市、设计美食章节，或者离境前的轻松收尾。目的不同，路线就不同。'),

    block('h2', '6. 酒店档次和舒适度期待'),
    block('normal', '酒店档次不只是价格问题。它会影响位置、转场逻辑、房间舒适度、早餐、服务期待，以及每天能不能省体力。想要精致私人路线的客人，和想要简单实用路线的客人，不应该拿到同一种酒店方案。'),
    block('normal', '一开始不需要指定酒店名，但最好描述舒适度：干净简单、舒适中档、精品酒店、豪华酒店、亲子友好、商务风格，或者其他偏好。这样报价和路线才不会偏。'),

    block('h2', '7. 大致预算范围'),
    block('normal', '很多客人不愿意先说预算，担心价格会被抬高。但如果完全没有预算范围，设计者只能猜酒店档次、导游覆盖、车辆标准和私人支持程度，很容易做出过高或过低的方案。'),
    block('normal', '预算不需要一开始就精确。它只是帮我们判断设计档位。高端酒店的私人多城市路线，和轻量私人支持的路线，本来就是不同产品。'),

    block('h2', '8. 航班、入境城市和离境城市'),
    block('normal', '航班会改变整条路线结构。深夜抵达后，不适合第二天立刻安排最重参观；很早离境，最后一晚也要更简单。从北京进、上海出这类不同城市进出，有时会比回到同一城市更顺。'),
    block('normal', '如果航班还没订，也可以提前说。有时候应该先设计路线，再决定航班，这样航班才能服务路线，而不是让路线被迫绕路。'),

    block('h2', '9. 饮食偏好和限制'),
    block('normal', '美食是中国旅行的重要部分，但也要现实安排。素食、过敏、清真、孩子口味、辣度接受度、是否需要舒适备用餐，都会影响行程。这些不是小事，真正旅行时会很关键。'),
    block('normal', '如果美食是亮点，我们可以围绕它设计；如果饮食是担心点，我们可以安排更稳妥的餐和备用选择。越早知道越好。'),

    block('h2', '10. 行动能力、健康状况和旅行习惯'),
    block('normal', '如果同行人有行动不便、腰膝问题、推车需求、不适合楼梯、怕热、晕车或不喜欢长途车，一定要在路线设计前说明。这些不是最后补救的小例外，而是路线设计条件。'),
    block('normal', '这些信息会影响酒店区域、每天步行量、风景目的地是否现实，以及是否需要私人车辆支持。'),

    block('h2', '11. 明确不想要什么'),
    block('normal', '负面偏好和正面偏好一样有用。如果你不喜欢早起、不喜欢购物、不喜欢长时间博物馆、不喜欢拥挤市场、不想长途坐车、不吃辣、不想每天正式参观，都应该说。删掉不适合的内容，和加入合适内容一样重要。'),
    block('normal', '定制路线不应该是把你的名字贴到一条通用中国游上，而应该反映你真正想要什么，以及不想要什么。'),

    block('h2', '一个有用的信息示例'),
    block('normal', '比较好的表达可以是：“我们一家四口，孩子 8 岁和 12 岁，想 10 月出行 10 天。考虑北京、西安、上海，但不想换太多酒店。希望酒店舒服一点，重点日有私人导游，可以吃本地食物但不要太辣，节奏希望每天一个重点。”'),
    block('normal', '这段话并不长，但已经给了很多真实设计信息。我们可以从这里开始认真做方案，而不是猜。'),

    block('h2', '不需要一开始什么都懂'),
    block('normal', '你不需要带着完美计划来找我们。规划过程本来就是用来解决这些问题的。但你越诚实地说明同行人、限制和优先级，第一版方案就越容易贴近真实需求。'),
    block('normal', '好的定制旅行不是填模板，而是让路线匹配真实的人。'),
  ],
};

async function main() {
  if (!token) throw new Error('Missing Sanity token. Set SANITY_API_TOKEN or create secrets/sanity_token.txt');
  const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, { slug });
  if (!existing?._id) throw new Error(`Article not found: ${slug}`);
  const doc = await client.patch(existing._id).set(article).commit();
  console.log(JSON.stringify({ ok: true, action: 'patched', id: doc._id, slug, blocks: article.content.length }, null, 2));
}

main().catch((err) => { console.error(err); process.exit(1); });
