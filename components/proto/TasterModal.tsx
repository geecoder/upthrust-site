'use client';

// The taster-session flow: a button anywhere on the site opens one shared
// dialog containing Upthrust's Tally form, and on submission the form is
// replaced by our own confirmation rather than Tally's.
//
// One dialog, provided once at the layout level, rather than one per button.
// Four buttons each owning a modal would mean four copies of the state and —
// once opened — four third-party iframes in the document.
//
// The iframe exists only while the dialog is open, so a page that nobody
// clicks never loads it at all. This replaced four always-embedded frames.

import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type ReactNode,
} from 'react';
import { TALLY_FORMS, tallyDirectUrl, tallyEmbedUrl } from '@/lib/config';
import { DATES } from '@/lib/cohort-config';
import { analytics } from '@/lib/analytics';
import type { ProgramSlug } from '@/lib/analytics';

export type TasterSource = 'landing' | 'assessment' | 'program_pricing';

type OpenArgs = { source: TasterSource; programSlug?: ProgramSlug };

type Ctx = { openTaster: (args: OpenArgs) => void };

const TasterContext = createContext<Ctx>({ openTaster: () => {} });

export function useTaster(): Ctx {
  return useContext(TasterContext);
}

export function TasterProvider({ children }: { children: ReactNode }) {
  const [args, setArgs] = useState<OpenArgs | null>(null);
  const openTaster = useCallback((next: OpenArgs) => setArgs(next), []);
  const value = useMemo(() => ({ openTaster }), [openTaster]);

  return (
    <TasterContext.Provider value={value}>
      {children}
      {args && <TasterDialog args={args} onClose={() => setArgs(null)} />}
    </TasterContext.Provider>
  );
}

function TasterDialog({ args, onClose }: { args: OpenArgs; onClose: () => void }) {
  const [registered, setRegistered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastLinkRef = useRef<HTMLAnchorElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const startedRef = useRef(false);
  const submittedRef = useRef(false);
  const restoreTo = useRef<HTMLElement | null>(null);

  // Remember what had focus so it can be handed back on close — otherwise
  // dismissing the dialog drops a keyboard user at the top of the document.
  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => restoreTo.current?.focus?.();
  }, []);

  // Escape closes, and the page behind must not scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  useEffect(() => {
    // The frame taking focus is the only visible signal that someone began
    // filling it in — an iframe's internal events are opaque to us.
    function onBlur() {
      if (document.activeElement !== iframeRef.current || startedRef.current) return;
      startedRef.current = true;
      analytics.tasterFormStarted({ source_page: args.source });
    }

    // Tally posts on a completed submission. This is the only thing that
    // marks the registration as done — never a click on Submit.
    function onMessage(event: MessageEvent) {
      if (!event.origin.includes('tally.so')) return;
      let payload = '';
      try { payload = typeof event.data === 'string' ? event.data : JSON.stringify(event.data); } catch { return; }
      if (!/submit|submitted|form_submitted/i.test(payload)) return;
      // Guarded with a ref, not inside the state updater: React may invoke an
      // updater twice, and firing analytics from one would double-count the
      // registration. Tally can also post more than once per submission.
      if (submittedRef.current) return;
      submittedRef.current = true;
      analytics.tasterSessionRegistered({ source_page: args.source, program_slug: args.programSlug });
      setRegistered(true);
    }

    window.addEventListener('blur', onBlur);
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('message', onMessage);
    };
  }, [args.source, args.programSlug]);

  // Keep Tab inside the dialog. The form itself is an iframe, so the cycle
  // runs between the close button and the last link around it.
  function onKeyDownTrap(e: React.KeyboardEvent) {
    if (e.key !== 'Tab') return;
    const first = closeRef.current;
    const last = lastLinkRef.current || closeRef.current;
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  return (
    <div
      className="pv-modal-scrim"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(11,26,43,.62)', backdropFilter: 'blur(3px)',
        display: 'grid', placeItems: 'center', padding: 24,
        animation: 'v3fade 180ms ease-out both',
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pv-taster-title"
        aria-describedby="pv-taster-desc"
        onKeyDown={onKeyDownTrap}
        className="pv-modal-panel"
        style={{
          position: 'relative', width: '100%', maxWidth: 560, maxHeight: '92vh',
          overflowY: 'auto', WebkitOverflowScrolling: 'touch',
          background: 'var(--paper)', border: '1px solid var(--ink-900)', borderRadius: 8,
          boxShadow: 'var(--shadow-3)',
          animation: 'v3drop 260ms cubic-bezier(.22,1,.36,1) both',
        }}
      >
        {/* Header stays put while the form scrolls under it. */}
        <div style={{ position: 'sticky', top: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '16px 20px', background: 'var(--ink-900)', color: 'var(--bone)', borderRadius: '8px 8px 0 0' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--bone)', background: 'var(--seal-500)', padding: '3px 7px' }}>FREE TASTER</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--seal-300)' }}>{DATES.tasterLong.toUpperCase()}</span>
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            style={{ font: 'inherit', fontSize: 20, lineHeight: 1, background: 'none', border: 0, color: 'var(--ink-300)', cursor: 'pointer', padding: '2px 4px' }}
          >
            ×
          </button>
        </div>

        {registered ? (
          <div style={{ padding: '30px 26px 28px' }} role="status" aria-live="polite">
            <div aria-hidden="true" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--moss-50)', border: '1px solid var(--moss-500)', display: 'grid', placeItems: 'center', color: 'var(--moss-700)', fontSize: 20 }}>✓</div>
            <h2 id="pv-taster-title" style={{ fontFamily: 'var(--font-display)', fontSize: 27, fontWeight: 600, letterSpacing: '-.026em', lineHeight: 1.14, margin: '16px 0 0' }}>
              You are registered.
            </h2>
            <p id="pv-taster-desc" style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: '10px 0 0' }}>
              Thank you — <strong style={{ color: 'var(--fg-1)' }}>we will get in touch with you shortly</strong> with the joining link for the session on {DATES.tasterDayMonth}.
            </p>

            <div style={{ margin: '22px 0 0', borderTop: '2px solid var(--ink-900)' }}>
              {[
                { n: 'NEXT', t: 'We email you the joining link', d: `Before ${DATES.tasterDayMonth}.` },
                { n: 'ON THE NIGHT', t: 'Sit in on a live session', d: 'Ask anything. Nothing is expected of you.' },
                { n: 'AFTER', t: 'Decide in your own time', d: `Applications close ${DATES.applyByDayMonth}; the cohort starts ${DATES.cohortStartDayMonth}.` },
              ].map((x) => (
                <div key={x.n} style={{ display: 'grid', gridTemplateColumns: '104px minmax(0,1fr)', gap: 14, padding: '13px 0', borderBottom: '1px solid var(--border-soft)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)', paddingTop: 3 }}>{x.n}</span>
                  <span>
                    <span style={{ display: 'block', fontSize: 15, fontWeight: 600 }}>{x.t}</span>
                    <span style={{ display: 'block', fontSize: 13, lineHeight: 1.5, color: 'var(--fg-2)', marginTop: 2 }}>{x.d}</span>
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="pv-h-ink800"
              style={{ font: 'inherit', fontSize: 15, fontWeight: 500, height: 48, width: '100%', marginTop: 22, background: 'var(--ink-900)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer' }}
            >
              Done
            </button>
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <a
                ref={lastLinkRef}
                href="/accelerator"
                className="pv-h-seal7"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--seal-600)', textDecoration: 'none' }}
              >
                MEANWHILE, SEE HOW A COHORT WEEK RUNS ↗
              </a>
            </div>
          </div>
        ) : (
          <div style={{ padding: '24px 22px 16px' }}>
            <h2 id="pv-taster-title" style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-.026em', lineHeight: 1.14, margin: 0 }}>
              Attend the free taster session.
            </h2>
            <p id="pv-taster-desc" style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--fg-2)', margin: '9px 0 0' }}>
              One live session on {DATES.tasterDayMonth}, a week before the cohort starts on {DATES.cohortStartDayMonth}. Register your interest and we will get in touch with the joining link.
            </p>

            <div style={{ marginTop: 16, borderTop: '1px solid var(--border-soft)' }}>
              <iframe
                ref={iframeRef}
                src={tallyEmbedUrl(TALLY_FORMS.taster, { alignLeft: true, hideTitle: true, transparentBackground: true })}
                title={`Register for the taster session on ${DATES.tasterDayMonth}`}
                // src rather than data-tally-src: that attribute needs Tally's
                // script to run loadEmbeds() *after* the frame is in the DOM,
                // which is fragile in a dialog that mounts on click. Loading
                // the embed URL directly removes the dependency, and the
                // script's resizing was already observed not to work here.
                height={800}
                style={{ width: '100%', border: 0, display: 'block', background: 'transparent' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--fg-3)', paddingBottom: 6 }}>
              <span>NO PAYMENT · NO OBLIGATION</span>
              {/* Keeps the form reachable if the frame is blocked. */}
              <a
                ref={lastLinkRef}
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
        )}
      </div>
    </div>
  );
}
