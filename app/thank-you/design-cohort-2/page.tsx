import Link from 'next/link';

export default function DesignInterestThankYou() {
  return (
    <section style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 'clamp(60px, 8vw, 100px)',
      paddingBottom: 'clamp(60px, 8vw, 100px)',
    }}>
      <div className="container-narrow">
        <p className="eyebrow">Product Design · Interest confirmed</p>
        <h1 className="display-l text-balance" style={{ marginTop: 20 }}>
          Good news — Product Design is open now.
        </h1>
        <p className="lede" style={{ marginTop: 24 }}>
          The Product Design pathway is no longer a waitlist. It is running its own Cohort 1 alongside Payment
          Operations, with the same twelve-week spine and review discipline already proven through Product Management
          and Business Analysis.
        </p>

        <div style={{
          marginTop: 40,
          padding: 28,
          background: 'var(--paper-soft)',
          border: '1px solid var(--paper-line)',
        }}>
          <p className="eyebrow">Next step</p>
          <p style={{ marginTop: 12, fontSize: '0.9375rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
            Take the Career Assessment to confirm Product Design is the right fit, or go straight to the pathway page
            to see the twelve-week track, sample work, and pricing.
          </p>
          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/pathways/product-design" className="btn btn-primary btn-arrow">See the Product Design pathway</Link>
            <Link href="/assessment" className="btn-ghost btn-arrow" style={{ fontSize: '0.9375rem' }}>
              Take the Career Assessment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
