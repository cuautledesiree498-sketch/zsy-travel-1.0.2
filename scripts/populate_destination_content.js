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

const destinationPatch = {
  beijing: {
    tagline: { en: 'Imperial landmarks, historic depth and a strong first-time China entry point.', zh: '皇城地标、历史纵深与非常适合首访中国的入门城市。' },
    description: {
      en: 'Beijing is one of the strongest first-entry cities for China: imperial landmarks, historic depth, national symbolism and city scale all come together in a way that helps international travelers build an immediate understanding of China.',
      zh: '北京是最适合作为“第一次来中国”入口的城市之一：皇城地标、历史纵深、国家叙事和城市尺度都非常强，能让国际游客迅速建立对中国的第一印象。',
    },
    idealFor: {
      en: 'Ideal for first-time China visitors, families, culture-focused travelers, landmark seekers and guests who want a strong historical foundation before moving into other regions.',
      zh: '适合第一次来中国的游客、家庭客群、文化型游客、地标导向型游客，以及希望先建立历史认知再延展到其他区域的人群。',
    },
    bestTime: {
      en: 'Spring and autumn work best overall. Spring is comfortable for city walking and classic sightseeing, while autumn usually brings the best balance of weather, pacing and visual clarity.',
      zh: '整体上春季和秋季最合适。春季适合城市步行与经典景点游览，秋季通常在天气、节奏和视觉清晰度之间更均衡。',
    },
    suggestedStay: { en: '3–4 days', zh: '3–4 天' },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'First-time China trips', zh: '首访中国' } },
      { label: { en: 'Suggested stay', zh: '建议停留' }, value: { en: '3–4 days', zh: '3–4 天' } },
      { label: { en: 'Travel style', zh: '旅行风格' }, value: { en: 'Culture + landmarks', zh: '文化 + 地标' } },
    ],
    highlights: [
      { en: 'One of the clearest first-time China entry points for international travelers.', zh: '对国际游客来说，是最清晰的首访中国入口之一。' },
      { en: 'World-recognizable landmarks such as the Forbidden City, Tiananmen and the Great Wall.', zh: '故宫、天安门、长城等世界级高识别度地标集中。' },
      { en: 'A strong mix of imperial history, national symbolism and contemporary capital-city scale.', zh: '帝都历史、国家象征与当代首都尺度感同时成立。' },
      { en: 'Pairs naturally with Xi’an and Shanghai in a classic first-China route.', zh: '与西安、上海组合时，非常适合构成经典首访中国线。' },
    ],
    experiences: [
      { title: { en: 'Imperial landmarks and symbolic sites', zh: '皇城地标与象征性场景' }, description: { en: 'A clear introduction to the historical and political heart of China.', zh: '快速进入中国历史与国家叙事核心的入口体验。' } },
      { title: { en: 'The Great Wall layer', zh: '长城层' }, description: { en: 'One of the most recognizable world heritage experiences in the country.', zh: '中国最具世界识别度的世界遗产体验之一。' } },
      { title: { en: 'Capital-city rhythm', zh: '首都节奏' }, description: { en: 'A way to feel the scale, structure and pace of China’s capital city.', zh: '感受中国首都的尺度、结构与城市节奏。' } },
    ],
    samplePlan: [
      {
        title: { en: 'Arrive in Beijing and begin with the clearest first-China entry point', zh: '抵达北京，进入最清晰的首访中国入口' },
        description: { en: 'Beijing works best as the city where international travelers build their first understanding of China through scale, symbolism and landmark recognition.', zh: '北京最适合作为国际游客建立对中国第一印象的城市，通过尺度感、象征性与地标识别度来建立认知。' },
      },
      {
        title: { en: 'Imperial landmarks, capital-city identity and the Great Wall layer', zh: '皇城地标、首都身份与长城层' },
        description: { en: 'Combine the strongest visual and historical landmarks with the broader cultural identity of the capital.', zh: '将最强的视觉与历史地标同首都更大的文化身份一起打包呈现。' },
      },
      {
        title: { en: 'Continue toward Xi’an or complete the opening section of the route', zh: '继续前往西安，或完成整条路线的开场' },
        description: { en: 'Beijing naturally leads into Xi’an for deeper history, or stands alone as the strongest opening city in a wider China itinerary.', zh: '北京既可自然过渡到西安进入更深历史层，也可作为更大中国行程里最强的开场城市。' },
      },
    ],
    image: '/media/custom/destinations/beijing/beijing-1.jpg',
  },
  shanghai: {
    tagline: { en: 'Modern skyline, urban polish and an easy introduction to contemporary China.', zh: '现代天际线、都市精致感与理解当代中国的快速入口。' },
    description: {
      en: 'Shanghai is one of the best cities for showing international travelers the face of modern China: skyline, urban polish, design-led city life and a strong sense of familiarity for global visitors.',
      zh: '上海是最适合向国际游客展示“现代中国”形象的城市之一：天际线、都市精致度、设计感城市生活和强烈的国际熟悉感都很集中。',
    },
    idealFor: {
      en: 'Ideal for first-time China visitors who want a modern city perspective, couples, family travelers, business-extension trips and guests who prefer a polished urban experience.',
      zh: '适合想从现代城市视角理解中国的首访游客、情侣、家庭客群、商务延展行程，以及偏好精致都市体验的客人。',
    },
    bestTime: {
      en: 'Spring and autumn are usually the strongest seasons. They support both urban walking and skyline-based city experiences without the heavier summer humidity.',
      zh: '春季和秋季通常是更强的季节，既适合城市步行，也适合天际线和城市景观体验，同时能避开夏季更重的湿热感。',
    },
    suggestedStay: { en: '2–3 days', zh: '2–3 天' },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Modern China trips', zh: '现代中国线路' } },
      { label: { en: 'Suggested stay', zh: '建议停留' }, value: { en: '2–3 days', zh: '2–3 天' } },
      { label: { en: 'Travel style', zh: '旅行风格' }, value: { en: 'Urban + skyline', zh: '都市 + 天际线' } },
    ],
    highlights: [
      { en: 'One of the most internationally accessible modern China cities.', zh: '是最容易被国际游客理解和接受的现代中国城市之一。' },
      { en: 'Strong skyline, night views and urban design identity.', zh: '天际线、夜景与城市设计感都非常强。' },
      { en: 'Works naturally with Beijing as a classic two-pole China introduction.', zh: '与北京组合时，很适合构成“传统中国 + 现代中国”的双极入口。' },
      { en: 'A strong gateway into Jiangnan routes such as Suzhou and Hangzhou.', zh: '也是进入苏州、杭州等江南线路的自然门口。' },
    ],
    experiences: [
      { title: { en: 'Skyline-led city walking', zh: '天际线主导的城市漫步' }, description: { en: 'Modern China views through skyline, waterfront atmosphere and urban rhythm.', zh: '通过天际线、滨水氛围与城市节奏感来理解现代中国。' } },
      { title: { en: 'Urban lifestyle districts', zh: '都市生活街区' }, description: { en: 'Neighborhoods, cafés and streets that show the city’s everyday polish.', zh: '街区、咖啡馆与日常街景共同构成城市精致生活层。' } },
      { title: { en: 'Gateway to Jiangnan', zh: '江南线路入口' }, description: { en: 'A smooth transition into Suzhou, Hangzhou and softer nearby routes.', zh: '可自然衔接到苏州、杭州等更柔和的周边路线。' } },
    ],
    samplePlan: [
      {
        title: { en: 'Arrive in Shanghai and begin with the modern China city layer', zh: '抵达上海，进入现代中国城市层' },
        description: { en: 'Use the first stage to build an immediate impression of contemporary China through skyline, waterfront atmosphere and easier city rhythm.', zh: '第一阶段通过天际线、滨水氛围和更容易进入的城市节奏，快速建立对当代中国的印象。' },
      },
      {
        title: { en: 'Urban districts, city views and lifestyle-focused exploration', zh: '城市街区、城市景观与生活方式体验' },
        description: { en: 'Combine the core city view with more livable neighborhoods, cafés and shopping streets.', zh: '把核心城市景观和更宜居的街区、咖啡馆、商业街区结合起来。' },
      },
      {
        title: { en: 'Extend into Jiangnan or close the China route in Shanghai', zh: '延展到江南，或在上海收束整条中国路线' },
        description: { en: 'Shanghai can serve as a modern close to a wider itinerary or the gateway into Suzhou and Hangzhou.', zh: '上海既可以作为更大行程的现代收尾，也可以作为进入苏州、杭州的门口。' },
      },
    ],
    image: '/media/custom/destinations/shanghai/shanghai-1.jpg',
  },
  xian: {
    tagline: { en: 'Ancient-capital depth and a clear historical counterweight to city-led itineraries.', zh: '古都深度，以及对城市型路线非常有效的历史对照层。' },
    description: {
      en: 'Xi’an is one of the most effective historical cities for first-time China routes: it helps international travelers understand ancient China quickly and clearly through a concentrated cultural narrative.',
      zh: '西安是最适合放进首访中国线路里的历史城市之一：它通过高度集中的文化叙事，帮助国际游客快速、清晰地理解古代中国。',
    },
    idealFor: {
      en: 'Ideal for first-time China visitors who want a historical layer in the route, families, culture-focused travelers and guests interested in ancient capitals and civilizational identity.',
      zh: '适合希望在首访中国线路中加入历史层的游客、家庭客群、文化型游客，以及对古都和文明叙事感兴趣的人群。',
    },
    bestTime: {
      en: 'Spring and autumn are the strongest overall seasons, especially for old-city walking and historical routes with a balanced pace.',
      zh: '整体上春季和秋季更强，尤其适合古城步行和节奏较均衡的历史文化线路。',
    },
    suggestedStay: { en: '2–3 days', zh: '2–3 天' },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'History-first routes', zh: '历史优先线路' } },
      { label: { en: 'Suggested stay', zh: '建议停留' }, value: { en: '2–3 days', zh: '2–3 天' } },
      { label: { en: 'Travel style', zh: '旅行风格' }, value: { en: 'Ancient capital + culture', zh: '古都 + 文化' } },
    ],
    highlights: [
      { en: 'One of the clearest “ancient China” cities for international visitors.', zh: '是最容易向国际游客讲清“古代中国”的城市之一。' },
      { en: 'Strong capital-city identity with a concentrated cultural narrative.', zh: '古都身份明确，文化叙事非常集中。' },
      { en: 'Complements Beijing and Shanghai naturally in a classic three-city route.', zh: '与北京、上海组合时，能自然形成经典三城线路。' },
      { en: 'Adds historical depth and civilizational weight to otherwise city-led itineraries.', zh: '能为以城市为主的路线增加历史纵深和文明重量。' },
    ],
    experiences: [
      { title: { en: 'Ancient capital atmosphere', zh: '古都氛围' }, description: { en: 'A concentrated reading of ancient Chinese capital culture and history.', zh: '集中感受古代中国都城文化与历史叙事。' } },
      { title: { en: 'Historic counterweight', zh: '历史对照层' }, description: { en: 'A useful balance to the modernity of Shanghai and the scale of Beijing.', zh: '与上海的现代感、北京的规模感形成有力对照。' } },
      { title: { en: 'Civilizational depth', zh: '文明纵深' }, description: { en: 'Adds a stronger historical dimension to the route without slowing the whole trip too much.', zh: '在不让行程过于拖慢的前提下，补上很重要的历史纵深。' } },
    ],
    samplePlan: [
      {
        title: { en: 'Arrive in Xi’an and enter the historical layer of the route', zh: '抵达西安，进入整条路线的历史层' },
        description: { en: 'Xi’an works best as the section where a China trip becomes historically grounded and more clearly linked to ancient-capital identity.', zh: '西安最适合作为让中国行程“落到历史上”的节点。' },
      },
      {
        title: { en: 'Heritage landmarks and old-capital atmosphere', zh: '历史地标与古都氛围' },
        description: { en: 'Concentrate the route’s historical depth through the city’s key heritage layers and cultural texture.', zh: '通过核心遗产层和城市质感，把整条路线的历史深度集中展开。' },
      },
      {
        title: { en: 'Continue toward Shanghai or complete the historical section', zh: '继续前往上海，或完成历史段落' },
        description: { en: 'Xi’an can bridge naturally into Shanghai for a modern close, or sit as the historical midpoint of a broader journey.', zh: '西安可以自然衔接上海形成现代收尾，也可以作为更大行程中的历史中段。' },
      },
    ],
    image: '/media/destinations/shaanxi.jpg',
  },
  chengdu: {
    tagline: { en: 'Slow rhythm, food culture and a softer side of China.', zh: '慢节奏、美食文化与更柔和的中国面貌。' },
    description: {
      en: 'Chengdu is one of the best cities for introducing international travelers to a slower, more livable side of China through food, urban rhythm and everyday atmosphere.',
      zh: '成都非常适合向国际游客展示中国更慢、更宜居的一面：通过美食、城市节奏和日常氛围来完成体验。',
    },
    idealFor: {
      en: 'Ideal for food-focused travelers, families, couples, lifestyle-oriented travelers and guests who want a softer, more livable city in the route.',
      zh: '适合美食导向、家庭客群、情侣、生活方式型游客，以及想在路线里加入更舒适城市节奏的人群。',
    },
    bestTime: {
      en: 'Spring and autumn are strongest for comfort and pacing. Summer is vibrant but can feel heavier in terms of humidity and energy load.',
      zh: '春季和秋季在舒适度与节奏上最强。夏季氛围活跃，但湿热感和体力负担也会更明显。',
    },
    suggestedStay: { en: '2–3 days', zh: '2–3 天' },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Food + lifestyle', zh: '美食 + 生活方式' } },
      { label: { en: 'Suggested stay', zh: '建议停留' }, value: { en: '2–3 days', zh: '2–3 天' } },
      { label: { en: 'Travel style', zh: '旅行风格' }, value: { en: 'Slow city', zh: '慢城市' } },
    ],
    highlights: [
      { en: 'One of the easiest Chinese cities for international travelers to genuinely enjoy.', zh: '是国际游客最容易真正喜欢上的中国城市之一。' },
      { en: 'Strong food identity, lifestyle appeal and slower rhythm.', zh: '美食辨识度、生活方式吸引力和慢节奏都很强。' },
      { en: 'Works well as the comfort and lifestyle balance point in a larger China itinerary.', zh: '在更大的中国行程里，非常适合作为舒适度与生活方式的平衡点。' },
      { en: 'Can extend naturally toward Chongqing, Jiuzhaigou or wider Southwest routes.', zh: '也很适合衔接重庆、九寨沟或更完整的西南线路。' },
    ],
    experiences: [
      { title: { en: 'Food-first city rhythm', zh: '以美食为核心的城市节奏' }, description: { en: 'A relaxed way to experience daily China through food and neighborhood life.', zh: '通过美食和街区生活，感受更放松的中国日常。' } },
      { title: { en: 'Soft urban pacing', zh: '柔和城市节奏' }, description: { en: 'A slower city segment that balances faster, more landmark-heavy parts of the route.', zh: '作为更快、更重地标段落之间的缓冲，非常好用。' } },
      { title: { en: 'Southwest extension point', zh: '西南延展点' }, description: { en: 'A strong base for moving into Chongqing, Jiuzhaigou or broader southwest scenery.', zh: '也可以作为前往重庆、九寨沟或更大西南风景线的基础。' } },
    ],
    image: '/media/custom/destinations/chengdu/chengdu-1.jpg',
  },
  chongqing: {
    tagline: { en: 'Layered mountain-city energy and dramatic night views.', zh: '立体山城节奏与很强的夜景冲击力。' },
    description: {
      en: 'Chongqing stands out for its layered mountain-city identity, river views and dramatic night scenery, making it a strong contrast city in a broader China route.',
      zh: '重庆以立体山城、江景和强烈夜景著称，在更大的中国路线里很适合承担“反差城市”的角色。',
    },
    idealFor: {
      en: 'Ideal for travelers who enjoy night views, urban contrast, photography and a more dramatic city experience.',
      zh: '适合喜欢夜景、城市反差、摄影和更有戏剧感城市体验的游客。',
    },
    bestTime: {
      en: 'Spring and autumn generally balance comfort and visibility best, while summer can feel more intense because of heat and humidity.',
      zh: '春秋季通常在舒适度与可视性之间更均衡，夏季则会因为湿热而更有强度。',
    },
    suggestedStay: { en: '2 days', zh: '2 天' },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Night views + contrast', zh: '夜景 + 反差' } },
      { label: { en: 'Suggested stay', zh: '建议停留' }, value: { en: '2 days', zh: '2 天' } },
      { label: { en: 'Travel style', zh: '旅行风格' }, value: { en: 'Mountain city', zh: '山城' } },
    ],
    highlights: [
      { en: 'One of China’s most visually distinctive mountain cities.', zh: '是中国最有辨识度的山城城市之一。' },
      { en: 'River scenery, layered roads and strong night-view appeal.', zh: '江景、立体道路和夜景吸引力都很强。' },
      { en: 'Works especially well as a contrast city in a longer China route.', zh: '在更长的中国行程里，特别适合做对比城市。' },
    ],
    experiences: [
      { title: { en: 'Mountain-city layers', zh: '山城立体层次' }, description: { en: 'A city that feels dramatically different from the standard flat-grid urban model.', zh: '和常规平面城市完全不同的立体城市体验。' } },
      { title: { en: 'River and night views', zh: '江景与夜景' }, description: { en: 'The night scenery is one of the strongest reasons to include Chongqing.', zh: '夜景本身就是把重庆放进路线里的重要理由之一。' } },
      { title: { en: 'Visual contrast stop', zh: '视觉反差节点' }, description: { en: 'A memorable middle section in a broader north-to-south or east-to-west route.', zh: '在更大的路线里，适合作为非常有记忆点的中段。' } },
    ],
    image: '/media/destinations/chongqing.jpg',
  },
  xinjiang: {
    tagline: { en: 'Grand scenery, road-trip rhythm and a truly differentiated China journey.', zh: '大尺度风景、公路线节奏和真正差异化的中国旅行。' },
    description: {
      en: 'Xinjiang is one of the strongest destinations for turning a China trip into a truly differentiated long-form landscape journey, built around scale, road rhythm and dramatic natural contrast.',
      zh: '新疆是最能把中国旅行做出差异化的一类目的地之一：它围绕尺度感、公路线节奏和强烈自然反差展开，更适合长线风景型旅行。',
    },
    idealFor: {
      en: 'Ideal for scenery-first travelers, photographers, road-trip oriented guests and travelers who want a China route far beyond standard city sightseeing.',
      zh: '适合风景优先、摄影向、公路线偏好，以及希望中国路线明显区别于常规城市观光的客群。',
    },
    bestTime: {
      en: 'Summer to early autumn usually works best overall, but route logic still depends heavily on region, weather and the specific experience you want.',
      zh: '整体上夏季到初秋更容易成立，但具体线路仍然高度依赖区域、天气与实际体验诉求。',
    },
    suggestedStay: { en: '7–10 days', zh: '7–10 天' },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Scenery-first routes', zh: '风景优先路线' } },
      { label: { en: 'Suggested stay', zh: '建议停留' }, value: { en: '7–10 days', zh: '7–10 天' } },
      { label: { en: 'Travel style', zh: '旅行风格' }, value: { en: 'Landscape + road trip', zh: '风景 + 公路旅行' } },
    ],
    highlights: [
      { en: 'One of the most differentiated large-scale landscape destinations in China.', zh: '是中国最具差异化的大尺度景观目的地之一。' },
      { en: 'Built around grasslands, lakes, snow mountains, desert and road-based travel rhythm.', zh: '草原、湖泊、雪山、沙漠和在路上的节奏共同构成核心体验。' },
      { en: 'Ideal for long-form scenic routes rather than compressed city-style sightseeing.', zh: '更适合长线风景路线，而不是压缩式城市观光逻辑。' },
      { en: 'Creates a powerful contrast with Beijing, Shanghai or Xi’an-led first-China routes.', zh: '与北京、上海、西安这些首访中国主线城市形成极强反差。' },
    ],
    experiences: [
      { title: { en: 'Scale and openness', zh: '尺度感与开阔感' }, description: { en: 'A route where space, distance and scenery are part of the experience itself.', zh: '空间、距离和风景本身就是旅行体验的重要组成。' } },
      { title: { en: 'Road-trip logic', zh: '公路线逻辑' }, description: { en: 'Long-form travel rhythm with stronger emphasis on movement and scenic transitions.', zh: '更强调移动过程与景观切换的长线节奏。' } },
      { title: { en: 'Western China contrast', zh: '西部中国反差' }, description: { en: 'A very strong contrast to any city-led route in eastern or central China.', zh: '和中国东部、中部任何以城市为主的路线都能形成非常强的反差。' } },
    ],
    image: '/media/custom/destinations/xinjiang/xinjiang-1.jpg',
  },
  yunnan: {
    tagline: { en: 'Slow travel, old towns and a scenic southwest balance point.', zh: '慢旅行、古城与西南风景的平衡点。' },
    description: {
      en: 'Yunnan is one of the most versatile destinations for travelers who want a gentler, more scenic China route, with old towns, mountains and a slower overall pace.',
      zh: '云南是非常适合做“更柔和、更风景化”中国路线的目的地：古城、山景和更慢的整体节奏都很适合放进定制行程。',
    },
    idealFor: {
      en: 'Ideal for slow-travel guests, couples, families, and travelers who want softer scenery and a relaxed southwest route.',
      zh: '适合慢旅行客群、情侣、家庭，以及想要更柔和风景和更放松西南线路的游客。',
    },
    bestTime: {
      en: 'Spring and autumn usually offer the best balance of comfort, scenery and movement.',
      zh: '春季和秋季通常在舒适度、景观与行程流动性之间最均衡。',
    },
    suggestedStay: { en: '5–7 days', zh: '5–7 天' },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Slow travel + scenery', zh: '慢旅行 + 风景' } },
      { label: { en: 'Suggested stay', zh: '建议停留' }, value: { en: '5–7 days', zh: '5–7 天' } },
      { label: { en: 'Travel style', zh: '旅行风格' }, value: { en: 'Old towns + mountains', zh: '古城 + 山景' } },
    ],
    highlights: [
      { en: 'A flexible destination for softer scenery and slower pacing.', zh: '非常适合做更柔和风景与慢节奏线路的弹性目的地。' },
      { en: 'Works well as a balance point after faster, more landmark-heavy cities.', zh: '在高强度地标城市之后，特别适合作为节奏平衡点。' },
      { en: 'Easy to extend into a broader Southwest China route.', zh: '也很容易延展成更完整的西南线路。' },
    ],
    experiences: [
      { title: { en: 'Old-town pacing', zh: '古城慢节奏' }, description: { en: 'A calmer rhythm that works well for slow-travel guests.', zh: '非常适合慢旅行客群的舒缓节奏。' } },
      { title: { en: 'Mountain and lake scenery', zh: '山景与湖景' }, description: { en: 'Soft scenic layers that balance the stronger city-heavy parts of a China route.', zh: '为城市段落更重的路线增加柔和景观层。' } },
      { title: { en: 'Southwest balance point', zh: '西南平衡点' }, description: { en: 'A route section that helps the whole itinerary feel less compressed and more breathable.', zh: '让整条线路更松弛、更有呼吸感。' } },
    ],
    image: '/media/custom/destinations/yunnan/yunnan-1.jpg',
  },
  guilin: {
    tagline: { en: 'Classic karst scenery and one of China’s most recognizable nature icons.', zh: '经典喀斯特风景与中国最具识别度的自然符号之一。' },
    description: {
      en: 'Guilin is one of the most internationally recognizable scenic destinations in China, known for its limestone karst landscapes, river views and softer pace compared with major city routes.',
      zh: '桂林是中国最容易被国际游客识别的风景型目的地之一，以喀斯特山水、江景和比大城市更柔和的节奏著称。',
    },
    idealFor: {
      en: 'Ideal for first-time China visitors who want iconic scenery, couples, families, photographers and travelers looking for a softer nature-led route.',
      zh: '适合想看中国经典山水的首访游客、情侣、家庭、摄影爱好者，以及希望路线更偏自然风景的人群。',
    },
    bestTime: {
      en: 'Spring and autumn usually offer the best balance of scenery, comfort and movement. Summer is lush and photogenic but can feel hotter and more humid.',
      zh: '春季和秋季通常在风景、舒适度和出行节奏之间更均衡。夏季更有绿意和画面感，但也更热更湿。',
    },
    suggestedStay: { en: '2–3 days', zh: '2–3 天' },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Scenic routes', zh: '风景线路' } },
      { label: { en: 'Suggested stay', zh: '建议停留' }, value: { en: '2–3 days', zh: '2–3 天' } },
      { label: { en: 'Travel style', zh: '旅行风格' }, value: { en: 'Karst landscapes', zh: '喀斯特山水' } },
    ],
    highlights: [
      { en: 'One of the most internationally familiar scenic images of China.', zh: '是国际游客最熟悉的中国风景形象之一。' },
      { en: 'Karst mountains, river landscapes and a softer travel rhythm make it highly approachable.', zh: '喀斯特山体、江景与更柔和的节奏让它非常容易进入。' },
      { en: 'Works well as a scenic contrast to Beijing, Shanghai or Xi’an city-led itineraries.', zh: '与北京、上海、西安这类城市型路线组合时，反差非常强。' },
      { en: 'A strong option for couples, families and travelers who want classic China scenery without an overly demanding route.', zh: '适合情侣、家庭，以及想看经典中国风景但不希望行程太累的人群。' },
    ],
    experiences: [
      { title: { en: 'Classic Chinese scenery', zh: '经典中国山水' }, description: { en: 'One of the clearest visual symbols of China’s scenic landscape.', zh: '中国风景形象最清晰的视觉符号之一。' } },
      { title: { en: 'River and karst contrast', zh: '江景与喀斯特反差' }, description: { en: 'The scenery works especially well when the route needs a softer, nature-led chapter.', zh: '当行程需要一个更柔和、以自然为主的章节时，非常好用。' } },
      { title: { en: 'Easy extension point', zh: '易延展节点' }, description: { en: 'Can be folded into a longer southwest or nature-focused route.', zh: '可轻松并入更长的西南或自然风景线路。' } },
    ],
    image: '/media/destinations/guilin.jpg',
  },
  zhangjiajie: {
    tagline: { en: 'Dramatic sandstone peaks and cinematic mountain scenery.', zh: '震撼石英砂岩峰林与极具电影感的山景。' },
    description: {
      en: 'Zhangjiajie is one of China’s most dramatic landscape destinations for international travelers, known for its towering sandstone pillars, mountain viewpoints and highly cinematic scenery.',
      zh: '张家界是中国最具戏剧性、也最能打动国际游客的风景型目的地之一，以高耸峰林、山地观景和非常电影感的景观著称。',
    },
    idealFor: {
      en: 'Ideal for first-time visitors who want unforgettable scenery, photographers, couples, active travelers and guests who want a more visually dramatic China route.',
      zh: '适合想看震撼自然景观的首访游客、摄影爱好者、情侣、偏活动型游客，以及希望路线更有视觉冲击力的人群。',
    },
    bestTime: {
      en: 'Spring and autumn usually offer the best mix of visibility, comfort and landscape texture. Summer is greener and fuller, but crowds and humidity can be higher.',
      zh: '春季和秋季通常在能见度、舒适度和景观层次之间更均衡。夏季更绿、更饱满，但人流和湿度也更高。',
    },
    suggestedStay: { en: '2–3 days', zh: '2–3 天' },
    heroFacts: [
      { label: { en: 'Best for', zh: '适合' }, value: { en: 'Dramatic scenery', zh: '震撼风景' } },
      { label: { en: 'Suggested stay', zh: '建议停留' }, value: { en: '2–3 days', zh: '2–3 天' } },
      { label: { en: 'Travel style', zh: '旅行风格' }, value: { en: 'Mountain views', zh: '山景' } },
    ],
    highlights: [
      { en: 'One of the most visually dramatic and internationally memorable landscapes in China.', zh: '是中国最具视觉冲击力、也最容易留下记忆点的风景之一。' },
      { en: 'Towering sandstone pillars create a highly cinematic visual identity.', zh: '高耸峰林形成极强的电影感视觉识别。' },
      { en: 'A strong scenic contrast to Beijing, Shanghai, Xi’an or Chengdu city-led routes.', zh: '和北京、上海、西安、成都等城市路线组合时，反差极强。' },
      { en: 'A high-impact option for couples, photographers and travelers who want stronger wow-factor in the itinerary.', zh: '对于情侣、摄影爱好者和想让路线更有惊艳感的游客来说，非常合适。' },
    ],
    experiences: [
      { title: { en: 'Cinematic mountain scenery', zh: '电影感山景' }, description: { en: 'A landscape chapter that feels visually different from almost every city stop.', zh: '和几乎所有城市停留点都不一样的视觉章节。' } },
      { title: { en: 'Peak viewpoints', zh: '峰林观景' }, description: { en: 'A route that focuses on strong landscape angles and memorable viewpoints.', zh: '以强景观角度和记忆点观景为核心。' } },
      { title: { en: 'Scenic contrast stop', zh: '风景反差节点' }, description: { en: 'Best used as a high-impact nature chapter inside a broader China itinerary.', zh: '最适合放在更大中国行程里，作为高冲击力自然章节。' } },
    ],
    image: '/media/destinations/zhangjiajie.jpg',
  },
};

function valueOf(item, key, fallback) {
  if (!item || !item[key]) return fallback;
  return item[key];
}

function toSlug(name) {
  return String(name || '').toLowerCase().trim();
}

async function main() {
  const docs = await client.fetch(`*[_type == "destination" && defined(slug.current)]{ _id, "slug": slug.current }`);
  const tx = client.transaction();
  for (const doc of docs) {
    const patch = destinationPatch[toSlug(doc.slug)];
    if (!patch) continue;
    const set = {};
    for (const [key, value] of Object.entries(patch)) {
      if (key === 'image') continue;
      set[key] = value;
    }
    tx.patch(doc._id, { set, setIfMissing: { image: patch.image } });
  }
  const result = await tx.commit();
  console.log(JSON.stringify({ patched: Object.keys(destinationPatch).length, transactionId: result.transactionId || null }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
