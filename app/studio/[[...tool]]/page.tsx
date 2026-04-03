// C:\Users\Administrator\travel-website\my-travel-site\app\studio\[[...tool]]\page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
