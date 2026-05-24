'use client';

import mixpanel from 'mixpanel-browser';

export type AnalyticsValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | AnalyticsValue[]
  | { [key: string]: AnalyticsValue };

export type AnalyticsProperties = Record<string, AnalyticsValue>;

type MixpanelResidency = 'US' | 'EU' | 'IN';

export type AnalyticsDiagnostics = {
  is_browser: boolean;
  token_present: boolean;
  token_prefix: string;
  residency: MixpanelResidency;
  api_host: string;
  has_initialised: boolean;
  current_url: string;
};

export type MixpanelHttpFallbackResult = {
  ok: boolean;
  status: number;
  body: string;
};

declare global {
  interface Window {
    upthrustAnalyticsDiagnostics?: () => AnalyticsDiagnostics;
    upthrustTrackTestEvent?: () => boolean;
  }
}

const API_HOST_BY_RESIDENCY: Record<MixpanelResidency, string> = {
  US: 'https://api-js.mixpanel.com',
  EU: 'https://api-eu.mixpanel.com',
  IN: 'https://api-in.mixpanel.com',
};

const FALLBACK_DISTINCT_ID_KEY = 'upthrust_mixpanel_debug_distinct_id';

let hasInitialised = false;
let hasWarnedMissingToken = false;

function isBrowser() {
  return typeof window !== 'undefined';
}

function isDevelopment() {
  return process.env.NODE_ENV !== 'production';
}

function getToken() {
  return process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '';
}

function getResidency(): MixpanelResidency {
  const residency = (process.env.NEXT_PUBLIC_MIXPANEL_RESIDENCY || 'US').toUpperCase();

  if (residency === 'EU') return 'EU';
  if (residency === 'IN') return 'IN';
  return 'US';
}

function getApiHost() {
  return API_HOST_BY_RESIDENCY[getResidency()];
}

function exposeDevelopmentHelpers() {
  if (!isBrowser() || !isDevelopment()) return;

  window.upthrustAnalyticsDiagnostics = getAnalyticsDiagnostics;
  window.upthrustTrackTestEvent = trackDebugEvent;
}

function logDevelopmentDiagnostics(label: string) {
  if (!isDevelopment()) return;

  console.info(`[analytics] ${label}`);
  console.table(getAnalyticsDiagnostics());
}

function warnMissingToken() {
  if (!isDevelopment() || hasWarnedMissingToken) return;

  hasWarnedMissingToken = true;
  console.warn('[analytics] NEXT_PUBLIC_MIXPANEL_TOKEN is missing. Mixpanel tracking is disabled.');
}

function getDefaultProperties(): AnalyticsProperties {
  if (!isBrowser()) return {};

  return {
    app_name: 'Upthrust',
    page_url: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
    referrer: document.referrer || '',
    timestamp: new Date().toISOString(),
    residency: getResidency(),
    api_host: getApiHost(),
  };
}

function getFallbackDistinctId() {
  if (!isBrowser()) return 'server';

  try {
    if (hasInitialised) {
      return mixpanel.get_distinct_id();
    }
  } catch {
    // Fall back to a local debug id below.
  }

  try {
    const existingId = window.localStorage.getItem(FALLBACK_DISTINCT_ID_KEY);
    if (existingId) return existingId;

    const newId = window.crypto?.randomUUID?.() || `debug_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    window.localStorage.setItem(FALLBACK_DISTINCT_ID_KEY, newId);
    return newId;
  } catch {
    return `debug_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
}

function toBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window.btoa(binary);
}

export function initAnalytics() {
  if (!isBrowser()) return false;

  exposeDevelopmentHelpers();

  if (hasInitialised) return true;

  const token = getToken();
  if (!token) {
    warnMissingToken();
    return false;
  }

  try {
    mixpanel.init(token, {
      debug: process.env.NODE_ENV !== 'production',
      track_pageview: false,
      persistence: 'localStorage',
      api_host: getApiHost(),
      ignore_dnt: false,
    });

    hasInitialised = true;
    logDevelopmentDiagnostics('Mixpanel initialised');
    return true;
  } catch (error) {
    if (isDevelopment()) {
      console.warn('[analytics] Mixpanel failed to initialise.', error);
      console.table(getAnalyticsDiagnostics());
    }

    return false;
  }
}

export function trackEvent(name: string, properties: AnalyticsProperties = {}) {
  if (!isBrowser() || !name) return false;
  if (!initAnalytics()) return false;

  const eventProperties = {
    ...getDefaultProperties(),
    ...properties,
  };

  try {
    mixpanel.track(name, eventProperties);

    if (isDevelopment()) {
      console.info('[analytics] Mixpanel event sent', {
        event_name: name,
        api_host: getApiHost(),
        residency: getResidency(),
      });
    }

    return true;
  } catch (error) {
    if (isDevelopment()) {
      console.warn('[analytics] Mixpanel event failed.', {
        event_name: name,
        api_host: getApiHost(),
        residency: getResidency(),
        error,
      });
    }

    return false;
  }
}

export function trackPageView(pathname: string, properties: AnalyticsProperties = {}) {
  return trackEvent('Page Viewed', {
    page_path: pathname,
    ...properties,
  });
}

export function trackDebugEvent() {
  if (!isBrowser()) return false;

  return trackEvent('Mixpanel Debug Test Event', {
    source: 'debug_page',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    api_host: getApiHost(),
    residency: getResidency(),
  });
}

export function getAnalyticsDiagnostics(): AnalyticsDiagnostics {
  const token = getToken();

  return {
    is_browser: isBrowser(),
    token_present: Boolean(token),
    token_prefix: token ? token.slice(0, 4) : '',
    residency: getResidency(),
    api_host: getApiHost(),
    has_initialised: hasInitialised,
    current_url: isBrowser() ? window.location.href : '',
  };
}

export async function sendMixpanelHttpFallbackTest(): Promise<MixpanelHttpFallbackResult> {
  if (!isBrowser()) {
    return { ok: false, status: 0, body: 'Not running in a browser.' };
  }

  const token = getToken();
  if (!token) {
    warnMissingToken();
    return { ok: false, status: 0, body: 'NEXT_PUBLIC_MIXPANEL_TOKEN is missing.' };
  }

  const apiHost = getApiHost();
  const payload = {
    event: 'Mixpanel HTTP Fallback Test',
    properties: {
      token,
      distinct_id: getFallbackDistinctId(),
      source: 'http_fallback',
      time: Math.floor(Date.now() / 1000),
      page_url: window.location.href,
      residency: getResidency(),
      api_host: apiHost,
    },
  };

  try {
    const response = await fetch(`${apiHost}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams({
        data: toBase64(JSON.stringify(payload)),
      }).toString(),
    });

    return {
      ok: response.ok,
      status: response.status,
      body: await response.text(),
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      body: error instanceof Error ? error.message : 'HTTP fallback request failed.',
    };
  }
}

export function isAnalyticsEnabled() {
  return isBrowser() && hasInitialised;
}

export function captureUtmAttribution(): AnalyticsProperties {
  return {};
}

export function trackCTAClick(properties: AnalyticsProperties = {}) {
  return trackEvent('CTA Clicked', properties);
}

export function trackExternalLinkClick(properties: AnalyticsProperties = {}) {
  return trackEvent('External Link Clicked', properties);
}

export function trackTestEvent() {
  return trackDebugEvent();
}
