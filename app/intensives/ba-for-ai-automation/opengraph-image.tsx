import { renderProgrammeOG, OG_SIZE } from '@/lib/og';
import { INTENSIVE_CONTENT } from '@/lib/intensives-content';
import { getIntensive, formatDate } from '@/lib/cohort-config';

export const runtime = 'edge';
export const alt = 'BA for AI & Automation — Upthrust Digital';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const content = INTENSIVE_CONTENT['ba-for-ai-automation'];
  const programme = getIntensive('ba-for-ai-automation');
  return renderProgrammeOG(content.name, '5-WEEK SPECIALIST INTENSIVE', formatDate(programme.start));
}
