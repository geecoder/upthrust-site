import Link from 'next/link';

export default function ConsultationPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 'clamp(80px, 12vw, 140px)', paddingBottom: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container-narrow">
          <p className="eyebrow">Book a Career Consultation</p>
          <h1 className="display-l text-balance" style={{ marginTop: 20 }}>
            Twenty minutes. Real conversation. <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}>No pressure.</span>
          </h1>
          <p className="lede text-pretty" style={{ marginTop: 24 }}>
            The consultation is a one-on-one conversation about where you are, where you want to be, and whether the Career Capability Accelerator is the right move for you right now. We will not pitch. We will talk honestly. If it's the wrong fit, we will say so.
          </p>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section style={{ paddingBottom: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container-narrow">
          <div style={{ background: 'var(--paper-soft)', padding: 36, border: '1px solid var(--paper-line)' }}>
            <p className="eyebrow">What we will talk about</p>
            <ul style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Your current situation', body: 'What you do now, what you have tried, and what is or is not working in your career right now.' },
                { label: 'Your assessment result', body: 'If you took the Career Assessment, we will walk through it together — what your reflexes pointed to, and what that means for your pathway choice.' },
                { label: 'The right pathway', body: 'Whether PM or BA fits you better, or whether the Design Cohort 2 waitlist is the right call.' },
                { label: 'The right tier', body: 'Standard or Premium, what each delivers, and how to choose based on your goals — not based on price.' },
                { label: 'Honest constraints', body: 'Time, money, timeline. We will work through what is realistic and what is not.' },
                { label: 'Next steps', body: 'A clear answer at the end. Enroll, wait, or do something else first. No hard sell.' },
              ].map((item) => (
                <li key={item.label} style={{ display: 'flex', gap: 14, fontSize: '0.9375rem', lineHeight: 1.55 }}>
                  <span style={{ color: 'var(--amber)', flexShrink: 0, paddingTop: 2 }}>→</span>
                  <div>
                    <strong style={{ color: 'var(--ink)' }}>{item.label}.</strong>{' '}
                    <span style={{ color: 'var(--ink-soft)' }}>{item.body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p style={{ marginTop: 32, fontSize: '0.9375rem', color: 'var(--ink-muted)', fontStyle: 'italic', lineHeight: 1.6 }}>
            Most consultations end in a decision. Some end in "let's talk again after you've thought about it." A few end in "this is not your moment, here is what I'd do instead." All three are good outcomes.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section style={{ paddingBottom: 'clamp(72px, 10vw, 120px)' }}>
        <div className="container-narrow">
          <p className="eyebrow">Request your slot</p>
          <h2 className="display-s" style={{ marginTop: 16, fontSize: '1.875rem' }}>
            Fill this in, and we will reach out within 24 hours.
          </h2>
          <p style={{ marginTop: 16, fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
            The form below is intentionally a few questions deeper than a standard booking form. The questions help us prepare for the call — so we don't waste your first 10 minutes on basics we could have read in advance.
          </p>

          <div style={{
            marginTop: 32,
            padding: 32,
            background: 'var(--white)',
            border: '1px solid var(--paper-line)',
          }}>
            {/* Replace TALLY_FORM_ID with your real Tally form ID when you create it */}
            <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.6875rem', color: 'var(--amber-deep)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
              [ Tally Form Embed Placeholder ]
            </p>
            <p className="text-soft" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
              This is where your Tally consultation booking form will embed. Once you create the form in Tally, replace this section with the embed code, or use a Tally iframe like:
            </p>
            <pre style={{
              marginTop: 16,
              padding: 16,
              background: 'var(--paper-soft)',
              fontSize: '0.8125rem',
              fontFamily: 'Geist Mono, monospace',
              overflow: 'auto',
              lineHeight: 1.6,
            }}>
{`<iframe
  src="https://tally.so/embed/YOUR_FORM_ID?alignLeft=1&transparentBackground=1"
  loading="lazy"
  width="100%"
  height="800"
  frameBorder="0"
/>`}
            </pre>

            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--paper-line)' }}>
              <p className="eyebrow">Tally form fields to include</p>
              <ul style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.875rem', color: 'var(--ink-soft)' }}>
                <li>· Full name</li>
                <li>· Email</li>
                <li>· Phone or WhatsApp</li>
                <li>· Country (used to determine regional pricing)</li>
                <li>· Current role or background</li>
                <li>· Pathway interest: PM Cohort 1 / BA Cohort 1 / Not sure / Design Cohort 2 waitlist</li>
                <li>· Did you complete the Career Assessment? (Yes / No)</li>
                <li>· If yes, what was your result?</li>
                <li>· Biggest career challenge right now (short text)</li>
                <li>· Goal for the next 6–12 months (short text)</li>
                <li>· Tier interest: Standard / Premium / Not sure</li>
                <li>· Preferred call times (3 slots)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BACKUP CONTACT */}
      <section style={{ background: 'var(--paper-soft)', padding: 'clamp(48px, 7vw, 80px) 0' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <h3 className="display-s" style={{ fontSize: '1.5rem' }}>
            Prefer to email or WhatsApp?
          </h3>
          <p style={{ marginTop: 12, fontSize: '1rem', color: 'var(--ink-soft)' }}>
            Reach us at <a href="mailto:hello@upthrust.io" style={{ color: 'var(--amber-deep)', borderBottom: '1px solid currentColor', paddingBottom: 1 }}>hello@upthrust.io</a> and we will get back within 24 hours.
          </p>
          <p style={{ marginTop: 24, fontSize: '0.875rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
            If you haven't taken the Career Assessment yet, we'd recommend doing that first. It gives us a much better starting point for the call.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/assessment" className="btn-ghost btn-arrow">Take the Career Assessment</Link>
          </div>
        </div>
      </section>
    </>
  );
}
