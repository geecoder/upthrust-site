import mixpanel from 'mixpanel-browser';
import { initAnalytics } from '@/lib/analytics';

export type {
  AnalyticsProperties as MixpanelProperties,
  AnalyticsValue as MixpanelValue,
} from '@/lib/analytics';

export {
  captureUtmAttribution as captureAttribution,
  initAnalytics as initMixpanel,
  isAnalyticsEnabled,
  trackCTAClick,
  trackEvent,
  trackExternalLinkClick,
  trackPageView,
  trackTestEvent,
} from '@/lib/analytics';

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
