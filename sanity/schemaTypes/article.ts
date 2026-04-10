// sanity/schemaTypes/article.ts
export default {
  name: 'article',
  title: '📝 旅游攻略 / 文章 / Articles',
  type: 'document',
  fields: [
    { name: 'title', title: '标题（双语） / Title', type: 'localizedString' },
    { name: 'slug', title: '链接标识 / Slug', type: 'slug', options: { source: 'title.en' } },
    { name: 'author', title: '作者 / Author', type: 'string' },
    { name: 'publishDate', title: '发布日期 / Publish date', type: 'datetime' },
    { name: 'excerpt', title: '摘要（双语） / Excerpt', type: 'localizedText' },
    { name: 'tagline', title: '一句话定位（双语） / Tagline', type: 'localizedString' },
    { name: 'heroFacts', title: '顶部信息卡 / Hero facts', type: 'array', of: [{ type: 'object', fields: [
      { name: 'label', title: '标签（双语） / Label', type: 'localizedString' },
      { name: 'value', title: '值（双语） / Value', type: 'localizedString' },
    ] }] },
    { name: 'content', title: '正文内容 / Content', type: 'array', of: [{ type: 'block' }] },
    { name: 'mainImage', title: '封面图 / Cover image', type: 'image', options: { hotspot: true } },
    { name: 'published', title: '已发布 / Published', type: 'boolean', initialValue: true, description: '关闭后文章不会显示在首页' },
  ]
}
