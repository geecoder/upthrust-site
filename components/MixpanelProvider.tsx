'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { captureAttribution, initMixpanel, trackEvent, type MixpanelProperties } from '@/lib/mixpanel';
import {
  TRACKING_EVENTS,
  trackFormStarted,
  trackFormSubmissionFailed,
  trackFormSubmitted,
  trackNavigationLinkClicked,
} from '@/lib/tracking-events';

interface Props {
  children: React.ReactNode;
}

type SearchParamsLike = {
  get(name: string): string | null;
};

const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

export default function MixpanelProvider({ children }: Props) {
  useEffect(() => {
    initMixpanel();
    captureAttribution();
  }, []);

  return (
    <>
      {children}
      <Suspense fallback={null}>
        <MixpanelRouteTracker />
      </Suspense>
      <MixpanelInteractionTracker />
    </>
  );
}

function MixpanelRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const lastTrackedUrlRef = useRef('');

  useEffect(() => {
    const pageKey = `${pathname}?${queryString}`;
    if (lastTrackedUrlRef.current === pageKey) return;

    lastTrackedUrlRef.current = pageKey;
    initMixpanel();
    captureAttribution();

    const pageProperties = buildPageViewProperties(pathname, queryString, searchParams);
    trackEvent(TRACKING_EVENTS.pageViewed, pageProperties);
    trackPageSpecificEvents(pathname, pageProperties);
  }, [pathname, queryString, searchParams]);

  return null;
}

function MixpanelInteractionTracker() {
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
): MixpanelProperties {
  return {
    page_path: pathname,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    page_title: typeof document !== 'undefined' ? document.title : '',
    query_string: queryString ? `?${queryString}` : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    device_type: getDeviceType(),
    utm_source: searchParams.get('utm_source') || undefined,
    utm_medium: searchParams.get('utm_medium') || undefined,
    utm_campaign: searchParams.get('utm_campaign') || undefined,
    utm_content: searchParams.get('utm_content') || undefined,
    utm_term: searchParams.get('utm_term') || undefined,
  };
}

function trackPageSpecificEvents(pathname: string, properties: MixpanelProperties) {
  if (pathname === '/accelerator') {
    const programProperties = {
      ...properties,
      program_name: 'Career Capability Accelerator',
      source_page: pathname,
    };
    trackEvent(TRACKING_EVENTS.acceleratorViewed, programProperties);
    trackEvent(TRACKING_EVENTS.programViewed, programProperties);
  }

  if (pathname === '/pathway-product-management') {
    trackEvent(TRACKING_EVENTS.pathwayViewed, {
      ...properties,
      pathway_name: 'Product Management',
      program_name: 'Career Capability Accelerator',
      source_page: pathname,
    });
  }

  if (pathname === '/pathway-business-analysis') {
    trackEvent(TRACKING_EVENTS.pathwayViewed, {
      ...properties,
      pathway_name: 'Business Analysis',
      program_name: 'Career Capability Accelerator',
      source_page: pathname,
    });
  }

  if (pathname === '/thank-you/assessment-complete') {
    trackEvent(TRACKING_EVENTS.careerAssessmentSubmitted, {
      ...properties,
      form_name: 'Career Assessment',
      submission_status: 'submitted',
    });
  }

  if (pathname === '/thank-you/consultation') {
    trackEvent(TRACKING_EVENTS.consultationSubmitted, {
      ...properties,
      form_name: 'Consultation Booking',
      submission_status: 'submitted',
    });
  }

  if (pathname === '/thank-you/waitlist') {
    trackEvent(TRACKING_EVENTS.waitlistJoined, {
      ...properties,
      form_name: 'Waitlist',
      submission_status: 'submitted',
    });
  }

  if (pathname === '/thank-you/design-cohort-2') {
    trackEvent(TRACKING_EVENTS.waitlistJoined, {
      ...properties,
      form_name: 'Design Cohort 2 Waitlist',
      selected_pathway: 'Product Design',
      submission_status: 'submitted',
    });
  }
}

function trackLinkClick(link: HTMLAnchorElement) {
  const destinationUrl = link.getAttribute('href') || link.href;
  const commonProperties = getInteractionProperties(link, destinationUrl);

  trackNavigationLinkClicked({
    ...commonProperties,
    link_text: commonProperties.cta_text,
    link_type: getLinkType(destinationUrl),
    is_external: isExternalDestination(destinationUrl),
  });

  const eventNames = classifyLink(destinationUrl, String(commonProperties.cta_text || ''));
  eventNames.forEach((eventName) => {
    trackEvent(eventName, {
      ...commonProperties,
      ...getProgramProperties(destinationUrl, String(commonProperties.cta_text || '')),
    });
  });
}

function trackButtonClick(button: HTMLButtonElement) {
  if (button.closest('form')) return;

  const text = getElementText(button);
  const commonProperties = getInteractionProperties(button);
  const eventNames = classifyButton(text);

  eventNames.forEach((eventName) => {
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

function classifyLink(destinationUrl: string, text: string) {
  const href = destinationUrl.toLowerCase();
  const normalizedText = text.toLowerCase();
  const events: string[] = [];

  if (href.startsWith('mailto:')) events.push(TRACKING_EVENTS.emailClicked);
  if (href.includes('whatsapp') || href.includes('wa.me')) events.push(TRACKING_EVENTS.whatsAppClicked);
  if (href.includes('linkedin.com')) events.push(TRACKING_EVENTS.linkedInClicked);
  if (isDownload(destinationUrl)) events.push(TRACKING_EVENTS.downloadClicked);

  if (href.includes('/assessment') || normalizedText.includes('assessment')) {
    events.push(TRACKING_EVENTS.careerAssessmentStarted);
  }

  if (href.includes('/consultation') || normalizedText.includes('consultation')) {
    events.push(TRACKING_EVENTS.consultationClicked);
  }

  if (href.includes('/accelerator') || normalizedText.includes('accelerator') || normalizedText.includes('program')) {
    events.push(TRACKING_EVENTS.programInterestClicked);
  }

  if (href.includes('/pathway-product-management') || href.includes('/pathway-business-analysis')) {
    events.push(TRACKING_EVENTS.pathwayCtaClicked);
  }

  if (normalizedText.includes('apply') || normalizedText.includes('application')) {
    events.push(TRACKING_EVENTS.applicationStarted);
  }

  if (normalizedText.includes('waitlist')) {
    events.push(TRACKING_EVENTS.programInterestClicked);
  }

  if (normalizedText.includes('enroll') || normalizedText.includes('pay') || normalizedText.includes('checkout')) {
    events.push(TRACKING_EVENTS.paymentIntentClicked);
    if (isExternalDestination(destinationUrl)) {
      events.push(TRACKING_EVENTS.checkoutStarted);
    }
  }

  return [...new Set(events)];
}

function classifyButton(text: string) {
  const normalizedText = text.toLowerCase();
  const events: string[] = [];

  if (normalizedText.includes('begin the assessment') || normalizedText.includes('start the assessment')) {
    events.push(TRACKING_EVENTS.careerAssessmentStarted);
  }

  if (normalizedText.includes('apply') || normalizedText.includes('application')) {
    events.push(TRACKING_EVENTS.applicationStarted);
  }

  return events;
}

function getInteractionProperties(element: Element, destinationUrl?: string): MixpanelProperties {
  const text = getElementText(element);

  return {
    cta_text: text,
    source_page: window.location.pathname,
    destination_url: destinationUrl,
    section_name: getSectionName(element),
    button_location: getButtonLocation(element),
    user_intent: inferUserIntent(destinationUrl || '', text),
  };
}

function getProgramProperties(destinationUrl: string, text: string): MixpanelProperties {
  const href = destinationUrl.toLowerCase();
  const normalizedText = text.toLowerCase();

  if (href.includes('/pathway-product-management') || normalizedText.includes('product management') || normalizedText.includes('pm')) {
    return {
      pathway_name: 'Product Management',
      program_name: 'Career Capability Accelerator',
    };
  }

  if (href.includes('/pathway-business-analysis') || normalizedText.includes('business analysis') || normalizedText.includes('ba')) {
    return {
      pathway_name: 'Business Analysis',
      program_name: 'Career Capability Accelerator',
    };
  }

  if (href.includes('/accelerator') || normalizedText.includes('accelerator') || normalizedText.includes('program')) {
    return {
      program_name: 'Career Capability Accelerator',
    };
  }

  return {};
}

function getFormProperties(form: HTMLFormElement): MixpanelProperties {
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

function getDeviceType() {
  if (typeof window === 'undefined') return undefined;
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

function inferUserIntent(destinationUrl: string, text: string) {
  const href = destinationUrl.toLowerCase();
  const normalizedText = text.toLowerCase();

  if (href.includes('/assessment') || normalizedText.includes('assessment')) return 'career_fit';
  if (href.includes('/consultation') || normalizedText.includes('consultation')) return 'speak_to_team';
  if (href.includes('/accelerator') || normalizedText.includes('program') || normalizedText.includes('accelerator')) return 'program_research';
  if (href.includes('/pathway')) return 'pathway_research';
  if (normalizedText.includes('enroll') || normalizedText.includes('pay')) return 'payment';
  if (href.startsWith('mailto:') || href.includes('whatsapp') || href.includes('wa.me') || href.includes('linkedin.com')) return 'external_contact';

  return 'navigation';
}

function getLinkType(destinationUrl: string) {
  const href = destinationUrl.toLowerCase();

  if (href.startsWith('mailto:')) return 'email';
  if (href.includes('whatsapp') || href.includes('wa.me')) return 'whatsapp';
  if (href.startsWith('http') && isExternalDestination(destinationUrl)) return 'external';
  if (isDownload(destinationUrl)) return 'download';
  return 'internal';
}

function isExternalDestination(destinationUrl: string) {
  try {
    const url = new URL(destinationUrl, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function isDownload(destinationUrl: string) {
  return /\.(pdf|doc|docx|xls|xlsx|csv|zip)(\?|#|$)/i.test(destinationUrl);
}
