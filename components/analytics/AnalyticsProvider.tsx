'use client';

// Initialises Mixpanel once, as early as the app renders.
//
// It does not track page views. The SDK is configured with
// track_pageview: 'url-with-path-and-query-string', so it hooks history
// changes itself and emits $mp_web_page_view on every client-side route
// transition. The previous provider tracked a custom 'Page Viewed' event on
// every pathname change instead — doing both would double-count, and the
// standard event is what Mixpanel's own reports are built around.
//
// React Strict Mode runs effects twice in development; initAnalytics is
// idempotent, so that produces one init and no duplicate events.

import { useEffect } from 'react';
import { getDiagnostics, initAnalytics } from '@/lib/analytics';

export default function AnalyticsProvider() {
  useEffect(() => {
    initAnalytics();

    if (process.env.NODE_ENV !== 'production') {
      (window as unknown as { upthrustAnalytics?: unknown }).upthrustAnalytics = getDiagnostics;
      console.info('[analytics] provider mounted');
      console.table(getDiagnostics());
    }
  }, []);

  return null;
}
