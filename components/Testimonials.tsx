'use client';

import { TESTIMONIALS } from '@/lib/testimonials';

function InitialsAvatar({ name }: { name: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div aria-hidden style={{
      width: 72, height: 72, borderRadius: '50%',
      background: 'var(--ink)', color: 'var(--paper)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Fraunces, serif', fontSize: '1.5rem',
      fontWeight: 500, letterSpacing: '-0.5px', flexShrink: 0,
      border: '3px solid var(--paper-line)',
    }}>
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section style={{ padding: 'clamp(72px, 10vw, 120px) 0', background: 'var(--paper-soft)' }}>
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <p className="eyebrow">Alumni Results</p>
          <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
            From people who have done the work.
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            These are real Upthrust alumni — working as Business Analysts in Canada and the UK. Their words, not ours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} style={{
              background: 'var(--white)', border: '1px solid var(--paper-line)',
              padding: '36px 32px', display: 'flex', flexDirection: 'column',
              gap: 24, position: 'relative',
            }}>
              <div aria-hidden style={{
                position: 'absolute', top: 20, right: 24,
                fontFamily: 'Fraunces, serif', fontSize: '5rem',
                lineHeight: 1, color: 'var(--amber)', opacity: 0.18,
                userSelect: 'none', pointerEvents: 'none',
              }}>
                "
              </div>

              <blockquote style={{
                fontFamily: 'Fraunces, serif', fontSize: '1.125rem',
                fontStyle: 'italic', lineHeight: 1.65,
                color: 'var(--ink)', margin: 0, flex: 1, letterSpacing: '-0.01em',
              }}>
                "{t.quote}"
              </blockquote>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 16,
                paddingTop: 20, borderTop: '1px solid var(--paper-line)',
              }}>
                {t.photo ? (
                  <img src={t.photo} alt={t.name} width={72} height={72} style={{
                    width: 72, height: 72, borderRadius: '50%',
                    objectFit: 'cover', flexShrink: 0, border: '3px solid var(--paper-line)',
                  }} />
                ) : (
                  <InitialsAvatar name={t.name} />
                )}
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--ink)' }}>{t.name}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--amber-deep)', fontWeight: 500, marginTop: 2 }}>{t.role}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)', marginTop: 2 }}>{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={{
          marginTop: 32, fontSize: '0.875rem', color: 'var(--ink-muted)',
          fontStyle: 'italic', textAlign: 'center',
        }}>
          All three alumni above completed the Business Analysis pathway. PM pathway results will follow Cohort 1 graduation in August 2026.
        </p>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 580px) and (max-width: 860px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
