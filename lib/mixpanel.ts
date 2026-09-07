'use client';

import mixpanel from 'mixpanel-browser';
import { initAnalytics } from '@/lib/analytics-legacy';

export type {
  AnalyticsProperties as MixpanelProperties,
  AnalyticsValue as MixpanelValue,
} from '@/lib/analytics-legacy';

export {
  captureUtmAttribution as captureAttribution,
  initAnalytics as initMixpanel,
  isAnalyticsEnabled,
  trackCTAClick,
  trackEvent,
  trackExternalLinkClick,
  trackPageView,
  trackDebugEvent,
  trackTestEvent,
  getAnalyticsDiagnostics,
  sendMixpanelHttpFallbackTest,
} from '@/lib/analytics-legacy';

export function identifyUser(userId: string, properties = {}) {
  if (typeof window === 'undefined' || !userId) return;
  if (!initAnalytics()) return;

  mixpanel.identify(userId);

  if (Object.keys(properties).length > 0) {
    mixpanel.people.set(properties);
  }
}

export function resetMixpanel() {
  if (typeof window === 'undefined') return;
  if (!initAnalytics()) return;

  mixpanel.reset();
}
