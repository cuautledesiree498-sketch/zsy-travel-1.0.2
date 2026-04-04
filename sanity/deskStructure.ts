import {StructureResolver} from 'sanity/structure'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('ZSY Travel 后台')
    .items([
      S.listItem()
        .title('🏠 首页内容编辑')
        .id('homeSettings')
        .child(
          S.document()
            .schemaType('homeSettings')
            .documentId('homeSettings')
            .title('首页内容编辑')
        ),
      S.listItem()
        .title('⚙️ 网站基础信息')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('网站基础信息')
        ),
      S.divider(),
      S.documentTypeListItem('tour').title('🏔️ 旅游线路'),
      S.documentTypeListItem('article').title('📝 攻略文章'),
    ])
