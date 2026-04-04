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
      rows: 12,
      readOnly: true,
      group: 'guide',
      initialValue: '首页编辑建议顺序：\n1. 先拖动“首页模块列表”调整顺序\n2. 再点开每个模块改标题、副标题、图片、按钮\n3. 跳转链接尽量优先使用下拉选择，不要乱填自定义链接\n4. 旅游线路区/攻略文章区推荐先用“自动展示”\n5. 如果暂时不想显示某一块，关闭“显示这个模块”即可\n6. 修改完成后记得发布（Publish）\n\n推荐首页顺序：\n首页头图区 → 卖点图标区 → 目的地卡片区 → 旅游线路区 → 数据统计区 → 用户评价区 → 首页 FAQ 区 → 底部行动按钮区',
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
        { type: 'statsSection' },
        { type: 'testimonialsSection' },
        { type: 'articleListSection' },
        { type: 'faqPreviewSection' },
        { type: 'ctaSection' },
      ],
      options: {
        sortable: true,
      },
      initialValue: [
        { _type: 'heroSection', title: 'Discover the Magic of Xinjiang', subtitle: 'Ancient Silk Road • Stunning Landscapes • Rich Culture', primaryButtonText: 'Explore Tours', primaryButtonTarget: '#tours', secondaryButtonText: 'Plan My Trip', secondaryButtonTarget: '/contact' },
        { _type: 'featureIconsSection', title: 'Why Travel With Us', subtitle: 'Flexible modules managed from the CMS', items: [
          { title: 'Local Expertise', description: 'Trusted local guides and real itineraries', iconType: 'emoji', emoji: '🧭', linkText: 'Learn More', linkTarget: '/about' },
          { title: 'Flexible Routes', description: 'Private and small-group customized trips', iconType: 'emoji', emoji: '🚐', linkText: 'View Tours', linkTarget: '#tours' },
          { title: 'Fast Support', description: 'Quick response for itinerary planning', iconType: 'emoji', emoji: '💬', linkText: 'Contact Us', linkTarget: '/contact' }
        ] },
        { _type: 'destinationCardsSection', title: 'Popular Destinations', subtitle: 'Explore the most breathtaking places in Xinjiang', items: [
          { title: 'Kanas Lake', description: 'Kanas Lake - God\'s Garden', iconType: 'emoji', emoji: '🏞️', linkTarget: '/contact' },
          { title: 'Tianchi Lake', description: 'Heavenly Lake of Tianshan Mountains', iconType: 'emoji', emoji: '⛰️', linkTarget: '/contact' },
          { title: 'Kashgar Old City', description: 'Pearl of the Silk Road', iconType: 'emoji', emoji: '🕌', linkTarget: '/contact' }
        ] },
        { _type: 'tourListSection', title: 'Featured Tour Packages', subtitle: 'Handpicked itineraries for unforgettable experiences', sourceMode: 'auto', maxItems: 6, viewMoreText: 'View All Tours', viewMoreTarget: 'custom', viewMoreLink: '/debug' },
        { _type: 'statsSection', title: 'Why Travelers Choose Us', subtitle: 'Trusted local service and unforgettable experiences', items: [
          { number: '500+', label: 'Happy Travelers' },
          { number: '10+', label: 'Years of Experience' },
          { number: '98%', label: 'Positive Feedback' },
          { number: '24/7', label: 'Support' }
        ] },
        { _type: 'testimonialsSection', title: 'What Our Travelers Say', subtitle: 'Real feedback from our guests', items: [
          { name: 'Emily', country: 'UK', quote: 'Amazing landscapes, smooth organization, and very responsive support.', rating: 5 },
          { name: 'Daniel', country: 'Singapore', quote: 'The Xinjiang route was unforgettable. Everything was easy and professional.', rating: 5 },
          { name: 'Sofia', country: 'Spain', quote: 'Beautiful itinerary and friendly local team. Highly recommended.', rating: 5 }
        ] },
        { _type: 'articleListSection', title: 'Travel Guides', subtitle: 'Tips and stories from the Silk Road', sourceMode: 'auto', maxItems: 3 },
        { _type: 'faqPreviewSection', title: 'Frequently Asked Questions', subtitle: 'Quick answers before you book', maxItems: 4, viewMoreText: 'View All FAQ', viewMoreTarget: '/faq' },
        { _type: 'ctaSection', title: 'Ready to Plan Your Xinjiang Journey?', subtitle: 'Tell us your dates, group size and travel style — we will help you build the trip.', primaryButtonText: 'Get a Quote', primaryButtonTarget: '/contact', secondaryButtonText: 'Contact Us', secondaryButtonTarget: '/contact' }
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
