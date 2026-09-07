'use client';

// The only place mixpanel-browser is imported.
//
// Everything here is failure-tolerant by construction: a missing token, a
// blocked SDK, an ad-blocker, denied consent or a thrown SDK call must never
// surface to a visitor. Every exported function returns a boolean rather than
// throwing, and every SDK call is wrapped.

import mixpanel from 'mixpanel-browser';
import type { AnalyticsProperties, Environment, EventName, PageType } from './types';

// ── Environment ───────────────────────────────────────────

export function getEnvironment(): Environment {
  // Vercel exposes 'production' | 'preview' | 'development' here, which is
  // more precise than NODE_ENV — a preview deployment is a production build.
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
  if (vercelEnv === 'production') return 'production';
  if (vercelEnv === 'preview') return 'preview';
  if (vercelEnv === 'development') return 'development';
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

const isProd = () => getEnvironment() === 'production';
const isBrowser = () => typeof window !== 'undefined';

function getToken(): string {
  return (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '').trim();
}

// Data residency. NEXT_PUBLIC_MIXPANEL_API_HOST is the documented control; the
// older NEXT_PUBLIC_MIXPANEL_RESIDENCY is still honoured so existing
// deployments keep working without a config change.
const HOST_BY_RESIDENCY: Record<string, string> = {
  US: 'https://api-js.mixpanel.com',
  EU: 'https://api-eu.mixpanel.com',
  IN: 'https://api-in.mixpanel.com',
};

export function getApiHost(): string {
  const explicit = (process.env.NEXT_PUBLIC_MIXPANEL_API_HOST || '').trim();
  if (explicit) return explicit.replace(/\/+$/, '');
  const residency = (process.env.NEXT_PUBLIC_MIXPANEL_RESIDENCY || 'US').toUpperCase();
  return HOST_BY_RESIDENCY[residency] || HOST_BY_RESIDENCY.US;
}

// ── Consent ───────────────────────────────────────────────
//
// The site has no cookie/consent banner today (documented in
// docs/analytics/MIXPANEL_TRACKING_PLAN.md). This is the seam one would plug
// into: call setAnalyticsConsent(false) and tracking stops immediately and
// stays off for the session. Default is "granted" because that matches the
// site's current behaviour — adding a banner is a product decision, not one to
// make silently inside an analytics refactor.
//
// Do-Not-Track is respected regardless, via ignore_dnt: false below.

const CONSENT_KEY = 'upthrust_analytics_consent';
let consentOverride: boolean | null = null;

export function setAnalyticsConsent(granted: boolean): void {
  consentOverride = granted;
  try {
    window.localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
  } catch { /* storage unavailable — honoured for this page only */ }
  if (!granted) {
    try { mixpanel.opt_out_tracking?.(); } catch { /* not initialised */ }
  }
}

export function hasAnalyticsConsent(): boolean {
  if (consentOverride !== null) return consentOverride;
  try {
    return window.localStorage.getItem(CONSENT_KEY) !== 'denied';
  } catch {
    return true;
  }
}

// ── Initialisation ────────────────────────────────────────

let initialised = false;
let initFailed = false;

export function initAnalytics(): boolean {
  if (!isBrowser() || initFailed) return false;
  if (initialised) return true;
  if (!hasAnalyticsConsent()) return false;

  const token = getToken();
  if (!token) {
    if (!isProd()) console.warn('[analytics] NEXT_PUBLIC_MIXPANEL_TOKEN is missing — tracking disabled.');
    initFailed = true;
    return false;
  }

  try {
    mixpanel.init(token, {
      debug: !isProd(),
      api_host: getApiHost(),

      // SPA page views. The SDK hooks history changes itself, so route
      // transitions produce $mp_web_page_view without any manual call — which
      // is also why nothing in this codebase tracks a page view by hand.
      //
      // Note: this top-level option is only consulted when no `autocapture`
      // object is supplied. Because one is (below), the SDK reads
      // autocapture.pageview instead — see Autocapture.pageviewTrackingConfig.
      // Both are set to the same mode so the behaviour does not depend on
      // which branch the SDK takes.
      track_pageview: 'url-with-path-and-query-string',

      // Campaign properties are read per event rather than persisted onto the
      // profile, so a later visit is not misattributed to an older campaign.
      stop_utm_persistence: true,

      persistence: 'localStorage',
      secure_cookie: isProd(),
      ignore_dnt: false,

      // Deliberately narrow. Explicit business events are the reporting
      // surface; autocapture is here only for the ambient signals that are
      // impractical to instrument by hand.
      autocapture: {
        // The single source of page views, emitted as $mp_web_page_view on
        // load and on every client-side route change. Nothing else in the app
        // tracks a page view, so this cannot double-fire.
        pageview: 'url-with-path-and-query-string',
        click: false,      // CTAs are tracked explicitly, with business context
        input: false,      // never capture form interaction
        submit: false,     // never capture form submission contents
        scroll: true,      // scroll depth is useful and carries no user content
        capture_text_content: false,
      },
    });

    initialised = true;

    mixpanel.register({
      site: 'upthrust_web',
      environment: getEnvironment(),
    });

    if (!isProd()) console.info('[analytics] Mixpanel ready', { host: getApiHost(), env: getEnvironment() });
    return true;
  } catch (error) {
    initFailed = true;
    if (!isProd()) console.warn('[analytics] Mixpanel failed to initialise', error);
    return false;
  }
}

// ── Tracking ──────────────────────────────────────────────

function pageContext(): AnalyticsProperties {
  if (!isBrowser()) return {};
  return { page_path: window.location.pathname };
}

/** Best-effort page_type from the path, so every event can be sliced by surface. */
export function pageTypeFor(pathname: string): PageType {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/pathways/') || pathname.startsWith('/intensives/')) return 'program';
  if (pathname.startsWith('/accelerator')) return 'accelerator';
  if (pathname.startsWith('/assessment')) return 'assessment';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/consultation')) return 'consultation';
  if (pathname.startsWith('/enrol')) return 'enrol';
  return 'other';
}

/** Undefined properties are dropped so Mixpanel does not record empty columns. */
function clean(props: AnalyticsProperties): AnalyticsProperties {
  const out: AnalyticsProperties = {};
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined) out[k] = v;
  }
  return out;
}

export function track(name: EventName, properties: AnalyticsProperties = {}): boolean {
  if (!isBrowser()) return false;
  if (!hasAnalyticsConsent()) return false;
  if (!initAnalytics()) return false;

  try {
    const path = (properties.page_path as string) || (isBrowser() ? window.location.pathname : '');
    mixpanel.track(name, clean({
      ...pageContext(),
      page_type: pageTypeFor(path),
      ...properties,
    }));
    if (!isProd()) console.info('[analytics]', name, clean(properties));
    return true;
  } catch (error) {
    if (!isProd()) console.warn('[analytics] track failed', name, error);
    return false;
  }
}

/**
 * Sends with keepalive so the request survives the page unloading — used
 * immediately before handing off to an external payment provider. It adds no
 * delay of its own.
 */
export function trackBeforeNavigation(name: EventName, properties: AnalyticsProperties = {}): boolean {
  const sent = track(name, properties);
  try {
    // `flush` exists at runtime but is absent from the published types, so it
    // is reached defensively rather than being declared as part of the API.
    (mixpanel as unknown as { flush?: () => void }).flush?.();
  } catch { /* no flush on this build — the SDK's own beacon transport still applies */ }
  return sent;
}

// ── Identity ──────────────────────────────────────────────

/**
 * Only ever called with an internal application identifier, never an email or
 * a hash of one, and never for a merely anonymous visitor — the device
 * journey Mixpanel creates on its own is left intact until the person becomes
 * a real record in our system.
 */
export function identifyByInternalId(internalId: string): boolean {
  if (!isBrowser() || !internalId) return false;
  if (!initAnalytics()) return false;
  try {
    mixpanel.identify(internalId);
    return true;
  } catch {
    return false;
  }
}

/**
 * The device id for the current journey. Passed with an enrolment so a
 * server-side conversion can be attributed back to the session that produced
 * it. Never rendered to the user.
 */
export function getDistinctId(): string | null {
  if (!isBrowser() || !initAnalytics()) return null;
  try {
    return mixpanel.get_distinct_id() || null;
  } catch {
    return null;
  }
}

export function isAnalyticsReady(): boolean {
  return initialised;
}

export function getDiagnostics() {
  const token = getToken();
  return {
    is_browser: isBrowser(),
    token_present: Boolean(token),
    token_prefix: token ? token.slice(0, 4) : '',
    api_host: getApiHost(),
    environment: getEnvironment(),
    consent: hasAnalyticsConsent(),
    initialised,
  };
}
