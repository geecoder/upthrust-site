'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  getAnalyticsDiagnostics,
  initAnalytics,
  trackDebugEvent,
  trackPageView,
} from '@/lib/analytics';

export default function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsProviderInner />
    </Suspense>
  );
}

function AnalyticsProviderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const lastTrackedPageRef = useRef('');

  useEffect(() => {
    initAnalytics();

    if (process.env.NODE_ENV !== 'production') {
      window.upthrustAnalyticsDiagnostics = getAnalyticsDiagnostics;
      window.upthrustTrackTestEvent = trackDebugEvent;
      console.info('[analytics] provider mounted');
      console.table(getAnalyticsDiagnostics());
    }

    return () => {
      if (process.env.NODE_ENV !== 'production') {
        delete window.upthrustAnalyticsDiagnostics;
        delete window.upthrustTrackTestEvent;
      }
    };
  }, []);

  useEffect(() => {
    const pageKey = search ? `${pathname}?${search}` : pathname;
    if (lastTrackedPageRef.current === pageKey) return;

    lastTrackedPageRef.current = pageKey;

    initAnalytics();
    trackPageView(pathname, {
      page_path: pathname,
      page_url: window.location.href,
      page_title: document.title,
      search: window.location.search,
      query_string: search ? `?${search}` : '',
    });

    if (process.env.NODE_ENV !== 'production') {
      console.info('[analytics] route tracked');
      console.table(getAnalyticsDiagnostics());
    }
  }, [pathname, search]);

  return null;
}
