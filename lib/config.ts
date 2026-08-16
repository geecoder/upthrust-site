// Single source of truth for Tally form IDs, payment links, and pricing.
// Edit this file to change form IDs or pricing across the whole site.

import type { PathwaySlug } from './cohort-config';

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
  GB: 'Stripe',
  CA: 'Stripe',
  US: 'Stripe',
  OTHER: 'Stripe',
};

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

function halved(amount: number): number {
  return Math.round(amount / 2);
}

// Per-pathway, per-region pricing. Rest-of-world ('OTHER') mirrors US pricing.
export const PATHWAY_PRICING: Record<PathwaySlug, Record<Region, Pricing>> = {
  'business-analysis': {
    NG: { standard: 350000, premium: 500000, standardInstallment2: halved(350000), premiumInstallment2: halved(500000) },
    GB: { standard: 595, premium: 895, standardInstallment2: halved(595), premiumInstallment2: halved(895) },
    CA: { standard: 995, premium: 1495, standardInstallment2: halved(995), premiumInstallment2: halved(1495) },
    US: { standard: 795, premium: 1195, standardInstallment2: halved(795), premiumInstallment2: halved(1195) },
    OTHER: { standard: 795, premium: 1195, standardInstallment2: halved(795), premiumInstallment2: halved(1195) },
  },
  'product-management': {
    NG: { standard: 375000, premium: 650000, standardInstallment2: halved(375000), premiumInstallment2: halved(650000) },
    GB: { standard: 695, premium: 995, standardInstallment2: halved(695), premiumInstallment2: halved(995) },
    CA: { standard: 1095, premium: 1595, standardInstallment2: halved(1095), premiumInstallment2: halved(1595) },
    US: { standard: 895, premium: 1295, standardInstallment2: halved(895), premiumInstallment2: halved(1295) },
    OTHER: { standard: 895, premium: 1295, standardInstallment2: halved(895), premiumInstallment2: halved(1295) },
  },
  'product-design': {
    NG: { standard: 300000, premium: 550000, standardInstallment2: halved(300000), premiumInstallment2: halved(550000) },
    GB: { standard: 695, premium: 995, standardInstallment2: halved(695), premiumInstallment2: halved(995) },
    CA: { standard: 1095, premium: 1595, standardInstallment2: halved(1095), premiumInstallment2: halved(1595) },
    US: { standard: 895, premium: 1295, standardInstallment2: halved(895), premiumInstallment2: halved(1295) },
    OTHER: { standard: 895, premium: 1295, standardInstallment2: halved(895), premiumInstallment2: halved(1295) },
  },
  'payment-operations': {
    NG: { standard: 400000, premium: 700000, standardInstallment2: halved(400000), premiumInstallment2: halved(700000) },
    GB: { standard: 795, premium: 1195, standardInstallment2: halved(795), premiumInstallment2: halved(1195) },
    CA: { standard: 1195, premium: 1795, standardInstallment2: halved(1195), premiumInstallment2: halved(1795) },
    US: { standard: 995, premium: 1495, standardInstallment2: halved(995), premiumInstallment2: halved(1495) },
    OTHER: { standard: 995, premium: 1495, standardInstallment2: halved(995), premiumInstallment2: halved(1495) },
  },
};

export function getPricing(pathway: PathwaySlug, region: Region): Pricing {
  return PATHWAY_PRICING[pathway][region];
}

// ============================================================
// PAYMENT LINKS — UPDATE THESE WITH YOUR PAYSTACK/STRIPE LINKS
// ============================================================
// After creating payment links in Paystack and Stripe, paste the URLs here.
// Leave as empty strings until you have real links — the buttons will fall back to consultation.

export const PAYMENT_LINKS = {
  NG: {
    standardFull: '', // Paystack standard full payment link
    standardInstallment: '', // Paystack standard installment 1 of 2
    premiumFull: '', // Paystack premium full payment link
    premiumInstallment: '', // Paystack premium installment 1 of 2
  },
  GB: {
    standardFull: '', // Stripe standard full GBP
    standardInstallment: '', // Stripe standard installment GBP
    premiumFull: '', // Stripe premium full GBP
    premiumInstallment: '', // Stripe premium installment GBP
  },
  CA: {
    standardFull: '',
    standardInstallment: '',
    premiumFull: '',
    premiumInstallment: '',
  },
  US: {
    standardFull: '',
    standardInstallment: '',
    premiumFull: '',
    premiumInstallment: '',
  },
  OTHER: {
    standardFull: '',
    standardInstallment: '',
    premiumFull: '',
    premiumInstallment: '',
  },
} as const;

// Helper: return the right payment link or fall back to consultation
export function getPaymentLink(region: Region, tier: 'standard' | 'premium', mode: 'full' | 'installment'): string {
  const key = `${tier}${mode === 'full' ? 'Full' : 'Installment'}` as keyof typeof PAYMENT_LINKS.NG;
  const link = PAYMENT_LINKS[region][key];
  return link || '/consultation';
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
