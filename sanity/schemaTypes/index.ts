// sanity/schemaTypes/index.ts
import tour from './tour'
import article from './article'
import siteSettings, { siteSettingObjects } from './siteSettings'
import homeSettings from './homeSettings'
import { sectionObjects } from './homeSections'
import { localizedString, localizedText } from './localized'

export const schema = {
  types: [tour, article, siteSettings, homeSettings, localizedString, localizedText, ...sectionObjects, ...siteSettingObjects],
}
