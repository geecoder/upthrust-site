import { renderProgrammeOG, OG_SIZE } from '@/lib/og';
import { INTENSIVE_CONTENT } from '@/lib/intensives-content';
import { getIntensive, formatDate } from '@/lib/cohort-config';

export const runtime = 'edge';
export const alt = 'AI Product Builder — Upthrust Digital';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const content = INTENSIVE_CONTENT['ai-product-builder'];
  const programme = getIntensive('ai-product-builder');
  return renderProgrammeOG(content.name, '5-WEEK SPECIALIST INTENSIVE', formatDate(programme.start));
}
