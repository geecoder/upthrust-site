import type { Metadata } from 'next';
import { getProgramme, isIntensiveSlug, formatDate, type ProgrammeSlug, type PathwaySlug, type IntensiveSlug } from './cohort-config';
import { PATHWAY_CONTENT } from './pathways-content';
import { INTENSIVE_CONTENT } from './intensives-content';
import { SITE } from './config';

// Shared per-route metadata builder for the six programme routes (4
// pathways + 2 intensives) — every route previously inherited the root
// layout's generic title/description; this makes each individually
// crawlable/shareable with real, distinct copy.
export function buildProgrammeMetadata(slug: ProgrammeSlug): Metadata {
  const programme = getProgramme(slug);
  const content = isIntensiveSlug(slug)
    ? INTENSIVE_CONTENT[slug as IntensiveSlug]
    : PATHWAY_CONTENT[slug as PathwaySlug];
  const familyLabel = isIntensiveSlug(slug) ? '5-Week Specialist Intensive' : '12-Week Career Capability Pathway';
  const title = `${content.name} — ${familyLabel} | Upthrust Digital`;
  const description = `${content.line} Starts ${formatDate(programme.start)}. ${content.blurb}`.slice(0, 300);
  const path = isIntensiveSlug(slug) ? `/intensives/${slug}` : `/pathways/${slug}`;
  const url = `${SITE.url}${path}`;

  return {
    // `title: { absolute }` bypasses the root layout's `%s · Upthrust` template —
    // these titles already end in "| Upthrust Digital", so the template would
    // otherwise append a redundant second brand suffix.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
