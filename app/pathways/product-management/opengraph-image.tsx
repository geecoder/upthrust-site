import { renderProgrammeOG, OG_SIZE } from '@/lib/og';
import { PATHWAY_CONTENT } from '@/lib/pathways-content';
import { getPathway, formatDate } from '@/lib/cohort-config';

export const runtime = 'edge';
export const alt = 'Product Management — Upthrust Digital';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const content = PATHWAY_CONTENT['product-management'];
  const programme = getPathway('product-management');
  return renderProgrammeOG(content.name, '12-WEEK CAREER CAPABILITY PATHWAY', formatDate(programme.start));
}
