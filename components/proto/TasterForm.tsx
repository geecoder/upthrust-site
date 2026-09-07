'use client';

// Register interest in the free taster session.
//
// This embeds Upthrust's own Tally form ("Program Registration", Zj7Y5V)
// rather than posting to it from a form of our own.
//
// The reason is worth recording. Tally keys its fields by UUID with no custom
// names, so a hand-rolled POST would have to guess at
// `852d427b-…=Adaeze` and would break silently whenever Tally changed its
// payload. The repository already had a precedent for that mistake: the old
// assessment posted `{'First Name': …}` to the form URL with
// `mode: 'no-cors'`, which cannot read a response — so it could never report
// that nothing was being recorded. Embedding hands the whole pipeline to
// Tally, which is the only version that is verifiable by construction.
//
// The iframe mounts only once it scrolls into view, so a programme page does
// not pay for a third-party frame nobody looked at. Height comes from Tally's
// own embed script rather than a fixed value — the form is six fields plus a
// submit button, and a guessed height cut the phone field and the button off.

import { useEffect, useRef, useState } from 'react';
import { TALLY_FORMS, tallyDirectUrl, tallyEmbedUrl } from '@/lib/config';
import { DATES } from '@/lib/cohort-config';
import { analytics } from '@/lib/analytics';
import type { ProgramSlug } from '@/lib/analytics';

type Variant = 'full' | 'panel';

const MONO = { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)' } as const;

// Measured against the live form: 724px at desktop width for six fields, the
// disclaimer and the submit button. Headroom added so a label wrapping onto a
// second line cannot clip the button.
const FRAME_H = { full: 790, panel: 880 } as const;

export function TasterForm({
  variant = 'full',
  location,
  programSlug,
}: {
  variant?: Variant;
  /** Where this instance lives — carried on the analytics events. */
  location: 'landing' | 'assessment' | 'program_pricing';
  /** The programme page this is embedded on, when there is one. */
  programSlug?: ProgramSlug;
}) {
  const panel = variant === 'panel';
  const hostRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [visible, setVisible] = useState(false);
  const startedRef = useRef(false);
  const submittedRef = useRef(false);

  // Tally's embed script resizes any iframe carrying data-tally-src to fit its
  // content, and keeps resizing as the form changes. Loaded once per page.
  useEffect(() => {
    if (!visible) return;
    const SRC = 'https://tally.so/widgets/embed.js';
    const load = () => {
      const w = window as unknown as { Tally?: { loadEmbeds: () => void } };
      if (w.Tally) { w.Tally.loadEmbeds(); return; }
    };
    if (document.querySelector(`script[src="${SRC}"]`)) { load(); return; }
    const el = document.createElement('script');
    el.src = SRC;
    el.async = true;
    el.onload = load;
    document.body.appendChild(el);
  }, [visible]);

  // Mount the frame only when it is actually approaching the viewport.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setVisible(true); io.disconnect(); }
    }, { rootMargin: '300px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // First interaction: the embedded frame taking focus. Same heuristic the
    // consultation page uses, since an iframe's internal events are opaque.
    function onBlur() {
      if (document.activeElement !== iframeRef.current || startedRef.current) return;
      startedRef.current = true;
      analytics.tasterFormStarted({ source_page: location });
    }

    // Tally posts a message on a completed submission. This is the only
    // signal that a registration actually landed, so it is the only thing
    // that fires the conversion — never a click.
    function onMessage(event: MessageEvent) {
      if (!event.origin.includes('tally.so')) return;
      let payload = '';
      try { payload = typeof event.data === 'string' ? event.data : JSON.stringify(event.data); } catch { return; }
      if (!/submit|submitted|form_submitted/i.test(payload)) return;
      // Tally can post more than one matching message per submission.
      if (submittedRef.current) return;
      submittedRef.current = true;
      analytics.tasterSessionRegistered({ source_page: location, program_slug: programSlug });
    }

    window.addEventListener('blur', onBlur);
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('message', onMessage);
    };
  }, [location, programSlug]);

  return (
    <div
      ref={hostRef}
      id={location === 'landing' ? 'v3-taster' : undefined}
      style={{
        background: 'var(--paper)', border: '1px solid var(--ink-900)', borderRadius: 6,
        padding: panel ? '18px 18px 14px' : '26px 24px 20px',
        boxShadow: panel ? 'none' : 'var(--shadow-2)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--bone)', background: 'var(--seal-500)', padding: '3px 7px' }}>FREE TASTER</span>
        <span style={MONO}>{DATES.tasterLong.toUpperCase()}</span>
      </div>

      <div style={{ fontFamily: 'var(--font-display)', fontSize: panel ? 20 : 26, fontWeight: 600, letterSpacing: '-.024em', lineHeight: 1.15, marginTop: 11 }}>
        Sit in before you commit.
      </div>
      <p style={{ fontSize: panel ? 13 : 15, lineHeight: 1.55, color: 'var(--fg-2)', margin: '7px 0 0' }}>
        One live session on {DATES.tasterDayMonth}, a week before the cohort starts on {DATES.cohortStartDayMonth}. Register below and we will send the joining link.
      </p>

      <div style={{ marginTop: 16, borderTop: '1px solid var(--border-soft)' }}>
        {visible ? (
          <iframe
            ref={iframeRef}
            data-tally-src={tallyEmbedUrl(TALLY_FORMS.taster, { alignLeft: true, hideTitle: true, transparentBackground: true })}
            title={`Register for the taster session on ${DATES.tasterDayMonth}`}
            loading="lazy"
            // Tally's embed script swaps data-tally-src for src but was
            // observed never to resize the frame here, so the height is set
            // explicitly. The form measured 724px at desktop width; the panel
            // variant is narrower, so its labels wrap and it needs more.
            height={panel ? FRAME_H.panel : FRAME_H.full}
            style={{ width: '100%', border: 0, display: 'block', background: 'transparent' }}
          />
        ) : (
          // Holds the space so nothing jumps when the frame mounts.
          <div aria-hidden="true" style={{ height: panel ? FRAME_H.panel : FRAME_H.full }} />
        )}
      </div>

      <div style={{ ...MONO, fontSize: 9, display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', paddingTop: 4 }}>
        <span>NO PAYMENT · APPLICATIONS CLOSE {DATES.applyByDayMonth.toUpperCase()}</span>
        {/* If the frame is blocked, the form is still reachable. */}
        <a
          href={tallyDirectUrl(TALLY_FORMS.taster)}
          target="_blank"
          rel="noopener"
          className="pv-h-seal7"
          style={{ color: 'var(--seal-600)', textDecoration: 'none', letterSpacing: '.08em' }}
        >
          OPEN IN A NEW TAB ↗
        </a>
      </div>
    </div>
  );
}
