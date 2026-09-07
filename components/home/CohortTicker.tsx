// Pure-CSS marquee — no client JS, animates via the .marquee-track keyframe
// in globals.css and is paused automatically under prefers-reduced-motion.
// Content is doubled back-to-back so the loop reads as seamless.
export function CohortTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--paper-dim)', overflow: 'hidden' }}>
      <div className="marquee-track" style={{ display: 'flex', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 28px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--fg-3)', whiteSpace: 'nowrap', borderRight: '1px solid var(--border-soft)' }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--seal-500)' }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
