'use client';

import { useInView, useCountUp } from '@/lib/animations';
import { LottieOnScroll } from '@/components/LottieOnScroll';

function AnimatedStat({ target, suffix = '', label, lottieUrl }: { target: number; suffix?: string; label: string; lottieUrl?: string }) {
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
      {lottieUrl && (
        <div className="hidden md:flex justify-center mt-3">
          <LottieOnScroll src={lottieUrl} width={60} height={60} loop={false} threshold={0.5} />
        </div>
      )}
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
          {/* ANIMATIONS 2, 3, 4 — stat icons on desktop */}
          <AnimatedStat target={1000} suffix="+" label="Professionals trained globally"
            lottieUrl="https://lottie.host/e7d73b32-e81d-4f0a-8512-7a9543c08b8e/VmLBvMSjxj.lottie" />
          <AnimatedStat target={2019} suffix="" label="Year Upthrust was founded"
            lottieUrl="https://lottie.host/2b2bb1e0-e2a9-4b73-91e4-6de5c4832e60/IfKVCqeH2L.lottie" />
          <AnimatedStat target={4} suffix="" label="Continents represented"
            lottieUrl="https://lottie.host/c9c9d8e1-e2a5-4ef0-88eb-6a4ed4b14234/YE5TYEzh6c.lottie" />
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
