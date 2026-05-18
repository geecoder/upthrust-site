// Single source of truth for Tally form IDs, payment links, and pricing.
// Edit this file to change form IDs or pricing across the whole site.

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
// PRICING — UPDATE THESE WITH YOUR FINAL COHORT 1 PRICES
// ============================================================
// These are the recommended Cohort 1 prices from the delivery pack.
// Update as needed before going live.

export type Region = 'NG' | 'GB' | 'CA' | 'AU' | 'OTHER';

export interface Pricing {
  currency: string;
  symbol: string;
  standard: number;
  premium: number;
  standardInstallment2: number; // amount for first installment in 2-pay plan
  premiumInstallment2: number;
}

export const PRICING: Record<Region, Pricing> = {
  NG: {
    currency: 'NGN',
    symbol: '₦',
    standard: 350000,
    premium: 600000,
    standardInstallment2: 175000,
    premiumInstallment2: 300000,
  },
  GB: {
    currency: 'GBP',
    symbol: '£',
    standard: 750,
    premium: 1250,
    standardInstallment2: 375,
    premiumInstallment2: 625,
  },
  CA: {
    currency: 'CAD',
    symbol: 'C$',
    standard: 1200,
    premium: 2000,
    standardInstallment2: 600,
    premiumInstallment2: 1000,
  },
  AU: {
    currency: 'AUD',
    symbol: 'A$',
    standard: 1250,
    premium: 2000,
    standardInstallment2: 625,
    premiumInstallment2: 1000,
  },
  OTHER: {
    currency: 'USD',
    symbol: '$',
    standard: 950,
    premium: 1600,
    standardInstallment2: 475,
    premiumInstallment2: 800,
  },
};

// Format a price like "₦350,000" or "£750"
export function formatPrice(amount: number, region: Region): string {
  const p = PRICING[region];
  return `${p.symbol}${amount.toLocaleString()}`;
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
  AU: {
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
  description: 'A 12-week practical accelerator for Product Management and Business Analysis. Trained over 1,000 professionals globally since 2019.',
  email: 'hello@upthrust.io', // UPDATE TO YOUR REAL EMAIL
  twitter: '@upthrust',
  ogImage: '/og-image.png',
} as const;
