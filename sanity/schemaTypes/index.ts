// sanity/schemaTypes/index.ts
import tour from './tour'
import article from './article'
import siteSettings from './siteSettings'

export const schema = {
  types: [tour, article, siteSettings],
}