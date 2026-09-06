'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { HeroSwirl } from '@/components/HeroSwirl';
import { TALLY_FORMS, tallyEmbedUrl } from '@/lib/config';
import { analytics } from '@/lib/analytics';

export default function ConsultationPage() {
  const tallyIframeRef = useRef<HTMLIFrameElement>(null);
  const tallyStartedRef = useRef(false);
  const tallySubmittedRef = useRef(false);

  // First meaningful interaction with the embedded form — the iframe taking
  // focus. Not fired on page load, and only once per session.
  function trackTallyFormStarted() {
    if (tallyStartedRef.current) return;
    tallyStartedRef.current = true;
    analytics.consultationFormStarted({ source_page: window.location.pathname });
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
      // Tally can post more than one message matching this for a single
      // submission, so the event is emitted at most once per page.
      if (tallySubmittedRef.current) return;
      tallySubmittedRef.current = true;
      // Fired only on Tally's own confirmation of a completed submission,
      // never on a click. Carries no name, email or answer content.
      analytics.consultationSubmitted({ source_page: window.location.pathname });
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
          <div className="inline-flex items-center gap-2 bg-amber/12 border border-amber/25 px-4 py-1.5 mb-6">
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
              { title: 'Your situation',     body: 'Where you are and what isn\'t working right now.' },
              { title: 'Your assessment',   body: 'Walk through your result and what it means.' },
              { title: 'The right pathway', body: 'PM, BA, Design, or Payment Ops.' },
              { title: 'The right tier',     body: 'Standard or Premium — based on your goals.' },
              { title: 'Honest constraints', body: 'Time, money, timeline — what\'s realistic.' },
              { title: 'Clear next step',    body: 'Enroll, wait, or do something else first.' },
            ].map(({ title, body }, i) => (
              <div key={title} className="flex gap-3 p-4 bg-paper/40 border border-gray-100">
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--seal-600)' }} className="text-xs flex-shrink-0 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
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
          <div className="bg-white border border-gray-100 shadow-card overflow-hidden">
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
