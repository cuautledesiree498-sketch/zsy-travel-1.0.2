// sanity/schemaTypes/index.ts
import tour from './tour'
import article from './article'
import siteSettings, { siteSettingObjects } from './siteSettings'
import homeSettings from './homeSettings'
import { sectionObjects } from './homeSections'

export const schema = {
  types: [tour, article, siteSettings, homeSettings, ...sectionObjects, ...siteSettingObjects],
}
