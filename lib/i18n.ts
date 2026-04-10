export type Lang = 'en' | 'zh'

export function normalizeLang(value?: string): Lang {
  return value === 'zh' ? 'zh' : 'en'
}

export function pickLocalized(value: any, lang: Lang) {
  if (!value) return ''

  if (typeof value === 'object' && ('en' in value || 'zh' in value)) {
    return lang === 'zh' ? value?.zh || value?.en || '' : value?.en || value?.zh || ''
  }

  if (typeof value !== 'string') return value || ''
  if (!value.includes('|')) return value
  const parts = value.split('|').map((part) => part.trim())
  if (parts.length < 2) return value
  return lang === 'zh' ? parts[1] || parts[0] : parts[0]
}

export function markPlaceholder(value: any) {
  if (!value) return ''
  if (typeof value !== 'string') return value
  const trimmed = value.trim()
  if (!trimmed) return ''
  return value
}

export function withLang(path: string, lang: Lang) {
  if (!path) return path
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('tel:')) return path
  if (path.startsWith('#')) return path
  if (/([?&])lang=(en|zh)\b/.test(path)) return path
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}lang=${lang}`
}

export const uiText = {
  en: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    faq: 'FAQ',
    services: 'Services',
    solutions: 'Solutions',
    destinations: 'Destinations',
    cases: 'Cases',
    insights: 'Insights',
    whyUs: 'Why Us',
    reviews: 'Reviews',
    language: '中文',
    capabilities: 'Capabilities',
    audienceSolutions: 'Audience Solutions',
    sampleCases: 'Sample Cases',
    testimonials: 'Testimonials',
    quickLinks: 'Quick Links',
    siteIntro: 'Site Intro',
    featuredDestinations: 'Featured destinations',
    sampleCase: 'Sample Case',
    reference: 'Reference',
    privatePlanning: 'Private Planning',
    readMore: 'Read More',
    by: 'By',
    contactPlanning: 'Contact & Planning',
    quickInquiryGuide: 'Quick Inquiry Guide',
    currentStatus: 'Current status',
    startConversation: 'Start A Conversation',
    needStartingPoint: 'Need A Starting Point?',
    needMoreGuidance: 'Need More Guidance?',
    aboutBrand: 'About The Brand',
    whoWeAre: 'Who We Are',
    brandNote: 'Brand Note',
    whyTravelersChooseUs: 'Why Travelers Choose Us',
    tailorMadeLuxuryTravelInChina: 'Tailor-Made Luxury Travel In China',
    brandPositioning: 'Brand Positioning',
    planningInsightsCanBeAdded: 'Planning insights and stories can be published here later.',
    sampleCasesCanBeAdded: 'Sample inspiration cases can be added from the CMS later.',
  },
  zh: {
    home: '首页',
    about: '关于我们',
    contact: '联系我们',
    faq: '常见问题',
    services: '服务优势',
    solutions: '人群方案',
    destinations: '目的地',
    cases: '案例灵感',
    insights: '灵感内容',
    whyUs: '为什么选择我们',
    reviews: '客户评价',
    language: 'EN',
    capabilities: '服务能力',
    audienceSolutions: '按人群定制方案',
    sampleCases: '案例参考',
    testimonials: '客户反馈',
    quickLinks: '快捷链接',
    siteIntro: '网站简介',
    featuredDestinations: '精选目的地',
    sampleCase: '案例参考',
    reference: '参考方向',
    privatePlanning: '定制方案',
    readMore: '查看详情',
    by: '作者',
    contactPlanning: '咨询与沟通',
    quickInquiryGuide: '快速咨询建议',
    currentStatus: '当前说明',
    startConversation: '开始沟通',
    needStartingPoint: '不知道从哪里开始？',
    needMoreGuidance: '还想进一步了解？',
    aboutBrand: '品牌介绍',
    whoWeAre: '我们是谁',
    brandNote: '品牌说明',
    whyTravelersChooseUs: '客户为什么选择我们',
    tailorMadeLuxuryTravelInChina: '中国高端定制旅行',
    brandPositioning: '品牌定位',
    planningInsightsCanBeAdded: '后续可以在后台继续发布灵感内容与策划文章。',
    sampleCasesCanBeAdded: '后续可以在后台继续补充案例参考与灵感路线。',
  },
} as const
