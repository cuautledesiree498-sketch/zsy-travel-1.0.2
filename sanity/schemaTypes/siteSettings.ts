const socialLink = {
  name: 'socialLink',
  title: '社交链接',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: '平台',
      type: 'string',
      options: {
        list: [
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'WeChat', value: 'wechat' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'Email', value: 'email' },
          { title: 'Custom', value: 'custom' },
        ],
      },
    },
    { name: 'label', title: '显示名称（双语）', type: 'localizedString', description: '例如 WhatsApp / Follow Us / Email Us' },
    { name: 'url', title: '跳转链接', type: 'string', description: '例如 https://wa.me/... 或 /contact' },
    { name: 'newTab', title: '新窗口打开', type: 'boolean', initialValue: true },
  ],
  preview: {
    select: { title: 'label.en', subtitle: 'url', platform: 'platform' },
    prepare(value: any) {
      return { title: value?.title || value?.platform || '社交链接', subtitle: value?.subtitle || '' }
    },
  },
}

const faqItem = {
  name: 'faqItem',
  title: 'FAQ 项',
  type: 'object',
  fields: [
    { name: 'question', title: '问题（双语）', type: 'localizedString' },
    { name: 'answer', title: '答案（双语）', type: 'localizedText' },
  ],
  preview: {
    select: { title: 'question.en', subtitle: 'question.zh' },
  },
}

const whyItem = {
  name: 'whyItem',
  title: '优势卡片',
  type: 'object',
  fields: [
    { name: 'title', title: '标题（双语）', type: 'localizedString' },
    { name: 'desc', title: '描述（双语）', type: 'localizedText' },
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'title.zh' },
  },
}

export default {
  name: 'siteSettings',
  title: '⚙️ 网站全局设置',
  type: 'document',
  groups: [
    { name: 'branding', title: '1. 品牌信息' },
    { name: 'contact', title: '2. 联系方式' },
    { name: 'navigation', title: '3. 导航与页脚' },
    { name: 'about', title: '4. About 页面' },
    { name: 'contactPage', title: '5. Contact 页面' },
    { name: 'faq', title: '6. FAQ 页面' },
  ],
  fields: [
    {
      name: 'siteTitle',
      title: '网站标题（双语）',
      type: 'localizedString',
      group: 'branding',
      initialValue: { en: 'Infinite Journeys', zh: '无限旅途国际旅游' },
    },
    {
      name: 'siteDescription',
      title: '网站描述（双语）',
      type: 'localizedText',
      group: 'branding',
      initialValue: {
        en: 'Tailor-made luxury travel experiences across China, connecting vast landscapes, iconic skylines and deeper cultural moments.',
        zh: '无限旅途国际旅游专注中国全域高端定制旅行，连接壮阔山河、世界级城市天际线与深度文化体验。',
      },
    },
    { name: 'heroBackground', title: '默认首页背景图', type: 'image', options: { hotspot: true }, group: 'branding', description: '如果首页头图区没有单独上传背景图，就会优先使用这里。' },
    { name: 'contactEmail', title: '联系邮箱', type: 'string', group: 'contact' },
    { name: 'contactPhone', title: '联系电话', type: 'string', group: 'contact' },
    { name: 'whatsappNumber', title: 'WhatsApp 号码', type: 'string', group: 'contact' },
    { name: 'wechat', title: '微信号', type: 'string', group: 'contact' },
    { name: 'address', title: '地址（双语）', type: 'localizedString', group: 'contact' },
    {
      name: 'headerCtaText',
      title: '顶部按钮文字（双语）',
      type: 'localizedString',
      initialValue: { en: 'Tailor My Trip', zh: '定制我的行程' },
      group: 'navigation',
      description: '显示在网站右上角按钮上',
    },
    {
      name: 'headerCtaLink',
      title: '顶部按钮跳转',
      type: 'string',
      initialValue: '/contact',
      group: 'navigation',
      description: '例如 /contact 或 https://...',
    },
    {
      name: 'footerIntro',
      title: '页脚简介（双语）',
      type: 'localizedText',
      rows: 3,
      group: 'navigation',
      description: '显示在页脚左侧的网站介绍文案',
      initialValue: {
        en: 'Infinite Journeys focuses on premium tailor-made travel across China, from mountain landscapes to urban skylines, for travelers who need a more thoughtful and flexible journey design.',
        zh: '无限旅途国际旅游专注中国全域高端定制旅行，从山河风景到城市天际线，为全球旅客提供更灵活、更省心的深度旅行体验。',
      },
    },
    {
      name: 'socialLinks',
      title: '社交 / 客服链接',
      type: 'array',
      of: [{ type: 'socialLink' }],
      options: { sortable: true },
      group: 'navigation',
      description: '可拖动排序，例如 WhatsApp、Instagram、Email 等',
    },

    { name: 'aboutHeroTitle', title: 'About 首屏标题（双语）', type: 'localizedString', group: 'about', initialValue: { en: 'A more refined way to experience China.', zh: '一种更克制、更高级的中国旅行方式。' } },
    { name: 'aboutHeroSubtitle', title: 'About 首屏副标题（双语）', type: 'localizedText', group: 'about', initialValue: { en: 'We focus on tailor-made China journeys that combine cities, culture, landscapes and a more elevated standard of travel support.', zh: '无限旅途国际旅游专注中国全域高端定制旅行，结合城市地标、文化深度、自然山河与更高标准的服务体验。' } },
    { name: 'aboutIntroTitle', title: 'About 介绍标题（双语）', type: 'localizedString', group: 'about', initialValue: { en: 'We design China journeys around people, not templates.', zh: '我们围绕人来设计旅程，而不是套用模板。' } },
    { name: 'aboutIntroBody', title: 'About 介绍正文（双语）', type: 'localizedText', group: 'about', initialValue: { en: 'Our work is not simply to arrange hotels and transport. We shape pace, destination logic, travel style and service expectations into a China journey that actually fits the traveler.\n\nFrom Beijing, Shanghai and Shenzhen to Xi’an, Sichuan and Xinjiang, we care less about selling one fixed route and more about combining places into a coherent premium experience.\n\nDifferent travelers need different planning logic: executive efficiency, family comfort, photography focus, cultural depth or private high-end pacing all require different solutions.', zh: '我们的工作不只是帮客户订酒店和交通，更是把旅行节奏、目的地组合、风格偏好与服务体验整合成一条真正适合客户的中国定制路线。\n\n从北京、上海、深圳的城市天际线，到西安、四川与新疆的人文和自然高光，我们更关注“怎样把这些体验组合成一段完整且高级的旅程”。\n\n我们理解，不同客群的需求并不一样：有人看重商务效率，有人重视亲子体验，有人更在意摄影、人文或深度在地内容。因此我们的核心不是卖固定产品，而是围绕不同人群设计不同的定制方案。' } },
    { name: 'aboutPositioningTitle', title: 'About 定位标题（双语）', type: 'localizedString', group: 'about', initialValue: { en: 'Our Positioning', zh: '我们的定位' } },
    { name: 'aboutPositioningItems', title: 'About 定位列表（双语）', type: 'array', group: 'about', of: [{ type: 'localizedString' }], initialValue: [
      { en: 'Tailor-made first: itineraries shaped around travel goals, pace and style.', zh: '定制优先：围绕旅行目标、节奏与风格设计行程。' },
      { en: 'China-wide scope: city landmarks, mountain landscapes, culture and heritage routes.', zh: '中国全域：覆盖城市地标、山河景观、人文与历史线路。' },
      { en: 'Premium experience: stronger attention to detail, comfort and curation.', zh: '高端体验：更重视细节、舒适度与策划质感。' },
      { en: 'People-specific solutions: family, private, executive, cultural and mixed-purpose travel.', zh: '按人群定制：可支持家庭、私享、商务、人文及复合型出行。' },
    ] },
    { name: 'aboutWhyTitle', title: 'About 优势标题（双语）', type: 'localizedString', group: 'about', initialValue: { en: 'A clearer, calmer and more polished planning experience.', zh: '更清晰、更从容、更有质感的策划体验。' } },
    { name: 'aboutWhyItems', title: 'About 优势卡片（双语）', type: 'array', group: 'about', of: [{ type: 'whyItem' }], initialValue: [
      { title: { en: 'Strategic itinerary design', zh: '路线策划逻辑更完整' }, desc: { en: 'We align destinations, pace and route logic into one coherent trip.', zh: '把目的地、节奏与动线整合成一段逻辑完整的旅程。' } },
      { title: { en: 'Premium communication', zh: '沟通与服务更高级' }, desc: { en: 'Travelers get clearer guidance, stronger structure and fewer surprises.', zh: '让客户获得更清晰的沟通、更完整的结构和更少的不确定性。' } },
      { title: { en: 'People-specific customization', zh: '按人群做真正定制' }, desc: { en: 'Family trips, executive travel, cultural depth and private journeys all need different planning logic.', zh: '家庭、商务、人文深度与私享出行，都需要不同的规划方式。' } },
      { title: { en: 'China destination understanding', zh: '对中国目的地理解更系统' }, desc: { en: 'We connect mountains, cities and heritage into journeys that feel intentional.', zh: '把山河、城市与文化遗产组合成更有目的性与完整感的路线。' } },
    ] },
    { name: 'aboutCtaTitle', title: 'About 底部标题（双语）', type: 'localizedString', group: 'about', initialValue: { en: 'Tell us what kind of China journey you want to create.', zh: '告诉我们，你想开启怎样的一段中国旅程。' } },
    { name: 'aboutCtaSubtitle', title: 'About 底部说明（双语）', type: 'localizedText', group: 'about', initialValue: { en: 'Whether you are planning a luxury holiday, family trip, executive visit or a themed cultural route, we can help shape a more suitable tailor-made China plan.', zh: '无论你想做高端度假、家庭旅行、企业考察、商务接待，还是更有主题的人文路线，我们都可以从需求出发帮你梳理合适的中国定制方案。' } },

    { name: 'contactHeroTitle', title: 'Contact 首屏标题（双语）', type: 'localizedString', group: 'contactPage', initialValue: { en: 'Let’s plan a more refined journey across China.', zh: '一起规划一段更有质感的中国旅程。' } },
    { name: 'contactHeroSubtitle', title: 'Contact 首屏副标题（双语）', type: 'localizedText', group: 'contactPage', initialValue: { en: 'Tell us your travel dates, destination ideas, traveler type and experience expectations, and we can shape a more suitable China solution for you.', zh: '告诉我们你的出行时间、目的地偏好、同行人群与体验预期，我们可以基于不同客群特点，为你设计更合适的中国定制方案。' } },
    { name: 'contactGuideTitle', title: 'Contact 咨询说明标题（双语）', type: 'localizedString', group: 'contactPage', initialValue: { en: 'What to send us for a faster proposal', zh: '为了更快给你方案，建议先提供这些信息' } },
    { name: 'contactGuideItems', title: 'Contact 咨询说明列表（双语）', type: 'array', group: 'contactPage', of: [{ type: 'localizedString' }], initialValue: [
      { en: 'Travel time: preferred dates or month range.', zh: '出行时间：预计出发日期或月份范围。' },
      { en: 'Destination ideas: Beijing, Shanghai, Xinjiang, Chengdu, Chongqing or multi-city combinations.', zh: '意向目的地：例如北京、上海、新疆、成都、重庆或多城组合。' },
      { en: 'Traveler type: couple, family, private small group, executive delegation or mixed-purpose travel.', zh: '同行人群：情侣、家庭、小团、商务代表团或复合型出行。' },
      { en: 'Style expectations: luxury, culture, nature, comfort-first, photography, business + leisure, etc.', zh: '风格偏好：高端、文化、自然、舒适优先、摄影、商务+休闲等。' },
      { en: 'Budget range: an approximate range helps us propose more relevant options efficiently.', zh: '预算范围：给一个大致区间，能更高效地匹配方案。' },
    ] },
    { name: 'contactStatusNote', title: 'Contact 状态说明（双语）', type: 'localizedText', group: 'contactPage', initialValue: { en: 'This page already works as a branded consultation entry. If needed later, we can connect a real inquiry form, email workflow, WhatsApp jump or CRM.', zh: '当前页面已适合作为品牌展示与初步咨询入口。后续如需真实询盘表单，我可以继续接入邮件、数据库、WhatsApp 跳转或 CRM。' } },
    { name: 'contactCtaTitle', title: 'Contact 底部标题（双语）', type: 'localizedString', group: 'contactPage', initialValue: { en: 'We can begin with a simple message and shape the rest with you.', zh: '先从一条简单消息开始，其余部分我们可以一起完善。' } },
    { name: 'contactCtaSubtitle', title: 'Contact 底部说明（双语）', type: 'localizedText', group: 'contactPage', initialValue: { en: 'If you are not sure where to begin, just tell us your ideal month, intended destinations and traveler type. We can help clarify the direction step by step.', zh: '如果你还不确定从哪里开始，只需要告诉我们大致出行月份、意向目的地和同行人群，我们可以帮你一步步明确更适合的定制方向。' } },

    { name: 'faqTitle', title: 'FAQ 页面标题（双语）', type: 'localizedString', initialValue: { en: 'Frequently Asked Questions', zh: '常见问题' }, group: 'faq' },
    { name: 'faqSubtitle', title: 'FAQ 页面副标题（双语）', type: 'localizedText', initialValue: { en: 'Find answers to common questions about our tailor-made China journeys, booking process, and travel planning support.', zh: '这里整理了关于中国高端定制旅行、咨询流程与服务方式的常见问题。' }, group: 'faq' },
    { name: 'faqCtaTitle', title: 'FAQ 底部标题（双语）', type: 'localizedString', group: 'faq', initialValue: { en: 'Still deciding what kind of trip fits you best?', zh: '还在判断哪种旅程更适合你吗？' } },
    { name: 'faqCtaSubtitle', title: 'FAQ 底部说明（双语）', type: 'localizedText', group: 'faq', initialValue: { en: 'Whether you are planning family travel, executive travel, private journeys or a culture-focused route, we can help translate your ideas into a clearer tailor-made China plan.', zh: '无论你在考虑家庭出行、商务接待、私人旅行还是人文主题路线，我们都可以帮助你把想法整理成更清晰的中国定制方案。' } },
    {
      name: 'faqItems',
      title: 'FAQ 列表',
      type: 'array',
      of: [{ type: 'faqItem' }],
      options: { sortable: true },
      group: 'faq',
      description: '可拖动排序，排在前面的会优先显示。',
      initialValue: [
        { question: { en: 'What kind of travel services do you offer?', zh: '你们主要做哪些旅游产品？' }, answer: { en: 'We offer group tours, educational tours, private tailor-made trips, and corporate travel solutions across destinations such as Beijing, Shanghai, Shenzhen, Chongqing, Chengdu, Shaanxi, Xinjiang, and more.', zh: '我们主要提供团队游、研学游、个人定制和企业定制服务，覆盖北京、上海、深圳、重庆、成都、陕西、新疆以及更多中国目的地。' } },
        { question: { en: 'Do you offer fixed itineraries or custom trips?', zh: '你们是做固定行程，还是可以定制？' }, answer: { en: 'We offer both. We can provide sample itineraries for reference, and we can also customize a trip based on your schedule, group size, budget, and interests.', zh: '两种都可以。我们既可以提供参考行程，也可以根据你的时间、人数、预算和兴趣进行专属定制。' } },
        { question: { en: 'Who is the 20-day China trip suitable for?', zh: '你们的中国20天行程适合哪些人？' }, answer: { en: 'This journey is ideal for travelers who want a deeper experience of China and have enough time to visit several representative destinations in one trip.', zh: '这类行程适合希望深入体验中国、并且希望在一个较完整时间内游览多个代表性目的地的旅行者。' } },
        { question: { en: 'What is the difference between group tours and private tailor-made trips?', zh: '团队游和个人定制有什么区别？' }, answer: { en: 'Group tours are designed for coordinated travel with better efficiency and value, while private tailor-made trips are more flexible and better suited for families, couples, or travelers with special requests.', zh: '团队游适合多人统一出行，重视整体安排和性价比；个人定制更灵活，更适合家庭、情侣或有特殊需求的客人。' } },
        { question: { en: 'How are educational tours arranged?', zh: '研学游可以怎么安排？' }, answer: { en: 'We can design educational programs for schools, institutions, or youth groups that combine travel, learning, and hands-on experience.', zh: '我们可以根据学校、机构或青少年团队的目标设计研学内容，将旅行、学习与体验结合起来。' } },
        { question: { en: 'What is corporate travel suitable for?', zh: '企业定制适合哪些场景？' }, answer: { en: 'Corporate travel is suitable for business hosting, client visits, team trips, incentive travel, and brand events.', zh: '企业定制适合商务接待、客户拜访、团队出行、奖励旅行和品牌活动等场景。' } },
        { question: { en: 'How early should I contact you?', zh: '我应该提前多久咨询？' }, answer: { en: 'We recommend reaching out as early as possible, especially for peak travel seasons, group trips, or multi-city itineraries, so we can secure better arrangements and optimize the route.', zh: '建议尽早咨询，尤其是计划高峰季、多人出行或需要多城市连线行程时，这样更方便安排资源并优化路线。' } },
        { question: { en: 'Do you support English communication?', zh: '你们支持英文沟通吗？' }, answer: { en: 'Yes. Our website and service process are designed for both Chinese and English users, making communication easier for overseas travelers and international clients.', zh: '支持。我们的网站和服务流程都面向中英双语用户，方便海外游客和国际客户沟通。' } },
        { question: { en: 'Can the itinerary be adjusted during the trip?', zh: '行程可以中途调整吗？' }, answer: { en: 'It depends on the situation. We do our best to make the itinerary clear before departure, and if special needs arise during the trip, adjustments can be discussed.', zh: '视具体情况而定。出行前我们会尽量把行程设计清楚；如果旅途中出现特殊需求，也可以协商调整。' } },
        { question: { en: 'How can I start an inquiry?', zh: '如何开始咨询？' }, answer: { en: 'Simply share your travel dates, group size, destination, budget, and travel type, and we can start preparing an initial proposal for you.', zh: '你只需要告诉我们出行时间、人数、目的地、预算和旅行类型，我们就可以开始为你做初步方案。' } },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: '网站全局设置', subtitle: '统一管理导航、页脚、联系方式、About / Contact / FAQ' }
    },
  },
}

export const siteSettingObjects = [socialLink, faqItem, whyItem]
