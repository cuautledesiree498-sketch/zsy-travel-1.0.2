// C:\Users\Administrator\travel-website\my-travel-site\sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './sanity/env'
import tour from './sanity/schemaTypes/tour'
import article from './sanity/schemaTypes/article'
import siteSettings from './sanity/schemaTypes/siteSettings'

export default defineConfig({
  name: 'default',
  title: 'ZSY Travel CMS',
  projectId,
  dataset,
  schema: {
    types: [tour, article, siteSettings],
  },
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
