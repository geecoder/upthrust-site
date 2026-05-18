import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Upthrust — Build, Prove, and Communicate Real Product Capability',
  description:
    'Upthrust is a career capability platform for ambitious professionals in Product Management, Business Analysis, and Product Design. Build real-world capability through guided projects, simulations, mentorship, and verified assessment.',
  metadataBase: new URL('https://upthrust.io'),
  openGraph: {
    title: 'Upthrust — Career Capability Platform',
    description:
      'Build evidence of capability, not another certificate. 12-week practical accelerator for Product Management and Business Analysis.',
    url: 'https://upthrust.io',
    siteName: 'Upthrust',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upthrust — Career Capability Platform',
    description:
      'Build evidence of capability, not another certificate. 12-week practical accelerator for Product Management and Business Analysis.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
