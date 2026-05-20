import mixpanel from 'mixpanel-browser';

export type MixpanelValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | MixpanelValue[]
  | { [key: string]: MixpanelValue };

export type MixpanelProperties = Record<string, MixpanelValue>;

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const WEBSITE_URL = 'https://upthrust-site.vercel.app';
const ATTRIBUTION_STORAGE_KEY = 'upthrust_mixpanel_attribution';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

let initialized = false;
let warnedMissingToken = false;

function isBrowser() {
  return typeof window !== 'undefined';
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

function readStoredAttribution(): MixpanelProperties {
  const storage = getLocalStorage();
  if (!storage) return {};

  try {
    const raw = storage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeStoredAttribution(properties: MixpanelProperties) {
  const storage = getLocalStorage();
  if (!storage) return;

  try {
    storage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(properties));
  } catch {
    // Ignore storage errors so analytics never interrupts the site.
  }
}

export function captureAttribution(): MixpanelProperties {
  if (!isBrowser()) return {};

  const existing = readStoredAttribution();
  const next: MixpanelProperties = { ...existing };
  const params = new URLSearchParams(window.location.search);
  let changed = false;

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (!value) return;

    next[key] = value;
    changed = true;

    const initialKey = `initial_${key}`;
    if (!next[initialKey]) {
      next[initialKey] = value;
    }
  });

  if (!next.initial_referrer) {
    next.initial_referrer = document.referrer || 'direct';
    changed = true;
  }

  if (!next.landing_page) {
    next.landing_page = window.location.href;
    changed = true;
  }

  if (changed) {
    writeStoredAttribution(next);
  }

  return next;
}

function getDefaultProperties(): MixpanelProperties {
  if (!isBrowser()) return {};

  const attribution = captureAttribution();

  return {
    app_name: 'Upthrust',
    website_url: WEBSITE_URL,
    environment: getEnvironment(),
    page_url: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
    referrer: document.referrer || attribution.initial_referrer || '',
    timestamp: new Date().toISOString(),
    ...attribution,
  };
}

export function initMixpanel() {
  if (!isBrowser()) return false;
  if (initialized) return true;

  if (!MIXPANEL_TOKEN) {
    if (process.env.NODE_ENV === 'development' && !warnedMissingToken) {
      warnedMissingToken = true;
      console.warn('Mixpanel token missing. Set NEXT_PUBLIC_MIXPANEL_TOKEN to enable tracking.');
    }
    return false;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    persistence: 'localStorage',
  });

  initialized = true;
  return true;
}

export function trackEvent(eventName: string, properties: MixpanelProperties = {}) {
  if (!isBrowser()) return;
  if (!initMixpanel()) return;

  mixpanel.track(eventName, {
    ...getDefaultProperties(),
    ...properties,
  });
}

export function identifyUser(userId: string, properties: MixpanelProperties = {}) {
  if (!isBrowser() || !userId) return;
  if (!initMixpanel()) return;

  mixpanel.identify(userId);

  if (Object.keys(properties).length > 0) {
    mixpanel.people.set(properties);
  }
}

export function resetMixpanel() {
  if (!isBrowser()) return;
  if (!initMixpanel()) return;

  mixpanel.reset();
}
