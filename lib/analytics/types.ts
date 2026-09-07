// The analytics domain model.
//
// Where the application already has a type, it is reused rather than
// redeclared — ProgramSlug is the app's own ProgrammeSlug, so a new pathway
// added to lib/cohort-config.ts is immediately valid here and a typo is not.
// Only the shapes that are genuinely analytics-specific (normalised payment
// plans, environment names, event property bags) are defined here.

import type { ProgrammeSlug } from '@/lib/cohort-config';

export type ProgramSlug = ProgrammeSlug;

export type ProgramType = 'pathway' | 'intensive';

/** 'single' is an intensive, which has no Standard/Premium split. */
export type AnalyticsTier = 'standard' | 'premium' | 'single';

/**
 * Normalised for reporting. The application speaks 'p2' in the pathway pages
 * and 'installment' in the payments layer; both land here as 'installments'
 * so a funnel does not have to know which surface produced the event.
 */
export type PaymentPlan = 'full' | 'installments';

export type PaymentMethod = 'bank_transfer' | 'paystack' | 'stripe';

export type Environment = 'development' | 'preview' | 'production';

export type PageType =
  | 'home'
  | 'program'
  | 'accelerator'
  | 'assessment'
  | 'about'
  | 'consultation'
  | 'enrol'
  | 'other';

export type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsProperties = Record<string, AnalyticsValue>;

/** Attached to every custom event by the client tracker. */
export type SuperProperties = {
  site: 'upthrust_web';
  environment: Environment;
};

export type ProgramContext = {
  program_slug: ProgramSlug;
  program_name: string;
  program_type: ProgramType;
};

// ── Event payloads ────────────────────────────────────────
// One type per event in the taxonomy. Every public analytics function takes
// one of these, so a missing or misnamed property is a compile error rather
// than a gap discovered in Mixpanel three weeks later.

export type ProgramViewedProps = ProgramContext & { page_path?: string };

export type CtaLocation =
  | 'homepage_hero' | 'homepage_pathways' | 'homepage_programmes' | 'homepage_bottom'
  | 'program_hero' | 'program_pricing' | 'program_curriculum' | 'program_faq' | 'program_bottom'
  | 'accelerator_hero' | 'accelerator_bottom'
  | 'assessment_intro' | 'assessment_result'
  | 'about_bottom'
  | 'navigation' | 'footer'
  | 'enrol_configure' | 'enrol_payment';

export type CtaClickedProps = {
  cta_name: string;
  cta_location: CtaLocation;
  destination?: string;
  program_slug?: ProgramSlug;
  tier?: AnalyticsTier;
  page_path?: string;
};

export type FaqExpandedProps = {
  faq_id: string;
  faq_question: string;
  program_slug?: ProgramSlug;
  page_path?: string;
};

export type CurriculumInteractedProps = {
  program_slug?: ProgramSlug;
  week_number?: number;
  curriculum_phase?: string;
  artefact_name?: string;
};

export type VideoPlayedProps = {
  video_id: string;
  video_name: string;
  video_location: string;
  program_slug?: ProgramSlug;
};

export type PricingTierSelectedProps = {
  program_slug: ProgramSlug;
  tier: AnalyticsTier;
  amount: number;
  currency: string;
  cohort?: number | string;
};

export type PaymentPlanSelectedProps = {
  program_slug: ProgramSlug;
  tier: AnalyticsTier;
  payment_plan: PaymentPlan;
  amount_due_now?: number;
  total_amount?: number;
  currency?: string;
};

export type AddOnSelectedProps = {
  program_slug: ProgramSlug;
  addon_slug: string;
  addon_name: string;
  amount: number;
  currency: string;
  selected: boolean;
};

export type AssessmentStartedProps = { source_page: string; total_steps: number };

export type AssessmentStepCompletedProps = {
  step_number: number;
  total_steps: number;
  scenario_id: string;
};

export type AssessmentCompletedProps = {
  recommended_program: ProgramSlug | string;
  total_steps: number;
  duration_seconds: number;
};

export type ConsultationFormStartedProps = { source_page: string; program_interest?: string };

// The taster session is a free open evening before enrolment closes, so a
// registration is a lead rather than a purchase — it sits alongside the
// assessment and consultation as a top-of-funnel signal, not in the checkout
// path. Two events rather than folding it into CTA Clicked, because the point
// is measuring completed registrations against form starts.
export type TasterFormStartedProps = { source_page: 'landing' | 'assessment' | 'program_pricing' };
export type TasterSessionRegisteredProps = {
  source_page: 'landing' | 'assessment' | 'program_pricing';
  /** The programme page the form was embedded on, where there is one. */
  program_slug?: ProgramSlug;
};
export type ConsultationSubmittedProps = { source_page: string; program_interest?: string };

export type EnrolmentStartedProps = ProgramContext & {
  cohort?: number | string;
  tier: AnalyticsTier;
  payment_plan: PaymentPlan;
  currency: string;
};

export type CheckoutStartedProps = {
  program_slug: ProgramSlug;
  tier: AnalyticsTier;
  payment_plan: PaymentPlan;
  amount_due_now: number;
  total_amount: number;
  currency: string;
  cohort?: number | string;
  payment_method: PaymentMethod;
  order_id?: string;
};

/** Emitted server-side only — see lib/analytics/server.ts. */
export type EnrolmentCompletedProps = {
  order_id: string;
  program_slug: ProgramSlug;
  program_name: string;
  tier: AnalyticsTier;
  payment_plan: PaymentPlan;
  payment_method: PaymentMethod;
  revenue: number;
  currency: string;
  cohort?: number | string;
};

/** Emitted server-side only. */
export type PaymentFailedProps = {
  order_id: string;
  program_slug: ProgramSlug;
  tier: AnalyticsTier;
  payment_plan: PaymentPlan;
  payment_method: PaymentMethod;
  failure_type: string;
  currency: string;
};

export const EVENTS = {
  programViewed: 'Program Viewed',
  ctaClicked: 'CTA Clicked',
  faqExpanded: 'FAQ Expanded',
  curriculumInteracted: 'Curriculum Interacted',
  videoPlayed: 'Video Played',
  pricingTierSelected: 'Pricing Tier Selected',
  paymentPlanSelected: 'Payment Plan Selected',
  addOnSelected: 'Add-on Selected',
  assessmentStarted: 'Assessment Started',
  assessmentStepCompleted: 'Assessment Step Completed',
  assessmentCompleted: 'Assessment Completed',
  tasterFormStarted: 'Taster Form Started',
  tasterSessionRegistered: 'Taster Session Registered',
  consultationFormStarted: 'Consultation Form Started',
  consultationSubmitted: 'Consultation Submitted',
  enrolmentStarted: 'Enrolment Started',
  checkoutStarted: 'Checkout Started',
  enrolmentCompleted: 'Enrolment Completed',
  paymentFailed: 'Payment Failed',
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
