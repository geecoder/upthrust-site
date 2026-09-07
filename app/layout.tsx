import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ProtoNav } from '@/components/proto/ProtoNav';
import { ProtoFooter } from '@/components/proto/ProtoFooter';
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider';
import { SITE } from '@/lib/config';
import { getRegionFromRequest } from '@/lib/geoServer';
import { OrganizationJsonLd } from '@/components/seo/OrganizationJsonLd';
import { ProtoProvider } from '@/lib/proto/store';
import { REGION_TO_CUR } from '@/lib/proto/region-map';

// Self-hosted via next/font — no runtime Google Fonts CDN request. Each
// generates its own CSS variable; globals.css chains --font-display/-ui/-mono
// to these so none of the existing var(--font-display) call sites change.
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['opsz'], // optical size — the design system relies on this varying with size
  variable: '--font-fraunces',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false, // small mono labels only — not critical to first paint like the display/UI faces
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ['Product Management', 'Business Analysis', 'Career Capability', 'PM Bootcamp', 'BA Bootcamp', 'Nigeria', 'UK', 'Canada'],
  authors: [{ name: 'Upthrust' }],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'en_GB',
    type: 'website',
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.tagline }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/upthrust-favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/brand/upthrust-favicon-512.png', sizes: '512x512', type: 'image/png' }],
  },
};

// Explicit rather than relying on the framework default. No maximum-scale or
// user-scalable=no: pinch-zoom stays available.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4EFE6' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1A2B' },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const region = await getRegionFromRequest();

  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body data-region={region}>
        <a href="#main-content" className="pv-skip">SKIP TO CONTENT</a>
        <OrganizationJsonLd />
        <AnalyticsProvider />
        <ProtoProvider initialCur={REGION_TO_CUR[region]}>
          <div style={{ background: 'var(--bone)', minHeight: '100vh', fontFamily: 'var(--font-ui)', color: 'var(--fg-1)' }}>
            <ProtoNav />
            <main id="main-content">
              {children}
            </main>
            <ProtoFooter />
          </div>
        </ProtoProvider>
      </body>
    </html>
  );
}
