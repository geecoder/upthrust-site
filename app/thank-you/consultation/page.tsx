import Link from 'next/link';

export default function ConsultationThankYou() {
  return (
    <section style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 'clamp(60px, 8vw, 100px)',
      paddingBottom: 'clamp(60px, 8vw, 100px)',
    }}>
      <div className="container-narrow">
        <p className="eyebrow">Consultation Request Received</p>
        <h1 className="display-l text-balance" style={{ marginTop: 20 }}>
          Thank you — we're on it.
        </h1>
        <p className="lede" style={{ marginTop: 24 }}>
          We'll reach out within 24 hours with a few time options for your 20-minute call. Check your inbox (and the spam folder, just in case).
        </p>

        <div style={{
          marginTop: 40,
          padding: 28,
          background: 'var(--paper-soft)',
          border: '1px solid var(--paper-line)',
        }}>
          <p className="eyebrow">While you wait</p>
          <p style={{ marginTop: 12, fontSize: '0.9375rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
            If you haven't taken the Career Assessment yet, we'd highly recommend doing it before our call. It takes 8 minutes and gives us a much better starting point — we won't have to spend the first 10 minutes covering basics that the assessment already shows.
          </p>
          <Link href="/assessment" className="btn btn-primary btn-arrow" style={{ marginTop: 20 }}>
            Take the Assessment
          </Link>
        </div>

        <p style={{ marginTop: 40, fontSize: '0.875rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
          If you don't hear from us within 24 hours, email <a href="mailto:hello@upthrust.io" style={{ color: 'var(--amber-deep)', borderBottom: '1px solid currentColor' }}>hello@upthrust.io</a> and we'll fix it.
        </p>
      </div>
    </section>
  );
}
