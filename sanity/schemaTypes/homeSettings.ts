export default {
  name: 'homeSettings',
  title: '🏠 首页搭积木配置',
  type: 'document',
  groups: [
    { name: 'basic', title: '基础信息 / Basics' },
    { name: 'sections', title: '首页模块 / Home sections' },
    { name: 'guide', title: '使用说明 / Guide' },
  ],
  fields: [
    {
      name: 'pageTitle',
      title: '页面名称 / Page name',
      type: 'string',
      initialValue: '首页配置 / Home settings',
      readOnly: true,
      group: 'basic',
    },
    {
      name: 'editorGuide',
      title: '小白操作说明 / Editor guide',
      type: 'text',
      rows: 18,
      readOnly: true,
      group: 'guide',
      initialValue: '首页编辑建议顺序 / Recommended editing order：\n1. 先拖动“首页模块列表”调整顺序 / Reorder sections by drag-and-drop\n2. 再点开每个模块改标题、副标题、图片、视频、按钮 / Edit title, subtitle, image, video and buttons inside each section\n3. 首页首屏可以直接换背景图，或者填背景视频链接 / Hero supports background image or video URL\n4. 目的地卡片、服务入口卡片、人群方案卡片都支持直接在后台改图和文字 / Destination, service and audience cards are editable in CMS\n5. 跳转链接尽量优先使用下拉选择，不要乱填自定义链接 / Prefer dropdown link targets when possible\n6. 如果暂时不想显示某一块，关闭“显示这个模块”即可 / Toggle section visibility when needed\n7. 修改完成后记得发布（Publish） / Remember to publish after editing\n\n推荐首页顺序 / Recommended home order：\n首页头图区 Hero → 卖点图标区 Service values → 按人群定制方案区 Audience solutions → 目的地卡片区 Destinations → 案例 / 灵感区 Case inspirations → 数据统计区 Stats → 用户评价区 Testimonials → FAQ 预览区 FAQ preview → 底部 CTA',
    },
    {
      name: 'sections',
      title: '首页模块列表 / Home sections',
      type: 'array',
      group: 'sections',
      description: '像搭积木一样添加、排序首页模块。拖动顺序即可调整首页上下顺序。',
      of: [
        { type: 'heroSection' },
        { type: 'featureIconsSection' },
        { type: 'audienceSolutionsSection' },
        { type: 'destinationCardsSection' },
        { type: 'tourListSection' },
        { type: 'statsSection' },
        { type: 'testimonialsSection' },
        { type: 'articleListSection' },
        { type: 'faqPreviewSection' },
        { type: 'ctaSection' },
      ],
      options: { sortable: true },
      initialValue: [
        {
          _type: 'heroSection',
          title: { en: 'Explore China in 20 Days, from Major Cities to Western Landscapes', zh: '20天玩转中国，深度体验北京、上海、深圳、重庆、成都、陕西、新疆及更多目的地' },
          subtitle: { en: 'We focus on China and provide group tours, educational tours, private tailor-made trips, and corporate travel solutions for different needs, creating a more complete and refined travel experience.', zh: '我们以中国为重点，提供团队游、研学游、个人定制与企业定制服务，为不同需求打造更完整、更高品质的中国旅行体验。' },
          primaryButtonText: { en: 'Plan My Trip', zh: '立即定制行程' },
          primaryButtonTarget: '/contact',
          secondaryButtonText: { en: 'Explore the 20-Day China Journey', zh: '查看20天中国行程' },
          secondaryButtonTarget: '#case-inspirations',
          backgroundVideoUrl: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-mountains-1562142401487?download=1080p',
        },
        {
          _type: 'featureIconsSection',
          title: { en: 'Why Travel With Us', zh: '为什么选择我们' },
          subtitle: { en: 'We do more than single-destination tours. Our journeys are designed around China’s breadth, travel efficiency, and experience quality.', zh: '我们不只做单一目的地，而是围绕中国全景、行程效率与体验质量，设计更适合你的出行方案。' },
          anchorId: 'travel-styles',
          items: [
            { title: { en: 'True Tailor-Made Travel', zh: '真正的定制旅行' }, description: { en: 'Every itinerary is built around your schedule, interests, and budget — not copied from a fixed template.', zh: '根据你的时间、兴趣与预算设计行程，而不是套用固定模板。' }, iconType: 'preset', presetIcon: 'map', linkText: { en: 'Plan With Us', zh: '咨询定制' }, linkTarget: '/contact' },
            { title: { en: 'Nationwide China Coverage', zh: '中国全境覆盖' }, description: { en: 'From major cities to western landscapes, from modern skylines to historic cultural destinations, we offer a broad range of China travel options.', zh: '从一线城市到西部风光，从现代都市到人文古城，提供更丰富的中国旅行选择。' }, iconType: 'preset', presetIcon: 'compass', linkText: { en: 'Explore China', zh: '查看方向' }, linkTarget: '#destinations' },
            { title: { en: 'Four Core Service Types', zh: '四大业务方向' }, description: { en: 'Group tours, educational tours, private tailor-made trips, and corporate travel solutions cover different audiences, budgets, and travel goals.', zh: '团队游、研学游、个人定制与企业定制并行，满足不同人群、预算与出行目标。' }, iconType: 'preset', presetIcon: 'star', linkText: { en: 'See Services', zh: '查看服务' }, linkTarget: '#audience-solutions' },
            { title: { en: 'Designed for International Travelers', zh: '更适合海外游客' }, description: { en: 'Clearer itineraries, smoother service flow, and more efficient communication reduce cross-language and cross-cultural friction.', zh: '行程表达更清晰，服务流程更顺畅，沟通更高效，降低跨语言与跨文化沟通成本。' }, iconType: 'preset', presetIcon: 'chat', linkText: { en: 'Talk to Us', zh: '联系我们' }, linkTarget: '/contact' },
            { title: { en: 'Flexible Planning with Professional Support', zh: '灵活定制与专业支持' }, description: { en: 'Trips can be adjusted based on time, interests, and group needs to deliver a better-fit travel solution.', zh: '可根据时间、兴趣和团队需求进行调整，获得更合适的旅行方案。' }, iconType: 'preset', presetIcon: 'shield', linkText: { en: 'Start Planning', zh: '开始规划' }, linkTarget: '/contact' }
          ]
        },
        {
          _type: 'audienceSolutionsSection',
          title: { en: 'Our Four Core Service Types', zh: '我们的四大业务方向' },
          subtitle: { en: 'Whether you are planning a group trip, an educational journey, a private tour, or corporate hosting, we can build the right solution for you.', zh: '不论是团队出行、学习交流，还是私人旅行与企业接待，我们都能提供对应方案。' },
          items: [
            { title: { en: 'Group Tours', zh: '团队游' }, description: { en: 'Ideal for larger parties that value organized planning, good value, and travel efficiency.', zh: '适合多人同行，注重整体安排、性价比与出行效率。' }, iconType: 'preset', presetIcon: 'map', linkText: { en: 'Explore Group Travel', zh: '查看团队游' }, linkTarget: '/contact' },
            { title: { en: 'Educational Tours', zh: '研学游' }, description: { en: 'Designed for schools, institutions, and youth groups with an emphasis on learning, experience, and program design.', zh: '面向学校、机构与青少年群体，强调学习、体验与内容设计。' }, iconType: 'preset', presetIcon: 'star', linkText: { en: 'Explore Educational Trips', zh: '查看研学游' }, linkTarget: '/contact' },
            { title: { en: 'Private Tailor-Made Trips', zh: '个人定制' }, description: { en: 'For solo travelers, couples, and families seeking a more flexible and private travel experience.', zh: '面向个人、情侣与家庭，提供更灵活、更私密的专属行程。' }, iconType: 'preset', presetIcon: 'heart', linkText: { en: 'Tailor My Trip', zh: '定制行程' }, linkTarget: '/contact' },
            { title: { en: 'Corporate Travel Solutions', zh: '企业定制' }, description: { en: 'For business hosting, team building, client visits, and premium corporate travel needs.', zh: '适合商务接待、企业团建、客户拜访与高端接待需求。' }, iconType: 'preset', presetIcon: 'shield', linkText: { en: 'Discuss Corporate Needs', zh: '沟通企业需求' }, linkTarget: '/contact' }
          ]
        },
        {
          _type: 'destinationCardsSection',
          title: { en: 'Explore China Through Its Destinations', zh: '探索中国代表性目的地' },
          subtitle: { en: 'From major cities to western landscapes, from modern skylines to cultural heartlands, we can shape different destination combinations into a more complete China journey.', zh: '从一线城市到西部风光，从现代都市到人文腹地，我们可以把不同目的地组合成更完整的中国旅程。' },
          items: [
            { title: { en: 'Beijing', zh: '北京' }, description: { en: 'Imperial landmarks, heritage depth and a capital-city rhythm with ceremony and scale.', zh: '皇城地标、人文深度与首都城市节奏兼具。' }, iconType: 'preset', presetIcon: 'star', linkTarget: '/contact' },
            { title: { en: 'Shanghai', zh: '上海' }, description: { en: 'Global skyline, design-led urban life and polished premium city moments.', zh: '国际化天际线、都市生活方式与更现代的高端感。' }, iconType: 'preset', presetIcon: 'plane', linkTarget: '/contact' },
            { title: { en: 'Shenzhen', zh: '深圳' }, description: { en: 'Modern energy, innovation and smooth combinations of business and leisure.', zh: '现代活力、创新城市气质，适合商务与休闲结合。' }, iconType: 'preset', presetIcon: 'shield', linkTarget: '/contact' },
            { title: { en: 'Chengdu', zh: '成都' }, description: { en: 'A slower premium pace with food culture, tea houses and softer urban texture.', zh: '更从容的高品质慢旅行氛围，适合美食与在地生活体验。' }, iconType: 'preset', presetIcon: 'heart', linkTarget: '/contact' },
            { title: { en: 'Xinjiang', zh: '新疆' }, description: { en: 'Vast mountains, lakes and long-form scenic journeys with frontier character.', zh: '山河尺度大、风景跨度广，适合长线深度与自然体验。' }, iconType: 'preset', presetIcon: 'mountain', linkTarget: '/contact' },
            { title: { en: 'Shaanxi', zh: '陕西' }, description: { en: 'Ancient capital heritage and Silk Road depth for travelers drawn to history and culture.', zh: '古都人文与丝路历史兼具，适合历史文化主题。' }, iconType: 'preset', presetIcon: 'camera', linkTarget: '/contact' }
          ]
        },
        {
          _type: 'tourListSection',
          title: { en: '20-Day China Journey Inspiration', zh: '20天中国行程灵感参考' },
          subtitle: { en: 'Use this featured case as inspiration for a broader China journey covering iconic cities, cultural destinations, and western landscapes.', zh: '你可以把这条精选案例作为灵感，了解如何把代表性城市、文化目的地与西部风景组合成一条更完整的中国旅程。' },
          sourceMode: 'auto',
          maxItems: 6,
          viewMoreText: { en: 'Get a Custom Plan', zh: '获取专属方案' },
          viewMoreTarget: '/contact'
        },
        {
          _type: 'statsSection',
          title: { en: 'What Defines Our Travel Experience', zh: '我们的旅行体验核心' },
          subtitle: { en: 'What matters is not only where you go, but how the journey is planned, explained, and delivered around your actual needs.', zh: '真正重要的不只是去哪里，而是整段旅程如何围绕你的真实需求被规划、表达与执行。' },
          items: [
            { number: { en: 'Tailor-Made', zh: '定制' }, label: { en: 'Designed around different traveler needs', zh: '围绕不同客群需求设计' } },
            { number: { en: 'China-Wide', zh: '全域' }, label: { en: 'Coverage across major China destinations', zh: '覆盖中国主要目的地' } },
            { number: { en: 'Premium', zh: '高品质' }, label: { en: 'A more refined travel experience', zh: '更完整、更高品质的体验' } },
            { number: { en: 'Bilingual', zh: '双语' }, label: { en: 'Clearer communication for international travelers', zh: '更适合海外游客沟通理解' } }
          ]
        },
        {
          _type: 'testimonialsSection',
          title: { en: 'What Travelers Value Most', zh: '旅行者最看重的体验' },
          subtitle: { en: 'These sample comments reflect the kind of experience we aim to deliver: clearer planning, smoother service, and a trip that feels better matched to the traveler.', zh: '这些展示型评价主要体现我们希望带来的体验：更清晰的规划、更顺畅的服务，以及更贴合客人的行程设计。' },
          items: [
            { name: 'Anna', country: 'UK', quote: { en: 'The trip felt much more tailored than a normal package, with a better balance between landmark highlights and our personal rhythm.', zh: '这次旅行比普通旅游产品更像是专门为我们设计的，地标体验和节奏都更适合我们。' }, rating: 5 },
            { name: 'Michael', country: 'Singapore', quote: { en: 'What impressed me most was not just the destinations, but how clearly the plan matched our business schedule and comfort expectations.', zh: '最打动我的不只是目的地本身，而是整个计划非常贴合我们的商务节奏和舒适度要求。' }, rating: 5 },
            { name: 'Sofia', country: 'Spain', quote: { en: 'It felt less like buying a tour and more like shaping a private travel concept around our interests.', zh: '这更像是在围绕我们的兴趣打造一段私人旅行概念，而不是简单购买一条线路。' }, rating: 5 }
          ]
        },
        {
          _type: 'articleListSection',
          title: { en: 'Travel Insights and Inspiration', zh: '旅行灵感与策划建议' },
          subtitle: { en: 'These articles are here to help you explore destination ideas, planning logic, and different ways to understand a tailor-made journey in China.', zh: '这些内容用于帮助你了解目的地灵感、规划思路，以及中国定制旅行可以如何展开。' },
          sourceMode: 'auto',
          maxItems: 3,
          viewMoreText: { en: 'Explore More Insights', zh: '查看更多灵感' },
          viewMoreTarget: '/contact'
        },
        {
          _type: 'faqPreviewSection',
          title: { en: 'Frequently Asked Questions', zh: '常见问题' },
          subtitle: { en: 'Before reaching out, take a quick look at the most common questions about our services, planning process, and China travel arrangements.', zh: '在联系我们之前，你可以先快速了解关于服务内容、规划流程与中国旅行安排的常见问题。' },
          maxItems: 4,
          viewMoreText: { en: 'View All FAQ', zh: '查看全部 FAQ' },
          viewMoreTarget: '/faq'
        },
        {
          _type: 'ctaSection',
          title: { en: 'Start Your Deep Journey Across China', zh: '开启你的中国深度之旅' },
          subtitle: { en: 'Share your schedule, group size, and travel needs, and we will create the most suitable itinerary for you.', zh: '告诉我们你的时间、人数与需求，我们将为你设计最合适的中国行程。' },
          primaryButtonText: { en: 'Get a Custom Plan', zh: '获取专属方案' },
          primaryButtonTarget: '/contact',
          secondaryButtonText: { en: 'Contact Us', zh: '联系我们' },
          secondaryButtonTarget: '/contact'
        }
      ]
    },
  ],
  preview: {
    select: { title: 'pageTitle' },
    prepare(value: any) {
      return { title: value?.title || '首页配置', subtitle: '首页模块搭积木管理' }
    },
  },
}
