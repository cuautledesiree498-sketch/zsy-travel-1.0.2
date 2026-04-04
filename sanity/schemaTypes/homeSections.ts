const linkTargetField = {
  name: 'linkTarget',
  title: '跳转到哪里',
  type: 'string',
  options: {
    list: [
      { title: '不跳转', value: 'none' },
      { title: '联系页', value: '/contact' },
      { title: '关于我们', value: '/about' },
      { title: '常见问题 FAQ', value: '/faq' },
      { title: '首页线路区', value: '#tours' },
      { title: '首页文章区', value: '#articles' },
      { title: '首页目的地区', value: '#destinations' },
      { title: '自定义链接', value: 'custom' },
    ],
    layout: 'dropdown',
  },
  initialValue: 'none',
}

const iconFields = [
  {
    name: 'iconType',
    title: '图标怎么来',
    type: 'string',
    description: '推荐优先用预设图标；如果想更个性，可以改成 Emoji 或上传图片/SVG。',
    options: {
      list: [
        { title: '选系统预设图标（最简单）', value: 'preset' },
        { title: '用 Emoji', value: 'emoji' },
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
        { title: '🧭 指南针', value: 'compass' },
        { title: '🗺️ 地图', value: 'map' },
        { title: '📷 相机', value: 'camera' },
        { title: '⭐ 星星', value: 'star' },
        { title: '🛡️ 保障', value: 'shield' },
        { title: '💬 对话', value: 'chat' },
        { title: '✈️ 飞机', value: 'plane' },
        { title: '🏔️ 雪山', value: 'mountain' },
        { title: '❤️ 爱心', value: 'heart' },
        { title: '⏰ 时间', value: 'clock' },
      ],
      layout: 'dropdown',
    },
    description: '不会出错的标准图标，适合快速使用。',
  },
  {
    name: 'emoji',
    title: 'Emoji 图标',
    type: 'string',
    hidden: ({ parent }: any) => parent?.iconType !== 'emoji',
    description: '例如：🧭 🚐 💬 🏔️，建议只填 1 个。',
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
  { ...linkTargetField, name: 'primaryButtonTarget', title: '主按钮跳转到哪里' },
  { name: 'primaryButtonLink', title: '主按钮自定义链接', type: 'string', hidden: ({ parent }: any) => parent?.primaryButtonTarget !== 'custom', description: '仅在选择“自定义链接”时填写' },
  { name: 'primaryButtonNewTab', title: '主按钮新窗口打开', type: 'boolean', initialValue: false },
  { name: 'secondaryButtonText', title: '次按钮文字', type: 'string' },
  { ...linkTargetField, name: 'secondaryButtonTarget', title: '次按钮跳转到哪里', initialValue: 'none' },
  { name: 'secondaryButtonLink', title: '次按钮自定义链接', type: 'string', hidden: ({ parent }: any) => parent?.secondaryButtonTarget !== 'custom', description: '仅在选择“自定义链接”时填写' },
  { name: 'secondaryButtonNewTab', title: '次按钮新窗口打开', type: 'boolean', initialValue: false },
]

const commonSectionFields = [
  { name: 'sectionName', title: '后台备注名', type: 'string' },
  { name: 'enabled', title: '显示这个模块', type: 'boolean', initialValue: true },
]

export const sectionObjects = [
  {
    name: 'linkItem',
    title: '链接项',
    type: 'object',
    fields: [
      { name: 'text', title: '文字', type: 'string' },
      { ...linkTargetField, name: 'target', title: '跳转到哪里' },
      { name: 'href', title: '自定义链接', type: 'string', hidden: ({ parent }: any) => parent?.target !== 'custom' },
      { name: 'newTab', title: '新窗口打开', type: 'boolean', initialValue: false },
    ],
  },
  {
    name: 'iconLinkCard',
    title: '图标卡片',
    type: 'object',
    fieldsets: [
      { name: 'content', title: '1. 内容' },
      { name: 'icon', title: '2. 图标 / 图片' },
      { name: 'action', title: '3. 跳转' },
    ],
    fields: [
      { name: 'title', title: '标题', type: 'string', fieldset: 'content' },
      { name: 'description', title: '描述', type: 'text', rows: 3, fieldset: 'content' },
      ...iconFields.map((field) => ({ ...field, fieldset: 'icon' })),
      { name: 'backgroundImage', title: '背景图（可选）', type: 'image', options: { hotspot: true }, fieldset: 'icon', description: '目的地卡片建议上传背景图；卖点卡片可以不传。' },
      { name: 'linkText', title: '按钮文字（可选）', type: 'string', fieldset: 'action' },
      { ...linkTargetField, name: 'linkTarget', title: '跳转到哪里', fieldset: 'action', initialValue: 'none' },
      { name: 'link', title: '自定义链接', type: 'string', fieldset: 'action', hidden: ({ parent }: any) => parent?.linkTarget !== 'custom', description: '仅在选择“自定义链接”时填写' },
      { name: 'newTab', title: '新窗口打开', type: 'boolean', initialValue: false, fieldset: 'action' },
    ],
    preview: {
      select: { title: 'title', subtitle: 'description', linkTarget: 'linkTarget', link: 'link' },
      prepare(value: any) {
        const target = value?.linkTarget === 'custom' ? value?.link : value?.linkTarget
        return { title: value?.title || '图标卡片', subtitle: target ? `跳转到：${target}` : (value?.subtitle || '可修改图标、文字和跳转') }
      },
    },
  },
  {
    name: 'heroSection',
    title: '首页头图区',
    type: 'object',
    fieldsets: [
      { name: 'content', title: '1. 文案' },
      { name: 'media', title: '2. 图片' },
      { name: 'actions', title: '3. 按钮' },
    ],
    fields: [
      ...commonSectionFields,
      { name: 'sectionName', title: '后台备注名', type: 'string', initialValue: '首页头图区' },
      { name: 'title', title: '主标题', type: 'string', fieldset: 'content' },
      { name: 'subtitle', title: '副标题', type: 'text', rows: 3, fieldset: 'content' },
      { name: 'backgroundImage', title: '背景图', type: 'image', options: { hotspot: true }, fieldset: 'media' },
      ...ctaFields.map((field) => ({ ...field, fieldset: 'actions' })),
    ],
    preview: {
      select: { title: 'title', enabled: 'enabled' },
      prepare(value: any) {
        return { title: value?.title || '首页头图区', subtitle: value?.enabled === false ? '已隐藏' : '首页最上方大图区域' }
      },
    },
  },
  {
    name: 'featureIconsSection',
    title: '卖点图标区',
    type: 'object',
    fields: [
      ...commonSectionFields,
      { name: 'sectionName', title: '后台备注名', type: 'string', initialValue: '卖点图标区' },
      { name: 'anchorId', title: '内部锚点（一般不用改）', type: 'string', hidden: true },
      { name: 'title', title: '板块标题', type: 'string' },
      { name: 'subtitle', title: '板块副标题', type: 'text', rows: 3 },
      { name: 'sectionTips', title: '模块说明', type: 'string', readOnly: true, initialValue: '这一块显示在首页中上部，用来展示品牌卖点、服务优势。', hidden: true },
      {
        name: 'items',
        title: '卖点卡片列表',
        type: 'array',
        description: '每一张卡片都能单独改图标、文字和跳转。可以拖动排序。',
        of: [{ type: 'iconLinkCard' }],
        options: { sortable: true },
      },
    ],
    preview: {
      select: { title: 'title', enabled: 'enabled', count: 'items.length' },
      prepare(value: any) {
        return { title: value?.title || '卖点图标区', subtitle: `${value?.enabled === false ? '已隐藏 · ' : ''}${value?.count || 0} 张卡片` }
      },
    },
  },
  {
    name: 'destinationCardsSection',
    title: '目的地卡片区',
    type: 'object',
    fields: [
      ...commonSectionFields,
      { name: 'sectionName', title: '后台备注名', type: 'string', initialValue: '目的地卡片区' },
      { name: 'anchorId', title: '内部锚点（一般不用改）', type: 'string', hidden: true, initialValue: 'destinations' },
      { name: 'title', title: '板块标题', type: 'string' },
      { name: 'subtitle', title: '板块副标题', type: 'text', rows: 3 },
      {
        name: 'items',
        title: '目的地卡片列表',
        type: 'array',
        description: '建议给每张目的地卡片上传背景图，并设置跳转链接。可以拖动排序。',
        of: [{ type: 'iconLinkCard' }],
        options: { sortable: true },
      },
    ],
    preview: {
      select: { title: 'title', enabled: 'enabled', count: 'items.length' },
      prepare(value: any) {
        return { title: value?.title || '目的地卡片区', subtitle: `${value?.enabled === false ? '已隐藏 · ' : ''}${value?.count || 0} 张卡片` }
      },
    },
  },
  {
    name: 'tourListSection',
    title: '旅游线路区',
    type: 'object',
    fieldsets: [
      { name: 'basic', title: '1. 基本内容' },
      { name: 'source', title: '2. 显示哪些线路' },
      { name: 'more', title: '3. 查看更多按钮' },
    ],
    fields: [
      ...commonSectionFields,
      { name: 'sectionName', title: '后台备注名', type: 'string', initialValue: '旅游线路区' },
      { name: 'anchorId', title: '内部锚点（一般不用改）', type: 'string', hidden: true, initialValue: 'tours' },
      { name: 'title', title: '板块标题', type: 'string', fieldset: 'basic' },
      { name: 'subtitle', title: '板块副标题', type: 'text', rows: 3, fieldset: 'basic' },
      {
        name: 'sourceMode',
        title: '显示方式',
        type: 'string',
        description: '推荐默认选“自动展示最新线路”。',
        fieldset: 'source',
        options: {
          list: [
            { title: '自动展示最新线路', value: 'auto' },
            { title: '手动挑选推荐线路', value: 'manual' },
          ],
          layout: 'radio',
        },
        initialValue: 'auto',
      },
      { name: 'maxItems', title: '显示几条线路', type: 'number', initialValue: 6, fieldset: 'source', description: '只在自动模式下生效' },
      {
        name: 'selectedTours',
        title: '手动选择线路',
        type: 'array',
        fieldset: 'source',
        hidden: ({ parent }: any) => parent?.sourceMode !== 'manual',
        of: [{ type: 'reference', to: [{ type: 'tour' }] }],
        options: { sortable: true },
      },
      { name: 'viewMoreText', title: '查看更多按钮文字', type: 'string', fieldset: 'more' },
      { ...linkTargetField, name: 'viewMoreTarget', title: '查看更多按钮跳转到哪里', fieldset: 'more', initialValue: 'custom' },
      { name: 'viewMoreLink', title: '查看更多自定义链接', type: 'string', fieldset: 'more', hidden: ({ parent }: any) => parent?.viewMoreTarget !== 'custom' },
      { name: 'viewMoreNewTab', title: '查看更多新窗口打开', type: 'boolean', initialValue: false, fieldset: 'more' },
    ],
    preview: {
      select: { title: 'title', enabled: 'enabled', sourceMode: 'sourceMode', maxItems: 'maxItems', count: 'selectedTours.length' },
      prepare(value: any) {
        const sourceText = value?.sourceMode === 'manual' ? `手动挑选 ${value?.count || 0} 条` : `自动展示 ${value?.maxItems || 6} 条`
        return { title: value?.title || '旅游线路区', subtitle: `${value?.enabled === false ? '已隐藏 · ' : ''}${sourceText}` }
      },
    },
  },
  {
    name: 'articleListSection',
    title: '攻略文章区',
    type: 'object',
    fieldsets: [
      { name: 'basic', title: '1. 基本内容' },
      { name: 'source', title: '2. 显示哪些文章' },
      { name: 'more', title: '3. 查看更多按钮' },
    ],
    fields: [
      ...commonSectionFields,
      { name: 'sectionName', title: '后台备注名', type: 'string', initialValue: '攻略文章区' },
      { name: 'anchorId', title: '内部锚点（一般不用改）', type: 'string', hidden: true, initialValue: 'articles' },
      { name: 'title', title: '板块标题', type: 'string', fieldset: 'basic' },
      { name: 'subtitle', title: '板块副标题', type: 'text', rows: 3, fieldset: 'basic' },
      {
        name: 'sourceMode',
        title: '显示方式',
        type: 'string',
        description: '推荐默认选“自动展示最新文章”。',
        fieldset: 'source',
        options: {
          list: [
            { title: '自动展示最新文章', value: 'auto' },
            { title: '手动挑选推荐文章', value: 'manual' },
          ],
          layout: 'radio',
        },
        initialValue: 'auto',
      },
      { name: 'maxItems', title: '显示几篇文章', type: 'number', initialValue: 3, fieldset: 'source', description: '只在自动模式下生效' },
      {
        name: 'selectedArticles',
        title: '手动选择文章',
        type: 'array',
        fieldset: 'source',
        hidden: ({ parent }: any) => parent?.sourceMode !== 'manual',
        of: [{ type: 'reference', to: [{ type: 'article' }] }],
        options: { sortable: true },
      },
      { name: 'viewMoreText', title: '查看更多按钮文字（可选）', type: 'string', fieldset: 'more' },
      { ...linkTargetField, name: 'viewMoreTarget', title: '查看更多按钮跳转到哪里', fieldset: 'more', initialValue: 'custom' },
      { name: 'viewMoreLink', title: '查看更多自定义链接', type: 'string', fieldset: 'more', hidden: ({ parent }: any) => parent?.viewMoreTarget !== 'custom' },
      { name: 'viewMoreNewTab', title: '查看更多新窗口打开', type: 'boolean', initialValue: false, fieldset: 'more' },
    ],
    preview: {
      select: { title: 'title', enabled: 'enabled', sourceMode: 'sourceMode', maxItems: 'maxItems', count: 'selectedArticles.length' },
      prepare(value: any) {
        const sourceText = value?.sourceMode === 'manual' ? `手动挑选 ${value?.count || 0} 篇` : `自动展示 ${value?.maxItems || 3} 篇`
        return { title: value?.title || '攻略文章区', subtitle: `${value?.enabled === false ? '已隐藏 · ' : ''}${sourceText}` }
      },
    },
  },
  {
    name: 'faqPreviewSection',
    title: '首页 FAQ 区',
    type: 'object',
    fields: [
      ...commonSectionFields,
      { name: 'sectionName', title: '后台备注名', type: 'string', initialValue: '首页 FAQ 区' },
      { name: 'title', title: '板块标题', type: 'string' },
      { name: 'subtitle', title: '板块副标题', type: 'text', rows: 3 },
      { name: 'maxItems', title: '首页显示几条 FAQ', type: 'number', initialValue: 4 },
      { name: 'viewMoreText', title: '查看更多按钮文字', type: 'string', initialValue: 'View All FAQ' },
      { ...linkTargetField, name: 'viewMoreTarget', title: '查看更多按钮跳转到哪里', initialValue: '/faq' },
      { name: 'viewMoreLink', title: '查看更多自定义链接', type: 'string', hidden: ({ parent }: any) => parent?.viewMoreTarget !== 'custom' },
    ],
    preview: {
      select: { title: 'title', enabled: 'enabled', maxItems: 'maxItems' },
      prepare(value: any) {
        return { title: value?.title || '首页 FAQ 区', subtitle: `${value?.enabled === false ? '已隐藏 · ' : ''}显示 ${value?.maxItems || 4} 条 FAQ` }
      },
    },
  },
  {
    name: 'testimonialsSection',
    title: '用户评价区',
    type: 'object',
    fields: [
      ...commonSectionFields,
      { name: 'sectionName', title: '后台备注名', type: 'string', initialValue: '用户评价区' },
      { name: 'title', title: '板块标题', type: 'string' },
      { name: 'subtitle', title: '板块副标题', type: 'text', rows: 3 },
      {
        name: 'items',
        title: '评价列表',
        type: 'array',
        options: { sortable: true },
        of: [{
          type: 'object',
          name: 'testimonialItem',
          fields: [
            { name: 'name', title: '姓名', type: 'string' },
            { name: 'country', title: '国家 / 地区', type: 'string' },
            { name: 'quote', title: '评价内容', type: 'text', rows: 4 },
            { name: 'rating', title: '星级（1-5）', type: 'number', initialValue: 5 },
            { name: 'avatar', title: '头像（可选）', type: 'image', options: { hotspot: true } },
          ],
          preview: { select: { title: 'name', subtitle: 'country' } }
        }],
      },
    ],
    preview: {
      select: { title: 'title', enabled: 'enabled', count: 'items.length' },
      prepare(value: any) {
        return { title: value?.title || '用户评价区', subtitle: `${value?.enabled === false ? '已隐藏 · ' : ''}${value?.count || 0} 条评价` }
      },
    },
  },
  {
    name: 'statsSection',
    title: '数据统计区',
    type: 'object',
    fields: [
      ...commonSectionFields,
      { name: 'sectionName', title: '后台备注名', type: 'string', initialValue: '数据统计区' },
      { name: 'title', title: '板块标题', type: 'string' },
      { name: 'subtitle', title: '板块副标题', type: 'text', rows: 3 },
      {
        name: 'items',
        title: '统计项列表',
        type: 'array',
        options: { sortable: true },
        of: [{
          type: 'object',
          name: 'statItem',
          fields: [
            { name: 'number', title: '数字', type: 'string' },
            { name: 'label', title: '说明', type: 'string' },
          ],
          preview: { select: { title: 'number', subtitle: 'label' } }
        }],
      },
    ],
    preview: {
      select: { title: 'title', enabled: 'enabled', count: 'items.length' },
      prepare(value: any) {
        return { title: value?.title || '数据统计区', subtitle: `${value?.enabled === false ? '已隐藏 · ' : ''}${value?.count || 0} 个数字` }
      },
    },
  },
  {
    name: 'ctaSection',
    title: '底部行动按钮区',
    type: 'object',
    fieldsets: [
      { name: 'content', title: '1. 文案' },
      { name: 'media', title: '2. 图片' },
      { name: 'actions', title: '3. 按钮' },
    ],
    fields: [
      ...commonSectionFields,
      { name: 'sectionName', title: '后台备注名', type: 'string', initialValue: '底部行动按钮区' },
      { name: 'anchorId', title: '内部锚点（一般不用改）', type: 'string', hidden: true },
      { name: 'title', title: '标题', type: 'string', fieldset: 'content' },
      { name: 'subtitle', title: '描述', type: 'text', rows: 4, fieldset: 'content' },
      { name: 'backgroundImage', title: '背景图（可选）', type: 'image', options: { hotspot: true }, fieldset: 'media' },
      ...ctaFields.map((field) => ({ ...field, fieldset: 'actions' })),
    ],
    preview: {
      select: { title: 'title', enabled: 'enabled', primaryButtonText: 'primaryButtonText' },
      prepare(value: any) {
        return { title: value?.title || '底部行动按钮区', subtitle: `${value?.enabled === false ? '已隐藏' : '主按钮：' + (value?.primaryButtonText || '未设置')}` }
      },
    },
  },
]
