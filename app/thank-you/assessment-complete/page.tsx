import Link from 'next/link';

export default function AssessmentCompleteThankYou() {
  return (
    <section style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 'clamp(60px, 8vw, 100px)',
      paddingBottom: 'clamp(60px, 8vw, 100px)',
    }}>
      <div className="container-narrow">
        <p className="eyebrow">Assessment Complete</p>
        <h1 className="display-l text-balance" style={{ marginTop: 20 }}>
          Your result is on its way to your inbox.
        </h1>
        <p className="lede" style={{ marginTop: 24 }}>
          Check your email for your detailed result. The most important next step is to book a 20-minute consultation — we'll walk through your result together and decide what's right for you.
        </p>

        <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          <Link href="/consultation" className="btn btn-primary btn-arrow">Book a Consultation</Link>
          <Link href="/accelerator" className="btn btn-secondary">See the Accelerator</Link>
        </div>
      </div>
    </section>
  );
}
