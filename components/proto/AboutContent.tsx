'use client';

// The prototype's `isAbout` block: hero, count-up stats band (#v3-proof),
// four shifts, the founder band, four beliefs, the five-milestone timeline,
// and the closing CTA.

import { useRouter } from 'next/navigation';
import { ABOUT, FOUNDER_IMG, FOUNDER_LI, FOUNDER_NAME, FOUNDER_TITLE } from '@/lib/proto/data';
import { scrollToId, useProto, useProtoRoute } from '@/lib/proto/store';
import { Photo } from '@/components/proto/Photo';
import { analytics } from '@/lib/analytics';

export function AboutContent() {
  useProtoRoute('about');
  const { s } = useProto();
  const router = useRouter();

  const pt = s.proofT;
  const goHome = () => {
    analytics.ctaClicked({ cta_name: 'Compare programmes', cta_location: 'about_bottom', destination: '/' });
    router.push('/');
  };
  const goPricing = () => {
    analytics.ctaClicked({ cta_name: 'See programmes & pricing', cta_location: 'about_bottom', destination: '/#v3-pick' });
    router.push('/');
    window.setTimeout(() => scrollToId('v3-pick'), 90);
  };

  const stats = ABOUT.stats.map(x => ({
    n: (x.raw ? String(x.n) : Math.round(x.n * pt).toLocaleString('en-US')) + x.s,
    l: x.l,
  }));

  const timeline = ABOUT.timeline.map((x, i) => {
    const last = i === ABOUT.timeline.length - 1;
    return { ...x, dot: last ? 'var(--seal-500)' : 'var(--ink-900)', bg: last ? 'var(--paper-dim)' : 'transparent' };
  });

  return (
    <div style={{ animation: 'v3fade 340ms both' }}>

      {/* ─────────── HERO ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', position: 'relative', overflow: 'hidden', backgroundImage: 'repeating-linear-gradient(to right,rgba(11,26,43,.045) 0 1px,transparent 1px 28px),repeating-linear-gradient(to bottom,rgba(11,26,43,.045) 0 1px,transparent 1px 28px)' }}>
        <div className="pv-wrap pv-2col" style={{ padding: '56px 40px 52px', display: 'grid', gridTemplateColumns: '1.08fr .92fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ width: 34, height: 2, background: 'var(--seal-500)', marginBottom: 16 }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.12em', color: 'var(--fg-2)' }}>ABOUT UPTHRUST</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5.4vw,80px)', fontWeight: 600, letterSpacing: '-.042em', lineHeight: .97, margin: '20px 0 0', animation: 'v3rise 620ms cubic-bezier(.22,1,.36,1) both' }}>Capability,<br />not certificates.</h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--fg-2)', margin: '20px 0 0', maxWidth: '30em' }}>Too many talented people were collecting certificates but still struggling to demonstrate real capability. Upthrust exists to close that gap.</p>
          </div>
          <div style={{ position: 'relative' }}>
            <Photo
              src="/images/about-hero.jpg"
              alt="An Upthrust participant working through a cohort week"
              placeholder="Drop a cohort or workshop photo"
              aspectRatio="4/3"
              sizes="(max-width: 1180px) 92vw, 620px"
              priority
              style={{ width: '100%', border: '1px solid var(--ink-900)' }}
            />
            <div style={{ position: 'absolute', left: 0, bottom: 0, background: 'var(--ink-900)', color: 'var(--bone)', padding: '9px 14px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em' }}>A LIVE COHORT SESSION</div>
          </div>
        </div>
      </section>

      {/* ─────────── STATS ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--ink-900)', color: 'var(--bone)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right,rgba(244,239,230,.04) 0 1px,transparent 1px 32px),repeating-linear-gradient(to bottom,rgba(244,239,230,.04) 0 1px,transparent 1px 32px)', pointerEvents: 'none' }} />
        <div id="v3-proof" className="pv-wrap" style={{ position: 'relative', padding: '48px 40px 52px' }}>
          <div data-rv="" className="pv-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 0 }}>
            {stats.map(st => (
              <span key={st.l} style={{ padding: '0 24px', borderRight: '1px solid rgba(244,239,230,.14)' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,3.6vw,54px)', fontWeight: 600, letterSpacing: '-.038em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: 'var(--bone)' }}>{st.n}</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--ink-300)', marginTop: 9 }}>{st.l}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── FOUR SHIFTS ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--bone-dim)' }}>
        <div className="pv-wrap" style={{ padding: '56px 40px 62px' }}>
          <h2 data-rv="" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: 0 }}>Four shifts we exist to make.</h2>
          <div data-rv="" data-d="80" className="pv-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10, margin: '32px 0 0' }}>
            {ABOUT.shifts.map(sh => (
              <div key={sh.b} className="pv-h-lift4" style={{ background: 'var(--paper)', border: '1px solid var(--border-strong)', borderRadius: 6, padding: '22px 20px', minHeight: 140, display: 'flex', flexDirection: 'column', transition: 'transform 220ms cubic-bezier(.22,1,.36,1)' }}>
                <span style={{ display: 'block', fontSize: 15, color: 'var(--fg-3)', textDecoration: 'line-through' }}>{sh.a}</span>
                <span style={{ display: 'block', fontSize: 18, color: 'var(--seal-500)', margin: '10px 0' }} aria-hidden="true">↓</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-.022em', lineHeight: 1.15 }}>{sh.b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── FOUNDER ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)' }}>
        <div className="pv-wrap pv-2col" style={{ padding: '56px 40px 62px', display: 'grid', gridTemplateColumns: '400px minmax(0,1fr)', gap: 48, alignItems: 'start' }}>
          <div data-rv="">
            <Photo
              src={FOUNDER_IMG}
              alt={`${FOUNDER_NAME}, ${FOUNDER_TITLE}`}
              placeholder="Drop the founder portrait"
              aspectRatio="4/5"
              sizes="(max-width: 1180px) 92vw, 400px"
              style={{ width: '100%', border: '1px solid var(--ink-900)' }}
              imgStyle={{ objectPosition: 'center top' }}
            />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--fg-3)', marginTop: 10 }}>{FOUNDER_NAME.toUpperCase()} · {FOUNDER_TITLE.toUpperCase()}</div>
            <a href={FOUNDER_LI} target="_blank" rel="noopener" className="pv-h-seal7" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--seal-600)', textDecoration: 'none', transition: 'color 150ms' }}>
              <span>LINKEDIN</span><span aria-hidden="true">↗</span>
            </a>
          </div>
          <div data-rv="" data-d="80">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--fg-3)' }}>WHO IS BEHIND UPTHRUST</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: '14px 0 0' }}>Built by someone who has done every layer of the work.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--fg-2)', margin: '18px 0 0', maxWidth: '36em' }}>{FOUNDER_TITLE} at Upthrust. Product Lead, CBAP-certified Business Analyst, MBA from the University of East London. Over a decade across product management, business analysis, fintech and digital transformation. He currently builds diaspora financial products at Rova.</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 21, lineHeight: 1.45, fontStyle: 'italic', margin: '22px 0 0', paddingLeft: 18, borderLeft: '2px solid var(--seal-500)' }}>&quot;Upthrust is my answer to a problem I kept watching talented people run into.&quot;</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '22px 0 0' }}>
              {['CBAP CERTIFIED', 'MBA · UEL', 'PRODUCT LEAD · ROVA', 'IIBA NIGERIA'].map(c => (
                <span key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', border: '1px solid var(--border-strong)', padding: '6px 10px', color: 'var(--fg-2)' }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── BELIEFS ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--bone-dim)' }}>
        <div className="pv-wrap" style={{ padding: '56px 40px 62px' }}>
          <h2 data-rv="" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: 0 }}>What we believe.</h2>
          <div data-rv="" data-d="80" className="pv-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '32px 0 0' }}>
            {ABOUT.beliefs.map(b => (
              <div key={b.n} className="pv-h-white" style={{ background: 'var(--paper)', padding: '24px 22px', minHeight: 170, display: 'flex', flexDirection: 'column' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1, color: 'var(--seal-500)' }}>{b.n}</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.18, marginTop: 14 }}>{b.t}</span>
                <span style={{ flex: 1, minHeight: 8 }} />
                <span style={{ display: 'block', fontSize: 14, lineHeight: 1.55, color: 'var(--fg-2)' }}>{b.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── TIMELINE ─────────── */}
      <section style={{ borderBottom: '1px solid var(--border-strong)' }}>
        <div className="pv-wrap" style={{ padding: '56px 40px 62px' }}>
          <h2 data-rv="" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.04, margin: 0 }}>How we got here.</h2>
          <div data-rv="" data-d="80" className="pv-5col" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: 0, margin: '34px 0 0', borderTop: '2px solid var(--ink-900)' }}>
            {timeline.map(t => (
              <div key={t.y} style={{ padding: '22px 20px 24px', borderRight: '1px solid var(--border-soft)', background: t.bg, display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                <span style={{ display: 'block', width: 10, height: 10, borderRadius: '50%', background: t.dot, marginTop: -27, marginBottom: 16 }} />
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-.028em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{t.y}</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, letterSpacing: '-.018em', lineHeight: 1.2, marginTop: 12 }}>{t.t}</span>
                <span style={{ flex: 1, minHeight: 8 }} />
                <span style={{ display: 'block', fontSize: 13, lineHeight: 1.5, color: 'var(--fg-2)' }}>{t.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CLOSING CTA ─────────── */}
      <section style={{ background: 'var(--ink-900)', color: 'var(--bone)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right,rgba(244,239,230,.05) 0 1px,transparent 1px 32px),repeating-linear-gradient(to bottom,rgba(244,239,230,.05) 0 1px,transparent 1px 32px)', pointerEvents: 'none' }} />
        <div className="pv-wrap pv-2col" style={{ position: 'relative', padding: '64px 40px 70px', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 44, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', color: 'var(--seal-300)' }}>SIX PROGRAMMES · ALL START 20 SEPTEMBER</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4.2vw,60px)', fontWeight: 600, letterSpacing: '-.04em', lineHeight: 1, margin: '16px 0 0', color: 'var(--bone)' }}>Come and build<br />something real.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={goHome} className="pv-h-seal600-lift" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 52, padding: '0 26px', background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', transition: 'transform 150ms' }}>See all six programmes</button>
            <button onClick={goPricing} className="pv-h-lift2" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 52, padding: '0 26px', background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', borderRadius: 4, cursor: 'pointer', transition: 'transform 150ms' }}>See programmes &amp; pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
}
