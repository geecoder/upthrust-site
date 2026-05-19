'use client';

import { useInView, fadeUpStyle } from '@/lib/animations';

const SHIFTS = [
  { old: 'Certificate collected', new: 'Evidence produced', pct: 85 },
  { old: 'Course completed', new: 'Capability demonstrated', pct: 78 },
  { old: '"I attended X program"', new: '"Here is my capstone"', pct: 91 },
  { old: 'Passive learner', new: 'Active builder', pct: 83 },
];

export default function WhyNowVisual() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="why-now-grid">

      {/* Left — the market reality illustration */}
      <div style={fadeUpStyle(inView, 0)}>
        <div style={{
          background: 'var(--paper-soft)',
          border: '1px solid var(--paper-line)',
          padding: 32,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* SVG scene — person at a whiteboard */}
          <svg viewBox="0 0 440 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Background grid */}
            <pattern id="grid-why" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--paper-line)" strokeWidth="0.5"/>
            </pattern>
            <rect width="440" height="300" fill="url(#grid-why)"/>

            {/* Whiteboard / screen */}
            <rect x="40" y="30" width="260" height="180" rx="2" fill="var(--white)" stroke="var(--paper-line)" strokeWidth="1.5"/>
            <rect x="40" y="30" width="260" height="18" rx="2" fill="var(--ink)" />
            <text x="120" y="43" fill="var(--paper)" fontFamily="monospace" fontSize="8" letterSpacing="2">EMPLOYER EXPECTATIONS 2026</text>

            {/* Bar chart on the board */}
            {[
              { label: 'Portfolio', val: 140, y: 80, color: 'var(--moss)' },
              { label: 'CV', val: 90, y: 110, color: 'var(--amber)' },
              { label: 'Certificates', val: 50, y: 140, color: 'var(--paper-line)' },
              { label: 'Degree', val: 70, y: 170, color: 'var(--paper-line)' },
            ].map((bar) => (
              <g key={bar.label}>
                <text x="48" y={bar.y + 9} fill="var(--ink-muted)" fontFamily="monospace" fontSize="7">{bar.label}</text>
                <rect
                  x="110" y={bar.y - 2}
                  width={inView ? bar.val : 0} height="14"
                  fill={bar.color}
                  style={{ transition: 'width 800ms cubic-bezier(0.2,0.7,0.2,1) 300ms' }}
                />
                <text
                  x={inView ? 114 + bar.val : 114} y={bar.y + 9}
                  fill={bar.color === 'var(--moss)' ? 'var(--white)' : 'var(--ink-muted)'}
                  fontFamily="monospace" fontSize="6"
                  style={{ transition: 'x 800ms cubic-bezier(0.2,0.7,0.2,1) 300ms' }}
                >
                  {bar.val === 140 ? '↑ PRIORITY' : ''}
                </text>
              </g>
            ))}

            {/* Person silhouette — pointing at board */}
            <g transform="translate(310, 60)">
              {/* Head */}
              <circle cx="30" cy="25" r="18" fill="var(--ink)" opacity="0.15"/>
              <circle cx="30" cy="25" r="15" fill="var(--ink)" opacity="0.85"/>
              {/* Body */}
              <path d="M14 60 Q30 50 46 60 L50 120 L10 120 Z" fill="var(--ink)" opacity="0.8"/>
              {/* Arm pointing */}
              <path d="M14 70 L-20 85" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" opacity="0.8"/>
              <circle cx="-22" cy="86" r="4" fill="var(--ink)" opacity="0.8"/>
              {/* Legs */}
              <path d="M20 120 L16 175" stroke="var(--ink)" strokeWidth="7" strokeLinecap="round" opacity="0.8"/>
              <path d="M40 120 L44 175" stroke="var(--ink)" strokeWidth="7" strokeLinecap="round" opacity="0.8"/>
            </g>

            {/* Annotation — "The question employers ask" */}
            <g style={{ opacity: inView ? 1 : 0, transition: 'opacity 600ms ease 800ms' }}>
              <rect x="240" y="220" width="180" height="52" rx="2" fill="var(--amber)" opacity="0.12"/>
              <rect x="240" y="220" width="3" height="52" fill="var(--amber)"/>
              <text x="250" y="236" fill="var(--amber-deep)" fontFamily="monospace" fontSize="7" letterSpacing="1">THE QUESTION EMPLOYERS ASK</text>
              <text x="250" y="252" fill="var(--ink)" fontFamily="Fraunces, serif" fontSize="9" fontStyle="italic">"Show me what you built."</text>
              <text x="250" y="265" fill="var(--ink-muted)" fontFamily="monospace" fontSize="7">Not: "What did you study?"</text>
            </g>
          </svg>

          <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'Geist Mono, monospace', fontSize: '0.5625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber-deep)' }}>
            SAMPLE ILLUSTRATION
          </div>
        </div>
      </div>

      {/* Right — the shift indicators */}
      <div style={fadeUpStyle(inView, 150)}>
        <p className="eyebrow" style={{ marginBottom: 8 }}>Why now</p>
        <h2 className="display-m text-balance" style={{ marginBottom: 28, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
          The market is moving from credentials to capability.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {SHIFTS.map((shift, i) => (
            <div key={i} style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(20px)',
              transition: `opacity 500ms ease ${200 + i * 100}ms, transform 500ms ease ${200 + i * 100}ms`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.6875rem', color: 'var(--ink-muted)', textDecoration: 'line-through', letterSpacing: '0.04em' }}>{shift.old}</span>
                  <span style={{ color: 'var(--amber)', fontSize: '0.75rem' }}>→</span>
                  <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.6875rem', color: 'var(--moss)', letterSpacing: '0.04em', fontWeight: 500 }}>{shift.new}</span>
                </div>
                <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.625rem', color: 'var(--amber-deep)', letterSpacing: '0.08em', flexShrink: 0, marginLeft: 8 }}>{shift.pct}%</span>
              </div>
              <div style={{ height: 3, background: 'var(--paper-line)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: inView ? `${shift.pct}%` : '0%',
                  background: 'linear-gradient(90deg, var(--amber), var(--moss))',
                  borderRadius: 2,
                  transition: `width 900ms cubic-bezier(0.2,0.7,0.2,1) ${300 + i * 120}ms`,
                }} />
              </div>
              <p style={{ fontSize: '0.6875rem', color: 'var(--ink-muted)', marginTop: 4, fontStyle: 'italic' }}>
                % of employers prioritising this in 2024–25 hiring
              </p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 28, fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
          Upthrust has been training digital professionals since 2019. Over the years the same pattern repeated: people complete courses, collect certificates, and still cannot confidently show employers what they can do. The Career Capability Accelerator is the answer.
        </p>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .why-now-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
