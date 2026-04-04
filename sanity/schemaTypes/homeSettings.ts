// sanity/schemaTypes/homeSettings.ts
export default {
  name: 'homeSettings',
  title: '🏠 首页配置',
  type: 'document',
  singleton: true,
  fields: [
    { 
      name: 'heroTitle', 
      title: '主标题', 
      type: 'string',
      description: '首页大标题，例：Discover the Magic of Xinjiang'
    },
    { 
      name: 'heroSubtitle', 
      title: '副标题', 
      type: 'string',
      description: '首页副标题，例：Ancient Silk Road • Stunning Landscapes'
    },
    { 
      name: 'heroImage', 
      title: '背景图', 
      type: 'image',
      options: { hotspot: true },
      description: '首页主视觉背景图'
    },
    { 
      name: 'showDestinations', 
      title: '显示热门目的地板块', 
      type: 'boolean',
      default: true
    },
    { 
      name: 'showTours', 
      title: '显示旅游套餐板块', 
      type: 'boolean',
      default: true
    },
    { 
      name: 'showArticles', 
      title: '显示攻略文章板块', 
      type: 'boolean',
      default: true
    },
    { 
      name: 'featuredTourIds', 
      title: '首页置顶套餐 (可选)', 
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tour' }] }],
      description: '选择要在首页置顶显示的套餐，留空则显示全部'
    }
  ]
}
