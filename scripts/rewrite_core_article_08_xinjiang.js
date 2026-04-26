const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = process.env.SANITY_API_TOKEN || (fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : undefined);
const client = createClient({ projectId: 'j7fa6cf0', dataset: 'production', apiVersion: '2026-04-03', useCdn: false, token });

const slug = 'is-xinjiang-right-for-first-trip-to-china';
const span = (text) => ({ _type: 'span', text, marks: [] });
const block = (style, text) => ({ _type: 'block', style, children: [span(text)], markDefs: [] });

const article = {
  _type: 'article',
  title: {
    en: 'Is Xinjiang Right for Your First Trip to China?',
    zh: '新疆适合第一次来中国吗？',
  },
  slug: { current: slug },
  author: 'Infinite Travel',
  publishDate: new Date('2026-04-26T04:10:00+08:00').toISOString(),
  tagline: {
    en: 'Xinjiang can be the highlight of a China trip, but only when the route gives it enough time, distance and respect.',
    zh: '新疆可以成为中国旅行的高光，但前提是路线给它足够的时间、距离意识和尊重。',
  },
  excerpt: {
    en: 'Xinjiang is one of China’s most powerful travel regions, but it is not a casual add-on to a first trip. Its landscapes are vast, travel days are longer, and the right season matters. For some first-time visitors, Xinjiang is exactly the reason to come to China. For others, it is better saved for a second journey. This guide explains how to judge it honestly.',
    zh: '新疆是中国最有冲击力的旅行区域之一，但它不适合被随手加进第一次中国行程。它的景观尺度大、移动时间长、季节影响明显。对有些首次访华游客来说，新疆正是来中国的理由；对另一些人来说，它更适合留到第二次。本文会更诚实地判断：新疆到底适不适合放进第一次中国旅行。',
  },
  heroFacts: [
    { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'Travelers considering Xinjiang as a first China route', zh: '考虑首次中国行加入新疆的游客' } },
    { label: { en: 'Good fit if', zh: '适合条件' }, value: { en: 'You want landscapes, space and a slower long route', zh: '想要风景、开阔感和较慢长线' } },
    { label: { en: 'Not ideal if', zh: '不太适合' }, value: { en: 'You only have a short city-based trip', zh: '只有短时间城市线' } },
    { label: { en: 'Planning rule', zh: '规划原则' }, value: { en: 'Make Xinjiang a real chapter, not a tail', zh: '把新疆当章节，不当尾巴' } },
  ],
  mainImage: '/media/custom/destinations/xinjiang/xinjiang-1.jpg',
  published: true,
  content: [
    block('normal', 'Xinjiang is easy to admire and easy to underestimate. The photos are persuasive: mountains, grasslands, deserts, lakes, bazaars, long roads, big skies. For many travelers, it looks like the most cinematic version of China. But the same things that make Xinjiang impressive also make it a serious route decision.'),
    block('normal', 'So the question is not “Is Xinjiang worth visiting?” It is. The better question is: should Xinjiang be part of your first trip to China, or should it become the reason for a later, more focused journey? Those are two very different choices.'),

    block('h2', 'Xinjiang is not a small add-on'),
    block('normal', 'The first thing to understand is scale. Xinjiang does not behave like a quick extra city after Beijing or Shanghai. Distances are large, driving time matters, and the best parts of the trip often sit between places, not only inside one city or one attraction.'),
    block('normal', 'This means Xinjiang needs time. If you only give it two rushed nights at the end of an already busy route, you may technically say you went there, but you probably will not experience what makes it special. Xinjiang rewards space. It does not reward squeezing.'),

    block('h2', 'When Xinjiang makes sense for a first China trip'),
    block('normal', 'Xinjiang can absolutely make sense for a first trip if the traveler is not looking for only the classic China introduction. Some people come to China mainly for landscape, open space, road journeys, cultural variety and a feeling of distance. For that kind of traveler, Xinjiang may not be “too advanced”. It may be exactly the right beginning.'),
    block('normal', 'It also works when the trip has enough days. If you have around two weeks or more, and you are willing to let Xinjiang become a real section of the route, it can sit alongside one or two major cities. For example, a route might use Beijing or Shanghai as the entry point, then give Xinjiang enough time to breathe instead of treating it as a final checkbox.'),

    block('h2', 'When Xinjiang is the wrong first choice'),
    block('normal', 'Xinjiang is usually the wrong first choice when the traveler only has a short first China trip and still wants to see the core cities. If you have 7 or 8 days total and want Beijing, Xi’an and Shanghai, adding Xinjiang would make the route lose its shape. It becomes too much distance for too little actual experience.'),
    block('normal', 'It may also be wrong for travelers who dislike long travel days, want a very predictable city rhythm, or are not comfortable with routes where scenery and movement are part of the experience. Xinjiang is beautiful, but it is not always effortless.'),

    block('h2', 'Season is not a detail here'),
    block('normal', 'For many Chinese city routes, season matters, but the route can still work in several months. Xinjiang is less forgiving. Different areas show very different faces across the year, and weather can affect comfort, scenery, road timing and the overall feeling of the trip.'),
    block('normal', 'This is why Xinjiang planning should start with season and route together. Do not first choose random dates, then try to force the most famous landscapes into them. A good Xinjiang route asks: what kind of scenery do you want, which region fits that season, and how much moving can the traveler actually enjoy?'),

    block('h2', 'The traveler type matters more than the destination name'),
    block('normal', 'Xinjiang suits travelers who like big scenery, slower unfolding, long views and a sense of being far from the usual urban route. It suits people who understand that not every valuable hour is spent inside a landmark. Sometimes the road, the meal, the market, the stop between two places and the change in landscape are the point.'),
    block('normal', 'It is less suitable for travelers who want many famous city names in one trip, who measure value by attraction count, or who become frustrated when a day includes long movement. That does not make those travelers wrong. It just means Xinjiang may not be the right match for this particular trip.'),

    block('h2', 'Do not use Xinjiang to “complete” a China checklist'),
    block('normal', 'One common mistake is adding Xinjiang because the route feels too ordinary without it. This is understandable, especially for travel brands that want a more distinctive itinerary. But Xinjiang should not be used as decoration. It is too large and too demanding for that.'),
    block('normal', 'If Beijing, Xi’an and Shanghai already form a strong first route, Xinjiang does not need to be forced in. A clean first trip can be better than an ambitious route that constantly asks the traveler to recover from the previous transfer.'),

    block('h2', 'A better way to include Xinjiang'),
    block('normal', 'If you include Xinjiang, give it a clear role. It can be the scenic heart of the trip. It can be the contrast after a short city opening. It can be the main reason for the journey, with other cities kept simple around it. What it should not be is a two-day ending added because there was an empty line in the schedule.'),
    block('normal', 'A route can be honest about this. For some travelers, we might suggest: do Beijing and Shanghai this time, then build a proper Xinjiang route next time. For others, we might say: if Xinjiang is what excites you most, let us reduce the city list and make Xinjiang the center.'),

    block('h2', 'How many days should you think about?'),
    block('normal', 'There is no single number, because Xinjiang itself contains many route styles. But as a planning principle, if the whole China trip is under 10 days, Xinjiang is rarely a comfortable add-on. If the trip is around 12 to 14 days, it may become possible, but usually only if the city section is kept focused. If Xinjiang is the main purpose, it deserves a route designed around it from the beginning.'),
    block('normal', 'The important point is not to count days too optimistically. Long-distance regions need buffer. Weather, driving, rest and simple human energy all matter.'),

    block('h2', 'A simple decision test'),
    block('normal', 'Ask three questions. First: are you excited by landscapes and distance, not only by city landmarks? Second: do you have enough days to avoid rushing it? Third: are you willing to remove another city if Xinjiang needs the space? If the answer is yes to all three, Xinjiang may be a strong first-trip choice.'),
    block('normal', 'If the answer is no, that is not a failure. It simply means Xinjiang should probably become a future trip — one where it gets the attention it deserves.'),

    block('h2', '中文对应：新疆适合第一次来中国吗？'),
    block('normal', '新疆很容易让人心动，也很容易被低估。照片里是雪山、草原、沙漠、湖泊、巴扎、公路和很大的天空。对很多海外游客来说，新疆看起来像中国最有电影感的一面。但也正因为它有这种尺度，它不是一个可以随手加进路线的地方。'),
    block('normal', '所以问题不是“新疆值不值得去”。当然值得。真正的问题是：它适不适合放进第一次中国旅行，还是更适合成为下一次更完整的长线主题？这是两个完全不同的判断。'),

    block('h2', '新疆不是一个小加项'),
    block('normal', '首先要理解的是尺度。新疆不像北京、上海之后顺手加一座城市。它距离大，移动时间长，而且很多真正的体验不是发生在某一个景点里，而是发生在路上、在两地之间、在地貌变化的过程里。'),
    block('normal', '这意味着新疆需要时间。如果你只在已经很满的路线末尾给它两晚，最后可能只是“到此一游”，而不是体验到新疆为什么特别。新疆奖励的是空间，不是压缩。'),

    block('h2', '什么时候新疆适合放进第一次中国旅行'),
    block('normal', '如果客人第一次来中国，并不只是想走经典城市线，而是本来就想看风景、开阔空间、长线公路、地域差异和更强的远方感，那么新疆可以适合作为第一次中国旅行的一部分。对这类人来说，新疆不是太进阶，而是刚好对。'),
    block('normal', '另一个前提是天数够。如果整趟旅行有两周左右甚至更长，并且愿意把新疆当成一个真实章节来安排，它可以和一两座核心城市搭配。比如用北京或上海作为入口，然后给新疆足够时间，而不是把它当成最后的打卡尾巴。'),

    block('h2', '什么时候新疆不适合作为第一次选择'),
    block('normal', '如果第一次来中国总共只有 7～8 天，还想看北京、西安、上海，那就不建议加新疆。不是新疆不好，而是距离和时间不匹配。加进去之后，路线会失去形状，变成用大量移动换很少体验。'),
    block('normal', '如果客人不喜欢长转场，希望每天都是高度可预测的城市节奏，或者不太能接受“移动本身也是体验”的旅行方式，新疆也未必适合当前这次。新疆美，但它不是完全轻松的目的地。'),

    block('h2', '季节在新疆不是小细节'),
    block('normal', '很多中国城市线，季节会影响体验，但路线本身仍然可以在多个时间段成立。新疆不太一样。不同区域在一年里的状态差异很大，天气会影响舒适度、风景状态、行车节奏和整体感受。'),
    block('normal', '所以新疆路线应该从“季节 + 区域 + 节奏”一起设计，而不是先随便定日期，再把最有名的地方硬塞进去。好的问题应该是：你想看哪种景观？这个季节适合哪个区域？客人能享受多少移动？'),

    block('h2', '客人类型比目的地名气更重要'),
    block('normal', '新疆适合喜欢大风景、慢慢展开的路线、长视野和远方感的人。它也适合那些能理解“不是每个有价值的小时都发生在景点里”的游客。有时候，路、饭、集市、两地之间的停靠和地貌变化，本身就是旅行重点。'),
    block('normal', '它不太适合那些想在一次旅行里收集很多著名城市名、用景点数量衡量价值、或者一遇到长距离移动就明显烦躁的人。这不是谁对谁错，只是这次旅行是否匹配。'),

    block('h2', '不要用新疆来“装饰”路线'),
    block('normal', '一个常见错误，是觉得北京、西安、上海太普通，于是想加新疆让路线显得更特别。这个想法可以理解，尤其是旅行品牌会希望路线有差异化。但新疆不适合当装饰。它太大，也太需要认真安排。'),
    block('normal', '如果北京、西安、上海本身已经是一条清楚稳定的首次路线，就没必要硬塞新疆。干净的首次旅行，往往比雄心很大但一路恢复体力的路线更好。'),

    block('h2', '更好的加入方式'),
    block('normal', '如果要放新疆，就给它明确任务。它可以是整趟旅行的风景核心，可以是短城市开场后的重点章节，也可以成为来中国的主要理由。它不应该是因为行程表末尾还有空位，所以被补进去的两天。'),
    block('normal', '有些客人，我们会建议这次先做好北京上海，下次专门做新疆。有些客人，如果最兴奋的就是新疆，那就应该减少城市数量，把新疆放到路线中心。'),

    block('h2', '大概要预留多少天'),
    block('normal', '新疆没有一个统一天数，因为它内部路线差异很大。但作为规划原则，如果整趟中国旅行不到 10 天，新疆通常不适合作为轻松加项。如果有 12～14 天，才可能在控制城市数量的前提下加入。如果新疆是主目的，它应该从一开始就被当成核心来设计。'),
    block('normal', '不要把天数算得太乐观。长距离区域需要缓冲。天气、车程、休息和人的真实体力，都要算进去。'),

    block('h2', '一个简单判断'),
    block('normal', '问三个问题：你是否真的期待大风景和距离感，而不只是城市地标？你是否有足够天数不赶路？如果新疆需要空间，你是否愿意删掉另一座城市？如果三个答案都是是，新疆可以成为很强的首访选择。'),
    block('normal', '如果答案是否，也没关系。那说明新疆更适合成为下一次旅行，而且下一次它可以得到真正配得上的时间。'),
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
