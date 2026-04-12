export type Localized = { en: string; zh: string };

export type DestinationContent = {
  summary: Localized;
  audience: Localized;
  bestSeason: Localized;
  stay: Localized;
  highlights: Localized[];
};

export const destinationContent: Record<string, DestinationContent> = {
  beijing: {
    summary: {
      en: 'Beijing is one of the strongest first-entry cities for China: imperial landmarks, historic depth, national symbolism and city scale all come together in a way that helps international travelers build an immediate understanding of China.',
      zh: '北京是最适合作为“第一次来中国”入口的城市之一：皇城地标、历史纵深、国家叙事和城市尺度都非常强，能让国际游客迅速建立对中国的第一印象。',
    },
    audience: {
      en: 'Ideal for first-time China visitors, families, culture-focused travelers, landmark seekers and guests who want a strong historical foundation before moving into other regions.',
      zh: '适合第一次来中国的游客、家庭客群、文化型游客、地标导向型游客，以及希望先建立历史认知再延展到其他地区的人群。',
    },
    bestSeason: {
      en: 'Spring and autumn work best overall. Spring is comfortable for city walking and classic sightseeing, while autumn usually brings the best balance of weather, pacing and visual clarity.',
      zh: '整体上春季和秋季最合适。春季适合城市步行与经典景点游览，秋季通常在天气、节奏和观感之间更均衡。',
    },
    stay: {
      en: 'A compact version can work in 2 days, but 3–4 days is the more natural range if you want to cover major landmarks, the Great Wall and a more complete city rhythm.',
      zh: '压缩版 2 天也能成立，但如果想把核心地标、长城和更完整的城市节奏都体验到，3–4 天更自然。',
    },
    highlights: [
      { en: 'One of the clearest first-time China entry points for international travelers.', zh: '对国际游客来说，是最清晰的首访中国入口之一。' },
      { en: 'World-recognizable landmarks such as the Forbidden City, Tiananmen and the Great Wall.', zh: '故宫、天安门、长城等世界级高识别度地标集中。' },
      { en: 'A strong mix of imperial history, national symbolism and contemporary capital-city scale.', zh: '帝都历史、国家象征与当代首都尺度感同时成立。' },
      { en: 'Pairs naturally with Xi’an and Shanghai in a classic first-China route.', zh: '与西安、上海组合时，非常适合构成经典首访中国线。' },
    ],
  },
  shanghai: {
    summary: {
      en: 'Shanghai is one of the best cities for showing international travelers the face of modern China: skyline, urban polish, design-led city life and a strong sense of familiarity for global visitors.',
      zh: '上海是最适合向国际游客展示“现代中国”形象的城市之一：天际线、都市精致度、设计感城市生活以及很强的国际熟悉感都集中在这里。',
    },
    audience: {
      en: 'Ideal for first-time China visitors who want a modern city perspective, couples, family travelers, business-extension trips and guests who prefer a polished urban experience.',
      zh: '适合希望从现代城市视角理解中国的首访游客、情侣、家庭客群、商务延展旅客，以及偏好都市精致体验的人群。',
    },
    bestSeason: {
      en: 'Spring and autumn are usually the strongest seasons. They support both urban walking and skyline-based city experiences without the heavier summer humidity.',
      zh: '春季和秋季通常是更强的季节窗口，既适合城市漫游，也更适合天际线和街区体验，避免夏季湿热对舒适度的影响。',
    },
    stay: {
      en: '2 days can cover the essentials, while 3 days is a better range for a more complete city stay or for adding nearby Jiangnan extensions.',
      zh: '2 天可以覆盖核心内容，3 天会更适合形成完整城市停留，或者顺带延展江南线路。',
    },
    highlights: [
      { en: 'One of the most internationally accessible modern China cities.', zh: '是最容易被国际游客接受和理解的现代中国城市之一。' },
      { en: 'Strong skyline, night views and urban design identity.', zh: '城市天际线、夜景和都市设计感非常强。' },
      { en: 'Works naturally with Beijing as a classic two-pole China introduction.', zh: '与北京组合时，非常适合形成“传统中国 + 现代中国”的双极入门线。' },
      { en: 'A strong gateway into Jiangnan routes such as Suzhou and Hangzhou.', zh: '也是进入苏州、杭州等江南线路的自然门户。' },
    ],
  },
  xian: {
    summary: {
      en: 'Xi’an is one of the most effective historical cities for first-time China routes: it helps international travelers understand ancient China quickly and clearly through a concentrated cultural narrative.',
      zh: '西安是最适合放进首访中国线路的历史文化城市之一，它能用非常集中的古都叙事，帮助国际游客更快理解“历史中国”。',
    },
    audience: {
      en: 'Ideal for first-time China visitors who want a historical layer in the route, families, culture-focused travelers and guests interested in ancient capitals and civilizational identity.',
      zh: '适合想在首访中国线路里加入明确历史维度的游客、家庭客群、文化型游客，以及对古都与文明叙事感兴趣的人群。',
    },
    bestSeason: {
      en: 'Spring and autumn are the strongest overall seasons, especially for old-city walking and historical routes with a balanced pace.',
      zh: '整体上春季和秋季更强，尤其适合古城步行和节奏较均衡的历史文化线路。',
    },
    stay: {
      en: '2 days can work for the essentials, while 2–3 days is a more natural range if you want both the headline heritage layer and a fuller city rhythm.',
      zh: '压缩版 2 天可以成立，但如果想兼顾核心历史层和更完整的城市节奏，2–3 天更自然。',
    },
    highlights: [
      { en: 'One of the clearest “ancient China” cities for international visitors.', zh: '是最容易向国际游客讲清“古代中国”的城市之一。' },
      { en: 'Strong capital-city identity with a concentrated cultural narrative.', zh: '古都身份强，文化叙事集中，理解门槛相对低。' },
      { en: 'Complements Beijing and Shanghai naturally in a classic three-city route.', zh: '与北京、上海组合时，非常适合构成经典三城首访线。' },
      { en: 'Adds historical depth and civilizational weight to otherwise city-led itineraries.', zh: '能为偏城市导向的中国线路补上明显的历史厚度。' },
    ],
  },
  chengdu: {
    summary: {
      en: 'Chengdu is one of the best cities for introducing international travelers to a slower, more livable side of China through food, urban rhythm and everyday atmosphere.',
      zh: '成都是最适合向国际游客展示中国“更松弛、更好吃、更有生活感”一面的城市之一。',
    },
    audience: {
      en: 'Ideal for food-focused travelers, families, couples, lifestyle-oriented travelers and guests who want a softer, more livable city in the route.',
      zh: '适合美食导向、家庭、情侣、生活方式型游客，以及想在线路里加入更舒适城市节奏的人群。',
    },
    bestSeason: {
      en: 'Spring and autumn are strongest for comfort and pacing. Summer is vibrant but can feel heavier in terms of humidity and energy load.',
      zh: '春季和秋季整体更适合舒适度和节奏控制，夏季活力很强，但湿热体感会增加负担。',
    },
    stay: {
      en: '2 days is the minimum workable range, while 2–3 days is better if you want food, city life and a more relaxed travel rhythm together.',
      zh: '2 天是最短可行范围，但如果想把美食、城市生活和更松弛的节奏结合起来，2–3 天会更合适。',
    },
    highlights: [
      { en: 'One of the easiest Chinese cities for international travelers to genuinely enjoy.', zh: '是国际游客最容易真正喜欢上的中国城市之一。' },
      { en: 'Strong food identity, lifestyle appeal and slower rhythm.', zh: '美食辨识度、生活方式吸引力和慢节奏都很强。' },
      { en: 'Works well as the “comfort and lifestyle” balance point in a larger China itinerary.', zh: '非常适合作为更大中国线路中的“舒适与生活方式平衡点”。' },
      { en: 'Can extend naturally toward Chongqing, Jiuzhaigou or wider Southwest routes.', zh: '也很适合向重庆、九寨沟或更完整的西南线路继续延展。' },
    ],
  },
  xinjiang: {
    summary: {
      en: 'Xinjiang is one of the strongest destinations for turning a China trip into a truly differentiated long-form landscape journey, built around scale, road rhythm and dramatic natural contrast.',
      zh: '新疆是最能把中国旅行拉开差异化的一类目的地之一：它围绕尺度感、公路线和强烈自然反差成立，更像真正的长线风景系统。',
    },
    audience: {
      en: 'Ideal for scenery-first travelers, photographers, road-trip oriented guests and travelers who want a China route far beyond standard city sightseeing.',
      zh: '适合风景优先、摄影向、公路线偏好，以及希望中国路线明显区别于常规城市观光的客群。',
    },
    bestSeason: {
      en: 'Summer to early autumn usually works best overall, but route logic still depends heavily on region, weather and the specific experience you want.',
      zh: '整体上夏季到初秋更容易成立，但具体线路仍然高度依赖区域、天气和你真正想做的体验类型。',
    },
    stay: {
      en: 'A compressed version can start at 5–6 days, but 7–10 days is a much more natural range if you want Xinjiang to feel meaningful rather than rushed.',
      zh: '压缩版可以从 5–6 天起步，但如果想让新疆真正成立而不是赶路式掠过，7–10 天会更自然。',
    },
    highlights: [
      { en: 'One of the most differentiated large-scale landscape destinations in China.', zh: '是中国最具差异化的大尺度景观目的地之一。' },
      { en: 'Built around grasslands, lakes, snow mountains, desert and road-based travel rhythm.', zh: '草原、湖泊、雪山、沙漠和在路上的节奏共同构成核心体验。' },
      { en: 'Ideal for long-form scenic routes rather than compressed city-style sightseeing.', zh: '更适合长线风景路线，而不是压缩式城市观光逻辑。' },
      { en: 'Creates a powerful contrast with Beijing, Shanghai or Xi’an-led first-China routes.', zh: '与北京、上海、西安这些首访中国主线城市形成极强反差。' },
    ],
  },
};

export function getDestinationContent(slug?: string | null) {
  return destinationContent[(slug || '').toLowerCase()] || null;
}
