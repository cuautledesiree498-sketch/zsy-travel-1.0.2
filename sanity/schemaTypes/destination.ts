export default {
  name: 'destination',
  title: '📍 目的地 / Destinations',
  type: 'document',
  fields: [
    { name: 'name', title: '目的地名称（双语） / Name', type: 'localizedString', description: '例如 Beijing / 北京' },
    { name: 'slug', title: '链接标识 / Slug', type: 'slug', options: { source: 'name.en' } },
    { name: 'tagline', title: '一句话定位（双语） / Tagline', type: 'localizedString' },
    { name: 'description', title: '简介（双语） / Description', type: 'localizedText' },
    { name: 'image', title: '封面图 / Cover image', type: 'image', options: { hotspot: true } },
    {
      name: 'highlights',
      title: '✨ 亮点列表（双语） / Highlights',
      type: 'array',
      of: [{ type: 'localizedString' }],
      description: '每行一个亮点',
    },
    {
      name: 'idealFor',
      title: '适合人群（双语） / Ideal for',
      type: 'localizedText',
    },
    {
      name: 'bestTime',
      title: '最佳时间（双语） / Best time',
      type: 'localizedText',
    },
    {
      name: 'suggestedStay',
      title: '建议停留（双语） / Suggested stay',
      type: 'localizedString',
    },
    {
      name: 'heroFacts',
      title: '顶部信息卡 / Hero facts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: '标签（双语） / Label', type: 'localizedString' },
            { name: 'value', title: '值（双语） / Value', type: 'localizedString' },
          ],
          preview: {
            select: { title: 'label.en', subtitle: 'value.en' },
          },
        },
      ],
    },
    {
      name: 'experiences',
      title: '推荐体验 / Recommended experiences',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: '标题（双语） / Title', type: 'localizedString' },
            { name: 'description', title: '描述（双语） / Description', type: 'localizedText' },
          ],
          preview: {
            select: { title: 'title.en', subtitle: 'title.zh' },
          },
        },
      ],
    },
    {
      name: 'samplePlan',
      title: '示例安排 / Sample plan',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: '标题（双语） / Title', type: 'localizedString' },
            { name: 'description', title: '描述（双语） / Description', type: 'localizedText' },
          ],
          preview: {
            select: { title: 'title.en', subtitle: 'title.zh' },
          },
        },
      ],
    },
    {
      name: 'gallery',
      title: '图集 / Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    { name: 'published', title: '已发布 / Published', type: 'boolean', initialValue: true },
    {
      name: 'order',
      title: '排序号 / Order',
      type: 'number',
      description: '数字越小越靠前，用于列表排序',
      initialValue: 0,
    },
  ],
}
