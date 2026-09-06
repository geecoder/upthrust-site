'use client';

// The prototype's `isProg` block, section for section:
//   1. Hero — back link, facts row, seat bar, rolling artefact stack
//   2. The tools you will work in
//   3. Walk into the job able to do this — six capability areas
//   4. {n} weeks. {n} artefacts. — week rail, selected week, phases, full curriculum
//   5. Your facilitators
//   6. Choose how far you take it (#v3-pay) — tiers, add-on, comparison, payment
//   7. Good to know before you enrol
//   8. Where it leads + NO JOB GUARANTEE
//   9. Closing CTA
//
// Three places where the prototype is followed in form but not literally, each
// marked at the line: the hero's "Take an assessment" button (its handler is
// goHome, contradicting its own label), the payment panel's "PLACE HELD FOR 30
// MINUTES" line (there is no seat hold), and the payment CTAs (they hand off to
// the real /enrol flow rather than being inert).

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSessionToken } from '@/lib/payments/enrolment-reference';
import { trackEvent } from '@/lib/analytics';
import { TRACKING_EVENTS } from '@/lib/tracking-events';
import { P, PROG_HREF, type ProgKey } from '@/lib/proto/data';
import { detail, type BankInput } from '@/lib/proto/detail';
import { scrollToId, useProto, useProtoRoute } from '@/lib/proto/store';
import { AnonAvatar, Photo } from '@/components/proto/Photo';
import { ToolIcon } from '@/components/proto/ToolIcon';

const WRAP = 'pv-wrap';

export function ProgContent({ progKey, bank }: { progKey: ProgKey; bank: BankInput }) {
  useProtoRoute(progKey);
  const { s, set } = useProto();
  const router = useRouter();

  // Minted in the browser so every payer gets their own reference.
  const [payToken, setPayToken] = useState('');
  useEffect(() => { setPayToken(getSessionToken()); }, []);

  const payPanelRef = useRef<HTMLDivElement>(null);

  // Top of the enrolment funnel — fired once per page view, when the pricing
  // section actually comes into view rather than merely existing in the DOM.
  const pricingSeen = useRef(false);
  useEffect(() => {
    const el = document.getElementById('v3-pay');
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !pricingSeen.current) {
          pricingSeen.current = true;
          trackEvent(TRACKING_EVENTS.pricingSectionViewed, { programme: P[progKey].n });
          io.disconnect();
        }
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [progKey]);

  const d = detail(progKey, s, bank, payToken);

  const enrol = () => {
    trackEvent(TRACKING_EVENTS.enrolCtaClicked, {
      programme: d.name, tier: d.tierName, plan: d.planName, region: d.regionName, amount_due: d.due,
    });
    scrollToId('v3-pay');
  };

  // Opening the panel is the strongest intent signal on the page: it is the
  // step where someone asks for the account to pay into.
  const openPay = () => {
    set({ payOpen: true });
    trackEvent(TRACKING_EVENTS.bankDetailsRequested, {
      programme: d.name, tier: d.tierName, plan: d.planName,
      add_on: d.addOn.on ? d.addOn.name : null,
      region: d.regionName, currency: d.payMethod, amount_due: d.due, reference: d.payRef,
    });
    // The panel renders below the fold, so without this the button looks inert.
    window.setTimeout(() => {
      payPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };
  const goHome = () => router.push('/');
  const goAssess = () => router.push('/assessment');

  // The panel's CTAs carry the selection into the real enrolment flow, where
  // the amount is recomputed and the reference minted server-side.
  const enrolHref = `/enrol?programme=${progKey}&tier=${d.isInt ? 'single' : s.cTier}&plan=${d.isInt ? 'full' : s.cPlan}${s.cAdd && d.isPath ? '&addon=' + d.addOn.slug : ''}`;
  const goEnrolFlow = () => router.push(enrolHref);

  const copy = async (k: string, v: string) => {
    trackEvent(TRACKING_EVENTS.bankDetailCopied, { programme: d.name, field: k, region: d.regionName });
    try { await navigator.clipboard.writeText(v); } catch { /* clipboard unavailable — the value is on screen */ }
    set({ copied: k });
    window.setTimeout(() => set({ copied: '' }), 1600);
  };

  return (
    <div style={{ animation: 'v3fade 340ms both' }}>

      {/* ─────────── 1. HERO ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', position: 'relative', overflow: 'hidden', background: d.heroBg, color: d.heroFg }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(to right,${d.grid} 0 1px,transparent 1px 28px),repeating-linear-gradient(to bottom,${d.grid} 0 1px,transparent 1px 28px)`, pointerEvents: 'none' }} />

        <div className={WRAP} style={{ position: 'relative', padding: '20px 40px 0' }}>
          <button onClick={goHome} className="pv-h-seal" style={{ font: 'inherit', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', background: 'none', border: 0, padding: 0, cursor: 'pointer', color: d.dim, transition: 'color 150ms' }}>← ALL PROGRAMMES</button>
        </div>

        <div className={`${WRAP} pv-2col`} style={{ position: 'relative', padding: '26px 40px 46px', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: d.tagfg, background: d.tagbg, padding: '3px 7px' }}>{d.tag}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: d.dim }}>{d.code} · STARTS 20 SEP</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5.4vw,76px)', fontWeight: 600, letterSpacing: '-.04em', lineHeight: .98, margin: '20px 0 0', color: d.heroFg, animation: 'v3rise 620ms cubic-bezier(.22,1,.36,1) both' }}>{d.name}</h1>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2vw,26px)', fontWeight: 500, letterSpacing: '-.02em', color: d.accent, marginTop: 14 }}>{d.line}</div>

            <div className="pv-statrow" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,auto)', gap: '0 30px', margin: '34px 0 0', justifyContent: 'start' }}>
              {d.facts.map(f => (
                <span key={f.l} style={{ borderTop: `2px solid ${d.rule}`, paddingTop: 9 }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-.028em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: d.heroFg }}>{f.n}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: d.dim, marginTop: 6 }}>{f.l}</span>
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, margin: '32px 0 0', flexWrap: 'wrap' }}>
              <button onClick={enrol} className="pv-h-seal600-lift pv-cta" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 52, padding: '0 26px', background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', transition: 'transform 150ms' }}>Enrol · from {d.from}</button>
              {/* Label says assessment; the prototype's handler is goHome. Following the label. */}
              <button onClick={goAssess} className="pv-h-lift2 pv-cta" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 52, padding: '0 24px', background: 'none', color: d.heroFg, border: `1px solid ${d.btnbd}`, borderRadius: 4, cursor: 'pointer', transition: 'transform 150ms' }}>Take an assessment</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '22px 0 0', flexWrap: 'wrap' }}>
              <span style={{ minWidth: 200, height: 4, background: d.trk }}>
                <span style={{ display: 'block', height: 4, width: d.pct, background: 'var(--seal-500)', transformOrigin: 'left', animation: 'v3bar 760ms cubic-bezier(.22,1,.36,1) both' }} />
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: d.seatfg }}>{d.seats}</span>
            </div>
          </div>

          {/* Rolling artefact stack */}
          <div className="pv-herostack" style={{ position: 'relative', minHeight: 560, display: 'flex', alignItems: 'center' }}>
            <div className="pv-artstack" style={{ position: 'relative', width: '100%', height: 520 }}>
              {d.stack.map(c => (
                // The v3card keyframe ends at opacity 1, so the animation lives
                // on the wrapper and each card's resting opacity on the inner
                // element — as the prototype splits them.
                <div key={c.wk} style={{ position: 'absolute', left: 0, right: 0, top: c.y, zIndex: c.z, animation: 'v3card 500ms cubic-bezier(.22,1,.36,1) both' }}>
                  <div style={{ background: 'var(--paper)', border: '1px solid var(--ink-800)', boxShadow: 'var(--shadow-3)', padding: '20px 22px', height: c.h, overflow: 'hidden', opacity: c.op, transition: 'opacity 300ms' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, borderBottom: '1px solid var(--border-soft)', paddingBottom: 11 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)' }}>{c.wk}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.08em', color: c.bfg, background: c.bbg, padding: '3px 8px' }}>{c.badge}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.2, marginTop: 14, color: 'var(--fg-1)' }}>{c.t}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 16 }} aria-hidden="true">
                      <span style={{ height: 6, background: 'var(--paper-dim)', width: '94%' }} />
                      <span style={{ height: 6, background: 'var(--paper-dim)', width: '76%' }} />
                      <span style={{ height: 6, background: c.acc, width: '50%' }} />
                      <span style={{ height: 6, background: 'var(--paper-dim)', width: '66%' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 2. TOOLS ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--bone-dim)' }}>
        <div className={WRAP} style={{ padding: '56px 40px 60px' }}>
          <div data-rv="" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.05, margin: 0 }}>The tools you will work in.</h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--fg-3)' }}>USED ON REAL WORK, NOT DEMOED IN SLIDES</span>
          </div>
          <div data-rv="" data-d="60" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '26px 0 0' }}>
            {d.tools.map(t => (
              <span key={t.l} className="pv-h-white" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.06em', border: '1px solid var(--border-strong)', background: 'var(--paper)', padding: '9px 14px', color: 'var(--fg-1)', transition: 'background 150ms' }}>
                <ToolIcon icon={t.icon} label={t.l} />{t.l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 3. CAPABILITY AREAS ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)' }}>
        <div className={WRAP} style={{ padding: '56px 40px 62px' }}>
          <div data-rv="" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--fg-3)' }}>SIX CAPABILITY AREAS · ALL RUBRIC-ASSESSED</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: '14px 0 0' }}>Walk into the job<br />able to do this.</h2>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--fg-3)', maxWidth: '20em', textAlign: 'right' }}>EACH AREA IS SCORED ON YOUR CAPABILITY PASSPORT</span>
          </div>
          <div data-rv="" data-d="80" className="pv-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 10, margin: '32px 0 0' }}>
            {d.caps.map(c => (
              <div key={c.n} onMouseEnter={() => set({ capOpen: c.i })} className="pv-h-lift4" style={{ background: c.bg, border: `1px solid ${c.bd}`, borderRadius: 6, padding: '22px 20px', minHeight: 158, display: 'flex', flexDirection: 'column', cursor: 'default', transition: 'background 260ms cubic-bezier(.22,1,.36,1), border-color 260ms, transform 220ms' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: c.nfg }}>{c.n}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.08em', color: c.nfg }}>RUBRIC-SCORED</span>
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.15, marginTop: 14, color: c.fg }}>{c.a}</span>
                <span style={{ flex: 1, minHeight: 10 }} />
                <span style={{ display: 'flex', gap: 9, alignItems: 'baseline', fontSize: 14, lineHeight: 1.5, color: c.cfg }}><span style={{ color: 'var(--seal-500)' }}>→</span><span>{c.c}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 4. CURRICULUM ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--ink-900)', color: 'var(--bone)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right,rgba(244,239,230,.04) 0 1px,transparent 1px 32px),repeating-linear-gradient(to bottom,rgba(244,239,230,.04) 0 1px,transparent 1px 32px)', pointerEvents: 'none' }} />
        <div className={WRAP} style={{ position: 'relative', padding: '56px 40px 62px' }}>
          <div data-rv="" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.05, margin: 0, color: 'var(--bone)' }}>{d.weekCount} weeks. {d.weekCount} artefacts.</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--ink-300)' }}>{d.wkHint}</span>
              <button onClick={() => set({ wkAuto: !s.wkAuto })} style={{ font: 'inherit', fontSize: 12, fontWeight: 500, height: 34, padding: '0 14px', background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', borderRadius: 3, cursor: 'pointer' }}>{d.wkBtn}</button>
              <button onClick={() => set({ currOpen: !s.currOpen })} className="pv-h-seal600" style={{ font: 'inherit', fontSize: 13, fontWeight: 500, height: 34, padding: '0 16px', background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 3, cursor: 'pointer', transition: 'background 150ms' }}>{d.currBtn}</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 5, margin: '30px 0 0', flexWrap: 'wrap' }}>
            {d.weeks.map(w => (
              <button key={w.n} onClick={() => set({ pWeek: w.i, wkAuto: false })} aria-label={`Week ${w.n}`} style={{ font: 'inherit', flex: 1, minWidth: 52, textAlign: 'left', background: w.bg, border: `1px solid ${w.bd}`, padding: '12px 10px 10px', cursor: 'pointer', transition: 'background 260ms cubic-bezier(.65,0,.35,1), border-color 260ms' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: w.nfg }}>{w.n}</span>
                <span style={{ display: 'block', height: 2, background: w.phase, marginTop: 9 }} />
              </button>
            ))}
          </div>

          <div className="pv-2col" style={{ display: 'grid', gridTemplateColumns: '1.35fr .65fr', gap: 32, margin: '26px 0 0', alignItems: 'start' }}>
            <div key={d.wkSel.n} style={{ border: '1px solid rgba(244,239,230,.2)', background: 'rgba(244,239,230,.03)', padding: '26px 26px 24px', animation: 'v3fade 300ms both' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--seal-300)' }}>{d.wkSel.phase} · WEEK {d.wkSel.n}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,2.6vw,34px)', fontWeight: 600, letterSpacing: '-.028em', lineHeight: 1.1, marginTop: 12, color: 'var(--bone)' }}>{d.wkSel.t}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--moss-500)', border: '1px solid var(--moss-500)', borderRadius: 999, padding: '3px 9px' }}>Rubric-scored</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--ink-300)' }}>REVIEWED WITHIN 48 HRS · REVISED BEFORE IT COUNTS</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 22 }} aria-hidden="true">
                <span style={{ height: 5, background: 'rgba(244,239,230,.16)', width: '94%' }} />
                <span style={{ height: 5, background: 'rgba(244,239,230,.16)', width: '78%' }} />
                <span style={{ height: 5, background: 'var(--seal-500)', width: '52%' }} />
                <span style={{ height: 5, background: 'rgba(244,239,230,.16)', width: '86%' }} />
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--ink-300)' }}>PORTFOLIO BANKED</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 7 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 600, letterSpacing: '-.04em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: 'var(--bone)' }}>{d.wkSel.n}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-300)' }}>/ {d.weekCount}</span>
              </div>
              <div style={{ height: 4, background: 'rgba(244,239,230,.16)', marginTop: 14 }}>
                <span style={{ display: 'block', height: 4, width: d.wkPct, background: 'var(--seal-500)', transition: 'width 320ms cubic-bezier(.22,1,.36,1)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 24, borderTop: '1px solid rgba(244,239,230,.18)' }}>
                {d.phases.map(p => (
                  <span key={p.l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: '1px solid rgba(244,239,230,.1)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ width: 10, height: 3, background: p.c }} /><span style={{ fontSize: 13, color: p.fg }}>{p.l}</span></span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-300)' }}>{p.w}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {d.currOpen && (
            <div style={{ margin: '26px 0 0', borderTop: '1px solid rgba(244,239,230,.2)', animation: 'v3rise 320ms cubic-bezier(.22,1,.36,1) both' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 0 12px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', color: 'var(--seal-300)' }}>FULL CURRICULUM · {d.weekCount} WEEKS · ONE ARTEFACT EACH</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--ink-400)' }}>SELECT ANY WEEK TO PREVIEW IT ABOVE</span>
              </div>
              <div className="pv-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                {d.allWeeks.map(w => (
                  <button key={w.n} onClick={() => set({ pWeek: w.i, wkAuto: false })} className="pv-h-bonefaint" style={{ font: 'inherit', textAlign: 'left', display: 'grid', gridTemplateColumns: '56px minmax(0,1fr) auto', gap: 14, alignItems: 'center', background: w.bg, border: 0, borderBottom: '1px solid rgba(244,239,230,.12)', padding: '13px 10px', cursor: 'pointer', transition: 'background 180ms' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 7, height: 7, background: w.c }} /><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-300)' }}>{w.n}</span></span>
                    <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--bone)' }}>{w.t}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.08em', color: 'var(--ink-400)', whiteSpace: 'nowrap' }}>{w.phase}</span>
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22, flexWrap: 'wrap' }}>
                <button onClick={enrol} className="pv-h-seal600" style={{ font: 'inherit', fontSize: 14, fontWeight: 500, height: 44, padding: '0 20px', background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer' }}>See pricing for {d.name} →</button>
                <button onClick={() => set({ currOpen: false })} style={{ font: 'inherit', fontSize: 14, fontWeight: 500, height: 44, padding: '0 18px', background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', borderRadius: 4, cursor: 'pointer' }}>Collapse</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─────────── 5. FACILITATORS ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)' }}>
        <div className={WRAP} style={{ padding: '56px 40px 62px' }}>
          <div data-rv="" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.05, margin: 0 }}>Your facilitators.</h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--fg-3)' }}>{d.isInt ? 'FACILITATED THROUGHOUT BY THE FOUNDER' : 'THE GUEST REVIEWER STAYS ANONYMOUS UNTIL DEFENCE'}</span>
          </div>
          {/* The intensives are a single-facilitator programme, so the grid
              tracks the count rather than always being three across. */}
          <div data-rv="" data-d="80" className="pv-faccards" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(d.facs.length, 3)},minmax(0,1fr))`, gap: 14, margin: '30px 0 0', maxWidth: d.facs.length === 1 ? 400 : undefined }}>
            {d.facs.map(f => (
              <div key={f.id} className="pv-h-lift4sh" style={{ background: 'var(--paper)', border: '1px solid var(--border-strong)', borderRadius: 6, overflow: 'hidden', transition: 'transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms' }}>
                <div style={{ position: 'relative', aspectRatio: '5/4' }}>
                  {f.anon
                    ? <AnonAvatar style={{ position: 'absolute', inset: 0 }} />
                    : <Photo src={f.img!} alt={`${f.n}, ${f.r}`} placeholder="Drop headshot" sizes="(max-width: 860px) 100vw, (max-width: 1180px) 50vw, 33vw" style={{ position: 'absolute', inset: 0 }} imgStyle={{ objectPosition: 'center top' }} />}
                  <span style={{ position: 'absolute', top: 9, left: 9, fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.08em', color: f.anon ? 'var(--bone)' : 'var(--fg-2)', background: f.anon ? 'rgba(11,26,43,.72)' : 'rgba(250,250,247,.9)', border: `1px solid ${f.anon ? 'rgba(244,239,230,.3)' : 'var(--border-strong)'}`, padding: '3px 6px' }}>{f.eyebrow}</span>
                </div>
                <div style={{ padding: '16px 18px 18px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, letterSpacing: '-.018em', lineHeight: 1.2 }}>{f.n}</div>
                  <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 3 }}>{f.r}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border-hair)', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--fg-3)' }}>LEADS</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-1)' }}>{f.w}</span>
                  </div>
                  {f.li
                    ? (
                      <a href={f.li} target="_blank" rel="noopener" className="pv-h-seal7" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 10, paddingTop: 11, borderTop: '1px solid var(--border-hair)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--seal-600)', textDecoration: 'none', transition: 'color 150ms' }}>
                        <span>LINKEDIN</span><span>↗</span>
                      </a>
                    )
                    : (
                      <div style={{ marginTop: 10, paddingTop: 11, borderTop: '1px solid var(--border-hair)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--fg-3)' }}>NOT NAMED BEFORE DEFENCE</div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 6. PRICING ─────────── */}
      <section id="v3-pay" style={{ borderBottom: '1px solid var(--border-strong)' }}>
        <div className={WRAP} style={{ padding: '56px 40px 62px' }}>
          <div data-rv="" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.05, margin: 0 }}>Choose how far you take it.</h2>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--seal-500)', animation: 'v3pulse 1.6s ease-in-out infinite alternate' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--fg-1)' }}>COHORT STARTS {d.startDate} · APPLICATIONS CLOSE {d.closeDate}</span>
              </div>
              {/* Pricing follows the visitor's location and is not selectable —
                  the currency is resolved server-side from edge geo headers, so
                  there is deliberately no switcher here. */}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--fg-3)', marginTop: 6 }}>PRICES FOR {d.regionName} · {d.payMethod}</div>
            </div>
          </div>

          {d.isPath && (
            <>
              <div className="pv-3col" style={{ display: 'grid', gridTemplateColumns: d.canAddOn ? '1fr 1fr 1.05fr' : '1fr 1fr', gap: 14, margin: '30px 0 0', alignItems: 'start' }}>
                <button onClick={() => { set({ cTier: 'std' }); trackEvent(TRACKING_EVENTS.tierSelected, { programme: d.name, tier: 'Standard', region: d.regionName }); }} aria-pressed={d.tStd.on} className="pv-h-sh2" style={{ font: 'inherit', textAlign: 'left', background: d.tStd.bg, border: `1px solid ${d.tStd.bd}`, borderRadius: 6, padding: '22px 20px', cursor: 'pointer', transition: 'all 180ms cubic-bezier(.22,1,.36,1)' }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)' }}>TIER 01</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-.024em', marginTop: 8 }}>Standard</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing: '-.03em', marginTop: 14, fontVariantNumeric: 'tabular-nums' }}>{d.tStd.price}</span>
                  <span style={{ display: 'block', marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border-hair)' }}>
                    {d.stdInc.map(i => (
                      <span key={i} style={{ display: 'flex', gap: 9, alignItems: 'baseline', padding: '5px 0', fontSize: 13, lineHeight: 1.4 }}><span style={{ color: 'var(--moss-500)' }}>✓</span><span>{i}</span></span>
                    ))}
                  </span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--fg-3)', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border-hair)' }}>ENDS WITH A CAPABILITY RECORD</span>
                </button>

                <button onClick={() => { set({ cTier: 'prem' }); trackEvent(TRACKING_EVENTS.tierSelected, { programme: d.name, tier: 'Premium', region: d.regionName }); }} aria-pressed={d.tPrem.on} className="pv-h-sh2" style={{ font: 'inherit', textAlign: 'left', position: 'relative', background: d.tPrem.bg, border: `1px solid ${d.tPrem.bd}`, borderRadius: 6, padding: '22px 20px', cursor: 'pointer', transition: 'all 180ms cubic-bezier(.22,1,.36,1)' }}>
                  <span style={{ position: 'absolute', top: 0, right: 0, background: 'var(--ink-900)', color: 'var(--bone)', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.1em', padding: '4px 8px' }}>MOST COMPLETE</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)' }}>TIER 02</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-.024em', marginTop: 8 }}>Premium</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing: '-.03em', marginTop: 14, fontVariantNumeric: 'tabular-nums' }}>{d.tPrem.price}</span>
                  <span style={{ display: 'block', marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border-hair)' }}>
                    <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)', paddingBottom: 6 }}>EVERYTHING IN STANDARD, PLUS</span>
                    {d.premInc.map(i => (
                      <span key={i} style={{ display: 'flex', gap: 9, alignItems: 'baseline', padding: '5px 0', fontSize: 13, lineHeight: 1.4 }}><span style={{ color: 'var(--seal-500)' }}>✓</span><span>{i}</span></span>
                    ))}
                  </span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--seal-600)', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border-hair)' }}>ENDS WITH A VERIFIED PASSPORT</span>
                </button>

                {d.canAddOn && (
                <div style={{ background: 'var(--ink-900)', color: 'var(--bone)', border: `1px solid ${d.addOn.bd}`, borderRadius: 6, padding: '22px 20px', transition: 'border-color 200ms' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.1em', color: 'var(--bone)', background: 'var(--seal-500)', padding: '3px 6px' }}>OPTIONAL · +5 WEEKS</span>
                  </span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600, letterSpacing: '-.022em', lineHeight: 1.15, marginTop: 12, color: 'var(--bone)' }}>{d.addOn.name}</span>
                  <span style={{ display: 'block', fontSize: 13, lineHeight: 1.45, color: 'var(--ink-200)', marginTop: 6 }}>{d.addOn.line}</span>
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 14 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-.026em', fontVariantNumeric: 'tabular-nums', color: 'var(--seal-300)' }}>{d.addOn.bundle}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-300)', textDecoration: 'line-through' }}>{d.addOn.alone}</span>
                  </span>
                  <button
                    onClick={() => {
                      const next = !s.cAdd;
                      set({ cAdd: next });
                      trackEvent(TRACKING_EVENTS.addOnToggled, { programme: d.name, add_on: d.addOn.name, added: next, region: d.regionName });
                    }}
                    aria-pressed={d.addOn.on}
                    style={{ font: 'inherit', fontSize: 13, fontWeight: 500, height: 40, width: '100%', marginTop: 14, background: d.addOn.btnBg, color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', transition: 'background 180ms' }}
                  >{d.addOn.btn}</button>
                </div>
                )}
              </div>

              <div className="pv-2col" style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 20, margin: '20px 0 0', alignItems: 'start' }}>
                <div className="pv-cmp">
                <div style={{ border: '1px solid var(--border-strong)', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) 1fr 1fr', background: 'var(--paper-dim)', borderBottom: '1px solid var(--border-strong)' }}>
                    <span style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)' }}>WHAT CHANGES</span>
                    <span style={{ padding: '11px 12px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-2)', textAlign: 'center', borderLeft: '1px solid var(--border-soft)' }}>STANDARD</span>
                    <span style={{ padding: '11px 12px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-1)', textAlign: 'center', borderLeft: '1px solid var(--border-soft)', background: 'var(--bone-dim)' }}>PREMIUM</span>
                  </div>
                  {d.tierRows.map(t => (
                    <div key={t.l} className="pv-h-paper" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) 1fr 1fr', borderBottom: '1px solid var(--border-hair)' }}>
                      <span style={{ padding: '11px 16px', fontSize: 13 }}>{t.l}</span>
                      <span style={{ padding: '11px 12px', fontSize: 12, textAlign: 'center', color: t.sfg, borderLeft: '1px solid var(--border-hair)' }}>{t.s}</span>
                      <span style={{ padding: '11px 12px', fontSize: 12, textAlign: 'center', color: t.pfg, borderLeft: '1px solid var(--border-hair)', background: 'var(--bone-dim)' }}>{t.p}</span>
                    </div>
                  ))}
                </div>
                </div>

                <div style={{ background: 'var(--ink-900)', color: 'var(--bone)', borderRadius: 6, padding: '24px 22px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--seal-300)' }}>DUE TODAY</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.4vw,42px)', fontWeight: 600, letterSpacing: '-.034em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: 'var(--bone)', marginTop: 10 }}>{d.due}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', color: 'var(--ink-300)', marginTop: 8 }}>{d.dueNote}</div>
                  <div className="pv-planrow" style={{ display: 'flex', gap: 6, marginTop: 18 }}>
                    {d.planTabs.map(p => (
                      <button key={p.k} onClick={() => { set({ cPlan: p.k }); trackEvent(TRACKING_EVENTS.planSelected, { programme: d.name, plan: p.l, tier: d.tierName, region: d.regionName }); }} aria-pressed={s.cPlan === p.k} style={{ font: 'inherit', flex: 1, textAlign: 'left', background: p.bg, border: `1px solid ${p.bd}`, borderRadius: 3, padding: '10px 9px', cursor: 'pointer', transition: 'all 150ms' }}>
                        <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--fg-1)' }}>{p.l}</span>
                        <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-2)', marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>{p.amt}</span>
                        <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.04em', color: p.nfg, marginTop: 5, fontVariantNumeric: 'tabular-nums' }}>{p.note}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', color: 'var(--ink-300)', marginTop: 12, lineHeight: 1.6 }}>{d.planTotalLine}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(244,239,230,.18)', fontSize: 12 }}>
                    <span style={{ color: 'var(--ink-300)' }}>Credential</span><span style={{ fontWeight: 600, textAlign: 'right', color: 'var(--bone)' }}>{d.credLine}</span>
                  </div>
                  <button onClick={openPay} aria-expanded={d.payOpen} aria-controls="v3-pay-panel" className="pv-h-seal600" style={{ font: 'inherit', fontSize: 15, fontWeight: 500, height: 48, width: '100%', marginTop: 18, background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', transition: 'background 150ms' }}>{d.payCta} →</button>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', color: 'var(--ink-400)', marginTop: 10, textAlign: 'center' }}>{d.payMethod}</div>
                </div>
              </div>

            </>
          )}

          {d.isInt && (
            <div className="pv-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, margin: '30px 0 0' }}>
              <div style={{ background: 'var(--paper)', border: '1px solid var(--border-strong)', borderRadius: 6, padding: '26px 24px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)' }}>ON ITS OWN</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, letterSpacing: '-.032em', marginTop: 12, fontVariantNumeric: 'tabular-nums' }}>{d.addOn.alone}</span>
                <span style={{ fontSize: 14, color: 'var(--fg-2)', marginTop: 8 }}>Five weeks, live, with the capstone defence.</span>
                <span style={{ flex: 1, minHeight: 14 }} />
                <button onClick={openPay} aria-expanded={d.payOpen} aria-controls="v3-pay-panel" className="pv-h-ink800" style={{ font: 'inherit', fontSize: 15, fontWeight: 500, height: 46, marginTop: 16, background: 'var(--ink-900)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer' }}>Enrol standalone · {d.due}</button>
              </div>
              <div style={{ background: 'var(--ink-900)', color: 'var(--bone)', border: '1px solid var(--seal-500)', borderRadius: 6, padding: '26px 24px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <span style={{ position: 'absolute', top: 0, right: 0, background: 'var(--seal-500)', color: 'var(--bone)', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.1em', padding: '4px 8px' }}>BEST VALUE</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--seal-300)' }}>ADDED TO A 12-WEEK PATHWAY</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, letterSpacing: '-.032em', marginTop: 12, fontVariantNumeric: 'tabular-nums', color: 'var(--bone)' }}>{d.addOn.bundle}</span>
                <span style={{ fontSize: 14, color: 'var(--ink-200)', marginTop: 8 }}>Same programme, 25% off because you are already with us.</span>
                <span style={{ flex: 1, minHeight: 14 }} />
                <button onClick={goHome} style={{ font: 'inherit', fontSize: 15, fontWeight: 500, height: 46, marginTop: 16, background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer' }}>Pick a pathway first →</button>
              </div>
            </div>
          )}

          {/* One transfer panel, shared by pathways and intensives. */}
              {d.payOpen && (
                <div id="v3-pay-panel" ref={payPanelRef} style={{ margin: '20px 0 0', border: '1px solid var(--ink-900)', background: 'var(--paper)', animation: 'v3rise 300ms cubic-bezier(.22,1,.36,1) both', scrollMarginTop: 84 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '16px 24px', background: 'var(--ink-900)', color: 'var(--bone)', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', color: 'var(--seal-300)' }}>COMPLETE YOUR ENROLMENT</span>
                    <button onClick={() => set({ payOpen: false })} aria-label="Close" style={{ font: 'inherit', fontSize: 18, background: 'none', border: 0, cursor: 'pointer', color: 'var(--ink-300)', lineHeight: 1 }}>×</button>
                  </div>

                  <div className="pv-2col pv-paypanel" style={{ display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 0 }}>
                    <div style={{ padding: '26px 24px', borderRight: '1px solid var(--border-soft)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--fg-3)' }}>YOUR ENROLMENT</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-.022em', marginTop: 10 }}>{d.name}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderTop: '1px solid var(--border-hair)', marginTop: 12, fontSize: 13 }}><span style={{ color: 'var(--fg-3)' }}>Tier</span><span style={{ fontWeight: 600 }}>{d.tierName}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderTop: '1px solid var(--border-hair)', fontSize: 13 }}><span style={{ color: 'var(--fg-3)' }}>Plan</span><span style={{ fontWeight: 600 }}>{d.planName}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderTop: '1px solid var(--border-hair)', fontSize: 13 }}><span style={{ color: 'var(--fg-3)' }}>Reference</span><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{d.payRef}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '14px 0 0', borderTop: '1px solid var(--ink-900)', marginTop: 6 }}>
                        <span style={{ fontSize: 13, color: 'var(--fg-3)' }}>Amount</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-.026em', fontVariantNumeric: 'tabular-nums' }}>{d.due}</span>
                      </div>
                    </div>

                    <div style={{ padding: '26px 24px' }}>
                      {/* Bank transfer is the only rail. The prototype sent
                          Nigeria to a Paystack checkout; that is not in use, so
                          every region pays into the account for its currency.
                          The prototype's "PLACE HELD FOR 30 MINUTES" line is
                          also absent — there is no seat hold. */}
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--seal-600)' }}>TRANSFER TO</div>

                        {d.bankConfigured ? (
                          <>
                            <div style={{ marginTop: 12, border: '1px solid var(--border-strong)' }}>
                              {d.bankRows.filter(b => !b.intl).map(b => (
                                <div key={b.k} className="pv-bankrow" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto 66px', gap: 12, alignItems: 'center', padding: '11px 14px', borderBottom: '1px solid var(--border-hair)', background: 'var(--white)' }}>
                                  <span style={{ fontSize: 13, color: 'var(--fg-3)' }}>{b.k}</span>
                                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-1)', wordBreak: 'break-word' }}>{b.v}</span>
                                  <button onClick={() => copy(b.k, b.v)} className="pv-h-bonedim" style={{ font: 'inherit', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', padding: '5px 8px', background: 'none', border: '1px solid var(--border-strong)', borderRadius: 2, cursor: 'pointer', color: 'var(--fg-2)' }}>{b.btn}</button>
                                </div>
                              ))}

                              {/* IBAN and SWIFT matter only to someone sending from
                                  another country, so they sit in their own band
                                  rather than cluttering the domestic rows. */}
                              {d.bankRows.some(b => b.intl) && (
                                <>
                                  <div style={{ padding: '9px 14px', background: 'var(--paper-dim)', borderBottom: '1px solid var(--border-hair)', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)' }}>SENDING FROM ANOTHER COUNTRY</div>
                                  {d.bankRows.filter(b => b.intl).map(b => (
                                    <div key={b.k} className="pv-bankrow" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto 66px', gap: 12, alignItems: 'center', padding: '11px 14px', borderBottom: '1px solid var(--border-hair)', background: 'var(--white)' }}>
                                      <span style={{ fontSize: 13, color: 'var(--fg-3)' }}>{b.k}</span>
                                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-1)', wordBreak: 'break-word' }}>{b.v}</span>
                                      <button onClick={() => copy(b.k, b.v)} className="pv-h-bonedim" style={{ font: 'inherit', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', padding: '5px 8px', background: 'none', border: '1px solid var(--border-strong)', borderRadius: 2, cursor: 'pointer', color: 'var(--fg-2)' }}>{b.btn}</button>
                                    </div>
                                  ))}
                                </>
                              )}

                              <div className="pv-bankrow" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto 66px', gap: 12, alignItems: 'center', padding: '11px 14px', background: 'var(--seal-50)' }}>
                                <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>Payment reference</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-1)' }}>{d.payRef}</span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--seal-700)' }}>REQUIRED</span>
                              </div>
                            </div>

                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--fg-3)', margin: '20px 0 8px' }}>AFTER YOU TRANSFER</div>
                            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-2)', margin: 0 }}>
                              Email a screenshot or receipt of the payment to <span style={{ color: 'var(--seal-600)' }}>{d.proofEmail}</span>, with:
                            </p>
                            <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none' }}>
                              {['A screenshot or receipt of the transfer', 'Your full name, as it appears on the payment', `Your track — ${d.name}`, `The reference ${d.payRef}`].map(x => (
                                <li key={x} style={{ display: 'flex', gap: 9, alignItems: 'baseline', fontSize: 14, lineHeight: 1.5, color: 'var(--fg-2)', padding: '3px 0' }}>
                                  <span aria-hidden="true" style={{ color: 'var(--seal-500)' }}>→</span><span>{x}</span>
                                </li>
                              ))}
                            </ul>
                            <a
                              href={`mailto:${d.proofEmail}?subject=${encodeURIComponent(`Payment confirmation — ${d.name} — ${d.payRef}`)}&body=${encodeURIComponent(`Full name:\n\nTrack: ${d.name}\nTier: ${d.tierName}\nPlan: ${d.planName}\nAmount paid: ${d.due}\nReference: ${d.payRef}\n\n(Please attach a screenshot or receipt of the transfer.)`)}`}
                              className="pv-h-ink800"
                              onClick={() => trackEvent(TRACKING_EVENTS.paymentDeclared, {
                                programme: d.name, tier: d.tierName, plan: d.planName,
                                add_on: d.addOn.on ? d.addOn.name : null,
                                region: d.regionName, amount_due: d.due, reference: d.payRef,
                              })}
                              style={{ display: 'grid', placeItems: 'center', font: 'inherit', fontSize: 15, fontWeight: 500, height: 50, width: '100%', marginTop: 16, background: 'var(--ink-900)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', textDecoration: 'none' }}
                            >
                              Email payment confirmation
                            </a>
                          </>
                        ) : (
                          // A half-filled account block is worse than none: someone
                          // could transfer into the void. This is what shows when the
                          // region's env values are not all set.
                          <div style={{ marginTop: 12, padding: '16px 18px', border: '1px solid var(--ochre-500)', background: 'var(--ochre-50)' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--ochre-700)' }}>DETAILS ON REQUEST</div>
                            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-1)', margin: '8px 0 0' }}>
                              We do not yet publish {d.bankTitle || 'transfer'} details for your region. Email{' '}
                              <span style={{ color: 'var(--seal-600)' }}>{d.proofEmail || 'info@upthrustdigital.com'}</span> quoting reference {d.payRef} and we will send them to you directly.
                            </p>
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: 10, alignItems: 'start', marginTop: 14, padding: '12px 14px', background: 'var(--ochre-50)', borderLeft: '2px solid var(--ochre-500)' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--ochre-700)', whiteSpace: 'nowrap', paddingTop: 2 }}>NOTE</span>
                          <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-1)' }}>Your place is confirmed once we verify the transfer. We will email your enrolment confirmation after review.</span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', color: 'var(--fg-3)', marginTop: 12, textAlign: 'center' }}>{d.proc}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </div>
      </section>

      {/* ─────────── 7. FAQ ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--bone-dim)' }}>
        <div className={`${WRAP} pv-2col`} style={{ padding: '56px 40px 62px', display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 48, alignItems: 'start' }}>
          <div data-rv="">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.05, margin: 0 }}>Good to know<br />before you enrol.</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 22 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--seal-500)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--fg-3)' }}>THE FOUR WE GET ASKED MOST</span>
            </div>
            <button onClick={enrol} className="pv-h-seal" style={{ font: 'inherit', fontSize: 14, fontWeight: 500, background: 'none', border: 0, padding: '20px 0 0', cursor: 'pointer', color: 'var(--seal-600)' }}><span style={{ borderBottom: '1px solid var(--seal-300)' }}>Still unsure? Talk to us first →</span></button>
          </div>
          <div data-rv="" data-d="80" style={{ borderTop: '2px solid var(--ink-900)' }}>
            {d.ask.map(f => (
              <div key={f.q} style={{ borderBottom: '1px solid var(--border-soft)', background: f.bg, transition: 'background 200ms' }}>
                <button onClick={() => set({ askOpen: f.i })} aria-expanded={f.open} className="pv-h-paper" style={{ font: 'inherit', width: '100%', textAlign: 'left', background: 'none', border: 0, padding: '18px 16px', cursor: 'pointer', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 26px', gap: 14, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, letterSpacing: '-.016em', lineHeight: 1.25 }}>{f.q}</span>
                  <span style={{ fontSize: 18, color: 'var(--fg-3)', justifySelf: 'end', lineHeight: 1 }}>{f.mark}</span>
                </button>
                {f.open && (
                  <p style={{ margin: '0 0 20px', padding: '0 46px 0 16px', fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', animation: 'v3rise 240ms cubic-bezier(.22,1,.36,1) both' }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 8. WHERE IT LEADS ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)' }}>
        <div className={WRAP} style={{ padding: '56px 40px 62px' }}>
          <h2 data-rv="" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.05, margin: 0 }}>Where it leads.</h2>
          <div data-rv="" data-d="80" className="pv-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 10, margin: '30px 0 0' }}>
            {d.ladder.map(l => (
              <div key={l.n} style={{ background: l.bg, border: `1px solid ${l.bd}`, padding: '22px 20px', display: 'flex', flexDirection: 'column', minHeight: 126 }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: l.nfg }}>{l.n}</span>
                <span style={{ flex: 1, minHeight: 12 }} />
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-.022em', lineHeight: 1.15, color: l.tfg }}>{l.t}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0 0', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)', whiteSpace: 'nowrap' }}>NO JOB GUARANTEE</span>
            <span style={{ fontSize: 14, color: 'var(--fg-2)' }}>We build capability and evidence. The rest is you and your market.</span>
          </div>
        </div>
      </section>

      {/* ─────────── 9. CLOSING CTA ─────────── */}
      <section style={{ background: 'var(--ink-900)', color: 'var(--bone)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right,rgba(244,239,230,.05) 0 1px,transparent 1px 32px),repeating-linear-gradient(to bottom,rgba(244,239,230,.05) 0 1px,transparent 1px 32px)', pointerEvents: 'none' }} />
        <div className={`${WRAP} pv-2col`} style={{ position: 'relative', padding: '64px 40px 70px', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 44, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', color: 'var(--seal-300)' }}>{d.closeLine}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4.2vw,60px)', fontWeight: 600, letterSpacing: '-.04em', lineHeight: 1, margin: '16px 0 0', color: 'var(--bone)' }}>{d.name}<br />starts {d.startShort}.</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0 0', flexWrap: 'wrap' }}>
              <span style={{ minWidth: 220, height: 5, background: 'rgba(244,239,230,.16)' }}>
                <span style={{ display: 'block', height: 5, width: d.pct, background: 'var(--seal-500)', transformOrigin: 'left', animation: 'v3bar 760ms cubic-bezier(.22,1,.36,1) both' }} />
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--bone)' }}>{d.seats}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={enrol} className="pv-h-seal600-lift pv-cta" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 52, padding: '0 26px', background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', transition: 'transform 150ms' }}>Enrol · from {d.from}</button>
            <button onClick={goHome} className="pv-h-lift2 pv-cta" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 52, padding: '0 26px', background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', borderRadius: 4, cursor: 'pointer', transition: 'transform 150ms' }}>Compare all six</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export { PROG_HREF };
