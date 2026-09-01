const PROBLEM_ROWS = [
  { complaint: '"I have 3 certificates but no one calls me back"', replacement: 'Portfolio + Capability Passport' },
  { complaint: '"I finished the course but can\'t explain what I built"', replacement: '12 artefacts defended under review' },
  { complaint: '"I don\'t know how to show my value in interviews"', replacement: '10 interview stories from real work' },
];

// Unwired from the home page during the prototype ground-truth reconciliation
// pass — the prototype's home route doesn't include this section. Kept here,
// compiled but unused, in case it's wanted elsewhere later.
export function TheProblem() {
  return (
    <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
      <div className="container" style={{ padding: '96px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>The problem we solve</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.125rem, 4vw, 3.25rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.08, margin: '18px 0 0', maxWidth: '20em' }}>
          Most people don&rsquo;t have a learning problem. They have a proof problem.
        </h2>
        <p style={{ fontSize: 18, color: 'var(--fg-2)', margin: '20px 0 0', maxWidth: '38em' }}>Certificates say you attended. A Capability Passport shows what you can do.</p>
        <div style={{ margin: '56px 0 0', borderTop: '1px solid var(--ink-800)' }}>
          {PROBLEM_ROWS.map((row) => (
            <div key={row.complaint} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 40px minmax(0,1fr)', alignItems: 'center', gap: 16, padding: '26px 0', borderBottom: '1px solid var(--border-soft)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: 'var(--fg-2)', fontStyle: 'italic' }}>{row.complaint}</div>
              <div style={{ textAlign: 'center', color: 'var(--seal-500)', fontSize: 20 }}>→</div>
              <div style={{ fontSize: 17, fontWeight: 500 }}>{row.replacement}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
