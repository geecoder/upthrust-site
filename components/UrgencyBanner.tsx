'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ENROLLMENT_CLOSE = new Date('2026-06-03T23:59:00'); // June 3, 2026
const COHORT_START = new Date('2026-06-06T00:00:00');     // June 6, 2026

export default function UrgencyBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [phase, setPhase] = useState<'enrolling' | 'closed' | 'started'>('enrolling');

  useEffect(() => {
    function update() {
      const now = new Date();
      if (now >= COHORT_START) { setPhase('started'); return; }
      if (now >= ENROLLMENT_CLOSE) { setPhase('closed'); return; }
      const diff = ENROLLMENT_CLOSE.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
      setPhase('enrolling');
    }
    update();
    const interval = setInterval(update, 60 * 1000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (phase === 'started') return null; // cohort has begun, no urgency needed

  return (
    <div style={{
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: '14px 24px',
      textAlign: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      position: 'relative',
      zIndex: 60,
    }}>
      {phase === 'closed' ? (
        <>
          <span style={{ fontSize: '0.9375rem', color: 'rgba(250,247,241,0.9)' }}>
            Cohort 1 enrollment is closed. Cohort 1 starts{' '}
            <strong style={{ color: 'var(--amber-soft)' }}>June 6, 2026</strong>.
          </span>
          <Link href="/consultation" style={{
            fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--amber)', borderBottom: '1px solid currentColor',
            paddingBottom: 1,
          }}>
            Join the Cohort 2 waitlist →
          </Link>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              display: 'inline-block', width: 8, height: 8,
              borderRadius: '50%', background: '#4ade80',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{ fontSize: '0.9375rem', color: 'rgba(250,247,241,0.9)' }}>
              <strong style={{ color: 'var(--amber-soft)' }}>Cohort 1 is open.</strong>{' '}
              Starts June 6, 2026.
              {daysLeft !== null && (
                <>
                  {' '}Enrollment closes in{' '}
                  <strong style={{ color: 'var(--amber-soft)' }}>
                    {daysLeft === 1 ? '1 day' : `${daysLeft} days`}
                  </strong>.
                </>
              )}
            </span>
          </div>
          <Link href="/assessment" style={{
            fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--amber)', borderBottom: '1px solid currentColor',
            paddingBottom: 1, whiteSpace: 'nowrap',
          }}>
            Take the Assessment →
          </Link>
        </>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
