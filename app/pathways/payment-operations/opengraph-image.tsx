import { renderProgrammeOG, OG_SIZE } from '@/lib/og';
import { PATHWAY_CONTENT } from '@/lib/pathways-content';
import { getPathway, formatDate } from '@/lib/cohort-config';

export const runtime = 'edge';
export const alt = 'Payment Operations — Upthrust Digital';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const content = PATHWAY_CONTENT['payment-operations'];
  const programme = getPathway('payment-operations');
  return renderProgrammeOG(content.name, '12-WEEK CAREER CAPABILITY PATHWAY', formatDate(programme.start));
}
