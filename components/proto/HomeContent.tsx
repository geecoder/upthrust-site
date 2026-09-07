'use client';

// The prototype's `isHome` block, section for section:
//   1. Hero + live portfolio board + cohort ticker
//   2. Six programmes (#v3-pick)
//   3. One week, six moves — the weekly loop player
//   4. What you actually leave with — the paginated artefact gallery
//   5. Watch a product get built — the AI intensive stage assembly
//   6. What one cohort puts you through — stats, arc, testimonials (#v3-proof)
//   7. Countdown and closing CTA

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AI, ARTS, HERO_STATS, LOOP, LOOP_STATS, MIX, P, PROG_HREF, PROG_IDS, QUOTES,
  type ProgKey, CUR, money, priceFor,
} from '@/lib/proto/data';
import { scrollToId, useProto, useProtoRoute } from '@/lib/proto/store';
import { COHORT, DATES } from '@/lib/cohort-config';
import { analytics, programContext } from '@/lib/analytics';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { TasterButton } from '@/components/proto/TasterButton';

const pad2 = (n: number) => String(n).padStart(2, '0');

// The prototype hard-codes 20 days / 06 hours / 42 minutes. Those are frozen
// numbers in an artboard; on a live site they would still read "20 days" a
// year from now. The markup, labels and styling are the prototype's exactly —
// only the digits are computed from the real close date after mount, which
// also keeps the server and client render identical.
const CLOSE = (() => {
  const [y, m, d] = COHORT.applyByDate.split('-').map(Number);
  return Date.UTC(y, m - 1, d, 23, 59);
})();

function useCountdown() {
  const [c, setC] = useState({ d: '20', h: '06', m: '42' });
  useEffect(() => {
    const tick = () => {
      const ms = Math.max(0, CLOSE - Date.now());
      setC({
        d: pad2(Math.floor(ms / 86400000)),
        h: pad2(Math.floor((ms % 86400000) / 3600000)),
        m: pad2(Math.floor((ms % 3600000) / 60000)),
      });
    };
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);
  return c;
}

export function HomeContent() {
  useProtoRoute('home');
  const { s, set } = useProto();
  const router = useRouter();
  const cd = useCountdown();

  const cur = CUR[s.cur];
  const prog = P[s.cProg];
  const pt = s.proofT;
  const totalSeats = PROG_IDS.reduce((a, k) => a + P[k].seats, 0);

  // Programme tiles are the main interest signal on the home page.
  const goProg = (k: ProgKey, location: 'homepage_programmes' | 'homepage_bottom' = 'homepage_programmes') => {
    const ctx = programContext(k);
    analytics.ctaClicked({
      cta_name: 'Explore programme', cta_location: location,
      destination: PROG_HREF[k], program_slug: ctx.program_slug,
    });
    router.push(PROG_HREF[k]);
  };

  const scrollPick = (location: 'homepage_hero' | 'homepage_bottom') => () => {
    analytics.ctaClicked({ cta_name: 'Pick a programme', cta_location: location, destination: '#v3-pick' });
    scrollToId('v3-pick');
  };

  const goAssess = (location: 'homepage_hero' | 'homepage_bottom') => () => {
    analytics.ctaClicked({ cta_name: 'Take an assessment', cta_location: location, destination: '/assessment' });
    router.push('/assessment');
  };

  // ── board ────────────────────────────────────────────────
  const boardStart = Math.max(0, Math.min(s.stackN - 3, 6));
  const board = MIX.slice(boardStart, boardStart + 6).map((a, i) => {
    const idx = boardStart + i + 1;
    const live = idx === s.stackN;
    const pend = idx > s.stackN;
    return {
      wk: 'W' + pad2(idx) + ' · ' + a.d, t: a.t,
      badge: pend ? 'AHEAD' : (live ? 'IN REVIEW' : 'SIGNED OFF'),
      bfg: pend ? 'var(--fg-4)' : (live ? 'var(--seal-700)' : 'var(--moss-700)'),
      bbg: pend ? 'var(--paper-dim)' : (live ? 'var(--seal-50)' : 'var(--moss-50)'),
      acc: pend ? 'var(--paper-dim)' : (live ? 'var(--seal-500)' : 'var(--moss-500)'),
      l1: pend ? 'var(--bone-dim)' : 'var(--paper-dim)',
      bg: live ? 'var(--white)' : 'var(--paper)',
      wkfg: pend ? 'var(--fg-4)' : 'var(--fg-3)',
      tfg: pend ? 'var(--fg-4)' : 'var(--fg-1)',
      op: pend ? '0.5' : '1',
    };
  });

  const ticker = PROG_IDS.concat(PROG_IDS).map((k, i) => {
    const p = P[k];
    const low = p.seats <= 16;
    return {
      key: k + i,
      l: p.n.toUpperCase() + ' · ' + p.seats + ' PLACES',
      fg: low ? 'var(--seal-300)' : 'var(--ink-200)',
      dot: low ? 'var(--seal-500)' : 'var(--moss-500)',
    };
  });

  // ── tiles ────────────────────────────────────────────────
  const famTabs = [
    { k: 'all' as const, l: 'All six' }, { k: 'path' as const, l: '12-week pathways' }, { k: 'int' as const, l: '5-week intensives' },
  ];

  const tiles = PROG_IDS.filter(k => s.fam === 'all' || P[k].fam === s.fam).map(k => {
    const p = P[k];
    const int = p.fam === 'int';
    const low = p.seats <= 16;
    const pr = priceFor(k, s.cur);
    return {
      k, name: p.n, line: p.l, wk: p.wk,
      seats: p.seats + ' of ' + p.cap + ' left',
      from: int ? cur.c + ' ' + money(pr.alone) : cur.c + ' ' + money(pr.stdP2) + '×2',
      pct: Math.round(((p.cap - p.seats) / p.cap) * 100) + '%',
      tag: int ? 'INTENSIVE' : 'PATHWAY',
      bg: int ? 'var(--ink-900)' : 'var(--paper)',
      fg: int ? 'var(--bone)' : 'var(--fg-1)',
      sub: int ? 'var(--ink-200)' : 'var(--fg-2)',
      bd: int ? 'var(--ink-900)' : 'var(--border-strong)',
      tagfg: int ? 'var(--bone)' : 'var(--fg-3)',
      tagbg: int ? 'var(--seal-500)' : 'var(--paper-dim)',
      numfg: int ? 'var(--seal-300)' : 'var(--ink-300)',
      trk: int ? 'rgba(244,239,230,.18)' : 'var(--border-soft)',
      acc: low ? 'var(--seal-500)' : 'var(--moss-500)',
      seatfg: low ? 'var(--seal-500)' : (int ? 'var(--ink-300)' : 'var(--fg-3)'),
    };
  });

  // ── gallery ──────────────────────────────────────────────
  const gArt = (ARTS[s.cProg] || ARTS.ba).map((a, i) => ({ wk: 'W' + pad2(i + 1), t: a.t, s: a.s, i: a.i }));
  const gPages = Math.ceil(gArt.length / 4);
  const gPage = Math.min(s.gal, gPages - 1);
  const galStart = gPage * 4;
  const galLabel = prog.n.toUpperCase() + ' · WEEKS ' + pad2(galStart + 1) + '–' + pad2(Math.min(galStart + 4, gArt.length)) + ' OF ' + gArt.length;

  // ── AI stage assembly ────────────────────────────────────
  const ai = AI[s.aiKey];
  const aiStage = ai.stages[s.aiStage];

  // ── proof ────────────────────────────────────────────────
  const proofStats = [
    { n: money(Math.round(1000 * pt)) + '+', l: 'Professionals trained', s: 'SINCE WE STARTED' },
    { n: String(Math.round(72 * pt)), l: 'Live hours with a facilitator', s: 'NOT RECORDINGS' },
    { n: String(Math.round(24 * pt)), l: 'Written reviews on your work', s: 'TWO PER ARTEFACT' },
    { n: String(Math.round(1 * pt)), l: 'Capstone you defend out loud', s: 'TO A PANEL, IN WEEK 12' },
  ];

  const arc = [
    { n: 'STEP 01', t: 'You apply', v: '25', s: 'PLACES PER COHORT', tone: 'l' },
    { n: 'STEP 02', t: 'You build', v: '12', s: 'ARTEFACTS ON REAL BRIEFS', tone: 'l' },
    { n: 'STEP 03', t: 'You get marked', v: '48h', s: 'FEEDBACK TURNAROUND', tone: 'l' },
    { n: 'STEP 04', t: 'You revise', v: '2×', s: 'EVERY ARTEFACT, BEFORE IT COUNTS', tone: 'l' },
    { n: 'STEP 05', t: 'You defend', v: '82', s: 'TYPICAL DEFENCE SCORE', tone: 'd' },
  ].map(x => ({
    ...x,
    bg: x.tone === 'd' ? 'var(--ink-900)' : 'var(--paper)',
    bd: x.tone === 'd' ? 'var(--ink-900)' : 'var(--border-strong)',
    nfg: x.tone === 'd' ? 'var(--seal-300)' : 'var(--fg-3)',
    tfg: x.tone === 'd' ? 'var(--bone)' : 'var(--fg-1)',
    vfg: x.tone === 'd' ? 'var(--bone)' : 'var(--ink-900)',
    sfg: x.tone === 'd' ? 'var(--ink-300)' : 'var(--fg-3)',
  }));

  return (
    <div>
      {/* ─────────── 1. HERO ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', position: 'relative', overflow: 'hidden', backgroundImage: 'repeating-linear-gradient(to right,rgba(11,26,43,.045) 0 1px,transparent 1px 28px),repeating-linear-gradient(to bottom,rgba(11,26,43,.045) 0 1px,transparent 1px 28px)' }}>
        <div className="pv-wrap pv-2col" style={{ padding: '56px 40px 0', display: 'grid', gridTemplateColumns: '1.02fr .98fr', gap: 48, alignItems: 'center', minHeight: 600 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, animation: 'v3drop 500ms cubic-bezier(.22,1,.36,1) both' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--seal-500)', animation: 'v3pulse 1.6s ease-in-out infinite alternate' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.12em', color: 'var(--fg-2)' }}>{`ENROLLING NOW · SIX COHORTS START ${DATES.cohortStartShort.toUpperCase()}`}</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,6.4vw,92px)', fontWeight: 600, letterSpacing: '-.04em', lineHeight: .96, margin: '22px 0 0', animation: 'v3rise 700ms cubic-bezier(.22,1,.36,1) 80ms both' }}>Twelve weeks.<br />Then proof.</h1>

            <div className="pv-rotrow" style={{ display: 'flex', alignItems: 'baseline', gap: 12, margin: '22px 0 0', animation: 'v3rise 700ms cubic-bezier(.22,1,.36,1) 180ms both' }}>
              <span style={{ fontSize: 19, color: 'var(--fg-2)' }}>Live cohorts in</span>
              {/* The 280px floor stops the line reflowing as the name rotates. On a
                  narrow screen that floor is wider than the column, so the name
                  takes its own line instead of being clipped. */}
              <span className="pv-rotname" style={{ position: 'relative', display: 'inline-flex', alignItems: 'baseline', minWidth: 280 }}>
                <span key={P[PROG_IDS[s.rot]].n} style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-.024em', color: 'var(--seal-600)', borderBottom: '2px solid var(--seal-300)', paddingBottom: 2, animation: 'v3fade 300ms both' }}>{P[PROG_IDS[s.rot]].n}</span>
              </span>
            </div>

            <div style={{ display: 'flex', gap: 12, margin: '34px 0 0', flexWrap: 'wrap', animation: 'v3rise 700ms cubic-bezier(.22,1,.36,1) 280ms both' }}>
              <button onClick={scrollPick('homepage_hero')} className="pv-h-ink800-lift pv-cta" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 54, padding: '0 28px', background: 'var(--ink-900)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', transition: 'transform 150ms cubic-bezier(.22,1,.36,1)' }}>Pick a programme</button>
              <button onClick={goAssess('homepage_hero')} className="pv-h-bonedim-lift pv-cta" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 54, padding: '0 26px', background: 'none', color: 'var(--fg-1)', border: '1px solid var(--border-strong)', borderRadius: 4, cursor: 'pointer', transition: 'transform 150ms cubic-bezier(.22,1,.36,1)' }}>Take an assessment</button>
            </div>

            <div className="pv-statrow" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,auto)', gap: '0 40px', margin: '46px 0 0', justifyContent: 'start', animation: 'v3rise 700ms cubic-bezier(.22,1,.36,1) 380ms both' }}>
              {HERO_STATS.map(st => (
                <span key={st.l} style={{ borderTop: '2px solid var(--ink-900)', paddingTop: 9 }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, letterSpacing: '-.03em', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{st.n}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)', marginTop: 5 }}>{st.l}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Live portfolio board */}
          <div style={{ animation: 'v3fade 800ms 200ms both' }}>
            <div style={{ background: 'var(--paper)', border: '1px solid var(--ink-900)', boxShadow: 'var(--shadow-2)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 18px', borderBottom: '1px solid var(--ink-900)', background: 'var(--ink-900)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--seal-500)', animation: 'v3pulse 1.6s ease-in-out infinite alternate' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', color: 'var(--bone)' }}>PORTFOLIO · BUILDING LIVE</span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--ink-300)' }}>ALL FOUR PATHWAYS</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border-soft)' }}>
                {board.map((c, i) => (
                  <div key={i} style={{ background: c.bg, padding: '14px 15px 13px', minHeight: 118, display: 'flex', flexDirection: 'column', opacity: Number(c.op), transition: 'opacity 380ms cubic-bezier(.22,1,.36,1), background 380ms' }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.1em', color: c.wkfg }}>{c.wk}</span>
                      <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '.08em', color: c.bfg, background: c.bbg, padding: '2px 5px', whiteSpace: 'nowrap' }}>{c.badge}</span>
                    </span>
                    <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, letterSpacing: '-.014em', lineHeight: 1.22, marginTop: 9, color: c.tfg }}>{c.t}</span>
                    <span style={{ flex: 1, minHeight: 8 }} />
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }} aria-hidden="true">
                      <span style={{ height: 3, background: c.l1, width: '92%' }} />
                      <span style={{ height: 3, background: c.l1, width: '68%' }} />
                      <span style={{ height: 3, background: c.acc, width: '44%' }} />
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 18, alignItems: 'center', padding: '16px 18px', borderTop: '1px solid var(--ink-900)', background: 'var(--ink-900)' }}>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, letterSpacing: '-.034em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: 'var(--bone)' }}>{pad2(s.stackN)}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-300)' }}>/ 12</span>
                </span>
                <span>
                  <span style={{ display: 'block', height: 4, background: 'rgba(244,239,230,.18)' }}>
                    <span style={{ display: 'block', height: 4, width: Math.round((s.stackN / 12) * 100) + '%', background: 'var(--seal-500)', transition: 'width 400ms cubic-bezier(.22,1,.36,1)' }} />
                  </span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--ink-300)', marginTop: 7 }}>REVIEWED · SCORED · REVISED · SIGNED OFF</span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--seal-300)', textAlign: 'right', whiteSpace: 'nowrap' }}>WEEK {pad2(s.stackN)}<br />OF TWELVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cohort ticker */}
        <div style={{ borderTop: '1px solid var(--border-strong)', background: 'var(--ink-900)', overflow: 'hidden', padding: '11px 0' }}>
          <div style={{ display: 'flex', width: 'max-content', animation: 'v3marq 34s linear infinite' }}>
            {ticker.map(t => (
              <span key={t.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 26px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', color: t.fg, whiteSpace: 'nowrap' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: t.dot }} />{t.l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 2. SIX PROGRAMMES ─────────── */}
      <section id="v3-pick" style={{ borderBottom: '1px solid var(--border-strong)' }}>
        <div className="pv-wrap" style={{ padding: '64px 40px 72px' }}>
          <div data-rv="" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: 0 }}>Six programmes.<br />All start {DATES.cohortStartDayMonth}.</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {famTabs.map(f => (
                <button key={f.k} onClick={() => set({ fam: f.k })} style={{ font: 'inherit', fontSize: 13, fontWeight: 500, padding: '9px 15px', border: `1px solid ${s.fam === f.k ? 'var(--ink-900)' : 'var(--border-strong)'}`, background: s.fam === f.k ? 'var(--ink-900)' : 'var(--white)', color: s.fam === f.k ? 'var(--bone)' : 'var(--fg-2)', borderRadius: 3, cursor: 'pointer', transition: 'all 150ms cubic-bezier(.22,1,.36,1)' }}>{f.l}</button>
              ))}
            </div>
          </div>

          <div className="pv-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 14, margin: '34px 0 0' }}>
            {tiles.map(p => (
              <button key={p.k} onClick={() => goProg(p.k)} onMouseEnter={() => set({ hoverTile: p.k })} className="pv-h-lift4sh" style={{ font: 'inherit', textAlign: 'left', position: 'relative', overflow: 'hidden', background: p.bg, color: p.fg, border: `1px solid ${p.bd}`, borderRadius: 6, padding: '22px 22px 20px', cursor: 'pointer', minHeight: 250, display: 'flex', flexDirection: 'column', transition: 'transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms, background 220ms' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: p.tagfg, background: p.tagbg, padding: '3px 6px' }}>{p.tag}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: p.numfg }}>{p.wk}</span>
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 25, fontWeight: 600, letterSpacing: '-.024em', lineHeight: 1.12, marginTop: 16 }}>{p.name}</span>
                <span style={{ display: 'block', fontSize: 14, lineHeight: 1.45, color: p.sub, marginTop: 7 }}>{p.line}</span>
                <span style={{ flex: 1, minHeight: 14 }} />
                <span style={{ display: 'block', height: 3, background: p.trk, marginTop: 12 }}>
                  <span style={{ display: 'block', height: 3, width: p.pct, background: p.acc, transformOrigin: 'left', animation: 'v3bar 700ms cubic-bezier(.22,1,.36,1) both' }} />
                </span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 9 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', color: p.seatfg }}>{p.seats}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontVariantNumeric: 'tabular-nums', color: p.fg }}>{p.from}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 2b. TASTER SESSION ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--bone-dim)' }}>
        <div className="pv-wrap pv-2col" style={{ padding: '58px 40px 62px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 44, alignItems: 'center' }}>
          <div data-rv="">
            <div style={{ width: 34, height: 2, background: 'var(--seal-500)', marginBottom: 14 }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.4vw,44px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: 0 }}>Try it before<br />you pay for it.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--fg-2)', margin: '18px 0 0', maxWidth: '30em' }}>
              A free live session on {DATES.tasterDayMonth} — the same format as a cohort week, run by the people who run the cohort. Come, ask what you like, then decide.
            </p>
            <div className="pv-statrow" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,auto)', gap: '0 34px', margin: '30px 0 0', justifyContent: 'start' }}>
              {[
                { n: DATES.tasterDayMonth.split(' ')[0], l: DATES.tasterDayMonth.split(' ')[1].toUpperCase() },
                { n: 'Free', l: 'NO CARD' },
                { n: 'Live', l: 'ONLINE' },
              ].map((x) => (
                <span key={x.l} style={{ borderTop: '2px solid var(--ink-900)', paddingTop: 9 }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{x.n}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)', marginTop: 5 }}>{x.l}</span>
                </span>
              ))}
            </div>
          </div>
          <div data-rv="" data-d="80" style={{ background: 'var(--paper)', border: '1px solid var(--ink-900)', borderRadius: 6, padding: '28px 26px', boxShadow: 'var(--shadow-2)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--fg-3)' }}>WHAT THE EVENING COVERS</div>
            <div style={{ margin: '14px 0 22px', borderTop: '2px solid var(--ink-900)' }}>
              {[
                'One real teaching block, not a sales webinar',
                'The week-by-week artefact you would actually build',
                'Live Q&A with the people who run the cohort',
              ].map((x) => (
                <div key={x} style={{ display: 'flex', gap: 10, alignItems: 'baseline', padding: '11px 0', borderBottom: '1px solid var(--border-soft)', fontSize: 15, lineHeight: 1.5 }}>
                  <span aria-hidden="true" style={{ color: 'var(--seal-500)' }}>→</span><span>{x}</span>
                </div>
              ))}
            </div>
            <TasterButton source="landing" ctaLocation="homepage_programmes" />
          </div>
        </div>
      </section>

      {/* ─────────── 3. ONE WEEK, SIX MOVES ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--ink-900)', color: 'var(--bone)', position: 'relative', overflow: 'hidden' }}>
        <div className="pv-wrap" style={{ padding: '66px 40px 72px' }}>
          <div data-rv="" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div style={{ width: 34, height: 2, background: 'var(--seal-500)', marginBottom: 14 }} />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: 0, color: 'var(--bone)' }}>One week, six moves.<br />Repeated twelve times.</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--ink-300)' }}>{s.loopAuto ? 'PLAYING' : 'PAUSED'}</span>
              <button onClick={() => set({ loopAuto: !s.loopAuto })} style={{ font: 'inherit', fontSize: 12, fontWeight: 500, height: 32, padding: '0 14px', background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', borderRadius: 3, cursor: 'pointer' }}>{s.loopAuto ? 'Pause' : 'Play'}</button>
            </div>
          </div>

          <div className="pv-6col" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: 10, margin: '36px 0 0' }}>
            {LOOP.map((x, i) => {
              const on = s.loopI === i;
              const done = i < s.loopI;
              return (
                <button key={x.n} onClick={() => set({ loopI: i, loopT: 0, loopAuto: false })} style={{ font: 'inherit', textAlign: 'left', background: on ? 'var(--seal-500)' : (done ? 'rgba(244,239,230,.1)' : 'rgba(244,239,230,.04)'), border: `1px solid ${on ? 'var(--seal-500)' : 'rgba(244,239,230,.2)'}`, padding: '18px 16px 16px', cursor: 'pointer', minHeight: 172, display: 'flex', flexDirection: 'column', transition: 'background 260ms cubic-bezier(.65,0,.35,1), border-color 260ms' }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: on ? 'rgba(244,239,230,.75)' : 'var(--seal-300)' }}>{x.n}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.15, marginTop: 10, color: 'var(--bone)' }}>{x.t}</span>
                  <span style={{ flex: 1, minHeight: 10 }} />
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: on ? 'rgba(244,239,230,.8)' : 'var(--ink-300)' }}>{x.m}</span>
                  <span style={{ display: 'block', height: 2, background: 'rgba(244,239,230,.16)', marginTop: 9 }}>
                    <span style={{ display: 'block', height: 2, width: on ? s.loopT + '%' : (done ? '100%' : '0%'), background: 'var(--seal-500)', transition: 'width 300ms linear' }} />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pv-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 0, margin: '44px 0 0', borderTop: '1px solid rgba(244,239,230,.18)' }}>
            {LOOP_STATS.map(st => (
              <span key={st.l} style={{ padding: '20px 20px 0', borderRight: '1px solid rgba(244,239,230,.12)' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 600, letterSpacing: '-.034em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: 'var(--bone)' }}>{st.n}</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--ink-300)', marginTop: 7 }}>{st.l}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 4. WHAT YOU ACTUALLY LEAVE WITH ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--bone-dim)' }}>
        <div className="pv-wrap" style={{ padding: '66px 40px 72px' }}>
          <div data-rv="" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: 0 }}>What you actually leave with.</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 18 }}>
                {PROG_IDS.map(k => (
                  <button key={k} onClick={() => set({ cProg: k, gal: 0 })} style={{ font: 'inherit', fontSize: 12, fontWeight: 500, padding: '8px 12px', border: `1px solid ${s.cProg === k ? 'var(--ink-900)' : 'var(--border-strong)'}`, background: s.cProg === k ? 'var(--ink-900)' : 'var(--white)', color: s.cProg === k ? 'var(--bone)' : 'var(--fg-2)', borderRadius: 3, cursor: 'pointer', transition: 'all 150ms cubic-bezier(.22,1,.36,1)' }}>{P[k].n}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => set({ gal: (s.gal + gPages - 1) % gPages })} aria-label="Previous artefacts" className="pv-h-white" style={{ font: 'inherit', width: 40, height: 40, background: 'var(--paper)', border: '1px solid var(--border-strong)', borderRadius: 3, cursor: 'pointer', fontSize: 15 }}>←</button>
              <button onClick={() => set({ gal: (s.gal + 1) % gPages })} aria-label="Next artefacts" className="pv-h-white" style={{ font: 'inherit', width: 40, height: 40, background: 'var(--paper)', border: '1px solid var(--border-strong)', borderRadius: 3, cursor: 'pointer', fontSize: 15 }}>→</button>
            </div>
          </div>

          <div className="pv-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 14, margin: '34px 0 0' }}>
            {gArt.slice(galStart, galStart + 4).map(g => (
              <div key={g.wk} className="pv-h-lift4sh" style={{ background: 'var(--white)', border: '1px solid var(--border-strong)', borderRadius: 6, overflow: 'hidden', animation: 'v3rise 460ms cubic-bezier(.22,1,.36,1) both', transition: 'transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '10px 14px', background: 'var(--paper-dim)', borderBottom: '1px solid var(--border-soft)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)' }}>{g.wk}</span>
                  <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '.08em', color: 'var(--moss-700)', background: 'var(--moss-50)', border: '1px solid var(--moss-500)', padding: '2px 6px' }}>SCORED {g.s}</span>
                </div>
                <div style={{ padding: '16px 16px 18px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, letterSpacing: '-.018em', lineHeight: 1.2, minHeight: 44 }}>{g.t}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 14 }} aria-hidden="true">
                    <span style={{ height: 5, background: 'var(--paper-dim)', width: '96%' }} />
                    <span style={{ height: 5, background: 'var(--paper-dim)', width: '82%' }} />
                    <span style={{ height: 5, background: 'var(--seal-50)', width: '58%' }} />
                    <span style={{ height: 5, background: 'var(--paper-dim)', width: '90%' }} />
                    <span style={{ height: 5, background: 'var(--paper-dim)', width: '66%' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-hair)' }}>
                    <span style={{ width: 22, height: 22, border: '1px solid var(--border-strong)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--fg-2)' }}>{g.i}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', color: 'var(--fg-3)' }}>REVIEWED · REVISED · SIGNED OFF</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '20px 0 0' }}>
            {Array.from({ length: gPages }, (_, i) => (
              // 3px is the prototype's visual weight; the padding gives it a tappable
              // box without changing how it looks.
              <button key={i} onClick={() => set({ gal: i })} aria-label={`Artefacts page ${i + 1}`} aria-current={gPage === i} className="pv-dot" style={{ width: gPage === i ? 34 : 14, height: 3, boxSizing: 'content-box', padding: '10px 0', backgroundClip: 'content-box', background: gPage === i ? 'var(--ink-900)' : 'var(--border-strong)', border: 0, cursor: 'pointer', transition: 'width 220ms cubic-bezier(.22,1,.36,1), background 220ms' }} />
            ))}
            <span style={{ flex: 1 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--fg-3)' }}>{galLabel}</span>
          </div>
        </div>
      </section>

      {/* ─────────── 5. WATCH A PRODUCT GET BUILT ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--ink-900)', color: 'var(--bone)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right,rgba(244,239,230,.04) 0 1px,transparent 1px 32px),repeating-linear-gradient(to bottom,rgba(244,239,230,.04) 0 1px,transparent 1px 32px)', pointerEvents: 'none' }} />
        <div className="pv-wrap" style={{ position: 'relative', padding: '66px 40px 72px' }}>
          <div data-rv="" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--bone)', background: 'var(--seal-500)', padding: '3px 7px' }}>NEW · 5 WEEKS</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--ink-300)' }}>SPECIALIST INTENSIVES</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: 0, color: 'var(--bone)' }}>Watch a product<br />get built.</h2>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['aipb', 'baai'] as const).map(k => (
                <button key={k} onClick={() => set({ aiKey: k, aiStage: 0 })} style={{ font: 'inherit', fontSize: 13, fontWeight: 500, padding: '10px 15px', border: `1px solid ${s.aiKey === k ? 'var(--seal-500)' : 'rgba(244,239,230,.28)'}`, background: s.aiKey === k ? 'var(--seal-500)' : 'transparent', color: s.aiKey === k ? 'var(--bone)' : 'var(--ink-200)', borderRadius: 3, cursor: 'pointer', transition: 'all 150ms' }}>{AI[k].n}</button>
              ))}
            </div>
          </div>

          <div className="pv-2col" style={{ display: 'grid', gridTemplateColumns: '1.25fr .75fr', gap: 36, margin: '36px 0 0', alignItems: 'start' }}>
            <div style={{ border: '1px solid rgba(244,239,230,.2)', background: 'rgba(244,239,230,.03)', padding: '26px 26px 22px', minHeight: 340 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, borderBottom: '1px solid rgba(244,239,230,.14)', paddingBottom: 13, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--seal-300)' }}>{ai.n.toUpperCase()}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--ink-300)' }}>WEEK {pad2(s.aiStage + 1)} OF 05</span>
              </div>

              <div className="pv-5col" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: 10, marginTop: 22 }}>
                {ai.stages.map((x, i) => {
                  const on = i === s.aiStage;
                  const done = i < s.aiStage;
                  const live = on || done;
                  return (
                    <div key={x.t} style={{ border: `1px solid ${on ? 'var(--seal-500)' : (done ? 'rgba(244,239,230,.28)' : 'rgba(244,239,230,.12)')}`, background: on ? 'var(--seal-500)' : (done ? 'rgba(244,239,230,.08)' : 'transparent'), padding: '14px 12px', minHeight: 132, display: 'flex', flexDirection: 'column', opacity: live ? 1 : 0.42, transform: `translateY(${live ? '0px' : '6px'})`, transition: 'opacity 420ms cubic-bezier(.22,1,.36,1), transform 420ms cubic-bezier(.22,1,.36,1), background 300ms, border-color 300ms' }}>
                      <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: on ? 'rgba(244,239,230,.75)' : (done ? 'var(--seal-300)' : 'var(--ink-400)') }}>{'0' + (i + 1)}</span>
                      <span style={{ display: 'block', fontSize: 13, fontWeight: 600, lineHeight: 1.3, marginTop: 9, color: live ? 'var(--bone)' : 'var(--ink-400)' }}>{x.t}</span>
                      <span style={{ flex: 1, minHeight: 8 }} />
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }} aria-hidden="true">
                        <span style={{ height: 3, background: on ? 'rgba(244,239,230,.45)' : (done ? 'rgba(244,239,230,.22)' : 'rgba(244,239,230,.08)'), width: '88%' }} />
                        <span style={{ height: 3, background: on ? 'rgba(244,239,230,.45)' : (done ? 'rgba(244,239,230,.22)' : 'rgba(244,239,230,.08)'), width: '64%' }} />
                      </span>
                      <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.06em', color: on ? 'rgba(244,239,230,.85)' : (done ? 'var(--moss-500)' : 'var(--ink-400)'), marginTop: 9 }}>{live ? x.s : 'PENDING'}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(244,239,230,.14)', flexWrap: 'wrap' }}>
                <span style={{ flex: 1, minWidth: 180, height: 4, background: 'rgba(244,239,230,.16)' }}>
                  <span style={{ display: 'block', height: 4, width: Math.round(((s.aiStage + 1) / 5) * 100) + '%', background: 'var(--seal-500)', transition: 'width 420ms cubic-bezier(.22,1,.36,1)' }} />
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--ink-300)' }}>{s.aiAuto ? 'BUILDING' : 'PAUSED · SELECT A STAGE'}</span>
                <button onClick={() => set({ aiAuto: !s.aiAuto })} style={{ font: 'inherit', fontSize: 12, fontWeight: 500, height: 32, padding: '0 14px', background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', borderRadius: 3, cursor: 'pointer' }}>{s.aiAuto ? 'Pause' : 'Play'}</button>
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-.024em', lineHeight: 1.18, color: 'var(--bone)' }}>{aiStage.title}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--seal-300)', marginTop: 10 }}>{aiStage.tag}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, margin: '26px 0 0', borderTop: '1px solid rgba(244,239,230,.18)' }}>
                <span style={{ padding: '16px 16px 0 0', borderRight: '1px solid rgba(244,239,230,.12)' }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: 'var(--bone)' }}>{cur.c + ' ' + money(cur.int[0])}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--ink-300)', marginTop: 6 }}>STANDALONE</span>
                </span>
                <span style={{ padding: '16px 0 0 16px' }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: 'var(--seal-300)' }}>{cur.c + ' ' + money(cur.int[1])}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--seal-300)', marginTop: 6 }}>BUNDLED · SAVE 25%</span>
                </span>
              </div>
              <button onClick={() => goProg(s.aiKey, 'homepage_programmes')} className="pv-h-seal600" style={{ font: 'inherit', fontSize: 15, fontWeight: 500, height: 48, width: '100%', marginTop: 24, background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', transition: 'background 150ms' }}>See this intensive →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 6. WHAT ONE COHORT PUTS YOU THROUGH ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--bone-dim)' }}>
        <div className="pv-wrap" style={{ padding: '66px 40px 72px' }}>
          <div id="v3-proof" data-rv="">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: '0 0 30px' }}>What one cohort puts you through.</h2>
            <div className="pv-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 0, borderTop: '2px solid var(--ink-900)' }}>
              {proofStats.map(st => (
                <span key={st.l} style={{ padding: '22px 24px 0', borderRight: '1px solid var(--border-soft)' }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,3.4vw,52px)', fontWeight: 600, letterSpacing: '-.036em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{st.n}</span>
                  <span style={{ display: 'block', fontSize: 14, fontWeight: 600, marginTop: 9 }}>{st.l}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--fg-3)', marginTop: 4 }}>{st.s}</span>
                </span>
              ))}
            </div>
          </div>

          <div data-rv="" data-d="120" className="pv-5col" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: 10, margin: '36px 0 0' }}>
            {arc.map(a => (
              <div key={a.n} className="pv-h-lift3" style={{ background: a.bg, border: `1px solid ${a.bd}`, padding: '18px 16px 16px', display: 'flex', flexDirection: 'column', minHeight: 150, transition: 'transform 220ms cubic-bezier(.22,1,.36,1)' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: a.nfg }}>{a.n}</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, letterSpacing: '-.018em', lineHeight: 1.15, marginTop: 10, color: a.tfg }}>{a.t}</span>
                <span style={{ flex: 1, minHeight: 10 }} />
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-.026em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: a.vfg }}>{a.v}</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: a.sfg, marginTop: 5 }}>{a.s}</span>
              </div>
            ))}
          </div>

          <div data-rv="" data-d="200" className="pv-quoterow" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 14, margin: '34px 0 0' }}>
            {QUOTES.map(q => (
              <div key={q.id} className="pv-h-lift3" style={{ background: 'var(--paper)', border: '1px solid var(--border-strong)', borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', transition: 'transform 220ms cubic-bezier(.22,1,.36,1)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 19, lineHeight: 1.4, margin: 0 }}>&quot;{q.t}&quot;</p>
                <span style={{ flex: 1, minHeight: 16 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, paddingTop: 14, borderTop: '1px solid var(--border-soft)' }}>
                  <ImagePlaceholder shape="circle" label=" " style={{ width: 40, height: 40, flex: 'none' }} />
                  <span>
                    <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>{q.n}</span>
                    <span style={{ display: 'block', fontSize: 11, color: 'var(--fg-3)' }}>{q.r}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 7. COUNTDOWN / CLOSING CTA ─────────── */}
      <section style={{ background: 'var(--ink-900)', color: 'var(--bone)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right,rgba(244,239,230,.05) 0 1px,transparent 1px 32px),repeating-linear-gradient(to bottom,rgba(244,239,230,.05) 0 1px,transparent 1px 32px)', pointerEvents: 'none' }} />
        <div className="pv-wrap pv-2col" style={{ position: 'relative', padding: '76px 40px 80px', display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 52, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', color: 'var(--seal-300)' }}>{`APPLICATIONS CLOSE ${DATES.applyByDayMonth.toUpperCase()}`}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.6vw,68px)', fontWeight: 600, letterSpacing: '-.04em', lineHeight: .98, margin: '18px 0 0', color: 'var(--bone)' }}>{cd.d} days<br />to decide.</h2>
            <div style={{ display: 'flex', gap: 22, margin: '28px 0 0', flexWrap: 'wrap' }}>
              {[{ n: cd.d, l: 'DAYS' }, { n: cd.h, l: 'HOURS' }, { n: cd.m, l: 'MINUTES' }, { n: String(totalSeats), l: 'PLACES LEFT' }].map(c => (
                <span key={c.l} style={{ borderTop: '1px solid rgba(244,239,230,.24)', paddingTop: 9, minWidth: 74 }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: 'var(--bone)' }}>{c.n}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--ink-300)', marginTop: 5 }}>{c.l}</span>
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={scrollPick('homepage_bottom')} className="pv-h-seal600-lift" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 54, padding: '0 26px', background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', transition: 'transform 150ms' }}>Pick a programme</button>
            <button onClick={goAssess('homepage_bottom')} className="pv-h-lift2" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 54, padding: '0 26px', background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', borderRadius: 4, cursor: 'pointer', transition: 'transform 150ms' }}>Take an assessment</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--ink-300)' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--seal-500)', animation: 'v3pulse 1.6s ease-in-out infinite alternate' }} />{totalSeats} PLACES LEFT ACROSS SIX PROGRAMMES
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
