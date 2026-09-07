// Bridges the two ways this codebase names a programme.
//
// The ported prototype speaks short keys ('pm', 'ba', 'aipb'…) while the rest
// of the application — routing, pricing, cohort config, the payments layer —
// speaks slugs ('product-management', 'ai-product-builder'…). Analytics uses
// the slug, because that is what the URL, the enrolment record and the
// payments layer all agree on, and it is what a report will be read against.
//
// The mapping is derived from PROG_HREF rather than restated, so a new
// programme cannot be added to one and forgotten in the other.

import { P, PROG_HREF, type ProgKey } from '@/lib/proto/data';
import type { ProgramContext, ProgramSlug, ProgramType, AnalyticsTier, PaymentPlan } from './types';

const SLUG_BY_KEY = Object.fromEntries(
  (Object.keys(PROG_HREF) as ProgKey[]).map((k) => [k, PROG_HREF[k].split('/').pop() as ProgramSlug]),
) as Record<ProgKey, ProgramSlug>;

const KEY_BY_SLUG = Object.fromEntries(
  (Object.keys(SLUG_BY_KEY) as ProgKey[]).map((k) => [SLUG_BY_KEY[k], k]),
) as Record<string, ProgKey>;

export function slugForKey(key: ProgKey): ProgramSlug {
  return SLUG_BY_KEY[key];
}

export function keyForSlug(slug: string): ProgKey | null {
  return KEY_BY_SLUG[slug] ?? null;
}

export function programTypeForKey(key: ProgKey): ProgramType {
  return P[key].fam === 'int' ? 'intensive' : 'pathway';
}

/** The three properties every programme-scoped event carries. */
export function programContext(key: ProgKey): ProgramContext {
  return {
    program_slug: slugForKey(key),
    program_name: P[key].n,
    program_type: programTypeForKey(key),
  };
}

export function programContextForSlug(slug: string): ProgramContext | null {
  const key = keyForSlug(slug);
  return key ? programContext(key) : null;
}

// ── Normalisation ─────────────────────────────────────────
// Reporting should not have to know that the pathway pages say 'p2' and the
// payments layer says 'installment' for the same thing.

export function normalisePlan(plan: string | null | undefined): PaymentPlan {
  if (plan === 'p2' || plan === 'installment' || plan === 'installments') return 'installments';
  return 'full';
}

export function normaliseTier(tier: string | null | undefined, isIntensive: boolean): AnalyticsTier {
  if (isIntensive) return 'single';
  if (tier === 'prem' || tier === 'premium') return 'premium';
  return 'standard';
}

// ── Cohort ────────────────────────────────────────────────
// The cohort number is per-programme (pathways are on cohort 2, the newer
// tracks and intensives on cohort 1), so it is read from the programme record
// rather than from the site-wide COHORT constant, which only carries dates.

import { COHORT, getProgramme } from '@/lib/cohort-config';

export function cohortFor(slug: ProgramSlug): { cohort: number; cohort_start_date: string } {
  try {
    const p = getProgramme(slug);
    return { cohort: p.cohort, cohort_start_date: p.start };
  } catch {
    return { cohort: 0, cohort_start_date: COHORT.startDate };
  }
}
