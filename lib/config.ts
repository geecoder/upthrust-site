// Single source of truth for Tally form IDs and pricing.
// Edit this file to change form IDs or pricing across the whole site.

import type { PathwaySlug, IntensiveSlug, ProgrammeSlug } from './cohort-config';
import { isIntensiveSlug } from './cohort-config';

export const TALLY_FORMS = {
  consultation: '5BeeKM',
  waitlist: 'Zj11AA',
  designCohort2: 'rjJJ8X',
  assessment: 'lbYYkX',
} as const;

// Tally embed URL builder
export function tallyEmbedUrl(formId: string, opts?: { alignLeft?: boolean; transparentBackground?: boolean; hideTitle?: boolean }): string {
  const params = new URLSearchParams();
  if (opts?.alignLeft) params.set('alignLeft', '1');
  if (opts?.transparentBackground) params.set('transparentBackground', '1');
  if (opts?.hideTitle) params.set('hideTitle', '1');
  return `https://tally.so/embed/${formId}${params.toString() ? '?' + params.toString() : ''}`;
}

// Tally direct form URL (for opening in a new tab/popup)
export function tallyDirectUrl(formId: string): string {
  return `https://tally.so/r/${formId}`;
}

// Tally API submission URL (for silent POST from the assessment)
export function tallyApiUrl(formId: string): string {
  return `https://api.tally.so/forms/${formId}/submissions`;
}

// ============================================================
// PRICING — one table per pathway, per region. Only Nigeria gets NGN,
// only the UK gets GBP, only Canada gets CAD — everyone else (rest of
// Africa, the US, rest of world) gets USD. See lib/geoServer.ts /
// lib/useRegion.ts for how the visitor's region is detected.
// ============================================================

export type Region = 'NG' | 'GB' | 'CA' | 'US' | 'OTHER';

export const REGION_LABELS: Record<Region, string> = {
  NG: 'Nigeria & Africa',
  GB: 'United Kingdom',
  CA: 'Canada',
  US: 'United States',
  OTHER: 'International',
};

export const REGION_PROCESSOR: Record<Region, string> = {
  NG: 'Paystack',
  GB: 'Bank transfer',
  CA: 'Bank transfer',
  US: 'Bank transfer',
  OTHER: 'Bank transfer',
};

// The single branch point between the two payment rails — Nigeria pays via
// Paystack online, everyone else pays via manual bank transfer (reconciled by
// hand against the enrolment reference). See lib/payments/ for the rail
// implementations that key off this.
export type PaymentRailKind = 'paystack' | 'bank_transfer';

export function railFor(region: Region): PaymentRailKind {
  return region === 'NG' ? 'paystack' : 'bank_transfer';
}

const REGION_CURRENCY: Record<Region, { currency: string; symbol: string }> = {
  NG: { currency: 'NGN', symbol: '₦' },
  GB: { currency: 'GBP', symbol: '£' },
  CA: { currency: 'CAD', symbol: 'C$' },
  US: { currency: 'USD', symbol: '$' },
  OTHER: { currency: 'USD', symbol: '$' },
};

// Format a price like "₦350,000" or "£595"
export function formatPrice(amount: number, region: Region): string {
  const { symbol } = REGION_CURRENCY[region];
  return `${symbol}${amount.toLocaleString()}`;
}

export function currencyFor(region: Region): string {
  return REGION_CURRENCY[region].currency;
}

export interface Pricing {
  standard: number;
  premium: number;
  standardInstallment2: number; // amount per installment in a 2-pay plan
  premiumInstallment2: number;
}

// One shared Standard/Premium price table used by all 4 pathways (not
// differentiated per pathway). The 2-payment amounts are not a simple half —
// they bake in a real installment premium, shown transparently on the
// pricing page ("paying in full is always the lowest total"). Rest-of-world
// ('OTHER') mirrors US pricing.
export const SHARED_PATHWAY_PRICING: Record<Region, Pricing> = {
  NG: { standard: 400000, premium: 600000, standardInstallment2: 210000, premiumInstallment2: 315000 },
  GB: { standard: 995, premium: 1495, standardInstallment2: 520, premiumInstallment2: 780 },
  CA: { standard: 1750, premium: 2595, standardInstallment2: 915, premiumInstallment2: 1355 },
  US: { standard: 1295, premium: 1950, standardInstallment2: 675, premiumInstallment2: 1020 },
  OTHER: { standard: 1295, premium: 1950, standardInstallment2: 675, premiumInstallment2: 1020 },
};

export function getPricing(_pathway: PathwaySlug, region: Region): Pricing {
  return SHARED_PATHWAY_PRICING[region];
}

// ============================================================
// INTENSIVE PRICING — the two 5-week specialist intensives. Single price
// point each (no Standard/Premium split, no Capability Passport), with a
// discounted "bundled" price when added onto a pathway enrolment. Both
// intensives share the same per-region pricing today — update independently
// here if that should ever diverge.
// ============================================================

export interface IntensivePricing {
  standalone: number;
  bundled: number; // discounted price when added onto a pathway enrolment
}

const INTENSIVE_PRICING_BY_REGION: Record<Region, IntensivePricing> = {
  NG: { standalone: 250000, bundled: 180000 },
  GB: { standalone: 395, bundled: 295 },
  CA: { standalone: 690, bundled: 520 },
  US: { standalone: 495, bundled: 375 },
  OTHER: { standalone: 495, bundled: 375 }, // mirrors US, per existing convention
};

export const INTENSIVE_PRICING: Record<IntensiveSlug, Record<Region, IntensivePricing>> = {
  'ai-product-builder': INTENSIVE_PRICING_BY_REGION,
  'ba-for-ai-automation': INTENSIVE_PRICING_BY_REGION,
};

export function getIntensivePricing(intensive: IntensiveSlug, region: Region): IntensivePricing {
  return INTENSIVE_PRICING[intensive][region];
}

// Unified lookup across both programme families, for callers (nav, enrol
// flow) that don't need to care which kind of programme they're pricing.
// Pathways return {standard, premium}; intensives return {standalone, bundled}.
export function getProgrammePricing(slug: ProgrammeSlug, region: Region): Pricing | IntensivePricing {
  return isIntensiveSlug(slug) ? getIntensivePricing(slug, region) : getPricing(slug, region);
}

// ============================================================
// SITE METADATA
// ============================================================
export const SITE = {
  name: 'Upthrust',
  tagline: 'Build evidence of capability. Not another certificate.',
  url: 'https://upthrust-site.vercel.app', // UPDATE WHEN CUSTOM DOMAIN IS LIVE
  description: 'A 12-week practical accelerator for Product Management, Business Analysis, Product Design, and Payment Operations. Trained over 1,000 professionals globally since 2019.',
  email: 'info@upthrustdigital.com', // UPDATE TO YOUR REAL EMAIL
  twitter: '@upthrust',
  ogImage: '/og-image.png',
} as const;
