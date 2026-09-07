const STEPS = [
  { n: 'STEP 01', label: 'You apply', value: '25', sub: 'PLACES PER COHORT', dark: false },
  { n: 'STEP 02', label: 'You build', value: '12', sub: 'ARTEFACTS ON REAL BRIEFS', dark: false },
  { n: 'STEP 03', label: 'You get marked', value: '48h', sub: 'FEEDBACK TURNAROUND', dark: false },
  { n: 'STEP 04', label: 'You revise', value: '2×', sub: 'EVERY ARTEFACT, BEFORE IT COUNTS', dark: false },
  { n: 'STEP 05', label: 'You defend', value: '82', sub: 'TYPICAL DEFENCE SCORE', dark: true },
];

// A static 5-step arc — no state, no animation — tracing the shape of the
// programme from application to a defensible, employer-checkable record.
export function ProofArc() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)' }}>
      {STEPS.map((s) => (
        <div key={s.n} style={{ background: s.dark ? 'var(--ink-900)' : 'var(--paper)', padding: '20px 20px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: s.dark ? 'var(--seal-300)' : 'var(--fg-3)' }}>{s.n}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginTop: 8, color: s.dark ? 'var(--bone)' : 'var(--fg-1)' }}>{s.label}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 14, fontVariantNumeric: 'tabular-nums', color: s.dark ? 'var(--bone)' : 'var(--ink-900)' }}>{s.value}</div>
          <div style={{ fontSize: 11, letterSpacing: '0.06em', color: s.dark ? 'var(--ink-300)' : 'var(--fg-3)', marginTop: 4 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
