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

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const MIXPANEL_DEBUG_FLAG = process.env.NEXT_PUBLIC_MIXPANEL_DEBUG;
const WEBSITE_URL = 'https://upthrust-site.vercel.app';
const FIRST_TOUCH_UTM_STORAGE_KEY = 'upthrust_first_touch_utm';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

let initialized = false;
let warnedMissingToken = false;

function isBrowser() {
  return typeof window !== 'undefined';
}

function isDevelopment() {
  return process.env.NODE_ENV !== 'production';
}

function isMixpanelDebugEnabled() {
  return isDevelopment() || MIXPANEL_DEBUG_FLAG === 'true' || MIXPANEL_DEBUG_FLAG === '1';
}

function getEnvironment() {
  return process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || 'production';
}

function getLocalStorage() {
  if (!isBrowser()) return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readFirstTouchUtm(): AnalyticsProperties {
  const storage = getLocalStorage();
  if (!storage) return {};

  try {
    const stored = storage.getItem(FIRST_TOUCH_UTM_STORAGE_KEY);
    if (!stored) return {};

    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeFirstTouchUtm(properties: AnalyticsProperties) {
  const storage = getLocalStorage();
  if (!storage) return;

  try {
    storage.setItem(FIRST_TOUCH_UTM_STORAGE_KEY, JSON.stringify(properties));
  } catch {
    // Analytics should never interrupt the website if storage is unavailable.
  }
}

function readCurrentUtm(): AnalyticsProperties {
  if (!isBrowser()) return {};

  const params = new URLSearchParams(window.location.search);

  return UTM_KEYS.reduce<AnalyticsProperties>((properties, key) => {
    const value = params.get(key);
    if (value) {
      properties[key] = value;
    }

    return properties;
  }, {});
}

export function captureUtmAttribution(): AnalyticsProperties {
  if (!isBrowser()) return {};

  const currentUtm = readCurrentUtm();
  const firstTouchUtm = readFirstTouchUtm();
  let changed = false;

  UTM_KEYS.forEach((key) => {
    const firstTouchKey = `first_${key}`;
    const currentValue = currentUtm[key];

    if (currentValue && !firstTouchUtm[firstTouchKey]) {
      firstTouchUtm[firstTouchKey] = currentValue;
      changed = true;
    }
  });

  if (changed) {
    writeFirstTouchUtm(firstTouchUtm);
  }

  return {
    ...currentUtm,
    ...firstTouchUtm,
  };
}

function getDefaultProperties(): AnalyticsProperties {
  if (!isBrowser()) return {};

  return {
    app_name: 'Upthrust',
    website_url: WEBSITE_URL,
    environment: getEnvironment(),
    page_path: window.location.pathname,
    page_url: window.location.href,
    page_title: document.title,
    search: window.location.search,
    referrer: document.referrer || '',
    timestamp: new Date().toISOString(),
    ...captureUtmAttribution(),
  };
}

function warnMissingToken() {
  if (!isDevelopment() || warnedMissingToken) return;

  warnedMissingToken = true;
  console.warn('[analytics] Mixpanel token missing. Set NEXT_PUBLIC_MIXPANEL_TOKEN to enable tracking.');
}

function logTrackedEvent(eventName: string, properties: AnalyticsProperties) {
  if (!isDevelopment()) return;

  console.info('[analytics] Mixpanel event attempted', {
    event_name: eventName,
    properties,
  });
}

export function initAnalytics() {
  if (!isBrowser()) return false;
  if (initialized) return true;

  if (!MIXPANEL_TOKEN) {
    warnMissingToken();
    return false;
  }

  try {
    captureUtmAttribution();
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: isMixpanelDebugEnabled(),
      track_pageview: false,
      persistence: 'localStorage',
      ignore_dnt: false,
    });
    initialized = true;
  } catch (error) {
    if (isDevelopment()) {
      console.warn('[analytics] Mixpanel failed to initialise.', error);
    }

    return false;
  }

  return true;
}

export function isAnalyticsEnabled() {
  return isBrowser() && Boolean(MIXPANEL_TOKEN) && initialized;
}

export function trackEvent(eventName: string, properties: AnalyticsProperties = {}) {
  if (!isBrowser() || !eventName) return false;
  if (!initAnalytics()) return false;

  const eventProperties = {
    ...getDefaultProperties(),
    ...properties,
  };

  logTrackedEvent(eventName, eventProperties);
  mixpanel.track(eventName, eventProperties);
  return true;
}

export function trackPageView(pathname: string, properties: AnalyticsProperties = {}) {
  return trackEvent('Page Viewed', {
    page_path: pathname,
    ...properties,
  });
}

export function trackCTAClick(properties: AnalyticsProperties = {}) {
  return trackEvent('CTA Clicked', properties);
}

export function trackExternalLinkClick(properties: AnalyticsProperties = {}) {
  return trackEvent('External Link Clicked', properties);
}

export function trackTestEvent() {
  if (!isBrowser()) return false;

  return trackEvent('Mixpanel Debug Test Event', {
    source: 'manual_debug',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
}
