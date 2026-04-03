// sanity/schemaTypes/siteSettings.ts
export default {
  name: 'siteSettings',
  title: '⚙️ 网站全局设置',
  type: 'document',
  singleton: true, // 关键：确保全局只有一份配置
  fields: [
    { name: 'siteTitle', title: '网站标题', type: 'string' },
    { name: 'heroBackground', title: '🖼️ 首页背景图', type: 'image', options: { hotspot: true } },
    { name: 'contactEmail', title: '联系邮箱', type: 'string' },
    { name: 'whatsappNumber', title: 'WhatsApp 号码', type: 'string' }
  ]
}