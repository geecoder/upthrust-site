'use client';

import { CountUpStat } from '@/components/ui/CountUpStat';

// value/label/sub layout for the Proof section's stat row — CountUpStat
// defaults to a static fade/rise reveal (no counting), matching the
// prototype, which never animates a number counting up.
export function ProofStat({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div>
      <CountUpStat value={value} style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }} />
      <div style={{ fontSize: 14, color: 'var(--fg-2)', marginTop: 6 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-3)', marginTop: 3 }}>{sub}</div>}
    </div>
  );
}
