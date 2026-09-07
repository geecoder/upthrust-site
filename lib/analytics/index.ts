// Client-side analytics barrel.
//
// Server-side tracking lives in ./server, which is marked `server-only` and
// must be imported directly by a route handler — it is deliberately not
// re-exported here, so a client component cannot reach it by accident.

export { analytics } from './events';
export type { Analytics } from './events';

export {
  initAnalytics,
  track,
  trackBeforeNavigation,
  getDistinctId,
  identifyByInternalId,
  isAnalyticsReady,
  getDiagnostics,
  setAnalyticsConsent,
  hasAnalyticsConsent,
  getEnvironment,
  getApiHost,
  pageTypeFor,
} from './mixpanel';

export {
  programContext,
  programContextForSlug,
  slugForKey,
  keyForSlug,
  programTypeForKey,
  normalisePlan,
  normaliseTier,
  cohortFor,
} from './programs';

export { EVENTS } from './types';
export type * from './types';
