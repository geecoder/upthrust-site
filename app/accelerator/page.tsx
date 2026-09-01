import type { Metadata } from 'next';
import { AccelContent } from '@/components/proto/AccelContent';

export const metadata: Metadata = {
  title: { absolute: 'The Accelerator | Upthrust Digital' },
  description: 'Twelve weeks. One shared spine. Four pathways. Live sessions, a weekly portfolio artefact, structured feedback, and a defended capstone.',
};

export default function AcceleratorPage() {
  return <AccelContent />;
}
