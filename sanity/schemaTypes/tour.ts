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
    { name: 'published', title: '已上架', type: 'boolean', default: true },
    { 
      name: 'order', 
      title: '排序号', 
      type: 'number', 
      description: '数字越小越靠前，用于首页排序',
      initialValue: 0
    },
    {
      name: 'highlights',
      title: '✨ 亮点列表',
      type: 'array',
      of: [{ type: 'string' }],
      description: '套餐的主要亮点，每行一个'
    },
    {
      name: 'itinerary',
      title: '📅 每日行程',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: '第几天', type: 'number' },
            { name: 'title', title: '行程标题', type: 'string' },
            { name: 'description', title: '行程描述', type: 'text' }
          ]
        }
      ]
    }
  ]
}