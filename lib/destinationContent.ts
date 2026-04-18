export type Localized = { en: string; zh: string };

export type DestinationContent = {
  name: Localized;
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
    name: { en: 'Beijing', zh: '北京' },
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
      zh: '整体上春季和秋季最合适。春季适合城市步行和经典景点游览，秋季通常在天气、节奏和视觉清晰度之间更平衡。',
    },
    stay: {
      en: 'A compact version can work in 2 days, but 3–4 days is the more natural range if you want to cover major landmarks, the Great Wall and a more complete city rhythm.',
      zh: '压缩版 2 天也能成立，但如果想把核心地标、长城和更完整的城市节奏都体验到，3–4 天更自然。',
    },
    highlights: [
      { en: 'One of the clearest first-time China entry points for international travelers.', zh: '对国际游客来说，是最清晰的中国入门城市之一。' },
      { en: 'World-recognizable landmarks such as the Forbidden City, Tiananmen and the Great Wall.', zh: '故宫、天安门、长城等世界级高辨识度地标集中。' },
      { en: 'A strong mix of imperial history, national symbolism and contemporary capital-city scale.', zh: '帝都历史、国家象征与当代首都尺度感同时成立。' },
      { en: 'Pairs naturally with Xi’an and Shanghai in a classic first-China route.', zh: '与西安、上海组合时，适合构成经典的首访中国线路。' },
    ],
    experiences: [
      { en: 'Imperial landmarks, national-symbolic sites and a high-recognition introduction to China.', zh: '皇城地标、国家象征性场景，以及高识别度的中国入门体验。' },
      { en: 'A city where international travelers can quickly understand the scale, symbolism and historical continuity of China.', zh: '能帮助国际游客快速理解中国的体量、象征性与历史延续感。' },
      { en: 'A strong first chapter before Xi’an’s historical depth and Shanghai’s modern close.', zh: '非常适合作为西安历史层和上海现代层之前的第一章。' },
    ],
    samplePlan: {
      en: [
        { title: 'Arrive in Beijing and begin with the clearest first-China entry point', description: 'Beijing works best as the city where international travelers build their first understanding of China through scale, symbolism and landmark recognition.' },
        { title: 'Imperial landmarks, capital-city identity and the Great Wall layer', description: 'This stage is ideal for combining Beijing’s strongest visual and historical landmarks with the capital’s broader political and cultural identity.' },
        { title: 'Continue toward Xi’an or complete the opening section of the route', description: 'Beijing naturally leads into Xi’an for deeper history, or can stand as the strongest opening city before the next stage of a wider China itinerary.' },
      ],
      zh: [
        { title: '抵达北京，进入最清晰的首访中国入口', description: '北京最适合作为国际游客理解中国的第一站，通过体量、象征性和地标识别度建立最初认知。' },
        { title: '皇城地标、首都身份与长城层次展开', description: '这一段适合集中展示北京最强的视觉地标和历史象征，同时把首都身份和文化分量带出来。' },
        { title: '继续前往西安，或完成整条路线的开场结构', description: '北京既能自然转入西安形成历史递进，也可以作为更大中国线路里最强的开场城市。' },
      ],
    },
  },
  shanghai: {
    name: { en: 'Shanghai', zh: '上海' },
    summary: {
      en: 'Shanghai is one of the best cities for showing international travelers the face of modern China: skyline, urban polish, design-led city life and a strong sense of familiarity for global visitors.',
      zh: '上海是最适合向国际游客展示“现代中国”形象的城市之一：天际线、都市精致度、设计感城市生活，以及很强的国际熟悉感都集中在这里。',
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
      { en: 'One of the most internationally accessible modern China cities.', zh: '是最容易被国际游客理解和接受的现代中国城市之一。' },
      { en: 'Strong skyline, night views and urban design identity.', zh: '城市天际线、夜景和都市设计感都非常强。' },
      { en: 'Works naturally with Beijing as a classic two-pole China introduction.', zh: '与北京组合时，非常适合形成“传统中国 + 现代中国”的双极入门线路。' },
      { en: 'A strong gateway into Jiangnan routes such as Suzhou and Hangzhou.', zh: '也是进入苏州、杭州等江南线路的天然门户。' },
    ],
    experiences: [
      { en: 'Skyline-led city walking, riverfront night views and a modern China visual layer.', zh: '天际线导向的城市漫游、滨江夜景，以及更强的现代中国视觉层。' },
      { en: 'Neighborhoods, cafés, retail streets and design-conscious urban lifestyle.', zh: '街区、咖啡馆、商业街与更有设计感的城市生活方式。' },
      { en: 'A smoother city for international travelers who want modern comfort and familiarity.', zh: '对追求现代舒适度和国际熟悉感的游客来说，这是更顺手的一座城市。' },
    ],
    samplePlan: {
      en: [
        { title: 'Arrive in Shanghai and begin with the modern China city layer', description: 'Use the first stage of the stay to build an immediate impression of contemporary China through the skyline, waterfront atmosphere and easier international city rhythm.' },
        { title: 'Urban districts, city views and lifestyle-focused exploration', description: 'This stage works well for combining major city visuals with more livable neighborhoods, shopping streets, cafés and a stronger sense of everyday urban polish.' },
        { title: 'Extend into Jiangnan or close the China route in Shanghai', description: 'Shanghai can either serve as the final modern close of a larger China itinerary or as the gateway into softer nearby routes such as Suzhou or Hangzhou.' },
      ],
      zh: [
        { title: '抵达上海，进入现代中国城市层', description: '第一阶段适合用天际线、滨江氛围和更国际化的城市节奏，快速建立对当代中国的第一印象。' },
        { title: '城市街区、城市景观与生活方式体验', description: '这一段适合把核心城市景观与更宜居的街区、商业街、咖啡馆和都市精致度结合起来。' },
        { title: '以江南延展，或在上海收束整条中国路线', description: '上海既可以作为更大中国线路的现代收尾，也可以作为进入苏州、杭州等江南方向的门口。' },
      ],
    },
  },
  xian: {
    name: { en: 'Xi’an', zh: '西安' },
    summary: {
      en: 'Xi’an is one of the most effective historical cities for first-time China routes: it helps international travelers understand ancient China quickly and clearly through a concentrated cultural narrative.',
      zh: '西安是最适合放进首访中国线路的历史文化城市之一，它能通过高度集中的古都叙事，帮助国际游客更快理解“历史中国”。',
    },
    audience: {
      en: 'Ideal for first-time China visitors who want a historical layer in the route, families, culture-focused travelers and guests interested in ancient capitals and civilizational identity.',
      zh: '适合希望在首访中国线路里加入明确历史维度的游客、家庭客群、文化型游客，以及对古都和文明叙事有兴趣的人群。',
    },
    bestSeason: {
      en: 'Spring and autumn are the strongest overall seasons, especially for old-city walking and historical routes with a balanced pace.',
      zh: '整体上春季和秋季更强，尤其适合古城步行和节奏更均衡的历史文化线路。',
    },
    stay: {
      en: '2 days can work for the essentials, while 2–3 days is a more natural range if you want both the headline heritage layer and a fuller city rhythm.',
      zh: '2 天可以覆盖基础内容，但如果想兼顾核心历史层和更完整的城市节奏，2–3 天更自然。',
    },
    highlights: [
      { en: 'One of the clearest “ancient China” cities for international visitors.', zh: '是最容易向国际游客讲清“古代中国”的城市之一。' },
      { en: 'Strong capital-city identity with a concentrated cultural narrative.', zh: '古都身份明显，文化叙事高度集中。' },
      { en: 'Complements Beijing and Shanghai naturally in a classic three-city route.', zh: '与北京、上海组合时，非常适合构成经典三城首访线路。' },
      { en: 'Adds historical depth and civilizational weight to otherwise city-led itineraries.', zh: '能够为偏城市型的中国路线补上明显的历史厚度。' },
    ],
    experiences: [
      { en: 'Ancient-capital atmosphere, concentrated heritage landmarks and a clearer civilizational reading of China.', zh: '古都氛围、集中度很高的历史遗产，以及更清晰的文明层次理解。' },
      { en: 'A strong historical counterweight to Shanghai’s modernity and a natural middle section after Beijing.', zh: '它既能平衡上海的现代感，也非常适合作为北京之后的历史中段。' },
      { en: 'A city that helps first-time China routes feel deeper, not just broader.', zh: '它能让首访中国线路变得更深，而不是只是更广。' },
    ],
    samplePlan: {
      en: [
        { title: 'Arrive in Xi’an and enter the historical layer of the route', description: 'Xi’an works best as the section where a China trip becomes historically grounded, helping travelers move from major-city recognition into a more ancient-capital understanding.' },
        { title: 'Heritage landmarks and old-capital atmosphere', description: 'This stage is ideal for concentrating the route’s historical depth, combining major heritage highlights with a stronger sense of ancient urban identity.' },
        { title: 'Continue toward Shanghai or complete the central historical section', description: 'Xi’an can either bridge naturally into Shanghai for a modern close or serve as the historical midpoint in a broader China itinerary.' },
      ],
      zh: [
        { title: '抵达西安，进入整条路线的历史层', description: '西安最适合作为中国旅行进入“历史厚度”阶段的节点，让游客从城市识别过渡到更明确的古都文明理解。' },
        { title: '历史遗产与古都氛围集中展开', description: '这一段适合把整条路线里的历史深度集中释放，通过重点遗产和更强的古都感，让中国旅行更有层次。' },
        { title: '继续转入上海，或完成中国中段结构', description: '西安既可以自然衔接到上海形成现代收尾，也可以作为更大中国线路里的历史中段。' },
      ],
    },
  },
  chengdu: {
    name: { en: 'Chengdu', zh: '成都' },
    summary: {
      en: 'Chengdu is one of the best cities for introducing international travelers to a slower, more livable side of China through food, urban rhythm and everyday atmosphere.',
      zh: '成都很适合向国际游客展示中国更松弛、更好吃、也更有生活感的一面，它通过美食、城市节奏和日常氛围来成立。',
    },
    audience: {
      en: 'Ideal for food-focused travelers, families, couples, lifestyle-oriented travelers and guests who want a softer, more livable city in the route.',
      zh: '适合美食导向、家庭、情侣、生活方式型游客，以及想在路线里加入更舒适城市节奏的人群。',
    },
    bestSeason: {
      en: 'Spring and autumn are strongest for comfort and pacing. Summer is vibrant but can feel heavier in terms of humidity and energy load.',
      zh: '春季和秋季在舒适度与节奏控制上更强。夏季很有活力，但湿热感和体力消耗也会更明显。',
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
    experiences: [
      { en: 'Food-forward neighborhoods, teahouse rhythm and a more relaxed urban pace.', zh: '以美食为核心的街区、茶馆节奏，以及更松弛的城市步调。' },
      { en: 'A city that feels easier, softer and more livable for international guests.', zh: '对国际游客来说，它是一座更轻松、更柔和、也更有生活感的城市。' },
      { en: 'A strong balance point between big-city convenience and slower everyday experience.', zh: '它能在大城市便利性与慢节奏生活体验之间给出很好的平衡。' },
    ],
    samplePlan: {
      en: [
        { title: 'Arrive in Chengdu and shift into a slower urban rhythm', description: 'Chengdu works best as the point in a China route where the pace softens and the trip becomes more about enjoyment, food and everyday atmosphere.' },
        { title: 'Food, neighborhood life and the city’s easygoing identity', description: 'This stage is ideal for combining major city highlights with local food culture, walkable districts and a more livable sense of urban China.' },
        { title: 'Extend toward Chongqing or continue into a wider Southwest route', description: 'Chengdu can stand on its own as a lifestyle city stay, or connect naturally into Chongqing and broader Southwest China journeys.' },
      ],
      zh: [
        { title: '抵达成都，进入更松弛的城市节奏', description: '成都很适合作为整条中国线路里节奏放缓的节点，让旅行从“打卡”转向“享受、美食和生活感”。' },
        { title: '美食、街区生活与成都的松弛城市气质', description: '这一段适合把核心城市体验与本地饮食文化、街区漫游和更容易让人放松的生活方式结合起来。' },
        { title: '继续延展重庆，或转入更完整的西南线路', description: '成都既可以作为独立的生活方式城市停留，也可以自然衔接重庆和更大的西南中国旅行路线。' },
      ],
    },
  },
  guilin: {
    name: { en: 'Guilin', zh: '桂林' },
    summary: {
      en: 'Guilin is one of the most internationally recognizable scenic destinations in China, known for its limestone karst landscapes, river views and softer pace compared with major city routes.',
      zh: '桂林是中国最容易被国际游客识别的风景型目的地之一，以喀斯特山水、江景和相对柔和的旅行节奏见长。',
    },
    audience: {
      en: 'Ideal for first-time China visitors who want iconic scenery, couples, families, photographers and travelers looking for a softer nature-led route.',
      zh: '适合想看中国经典山水意象的首访游客、情侣、家庭、摄影爱好者，以及希望路线更自然柔和的人群。',
    },
    bestSeason: {
      en: 'Spring and autumn usually offer the best balance of scenery, comfort and movement. Summer is lush and photogenic but can feel hotter and more humid.',
      zh: '春季和秋季通常在景观、舒适度和出行节奏上更平衡。夏季更茂盛也更上镜，但体感会更热更湿。',
    },
    stay: {
      en: '2 days can cover the basics, while 2–3 days works better if you want river scenery, surrounding countryside and a less rushed pace.',
      zh: '2 天可以覆盖基础内容，但如果想兼顾江景、周边乡村和更从容的节奏，2–3 天会更自然。',
    },
    highlights: [
      { en: 'One of the most internationally familiar scenic images of China.', zh: '是国际游客最熟悉的中国山水视觉形象之一。' },
      { en: 'Karst mountains, river landscapes and a softer travel rhythm make it highly approachable.', zh: '喀斯特山体、江景和更柔和的节奏，让它很容易让游客产生好感。' },
      { en: 'Works well as a scenic contrast to Beijing, Shanghai or Xi’an city-led itineraries.', zh: '和北京、上海、西安等城市型线路组合时，能形成很好的风景反差。' },
      { en: 'A strong option for couples, families and travelers who want classic China scenery without an overly demanding route.', zh: '非常适合情侣、家庭，以及想看经典中国风景但又不想把路线做得太辛苦的人群。' },
    ],
    experiences: [
      { en: 'River scenery, karst peaks and a softer scenic rhythm than major city routes.', zh: '江景、喀斯特峰林，以及相比大城市线路更柔和的风景节奏。' },
      { en: 'A destination that quickly communicates the visual poetry many travelers associate with China.', zh: '它能很快把很多游客心中“像中国山水画一样”的视觉印象讲清楚。' },
      { en: 'A good fit for couples, families and travelers who want beauty without overly intense travel pressure.', zh: '适合情侣、家庭，以及想看美景但又不想把旅程做得太辛苦的人群。' },
    ],
    samplePlan: {
      en: [
        { title: 'Arrive in Guilin and enter the scenic layer of the route', description: 'Guilin works best when the China trip shifts from city recognition into softer natural scenery and slower visual enjoyment.' },
        { title: 'Karst landscapes, river views and a gentler travel pace', description: 'This stage is ideal for combining the destination’s iconic scenery with a more relaxed rhythm than major metropolitan routes.' },
        { title: 'Continue into Yangshuo or use Guilin as the scenic contrast in a wider route', description: 'Guilin can stand as a compact scenic chapter on its own or become the nature-focused contrast inside a larger China itinerary.' },
      ],
      zh: [
        { title: '抵达桂林，进入整条路线的风景层', description: '桂林很适合作为中国旅行从城市识别度转向自然风景与慢节奏视觉享受的节点。' },
        { title: '喀斯特山水、江景与更柔和的旅行节奏', description: '这一段适合把桂林最经典的山水景观与更轻松的旅行速度结合起来，让整段路线更有呼吸感。' },
        { title: '继续延展阳朔，或把桂林作为整条中国线路里的自然反差段', description: '桂林既可以作为一个紧凑的风景章节独立成立，也可以成为更大中国线路里的自然风景反差点。' },
      ],
    },
  },
  zhangjiajie: {
    name: { en: 'Zhangjiajie', zh: '张家界' },
    summary: {
      en: 'Zhangjiajie is one of China’s most dramatic landscape destinations for international travelers, known for its towering sandstone pillars, mountain viewpoints and highly cinematic scenery.',
      zh: '张家界是中国最具戏剧感、也最容易打动国际游客的风景型目的地之一，以高耸石英砂岩峰林、山地观景和非常强的电影感景观著称。',
    },
    audience: {
      en: 'Ideal for first-time visitors who want unforgettable scenery, photographers, couples, active travelers and guests who want a more visually dramatic China route.',
      zh: '适合想看中国震撼自然景观的首访游客、摄影爱好者、情侣、偏活动型旅行者，以及希望中国路线更有视觉冲击力的人群。',
    },
    bestSeason: {
      en: 'Spring and autumn usually offer the best mix of visibility, comfort and landscape texture. Summer is greener and fuller, but crowds and humidity can be higher.',
      zh: '春季和秋季通常在能见度、舒适度和景观层次之间更平衡。夏季更绿更饱满，但游客量和湿度也可能更高。',
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
    experiences: [
      { en: 'Towering sandstone pillars, mountain viewpoints and a much more dramatic visual scale than ordinary city routes.', zh: '高耸峰林、山地观景，以及远超普通城市线路的视觉尺度感。' },
      { en: 'A destination that makes a China trip feel more cinematic, adventurous and visually unforgettable.', zh: '它能让一条中国旅行路线变得更电影化、更有冒险感，也更难忘。' },
      { en: 'Best suited to travelers who want stronger scenery rather than soft urban comfort.', zh: '更适合想追求震撼自然景观，而不是柔和都市舒适感的游客。' },
    ],
    samplePlan: {
      en: [
        { title: 'Arrive in Zhangjiajie and enter the most dramatic nature chapter of the route', description: 'Zhangjiajie works best when the trip needs a truly memorable landscape peak with scale, elevation and cinematic scenery.' },
        { title: 'Mountain viewpoints, scenic transfers and high-impact landscapes', description: 'This stage is ideal for travelers who want to dedicate time to powerful mountain scenery rather than only city landmarks.' },
        { title: 'Use Zhangjiajie as the visual high point inside a broader China itinerary', description: 'Zhangjiajie can be the wow-factor nature chapter that transforms a city-led China route into a more unforgettable journey.' },
      ],
      zh: [
        { title: '抵达张家界，进入整条路线里最震撼的自然章节', description: '张家界很适合承担中国旅行中的风景高点，用尺度、高差和电影感景观拉开整条路线的记忆点。' },
        { title: '山地观景、景区衔接与高冲击力自然画面', description: '这一段适合把重点时间留给强烈自然景观，而不是普通城市地标，让旅行更有“惊艳感”。' },
        { title: '把张家界作为更大中国线路中的视觉高峰段', description: '张家界可以成为城市型中国线路中的自然高潮段，让整条旅行从“完整”变成“难忘”。' },
      ],
    },
  },
  xinjiang: {
    name: { en: 'Xinjiang', zh: '新疆' },
    summary: {
      en: 'Xinjiang is one of the strongest destinations for turning a China trip into a truly differentiated long-form landscape journey, built around scale, road rhythm and dramatic natural contrast.',
      zh: '新疆是最能把中国旅行做成“差异化长线风景旅程”的目的地之一，它围绕尺度感、公路线节奏和强烈自然反差来成立。',
    },
    audience: {
      en: 'Ideal for scenery-first travelers, photographers, road-trip oriented guests and travelers who want a China route far beyond standard city sightseeing.',
      zh: '适合风景优先、摄影向、公路线偏好，以及希望中国路线明显区别于常规城市观光的客群。',
    },
    bestSeason: {
      en: 'Summer to early autumn usually works best overall, but route logic still depends heavily on region, weather and the specific experience you want.',
      zh: '整体上夏季到初秋更容易成立，但具体线路仍然高度依赖区域、天气和你真正想要的体验。',
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
    experiences: [
      { en: 'Grasslands, lakes, mountains, desert landscapes and a much stronger sense of distance and scale.', zh: '草原、湖泊、雪山、沙漠，以及更强烈的距离感和尺度感。' },
      { en: 'A destination built around the feeling of being on the road, not just arriving at city landmarks.', zh: '它的核心不只是到达景点，而是“在路上”的过程本身。' },
      { en: 'Best suited to travelers who want a China journey that feels truly different from standard urban sightseeing.', zh: '非常适合希望中国旅行明显区别于常规城市观光的人群。' },
    ],
    samplePlan: {
      en: [
        { title: 'Arrive in Xinjiang and shift into a long-form landscape journey', description: 'Xinjiang works best when the trip becomes less about city stops and more about distance, scenery and the rhythm of moving through vast terrain.' },
        { title: 'Road-based scenery, regional contrast and wide-open scale', description: 'This stage is ideal for travelers who want to feel the route itself, not just individual landmarks, through changing landscapes and long-form motion.' },
        { title: 'Use Xinjiang as the differentiated scenic chapter of a China trip', description: 'Xinjiang can either stand as its own major journey or serve as the part of China that makes the entire route feel much more distinctive.' },
      ],
      zh: [
        { title: '抵达新疆，进入真正的长线风景旅行节奏', description: '新疆最适合让中国旅行从“城市停靠”转向“路程、风景和地貌变化”本身，形成完全不同的旅行感受。' },
        { title: '公路线、区域反差与开阔尺度感', description: '这一段适合让游客真正感受到路线本身，而不是只看单个景点，通过不断变化的风景和行进节奏建立新疆的核心体验。' },
        { title: '把新疆作为中国旅行里最有差异化的章节', description: '新疆既可以独立成为一段重要旅程，也可以作为整条中国线路里最能拉开差异化的风景章节。' },
      ],
    },
  },
};

export function getDestinationContent(slug?: string | null) {
  return destinationContent[(slug || '').toLowerCase()] || null;
}
