import { z } from 'zod';
import { validateLeadEmail, validateLeadName } from '@/lib/validation/lead';

// Runtime mirrors of the ProgrammeSlug/Region/Tier/Plan union types in
// lib/cohort-config.ts / lib/config.ts / lib/pricing.ts — zod needs literal
// values, not TS types, so these are kept in sync by hand. If a new
// pathway/intensive/region is ever added, update both places.
export const PROGRAMME_SLUGS = [
  'product-management',
  'business-analysis',
  'product-design',
  'payment-operations',
  'ai-product-builder',
  'ba-for-ai-automation',
] as const;

export const REGIONS = ['NG', 'GB', 'CA', 'US', 'OTHER'] as const;
export const TIERS = ['standard', 'premium'] as const;
export const PLANS = ['full', 'installment'] as const;

// `region` is deliberately absent. The amount was already recomputed here
// rather than trusted from the client — but it was recomputed *from a
// client-supplied region*, which is the same hole one step removed: posting
// region "NG" bought a UK enrolment at Nigerian prices. The route now resolves
// the region from the request's own geo headers and ignores anything sent.
export const enrolInitSchema = z.object({
  programmeSlug: z.enum(PROGRAMME_SLUGS),
  tier: z.enum(TIERS).nullable(), // null for intensives
  plan: z.enum(PLANS),
  // Same rules the assessment form applies in the browser, re-applied here.
  // The client-side check is a courtesy to whoever is filling the form; this
  // is the one that actually holds, since anything can POST to this route.
  // superRefine rather than refine so the specific message survives.
  leadName: z.string().trim().superRefine((v, ctx) => {
    const msg = validateLeadName(v);
    if (msg) ctx.addIssue({ code: 'custom', message: msg });
  }),
  leadEmail: z.string().trim().toLowerCase().superRefine((v, ctx) => {
    const msg = validateLeadEmail(v);
    if (msg) ctx.addIssue({ code: 'custom', message: msg });
  }),
  // Analytics correlation only. Optional by design: a visitor who blocks
  // Mixpanel must still be able to enrol.
  analyticsDistinctId: z.string().trim().max(128).optional().nullable(),
});

export type EnrolInitInput = z.infer<typeof enrolInitSchema>;

export const enrolStatusSchema = z.object({
  reference: z.string().trim().min(1).max(64),
});

export const markTransferConfirmedSchema = z.object({
  reference: z.string().trim().min(1).max(64),
});
