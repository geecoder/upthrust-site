'use client';

import { useAutoAdvance } from '@/lib/useAutoAdvance';

// The 12 generic, cross-pathway weekly artefacts cycled through this demo —
// deliberately not pathway-specific (that's PortfolioBoard's job, in the
// hero). Verbatim from the ground-truth prototype's MIX array.
const MIX = [
  { d: 'BA', t: 'Stakeholder map + RACI' },
  { d: 'PM', t: 'Product opportunity brief' },
  { d: 'PD', t: 'Journey map with pain points' },
  { d: 'PO', t: 'Payment flow map' },
  { d: 'BA', t: 'As-Is / To-Be maps' },
  { d: 'PM', t: 'Prioritised roadmap' },
  { d: 'PD', t: 'Wireflows for the core task' },
  { d: 'PO', t: 'Reconciliation model' },
  { d: 'BA', t: 'UAT pack' },
  { d: 'PM', t: 'Metrics & instrumentation plan' },
  { d: 'PD', t: 'Usability test findings' },
  { d: 'PO', t: 'Controls matrix' },
];

export function PortfolioStackDemo() {
  const { index, containerRef, onMouseEnter, onMouseLeave } = useAutoAdvance({ count: 12, intervalMs: 1400 });
  const stackN = index + 1; // 1-indexed "current week" the demo is on
  const start = Math.max(0, Math.min(stackN - 3, 6));
  const visible = MIX.slice(start, start + 6);

  return (
    <div ref={containerRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ border: '1px solid var(--border-strong)', background: 'var(--paper)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid var(--border-soft)', background: 'var(--paper-dim)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>PORTFOLIO · BUILDING LIVE</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>ALL FOUR PATHWAYS</span>
      </div>
      <div>
        {visible.map((a, i) => {
          const idx = start + i + 1;
          const done = idx < stackN;
          const live = idx === stackN;
          const pending = idx > stackN;
          const badge = pending ? 'AHEAD' : live ? 'IN REVIEW' : 'SIGNED OFF';
          const bfg = pending ? 'var(--fg-4)' : live ? 'var(--seal-700)' : 'var(--moss-700)';
          const bbg = pending ? 'var(--paper-dim)' : live ? 'var(--seal-50)' : 'var(--moss-50)';
          const acc = pending ? 'var(--paper-dim)' : live ? 'var(--seal-500)' : 'var(--moss-500)';
          return (
            <div key={a.t} style={{ display: 'grid', gridTemplateColumns: '4px minmax(0,1fr) auto', gap: 14, alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--border-hair)', opacity: pending ? 0.55 : 1, background: live ? 'var(--white)' : 'transparent' }}>
              <span style={{ alignSelf: 'stretch', background: acc }} />
              <span>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', color: 'var(--fg-3)' }}>W{String(idx).padStart(2, '0')} · {a.d}</span>
                <span style={{ display: 'block', fontSize: 14, fontWeight: 500, marginTop: 2, color: pending ? 'var(--fg-4)' : 'var(--fg-1)' }}>{a.t}</span>
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: bfg, background: bbg, padding: '3px 8px', whiteSpace: 'nowrap' }}>{badge}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderTop: '1px solid var(--border-soft)' }}>
        <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>REVIEWED · SCORED · REVISED · SIGNED OFF</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--fg-1)' }}>WEEK {String(stackN).padStart(2, '0')} OF TWELVE</span>
      </div>
    </div>
  );
}
