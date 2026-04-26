import type { Metadata } from 'next';
import './globals.css';
import { SITE_URL } from '@/lib/seo';

const siteTitle = 'Infinite Travel';
const siteDescription = 'Private multi-city travel across China designed for global travelers. Custom itineraries covering Beijing, Shanghai, Chengdu, Xinjiang and more.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Infinite Travel | Tailor-Made China Journeys',
  description: siteDescription,
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Infinite Travel — Tailor-Made China Journeys',
    description: siteDescription,
    siteName: siteTitle,
    url: SITE_URL,
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Travel — Tailor-Made China Journeys',
    description: siteDescription,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">{children}</body>
    </html>
  );
}
