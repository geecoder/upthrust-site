import { HowItWorksAccordion } from '@/components/HowItWorksAccordion';

// Unwired from the home page during the prototype ground-truth reconciliation
// pass — the prototype's home route doesn't include this section. Kept here,
// compiled but unused, in case it's wanted elsewhere later.
export function HowItWorksSection() {
  return (
    <section style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--bone-dim)' }}>
      <div className="container" style={{ padding: '96px 24px' }}>
        <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 72, alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>How Upthrust works</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.1, margin: '18px 0 0' }}>
              Four steps. Each one earns the next.
            </h2>
          </div>
          <p style={{ fontSize: 17, color: 'var(--fg-2)', margin: 0, maxWidth: '34em' }}>
            We don&rsquo;t sell hours of training. We sell a sequence: a way of moving from confusion to capability to evidence, where each step proves you&rsquo;ve earned the right to the next one.
          </p>
        </div>
        <HowItWorksAccordion />
      </div>
    </section>
  );
}
