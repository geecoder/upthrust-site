'use client';

// The public analytics surface. Components call these, never mixpanel.track —
// so the taxonomy lives in one file, every payload is typed, and a rename is
// a compile error rather than a silent reporting gap.
//
// Nothing here reads pricing or programme data of its own: every amount and
// name is passed in by the caller from live application state, so analytics
// can never drift from what the visitor was actually shown.

import { EVENTS } from './types';
import type {
  AddOnSelectedProps, AssessmentCompletedProps, AssessmentStartedProps,
  AssessmentStepCompletedProps, CheckoutStartedProps, ConsultationFormStartedProps,
  ConsultationSubmittedProps, CtaClickedProps, CurriculumInteractedProps,
  EnrolmentStartedProps, FaqExpandedProps, PaymentPlanSelectedProps,
  PricingTierSelectedProps, ProgramViewedProps, VideoPlayedProps,
} from './types';
import { track, trackBeforeNavigation } from './mixpanel';

export const analytics = {
  /** A genuine view of a programme page. Fired once per page view. */
  programViewed: (p: ProgramViewedProps) => track(EVENTS.programViewed, { ...p }),

  /** Commercially meaningful calls to action only — not ordinary navigation. */
  ctaClicked: (p: CtaClickedProps) => track(EVENTS.ctaClicked, { ...p }),

  /** The question only. The answer is never sent. */
  faqExpanded: (p: FaqExpandedProps) => track(EVENTS.faqExpanded, { ...p }),

  /** User-initiated only — never the auto-advancing week carousel. */
  curriculumInteracted: (p: CurriculumInteractedProps) => track(EVENTS.curriculumInteracted, { ...p }),

  videoPlayed: (p: VideoPlayedProps) => track(EVENTS.videoPlayed, { ...p }),

  pricingTierSelected: (p: PricingTierSelectedProps) => track(EVENTS.pricingTierSelected, { ...p }),

  paymentPlanSelected: (p: PaymentPlanSelectedProps) => track(EVENTS.paymentPlanSelected, { ...p }),

  addOnSelected: (p: AddOnSelectedProps) => track(EVENTS.addOnSelected, { ...p }),

  /**
   * Fires when the assessment actually begins — after the intro form is
   * valid and submitted, never merely because /assessment was opened.
   * Carries no name or email.
   */
  assessmentStarted: (p: AssessmentStartedProps) => track(EVENTS.assessmentStarted, { ...p }),

  /** Scenario identity and position only — never the chosen answer text. */
  assessmentStepCompleted: (p: AssessmentStepCompletedProps) => track(EVENTS.assessmentStepCompleted, { ...p }),

  /** The recommendation, not the responses that produced it. */
  assessmentCompleted: (p: AssessmentCompletedProps) => track(EVENTS.assessmentCompleted, { ...p }),

  consultationFormStarted: (p: ConsultationFormStartedProps) => track(EVENTS.consultationFormStarted, { ...p }),

  /** Only after the submission is confirmed — never on button click. */
  consultationSubmitted: (p: ConsultationSubmittedProps) => track(EVENTS.consultationSubmitted, { ...p }),

  enrolmentStarted: (p: EnrolmentStartedProps) => track(EVENTS.enrolmentStarted, { ...p }),

  /**
   * The last client-side step before money moves. Uses the keepalive path so
   * the event survives a hand-off to an external payment provider, without
   * delaying the redirect.
   */
  checkoutStarted: (p: CheckoutStartedProps) => trackBeforeNavigation(EVENTS.checkoutStarted, { ...p }),
} as const;

export type Analytics = typeof analytics;
