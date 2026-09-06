'use client';

// The prototype's `isAccel` block: hero + five facts, the market-shift rows
// (#v3-shift) with count-up bars, the dark six-moves loop with its detail
// panel, the four-phase 13-week spine, thrive / don't-enrol, the eight
// capstone briefs with a level filter, five FAQs, and the closing CTA.

import { useRouter } from 'next/navigation';
import { ACFAQ, BRIEFS, LOOPX, PHASE, SHIFT, SPINE, WHO } from '@/lib/proto/data';
import { scrollToId, useProto, useProtoRoute } from '@/lib/proto/store';
import { Photo } from '@/components/proto/Photo';
import { analytics } from '@/lib/analytics';

const AC_STATS = [
  { n: '12', l: 'WEEKS' }, { n: '25', l: 'MAX COHORT' }, { n: '8–10h', l: 'PER WEEK' },
  { n: '4', l: 'PATHWAYS' }, { n: 'Live', l: 'ONLINE' },
];

const LV_TABS = ['All briefs', 'Intermediate', 'Advanced'];

export function AccelContent() {
  useProtoRoute('accel');
  const { s, set } = useProto();
  const router = useRouter();

  const pt = s.proofT;
  const goHome = (location: 'accelerator_hero' | 'accelerator_bottom' = 'accelerator_bottom') => () => {
    analytics.ctaClicked({ cta_name: 'Compare programmes', cta_location: location, destination: '/' });
    router.push('/');
  };
  const goPricing = (location: 'accelerator_hero' | 'accelerator_bottom' = 'accelerator_bottom') => () => {
    analytics.ctaClicked({ cta_name: 'See programmes & pricing', cta_location: location, destination: '/#v3-pick' });
    router.push('/');
    window.setTimeout(() => scrollToId('v3-pick'), 90);
  };

  const shift = SHIFT.map(x => ({ a: x.a, b: x.b, n: Math.round(x.n * pt) + '%' }));
  const loopSel = LOOPX[s.acLoop] || LOOPX[0];
  const weeks = SPINE.filter(x => x.p === s.acPhase).map(x => ({ ...x, c: PHASE[x.p].c }));
  const phaseLabel = PHASE[s.acPhase].l.toUpperCase() + ' · ' + PHASE[s.acPhase].w;
  const briefs = BRIEFS.filter(b => s.acLv === 'All briefs' || b.lv === s.acLv);

  return (
    <div style={{ animation: 'v3fade 340ms both' }}>

      {/* ─────────── HERO ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', position: 'relative', overflow: 'hidden', backgroundImage: 'repeating-linear-gradient(to right,rgba(11,26,43,.045) 0 1px,transparent 1px 28px),repeating-linear-gradient(to bottom,rgba(11,26,43,.045) 0 1px,transparent 1px 28px)' }}>
        <div className="pv-wrap pv-2col" style={{ padding: '56px 40px 48px', display: 'grid', gridTemplateColumns: '1.06fr .94fr', gap: 52, alignItems: 'center' }}>
          <div>
            <div style={{ width: 34, height: 2, background: 'var(--seal-500)', marginBottom: 16 }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.12em', color: 'var(--fg-2)' }}>THE CAREER CAPABILITY ACCELERATOR</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,4.8vw,76px)', fontWeight: 600, letterSpacing: '-.042em', lineHeight: .96, margin: '20px 0 0', animation: 'v3rise 620ms cubic-bezier(.22,1,.36,1) both' }}>Twelve weeks.<br />One shared spine.<br />Four pathways.</h1>
            <div className="pv-statrow" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,auto)', gap: '0 32px', margin: '40px 0 0', justifyContent: 'start' }}>
              {AC_STATS.map(st => (
                <span key={st.l} style={{ borderTop: '2px solid var(--ink-900)', paddingTop: 9 }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{st.n}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)', marginTop: 6 }}>{st.l}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Framed hero photograph, built from the page's own tokens: an ink
              plate offset behind a paper mat, a seal hairline inside the mat,
              and a caption plate on the lower edge. The offset lives in the
              wrapper's padding so nothing escapes the grid cell. */}
          <div style={{ position: 'relative', width: '100%', maxWidth: 470, marginLeft: 'auto', paddingRight: 13, paddingBottom: 13, boxSizing: 'border-box', animation: 'v3fade 800ms 160ms both' }}>
            <div aria-hidden="true" style={{ position: 'absolute', left: 13, top: 13, right: 0, bottom: 0, background: 'var(--ink-900)' }} />
            <div style={{ position: 'relative', background: 'var(--paper)', border: '1px solid var(--ink-900)', boxShadow: 'var(--shadow-3)', padding: 11 }}>
              <div style={{ position: 'relative', border: '1px solid var(--seal-500)', overflow: 'hidden' }}>
                <Photo
                  src="/images/accelerator-hero.jpg"
                  alt="A participant working through their weekly artefact"
                  placeholder="Drop the accelerator hero photo"
                  aspectRatio="4/5"
                  sizes="(max-width: 1180px) 92vw, 470px"
                  priority
                  style={{ width: '100%' }}
                />
                <div style={{ position: 'absolute', left: 0, bottom: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'rgba(11,26,43,.9)', color: 'var(--bone)', padding: '10px 13px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em' }}>
                  <span style={{ whiteSpace: 'nowrap' }}>ONE ARTEFACT, EVERY WEEK</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--seal-300)', whiteSpace: 'nowrap' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--seal-500)', animation: 'v3pulse 1.6s ease-in-out infinite alternate' }} />
                    WEEK 07
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── MARKET SHIFT ─────────── */}
      <section id="v3-shift" style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--bone-dim)' }}>
        <div className="pv-wrap" style={{ padding: '56px 40px 62px' }}>
          <div data-rv="" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: 0 }}>The market moved.<br />Hiring moved with it.</h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--fg-3)', maxWidth: '22em', textAlign: 'right' }}>WHAT EMPLOYERS NOW ASK FOR, INSTEAD OF WHAT THEY USED TO</span>
          </div>
          <div data-rv="" data-d="80" style={{ margin: '34px 0 0', borderTop: '2px solid var(--ink-900)' }}>
            {shift.map(x => (
              <div key={x.b} className="pv-shiftrow" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 30px minmax(0,1fr) 130px', gap: 18, alignItems: 'center', padding: '18px 0', borderBottom: '1px solid var(--border-soft)' }}>
                <span style={{ fontSize: 17, color: 'var(--fg-3)', textDecoration: 'line-through' }}>{x.a}</span>
                <span style={{ fontSize: 15, color: 'var(--seal-500)', textAlign: 'center' }} aria-hidden="true">→</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600, letterSpacing: '-.02em' }}>{x.b}</span>
                <span>
                  <span style={{ display: 'block', height: 8, background: 'var(--border-soft)' }}>
                    <span style={{ display: 'block', height: 8, width: x.n, background: 'var(--ink-900)', transition: 'width 500ms cubic-bezier(.22,1,.36,1)' }} />
                  </span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', color: 'var(--fg-3)', marginTop: 6, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{x.n}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SIX MOVES ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--ink-900)', color: 'var(--bone)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right,rgba(244,239,230,.04) 0 1px,transparent 1px 32px),repeating-linear-gradient(to bottom,rgba(244,239,230,.04) 0 1px,transparent 1px 32px)', pointerEvents: 'none' }} />
        <div className="pv-wrap" style={{ position: 'relative', padding: '56px 40px 62px' }}>
          <div data-rv="">
            <div style={{ width: 34, height: 2, background: 'var(--seal-500)', marginBottom: 14 }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: 0, color: 'var(--bone)' }}>Every week runs the same six moves.</h2>
          </div>

          <div className="pv-6col" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: 8, margin: '32px 0 0' }}>
            {LOOPX.map((x, i) => {
              const on = s.acLoop === i;
              return (
                <button key={x.n} onClick={() => set({ acLoop: i })} aria-pressed={on} style={{ font: 'inherit', textAlign: 'left', background: on ? 'var(--seal-500)' : 'rgba(244,239,230,.04)', border: `1px solid ${on ? 'var(--seal-500)' : 'rgba(244,239,230,.2)'}`, padding: '16px 14px', cursor: 'pointer', minHeight: 120, display: 'flex', flexDirection: 'column', transition: 'background 280ms cubic-bezier(.65,0,.35,1), border-color 280ms' }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: on ? 'rgba(244,239,230,.75)' : 'var(--seal-300)' }}>{x.n}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.15, marginTop: 10, color: 'var(--bone)' }}>{x.t}</span>
                  <span style={{ flex: 1, minHeight: 8 }} />
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.08em', color: on ? 'rgba(244,239,230,.85)' : 'var(--ink-300)' }}>{x.m}</span>
                </button>
              );
            })}
          </div>

          <div key={loopSel.n} className="pv-2col" style={{ display: 'grid', gridTemplateColumns: '1.4fr .6fr', gap: 32, margin: '22px 0 0', background: 'rgba(244,239,230,.04)', border: '1px solid rgba(244,239,230,.2)', padding: '28px 26px', animation: 'v3fade 300ms both' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--seal-300)' }}>{loopSel.n} · {loopSel.m}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,2.6vw,34px)', fontWeight: 600, letterSpacing: '-.028em', lineHeight: 1.1, marginTop: 10, color: 'var(--bone)' }}>{loopSel.t}</div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-200)', margin: '12px 0 0', maxWidth: '44em' }}>{loopSel.d}</p>
            </div>
            <div style={{ borderLeft: '1px solid rgba(244,239,230,.16)', paddingLeft: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--ink-400)' }}>YOU END UP WITH</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.2, marginTop: 8, color: 'var(--seal-300)' }}>{loopSel.o}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── THIRTEEN WEEKS, FOUR PHASES ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)' }}>
        <div className="pv-wrap" style={{ padding: '56px 40px 62px' }}>
          <div data-rv="" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: 0 }}>Thirteen weeks, four phases.</h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--fg-3)' }}>{phaseLabel}</span>
          </div>

          <div data-rv="" data-d="60" className="pv-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 8, margin: '30px 0 0' }}>
            {PHASE.map((p, i) => {
              const on = s.acPhase === i;
              return (
                <button key={p.l} onClick={() => set({ acPhase: i })} aria-pressed={on} style={{ font: 'inherit', textAlign: 'left', background: on ? 'var(--ink-900)' : 'var(--paper)', color: on ? 'var(--bone)' : 'var(--fg-1)', border: `1px solid ${on ? 'var(--ink-900)' : 'var(--border-strong)'}`, borderRadius: 4, padding: '16px 16px 14px', cursor: 'pointer', transition: 'all 180ms cubic-bezier(.22,1,.36,1)' }}>
                  <span style={{ display: 'block', height: 3, background: p.c, marginBottom: 12 }} />
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600, letterSpacing: '-.022em' }}>{p.l}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: on ? 'var(--ink-300)' : 'var(--fg-3)', marginTop: 4 }}>{p.w}</span>
                </button>
              );
            })}
          </div>

          <div data-rv="" data-d="120" style={{ margin: '20px 0 0', borderTop: '2px solid var(--ink-900)' }}>
            {weeks.map(w => (
              <div key={w.w} className="pv-h-paper pv-weekrow" style={{ display: 'grid', gridTemplateColumns: '70px minmax(0,1fr) minmax(0,1.3fr)', gap: 20, alignItems: 'baseline', padding: '18px 0', borderBottom: '1px solid var(--border-soft)', animation: 'v3rise 340ms cubic-bezier(.22,1,.36,1) both' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 8, height: 8, background: w.c }} /><span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>{w.w}</span></span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.2 }}>{w.t}</span>
                <span style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--fg-2)' }}>{w.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── BE HONEST WITH YOURSELF ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--bone-dim)' }}>
        <div className="pv-wrap" style={{ padding: '56px 40px 62px' }}>
          <h2 data-rv="" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: 0 }}>Be honest with yourself.</h2>
          <div className="pv-2col" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 20, margin: '32px 0 0', alignItems: 'start' }}>
            <div data-rv="" data-d="60">
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingBottom: 12, borderBottom: '2px solid var(--moss-500)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--moss-700)' }}>YOU WILL THRIVE HERE</span>
              </div>
              {WHO.yes.map(y => (
                <div key={y.t} style={{ padding: '15px 0', borderBottom: '1px solid var(--border-soft)' }}>
                  <div style={{ display: 'flex', gap: 11, alignItems: 'baseline' }}>
                    <span style={{ color: 'var(--moss-500)', fontSize: 13 }}>✓</span>
                    <span>
                      <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, letterSpacing: '-.018em' }}>{y.t}</span>
                      <span style={{ display: 'block', fontSize: 14, lineHeight: 1.5, color: 'var(--fg-2)', marginTop: 3 }}>{y.d}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div data-rv="" data-d="120" style={{ background: 'var(--ink-900)', color: 'var(--bone)', padding: '24px 24px 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingBottom: 12, borderBottom: '2px solid var(--crimson-500)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--crimson-500)' }}>DO NOT ENROL IF</span>
              </div>
              {WHO.no.map(n => (
                <div key={n.t} style={{ padding: '14px 0', borderBottom: '1px solid rgba(244,239,230,.14)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, letterSpacing: '-.016em', color: 'var(--bone)' }}>{n.t}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-300)', marginTop: 3 }}>{n.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── CAPSTONE BRIEFS ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)' }}>
        <div className="pv-wrap" style={{ padding: '56px 40px 62px' }}>
          <div data-rv="" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--fg-3)' }}>REAL CAPSTONE BRIEFS</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: '14px 0 0' }}>You work a real problem.</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--fg-3)' }}>{briefs.length} OF 8 BRIEFS</span>
              <span style={{ display: 'flex', gap: 6 }}>
                {LV_TABS.map(l => {
                  const on = s.acLv === l;
                  return (
                    <button key={l} onClick={() => set({ acLv: l })} aria-pressed={on} style={{ font: 'inherit', fontSize: 12, fontWeight: 500, padding: '8px 12px', background: on ? 'var(--ink-900)' : 'var(--paper)', color: on ? 'var(--bone)' : 'var(--fg-2)', border: `1px solid ${on ? 'var(--ink-900)' : 'var(--border-strong)'}`, borderRadius: 3, cursor: 'pointer', transition: 'all 150ms' }}>{l}</button>
                  );
                })}
              </span>
            </div>
          </div>

          <div data-rv="" data-d="80" className="pv-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, margin: '30px 0 0' }}>
            {briefs.map(b => {
              const adv = b.lv === 'Advanced';
              return (
                <div key={b.id} className="pv-h-lift4sh" style={{ background: 'var(--paper)', border: '1px solid var(--border-strong)', borderRadius: 6, padding: '20px 18px', display: 'flex', flexDirection: 'column', minHeight: 224, animation: 'v3rise 380ms cubic-bezier(.22,1,.36,1) both', transition: 'transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--fg-3)' }}>{b.id}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.08em', color: adv ? 'var(--seal-700)' : 'var(--fg-3)', background: adv ? 'var(--seal-50)' : 'var(--paper-dim)', padding: '2px 6px' }}>{b.lv}</span>
                  </span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, letterSpacing: '-.018em', lineHeight: 1.2, marginTop: 14 }}>{b.t}</span>
                  <span style={{ display: 'block', fontSize: 13, lineHeight: 1.5, color: 'var(--fg-2)', marginTop: 8 }}>{b.d}</span>
                  <span style={{ flex: 1, minHeight: 12 }} />
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 3, paddingTop: 12, borderTop: '1px solid var(--border-hair)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', color: 'var(--fg-3)' }}>{b.i}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', color: 'var(--fg-3)' }}>{b.r}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--bone-dim)' }}>
        <div className="pv-wrap pv-2col" style={{ padding: '56px 40px 62px', display: 'grid', gridTemplateColumns: '.8fr 1.2fr', gap: 48, alignItems: 'start' }}>
          <h2 data-rv="" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.05, margin: 0 }}>Good to know<br />before you enrol.</h2>
          <div data-rv="" data-d="80" style={{ borderTop: '2px solid var(--ink-900)' }}>
            {ACFAQ.map((f, i) => {
              const open = s.acFaq === i;
              return (
                <div key={f.q} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                  <button onClick={() => set({ acFaq: open ? -1 : i })} aria-expanded={open} className="pv-h-paper" style={{ font: 'inherit', width: '100%', textAlign: 'left', background: 'none', border: 0, padding: '18px 16px', cursor: 'pointer', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 26px', gap: 14, alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, letterSpacing: '-.016em', lineHeight: 1.25 }}>{f.q}</span>
                    <span style={{ fontSize: 18, color: 'var(--fg-3)', justifySelf: 'end', lineHeight: 1 }}>{open ? '−' : '+'}</span>
                  </button>
                  {open && (
                    <p style={{ margin: '0 0 20px', padding: '0 46px 0 16px', fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', animation: 'v3rise 240ms cubic-bezier(.22,1,.36,1) both' }}>{f.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── CLOSING CTA ─────────── */}
      <section style={{ background: 'var(--ink-900)', color: 'var(--bone)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right,rgba(244,239,230,.05) 0 1px,transparent 1px 32px),repeating-linear-gradient(to bottom,rgba(244,239,230,.05) 0 1px,transparent 1px 32px)', pointerEvents: 'none' }} />
        <div className="pv-wrap pv-2col" style={{ position: 'relative', padding: '64px 40px 70px', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 44, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', color: 'var(--seal-300)' }}>FOUR PATHWAYS · ALL START 20 SEPTEMBER</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4.2vw,60px)', fontWeight: 600, letterSpacing: '-.04em', lineHeight: 1, margin: '16px 0 0', color: 'var(--bone)' }}>Pick the pathway<br />that fits you.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={goHome('accelerator_bottom')} className="pv-h-seal600-lift" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 52, padding: '0 26px', background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', transition: 'transform 150ms' }}>See all six programmes</button>
            <button onClick={goPricing('accelerator_bottom')} className="pv-h-lift2" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 52, padding: '0 26px', background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', borderRadius: 4, cursor: 'pointer', transition: 'transform 150ms' }}>See programmes &amp; pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
}
