'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { TALLY_FORMS, tallyEmbedUrl } from '@/lib/config';
import { trackEvent } from '@/lib/mixpanel';
import { TRACKING_EVENTS } from '@/lib/tracking-events';
import { SectionLabel } from '@/components/ui/SectionLabel';

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
      if (document.activeElement === tallyIframeRef.current) {
        trackTallyFormStarted();
      }
    }
    function handleTallyMessage(event: MessageEvent) {
      if (!event.origin.includes('tally.so')) return;
      let payload = '';
      try {
        payload = typeof event.data === 'string' ? event.data : JSON.stringify(event.data);
      } catch { payload = ''; }
      if (!/submit|submitted|form_submitted/i.test(payload)) return;
      const properties = {
        form_name: 'Consultation Booking',
        source_page: window.location.pathname,
        number_of_fields: undefined,
        submission_status: 'submitted',
      };
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
      <section className="relative bg-navy py-32 lg:py-40 text-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          <div style={{ position:'absolute', width:'70vw', height:'70vw', maxWidth:900, maxHeight:900, top:'-20%', right:'-15%', background:'radial-gradient(ellipse at center, rgba(197,116,58,0.10) 0%, transparent 70%)', borderRadius:'40% 60% 70% 30% / 40% 50% 60% 50%', filter:'blur(40px)' }} />
          <div style={{ position:'absolute', width:'50vw', height:'50vw', maxWidth:700, maxHeight:700, bottom:'-10%', left:'-10%', background:'radial-gradient(ellipse at center, rgba(79,106,74,0.07) 0%, transparent 65%)', filter:'blur(50px)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-amber rounded-full animate-pulse inline-block flex-shrink-0" />
            <span className="text-amber text-xs font-bold tracking-widest uppercase">Book a Consultation</span>
          </div>
          <h1
            className="font-serif text-white max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 2.75rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            Not sure where to start?
            <br />
            <span className="text-amber italic">Let&rsquo;s work it out together.</span>
          </h1>
          <p className="text-paper/60 text-xl mt-4">Free 30-minute call. No pressure.</p>
        </div>
      </section>

      {/* ─── WHAT WE COVER ────────────────────────────────────── */}
      <section className="bg-paper py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionLabel>What we&rsquo;ll talk about</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {[
              { icon: '🎯', title: 'Your situation', body: 'Where you are and what\'s not working.' },
              { icon: '📊', title: 'Your assessment result', body: 'Walk through what your reflexes revealed.' },
              { icon: '🛣️', title: 'The right pathway', body: 'PM, BA, or Design Cohort 2 waitlist.' },
              { icon: '💡', title: 'The right tier', body: 'Standard or Premium — based on your goals.' },
              { icon: '⚖️', title: 'Honest constraints', body: 'Time, money, timeline — what\'s realistic.' },
              { icon: '✅', title: 'Clear next step', body: 'Enroll, wait, or something else. No hard sell.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex gap-3 p-4 bg-white rounded-xl border border-paper/50">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <p className="font-bold text-navy text-sm">{title}</p>
                  <p className="text-ink/60 text-xs mt-1 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM ─────────────────────────────────────────────── */}
      <section className="bg-paper py-16 pb-32">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <SectionLabel>Request your slot</SectionLabel>
          <h2 className="font-serif text-display-sm text-navy mb-8">
            Fill this in — we&rsquo;ll reach out within 24 hours.
          </h2>
          <div className="bg-white rounded-2xl border border-paper/50 shadow-sm overflow-hidden">
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
            <a href="mailto:info@upthrustdigital.com" className="text-amber hover:underline">
              info@upthrustdigital.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
