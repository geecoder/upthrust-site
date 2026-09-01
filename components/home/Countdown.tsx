'use client';

import { useEffect, useState } from 'react';

function daysRemaining(applyByDate: string): number {
  const ms = new Date(`${applyByDate}T23:59:59`).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

// Days-remaining countdown to the application deadline. Computed client-side
// only (Date.now() at render time would differ between server and client and
// cause a hydration mismatch) — server renders nothing, client fills in once
// mounted.
export function Countdown({ applyByDate, applyByDisplay }: { applyByDate: string; applyByDisplay: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysRemaining(applyByDate));
    const timer = window.setInterval(() => setDays(daysRemaining(applyByDate)), 1000 * 60 * 60);
    return () => window.clearInterval(timer);
  }, [applyByDate]);

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
      {days !== null && (
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--bone)' }}>{days}</span>
      )}
      <span style={{ fontSize: 13, color: 'var(--ink-200)' }}>{days !== null ? `days to apply · closes ${applyByDisplay}` : `Applications close ${applyByDisplay}`}</span>
    </div>
  );
}
