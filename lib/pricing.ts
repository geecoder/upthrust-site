// Shared amount computation for both the enrol flow's live client-side
// preview and the /api/enrol/init route's authoritative server-side charge —
// using the same function everywhere means the two can never drift, and the
// server never trusts a client-supplied amount.

import { isIntensiveSlug, type ProgrammeSlug } from './cohort-config';
import { getPricing, getIntensivePricing, type Region } from './config';

export type Tier = 'standard' | 'premium';
export type Plan = 'full' | 'installment';

// Intensives are single-price and single-payment (no tier, no installment
// plan) — tier/plan are ignored for an intensive slug.
export function amountDue(slug: ProgrammeSlug, region: Region, tier: Tier, plan: Plan): number {
  if (isIntensiveSlug(slug)) {
    return getIntensivePricing(slug, region).standalone;
  }
  const p = getPricing(slug, region);
  if (plan === 'full') return tier === 'standard' ? p.standard : p.premium;
  return tier === 'standard' ? p.standardInstallment2 : p.premiumInstallment2;
}
