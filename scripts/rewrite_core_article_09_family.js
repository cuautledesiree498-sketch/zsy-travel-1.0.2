const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const token = process.env.SANITY_API_TOKEN || (fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : undefined);
const client = createClient({ projectId: 'j7fa6cf0', dataset: 'production', apiVersion: '2026-04-03', useCdn: false, token });

const slug = 'china-family-travel-with-kids';
const span = (text) => ({ _type: 'span', text, marks: [] });
const block = (style, text) => ({ _type: 'block', style, children: [span(text)], markDefs: [] });

const article = {
  _type: 'article',
  title: {
    en: 'How to Plan a China Trip for Families with Kids',
    zh: '带孩子来中国旅游，怎么安排更省心？',
  },
  slug: { current: slug },
  author: 'Infinite Travel',
  publishDate: new Date('2026-04-26T04:25:00+08:00').toISOString(),
  tagline: {
    en: 'A family China trip works best when the route protects energy, simplifies movement and leaves room for real life.',
    zh: '亲子中国行要好走，关键是保体力、少折腾，并给真实生活留余地。',
  },
  excerpt: {
    en: 'Traveling in China with children can be smooth and rewarding, but the itinerary needs to be designed differently from an adult trip. The best family routes use fewer hotel changes, carefully chosen city bases, flexible mornings, lighter transfer days and activities that work in real life. This guide explains how to make a China family trip feel manageable instead of overpacked.',
    zh: '带孩子来中国旅行可以很顺，也可以很累，差别在于路线是不是按家庭真实状态设计。好的亲子路线通常城市更少、酒店位置更顺、早晨更有弹性、转场日更轻，活动也要真正适合孩子和父母。本文讲的是怎样让中国亲子旅行变得可执行，而不是把每天排成景点清单。',
  },
  heroFacts: [
    { label: { en: 'Best for', zh: '适合人群' }, value: { en: 'Families planning a China trip', zh: '计划中国亲子游的家庭' } },
    { label: { en: 'Core rule', zh: '核心原则' }, value: { en: 'Protect energy before adding sights', zh: '先保体力，再加景点' } },
    { label: { en: 'Best format', zh: '更适合形式' }, value: { en: 'Fewer bases, flexible days', zh: '少基地、弹性日程' } },
    { label: { en: 'Avoid', zh: '避免' }, value: { en: 'Heavy transfer days and overfull mornings', zh: '重转场和满负荷早晨' } },
  ],
  mainImage: '/media/custom/destinations/shanghai/shanghai-1.jpg',
  published: true,
  content: [
    block('normal', 'A family trip to China can be wonderful, but it should not be planned like an adult itinerary with children simply added to the passenger list. Children change the route. They change how early the day can start, how much walking is realistic, how meals should be timed, how many transfers the group can handle, and how quickly the mood of the day can shift.'),
    block('normal', 'This is why the best family routes are not the ones with the most attractions. They are the ones where the family still has energy after lunch, where parents are not solving logistics every hour, and where a tired child does not break the whole plan.'),

    block('h2', 'Start by reducing the number of bases'),
    block('normal', 'For families, the number of hotel bases matters more than the number of famous city names. Every hotel change means packing, checking out, moving luggage, waiting, transferring, checking in again, and helping children adjust to a new room. Adults may treat that as normal travel friction. Children often experience it as disruption.'),
    block('normal', 'A family China route usually works better with fewer bases. Beijing plus the Great Wall can make a strong short trip. Shanghai plus Suzhou or Hangzhou can feel smooth and varied. Chengdu can work well for food, pandas, parks and a slower rhythm. If the trip has more days, add cities carefully, not automatically.'),

    block('h2', 'Choose city bases that make daily life easier'),
    block('normal', 'Hotel location is not a small detail for family travel. A hotel that looks excellent on paper may still be a poor choice if every morning starts with a long drive or every dinner requires another complicated transfer. The best family hotel is not always the most decorative one. It is the one that reduces daily friction.'),
    block('normal', 'In Beijing, this may mean choosing a base that supports the main sightseeing plan instead of chasing a hotel far from the day’s route. In Shanghai, it may mean staying somewhere that makes evenings simple. In Chengdu, it may mean balancing access to food, parks and transport without overcomplicating the day.'),

    block('h2', 'Do not make mornings too fragile'),
    block('normal', 'Many adult itineraries depend on clean early starts. Families are different. Breakfast takes longer, someone may sleep badly, a child may need extra time, and the group may not move as quickly as expected. If every day depends on leaving the hotel at exactly 8:00, the route becomes fragile.'),
    block('normal', 'This does not mean families cannot visit major sights. It means important days should be protected. Put the biggest experience on a day with enough buffer, not after a late arrival or before a difficult transfer. A calmer morning often creates a better whole day.'),

    block('h2', 'Limit the number of major experiences per day'),
    block('normal', 'A family day does not need three heavy highlights. In many cases, one major experience plus one light activity is enough. A museum and a relaxed dinner. A landmark and a park. A morning visit and an easy neighborhood walk. This kind of structure gives the day shape without exhausting everyone.'),
    block('normal', 'The mistake is trying to make each day look impressive in the itinerary document. A family route should be judged by how it feels at 4 p.m., not by how many attractions fit before lunch.'),

    block('h2', 'Use parks, food and simple walks as real travel content'),
    block('normal', 'Parents often worry that lighter activities are not “worth it”. But for children, a park, a snack street, a river walk, a tea house, a dumpling meal or a short neighborhood stroll can become more memorable than another formal site. These moments also help parents reset the day.'),
    block('normal', 'China has many family-friendly textures that do not need to be overexplained: local breakfasts, public parks, evening lights, markets, noodles, dumplings, trains, small shops and city views. A good family route uses those naturally instead of treating them as empty space.'),

    block('h2', 'Be careful with long walking sites'),
    block('normal', 'Some of China’s major sights involve real walking. The Forbidden City, the Great Wall, large museums, old towns and scenic areas can be rewarding, but they should be paced honestly. A child who is tired halfway through a major site changes the whole experience for everyone.'),
    block('normal', 'This does not mean skipping important places. It means choosing the right route inside them, avoiding unnecessary backtracking, planning bathroom and snack breaks, and not stacking another heavy activity immediately afterward.'),

    block('h2', 'Transfer days should be intentionally light'),
    block('normal', 'Travel days are where many family itineraries become unrealistic. Even a high-speed rail day includes packing, transport to the station, security, waiting, boarding, arrival, another transfer and hotel check-in. With children, each of those steps takes more attention.'),
    block('normal', 'If the family changes cities, keep that day lighter. A simple dinner, a short walk near the hotel, or one flexible activity is enough. The route should not punish the family for moving.'),

    block('h2', 'Private support may be worth it for families'),
    block('normal', 'Private touring is not only about luxury. For families, its value is often practical: a vehicle when the child is tired, a guide who can adjust the pace, help with timing, and fewer moments where parents have to solve everything alone. This is especially useful in large cities or on multi-city routes.'),
    block('normal', 'A fixed group tour can work for some families if the route is simple and the children are used to structured travel. But if the family needs flexibility, private planning usually reduces stress more than it adds cost.'),

    block('h2', 'Food planning matters more than adults expect'),
    block('normal', 'Food can be a highlight of China, but families need a practical plan. Children may not want unfamiliar food at every meal, and parents may need backup options. A good route balances local food with comfort. It should not make every meal an experiment.'),
    block('normal', 'This is especially important after long sightseeing days. A tired child plus a late, unfamiliar dinner can turn a good day into a difficult evening. Keep some meals easy on purpose.'),

    block('h2', 'A simple family route test'),
    block('normal', 'Before finalizing the itinerary, ask three questions. How many times do we change hotels? What happens if one morning starts late? Is there a lighter option if the child gets tired after lunch? If the route has answers to those questions, it is much more family-ready.'),
    block('normal', 'A good family China trip should not feel like parents are dragging children through an adult schedule. It should feel like the whole family can actually live inside the route.'),

    block('h2', '中文对应：带孩子来中国旅游，怎么安排更省心？'),
    block('normal', '带孩子来中国旅行，可以很顺，也可以很累。关键在于，你不能把成人路线写好之后，再把孩子加到名单里。孩子会改变整条路线：早上能不能准时出发、一天能走多少路、吃饭怎么安排、能接受几次转场、情绪什么时候会突然掉下来，这些都会影响行程。'),
    block('normal', '所以，好的亲子路线不是景点最多的路线，而是下午还有体力、父母不用每小时处理一个物流问题、孩子累了也不会让整天崩掉的路线。'),

    block('h2', '先减少住宿基地'),
    block('normal', '对家庭来说，换几次酒店比看几个城市名更重要。每换一次酒店，都意味着收拾行李、退房、拖箱子、等待、转车、重新入住，还要让孩子适应新房间。成人可能觉得这只是旅行常规摩擦，但孩子往往会把它感受成打断。'),
    block('normal', '所以亲子中国路线通常更适合少基地。北京加长城，可以做成一条很稳的短线；上海加苏州或杭州，变化足够但不太折腾；成都适合美食、熊猫、公园和更慢的生活节奏。如果天数更多，再慢慢加城市，不要自动加。'),

    block('h2', '酒店位置要服务每天的生活'),
    block('normal', '亲子旅行里，酒店位置不是小细节。一个酒店照片很好看，但如果每天早上都要长距离出发，晚上吃饭也不顺路，它就会持续消耗全家人的体力。最适合家庭的酒店，不一定是最漂亮的，而是最能减少每天摩擦的。'),
    block('normal', '在北京，可能要优先看它是否顺着主要参观路线；在上海，可能要看晚上回酒店是否方便；在成都，则要平衡美食、公园和交通，不要让每天变复杂。'),

    block('h2', '不要把早晨排得太脆弱'),
    block('normal', '很多成人路线依赖准时早起，但家庭不一样。早餐会更慢，孩子可能没睡好，临出门可能还要处理各种小事。如果每天都要求 8 点整出门，这条路线就会非常脆弱。'),
    block('normal', '这不是说家庭不能去重要景点，而是重要景点要放在有余量的日子里。不要放在晚到后的第二天，也不要放在大转场前。一个没那么紧的早晨，往往能换来更好的整天体验。'),

    block('h2', '每天重点不要太多'),
    block('normal', '亲子路线一天不需要三个重项目。很多时候，一个主要体验加一个轻活动就够了。一个博物馆加一顿轻松晚餐，一个地标加一个公园，一段上午参观加一次街区散步，这样就有结构，也不会太累。'),
    block('normal', '错误在于把每天都写得很漂亮。家庭路线不应该按中午前塞了几个景点来判断，而应该看下午四点全家状态怎么样。'),

    block('h2', '公园、美食和简单散步也是旅行内容'),
    block('normal', '很多父母会担心轻活动“不够值”。但对孩子来说，公园、小吃街、河边散步、茶馆、饺子、面条、夜景、市场和小店，可能比又一个正式景点更有记忆点。这些内容也能让父母把一天重新调整回来。'),
    block('normal', '中国有很多适合家庭自然体验的东西：本地早餐、公园里的生活、晚上的灯光、市场、火车、街边小吃和城市景观。好的亲子路线会把这些当成内容，而不是空白。'),

    block('h2', '长步行景点要诚实评估'),
    block('normal', '中国很多重要景点都需要真实步行。故宫、长城、大型博物馆、古镇、风景区都很值得去，但不能假装它们很轻松。孩子如果在大景点中途累了，整组人的体验都会改变。'),
    block('normal', '这不是让你跳过重要内容，而是要选对内部路线，减少无意义折返，提前安排厕所和补给，不要在后面继续叠加另一个重项目。'),

    block('h2', '转场日要故意排轻'),
    block('normal', '亲子路线最容易失真的是转场日。高铁日看起来只是坐车，但实际包括收拾、去车站、安检、等待、上车、抵达、再转车和入住。带孩子时，每一步都需要更多注意力。'),
    block('normal', '所以换城市那天要故意排轻。简单晚餐、酒店附近散步，或者一个可以取消的轻活动就够了。路线不应该因为一家人在移动，就继续惩罚他们。'),

    block('h2', '私人支持对家庭可能更值'),
    block('normal', '私人定制对家庭来说，不只是“更高端”。它的价值很实际：孩子累了有车，导游能调整节奏，有人帮忙控制时间，父母不用所有问题都自己解决。大城市和多城市路线里，这种支持尤其有用。'),
    block('normal', '固定团不是不能选，如果路线简单、孩子也习惯集体节奏，可以成立。但如果家庭需要弹性，私人规划通常能明显降低压力。'),

    block('h2', '吃饭要有备用方案'),
    block('normal', '中国美食可以是亮点，但亲子旅行不能让每一顿都变成挑战。孩子不一定愿意每餐都尝试陌生食物，父母也需要备用选择。好的路线会在本地体验和舒适感之间做平衡。'),
    block('normal', '尤其是在长时间参观后，疲惫的孩子加上一顿很晚、很陌生的晚餐，很容易把一天的好体验拖垮。所以有些餐就是应该简单一点。'),

    block('h2', '一个简单检查'),
    block('normal', '定稿前问三个问题：这条路线要换几次酒店？如果某天早上晚出发，会不会全盘崩掉？如果孩子午饭后累了，有没有轻一点的替代方案？如果这些问题都有答案，这条路线才更适合家庭。'),
    block('normal', '好的中国亲子旅行，不应该像父母拖着孩子完成成人日程。它应该让全家人都能真实地待在这条路线里。'),
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
