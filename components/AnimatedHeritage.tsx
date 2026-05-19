'use client';

import { useInView, useCountUp } from '@/lib/animations';

function AnimatedStat({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const value = useCountUp(target, 2000, inView);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ textAlign: 'center' }}>
      <p style={{
        fontFamily: 'Fraunces, serif',
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 500,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: 'var(--ink)',
      }}>
        {value.toLocaleString()}{suffix}
      </p>
      <p style={{
        fontFamily: 'Manrope, sans-serif',
        fontSize: '0.6875rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--ink-muted)',
        marginTop: 8,
      }}>
        {label}
      </p>
    </div>
  );
}

export default function AnimatedHeritage() {
  return (
    <section style={{
      borderTop: '1px solid var(--paper-line)',
      borderBottom: '1px solid var(--paper-line)',
      padding: 'clamp(36px, 5vw, 56px) 0',
      background: 'var(--paper)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(24px, 4vw, 48px)',
          alignItems: 'center',
        }} className="heritage-grid">
          <AnimatedStat target={1000} suffix="+" label="Professionals trained globally" />
          <AnimatedStat target={2019} suffix="" label="Year Upthrust was founded" />
          <AnimatedStat target={4} suffix="" label="Continents represented" />
          <AnimatedStat target={25} suffix="" label="Cohort 1 seats (max)" />
        </div>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .heritage-grid { grid-template-columns: 1fr 1fr !important; gap: 32px 24px !important; }
        }
      `}</style>
    </section>
  );
}
