// sanity/schemaTypes/article.ts
export default {
  name: 'article',
  title: '📝 旅游攻略/文章',
  type: 'document',
  fields: [
    { name: 'title', title: '标题', type: 'string' },
    { name: 'slug', title: '链接标识', type: 'slug', options: { source: 'title' } },
    { name: 'author', title: '作者', type: 'string' },
    { name: 'publishDate', title: '发布日期', type: 'datetime' },
    { name: 'content', title: '正文内容', type: 'array', of: [{ type: 'block' }] }, // 富文本
    { name: 'mainImage', title: '封面图', type: 'image', options: { hotspot: true } }
  ]
}