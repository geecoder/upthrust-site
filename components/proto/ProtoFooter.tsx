'use client';

// Ported from the prototype's <footer>. Brand block plus the three link
// groups it defines in FOOT, the contact / where-we-operate row, and the
// legal bar.

import { useRouter } from 'next/navigation';
import { FOOT, PROG_HREF, UPTHRUST_LI } from '@/lib/proto/data';
import { useProto } from '@/lib/proto/store';

const ROUTE_HREF: Record<string, string> = {
  ...PROG_HREF,
  accel: '/accelerator',
  assess: '/assessment',
  about: '/about',
};

export function ProtoFooter() {
  const router = useRouter();
  const { set } = useProto();

  const go = (k: string) => { set({ menu: false }); router.push(ROUTE_HREF[k] ?? '/'); };

  return (
    <footer style={{ background: 'var(--ink-900)', color: 'var(--bone)', borderTop: '1px solid rgba(244,239,230,.16)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right,rgba(244,239,230,.04) 0 1px,transparent 1px 32px),repeating-linear-gradient(to bottom,rgba(244,239,230,.04) 0 1px,transparent 1px 32px)', pointerEvents: 'none' }} />

      <div className="pv-wrap pv-footgrid" style={{ position: 'relative', padding: '52px 40px 0', display: 'grid', gridTemplateColumns: '1.3fr repeat(3, minmax(0,.9fr))', gap: 44, alignItems: 'start' }}>
        <div>
          <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{ width: 26, height: 26, border: '1px solid rgba(244,239,230,.4)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--bone)' }}>U</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-.022em', color: 'var(--bone)' }}>Upthrust</span>
          </span>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-200)', margin: '16px 0 0', maxWidth: '26em' }}>Live cohort programmes where professionals build evidence of capability, not another certificate.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, margin: '20px 0 0' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--seal-500)', animation: 'v3pulse 1.6s ease-in-out infinite alternate' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--seal-300)' }}>NEXT COHORT · 20 SEPTEMBER 2026</span>
          </div>
          {/* The prototype also shows Instagram and X chips. Only LinkedIn has
              a real account, and a chip that links nowhere is worse than no chip. */}
          <div style={{ display: 'flex', gap: 8, margin: '20px 0 0', flexWrap: 'wrap' }}>
            <a href={UPTHRUST_LI} target="_blank" rel="noopener" className="pv-h-bone" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', border: '1px solid rgba(244,239,230,.28)', padding: '7px 11px', color: 'var(--ink-200)', textDecoration: 'none', transition: 'color 150ms' }}>LINKEDIN ↗</a>
          </div>
        </div>

        {FOOT.map(g => (
          <div key={g.h}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--seal-300)', paddingBottom: 12, borderBottom: '1px solid rgba(244,239,230,.18)' }}>{g.h}</div>
            {g.links.map(x => (
              <button key={x.k} onClick={() => go(x.k)} className="pv-h-bone" style={{ font: 'inherit', display: 'block', width: '100%', textAlign: 'left', fontSize: 14, background: 'none', border: 0, padding: '10px 0', cursor: 'pointer', color: 'var(--ink-200)', transition: 'color 150ms' }}>{x.l}</button>
            ))}
          </div>
        ))}
      </div>

      <div className="pv-wrap" style={{ position: 'relative' }}>
        <div className="pv-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: '28px 0', marginTop: 36, borderTop: '1px solid rgba(244,239,230,.18)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--ink-400)' }}>GET IN TOUCH</div>
            <div style={{ fontSize: 15, color: 'var(--bone)', marginTop: 7 }}>info@upthrustdigital.com</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--ink-400)' }}>WHERE WE OPERATE</div>
            <div style={{ fontSize: 15, color: 'var(--bone)', marginTop: 7 }}>Lagos · London · Toronto</div>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', borderTop: '1px solid rgba(244,239,230,.12)' }}>
        <div className="pv-wrap" style={{ padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--ink-400)' }}>© 2026 UPTHRUST DIGITAL</span>
          <span style={{ display: 'flex', gap: 22 }}>
            {['PRIVACY', 'TERMS', 'COHORT AGREEMENT'].map(l => (
              <span key={l} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: 'var(--ink-400)' }}>{l}</span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
