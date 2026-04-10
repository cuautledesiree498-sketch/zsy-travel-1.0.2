// C:\Users\Administrator\travel-website\my-travel-site\sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { deskStructure } from './sanity/deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Infinite Travel CMS',
  projectId,
  dataset,
  schema: schema as any,
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
