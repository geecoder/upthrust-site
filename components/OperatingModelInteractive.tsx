'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useInView } from '@/lib/animations';

const STEPS = [
  {
    num: '01',
    label: 'Assess',
    shortDesc: 'Diagnose your fit',
    fullDesc:
      'Take the 8-minute Career Assessment — 12 real product scenarios that reveal how you actually think. Not a quiz. Not a personality test. A practical diagnostic that routes you to the pathway that fits your instincts.',
    outcome: 'Your pathway confirmed',
    icon: (active: boolean) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" strokeDasharray={active ? '69' : '0'} style={{ transition: 'stroke-dasharray 600ms ease' }}/>
        <path d="M9 14 L12 17 L19 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ opacity: active ? 1 : 0.4, transition: 'opacity 300ms ease' }}
        />
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Build',
    shortDesc: '12 weeks of real work',
    fullDesc:
      'Twelve weeks of practical product work — stakeholder simulations, weekly assignments, and a 5-week capstone project. Every session is live. Every assignment produces a real artefact. Mentorship from a practitioner who has done the work himself.',
    outcome: 'A portfolio of real work',
    icon: (active: boolean) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        {[
          { x: 3, h: 8 },
          { x: 10, h: 14 },
          { x: 17, h: 20 },
          { x: 24, h: 24 },
        ].map(({ x, h }, i) => (
          <rect key={i} x={x - 3} y={28 - h} width="5" height={h}
            stroke="currentColor" strokeWidth="1.5"
            fill={active ? 'currentColor' : 'none'}
            style={{ opacity: active ? 0.15 + i * 0.25 : 0.4, transition: `opacity ${300 + i * 100}ms ease, fill 300ms ease` }}
          />
        ))}
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Verify',
    shortDesc: 'Earn the Passport',
    fullDesc:
      'Your work is reviewed against a published capability rubric — not a tick-box completion check. Six capability areas assessed. A capstone you defended. A facilitator sign-off. Your Capability Passport is issued only when the standard is met, not when the calendar says so.',
    outcome: 'Capability Passport issued',
    icon: (active: boolean) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3 L17 9 L23 10 L19 15 L20 22 L14 19 L8 22 L9 15 L5 10 L11 9 Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
          fill={active ? 'currentColor' : 'none'}
          style={{ opacity: active ? 0.2 : 0.4, transition: 'opacity 400ms, fill 400ms' }}
        />
        <path d="M14 3 L17 9 L23 10 L19 15 L20 22 L14 19 L8 22 L9 15 L5 10 L11 9 Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"
        />
      </svg>
    ),
  },
  {
    num: '04',
    label: 'Showcase',
    shortDesc: 'Open the career door',
    fullDesc:
      'Your portfolio, capstone, and Capability Passport — packaged for employers. Demo Day puts you in front of hiring managers and product leaders. Alumni network connects you to every cohort that follows. The evidence you built doesn\'t expire.',
    outcome: 'Career opportunities',
    icon: (active: boolean) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 26 C4 20 8 16 14 16 C20 16 24 20 24 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M19 8 L24 3 M21 3 L24 3 L24 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ opacity: active ? 1 : 0.4, transition: 'opacity 400ms' }}
        />
      </svg>
    ),
  },
];

export default function OperatingModelInteractive() {
  const [active, setActive] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.2 });

  // Auto-advance through steps
  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [inView]);

  // Animate progress bar
  useEffect(() => {
    setProgressWidth(((active + 1) / STEPS.length) * 100);
  }, [active]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {/* Desktop step connector */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0, position: 'relative', marginBottom: 0,
      }} className="steps-row">
        {/* Progress connector line */}
        <div aria-hidden style={{
          position: 'absolute', top: 40, left: '12.5%', right: '12.5%',
          height: 2, background: 'var(--paper-line)', zIndex: 0,
        }} />
        <div aria-hidden style={{
          position: 'absolute', top: 40, left: '12.5%',
          width: `${progressWidth * 0.75}%`,
          height: 2, background: 'var(--amber)',
          zIndex: 1, transition: 'width 500ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        }} />

        {STEPS.map((step, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <button
              key={step.num}
              onClick={() => setActive(i)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0 12px 32px', position: 'relative', zIndex: 2,
              }}
            >
              {/* Node circle */}
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: isActive ? 'var(--ink)' : isPast ? 'var(--amber)' : 'var(--paper)',
                border: `2px solid ${isActive ? 'var(--ink)' : isPast ? 'var(--amber)' : 'var(--paper-line)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: isActive || isPast ? 'var(--paper)' : 'var(--ink)',
                transition: 'all 350ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                boxShadow: isActive ? '0 8px 24px -8px rgba(15,26,46,0.4)' : 'none',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                flexShrink: 0,
              }}>
                {step.icon(isActive || isPast)}
              </div>

              <p style={{
                fontFamily: 'Manrope, sans-serif', fontSize: '0.625rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--amber-deep)', marginTop: 16, marginBottom: 6,
              }}>{step.num}</p>

              <p style={{
                fontFamily: 'Fraunces, serif',
                fontSize: '1.375rem', fontWeight: 500,
                letterSpacing: '-0.022em', textAlign: 'center',
                color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
                transition: 'color 300ms',
              }}>{step.label}</p>

              <p style={{
                fontSize: '0.8125rem', color: 'var(--ink-muted)',
                textAlign: 'center', marginTop: 4, lineHeight: 1.4,
              }}>{step.shortDesc}</p>

              {/* Active indicator dot */}
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--amber)', marginTop: 10,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 300ms',
              }} />
            </button>
          );
        })}
      </div>

      {/* Detail panel — animated */}
      <div style={{
        background: 'var(--paper-soft)',
        border: '1px solid var(--paper-line)',
        borderTop: '3px solid var(--amber)',
        padding: 'clamp(28px, 4vw, 48px)',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 48, alignItems: 'center',
      }} className="step-detail-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <span style={{
              fontFamily: 'Manrope, sans-serif', fontSize: '0.625rem',
              letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--amber-deep)',
            }}>Step {STEPS[active].num}</span>
            <span style={{ height: 1, flex: 1, background: 'var(--paper-line)' }} />
          </div>
          <h3 style={{
            fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 400, letterSpacing: '-0.025em', marginBottom: 16,
          }}>{STEPS[active].label}</h3>
          <p style={{
            fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-soft)',
            maxWidth: 640,
          }}>{STEPS[active].fullDesc}</p>
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 8, flexShrink: 0,
        }}>
          <div style={{
            padding: '12px 20px',
            background: active === 3 ? 'var(--amber)' : 'var(--ink)',
            color: 'var(--paper)',
            fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            textAlign: 'center', whiteSpace: 'nowrap',
            transition: 'background 300ms',
          }}>
            → {STEPS[active].outcome}
          </div>
          {/* Step dots navigation */}
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            {STEPS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? 20 : 6, height: 6, borderRadius: 3,
                background: i === active ? 'var(--ink)' : 'var(--paper-line)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'width 300ms, background 300ms',
              }} aria-label={`Go to step ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <Link href="/assessment" className="btn btn-primary btn-arrow">
          Start with the Assessment
        </Link>
        <Link href="/accelerator" className="btn btn-secondary">
          See the full program
        </Link>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .steps-row { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
          .step-detail-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 400px) {
          .steps-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
