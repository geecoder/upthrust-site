import { trackEvent, type AnalyticsProperties } from '@/lib/analytics';

export const TRACKING_EVENTS = {
  // Enrolment funnel on the pathway pages. These four are the ones that answer
  // "who is trying to pay, for what, and did they finish":
  //   Enrol CTA Clicked  -> reached the pricing section
  //   Tier Selected / Plan Selected / Add-On Toggled -> shaped the purchase
  //   Bank Details Requested -> asked for the account (strongest intent)
  //   Payment Declared -> opened the confirmation email having transferred
  enrolCtaClicked: 'Enrol CTA Clicked',
  pricingSectionViewed: 'Pricing Section Viewed',
  tierSelected: 'Tier Selected',
  planSelected: 'Plan Selected',
  addOnToggled: 'Add-On Toggled',
  bankDetailsRequested: 'Bank Details Requested',
  bankDetailCopied: 'Bank Detail Copied',
  paymentDeclared: 'Payment Declared',
  pageViewed: 'Page Viewed',
  navigationLinkClicked: 'Navigation Link Clicked',
  ctaClicked: 'CTA Clicked',
  mixpanelDebugTestEvent: 'Mixpanel Debug Test Event',
  heroCtaClicked: 'Hero CTA Clicked',
  careerAssessmentCtaClicked: 'Career Assessment CTA Clicked',
  acceleratorCtaClicked: 'Accelerator CTA Clicked',
  consultationCtaClicked: 'Consultation CTA Clicked',
  acceleratorPageViewed: 'Accelerator Page Viewed',
  acceleratorApplyCtaClicked: 'Accelerator Apply CTA Clicked',
  acceleratorFormLinkClicked: 'Accelerator Form Link Clicked',
  assessmentPageViewed: 'Assessment Page Viewed',
  assessmentStarted: 'Assessment Started',
  assessmentCtaClicked: 'Assessment CTA Clicked',
  consultationPageViewed: 'Consultation Page Viewed',
  consultationBookingCtaClicked: 'Consultation Booking CTA Clicked',
  pathwayPageViewed: 'Pathway Page Viewed',
  pathwayInterestClicked: 'Pathway Interest Clicked',
  externalFormOpened: 'External Form Opened',
  calendlyOpened: 'Calendly Opened',
  emailLinkClicked: 'Email Link Clicked',
  careerAssessmentStarted: 'Assessment Started',
  careerAssessmentSubmitted: 'Career Assessment Submitted',
  consultationClicked: 'Consultation Booking CTA Clicked',
  consultationSubmitted: 'Consultation Submitted',
  applicationStarted: 'Application Started',
  applicationSubmitted: 'Application Submitted',
  waitlistJoined: 'Waitlist Joined',
  contactFormSubmitted: 'Contact Form Submitted',
  acceleratorViewed: 'Accelerator Page Viewed',
  programViewed: 'Program Viewed',
  programInterestClicked: 'Program Interest Clicked',
  pathwayViewed: 'Pathway Page Viewed',
  pathwayCtaClicked: 'Pathway CTA Clicked',
  pricingViewed: 'Pricing Viewed',
  paymentIntentClicked: 'Payment Intent Clicked',
  checkoutStarted: 'Checkout Started',
  checkoutCompleted: 'Checkout Completed',
  whatsAppClicked: 'WhatsApp Clicked',
  emailClicked: 'Email Link Clicked',
  externalLinkClicked: 'External Link Clicked',
  linkedInClicked: 'LinkedIn Clicked',
  thankYouPageViewed: 'Thank You Page Viewed',
  resourceViewed: 'Resource Viewed',
  downloadClicked: 'Download Clicked',
  faqExpanded: 'FAQ Expanded',
  formStarted: 'Form Started',
  formSubmitted: 'Form Submitted',
  formSubmissionFailed: 'Form Submission Failed',
} as const;

export type TrackingEventName = (typeof TRACKING_EVENTS)[keyof typeof TRACKING_EVENTS];

export function trackCtaClick(eventName: TrackingEventName, properties: AnalyticsProperties) {
  trackEvent(eventName, properties);
}

export function trackFormStarted(properties: AnalyticsProperties) {
  trackEvent(TRACKING_EVENTS.formStarted, properties);
}

export function trackFormSubmitted(properties: AnalyticsProperties) {
  trackEvent(TRACKING_EVENTS.formSubmitted, properties);
}

export function trackFormSubmissionFailed(properties: AnalyticsProperties) {
  trackEvent(TRACKING_EVENTS.formSubmissionFailed, properties);
}
