const { createClient } = require('next-sanity');
const { projectId, dataset, apiVersion } = require('../sanity/env');

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN,
});

const tours = [
  {
    _id: 'tour-20-day-china-journey',
    _type: 'tour',
    title: { en: '20-Day China Journey · Multi-City In-Depth Experience', zh: '20天玩转中国 · 多城市深度体验路线' },
    slug: { _type: 'slug', current: '20-day-china-journey' },
    price: 4800,
    duration: 20,
    published: true,
    order: 1,
    description: {
      en: 'A flagship multi-city China journey designed for first-time visitors and travelers who want culture, cities and landscapes in one complete itinerary.',
      zh: '适合第一次来中国，或希望一次性深度体验中国多个核心城市的旗舰路线。'
    },
    highlights: [
      { en: 'Visit multiple key cities across China in one trip', zh: '一次行程覆盖中国多个核心城市' },
      { en: 'A complete mix of culture, modern cities and nature', zh: '历史文化 + 现代城市 + 自然风景全覆盖' },
      { en: 'Flexible pacing based on your preferences', zh: '行程节奏可根据需求灵活调整' },
      { en: 'Suitable for families, private groups and international travelers', zh: '适合家庭、小团和国际游客' },
      { en: 'Bilingual support for smooth communication', zh: '支持中英文服务，沟通无障碍' }
    ],
    itinerary: [
      { _type: 'object', day: 1, title: { en: 'Beijing Arrival and Adjustment', zh: '北京 · 抵达与适应' }, description: { en: 'Arrival in Beijing, airport pickup and hotel check-in. Light adjustment to the environment.', zh: '抵达北京，安排接机与入住，简单适应时差与环境。' } },
      { _type: 'object', day: 2, title: { en: 'Beijing Historical Culture', zh: '北京 · 历史文化' }, description: { en: 'Visit the Great Wall and Forbidden City to explore Chinese history and culture.', zh: '游览长城、故宫等经典景点，体验中国历史文化。' } },
      { _type: 'object', day: 3, title: { en: 'Beijing to Shanghai', zh: '北京 → 上海' }, description: { en: 'Travel to Shanghai and explore its modern city life.', zh: '前往上海，体验现代都市节奏与城市风貌。' } },
      { _type: 'object', day: 4, title: { en: 'Shanghai City Experience', zh: '上海 · 城市体验' }, description: { en: 'The Bund, Lujiazui and city exploration.', zh: '外滩、陆家嘴、城市街区探索。' } },
      { _type: 'object', day: 5, title: { en: 'Shanghai to Chengdu', zh: '上海 → 成都' }, description: { en: 'Travel to Chengdu and enjoy a more relaxed lifestyle.', zh: '前往成都，进入更轻松的生活节奏。' } }
    ]
  },
  {
    _id: 'tour-xinjiang-landscape-journey',
    _type: 'tour',
    title: { en: 'Xinjiang Landscape Journey · Mountains, Grasslands and Silk Road Routes', zh: '新疆风景深度游 · 山川草原与丝路路线' },
    slug: { _type: 'slug', current: 'xinjiang-landscape-journey' },
    price: 3200,
    duration: 10,
    published: true,
    order: 2,
    description: {
      en: 'A scenery-first Xinjiang private route for travelers who want grasslands, mountain roads, lakes and a stronger western China atmosphere.',
      zh: '适合偏好自然风光、公路旅行、湖泊草原与西部氛围的深度新疆私人路线。'
    },
    highlights: [
      { en: 'Scenery-led planning for travelers who care about visual scale', zh: '以风景尺度与视觉冲击为核心规划' },
      { en: 'Strong fit for photographers and private long-form journeys', zh: '适合摄影客户与长线深度私人旅程' },
      { en: 'Can be adjusted into classic North Xinjiang or softer scenic loops', zh: '可调整为经典北疆环线或更轻松的景观路线' }
    ],
    itinerary: [
      { _type: 'object', day: 1, title: { en: 'Arrival and Transition', zh: '抵达与区域衔接' }, description: { en: 'Begin with arrival and smooth transfer planning before entering the main route.', zh: '先完成抵达与区域衔接，再进入主线路。' } },
      { _type: 'object', day: 2, title: { en: 'Core Landscape Corridor', zh: '核心景观走廊' }, description: { en: 'Move into mountain, lake, grassland and frontier scenery sections.', zh: '进入山地、湖泊、草原与边疆风光组成的核心景观带。' } },
      { _type: 'object', day: 3, title: { en: 'Flexible Scenic Wrap-up', zh: '风景收尾与返程优化' }, description: { en: 'End with scenic flexibility, private pacing and smoother return planning.', zh: '以更灵活的风景收尾与返程节奏结束整段旅程。' } }
    ]
  },
  {
    _id: 'tour-yunnan-leisure-journey',
    _type: 'tour',
    title: { en: 'Yunnan Leisure Journey · Old Towns, Mountains and Slow Travel', zh: '云南休闲之旅 · 古城山景与慢旅行' },
    slug: { _type: 'slug', current: 'yunnan-leisure-journey' },
    price: 2600,
    duration: 8,
    published: true,
    order: 3,
    description: {
      en: 'A comfort-first Yunnan route for families, couples and relaxed private travelers who prefer atmosphere, old towns and gentle pacing.',
      zh: '适合家庭、情侣与轻度度假客群的云南慢节奏舒适路线。'
    },
    highlights: [
      { en: 'Comfort-first design with softer pacing', zh: '以舒适度和轻松节奏为优先' },
      { en: 'Combines mountain scenery, old towns and local culture', zh: '融合山地风景、古城氛围与在地文化' },
      { en: 'Can be adjusted for romance, family travel or photography', zh: '可根据情侣、家庭或摄影需求灵活调整' }
    ],
    itinerary: [
      { _type: 'object', day: 1, title: { en: 'Arrival and Soft Landing', zh: '抵达与轻松开场' }, description: { en: 'Begin with a relaxed arrival schedule and comfortable adjustment time.', zh: '第一天保持从容的落地节奏，先让旅程进入舒适状态。' } },
      { _type: 'object', day: 2, title: { en: 'Scenery and Old Town Rhythm', zh: '风景与古城节奏' }, description: { en: 'Combine scenic views, old-town atmosphere and easy private pacing.', zh: '融合自然风景、古城氛围与更轻松的私人旅行节奏。' } },
      { _type: 'object', day: 3, title: { en: 'Private Ending and Flexible Leisure', zh: '私人化收尾与自由休闲' }, description: { en: 'Finish with more rest, photography or soft urban leisure.', zh: '最后阶段可偏向休息、拍照或更柔和的城市放松体验。' } }
    ]
  }
];

async function main() {
  if (!client.config().token) {
    throw new Error('Missing SANITY_API_TOKEN or SANITY_TOKEN');
  }
  for (const tour of tours) {
    await client.createOrReplace(tour);
    console.log('upserted', tour.slug.current);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
