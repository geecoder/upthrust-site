import type { Metadata } from 'next';
import { AboutContent } from '@/components/proto/AboutContent';

export const metadata: Metadata = {
  title: { absolute: 'About Upthrust | Upthrust Digital' },
  description: 'Too many talented people were collecting certificates but still struggling to demonstrate real capability. Upthrust exists to close that gap.',
};

export default function AboutPage() {
  return <AboutContent />;
}
