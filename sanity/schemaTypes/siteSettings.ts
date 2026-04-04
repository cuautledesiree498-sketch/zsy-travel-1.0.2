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
    { name: 'label', title: '显示名称', type: 'string', description: '例如 WhatsApp / Follow Us / Email Us' },
    { name: 'url', title: '跳转链接', type: 'string', description: '例如 https://wa.me/... 或 /contact' },
    { name: 'newTab', title: '新窗口打开', type: 'boolean', initialValue: true },
  ],
  preview: {
    select: { title: 'label', subtitle: 'url', platform: 'platform' },
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
    { name: 'question', title: '问题', type: 'string' },
    { name: 'answer', title: '答案', type: 'text', rows: 5 },
  ],
  preview: {
    select: { title: 'question', subtitle: 'answer' },
  },
}

export default {
  name: 'siteSettings',
  title: '⚙️ 网站全局设置',
  type: 'document',
  groups: [
    { name: 'branding', title: '品牌信息' },
    { name: 'contact', title: '联系方式' },
    { name: 'navigation', title: '导航与页脚' },
    { name: 'faq', title: 'FAQ 页面' },
  ],
  fields: [
    { name: 'siteTitle', title: '网站标题', type: 'string', group: 'branding' },
    { name: 'siteDescription', title: '网站描述', type: 'text', rows: 3, group: 'branding' },
    { name: 'heroBackground', title: '默认首页背景图', type: 'image', options: { hotspot: true }, group: 'branding' },
    { name: 'contactEmail', title: '联系邮箱', type: 'string', group: 'contact' },
    { name: 'contactPhone', title: '联系电话', type: 'string', group: 'contact' },
    { name: 'whatsappNumber', title: 'WhatsApp 号码', type: 'string', group: 'contact' },
    { name: 'wechat', title: '微信号', type: 'string', group: 'contact' },
    { name: 'address', title: '地址', type: 'string', group: 'contact' },
    {
      name: 'headerCtaText',
      title: '顶部导航按钮文字',
      type: 'string',
      initialValue: 'Get a Quote',
      group: 'navigation',
    },
    {
      name: 'headerCtaLink',
      title: '顶部导航按钮跳转',
      type: 'string',
      initialValue: '/contact',
      group: 'navigation',
    },
    {
      name: 'footerIntro',
      title: '页脚简介',
      type: 'text',
      rows: 3,
      group: 'navigation',
      description: '显示在页脚左侧的网站介绍文案',
    },
    {
      name: 'socialLinks',
      title: '社交/客服链接',
      type: 'array',
      of: [{ type: 'socialLink' }],
      options: { sortable: true },
      group: 'navigation',
    },
    {
      name: 'faqTitle',
      title: 'FAQ 页面标题',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
      group: 'faq',
    },
    {
      name: 'faqSubtitle',
      title: 'FAQ 页面副标题',
      type: 'text',
      rows: 3,
      initialValue: 'Find answers to common questions about our tours, booking process, and travel tips.',
      group: 'faq',
    },
    {
      name: 'faqItems',
      title: 'FAQ 列表',
      type: 'array',
      of: [{ type: 'faqItem' }],
      options: { sortable: true },
      group: 'faq',
      initialValue: [
        { question: 'What is the best time to visit Xinjiang?', answer: 'The best time to visit Xinjiang is from May to October when the weather is mild and pleasant.' },
        { question: 'Do I need a visa to visit Xinjiang?', answer: 'Visa requirements depend on your nationality. Please check with the nearest Chinese embassy or consulate.' },
        { question: 'Can I customize a tour package?', answer: 'Absolutely! We offer custom tour packages tailored to your interests, budget, and schedule.' },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: '网站全局设置', subtitle: '统一管理导航、页脚、联系方式、FAQ' }
    },
  },
}

export const siteSettingObjects = [socialLink, faqItem]
