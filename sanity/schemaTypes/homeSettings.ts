export default {
  name: 'homeSettings',
  title: '🏠 首页搭积木配置',
  type: 'document',
  groups: [
    { name: 'basic', title: '基础信息' },
    { name: 'sections', title: '首页模块' },
    { name: 'guide', title: '使用说明' },
  ],
  fields: [
    {
      name: 'pageTitle',
      title: '页面名称',
      type: 'string',
      initialValue: '首页配置',
      readOnly: true,
      group: 'basic',
    },
    {
      name: 'editorGuide',
      title: '小白操作说明',
      type: 'text',
      rows: 8,
      readOnly: true,
      group: 'guide',
      initialValue: '使用顺序：\n1. 在“首页模块列表”里拖动模块调整顺序\n2. 点开模块修改标题、副标题、按钮文字和跳转链接\n3. 图标可以选择预设、填写 Emoji，或上传图片 / SVG\n4. 不想显示某个模块时，把“启用该模块”关闭\n5. 线路/文章模块可以切换成“自动读取”或“手动选择”\n6. 保存并发布后，首页会按你的配置变化',
      description: '这是一段给运营同学看的固定说明，用来减少误操作。',
    },
    {
      name: 'sections',
      title: '首页模块列表',
      type: 'array',
      group: 'sections',
      description: '像搭积木一样添加、排序首页模块。拖动顺序即可调整首页上下顺序。',
      of: [
        { type: 'heroSection' },
        { type: 'featureIconsSection' },
        { type: 'destinationCardsSection' },
        { type: 'tourListSection' },
        { type: 'articleListSection' },
        { type: 'ctaSection' },
      ],
      options: {
        sortable: true,
      },
      initialValue: [
        { _type: 'heroSection', title: 'Discover the Magic of Xinjiang', subtitle: 'Ancient Silk Road • Stunning Landscapes • Rich Culture', primaryButtonText: 'Explore Tours', primaryButtonLink: '#tours', secondaryButtonText: 'Plan My Trip', secondaryButtonLink: '/contact' },
        { _type: 'featureIconsSection', title: 'Why Travel With Us', subtitle: 'Flexible modules managed from the CMS', items: [
          { title: 'Local Expertise', description: 'Trusted local guides and real itineraries', iconType: 'emoji', emoji: '🧭', linkText: 'Learn More', link: '/about' },
          { title: 'Flexible Routes', description: 'Private and small-group customized trips', iconType: 'emoji', emoji: '🚐', linkText: 'View Tours', link: '/tours' },
          { title: 'Fast Support', description: 'Quick response for itinerary planning', iconType: 'emoji', emoji: '💬', linkText: 'Contact Us', link: '/contact' }
        ] },
        { _type: 'destinationCardsSection', title: 'Popular Destinations', subtitle: 'Explore the most breathtaking places in Xinjiang', items: [
          { title: 'Kanas Lake', description: 'Kanas Lake - God\'s Garden', iconType: 'emoji', emoji: '🏞️', link: '/contact' },
          { title: 'Tianchi Lake', description: 'Heavenly Lake of Tianshan Mountains', iconType: 'emoji', emoji: '⛰️', link: '/contact' },
          { title: 'Kashgar Old City', description: 'Pearl of the Silk Road', iconType: 'emoji', emoji: '🕌', link: '/contact' }
        ] },
        { _type: 'tourListSection', title: 'Featured Tour Packages', subtitle: 'Handpicked itineraries for unforgettable experiences', anchorId: 'tours', viewMoreText: 'View All Tours', viewMoreLink: '/debug', sourceMode: 'auto', maxItems: 6 },
        { _type: 'articleListSection', title: 'Travel Guides', subtitle: 'Tips and stories from the Silk Road', anchorId: 'articles', sourceMode: 'auto', maxItems: 3 },
        { _type: 'ctaSection', title: 'Ready to Plan Your Xinjiang Journey?', subtitle: 'Tell us your dates, group size and travel style — we will help you build the trip.', primaryButtonText: 'Get a Quote', primaryButtonLink: '/contact', secondaryButtonText: 'Contact Us', secondaryButtonLink: '/contact' }
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
