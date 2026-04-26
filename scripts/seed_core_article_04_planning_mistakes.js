const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = process.env.SANITY_API_TOKEN || (fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : undefined);

const client = createClient({ projectId: 'j7fa6cf0', dataset: 'production', apiVersion: '2026-04-03', useCdn: false, token });

const slug = 'first-time-china-travel-planning-mistakes';
const span = (text) => ({ _type: 'span', text, marks: [] });
const block = (style, text) => ({ _type: 'block', style, children: [span(text)], markDefs: [] });

const article = {
  _type: 'article',
  title: {
    en: 'China Travel Planning Mistakes First-Time Visitors Often Make',
    zh: '第一次来中国，最容易把行程规划错在哪里？',
  },
  slug: { current: slug },
  author: 'Infinite Travel',
  publishDate: new Date('2026-04-26T03:05:00+08:00').toISOString(),
  tagline: {
    en: 'Most first-trip problems come from pace, sequence and wish-list thinking — not from missing one famous sight.',
    zh: '第一次中国旅行最容易出问题的地方，不是少看一个景点，而是节奏、顺序和愿望清单思维。',
  },
  excerpt: {
    en: 'First-time visitors often overplan China because every famous city feels important. The real mistakes are usually more practical: too many hotel changes, weak city sequence, scenic add-ons without enough time, and days that look efficient but leave no room for jet lag, meals or simple rest. This guide explains what to avoid before the route becomes tiring.',
    zh: '第一次来中国，很多人会因为每座名城都想去而把路线排得过满。真正的问题通常很实际：换酒店太多、城市顺序不顺、风景目的地硬加、每天看起来高效但没有给时差、吃饭和休息留空间。本文直接讲这些常见错误，避免路线还没出发就已经太累。',
  },
  heroFacts: [
    { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'First-time China route planning', zh: '首次中国路线规划' } },
    { label: { en: 'Main risk', zh: '主要风险' }, value: { en: 'Too many places, too little breathing room', zh: '地方太多，呼吸空间太少' } },
    { label: { en: 'Better approach', zh: '更好做法' }, value: { en: 'Plan by rhythm, not checklist', zh: '按节奏规划，不按清单堆叠' } },
    { label: { en: 'Useful check', zh: '实用检查' }, value: { en: 'Count transitions before attractions', zh: '先数转场，再数景点' } },
  ],
  mainImage: '/media/custom/destinations/beijing/beijing-1.jpg',
  published: true,
  content: [
    block('normal', 'Most first-time China itineraries do not fail because the traveler chose the “wrong” famous attraction. They fail because the route asks too much from the traveler. Too many cities, too many early mornings, too many hotel changes, and not enough time to actually settle into a place.'),
    block('normal', 'China rewards planning, but it punishes checklist thinking. A route can include impressive names and still feel flat if every day is built around movement. The better question is not “what else can we add?” It is “what will this trip feel like on day four, day seven, and the morning after a long transfer?”'),

    block('h2', 'Mistake 1: treating China like a small multi-city destination'),
    block('normal', 'Beijing, Xi’an, Shanghai, Chengdu, Guilin and Zhangjiajie may look like a neat line on a planning document. In reality, every move includes transport to the station or airport, security, waiting, arrival, another transfer, hotel check-in and a mental reset. Even a fast train does not make a travel day disappear.'),
    block('normal', 'This is why a route with four or five cities in a short window often feels less rich than a simpler two- or three-city route. The traveler spends too much energy changing context and not enough time understanding where they are.'),

    block('h2', 'Mistake 2: adding cities because they are famous, not because they have a role'),
    block('normal', 'A strong China route gives every city a job. Beijing might carry history and national scale. Xi’an might deepen the ancient-capital layer. Shanghai might close with modern city rhythm. Chengdu might soften the route with food and daily life. Guilin might add a scenic chapter.'),
    block('normal', 'If two stops are doing the same job, one of them may not belong in this trip. If a city is included only because someone said “you cannot miss it”, pause. You are not building a museum inventory. You are building a trip that has to feel good while people are actually living it.'),

    block('h2', 'Mistake 3: making every day a full sightseeing day'),
    block('normal', 'First-time visitors often underestimate how much energy China takes in the beginning. New language environment, large stations, different payment habits, unfamiliar food rhythm, security checks, walking distances and jet lag all add up. Even if each activity is interesting, the day can still feel heavy.'),
    block('normal', 'A good route has lighter days on purpose. A slow afternoon, a simpler dinner, a free evening near the hotel, or a day with only one major experience can make the whole trip better. Rest is not a failure in planning. It is part of the design.'),

    block('h2', 'Mistake 4: putting the scenic destination in the wrong place'),
    block('normal', 'Scenic places are often the first thing people want to add after the classic cities. That is understandable. Photos of Guilin, Zhangjiajie, Yunnan or Xinjiang are persuasive. But scenic regions usually need more time, more weather tolerance and more careful movement than a city stop.'),
    block('normal', 'The mistake is treating a scenic destination like a quick decoration at the end of a city-heavy route. If the route is already tiring, adding a distant scenic stop may make it worse. The scenic chapter should change the rhythm and give the trip space, not become another logistical burden.'),

    block('h2', 'Mistake 5: ignoring arrival and departure reality'),
    block('normal', 'International arrival days are often weaker than they look on paper. Flights can be long, immigration and luggage take time, and the traveler may not be ready for a major sight that afternoon. The same is true before departure. A route that puts a heavy experience right before an international flight usually feels risky.'),
    block('normal', 'For first-time visitors, the first day should usually be simple: airport pickup, hotel check-in, a gentle walk, a good meal, maybe one easy view. This creates confidence. It also leaves room for delays without damaging the whole route.'),

    block('h2', 'Mistake 6: choosing hotels only by rating, not by movement logic'),
    block('normal', 'A beautiful hotel in the wrong area can make the trip harder every day. For China routes, hotel location should be judged by the plan: where the traveler will start each morning, where they will return at night, how far the station or airport transfer is, and whether the area still feels comfortable after dinner.'),
    block('normal', 'This matters most in large cities such as Beijing, Shanghai and Chengdu. The best hotel is not always the fanciest one on a list. It is the one that supports the route instead of fighting it.'),

    block('h2', 'Mistake 7: asking for a price before the route is clear'),
    block('normal', 'It is natural to ask “how much will this cost?” early. But if dates, number of travelers, hotel level, route, service scope and pace are unclear, the price can only be vague. A number given too early may look convenient, but it is not very useful.'),
    block('normal', 'A better process is to first clarify the shape of the trip. How many cities? How many hotel changes? Private guide or partial support? Comfortable hotels or simpler stays? Once those questions are clear, the quote becomes more meaningful and less misleading.'),

    block('h2', 'Mistake 8: copying someone else’s route without checking traveler type'),
    block('normal', 'A route that works for a young couple may not work for a family with children. A route designed for photographers may feel boring to food-focused travelers. A business guest adding two leisure days does not need the same plan as someone taking a full cultural holiday.'),
    block('normal', 'Before copying any itinerary, ask who it was built for. The same city sequence can feel smooth or exhausting depending on walking speed, meal preferences, shopping time, museum interest and tolerance for early mornings.'),

    block('h2', 'A better way to plan'),
    block('normal', 'Start with three questions. What should the trip explain first: history, modern China, food, scenery or daily life? How many hotel changes can the traveler comfortably handle? Which part of the route should feel slower? These questions are less glamorous than listing famous places, but they usually create a much better trip.'),
    block('normal', 'The goal is not to remove ambition from the itinerary. It is to make the ambition usable. A first China trip should leave travelers feeling that they have opened a door, not survived a schedule.'),

    block('h2', '中文对应：第一次来中国，最容易把行程规划错在哪里？'),
    block('normal', '第一次中国旅行出问题，通常不是因为少去了某个著名景点，而是因为路线对人要求太高。城市太多，早起太多，换酒店太多，真正停下来理解一个地方的时间太少。'),
    block('normal', '中国很适合认真规划，但不适合清单式堆叠。一条路线可以有很多响亮的城市名，但如果每天都在赶路，体验会变得很薄。真正要问的不是“还能加哪里”，而是“走到第四天、第七天、长途转场后的第二天，这个人还舒服吗”。'),

    block('h2', '错误一：把中国当成很小的多城市目的地'),
    block('normal', '北京、西安、上海、成都、桂林、张家界，写在文档里像一条顺路的线。但现实里，每次换城市都包括去车站或机场、安检、等待、抵达、再转车、入住酒店和重新适应环境。高铁很快，但它不会让转场日消失。'),
    block('normal', '所以，短时间内塞四五座城市，往往不如两三座城市做得扎实。游客把太多精力花在切换场景上，反而没有时间真正进入城市。'),

    block('h2', '错误二：因为城市有名就加入，而不是因为它有任务'),
    block('normal', '一条好的中国路线，每座城市都应该有任务。北京负责历史和国家尺度，西安补古都深度，上海负责现代城市节奏，成都让路线更生活化，桂林提供山水章节。'),
    block('normal', '如果两个地方承担的是同一个任务，就不一定都要放进来。如果某座城市只是因为“别人说不能错过”而加入，就要停一下。你不是在做城市清单，而是在做一趟真正要走下来的旅行。'),

    block('h2', '错误三：每天都排成满负荷参观'),
    block('normal', '第一次来中国，游客一开始要适应很多东西：语言环境、大型车站、支付方式、饮食节奏、安检、步行距离和时差。每个项目单独看都不难，但加起来会很消耗。'),
    block('normal', '好的路线会有意安排轻一点的日子。一个慢下午、一顿简单晚餐、酒店附近自由活动，或者一天只安排一个重点体验，都不是浪费。休息不是规划失败，而是规划的一部分。'),

    block('h2', '错误四：把风景目的地放错位置'),
    block('normal', '很多人做完北京、上海、西安之后，会想再加一个风景目的地。桂林、张家界、云南、新疆的照片确实很吸引人。但风景区域通常比城市更需要时间、天气弹性和交通衔接。'),
    block('normal', '如果前面路线已经很满，再把远距离风景点塞到最后，可能不是加分，而是加压。风景段应该让路线换气，而不是变成另一次转场负担。'),

    block('h2', '错误五：忽略抵达日和离境日前后的真实状态'),
    block('normal', '国际航班抵达日通常没有行程表上看起来那么完整。飞行时间长，入境和取行李也需要时间，游客未必适合下午马上进入重参观。离境日前也一样，不适合安排太紧或风险太高的内容。'),
    block('normal', '对第一次来中国的人来说，第一天最好简单一点：接机、入住、轻松走走、吃顿舒服的饭，也许看一个容易抵达的景。这样能建立安全感，也能给航班延误留余地。'),

    block('h2', '错误六：酒店只看评分，不看移动逻辑'),
    block('normal', '酒店很好，但位置不顺，每天都会增加消耗。中国大城市里，酒店位置要根据路线判断：早上从哪里出发，晚上回哪里，去车站机场是否方便，晚餐后周边是否舒服。'),
    block('normal', '这在北京、上海、成都尤其明显。最适合的酒店不一定是清单上最贵或评分最高的，而是最能支撑这条路线的。'),

    block('h2', '错误七：路线还没清楚，就急着要准确报价'),
    block('normal', '客人很自然会先问价格，但如果日期、人数、酒店档次、路线、服务范围和节奏都还没清楚，报价只能很粗。太早给出的数字看起来方便，但实际参考价值有限。'),
    block('normal', '更好的顺序是先把旅行形状弄清楚：几座城市，几次换酒店，要不要导游，酒店舒适度到哪里，哪些服务需要包含。这样报价才不会变成误导。'),

    block('h2', '错误八：直接复制别人的路线'),
    block('normal', '适合年轻情侣的路线，不一定适合带孩子的家庭。适合摄影爱好者的路线，不一定适合重视美食的人。商务客人顺带两天旅行，也不需要和深度文化游一样的安排。'),
    block('normal', '复制任何路线前，都要先看它原本是为谁设计的。同样的城市顺序，会因为步行能力、用餐习惯、购物需求、博物馆兴趣和早起承受度不同，而变成完全不同的体验。'),

    block('h2', '更好的规划方式'),
    block('normal', '先问三个问题：这趟旅行最想先解释什么，是历史、现代中国、美食、风景还是日常生活？游客能舒服接受几次换酒店？路线里哪一段应该慢下来？这些问题没有列景点那么兴奋，但通常更能做出好路线。'),
    block('normal', '目标不是降低旅行期待，而是让期待变得可执行。第一次中国旅行结束时，游客最好感觉自己打开了一扇门，而不是完成了一张很累的任务表。'),
  ],
};

async function main() {
  if (!token) throw new Error('Missing Sanity token. Set SANITY_API_TOKEN or create secrets/sanity_token.txt');
  const existing = await client.fetch(`*[_type == "article" && slug.current == $slug][0]{_id}`, { slug });
  const doc = existing?._id ? await client.patch(existing._id).set(article).commit() : await client.create(article);
  console.log(JSON.stringify({ ok: true, action: existing?._id ? 'patched' : 'created', id: doc._id, slug }, null, 2));
}

main().catch((err) => { console.error(err); process.exit(1); });
