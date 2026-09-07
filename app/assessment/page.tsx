import type { Metadata } from 'next';
import { AssessContent } from '@/components/proto/AssessContent';

export const metadata: Metadata = {
  title: { absolute: 'Career Assessment — Find Your Pathway | Upthrust Digital' },
  description: 'Twelve real product situations. No personality test, no score — your own answers quoted back to you, and the programme your instincts already point to.',
};

export default function AssessmentPage() {
  return <AssessContent />;
}
