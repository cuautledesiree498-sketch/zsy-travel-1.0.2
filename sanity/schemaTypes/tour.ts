// sanity/schemaTypes/tour.ts
export default {
  name: 'tour',
  title: '🏔️ 旅游套餐',
  type: 'document',
  fields: [
    { name: 'title', title: '套餐名称', type: 'string', description: '例：7天丝路探险' },
    { name: 'slug', title: '链接标识', type: 'slug', options: { source: 'title' } },
    { name: 'price', title: '价格 (USD)', type: 'number' },
    { name: 'duration', title: '天数', type: 'number' },
    { name: 'image', title: '封面图', type: 'image', options: { hotspot: true } },
    { name: 'description', title: '简介', type: 'text' },
    { name: 'published', title: '已上架', type: 'boolean', default: true }
  ]
}