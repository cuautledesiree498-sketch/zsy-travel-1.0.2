import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://infinitravel.net'),
  title: 'Infinite Travel | Tailor-Made China Journeys',
  description: 'Private multi-city travel across China designed for global travelers. Custom itineraries covering Beijing, Shanghai, Chengdu, Xinjiang and more.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Infinite Travel — Tailor-Made China Journeys',
    description: 'Multi-city private travel across China for global travelers.',
    images: ['/opengraph-image'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinite Travel — Tailor-Made China Journeys',
    description: 'Multi-city private travel across China for global travelers.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">{children}</body>
    </html>
  );
}
