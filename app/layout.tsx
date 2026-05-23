import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import { SITE } from '@/lib/config';
import { getRegionFromRequest } from '@/lib/geoServer';

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Detect visitor's region server-side using Vercel geo headers.
  // Passed to <body data-region="..."> so the client Pricing component reads it instantly.
  const region = await getRegionFromRequest();

  return (
    <html lang="en">
      <body data-region={region}>
        <AnalyticsProvider />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
