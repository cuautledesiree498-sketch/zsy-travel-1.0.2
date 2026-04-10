// sanity/schemaTypes/tour.ts
export default {
  name: 'tour',
  title: '🏔️ 旅游套餐 / Tours',
  type: 'document',
  fields: [
    { name: 'title', title: '套餐名称（双语） / Title', type: 'localizedString', description: '例如 Silk Road Adventure / 丝路探险' },
    { name: 'slug', title: '链接标识 / Slug', type: 'slug', options: { source: 'title.en' } },
    { name: 'price', title: '价格 (USD)', type: 'number' },
    { name: 'duration', title: '天数 / Duration', type: 'number' },
    { name: 'image', title: '封面图 / Cover image', type: 'image', options: { hotspot: true } },
    { name: 'description', title: '简介（双语） / Description', type: 'localizedText' },
    { name: 'tagline', title: '一句话定位（双语） / Tagline', type: 'localizedString' },
    { name: 'idealFor', title: '适合人群（双语） / Ideal for', type: 'localizedText' },
    { name: 'travelStyle', title: '旅行风格（双语） / Travel style', type: 'localizedText' },
    { name: 'howToUse', title: '页面使用说明（双语） / How to use', type: 'localizedText' },
    { name: 'bestTime', title: '最佳时间（双语） / Best time', type: 'localizedText' },
    { name: 'extensions', title: '可延展方向（双语） / Extensions', type: 'localizedText' },
    { name: 'published', title: '已上架 / Published', type: 'boolean', initialValue: true },
    {
      name: 'order',
      title: '排序号 / Order',
      type: 'number',
      description: '数字越小越靠前，用于首页排序',
      initialValue: 0,
    },
    {
      name: 'highlights',
      title: '✨ 亮点列表（双语） / Highlights',
      type: 'array',
      of: [{ type: 'localizedString' }],
      description: '套餐的主要亮点，每行一个',
    },
    {
      name: 'itinerary',
      title: '📅 每日行程 / Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: '第几天 / Day', type: 'number' },
            { name: 'title', title: '行程标题（双语） / Title', type: 'localizedString' },
            { name: 'description', title: '行程描述（双语） / Description', type: 'localizedText' },
          ],
          preview: {
            select: { day: 'day', title: 'title.en', subtitle: 'title.zh' },
            prepare(value: any) {
              return {
                title: value?.title || `Day ${value?.day || ''}`,
                subtitle: value?.subtitle || '',
              }
            },
          },
        },
      ],
    },
  ],
}
