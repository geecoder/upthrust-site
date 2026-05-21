'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  captureUtmAttribution,
  initAnalytics,
  isAnalyticsEnabled,
  trackCTAClick,
  trackEvent,
  trackExternalLinkClick,
  trackPageView,
  trackTestEvent,
  type AnalyticsProperties,
} from '@/lib/analytics';
import {
  TRACKING_EVENTS,
  trackFormStarted,
  trackFormSubmissionFailed,
  trackFormSubmitted,
} from '@/lib/tracking-events';

declare global {
  interface Window {
    upthrustTrackTestEvent?: () => boolean;
    __upthrustDebugTestEventSent?: boolean;
  }
}

type SearchParamsLike = {
  get(name: string): string | null;
};

const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

export default function AnalyticsProvider() {
  useEffect(() => {
    initAnalytics();
    captureUtmAttribution();
    logDiagnostic(window.location.pathname, false, false);

    if (process.env.NODE_ENV !== 'development') return;

    window.upthrustTrackTestEvent = () => trackTestEvent();

    if (!window.__upthrustDebugTestEventSent) {
      window.__upthrustDebugTestEventSent = true;
      trackTestEvent();
    }

    return () => {
      delete window.upthrustTrackTestEvent;
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsRouteTracker />
      </Suspense>
      <AnalyticsInteractionTracker />
    </>
  );
}

function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const lastTrackedPageRef = useRef('');

  useEffect(() => {
    const pageKey = `${pathname}?${queryString}`;
    if (lastTrackedPageRef.current === pageKey) return;

    lastTrackedPageRef.current = pageKey;
    initAnalytics();
    captureUtmAttribution();

    const pageProperties = buildPageViewProperties(pathname, queryString, searchParams);
    const pageViewTracked = trackPageView(pathname, pageProperties);

    trackPageSpecificEvents(pathname, pageProperties);
    logDiagnostic(pathname, true, pageViewTracked);
  }, [pathname, queryString, searchParams]);

  return null;
}

function AnalyticsInteractionTracker() {
  useEffect(() => {
    const startedForms = new WeakSet<HTMLFormElement>();
    const recentlyFailedForms = new WeakSet<HTMLFormElement>();

    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const summary = target.closest('summary');
      if (summary) {
        trackFaqSummaryClick(summary);
        return;
      }

      const link = target.closest('a[href]');
      if (link instanceof HTMLAnchorElement) {
        trackLinkClick(link);
        return;
      }

      const button = target.closest('button');
      if (button instanceof HTMLButtonElement) {
        trackButtonClick(button);
      }
    }

    function handleFormStart(event: Event) {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) {
        return;
      }

      const form = target.form;
      if (!form || startedForms.has(form)) return;

      startedForms.add(form);
      trackFormStarted({
        ...getFormProperties(form),
        submission_status: 'started',
      });
    }

    function handleFormSubmit(event: SubmitEvent) {
      if (!(event.target instanceof HTMLFormElement)) return;

      trackFormSubmitted({
        ...getFormProperties(event.target),
        submission_status: 'submitted',
      });
    }

    function handleInvalid(event: Event) {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) {
        return;
      }

      const form = target.form;
      if (!form || recentlyFailedForms.has(form)) return;

      recentlyFailedForms.add(form);
      trackFormSubmissionFailed({
        ...getFormProperties(form),
        submission_status: 'validation_failed',
      });
      window.setTimeout(() => recentlyFailedForms.delete(form), 1000);
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('focusin', handleFormStart);
    document.addEventListener('input', handleFormStart);
    document.addEventListener('change', handleFormStart);
    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('invalid', handleInvalid, true);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('focusin', handleFormStart);
      document.removeEventListener('input', handleFormStart);
      document.removeEventListener('change', handleFormStart);
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('invalid', handleInvalid, true);
    };
  }, []);

  return null;
}

function buildPageViewProperties(
  pathname: string,
  queryString: string,
  searchParams: SearchParamsLike,
): AnalyticsProperties {
  return {
    page_path: pathname,
    page_url: window.location.href,
    page_title: document.title,
    search: window.location.search,
    referrer: document.referrer || '',
    query_string: queryString ? `?${queryString}` : '',
    device_type: getDeviceType(),
    utm_source: searchParams.get('utm_source') || undefined,
    utm_medium: searchParams.get('utm_medium') || undefined,
    utm_campaign: searchParams.get('utm_campaign') || undefined,
    utm_content: searchParams.get('utm_content') || undefined,
    utm_term: searchParams.get('utm_term') || undefined,
  };
}

function trackPageSpecificEvents(pathname: string, properties: AnalyticsProperties) {
  if (pathname === '/accelerator') {
    trackEvent(TRACKING_EVENTS.acceleratorPageViewed, {
      ...properties,
      program_name: 'Career Capability Accelerator',
      source_page: pathname,
      conversion_type: 'program_interest',
    });
  }

  if (pathname === '/assessment') {
    trackEvent(TRACKING_EVENTS.assessmentPageViewed, {
      ...properties,
      source_page: pathname,
      conversion_type: 'career_assessment',
    });
  }

  if (pathname === '/consultation') {
    trackEvent(TRACKING_EVENTS.consultationPageViewed, {
      ...properties,
      source_page: pathname,
      conversion_type: 'consultation',
    });
  }

  if (isPathwayPath(pathname)) {
    trackEvent(TRACKING_EVENTS.pathwayPageViewed, {
      ...properties,
      pathway_name: getPathwayName(pathname),
      program_name: 'Career Capability Accelerator',
      source_page: pathname,
      conversion_type: 'pathway_interest',
    });
  }

  if (pathname.startsWith('/thank-you/')) {
    const conversionType = getThankYouType(pathname);

    trackEvent(TRACKING_EVENTS.thankYouPageViewed, {
      ...properties,
      thank_you_type: conversionType,
      conversion_type: conversionType,
      source_page: pathname,
    });

    trackThankYouConversion(pathname, properties);
  }
}

function trackThankYouConversion(pathname: string, properties: AnalyticsProperties) {
  if (pathname === '/thank-you/assessment-complete') {
    trackEvent(TRACKING_EVENTS.careerAssessmentSubmitted, {
      ...properties,
      form_name: 'Career Assessment',
      submission_status: 'submitted',
      conversion_type: 'career_assessment',
    });
  }

  if (pathname === '/thank-you/consultation') {
    trackEvent(TRACKING_EVENTS.consultationSubmitted, {
      ...properties,
      form_name: 'Consultation Booking',
      submission_status: 'submitted',
      conversion_type: 'consultation',
    });
  }

  if (pathname === '/thank-you/waitlist') {
    trackEvent(TRACKING_EVENTS.waitlistJoined, {
      ...properties,
      form_name: 'Waitlist',
      submission_status: 'submitted',
      conversion_type: 'waitlist',
    });
  }

  if (pathname === '/thank-you/design-cohort-2') {
    trackEvent(TRACKING_EVENTS.waitlistJoined, {
      ...properties,
      form_name: 'Design Cohort 2 Waitlist',
      selected_pathway: 'Product Design',
      submission_status: 'submitted',
      conversion_type: 'design_waitlist',
    });
  }
}

function trackLinkClick(link: HTMLAnchorElement) {
  const destinationUrl = link.getAttribute('href') || link.href;
  const commonProperties = {
    ...getInteractionProperties(link, destinationUrl),
    ...getProgramProperties(destinationUrl, getElementText(link)),
  };

  if (isNavigationLink(link)) {
    trackEvent(TRACKING_EVENTS.navigationLinkClicked, commonProperties);
  }

  if (isCtaElement(link, destinationUrl)) {
    trackCTAClick(commonProperties);
  }

  if (isExternalInteraction(destinationUrl)) {
    trackExternalLinkClick({
      ...commonProperties,
      is_external: true,
    });

    classifyExternalLinkEvents(destinationUrl).forEach((eventName) => {
      trackEvent(eventName, commonProperties);
    });
  }

  getExplicitEventNames(link)
    .concat(classifyLinkEvents(link, destinationUrl))
    .forEach((eventName) => {
      trackEvent(eventName, commonProperties);
    });
}

function trackButtonClick(button: HTMLButtonElement) {
  const commonProperties = getInteractionProperties(button);

  if (isCtaElement(button)) {
    trackCTAClick(commonProperties);
  }

  getExplicitEventNames(button)
    .concat(classifyButtonEvents(button))
    .forEach((eventName) => {
      trackEvent(eventName, commonProperties);
    });
}

function trackFaqSummaryClick(summary: Element) {
  const details = summary.closest('details');
  if (details?.open) return;

  trackEvent(TRACKING_EVENTS.faqExpanded, {
    faq_question: getElementText(summary),
    source_page: window.location.pathname,
    section_name: getSectionName(summary),
  });
}

function classifyLinkEvents(link: HTMLAnchorElement, destinationUrl: string) {
  const events: string[] = [];
  const href = destinationUrl.toLowerCase();
  const label = getElementText(link).toLowerCase();
  const pathname = window.location.pathname;

  if (href.includes('/assessment')) {
    events.push(TRACKING_EVENTS.careerAssessmentCtaClicked);
  }

  if (href.includes('/accelerator')) {
    events.push(TRACKING_EVENTS.acceleratorCtaClicked);
  }

  if (href.includes('/consultation')) {
    events.push(TRACKING_EVENTS.consultationCtaClicked);
    events.push(TRACKING_EVENTS.consultationBookingCtaClicked);
  }

  if (pathname === '/assessment' && isCtaElement(link, destinationUrl)) {
    events.push(TRACKING_EVENTS.assessmentCtaClicked);
  }

  if (pathname === '/accelerator' && isAcceleratorApplyLabel(label)) {
    events.push(TRACKING_EVENTS.acceleratorApplyCtaClicked);
  }

  if (pathname === '/accelerator' && isFormDestination(destinationUrl)) {
    events.push(TRACKING_EVENTS.acceleratorFormLinkClicked);
  }

  if (isPathwayPath(pathname) && isCtaElement(link, destinationUrl)) {
    events.push(TRACKING_EVENTS.pathwayInterestClicked);
  }

  return uniqueEvents(events);
}

function classifyButtonEvents(button: HTMLButtonElement) {
  const events: string[] = [];
  const label = getElementText(button).toLowerCase();
  const pathname = window.location.pathname;

  if (pathname === '/assessment' && isAssessmentStartLabel(label)) {
    events.push(TRACKING_EVENTS.assessmentCtaClicked);
    events.push(TRACKING_EVENTS.assessmentStarted);
  }

  if (pathname === '/accelerator' && isAcceleratorApplyLabel(label)) {
    events.push(TRACKING_EVENTS.acceleratorApplyCtaClicked);
  }

  if (isPathwayPath(pathname) && isCtaElement(button)) {
    events.push(TRACKING_EVENTS.pathwayInterestClicked);
  }

  return uniqueEvents(events);
}

function classifyExternalLinkEvents(destinationUrl: string) {
  const events: string[] = [];
  const href = destinationUrl.toLowerCase();

  if (isExternalFormDestination(destinationUrl)) {
    events.push(TRACKING_EVENTS.externalFormOpened);
  }

  if (href.includes('calendly.com')) {
    events.push(TRACKING_EVENTS.calendlyOpened);
  }

  if (href.includes('whatsapp') || href.includes('wa.me')) {
    events.push(TRACKING_EVENTS.whatsAppClicked);
  }

  if (href.startsWith('mailto:')) {
    events.push(TRACKING_EVENTS.emailLinkClicked);
  }

  return uniqueEvents(events);
}

function getInteractionProperties(element: Element, destinationUrl?: string): AnalyticsProperties {
  const label = getElementText(element);

  return {
    cta_label: label,
    cta_text: label,
    source_page: window.location.pathname,
    destination_url: destinationUrl,
    destination_type: getDestinationType(destinationUrl),
    section_name: getSectionName(element),
    button_location: getButtonLocation(element),
    conversion_type: inferConversionType(destinationUrl || '', label),
    user_intent: inferUserIntent(destinationUrl || '', label),
  };
}

function getProgramProperties(destinationUrl: string, label: string): AnalyticsProperties {
  const href = destinationUrl.toLowerCase();
  const normalizedLabel = label.toLowerCase();
  const pathname = window.location.pathname;

  if (
    href.includes('/pathway-product-management') ||
    normalizedLabel.includes('product management') ||
    normalizedLabel.includes(' pm ') ||
    pathname === '/pathway-product-management'
  ) {
    return {
      pathway_name: 'Product Management',
      program_name: 'Career Capability Accelerator',
    };
  }

  if (
    href.includes('/pathway-business-analysis') ||
    normalizedLabel.includes('business analysis') ||
    normalizedLabel.includes(' ba ') ||
    pathname === '/pathway-business-analysis'
  ) {
    return {
      pathway_name: 'Business Analysis',
      program_name: 'Career Capability Accelerator',
    };
  }

  if (href.includes('/accelerator') || normalizedLabel.includes('accelerator') || normalizedLabel.includes('program')) {
    return {
      program_name: 'Career Capability Accelerator',
    };
  }

  return {};
}

function getFormProperties(form: HTMLFormElement): AnalyticsProperties {
  return {
    form_name: form.dataset.trackingName || getSectionName(form) || 'Website Form',
    source_page: window.location.pathname,
    number_of_fields: Array.from(form.elements).filter((element) =>
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement,
    ).length,
  };
}

function getExplicitEventNames(element: Element) {
  const eventNames = element.getAttribute('data-analytics-event');
  if (!eventNames) return [];

  return eventNames
    .split('|')
    .map((eventName) => eventName.trim())
    .filter(Boolean);
}

function isNavigationLink(link: HTMLAnchorElement) {
  return Boolean(link.closest('header, footer, nav'));
}

function isCtaElement(element: Element, destinationUrl = '') {
  if (element.hasAttribute('data-analytics-event')) return true;

  const className = element.getAttribute('class') || '';
  if (/\bbtn(?:-|$)/.test(className)) return true;

  const label = getElementText(element).toLowerCase();
  const href = destinationUrl.toLowerCase();

  return (
    href.includes('/assessment') ||
    href.includes('/accelerator') ||
    href.includes('/consultation') ||
    href.includes('/pathway') ||
    isExternalFormDestination(destinationUrl) ||
    /\b(apply|book|begin|enroll|explore|join|start|take)\b/.test(label)
  );
}

function isAssessmentStartLabel(label: string) {
  return label.includes('begin the assessment') || label.includes('start the assessment');
}

function isAcceleratorApplyLabel(label: string) {
  return /\b(apply|application|enroll|pay|checkout)\b/.test(label);
}

function isFormDestination(destinationUrl: string) {
  const href = destinationUrl.toLowerCase();

  return (
    href.includes('/assessment') ||
    href.includes('/consultation') ||
    isExternalFormDestination(destinationUrl)
  );
}

function isExternalFormDestination(destinationUrl: string) {
  const href = destinationUrl.toLowerCase();

  return (
    href.includes('tally.so') ||
    href.includes('forms.gle') ||
    href.includes('docs.google.com/forms') ||
    href.includes('typeform.com')
  );
}

function isPathwayPath(pathname: string) {
  return pathname === '/pathway-product-management' || pathname === '/pathway-business-analysis';
}

function getPathwayName(pathname: string) {
  if (pathname === '/pathway-product-management') return 'Product Management';
  if (pathname === '/pathway-business-analysis') return 'Business Analysis';
  return undefined;
}

function getDeviceType() {
  const width = window.innerWidth;
  const userAgent = window.navigator.userAgent;

  if (/Mobi|Android|iPhone|iPod/i.test(userAgent) || width < 768) return 'mobile';
  if (/iPad|Tablet/i.test(userAgent) || width < 1024) return 'tablet';
  return 'desktop';
}

function getElementText(element: Element) {
  return (element.textContent || '')
    .replace(EMAIL_PATTERN, '[email]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
}

function getSectionName(element: Element) {
  const container = element.closest('header, footer, section, nav');
  if (!container) return undefined;

  const tagName = container.tagName.toLowerCase();
  if (tagName === 'header') return 'Header';
  if (tagName === 'footer') return 'Footer';
  if (tagName === 'nav') return 'Navigation';

  const heading = container.querySelector('h1, h2, h3, .eyebrow, .eyebrow-light');
  return heading ? getElementText(heading) : undefined;
}

function getButtonLocation(element: Element) {
  if (element.closest('header')) return 'header';
  if (element.closest('footer')) return 'footer';
  if (element.closest('nav')) return 'navigation';
  if (element.closest('section')) return 'page_section';
  return 'page_body';
}

function getDestinationType(destinationUrl?: string) {
  if (!destinationUrl) return 'action';

  const href = destinationUrl.toLowerCase();
  if (href.startsWith('mailto:')) return 'email';
  if (href.includes('whatsapp') || href.includes('wa.me')) return 'whatsapp';
  if (href.includes('calendly.com')) return 'calendly';
  if (isExternalFormDestination(destinationUrl)) return 'external_form';
  if (href.startsWith('#')) return 'hash';
  if (isExternalHttpDestination(destinationUrl)) return 'external';
  return 'internal';
}

function isExternalInteraction(destinationUrl: string) {
  const destinationType = getDestinationType(destinationUrl);
  return destinationType !== 'internal' && destinationType !== 'hash';
}

function isExternalHttpDestination(destinationUrl: string) {
  try {
    const url = new URL(destinationUrl, window.location.origin);
    return (url.protocol === 'http:' || url.protocol === 'https:') && url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function inferConversionType(destinationUrl: string, label: string) {
  const href = destinationUrl.toLowerCase();
  const normalizedLabel = label.toLowerCase();

  if (href.includes('/assessment') || normalizedLabel.includes('assessment')) return 'career_assessment';
  if (href.includes('/consultation') || normalizedLabel.includes('consultation') || href.includes('calendly.com')) {
    return 'consultation';
  }
  if (isExternalFormDestination(destinationUrl)) return 'external_form';
  if (isPathwayPath(href)) return 'pathway_interest';
  if (href.includes('/accelerator') || normalizedLabel.includes('accelerator')) return 'program_interest';
  if (isAcceleratorApplyLabel(normalizedLabel)) return 'application';
  return undefined;
}

function inferUserIntent(destinationUrl: string, label: string) {
  const href = destinationUrl.toLowerCase();
  const normalizedLabel = label.toLowerCase();

  if (href.includes('/assessment') || normalizedLabel.includes('assessment')) return 'career_fit';
  if (href.includes('/consultation') || normalizedLabel.includes('consultation') || href.includes('calendly.com')) {
    return 'speak_to_team';
  }
  if (href.includes('/accelerator') || normalizedLabel.includes('program') || normalizedLabel.includes('accelerator')) {
    return 'program_research';
  }
  if (href.includes('/pathway')) return 'pathway_research';
  if (isAcceleratorApplyLabel(normalizedLabel)) return 'application';
  if (href.startsWith('mailto:') || href.includes('whatsapp') || href.includes('wa.me')) return 'external_contact';
  return 'navigation';
}

function getThankYouType(pathname: string) {
  if (pathname.includes('assessment')) return 'career_assessment';
  if (pathname.includes('consultation')) return 'consultation';
  if (pathname.includes('design-cohort-2')) return 'design_waitlist';
  if (pathname.includes('waitlist')) return 'waitlist';
  return 'thank_you';
}

function uniqueEvents(eventNames: string[]) {
  return [...new Set(eventNames)];
}

function logDiagnostic(pathname: string, pageViewAttempted: boolean, pageViewTracked: boolean) {
  if (process.env.NODE_ENV !== 'development') return;

  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

  console.info('[analytics] diagnostics', {
    analytics_provider_mounted: true,
    token_present: Boolean(token),
    token_prefix: token ? token.slice(0, 4) : '',
    mixpanel_initialised: isAnalyticsEnabled(),
    current_pathname: pathname,
    page_view_attempted: pageViewAttempted,
    page_view_tracked: pageViewTracked,
  });
}
