'use client';

// Compatibility shim.
//
// This file used to be the analytics implementation: it called mixpanel.init
// itself, with track_pageview disabled, and emitted a custom 'Page Viewed'
// event. That made two competing initialisations of the same SDK singleton
// once lib/analytics/ existed — whichever ran first won, and the losing
// configuration silently took its page-view behaviour with it.
//
// It is now a thin delegation to lib/analytics/ so there is exactly one init
// path, kept only for the superseded page components that are still in the
// repository but no longer wired to a route (app/assessment/AssessmentContent,
// components/CapstonesInteractive). New code must import '@/lib/analytics'.

import { getDiagnostics, initAnalytics, track } from '@/lib/analytics';
import type { EventName } from '@/lib/analytics';

export type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsProperties = Record<string, AnalyticsValue>;

export type AnalyticsDiagnostics = ReturnType<typeof getDiagnostics>;
export type MixpanelHttpFallbackResult = { ok: boolean; status: number; body: string };

export { initAnalytics };

/** Accepts the legacy free-form event names; the typed API is analytics.*. */
export function trackEvent(name: string, properties: AnalyticsProperties = {}) {
  return track(name as EventName, properties);
}

export function trackPageView() {
  // Page views come from the SDK's own $mp_web_page_view. Tracking one here
  // as well is what this shim exists to prevent.
  return false;
}

export function trackDebugEvent() {
  return track('Mixpanel Debug Test Event' as EventName, { source: 'debug_page' });
}

export function getAnalyticsDiagnostics(): AnalyticsDiagnostics {
  return getDiagnostics();
}

export function isAnalyticsEnabled() {
  return getDiagnostics().initialised;
}

export async function sendMixpanelHttpFallbackTest(): Promise<MixpanelHttpFallbackResult> {
  return { ok: false, status: 0, body: 'Removed — use the typed analytics API and Mixpanel Live View.' };
}

export function captureUtmAttribution(): AnalyticsProperties {
  // The SDK captures UTMs itself; recreating them here duplicated the work.
  return {};
}

export function trackCTAClick(properties: AnalyticsProperties = {}) {
  return trackEvent('CTA Clicked', properties);
}
export function trackExternalLinkClick(properties: AnalyticsProperties = {}) {
  return trackEvent('External Link Clicked', properties);
}
export function trackTestEvent() { return trackDebugEvent(); }
