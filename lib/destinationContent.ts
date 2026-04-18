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
      en: 'Beijing works best as the opening chapter of a China journey: grand enough to create first impressions, layered enough to establish historical depth, and clear enough to give the entire route a strong beginning.',
      zh: '北京最适合作为一条中国旅行路线的开场：它既有足够强的第一印象，也有足够深的历史层次，还能为整条路线建立一个非常稳的起点。',
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
      { en: 'A strong opening city when you want the route to begin with weight, identity and unmistakable China recognition.', zh: '如果你希望整条路线从分量感、辨识度和“中国感”开始，北京是很强的开场城市。' },
      { en: 'Combines imperial landmarks, national symbolism and city scale in a way that immediately sets the tone of the journey.', zh: '它把皇城地标、国家象征和城市尺度感放在一起，能很快为旅行定下整体基调。' },
      { en: 'Works especially well before Xi’an’s historical middle layer or Shanghai’s modern finish.', zh: '放在西安之前能拉开历史递进，放在上海之前也能形成很好的传统到现代过渡。' },
      { en: 'Best for travelers who want their first China route to feel structured, confident and memorable from day one.', zh: '非常适合希望首访中国线路从第一天起就显得完整、自信又有记忆点的客人。' },
    ],
    experiences: [
      { en: 'Imperial landmarks, national-symbolic sites and a high-recognition introduction to China.', zh: '皇城地标、国家象征性场景，以及高识别度的中国入门体验。' },
      { en: 'A city where international travelers can quickly understand the scale, symbolism and historical continuity of China.', zh: '能帮助国际游客快速理解中国的体量、象征性与历史延续感。' },
      { en: 'A strong first chapter before Xi’an’s historical depth and Shanghai’s modern close.', zh: '非常适合作为西安历史层和上海现代层之前的第一章。' },
    ],
    samplePlan: {
      en: [
        { title: 'Open the route in Beijing and let the journey begin with clarity and weight', description: 'Beijing works best when the trip needs a confident beginning — one that gives travelers an immediate sense of where they are, why China feels distinctive, and how the rest of the route will unfold.' },
        { title: 'Move through imperial scale, symbolic landmarks and the capital’s broader identity', description: 'This part of the stay is less about collecting sights and more about setting the tone: scale, history and national presence combine here in a way that makes the opening chapter feel grounded and memorable.' },
        { title: 'Leave Beijing with a route that is already structured, then continue into deeper contrast', description: 'Once Beijing is in place, the rest of the itinerary becomes easier to shape — toward Xi’an for historical depth, toward Shanghai for modern contrast, or into a wider route with much stronger narrative balance.' },
      ],
      zh: [
        { title: '以上海之外的中国打开整条路线，而不是只把北京当成景点清单', description: '北京适合作为路线真正的开场，因为它能让客人很快建立“我来到了中国”的第一层感受，同时也为后面的移动留下足够强的基调。' },
        { title: '在皇城尺度、地标象征和首都气质之间，把旅行的分量感建立起来', description: '这一段不只是看几个著名地点，而是让整条路线先有分量、有识别度、有历史与现实同时成立的感觉。' },
        { title: '当北京站稳以后，后续无论转向西安、上海还是更长线路都会更顺', description: '一旦北京作为开场成立，后面的历史递进、现代反差或更大范围的中国旅行都会更容易排出结构，也更容易形成整体记忆。' },
      ],
    },
  },
  shanghai: {
    name: { en: 'Shanghai', zh: '上海' },
    summary: {
      en: 'Shanghai works best when you want a China route to feel polished, modern and internationally fluent — a city that gives the journey lift, rhythm and a more refined urban finish.',
      zh: '如果你希望一条中国路线显得更现代、更精致、更有国际化流动感，上海通常是最合适的一站：它能把整段旅行抬起来，也能让收尾更漂亮。',
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
      { en: 'A natural choice when the route needs modern energy, polished city life and a more international urban tone.', zh: '如果整条路线需要现代感、精致城市生活和更国际化的都市语气，上海是很自然的选择。' },
      { en: 'Adds skyline, riverfront atmosphere and contemporary China confidence without making the journey feel heavy.', zh: '它能把天际线、滨江氛围和当代中国的自信感带进路线里，同时又不会让旅行显得沉重。' },
      { en: 'Works beautifully as a contrast after Beijing or Xi’an, or as the refined final city before departure.', zh: '放在北京或西安之后能形成很漂亮的反差，也很适合作为离开中国前的精致收尾城市。' },
      { en: 'Ideal for travelers who want comfort, aesthetics and a smoother urban pace inside a wider China itinerary.', zh: '适合希望在更大中国线路里加入舒适度、审美感和更顺滑城市节奏的客人。' },
    ],
    experiences: [
      { en: 'Skyline-led city walking, riverfront night views and a modern China visual layer.', zh: '天际线导向的城市漫游、滨江夜景，以及更强的现代中国视觉层。' },
      { en: 'Neighborhoods, cafés, retail streets and design-conscious urban lifestyle.', zh: '街区、咖啡馆、商业街与更有设计感的城市生活方式。' },
      { en: 'A smoother city for international travelers who want modern comfort and familiarity.', zh: '对追求现代舒适度和国际熟悉感的游客来说，这是更顺手的一座城市。' },
    ],
    samplePlan: {
      en: [
        { title: 'Bring Shanghai in when the journey needs polish, lift and a more refined urban close', description: 'Shanghai works best when the route needs a city that feels confident, elegant and easy to move through — the kind of stop that makes the whole itinerary feel more elevated.' },
        { title: 'Let skyline, waterfront rhythm and city texture create a lighter modern chapter', description: 'This section is less about “seeing modern China” in the abstract and more about letting travelers feel its ease, design sense and urban fluency in a way that naturally refreshes the journey.' },
        { title: 'Use Shanghai to either soften the landing or lead outward into Jiangnan', description: 'Shanghai can close a wider China route beautifully, or become the transition into Suzhou, Hangzhou and a gentler Jiangnan continuation with a very different mood.' },
      ],
      zh: [
        { title: '把上海放进路线里，是为了让整段旅行更精致、更抬气质', description: '上海很适合承担一条中国路线里的现代城市章节：不是为了堆城市数量，而是为了让整段旅程更顺、更亮，也更有收尾感。' },
        { title: '在天际线、滨江氛围和都市生活方式之间，让路线变得更轻更流动', description: '这一段适合把城市景观和真实的都市体感放在一起，让前面较重的历史或地标段落被柔化、被提亮。' },
        { title: '可作为整条线路的现代收束，也可顺势进入江南延展', description: '上海既适合作为中国旅行的漂亮结尾，也很适合把客人自然带进苏州、杭州等更柔和、更精致的下一段。' },
      ],
    },
  },
  xian: {
    name: { en: 'Xi’an', zh: '西安' },
    summary: {
      en: 'Xi’an works best as the historical middle layer of a China itinerary — the city that gives the route gravity, continuity and a clearer sense of civilizational depth.',
      zh: '西安最适合作为一条中国路线中的历史中段：它能给整段旅行补上厚度、连续性，以及更明确的文明纵深感。',
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
      { en: 'The right city when a China route needs historical weight rather than just more urban variety.', zh: '如果一条中国路线需要的是历史分量，而不只是再加一座城市，西安往往是最对的一站。' },
      { en: 'Brings ancient-capital atmosphere and concentrated heritage into a way international travelers can feel quickly.', zh: '它能把古都气质和高度集中的历史遗产，以很快能被国际游客感受到的方式带进路线里。' },
      { en: 'Works naturally between Beijing and Shanghai, turning a broad route into one that feels more complete.', zh: '放在北京和上海之间非常自然，能把原本“广”的路线变成更“完整”的路线。' },
      { en: 'Ideal for guests who want their first China journey to feel richer, deeper and more culturally grounded.', zh: '适合希望自己的首访中国之旅显得更丰富、更深、更有文化落点的客人。' },
    ],
    experiences: [
      { en: 'Ancient-capital atmosphere, concentrated heritage landmarks and a clearer civilizational reading of China.', zh: '古都氛围、集中度很高的历史遗产，以及更清晰的文明层次理解。' },
      { en: 'A strong historical counterweight to Shanghai’s modernity and a natural middle section after Beijing.', zh: '它既能平衡上海的现代感，也非常适合作为北京之后的历史中段。' },
      { en: 'A city that helps first-time China routes feel deeper, not just broader.', zh: '它能让首访中国线路变得更深，而不是只是更广。' },
    ],
    samplePlan: {
      en: [
        { title: 'Place Xi’an where the route needs depth, not just another city', description: 'Xi’an works best when the itinerary needs to slow down into meaning — when travelers should feel that China is not only large and impressive, but historically layered and culturally continuous.' },
        { title: 'Let the city’s heritage concentration change the emotional weight of the trip', description: 'This chapter gives the journey a different density: not busier, but deeper. It is where landmarks begin to feel connected to a civilization rather than simply visited one by one.' },
        { title: 'Use Xi’an as the hinge between a strong opening and a more modern finish', description: 'Placed after Beijing or before Shanghai, Xi’an helps the whole route feel intentional — as if each city is answering a different part of the same story.' },
      ],
      zh: [
        { title: '把西安放进路线里，不是为了再加一座城，而是为了让整段旅行更有厚度', description: '西安适合作为路线里进入“真正历史层”的节点，让客人感受到中国不只是体量大、地标强，也有非常清晰的文明连续性。' },
        { title: '让历史遗产和古都气质一起改变整段路线的分量', description: '这一段不是更忙，而是更深。它会让旅行从“看过很多”变成“真的开始理解这片土地为什么重要”。' },
        { title: '放在北京之后、上海之前，整条线会变得更像完整叙事', description: '西安很适合做衔接点，让路线既有开场，也有中段的重量，再自然转入更现代、更轻盈的下一站。' },
      ],
    },
  },
  chengdu: {
    name: { en: 'Chengdu', zh: '成都' },
    summary: {
      en: 'Chengdu works best when a China route needs to soften its pace and become more pleasurable: less about rushing through landmarks, more about food, mood and a city people actually want to stay in.',
      zh: '如果一条中国路线需要把节奏放松下来、把体验感做得更舒服，成都通常是最合适的一站：它不强调赶景点，而更强调好吃、好待、好感受。',
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
      { en: 'A strong choice when the route needs comfort, flavor and a city guests can genuinely settle into.', zh: '如果整条路线需要舒适度、味道和真正让客人愿意待下来的城市，成都是很强的选择。' },
      { en: 'Brings food culture, teahouse rhythm and a softer urban mood that changes the feeling of the whole trip.', zh: '它能把饮食文化、茶馆节奏和更柔和的城市气质带进路线里，直接改变整段旅行的体感。' },
      { en: 'Works especially well after faster, heavier cities, creating a more breathable middle section.', zh: '放在节奏更快、分量更重的城市之后尤其合适，能让路线中段更有呼吸感。' },
      { en: 'Ideal for travelers who want China to feel enjoyable and lived-in, not only impressive.', zh: '适合希望中国旅行不只是“震撼”，也真正“好待、好吃、好享受”的客人。' },
    ],
    experiences: [
      { en: 'Food-forward neighborhoods, teahouse rhythm and a more relaxed urban pace.', zh: '以美食为核心的街区、茶馆节奏，以及更松弛的城市步调。' },
      { en: 'A city that feels easier, softer and more livable for international guests.', zh: '对国际游客来说，它是一座更轻松、更柔和、也更有生活感的城市。' },
      { en: 'A strong balance point between big-city convenience and slower everyday experience.', zh: '它能在大城市便利性与慢节奏生活体验之间给出很好的平衡。' },
    ],
    samplePlan: {
      en: [
        { title: 'Shift into Chengdu when the route needs to breathe and become more pleasurable', description: 'Chengdu works best at the point where the itinerary should feel less performative and more genuinely enjoyable — the city where travelers stop rushing and start settling in.' },
        { title: 'Let food, teahouse rhythm and neighborhood life soften the whole journey', description: 'This stage changes the emotional texture of the route. The experience becomes less about chasing significance and more about tasting, strolling and feeling comfortable in the city.' },
        { title: 'Use Chengdu as a comfort chapter or as the bridge into Southwest China', description: 'Chengdu can stand alone as a refined lifestyle city, or become the pause that prepares the route to continue into Chongqing and the wider Southwest with a much better pace.' },
      ],
      zh: [
        { title: '把成都放进路线里，是为了让整段旅行开始真正好待、好吃、好享受', description: '成都很适合出现在一条已经有了分量和结构的中国路线里，因为它能把节奏放下来，让客人真正开始享受旅行本身。' },
        { title: '用饮食、茶馆和街区生活，把整条路线的体感柔化下来', description: '这一段会改变旅行的情绪质地：不再只是追求“厉害”和“必须看”，而是开始进入舒服、顺口、愿意慢下来的状态。' },
        { title: '可作为舒适章节独立成立，也可顺势进入更大的西南段落', description: '成都既能自己成立，也很适合接重庆和更完整的西南路线，让整条旅行更有起伏而不是一路一个速度。' },
      ],
    },
  },
  guilin: {
    name: { en: 'Guilin', zh: '桂林' },
    summary: {
      en: 'Guilin works best when a China route needs a softer scenic chapter — the part of the journey that slows down, opens up and lets the landscape do the emotional work.',
      zh: '如果一条中国路线需要一个更柔和、更舒展的风景章节，桂林通常是很合适的选择：它能让旅行慢下来，也能让风景自己把情绪拉出来。',
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
      { en: 'A beautiful choice when the route needs calm, openness and a more poetic visual pause.', zh: '如果整条路线需要安静感、舒展感和更有诗意的视觉停顿，桂林是很美的一站。' },
      { en: 'Brings karst riverscapes and classic China imagery into the itinerary without demanding an aggressive pace.', zh: '它能把经典中国山水意象放进路线里，同时又不需要特别强硬的旅行节奏。' },
      { en: 'Works especially well as the scenic counterpoint to Beijing, Shanghai or Xi’an.', zh: '和北京、上海、西安这类城市线搭配时，能形成非常自然的风景反差。' },
      { en: 'Ideal for couples, families and travelers who want beauty, softness and space inside the journey.', zh: '适合希望在旅行里保留美感、柔和感和空间感的情侣、家庭与轻松型客人。' },
    ],
    experiences: [
      { en: 'River scenery, karst peaks and a softer scenic rhythm than major city routes.', zh: '江景、喀斯特峰林，以及相比大城市线路更柔和的风景节奏。' },
      { en: 'A destination that quickly communicates the visual poetry many travelers associate with China.', zh: '它能很快把很多游客心中“像中国山水画一样”的视觉印象讲清楚。' },
      { en: 'A good fit for couples, families and travelers who want beauty without overly intense travel pressure.', zh: '适合情侣、家庭，以及想看美景但又不想把旅程做得太辛苦的人群。' },
    ],
    samplePlan: {
      en: [
        { title: 'Open a softer scenic chapter in Guilin and let the route exhale', description: 'Guilin works best when the itinerary needs space, softness and a slower visual rhythm — the kind of place that helps the journey feel open rather than packed.' },
        { title: 'Let rivers, karst silhouettes and quiet scenery reset the travel mood', description: 'This part of the route is less about intensity and more about release. It gives travelers room to absorb China in a gentler, more atmospheric and more poetic way.' },
        { title: 'Use Guilin as a scenic contrast or as the elegant pause between heavier sections', description: 'Guilin can be the scenic answer to stronger city chapters, or the beautiful pause that keeps the whole route from becoming too dense.' },
      ],
      zh: [
        { title: '把桂林放进路线里，是为了让整段旅行有一段真正舒展的风景章节', description: '桂林很适合出现在城市感较强或节奏较紧的中国线路中，因为它能让旅行松开一点，让客人从“赶路”重新回到“感受”。' },
        { title: '让山水、江景和更安静的节奏重新整理整条路线的情绪', description: '这一段不靠冲击力取胜，而是靠空气感、画面感和舒展感，让旅行重新变得好看、好呼吸。' },
        { title: '可作为风景反差段，也可成为两段较重内容之间的漂亮停顿', description: '桂林既可以成为城市之后的自然答案，也可以作为整条路线里最柔和、最有审美感的留白段。' },
      ],
    },
  },
  zhangjiajie: {
    name: { en: 'Zhangjiajie', zh: '张家界' },
    summary: {
      en: 'Zhangjiajie works best as the high-impact scenic peak of a China itinerary — the chapter that turns a good route into one people remember for years.',
      zh: '张家界最适合作为一条中国路线里的高冲击风景高点：它往往不是“补充的一站”，而是能把整段旅行拉成多年后还记得的那种章节。',
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
      { en: 'A powerful choice when the route needs a true wow-factor rather than a gentle scenic detour.', zh: '如果整条路线需要的是“真正震一下”的风景高点，而不是温和的小插曲，张家界会非常合适。' },
      { en: 'Brings vertical scale, cinematic drama and a sense of visual shock that few destinations can match.', zh: '它能带来高差、电影感和强烈视觉冲击，这种画面密度不是很多目的地能替代的。' },
      { en: 'Works especially well when paired with city-led routes that need one unforgettable natural climax.', zh: '和以城市为主的中国路线搭配时尤其好用，因为它能提供一个难忘的自然高潮段。' },
      { en: 'Ideal for guests who want their itinerary to feel bolder, more scenic and more memorable overall.', zh: '适合希望整条行程更大胆、更出片、更有整体记忆点的客人。' },
    ],
    experiences: [
      { en: 'Towering sandstone pillars, mountain viewpoints and a much more dramatic visual scale than ordinary city routes.', zh: '高耸峰林、山地观景，以及远超普通城市线路的视觉尺度感。' },
      { en: 'A destination that makes a China trip feel more cinematic, adventurous and visually unforgettable.', zh: '它能让一条中国旅行路线变得更电影化、更有冒险感，也更难忘。' },
      { en: 'Best suited to travelers who want stronger scenery rather than soft urban comfort.', zh: '更适合想追求震撼自然景观，而不是柔和都市舒适感的游客。' },
    ],
    samplePlan: {
      en: [
        { title: 'Use Zhangjiajie when the route needs a true scenic climax', description: 'Zhangjiajie works best when a China itinerary needs one chapter that feels undeniably spectacular — not just beautiful, but genuinely high-impact and unforgettable.' },
        { title: 'Let scale, altitude and visual drama create the route’s strongest natural memory', description: 'This is where the journey shifts from impressive to cinematic. The scenery is not background here; it becomes the emotional peak that travelers carry away with them.' },
        { title: 'Place Zhangjiajie where the route needs a wow-factor before it softens or closes', description: 'Used well, Zhangjiajie can become the natural high point that makes the rest of the itinerary feel more balanced, more dynamic and much more memorable.' },
      ],
      zh: [
        { title: '把张家界放进路线里，不是为了“补一个自然点”，而是为了制造真正的高潮', description: '张家界很适合作为整条中国路线里的视觉峰值：它不是简单的景点补充，而是能让客人在很多年后依然记得的一段。' },
        { title: '用高差、电影感和强烈画面感，把旅行拉到最震撼的一层', description: '这一段不只是风景好看，而是会让整条路线突然有了强烈的舞台感和记忆峰值。' },
        { title: '放在合适位置，它会成为整条路线最难被替代的自然高潮段', description: '张家界很适合出现在中后段，作为一记真正拉满情绪的自然高点，然后再让路线慢慢回落。' },
      ],
    },
  },
  xinjiang: {
    name: { en: 'Xinjiang', zh: '新疆' },
    summary: {
      en: 'Xinjiang works best when the goal is not just to visit China, but to travel through it in a way that feels vast, differentiated and emotionally expansive.',
      zh: '如果你想要的不是“去中国看看”，而是真正走进一种开阔、差异化、带着空间感的中国旅行，新疆往往是最能把这件事做出来的地方。',
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
      { en: 'The right choice when the route needs scale, freedom and a sense of genuine distance rather than city-to-city repetition.', zh: '如果整条路线需要尺度感、自由感和真正的远方感，而不是一座又一座城市的重复，新疆会是很对的选择。' },
      { en: 'Brings roads, changing landscapes and emotional openness into the journey in a way few other destinations can.', zh: '它能把“在路上”的变化、地貌切换和情绪上的开阔感带进旅行里，这一点很少有别的目的地能替代。' },
      { en: 'Works as a stand-alone long journey or as the most differentiated chapter inside a larger China itinerary.', zh: '它既可以独立成为一整段重要旅程，也可以作为更大中国线路里最有差异化的一章。' },
      { en: 'Ideal for travelers who want their China route to feel expansive, cinematic and genuinely unlike the standard version.', zh: '适合希望自己的中国路线显得更开阔、更电影化，也更明显区别于常规版本的客人。' },
    ],
    experiences: [
      { en: 'Grasslands, lakes, mountains, desert landscapes and a much stronger sense of distance and scale.', zh: '草原、湖泊、雪山、沙漠，以及更强烈的距离感和尺度感。' },
      { en: 'A destination built around the feeling of being on the road, not just arriving at city landmarks.', zh: '它的核心不只是到达景点，而是“在路上”的过程本身。' },
      { en: 'Best suited to travelers who want a China journey that feels truly different from standard urban sightseeing.', zh: '非常适合希望中国旅行明显区别于常规城市观光的人群。' },
    ],
    samplePlan: {
      en: [
        { title: 'Enter Xinjiang when the route needs openness, distance and a sense of real escape', description: 'Xinjiang works best when the goal is not simply to see another part of China, but to move through a chapter that feels broader, freer and far less standard than the usual itinerary.' },
        { title: 'Let roads, changing terrain and long-form scenery reshape the scale of the trip', description: 'This part of the journey is about space as much as sights. The landscapes change, the rhythm stretches, and the route begins to feel more like travel in the deepest sense than just a sequence of stops.' },
        { title: 'Use Xinjiang as the differentiated journey within the journey', description: 'Whether it stands alone or appears inside a wider China route, Xinjiang works best as the chapter that makes the whole itinerary feel more expansive, cinematic and truly distinct.' },
      ],
      zh: [
        { title: '把新疆放进路线里，是为了让旅行真正出现“远方感”', description: '新疆很适合那些不想只是在中国不同城市之间移动，而是真的想进入一段更开阔、更自由、更不标准化旅程的人。' },
        { title: '让公路线、地貌切换和空间尺度重新定义整段中国旅行', description: '这一段的重点不只是某一个景点，而是随着道路前进，风景、节奏和心情都被一起拉开。' },
        { title: '无论独立成行还是嵌入大线，它都能成为最有差异化的一章', description: '新疆最适合承担整条中国路线里最开阔、最电影化、也最不容易和常规版本混在一起的一段。' },
      ],
    },
  },
};

export function getDestinationContent(slug?: string | null) {
  return destinationContent[(slug || '').toLowerCase()] || null;
}
