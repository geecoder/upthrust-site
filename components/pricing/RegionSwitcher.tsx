'use client';

import { useRegion } from '@/lib/useRegion';
import { REGION_SWITCHER } from '@/lib/region';

// The discreet manual override that sits in the pricing section header —
// deliberately not in the nav. Prices are resolved server-side from an edge
// geo header, which is right for almost everyone; this exists for the people
// it can't be right for: anyone on a VPN, and anyone paying from a different
// country than they're sitting in.
//
// Selecting an option writes a cookie and refreshes, so every figure on the
// page is re-rendered on the server in the new currency.
export function RegionSwitcher() {
  const [region, setRegion] = useRegion();

  return (
    <div
      role="group"
      aria-label="Show prices for a different country"
      style={{ display: 'flex', gap: 2, justifyContent: 'flex-end', border: '1px solid var(--border-strong)', borderRadius: 3, overflow: 'hidden' }}
    >
      {REGION_SWITCHER.map((r) => {
        const active = region === r.region;
        return (
          <button
            key={r.region}
            onClick={() => setRegion(r.region)}
            aria-pressed={active}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.06em',
              padding: '6px 10px', border: 0, cursor: 'pointer', whiteSpace: 'nowrap',
              background: active ? 'var(--ink-900)' : 'transparent',
              color: active ? 'var(--bone)' : 'var(--fg-3)',
              transition: 'background 150ms var(--ease-quint-out)',
            }}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}
