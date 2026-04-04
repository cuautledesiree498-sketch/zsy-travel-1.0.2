const iconFields = [
  {
    name: 'iconType',
    title: '图标来源',
    type: 'string',
    description: '推荐优先用预设图标；如果想更个性，可以改成 Emoji 或上传图片/SVG。',
    options: {
      list: [
        { title: '选择预设图标（最简单）', value: 'preset' },
        { title: '使用 Emoji', value: 'emoji' },
        { title: '上传图片 / SVG', value: 'upload' },
      ],
      layout: 'radio',
    },
    initialValue: 'preset',
  },
  {
    name: 'presetIcon',
    title: '预设图标',
    type: 'string',
    hidden: ({ parent }: any) => parent?.iconType !== 'preset',
    options: {
      list: [
        { title: '🧭 Compass / 指南针', value: 'compass' },
        { title: '🗺️ Map / 地图', value: 'map' },
        { title: '📷 Camera / 相机', value: 'camera' },
        { title: '⭐ Star / 星星', value: 'star' },
        { title: '🛡️ Shield / 保障', value: 'shield' },
        { title: '💬 Chat / 对话', value: 'chat' },
        { title: '✈️ Plane / 飞机', value: 'plane' },
        { title: '🏔️ Mountain / 雪山', value: 'mountain' },
        { title: '❤️ Heart / 爱心', value: 'heart' },
        { title: '⏰ Clock / 时间', value: 'clock' },
      ],
      layout: 'dropdown',
    },
    description: '不会出错的标准图标，适合后台小白快速使用。',
  },
  {
    name: 'emoji',
    title: 'Emoji 图标',
    type: 'string',
    hidden: ({ parent }: any) => parent?.iconType !== 'emoji',
    description: '例如：🧭 🚐 💬 🏔️。建议只填 1 个 Emoji。',
  },
  {
    name: 'uploadedIcon',
    title: '上传图标图片 / SVG',
    type: 'image',
    hidden: ({ parent }: any) => parent?.iconType !== 'upload',
    options: { hotspot: true },
    description: '适合上传品牌图标、SVG、小图标图片。',
  },
]

const ctaFields = [
  { name: 'primaryButtonText', title: '主按钮文字', type: 'string', description: '例如：Get a Quote / Explore Tours' },
  { name: 'primaryButtonLink', title: '主按钮跳转链接', type: 'string', description: '可填 /contact、/about、#tours 或外部链接 https://...' },
  { name: 'primaryButtonNewTab', title: '主按钮新窗口打开', type: 'boolean', initialValue: false },
  { name: 'secondaryButtonText', title: '次按钮文字', type: 'string' },
  { name: 'secondaryButtonLink', title: '次按钮跳转链接', type: 'string', description: '可留空，不显示次按钮' },
  { name: 'secondaryButtonNewTab', title: '次按钮新窗口打开', type: 'boolean', initialValue: false },
]

export const sectionObjects = [
  {
    name: 'linkItem',
    title: '链接项',
    type: 'object',
    fields: [
      { name: 'text', title: '文字', type: 'string' },
      { name: 'href', title: '跳转链接', type: 'string' },
      { name: 'newTab', title: '新窗口打开', type: 'boolean', initialValue: false },
    ],
  },
  {
    name: 'iconLinkCard',
    title: '图标卡片',
    type: 'object',
    fieldsets: [
      { name: 'content', title: '内容' },
      { name: 'icon', title: '图标' },
      { name: 'action', title: '跳转设置' },
    ],
    fields: [
      { name: 'title', title: '标题', type: 'string', fieldset: 'content' },
      { name: 'description', title: '描述', type: 'text', rows: 3, fieldset: 'content' },
      ...iconFields.map((field) => ({ ...field, fieldset: 'icon' })),
      { name: 'backgroundImage', title: '背景图（可选）', type: 'image', options: { hotspot: true }, fieldset: 'icon', description: '目的地卡片建议上传背景图；卖点图标区可不上传。' },
      { name: 'linkText', title: '按钮文字（可选）', type: 'string', fieldset: 'action' },
      { name: 'link', title: '跳转链接', type: 'string', fieldset: 'action', description: '例如 /contact、/about、#tours、https://...' },
      { name: 'newTab', title: '新窗口打开', type: 'boolean', initialValue: false, fieldset: 'action' },
    ],
    preview: {
      select: { title: 'title', subtitle: 'description' },
      prepare(value: any) {
        return { title: value?.title || '图标卡片', subtitle: value?.subtitle || '可修改图标、文字和跳转' }
      },
    },
  },
  {
    name: 'heroSection',
    title: 'Hero 主视觉区',
    type: 'object',
    fieldsets: [
      { name: 'content', title: '文案' },
      { name: 'media', title: '图片' },
      { name: 'actions', title: '按钮' },
    ],
    fields: [
      { name: 'sectionName', title: '模块备注名', type: 'string', initialValue: 'Hero 主视觉区' },
      { name: 'enabled', title: '启用该模块', type: 'boolean', initialValue: true },
      { name: 'title', title: '主标题', type: 'string', fieldset: 'content' },
      { name: 'subtitle', title: '副标题', type: 'text', rows: 3, fieldset: 'content' },
      { name: 'backgroundImage', title: '背景图', type: 'image', options: { hotspot: true }, fieldset: 'media' },
      ...ctaFields.map((field) => ({ ...field, fieldset: 'actions' })),
    ],
    preview: {
      select: { title: 'title', subtitle: 'sectionName' },
      prepare({ title, subtitle }: any) {
        return { title: title || 'Hero 主视觉区', subtitle: subtitle || '首页头图模块' }
      },
    },
  },
  {
    name: 'featureIconsSection',
    title: '图标卖点区',
    type: 'object',
    fields: [
      { name: 'sectionName', title: '模块备注名', type: 'string', initialValue: '图标卖点区' },
      { name: 'enabled', title: '启用该模块', type: 'boolean', initialValue: true },
      { name: 'anchorId', title: '锚点ID（可选）', type: 'string', description: '例如 features，用于首页菜单跳转' },
      { name: 'title', title: '板块标题', type: 'string' },
      { name: 'subtitle', title: '板块副标题', type: 'text', rows: 3 },
      {
        name: 'items',
        title: '图标卡片列表',
        type: 'array',
        description: '每一张卡片都能单独改图标、文字和跳转。',
        of: [{ type: 'iconLinkCard' }],
        options: { sortable: true },
      },
    ],
    preview: {
      select: { title: 'title', subtitle: 'sectionName' },
      prepare({ title, subtitle }: any) {
        return { title: title || '图标卖点区', subtitle: subtitle || '展示优势与卖点' }
      },
    },
  },
  {
    name: 'destinationCardsSection',
    title: '目的地卡片区',
    type: 'object',
    fields: [
      { name: 'sectionName', title: '模块备注名', type: 'string', initialValue: '目的地卡片区' },
      { name: 'enabled', title: '启用该模块', type: 'boolean', initialValue: true },
      { name: 'anchorId', title: '锚点ID（可选）', type: 'string', initialValue: 'destinations' },
      { name: 'title', title: '板块标题', type: 'string' },
      { name: 'subtitle', title: '板块副标题', type: 'text', rows: 3 },
      {
        name: 'items',
        title: '目的地卡片列表',
        type: 'array',
        description: '建议给每张目的地卡片上传背景图，并设置跳转链接。',
        of: [{ type: 'iconLinkCard' }],
        options: { sortable: true },
      },
    ],
    preview: {
      select: { title: 'title', subtitle: 'sectionName' },
      prepare({ title, subtitle }: any) {
        return { title: title || '目的地卡片区', subtitle: subtitle || '首页目的地模块' }
      },
    },
  },
  {
    name: 'tourListSection',
    title: '线路列表区',
    type: 'object',
    fields: [
      { name: 'sectionName', title: '模块备注名', type: 'string', initialValue: '线路列表区' },
      { name: 'enabled', title: '启用该模块', type: 'boolean', initialValue: true },
      { name: 'anchorId', title: '锚点ID（可选）', type: 'string', initialValue: 'tours' },
      { name: 'title', title: '板块标题', type: 'string' },
      { name: 'subtitle', title: '板块副标题', type: 'text', rows: 3 },
      {
        name: 'sourceMode',
        title: '内容来源',
        type: 'string',
        description: '自动读取 = 自动抓取已发布线路；手动选择 = 自己指定展示哪几个。',
        options: {
          list: [
            { title: '自动读取已发布线路', value: 'auto' },
            { title: '手动选择指定线路', value: 'manual' },
          ],
          layout: 'radio',
        },
        initialValue: 'auto',
      },
      { name: 'maxItems', title: '最多显示几条', type: 'number', initialValue: 6, description: '自动读取模式下生效' },
      {
        name: 'selectedTours',
        title: '手动选择线路',
        type: 'array',
        hidden: ({ parent }: any) => parent?.sourceMode !== 'manual',
        of: [{ type: 'reference', to: [{ type: 'tour' }] }],
        options: { sortable: true },
      },
      { name: 'viewMoreText', title: '查看更多按钮文字', type: 'string' },
      { name: 'viewMoreLink', title: '查看更多按钮跳转', type: 'string' },
      { name: 'viewMoreNewTab', title: '查看更多新窗口打开', type: 'boolean', initialValue: false },
    ],
    preview: {
      select: { title: 'title', subtitle: 'sectionName' },
      prepare({ title, subtitle }: any) {
        return { title: title || '线路列表区', subtitle: subtitle || '展示旅游线路' }
      },
    },
  },
  {
    name: 'articleListSection',
    title: '文章列表区',
    type: 'object',
    fields: [
      { name: 'sectionName', title: '模块备注名', type: 'string', initialValue: '文章列表区' },
      { name: 'enabled', title: '启用该模块', type: 'boolean', initialValue: true },
      { name: 'anchorId', title: '锚点ID（可选）', type: 'string', initialValue: 'articles' },
      { name: 'title', title: '板块标题', type: 'string' },
      { name: 'subtitle', title: '板块副标题', type: 'text', rows: 3 },
      {
        name: 'sourceMode',
        title: '内容来源',
        type: 'string',
        description: '自动读取 = 自动抓取已发布文章；手动选择 = 自己指定展示哪几篇。',
        options: {
          list: [
            { title: '自动读取已发布文章', value: 'auto' },
            { title: '手动选择指定文章', value: 'manual' },
          ],
          layout: 'radio',
        },
        initialValue: 'auto',
      },
      { name: 'maxItems', title: '最多显示几篇', type: 'number', initialValue: 3, description: '自动读取模式下生效' },
      {
        name: 'selectedArticles',
        title: '手动选择文章',
        type: 'array',
        hidden: ({ parent }: any) => parent?.sourceMode !== 'manual',
        of: [{ type: 'reference', to: [{ type: 'article' }] }],
        options: { sortable: true },
      },
      { name: 'viewMoreText', title: '查看更多按钮文字（可选）', type: 'string' },
      { name: 'viewMoreLink', title: '查看更多按钮跳转（可选）', type: 'string' },
      { name: 'viewMoreNewTab', title: '查看更多新窗口打开', type: 'boolean', initialValue: false },
    ],
    preview: {
      select: { title: 'title', subtitle: 'sectionName' },
      prepare({ title, subtitle }: any) {
        return { title: title || '文章列表区', subtitle: subtitle || '展示文章内容' }
      },
    },
  },
  {
    name: 'ctaSection',
    title: '行动召唤区 CTA',
    type: 'object',
    fieldsets: [
      { name: 'content', title: '文案' },
      { name: 'media', title: '图片' },
      { name: 'actions', title: '按钮' },
    ],
    fields: [
      { name: 'sectionName', title: '模块备注名', type: 'string', initialValue: 'CTA 区' },
      { name: 'enabled', title: '启用该模块', type: 'boolean', initialValue: true },
      { name: 'anchorId', title: '锚点ID（可选）', type: 'string' },
      { name: 'title', title: '标题', type: 'string', fieldset: 'content' },
      { name: 'subtitle', title: '描述', type: 'text', rows: 4, fieldset: 'content' },
      { name: 'backgroundImage', title: '背景图（可选）', type: 'image', options: { hotspot: true }, fieldset: 'media' },
      ...ctaFields.map((field) => ({ ...field, fieldset: 'actions' })),
    ],
    preview: {
      select: { title: 'title', subtitle: 'sectionName' },
      prepare({ title, subtitle }: any) {
        return { title: title || 'CTA 区', subtitle: subtitle || '引导用户咨询/转化' }
      },
    },
  },
]
