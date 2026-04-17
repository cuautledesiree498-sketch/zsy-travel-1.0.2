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

const tours = [
  {
    slug: '20-day-china-journey',
    title: {
      en: '20-Day China Journey · Multi-City In-Depth Experience',
      zh: '20天玩转中国 · 多城市深度体验路线',
    },
    tagline: {
      en: 'A longer route built to combine history, modern cities and scenic balance.',
      zh: '把历史、现代城市和风景平衡放在一起的长线产品。',
    },
    description: {
      en: 'This 20-day route is designed for travelers who want a fuller first or second China trip: Beijing for history, Shanghai for modernity, Xi’an for the ancient-capital layer, and scenic stops such as Guilin, Yunnan or Zhangjiajie to keep the journey visually rich and well paced.',
      zh: '这条 20 天路线适合想把中国旅行做得更完整的客人：北京看历史，上海看现代，西安看古都层，再配上桂林、云南或张家界这样的风景节点，让整趟行程既丰富又不失节奏。',
    },
    idealFor: {
      en: 'Ideal for first-time China travelers with enough time, couples, families and guests who want one route to show multiple sides of China.',
      zh: '适合时间比较充裕的首访中国游客、情侣、家庭客群，以及希望一条路线看到中国多个侧面的客人。',
    },
    travelStyle: {
      en: 'Multi-city, balanced pacing, culture plus scenery.',
      zh: '多城市、节奏均衡、文化 + 风景。',
    },
    howToUse: {
      en: 'Use this route as a reference framework for longer China trips. It can be shortened, reordered or adapted around specific seasonal priorities.',
      zh: '这条路线更适合作为长线中国行程的参考框架，可根据季节、天数和偏好进行删减、重排或扩展。',
    },
    bestTime: {
      en: 'Spring and autumn usually give the most comfortable overall balance for a long multi-city trip.',
      zh: '春秋通常最适合做这类多城市长线，整体舒适度和节奏感最均衡。',
    },
    extensions: {
      en: 'Can extend into Chengdu for food and relaxed city time, or into Xinjiang for a stronger scenic chapter.',
      zh: '可延展到成都加入美食与慢节奏，也可延展到新疆增加更强的风景章节。',
    },
    highlights: [
      { en: 'Combines history, modern city life and scenic contrast in one route.', zh: '把历史、现代城市生活与风景反差放进一条线路。' },
      { en: 'Works well for travelers who want a fuller China story.', zh: '适合想把中国故事看得更完整的游客。' },
      { en: 'Flexible enough to shorten or expand without losing structure.', zh: '可缩可扩，结构不容易散。' },
      { en: 'Useful as a premium planning reference for longer trips.', zh: '适合作为长线高价值路线参考。' },
      { en: 'Can be adapted around season, pace and travel group type.', zh: '可根据季节、节奏和客群灵活调整。' },
    ],
    itinerary: [
      { day: 1, title: { en: 'Arrive in Beijing', zh: '抵达北京' }, description: { en: 'Start with the historical and symbolic center of China.', zh: '从中国历史与象征中心开始。' } },
      { day: 2, title: { en: 'Beijing landmarks and the Great Wall layer', zh: '北京地标与长城层' }, description: { en: 'Use the city to establish the first historical chapter.', zh: '用这座城市建立第一个历史章节。' } },
      { day: 3, title: { en: 'Move into Xi’an', zh: '前往西安' }, description: { en: 'Shift from imperial capital symbolism to deeper ancient history.', zh: '从帝都象征转入更深的古代历史层。' } },
      { day: 4, title: { en: 'Shanghai and the modern China chapter', zh: '上海与现代中国章节' }, description: { en: 'Bring in skyline, urban polish and contemporary rhythm.', zh: '加入天际线、都市精致感与当代节奏。' } },
      { day: 5, title: { en: 'Scenic extension and route close', zh: '风景延展与路线收束' }, description: { en: 'Close with a scenic or lifestyle-focused chapter such as Guilin, Yunnan or Zhangjiajie.', zh: '以桂林、云南或张家界等风景章节收束。' } },
    ],
    image: '/media/custom/destinations/beijing/beijing-1.jpg',
    price: 4800,
    duration: 20,
  },
  {
    slug: 'xinjiang-landscape-journey',
    title: {
      en: 'Xinjiang Landscape Journey · Mountains, Grasslands and Silk Road Routes',
      zh: '新疆风景深度游 · 山川草原与丝路路线',
    },
    tagline: {
      en: 'A scenic journey built around scale, open space and the Silk Road atmosphere.',
      zh: '围绕尺度感、开阔感和丝路氛围打造的风景型路线。',
    },
    description: {
      en: 'This route is designed for travelers who want a visually powerful journey through mountains, grasslands and Silk Road landscapes. It is not just a scenic add-on; it is a route that needs its own pacing and structure.',
      zh: '这条线路面向想看山川、草原和丝路风景的游客。它不是简单的风景补充，而是一条需要独立节奏和结构的路线。',
    },
    idealFor: {
      en: 'Ideal for scenery-first travelers, photographers, couples, road-trip style guests and visitors who want a more dramatic landscape chapter.',
      zh: '适合风景优先游客、摄影爱好者、情侣、公路旅行型客人，以及想要更具冲击力风景章节的游客。',
    },
    travelStyle: {
      en: 'Landscape-heavy, slower pacing, road-trip feel.',
      zh: '风景主导、节奏更慢、公路旅行感。',
    },
    howToUse: {
      en: 'Use this route when you want to build a China trip around scenery rather than around cities alone.',
      zh: '当你想把中国旅行围绕风景而不是单纯围绕城市来组织时，这条线路最合适。',
    },
    bestTime: {
      en: 'Late spring, summer and early autumn are often the strongest windows depending on the exact sub-route.',
      zh: '具体视子线路而定，晚春、夏季和初秋通常是更强的窗口。',
    },
    extensions: {
      en: 'Can extend into a broader northwestern Silk Road itinerary or connect with nearby scenic regions.',
      zh: '可延展为更完整的西北丝路线路，也可衔接周边风景区。',
    },
    highlights: [
      { en: 'Strong visual contrast and big-sky scenery.', zh: '视觉反差强，开阔感明显。' },
      { en: 'A more dramatic China chapter than standard city routes.', zh: '比常规城市路线更具冲击力。' },
      { en: 'Works best with a slower, more deliberate pace.', zh: '最适合更慢、更有节奏感的安排。' },
    ],
    itinerary: [
      { day: 1, title: { en: 'Enter the Xinjiang landscape chapter', zh: '进入新疆风景章节' }, description: { en: 'Set the tone with open space and stronger scenery.', zh: '用开阔空间和更强风景定调。' } },
      { day: 2, title: { en: 'Mountain and grassland route', zh: '山地与草原路线' }, description: { en: 'Focus on the wide visual rhythm of the region.', zh: '聚焦区域内广阔的视觉节奏。' } },
      { day: 3, title: { en: 'Silk Road atmosphere and scenic finish', zh: '丝路氛围与风景收束' }, description: { en: 'Finish with a route chapter that feels distinctly different from city travel.', zh: '用与城市旅行明显不同的章节收尾。' } },
    ],
    image: '/media/custom/destinations/xinjiang/xinjiang-1.jpg',
    price: 3200,
    duration: 10,
  },
  {
    slug: 'yunnan-leisure-journey',
    title: {
      en: 'Yunnan Leisure Journey · Old Towns, Mountains and Slow Travel',
      zh: '云南休闲之旅 · 古城山景与慢旅行',
    },
    tagline: {
      en: 'A slower route for travelers who want scenery, comfort and a softer pace.',
      zh: '为想要风景、舒适和更慢节奏的游客准备的柔和路线。',
    },
    description: {
      en: 'This Yunnan route is built for travelers who want a gentler chapter in China: old towns, mountain views, lake-side or village-style atmosphere and an overall pace that feels more relaxed than the major-city routes.',
      zh: '这条云南路线适合想要更柔和中国章节的游客：古城、山景、湖边或村落氛围，以及比大城市线路更放松的整体节奏。',
    },
    idealFor: {
      en: 'Ideal for couples, families, slower travelers, scenic travelers and guests who want a softer contrast after major cities.',
      zh: '适合情侣、家庭、慢节奏游客、风景型游客，以及在大城市之后想要柔和过渡的客人。',
    },
    travelStyle: {
      en: 'Slow travel, scenic and comfortable.',
      zh: '慢旅行、风景型、舒适导向。',
    },
    howToUse: {
      en: 'Use this route as a slower scenic balance inside a larger China itinerary or as a stand-alone relaxing chapter.',
      zh: '既可以作为更大中国行程中的慢节奏平衡章节，也可以单独作为放松型风景线路。',
    },
    bestTime: {
      en: 'Spring and autumn are usually the easiest seasons for balanced comfort and scenery.',
      zh: '春秋通常最容易在舒适度和风景之间取得平衡。',
    },
    extensions: {
      en: 'Can extend into other southwest scenic destinations if the traveler wants a longer relaxed route.',
      zh: '如果客人想要更长的慢旅行线路，也可以延展到西南其他风景目的地。',
    },
    highlights: [
      { en: 'Relaxed pace with scenic variety.', zh: '节奏更慢，但风景层次丰富。' },
      { en: 'Works well for couples and family travelers.', zh: '适合情侣与家庭客群。' },
      { en: 'A softer complement to city-heavy itineraries.', zh: '适合作为城市型路线的柔和补充。' },
    ],
    itinerary: [
      { day: 1, title: { en: 'Arrive and slow the pace down', zh: '抵达并放慢节奏' }, description: { en: 'Start with easy movement and a calmer atmosphere.', zh: '从轻松移动和更安静的氛围开始。' } },
      { day: 2, title: { en: 'Old town and mountain scenery', zh: '古城与山景' }, description: { en: 'Focus on scenic and cultural texture rather than rushing between landmarks.', zh: '聚焦风景与文化质感，而不是赶景点。' } },
      { day: 3, title: { en: 'Lake, village or final relaxed chapter', zh: '湖区、村落或最后的放松章节' }, description: { en: 'Close the route with a softer and more comfortable finish.', zh: '以更柔和、更舒适的方式收尾。' } },
    ],
    image: '/media/custom/destinations/yunnan/yunnan-1.jpg',
    price: 2600,
    duration: 8,
  },
];

async function main() {
  const tx = client.transaction();
  for (const tour of tours) {
    const existing = await client.fetch(`*[_type == "tour" && slug.current == $slug][0]{_id}`, { slug: tour.slug });
    if (!existing?._id) continue;
    tx.patch(existing._id, {
      set: {
        title: tour.title,
        tagline: tour.tagline,
        description: tour.description,
        idealFor: tour.idealFor,
        travelStyle: tour.travelStyle,
        howToUse: tour.howToUse,
        bestTime: tour.bestTime,
        extensions: tour.extensions,
        highlights: tour.highlights,
        itinerary: tour.itinerary,
        image: tour.image,
        price: tour.price,
        duration: tour.duration,
        published: true,
      },
    });
  }
  const result = await tx.commit();
  console.log(JSON.stringify({ patched: tours.length, transactionId: result.transactionId || null }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
