'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { HeroSwirl } from '@/components/HeroSwirl';
import { TALLY_FORMS, tallyEmbedUrl } from '@/lib/config';
import { trackEvent } from '@/lib/mixpanel';
import { TRACKING_EVENTS } from '@/lib/tracking-events';

export default function ConsultationPage() {
  const tallyIframeRef = useRef<HTMLIFrameElement>(null);
  const tallyStartedRef = useRef(false);

  function trackTallyFormStarted() {
    if (tallyStartedRef.current) return;
    tallyStartedRef.current = true;
    trackEvent(TRACKING_EVENTS.formStarted, {
      form_name: 'Consultation Booking',
      source_page: window.location.pathname,
      number_of_fields: undefined,
      submission_status: 'started',
    });
  }

  useEffect(() => {
    const scriptSrc = 'https://tally.so/widgets/embed.js';
    const existing = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!existing) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    } else {
      // @ts-ignore
      if (typeof Tally !== 'undefined') Tally.loadEmbeds();
    }
  }, []);

  useEffect(() => {
    function handleWindowBlur() {
      if (document.activeElement === tallyIframeRef.current) trackTallyFormStarted();
    }
    function handleTallyMessage(event: MessageEvent) {
      if (!event.origin.includes('tally.so')) return;
      let payload = '';
      try { payload = typeof event.data === 'string' ? event.data : JSON.stringify(event.data); } catch { payload = ''; }
      if (!/submit|submitted|form_submitted/i.test(payload)) return;
      const properties = { form_name: 'Consultation Booking', source_page: window.location.pathname, number_of_fields: undefined, submission_status: 'submitted' };
      trackEvent(TRACKING_EVENTS.formSubmitted, properties);
      trackEvent(TRACKING_EVENTS.consultationSubmitted, properties);
    }
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('message', handleTallyMessage);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('message', handleTallyMessage);
    };
  }, []);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-navy py-28 lg:py-36 overflow-hidden text-center">
        <HeroSwirl variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-amber/12 border border-amber/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-amber rounded-full animate-pulse flex-shrink-0" />
            <span className="text-amber text-xs font-bold tracking-[0.15em] uppercase">Book a Consultation</span>
          </div>
          <h1 className="font-serif text-hero-md lg:text-hero text-white max-w-2xl mx-auto max-[768px]:text-hero-md">
            Not sure where to start?<br />
            <span className="text-amber">Let&rsquo;s work it out together.</span>
          </h1>
          <p className="text-paper/60 text-xl mt-4">Free 30-minute call. No pressure.</p>
        </div>
      </section>

      {/* ─── WHAT WE'LL COVER ─────────────────────────────────── */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-6">What we&rsquo;ll talk about</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '🎯', title: 'Your situation',     body: 'Where you are and what isn\'t working right now.' },
              { icon: '📊', title: 'Your assessment',   body: 'Walk through your result and what it means.' },
              { icon: '🛣️', title: 'The right pathway', body: 'PM, BA, or Design Cohort 2 waitlist.' },
              { icon: '💡', title: 'The right tier',     body: 'Standard or Premium — based on your goals.' },
              { icon: '⚖️', title: 'Honest constraints', body: 'Time, money, timeline — what\'s realistic.' },
              { icon: '✅', title: 'Clear next step',    body: 'Enroll, wait, or do something else first.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex gap-3 p-4 bg-paper/40 rounded-xl border border-gray-100">
                <span className="text-xl flex-shrink-0">{icon}</span>
                <div>
                  <p className="font-bold text-navy text-sm mb-0.5">{title}</p>
                  <p className="text-ink-soft text-xs leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 pb-32">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4">Request your slot</p>
          <h2 className="font-serif text-h2 text-navy mb-8">Fill this in — we&rsquo;ll reach out within 24 hours.</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <iframe
              ref={tallyIframeRef}
              data-tally-src={tallyEmbedUrl(TALLY_FORMS.consultation, { alignLeft: true, transparentBackground: true })}
              loading="lazy"
              width="100%"
              height="900"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              title="Upthrust Consultation Booking"
              onFocus={trackTallyFormStarted}
              style={{ display: 'block', border: 0 }}
            />
          </div>
          <p className="text-center text-ink/40 text-sm mt-6">
            Prefer email?{' '}
            <a href="mailto:info@upthrustdigital.com" className="text-amber hover:underline">info@upthrustdigital.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
