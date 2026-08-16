// Single source of truth for cohort facts, per-pathway cohort numbers, and Passport
// ID formatting. These change every cohort and must never be hardcoded in templates —
// nav badges, hero strips, pathway facts strips, the enrolment summary/confirmation,
// and /verify all read from here.
//
// All four pathways start 20 Sep 2026. PM and BA are running their Cohort 2;
// Product Design and Payment Operations open their Cohort 1. The cohort number is a
// per-pathway property, not a global constant — do not assume every pathway is on
// the same cohort number.

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
}

export const PATHWAYS: Record<PathwaySlug, PathwayCohort> = {
  'product-management': {
    slug: 'product-management',
    label: 'Product Management',
    key: 'pm',
    cohort: 2,
    trackCode: 'PM',
    passportPrefix: 'UP-C2',
    start: '2026-09-20',
    status: 'Cohort 2 · Open',
  },
  'business-analysis': {
    slug: 'business-analysis',
    label: 'Business Analysis',
    key: 'ba',
    cohort: 2,
    trackCode: 'BA',
    passportPrefix: 'UP-C2',
    start: '2026-09-20',
    status: 'Cohort 2 · Open',
  },
  'product-design': {
    slug: 'product-design',
    label: 'Product Design',
    key: 'pd',
    cohort: 1,
    trackCode: 'PD',
    passportPrefix: 'UP-C1',
    start: '2026-09-20',
    status: 'Cohort 1 · Open',
  },
  'payment-operations': {
    slug: 'payment-operations',
    label: 'Payment Operations',
    key: 'po',
    cohort: 1,
    trackCode: 'PO',
    passportPrefix: 'UP-C1',
    start: '2026-09-20',
    status: 'Cohort 1 · Open',
  },
};

export const PATHWAY_LIST = Object.values(PATHWAYS);

// Shared cohort facts — apply to every pathway this cohort.
export const COHORT = {
  startDate: '2026-09-20',
  startDateDisplay: '20 Sep 2026',
  demoDay: null as string | null, // set when confirmed
  seatsMax: 25,
  seatsRemaining: 18,
  hoursPerWeek: '8–10',
  liveSessionDays: ['Tuesday', 'Thursday'] as const,
  feedbackSlaHours: 48,
  cohortRangeMin: 15,
  cohortRangeMax: 25,
};

export function seatsLine(): string {
  return `${COHORT.seatsRemaining} of ${COHORT.seatsMax} seats remaining`;
}

// Look up a pathway by its route slug or its short key (pm/ba/pd/po).
export function getPathway(id: PathwaySlug | PathwayKey): PathwayCohort {
  if (id in PATHWAYS) return PATHWAYS[id as PathwaySlug];
  const bySlug = PATHWAY_LIST.find((p) => p.key === id);
  if (!bySlug) throw new Error(`Unknown pathway: ${id}`);
  return bySlug;
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
