import Link from 'next/link';

export default function DesignWaitlistThankYou() {
  return (
    <section style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 'clamp(60px, 8vw, 100px)',
      paddingBottom: 'clamp(60px, 8vw, 100px)',
    }}>
      <div className="container-narrow">
        <p className="eyebrow">Design Cohort 2 Waitlist · Confirmed</p>
        <h1 className="display-l text-balance" style={{ marginTop: 20 }}>
          You're on the Design waitlist.
        </h1>
        <p className="lede" style={{ marginTop: 24 }}>
          The Product Design pathway opens in Cohort 2, after we've proven PM and BA delivery in Cohort 1. You'll be first to hear when enrollment opens — and you'll get any waitlist-only pricing we offer.
        </p>

        <div style={{
          marginTop: 40,
          padding: 28,
          background: 'var(--paper-soft)',
          border: '1px solid var(--paper-line)',
        }}>
          <p className="eyebrow">A question worth considering</p>
          <p style={{ marginTop: 12, fontSize: '0.9375rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
            Many people who score Design-leaning on the assessment are actually <em>hybrid BA/Design</em> — meaning they think in user journeys and process structure at the same time. If that sounds like you, joining the BA pathway in Cohort 1 (while staying on the Design waitlist for Cohort 2) is often the smartest play.
          </p>
          <p style={{ marginTop: 12, fontSize: '0.9375rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
            A 20-minute consultation is the fastest way to think this through.
          </p>
          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/consultation" className="btn btn-primary btn-arrow">Book a Consultation</Link>
            <Link href="/pathway-business-analysis" className="btn-ghost btn-arrow" style={{ fontSize: '0.9375rem' }}>
              See the BA pathway
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
