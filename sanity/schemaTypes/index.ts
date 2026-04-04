// sanity/schemaTypes/index.ts
import tour from './tour'
import article from './article'
import siteSettings from './siteSettings'
import homeSettings from './homeSettings'

export const schema = {
  types: [tour, article, siteSettings, homeSettings],
}