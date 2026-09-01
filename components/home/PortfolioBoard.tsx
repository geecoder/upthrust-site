'use client';

import { useEffect, useState } from 'react';

const STATUSES = ['AHEAD', 'IN REVIEW', 'SIGNED OFF'] as const;
const STATUS_COLOR: Record<(typeof STATUSES)[number], string> = {
  AHEAD: 'var(--seal-600)',
  'IN REVIEW': 'var(--ochre-700)',
  'SIGNED OFF': 'var(--moss-700)',
};

function CyclingStatusBadge({ tick, offset }: { tick: number; offset: number }) {
  const status = STATUSES[(tick + offset) % STATUSES.length];
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: STATUS_COLOR[status], transition: 'color 300ms' }}>
      {status}
    </span>
  );
}

export interface PortfolioBoardItem {
  code: string;
  name: string;
}

// A bordered "live cohort board" panel filling the hero's right column —
// one row per live programme, each with a staggered cycling status badge so
// the whole board reads as continuously in motion.
export function PortfolioBoard({ items }: { items: PortfolioBoardItem[] }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const timer = window.setInterval(() => setTick((t) => t + 1), 1400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div style={{ border: '1px solid var(--border-soft)', background: 'var(--white)', boxShadow: 'var(--shadow-2)' }}>
      <div style={{ background: 'var(--ink-800)', color: 'var(--bone)', padding: '12px 18px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em' }}>
        LIVE COHORT BOARD
      </div>
      {items.map((item, i) => (
        <div key={item.code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 18px', borderBottom: '1px solid var(--border-soft)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', flexShrink: 0 }}>{item.code}</span>
            <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
          </span>
          <CyclingStatusBadge tick={tick} offset={i} />
        </div>
      ))}
      <div style={{ background: 'var(--paper-dim)', padding: '10px 18px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)' }}>
        WEEKLY ARTEFACTS · REVIEWED WITHIN SLA
      </div>
    </div>
  );
}
