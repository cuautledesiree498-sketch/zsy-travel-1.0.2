export const localizedString = {
  name: 'localizedString',
  title: '双语短文本',
  type: 'object',
  fields: [
    { name: 'en', title: '英文内容（前台默认）', type: 'string' },
    { name: 'zh', title: '中文内容（后台参考/中文站）', type: 'string' },
  ],
  preview: {
    select: { title: 'en', subtitle: 'zh' },
    prepare(value: any) {
      return {
        title: value?.title || '未填写英文',
        subtitle: value?.subtitle || '未填写中文',
      }
    },
  },
}

export const localizedText = {
  name: 'localizedText',
  title: '双语长文本',
  type: 'object',
  fields: [
    { name: 'en', title: '英文内容（前台默认）', type: 'text', rows: 4 },
    { name: 'zh', title: '中文内容（后台参考/中文站）', type: 'text', rows: 4 },
  ],
  preview: {
    select: { title: 'en', subtitle: 'zh' },
    prepare(value: any) {
      return {
        title: value?.title || '未填写英文',
        subtitle: value?.subtitle || '未填写中文',
      }
    },
  },
}
