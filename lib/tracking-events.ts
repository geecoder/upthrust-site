import { trackEvent, type MixpanelProperties } from '@/lib/mixpanel';

export const TRACKING_EVENTS = {
  pageViewed: 'Page Viewed',
  careerAssessmentStarted: 'Career Assessment Started',
  careerAssessmentSubmitted: 'Career Assessment Submitted',
  consultationClicked: 'Consultation Clicked',
  consultationSubmitted: 'Consultation Submitted',
  applicationStarted: 'Application Started',
  applicationSubmitted: 'Application Submitted',
  waitlistJoined: 'Waitlist Joined',
  contactFormSubmitted: 'Contact Form Submitted',
  acceleratorViewed: 'Accelerator Viewed',
  programViewed: 'Program Viewed',
  programInterestClicked: 'Program Interest Clicked',
  pathwayViewed: 'Pathway Viewed',
  pathwayCtaClicked: 'Pathway CTA Clicked',
  pricingViewed: 'Pricing Viewed',
  paymentIntentClicked: 'Payment Intent Clicked',
  checkoutStarted: 'Checkout Started',
  checkoutCompleted: 'Checkout Completed',
  whatsAppClicked: 'WhatsApp Clicked',
  emailClicked: 'Email Clicked',
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

export function trackCtaClick(eventName: TrackingEventName, properties: MixpanelProperties) {
  trackEvent(eventName, properties);
}

export function trackFormStarted(properties: MixpanelProperties) {
  trackEvent(TRACKING_EVENTS.formStarted, properties);
}

export function trackFormSubmitted(properties: MixpanelProperties) {
  trackEvent(TRACKING_EVENTS.formSubmitted, properties);
}

export function trackFormSubmissionFailed(properties: MixpanelProperties) {
  trackEvent(TRACKING_EVENTS.formSubmissionFailed, properties);
}
