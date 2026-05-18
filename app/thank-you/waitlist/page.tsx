import Link from 'next/link';

export default function WaitlistThankYou() {
  return (
    <section style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 'clamp(60px, 8vw, 100px)',
      paddingBottom: 'clamp(60px, 8vw, 100px)',
    }}>
      <div className="container-narrow">
        <p className="eyebrow">Waitlist Confirmed</p>
        <h1 className="display-l text-balance" style={{ marginTop: 20 }}>
          You're on the list.
        </h1>
        <p className="lede" style={{ marginTop: 24 }}>
          We'll send you Cohort 1 announcements before they go public — including curriculum previews, founder updates, and any early-cohort pricing we offer.
        </p>

        <div style={{
          marginTop: 40,
          padding: 28,
          background: 'var(--paper-soft)',
          border: '1px solid var(--paper-line)',
        }}>
          <p className="eyebrow">The smartest next move</p>
          <p style={{ marginTop: 12, fontSize: '0.9375rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
            If you haven't taken the Career Assessment yet, do it now. It tells you which pathway actually fits how you think — PM or BA — so when Cohort 1 opens, you already know where you belong. It takes 8 minutes.
          </p>
          <Link href="/assessment" className="btn btn-primary btn-arrow" style={{ marginTop: 20 }}>
            Take the Assessment
          </Link>
        </div>

        <p style={{ marginTop: 40, fontSize: '0.875rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
          You can unsubscribe at any time from the link in any email we send.
        </p>
      </div>
    </section>
  );
}
