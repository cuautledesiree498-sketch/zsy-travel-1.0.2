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
          title: { en: 'Private China journeys shaped around people, pace and purpose.', zh: '围绕人、节奏与需求设计的中国高端定制旅程。' },
          subtitle: { en: 'Infinite Journeys creates tailor-made travel solutions across China, connecting mountain landscapes, iconic skylines, culture and premium service into one more refined journey.', zh: '无限旅途国际旅游提供中国全域高端定制方案，把山河风景、城市天际线、人文深度与高标准服务整合成更完整的一段旅程。' },
          primaryButtonText: { en: 'Explore Destinations', zh: '探索目的地' },
          primaryButtonTarget: '#destinations',
          secondaryButtonText: { en: 'Tailor My Journey', zh: '定制我的旅程' },
          secondaryButtonTarget: '/contact',
          backgroundVideoUrl: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-mountains-1562142401487?download=1080p',
        },
        {
          _type: 'featureIconsSection',
          title: { en: 'High-end travel designed around how you actually travel.', zh: '围绕真实出行需求来设计的高端旅行。' },
          subtitle: { en: 'We are not focused on fixed group packages. Our strength is shaping people-specific China journeys for different travel goals, styles and expectations.', zh: '我们不以固定跟团产品为核心，而是更擅长根据不同客户类型、节奏与预期，设计真正适合的中国定制方案。' },
          anchorId: 'travel-styles',
          items: [
            { title: { en: 'Tailor-Made Planning', zh: '定制策划' }, description: { en: 'Every route is shaped around real travel goals instead of copied from a standard package.', zh: '每条路线都围绕真实需求设计，而不是复制标准产品。' }, iconType: 'preset', presetIcon: 'map', linkText: { en: 'Learn More', zh: '了解更多' }, linkTarget: '/contact' },
            { title: { en: 'Luxury Family Travel', zh: '高端家庭旅行' }, description: { en: 'Designed for families, multi-generation groups and comfort-first private journeys.', zh: '适合亲子家庭、多代同行和更重视舒适度的出行。' }, iconType: 'preset', presetIcon: 'heart', linkText: { en: 'Customize', zh: '定制咨询' }, linkTarget: '/contact' },
            { title: { en: 'Executive & Business', zh: '商务与企业出行' }, description: { en: 'Well-structured planning for executive visits, incentive groups and business travel.', zh: '适合商务接待、企业团组和更讲求结构化安排的出行。' }, iconType: 'preset', presetIcon: 'shield', linkText: { en: 'Contact Us', zh: '联系我们' }, linkTarget: '/contact' },
            { title: { en: 'Culture & Heritage', zh: '人文与文化深度' }, description: { en: 'For travelers who want more depth, context and meaningful local experiences.', zh: '适合想要更深入人文体验和在地内容的客户。' }, iconType: 'preset', presetIcon: 'star', linkText: { en: 'Explore', zh: '查看灵感' }, linkTarget: '/contact' },
            { title: { en: '1-to-1 Concierge', zh: '一对一服务' }, description: { en: 'From the first conversation to in-trip support, the service stays personal and refined.', zh: '从前期沟通到落地执行，始终保持更细致的一对一服务。' }, iconType: 'preset', presetIcon: 'chat', linkText: { en: 'Start Planning', zh: '开始规划' }, linkTarget: '/contact' }
          ]
        },
        {
          _type: 'audienceSolutionsSection',
          title: { en: 'Tailor-made solutions for different traveler types.', zh: '针对不同客群的中国定制方案。' },
          subtitle: { en: 'Different travelers need different routes, pacing and service logic. We do not push the same itinerary to everyone.', zh: '不同客群，对路线、节奏与服务逻辑的要求不同。我们不会把同一条路线卖给所有人。' },
          items: [
            { title: { en: 'Couples & Honeymoon', zh: '情侣与蜜月' }, description: { en: 'Romantic city stays, scenic landscapes and a slower rhythm designed for two.', zh: '适合情侣、纪念日和蜜月场景，强调风景、氛围与节奏感。' }, iconType: 'preset', presetIcon: 'heart', linkText: { en: 'Tailor This Style', zh: '定制这一类' }, linkTarget: '/contact' },
            { title: { en: 'Family Travel', zh: '家庭出行' }, description: { en: 'Comfort, safety, rhythm and family-friendly experiences arranged together.', zh: '更重视舒适、安全、节奏控制和适合家庭的体验组合。' }, iconType: 'preset', presetIcon: 'shield', linkText: { en: 'Plan for Family', zh: '家庭方案' }, linkTarget: '/contact' },
            { title: { en: 'Executive Travel', zh: '商务高端出行' }, description: { en: 'Business efficiency combined with hospitality and local depth when needed.', zh: '商务效率与高标准接待并重，必要时兼顾在地深度体验。' }, iconType: 'preset', presetIcon: 'plane', linkText: { en: 'Discuss Needs', zh: '沟通需求' }, linkTarget: '/contact' },
            { title: { en: 'Education & Study Trips', zh: '教育与研学' }, description: { en: 'Structured planning for school groups, institutions and learning-focused journeys.', zh: '适合学校、机构和更强调学习目标的组织型出行。' }, iconType: 'preset', presetIcon: 'star', linkText: { en: 'Learn More', zh: '了解更多' }, linkTarget: '/contact' },
            { title: { en: 'VIP Private Journeys', zh: '私人高端定制' }, description: { en: 'For travelers seeking privacy, curation and elevated service standards.', zh: '适合更重视私密性、策划质感和高标准服务的旅客。' }, iconType: 'preset', presetIcon: 'compass', linkText: { en: 'Private Planning', zh: '私人定制' }, linkTarget: '/contact' }
          ]
        },
        {
          _type: 'destinationCardsSection',
          title: { en: 'Explore China through destinations and travel moods.', zh: '从目的地与旅行气质，开启你的中国定制旅程。' },
          subtitle: { en: 'From skyline cities to western frontiers, these places can be shaped into very different experiences depending on traveler type, pace and purpose.', zh: '从城市天际线到边疆山河，不同目的地会因为客群、节奏与需求不同，而被设计成完全不同的体验。' },
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
          title: { en: 'Sample cases and inspiration references.', zh: '案例参考与灵感路线。' },
          subtitle: { en: 'These are inspiration examples, not the only products we sell. They help show how different traveler needs can turn into different China journeys.', zh: '这些内容更适合作为灵感案例，而不是固定产品清单，用来帮助理解不同需求如何转化成不同的中国定制方案。' },
          sourceMode: 'auto',
          maxItems: 6,
          viewMoreText: { en: 'Discuss Your Own Plan', zh: '沟通你的定制方案' },
          viewMoreTarget: '/contact'
        },
        {
          _type: 'statsSection',
          title: { en: 'Why travelers choose Infinite Journeys.', zh: '为什么选择无限旅途。' },
          subtitle: { en: 'The value is not just where you go, but how the journey is designed around your people, pace and expectations.', zh: '我们真正提供的价值，不只是去哪里，而是如何围绕你的客群、节奏与预期来设计这段旅程。' },
          items: [
            { number: { en: 'Tailor-Made', zh: '定制' }, label: { en: 'People-specific journey design', zh: '围绕不同客群做设计' } },
            { number: { en: 'China-Wide', zh: '全域' }, label: { en: 'Coverage across China destinations', zh: '覆盖中国全域目的地' } },
            { number: { en: 'Premium', zh: '高端' }, label: { en: 'More refined travel positioning', zh: '更高标准的体验感' } },
            { number: { en: '1-to-1', zh: '一对一' }, label: { en: 'Dedicated planning and support', zh: '专属沟通与服务支持' } }
          ]
        },
        {
          _type: 'testimonialsSection',
          title: { en: 'What travelers appreciate most.', zh: '客户最看重的体验。' },
          subtitle: { en: 'Placeholder testimonials for now. These can be replaced with real feedback later from the CMS.', zh: '这里目前是展示型评价，后续可在后台替换成真实客户反馈。' },
          items: [
            { name: 'Anna', country: 'UK', quote: { en: 'The trip felt much more tailored than a normal package, with a better balance between landmark highlights and our personal rhythm.', zh: '这次旅行比普通旅游产品更像是专门为我们设计的，地标体验和节奏都更适合我们。' }, rating: 5 },
            { name: 'Michael', country: 'Singapore', quote: { en: 'What impressed me most was not just the destinations, but how clearly the plan matched our business schedule and comfort expectations.', zh: '最打动我的不只是目的地本身，而是整个计划非常贴合我们的商务节奏和舒适度要求。' }, rating: 5 },
            { name: 'Sofia', country: 'Spain', quote: { en: 'It felt less like buying a tour and more like shaping a private travel concept around our interests.', zh: '这更像是在围绕我们的兴趣打造一段私人旅行概念，而不是简单购买一条线路。' }, rating: 5 }
          ]
        },
        {
          _type: 'articleListSection',
          title: { en: 'Inspiration and planning insights.', zh: '灵感内容与策划建议。' },
          subtitle: { en: 'Articles here are meant to inspire destination ideas, planning logic and tailor-made travel thinking rather than sell fixed products.', zh: '这里的文章更偏灵感与策划思路，用来启发目的地选择和定制逻辑，而不是售卖固定产品。' },
          sourceMode: 'auto',
          maxItems: 3,
          viewMoreText: { en: 'Talk to Us Instead', zh: '直接咨询我们' },
          viewMoreTarget: '/contact'
        },
        {
          _type: 'faqPreviewSection',
          title: { en: 'Frequently asked questions.', zh: '常见问题。' },
          subtitle: { en: 'Before contacting us, get a quick sense of how tailor-made China travel works and what to expect from the planning process.', zh: '在联系前，你可以先快速了解中国高端定制旅行的服务方式，以及整个咨询流程会如何展开。' },
          maxItems: 4,
          viewMoreText: { en: 'View All FAQ', zh: '查看全部 FAQ' },
          viewMoreTarget: '/faq'
        },
        {
          _type: 'ctaSection',
          title: { en: 'Start shaping your own China journey.', zh: '开始规划属于你的中国定制旅程。' },
          subtitle: { en: 'Tell us your traveler type, preferred destinations, pace and travel style, and we will help turn that into a more suitable plan.', zh: '告诉我们你的客群类型、偏好目的地、节奏与旅行风格，我们会帮助你把想法整理成更合适的中国定制方案。' },
          primaryButtonText: { en: 'Contact Us', zh: '联系我们' },
          primaryButtonTarget: '/contact',
          secondaryButtonText: { en: 'Tailor My Trip', zh: '定制我的行程' },
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
