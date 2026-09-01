// Unwired from the home page during the prototype ground-truth reconciliation
// pass — the prototype's home route doesn't include this section. Kept here,
// compiled but unused, in case it's wanted elsewhere later.
export function PremisePullQuote() {
  return (
    <section style={{ background: 'var(--bone-dim)', borderBottom: '1px solid var(--border-soft)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.625rem, 3.2vw, 2.5rem)', fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.02em', margin: 0 }}>
          The future of work will not reward people only for what they studied. It will reward people for what they can prove they can do.
        </p>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--fg-3)', marginTop: 28 }}>The Upthrust premise</div>
      </div>
    </section>
  );
}
