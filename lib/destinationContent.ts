export type Localized = { en: string; zh: string };

export type DestinationContent = {
  summary: Localized;
  audience: Localized;
  bestSeason: Localized;
  stay: Localized;
  highlights: Localized[];
  experiences?: Localized[];
  samplePlan?: {
    en: { title: string; description: string }[];
    zh: { title: string; description: string }[];
  };
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
    experiences: [
      { en: 'Imperial landmarks, national-symbolic sites and a high-recognition introduction to China.', zh: '皇城地标、国家象征性场景，以及高识别度的“中国入门体验”。' },
      { en: 'A city where international travelers can quickly understand the scale, symbolism and historical continuity of China.', zh: '它能帮助国际游客更快理解中国的体量、象征性与历史延续感。' },
      { en: 'A strong first chapter before Xi’an’s historical depth and Shanghai’s modern close.', zh: '非常适合作为西安历史层和上海现代层之前的第一章节。' },
    ],
    samplePlan: {
      en: [
        {
          title: 'Arrive in Beijing and begin with the clearest first-China entry point',
          description: 'Beijing works best as the city where international travelers build their first understanding of China through scale, symbolism and landmark recognition.',
        },
        {
          title: 'Imperial landmarks, capital-city identity and the Great Wall layer',
          description: 'This stage is ideal for combining Beijing’s strongest visual and historical landmarks with the capital’s broader political and cultural identity.',
        },
        {
          title: 'Continue toward Xi’an or complete the opening section of the route',
          description: 'Beijing naturally leads into Xi’an for deeper history, or can stand as the strongest opening city before the next stage of a wider China itinerary.',
        },
      ],
      zh: [
        {
          title: '抵达北京，进入最清晰的首访中国入口',
          description: '北京最适合作为国际游客理解中国的第一站，通过体量、象征性和地标识别度建立最初认知。',
        },
        {
          title: '皇城地标、首都身份与长城层次展开',
          description: '这一段适合集中展示北京最强的视觉地标和历史象征性，同时把首都身份和文化分量带出来。',
        },
        {
          title: '继续前往西安，或完成整条路线的开场结构',
          description: '北京既可以自然转入西安形成历史递进，也可以作为更大中国线路里最强的开场城市。',
        },
      ],
    },
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
    experiences: [
      { en: 'Skyline-led city walking, riverfront night views and a modern China visual layer.', zh: '天际线导向的城市漫游、滨江夜景和更强的现代中国视觉层。' },
      { en: 'Neighborhoods, cafés, retail streets and design-conscious urban lifestyle.', zh: '街区、咖啡馆、商业街区与更有设计感的都市生活方式。' },
      { en: 'A smoother city for international travelers who want modern comfort and familiarity.', zh: '对于想要现代舒适度和国际熟悉感的游客来说，是更顺手的一座城市。' },
    ],
    samplePlan: {
      en: [
        {
          title: 'Arrive in Shanghai and begin with the modern China city layer',
          description: 'Use the first stage of the stay to build an immediate impression of contemporary China through the skyline, waterfront atmosphere and easier international city rhythm.',
        },
        {
          title: 'Urban districts, city views and lifestyle-focused exploration',
          description: 'This stage works well for combining major city visuals with more livable neighborhoods, shopping streets, cafés and a stronger sense of everyday urban polish.',
        },
        {
          title: 'Extend into Jiangnan or close the China route in Shanghai',
          description: 'Shanghai can either serve as the final modern close of a larger China itinerary or as the gateway into softer nearby routes such as Suzhou or Hangzhou.',
        },
      ],
      zh: [
        {
          title: '抵达上海，进入现代中国城市层',
          description: '第一阶段适合用天际线、滨江氛围和更容易上手的国际化城市节奏，快速建立对“现代中国”的第一印象。',
        },
        {
          title: '城市街区、城市景观与生活方式体验',
          description: '这一段适合把核心城市景观与更生活化的街区、商业街、咖啡馆和都市精致度结合起来。',
        },
        {
          title: '以上海收束整条中国线路，或延展江南方向',
          description: '上海既适合作为更大中国线路的现代收口，也适合作为进入苏州、杭州等江南方向的门户。',
        },
      ],
    },
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
    experiences: [
      { en: 'Ancient-capital atmosphere, concentrated heritage landmarks and a clearer civilizational reading of China.', zh: '古都氛围、集中度很高的历史遗产，以及更清晰的文明层次理解。' },
      { en: 'A strong historical counterweight to Shanghai’s modernity and a natural middle section after Beijing.', zh: '它既能平衡上海的现代感，也非常适合作为北京之后的历史中段。' },
      { en: 'A city that helps first-time China routes feel deeper, not just broader.', zh: '它让首访中国线路不只是“更广”，而是真正“更深”。' },
    ],
    samplePlan: {
      en: [
        {
          title: 'Arrive in Xi’an and enter the historical layer of the route',
          description: 'Xi’an works best as the section where a China trip becomes historically grounded, helping travelers move from major-city recognition into a more ancient-capital understanding.',
        },
        {
          title: 'Heritage landmarks and old-capital atmosphere',
          description: 'This stage is ideal for concentrating the route’s historical depth, combining major heritage highlights with a stronger sense of ancient urban identity.',
        },
        {
          title: 'Continue toward Shanghai or complete the central historical section',
          description: 'Xi’an can either bridge naturally into Shanghai for a modern close or serve as the historical midpoint in a broader China itinerary.',
        },
      ],
      zh: [
        {
          title: '抵达西安，进入整条路线的历史层',
          description: '西安最适合作为中国旅行进入“历史厚度”阶段的节点，让游客从大城市识别度过渡到更明确的古都文明理解。',
        },
        {
          title: '历史遗产与古都氛围集中展开',
          description: '这一段适合把整条路线里的历史深度集中释放，通过重点遗产和更强的古都感，让中国旅行变得更有层次。',
        },
        {
          title: '继续转入上海，或完成中国中段结构',
          description: '西安既可以自然衔接到上海形成现代收口，也可以作为更大中国线路中的历史中段。',
        },
      ],
    },
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
  guilin: {
    summary: {
      en: 'Guilin is one of the most internationally recognizable scenic destinations in China, known for its limestone karst landscapes, river views and softer pace compared with major city routes.',
      zh: '桂林是中国最容易被国际游客识别的风景型目的地之一，以喀斯特山水、江景和相对柔和的旅行节奏见长。',
    },
    audience: {
      en: 'Ideal for first-time China visitors who want iconic scenery, couples, families, photographers and travelers looking for a softer nature-led route.',
      zh: '适合想看中国经典山水意象的首访游客、情侣、家庭、摄影爱好者，以及希望在线路中加入更柔和自然段落的人群。',
    },
    bestSeason: {
      en: 'Spring and autumn usually offer the best balance of scenery, comfort and movement. Summer is lush and photogenic but can feel hotter and more humid.',
      zh: '春季和秋季通常在风景、舒适度和出行节奏之间更均衡。夏季植被更盛、照片更饱满，但也更热更湿。',
    },
    stay: {
      en: '2 days can cover the basics, while 2–3 days works better if you want river scenery, surrounding countryside and a less rushed pace.',
      zh: '2 天可以覆盖基础内容，但如果想兼顾江景、周边乡村和更从容的节奏，2–3 天更自然。',
    },
    highlights: [
      { en: 'One of the most internationally familiar scenic images of China.', zh: '是国际游客最熟悉的“中国山水”视觉形象之一。' },
      { en: 'Karst mountains, river landscapes and a softer travel rhythm make it highly approachable.', zh: '喀斯特山体、江景和更柔和的节奏，让它非常容易让游客产生好感。' },
      { en: 'Works well as a scenic contrast to Beijing, Shanghai or Xi’an city-led itineraries.', zh: '与北京、上海、西安等城市型路线组合时，能形成很好的风景反差。' },
      { en: 'A strong option for couples, families and travelers who want classic China scenery without an overly demanding route.', zh: '非常适合情侣、家庭，以及想看经典中国风景但又不想把路线做得太辛苦的人群。' },
    ],
  },
  zhangjiajie: {
    summary: {
      en: 'Zhangjiajie is one of China’s most dramatic landscape destinations for international travelers, known for its towering sandstone pillars, mountain viewpoints and highly cinematic scenery.',
      zh: '张家界是中国最具戏剧性、也最容易打动国际游客的风景型目的地之一，以石英砂岩峰林、山地观景和极具电影感的景观著称。',
    },
    audience: {
      en: 'Ideal for first-time visitors who want unforgettable scenery, photographers, couples, active travelers and guests who want a more visually dramatic China route.',
      zh: '适合想看中国震撼自然景观的首访游客、摄影爱好者、情侣、偏活跃型旅行者，以及想让中国线路更有视觉冲击力的人群。',
    },
    bestSeason: {
      en: 'Spring and autumn usually offer the best mix of visibility, comfort and landscape texture. Summer is greener and fuller, but crowds and humidity can be higher.',
      zh: '春季和秋季通常在能见度、舒适度和景观层次之间更平衡。夏季更绿、更饱满，但游客量和湿度也可能更高。',
    },
    stay: {
      en: '2 days is a workable minimum, while 2–3 days is better if you want mountain viewpoints, scenic transfers and a less compressed rhythm.',
      zh: '2 天是可行下限，但如果想把山地观景、景区衔接和整体节奏做得更舒服，2–3 天会更合适。',
    },
    highlights: [
      { en: 'One of the most visually dramatic and internationally memorable landscapes in China.', zh: '是中国最具视觉冲击力、也最容易让国际游客留下深刻印象的自然景观之一。' },
      { en: 'A strong fit for travelers who want a more cinematic and mountainous side of China.', zh: '非常适合想看更电影感、更山地化中国景观的游客。' },
      { en: 'Works especially well as a nature-heavy contrast to Beijing, Shanghai, Xi’an or Chengdu city-led routes.', zh: '和北京、上海、西安、成都等城市型路线组合时，能形成非常强的自然反差。' },
      { en: 'A high-impact scenic option for couples, photographers and travelers who want stronger wow-factor in the itinerary.', zh: '对于情侣、摄影爱好者和想让路线更有“惊艳感”的客人来说，是很强的高冲击力选择。' },
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
