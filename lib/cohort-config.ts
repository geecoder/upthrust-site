// Single source of truth for cohort facts, per-programme cohort numbers, seat
// inventory, and Passport ID formatting. These change every cohort and must
// never be hardcoded in templates — nav badges, hero strips, facts strips, the
// enrolment summary/confirmation, and /verify all read from here.
//
// All four 12-week pathways start 26 Sep 2026. PM and BA are running their
// Cohort 2; Product Design and Payment Operations open their Cohort 1. The
// cohort number is a per-pathway property, not a global constant — do not
// assume every pathway is on the same cohort number.
//
// The two 5-week specialist intensives (AI Product Builder, BA for AI &
// Automation) run on their own, later cadence — start 5 Oct 2026, applications
// close 28 Sep 2026 — both on their first cohort (Cohort 1). Intensives are
// single-price (no Standard/Premium tiers) and do not issue a Capability
// Passport — that stays a pathway-Premium perk. Seats are modeled
// per-programme (not one shared global count) so nav badges and the site-wide
// banner can be derived rather than hardcoded — see seatsLine()/siteSeatsLine().

export type PathwaySlug =
  | 'product-management'
  | 'business-analysis'
  | 'product-design'
  | 'payment-operations';

export type PathwayKey = 'pm' | 'ba' | 'pd' | 'po';

export interface PathwayCohort {
  slug: PathwaySlug;
  label: string;
  key: PathwayKey;
  cohort: number;
  trackCode: string; // suffix in a Passport ID: UP-C{cohort}-{seq}-{trackCode}
  passportPrefix: string; // e.g. "UP-C2" — derived from cohort, kept explicit for readability
  start: string; // ISO date
  status: string; // "Cohort 2 · Open"
  seatsMax: number;
  seatsRemaining: number;
}

export const PATHWAYS: Record<PathwaySlug, PathwayCohort> = {
  'product-management': {
    slug: 'product-management',
    label: 'Product Management',
    key: 'pm',
    cohort: 2,
    trackCode: 'PM',
    passportPrefix: 'UP-C2',
    start: '2026-09-26',
    status: 'Cohort 2 · Open',
    seatsMax: 25,
    seatsRemaining: 14,
  },
  'business-analysis': {
    slug: 'business-analysis',
    label: 'Business Analysis',
    key: 'ba',
    cohort: 2,
    trackCode: 'BA',
    passportPrefix: 'UP-C2',
    start: '2026-09-26',
    status: 'Cohort 2 · Open',
    seatsMax: 25,
    seatsRemaining: 16,
  },
  'product-design': {
    slug: 'product-design',
    label: 'Product Design',
    key: 'pd',
    cohort: 1,
    trackCode: 'PD',
    passportPrefix: 'UP-C1',
    start: '2026-09-26',
    status: 'Cohort 1 · Open',
    seatsMax: 22,
    seatsRemaining: 20,
  },
  'payment-operations': {
    slug: 'payment-operations',
    label: 'Payment Operations',
    key: 'po',
    cohort: 1,
    trackCode: 'PO',
    passportPrefix: 'UP-C1',
    start: '2026-09-26',
    status: 'Cohort 1 · Open',
    seatsMax: 22,
    seatsRemaining: 18,
  },
};

export const PATHWAY_LIST = Object.values(PATHWAYS);

// ── Specialist intensives (5 weeks, single price, no Passport) ─────────────

export type IntensiveSlug = 'ai-product-builder' | 'ba-for-ai-automation';

export type IntensiveKey = 'ai' | 'bx';

export interface IntensiveCohort {
  slug: IntensiveSlug;
  label: string;
  key: IntensiveKey;
  cohort: number;
  trackCode: string; // suffix in an enrolment reference: UP-{trackCode}-C{cohort}-{number}
  start: string; // ISO date
  status: string;
  seatsMax: number;
  seatsRemaining: number;
}

export const INTENSIVES: Record<IntensiveSlug, IntensiveCohort> = {
  'ai-product-builder': {
    slug: 'ai-product-builder',
    label: 'AI Product Builder',
    key: 'ai',
    cohort: 1,
    trackCode: 'AI',
    start: '2026-10-05',
    status: 'Cohort 1 · Open',
    seatsMax: 20,
    seatsRemaining: 15,
  },
  'ba-for-ai-automation': {
    slug: 'ba-for-ai-automation',
    label: 'BA for AI & Automation',
    key: 'bx',
    cohort: 1,
    trackCode: 'BX',
    start: '2026-10-05',
    status: 'Cohort 1 · Open',
    seatsMax: 20,
    seatsRemaining: 17,
  },
};

export const INTENSIVE_LIST = Object.values(INTENSIVES);

export type ProgrammeSlug = PathwaySlug | IntensiveSlug;

// Shared cohort facts that genuinely apply across every programme this cohort.
// Seat counts live per-programme above, not here — see seatsLine()/siteSeatsLine().
export const COHORT = {
  // Moved from 20 September to make room for the free taster session on the
  // 19th. Every surface derives its wording from here — see the DATES block
  // at the foot of this file — so this is the only place to change it.
  startDate: '2026-09-26',
  startDateDisplay: '26 Sep 2026',
  // Assumption, flagged at handover: applications now close after the taster
  // rather than four days before it, which the old 15 September date would
  // have done. Three clear days before the cohort starts.
  applyByDate: '2026-09-23',
  applyByDateDisplay: '23 Sep 2026',
  // Free taster session — one open evening before enrolment closes.
  tasterDate: '2026-09-19',
  tasterDateDisplay: '19 Sep 2026',
  // Intensives run on their own, later cadence — see the doc comment above.
  intensiveStartDate: '2026-10-05',
  intensiveStartDateDisplay: '5 Oct 2026',
  intensiveApplyByDate: '2026-09-28',
  intensiveApplyByDateDisplay: '28 Sep 2026',
  demoDay: null as string | null, // set when confirmed
  hoursPerWeek: '8–10',
  intensiveHoursPerWeek: '6–8',
  liveSessionDays: ['Tuesday', 'Thursday'] as const,
  feedbackSlaHours: 48,
  cohortRangeMin: 15,
  cohortRangeMax: 25,
};

// Per-programme seats line, e.g. "14 of 25 seats remaining".
export function seatsLine(slug: ProgrammeSlug): string {
  const p = slug in PATHWAYS ? PATHWAYS[slug as PathwaySlug] : INTENSIVES[slug as IntensiveSlug];
  return `${p.seatsRemaining} of ${p.seatsMax} seats remaining`;
}

// Site-wide banner, derived by summing every live programme — never hardcoded.
export function siteSeatsLine(): string {
  const all = [...PATHWAY_LIST, ...INTENSIVE_LIST];
  const remaining = all.reduce((sum, p) => sum + p.seatsRemaining, 0);
  const max = all.reduce((sum, p) => sum + p.seatsMax, 0);
  return `${remaining} of ${max} seats remaining`;
}

// Look up a pathway by its route slug or its short key (pm/ba/pd/po).
export function getPathway(id: PathwaySlug | PathwayKey): PathwayCohort {
  if (id in PATHWAYS) return PATHWAYS[id as PathwaySlug];
  const bySlug = PATHWAY_LIST.find((p) => p.key === id);
  if (!bySlug) throw new Error(`Unknown pathway: ${id}`);
  return bySlug;
}

// Look up an intensive by its route slug or its short key (ai/bx).
export function getIntensive(id: IntensiveSlug | IntensiveKey): IntensiveCohort {
  if (id in INTENSIVES) return INTENSIVES[id as IntensiveSlug];
  const bySlug = INTENSIVE_LIST.find((i) => i.key === id);
  if (!bySlug) throw new Error(`Unknown intensive: ${id}`);
  return bySlug;
}

export function isIntensiveSlug(slug: ProgrammeSlug): slug is IntensiveSlug {
  return slug in INTENSIVES;
}

// Unified lookup across both programme families — for nav, sitemap, and the
// enrolment flow, which all need to treat pathways and intensives uniformly.
export function getProgramme(slug: ProgrammeSlug): { slug: ProgrammeSlug; label: string; cohort: number; trackCode: string; start: string; status: string } {
  return isIntensiveSlug(slug) ? getIntensive(slug) : getPathway(slug);
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Format an ISO date the African way: "20 Sep 2026", never "09/20/2026". Uses an
// explicit month table rather than Intl/toLocaleDateString — ICU renders "Sept"
// for en-GB short-form September, which doesn't match the required format.
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return `${String(day).padStart(2, '0')} ${MONTHS_SHORT[month - 1]} ${year}`;
}

export const PASSPORT_ID_PATTERN = /^UP-C[12]-\d{4}-(PM|BA|PD|PO)$/;

// Passport ID format: UP-C{cohort}-{seq}-{track}. seq is always zero-padded to
// exactly 4 digits — never derive it from a raw seat number, which can overflow
// past 4 digits and produce an ID that this same pattern can't later verify.
export function formatPassportId(pathway: PathwaySlug | PathwayKey, seq: number): string {
  const p = getPathway(pathway);
  const paddedSeq = String(Math.max(0, Math.floor(seq)) % 10000).padStart(4, '0');
  return `${p.passportPrefix}-${paddedSeq}-${p.trackCode}`;
}

export function isValidPassportId(id: string): boolean {
  return PASSPORT_ID_PATTERN.test(id.trim().toUpperCase());
}

// Parse a Passport ID back into its cohort + pathway, for /verify lookups.
export function parsePassportId(id: string): { cohort: number; seq: number; trackCode: string; pathway: PathwayCohort } | null {
  const match = id.trim().toUpperCase().match(PASSPORT_ID_PATTERN);
  if (!match) return null;
  const cohort = Number(id.trim().toUpperCase().match(/^UP-C(\d)/)?.[1]);
  const seq = Number(match[0].match(/-(\d{4})-/)?.[1]);
  const trackCode = match[1];
  const pathway = PATHWAY_LIST.find((p) => p.trackCode === trackCode && p.cohort === cohort);
  if (!pathway) return null;
  return { cohort, seq, trackCode, pathway };
}


// ── Date wording ──────────────────────────────────────────
// The prototype hardcoded "20 September" into a dozen components. Moving the
// cohort meant hunting all of them, so the wording each surface needs is
// derived here instead and every component reads from this block.

const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

/** "26 September 2026" */
export function formatLong(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS_LONG[m - 1]} ${y}`;
}

/** "26 September" */
export function formatDayMonth(iso: string): string {
  const [, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS_LONG[m - 1]}`;
}

/** "26 Sep" */
export function formatShort(iso: string): string {
  const [, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS_SHORT[m - 1]}`;
}

export const DATES = {
  cohortStartLong: formatLong(COHORT.startDate),          // 26 September 2026
  cohortStartDayMonth: formatDayMonth(COHORT.startDate),  // 26 September
  cohortStartShort: formatShort(COHORT.startDate),        // 26 Sep
  applyByDayMonth: formatDayMonth(COHORT.applyByDate),    // 23 September
  applyByLong: formatLong(COHORT.applyByDate),
  tasterLong: formatLong(COHORT.tasterDate),              // 19 September 2026
  tasterDayMonth: formatDayMonth(COHORT.tasterDate),      // 19 September
  intensiveStartLong: formatLong(COHORT.intensiveStartDate),
  intensiveStartDayMonth: formatDayMonth(COHORT.intensiveStartDate),
  intensiveStartShort: formatShort(COHORT.intensiveStartDate),
  intensiveApplyByDayMonth: formatDayMonth(COHORT.intensiveApplyByDate),
} as const;
