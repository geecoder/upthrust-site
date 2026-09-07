export function SeatFillBar({ seatsMax, seatsRemaining }: { seatsMax: number; seatsRemaining: number }) {
  const filledPct = Math.round(((seatsMax - seatsRemaining) / seatsMax) * 100);
  const low = seatsRemaining <= Math.ceil(seatsMax * 0.25);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-3)', marginBottom: 5 }}>
        <span>{seatsRemaining} of {seatsMax} seats left</span>
        {low && <span style={{ color: 'var(--seal-600)', fontWeight: 600 }}>Filling up</span>}
      </div>
      <div style={{ height: 4, background: 'var(--border-soft)' }}>
        <div style={{ height: 4, width: `${filledPct}%`, background: low ? 'var(--seal-500)' : 'var(--ink-800)' }} />
      </div>
    </div>
  );
}
