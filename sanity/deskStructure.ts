import {StructureResolver} from 'sanity/structure'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('ZSY Travel 后台')
    .items([
      S.listItem()
        .title('🏠 首页搭积木')
        .id('homeSettings')
        .child(
          S.document()
            .schemaType('homeSettings')
            .documentId('homeSettings')
            .title('首页搭积木配置')
        ),
      S.listItem()
        .title('⚙️ 网站全局设置')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('网站全局设置')
        ),
      S.divider(),
      S.documentTypeListItem('tour').title('🏔️ 旅游线路管理'),
      S.documentTypeListItem('article').title('📝 攻略文章管理'),
    ])
