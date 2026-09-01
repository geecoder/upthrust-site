// Pulsing seal dot + cohort start/close dates — shared across the pricing
// section header, About's closing CTA, and Home's closing CTA. Pure CSS
// animation (no client JS needed), paused under prefers-reduced-motion.
export function CohortStatusLine({ startDisplay, applyByDisplay }: { startDisplay: string; applyByDisplay: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      <span className="cohort-pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--moss-500)', flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--fg-3)', textTransform: 'uppercase' }}>
        Cohort starts {startDisplay} · Applications close {applyByDisplay}
      </span>
      <style>{`
        @keyframes cohortPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .cohort-pulse-dot { animation: cohortPulse 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .cohort-pulse-dot { animation: none; } }
      `}</style>
    </div>
  );
}
