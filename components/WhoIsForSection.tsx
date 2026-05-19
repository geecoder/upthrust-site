'use client';

import { useInView, useStagger } from '@/lib/animations';

const FOR_ITEMS = [
  { icon: '🔄', headline: 'Career switchers who are serious', body: 'You are in banking, ops, support, healthcare, education, consulting — and you can see how your instincts translate into product work. You are not dabbling. You are making a move.' },
  { icon: '📍', headline: 'Diaspora professionals rebuilding their career', body: 'You have moved to the UK, Canada, or Australia and your previous experience does not translate cleanly. You need a portfolio that speaks the language of the market you are in.' },
  { icon: '🧱', headline: 'People stuck in product-adjacent roles', body: 'Your title says analyst, coordinator, or associate — but you are already doing BA or PM work. The portfolio and Passport will help your title catch up to your reality.' },
  { icon: '⏰', headline: 'Early-career professionals filtering out of job listings', body: 'You keep seeing "3 years experience required" but you need experience to get experience. The Accelerator gives you portfolio evidence that replaces that catch-22.' },
  { icon: '💪', headline: 'People who will actually do the work', body: 'Every session. Every assignment. Every revision. You are not looking for a passive course to add to your LinkedIn. You want to practise the work under real conditions.' },
];

const NOT_FOR_ITEMS = [
  { icon: '🎓', headline: 'Certificate collectors', body: 'If the primary goal is adding a credential to your CV without doing the work, this is not the right program. We do not lead with certificates.' },
  { icon: '⌛', headline: 'People who cannot commit 8–10 hours per week', body: 'The program will not work for you if you attend some sessions and skip assignments. Partial engagement produces weak portfolios. Weak portfolios do not impress employers.' },
  { icon: '🎯', headline: 'People expecting a guaranteed job', body: 'We promise readiness, evidence, and confidence — not a hire. Anyone promising you a guaranteed job in exchange for a training fee should be questioned carefully.' },
  { icon: '📱', headline: 'Self-paced video learners', body: 'This is live and cohort-based. If you want to consume content on your own schedule, there are better options. Upthrust is not a video library.' },
];

export default function WhoIsForSection() {
  const { ref: forRef, inView: forInView } = useInView({ threshold: 0.1 });
  const { ref: notRef, inView: notInView } = useInView({ threshold: 0.1 });
  const forVisible = useStagger(FOR_ITEMS.length, 100, forInView);
  const notVisible = useStagger(NOT_FOR_ITEMS.length, 100, notInView);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }} className="who-for-grid">

      {/* Who this IS for */}
      <div ref={forRef as React.RefObject<HTMLDivElement>}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, paddingBottom: 20, borderBottom: '2px solid var(--ink)' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: 'var(--moss)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--paper)', fontSize: '1rem', flexShrink: 0,
          }}>✓</div>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em' }}>
            You'll thrive here if…
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {FOR_ITEMS.map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              opacity: forVisible[i] ? 1 : 0,
              transform: forVisible[i] ? 'translateX(0)' : 'translateX(-16px)',
              transition: `opacity 450ms ease ${i * 100}ms, transform 450ms ease ${i * 100}ms`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(79,106,74,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.25rem', flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--ink)', marginBottom: 4 }}>{item.headline}</p>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who this is NOT for */}
      <div ref={notRef as React.RefObject<HTMLDivElement>}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, paddingBottom: 20, borderBottom: '2px solid var(--paper-line)' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: 'var(--paper-line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink-muted)', fontSize: '1rem', flexShrink: 0,
          }}>✕</div>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink-soft)' }}>
            You probably shouldn't enroll if…
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {NOT_FOR_ITEMS.map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              opacity: notVisible[i] ? 1 : 0,
              transform: notVisible[i] ? 'translateX(0)' : 'translateX(16px)',
              transition: `opacity 450ms ease ${i * 100}ms, transform 450ms ease ${i * 100}ms`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'var(--paper-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.25rem', flexShrink: 0, opacity: 0.7,
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--ink-muted)', marginBottom: 4 }}>{item.headline}</p>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) { .who-for-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </div>
  );
}
