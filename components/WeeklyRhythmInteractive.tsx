'use client';

import { useState } from 'react';
import { useInView, useStagger } from '@/lib/animations';

const RHYTHM_STEPS = [
  {
    num: '01',
    title: 'Concept Class',
    duration: '90 min · Live',
    body: 'The weekly idea explained in practical, plain language by Genesis — a practitioner who has done the work himself. No abstract theory. No slides read verbatim. Real product problems, real product thinking.',
    icon: (active: boolean) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 10 h8 M10 14 h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 22 L14 18 L18 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    output: 'Weekly framework understood',
  },
  {
    num: '02',
    title: 'Real-World Case',
    duration: '30 min · Live',
    body: 'A breakdown of a realistic product scenario that puts the concept in context. You watch Genesis diagnose a real product problem — a fintech onboarding failure, a BA requirements gap, a stakeholder conflict. Then you discuss.',
    icon: (active: boolean) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 8 v6 l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="22" cy="6" r="3" fill={active ? 'var(--amber)' : 'currentColor'} style={{ transition: 'fill 200ms' }}/>
      </svg>
    ),
    output: 'Context and pattern recognition',
  },
  {
    num: '03',
    title: 'Practical Lab',
    duration: '60 min · Live',
    body: 'A guided hands-on session where you practise the skill yourself — with a facilitator watching. You write the story. You draw the process map. You frame the stakeholder question. Feedback is immediate.',
    icon: (active: boolean) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 22 L10 14 L14 18 L18 10 L22 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 22 h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="22" cy="14" r="2" fill={active ? 'var(--amber)' : 'currentColor'} style={{ transition: 'fill 200ms' }}/>
      </svg>
    ),
    output: 'Skill practised under supervision',
  },
  {
    num: '04',
    title: 'Weekly Assignment',
    duration: 'Self-paced · 3–4 hrs',
    body: 'A tangible deliverable you produce independently — a PRD, a BRD, a process map, a stakeholder analysis, a metric plan. This is the thing that goes in your portfolio. Not optional. Every week.',
    icon: (active: boolean) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="6" y="4" width="16" height="20" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 9 h8 M10 13 h8 M10 17 h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 19 l2 2 l4 -4" stroke={active ? 'var(--moss)' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 200ms' }}/>
      </svg>
    ),
    output: 'Real portfolio artefact produced',
  },
  {
    num: '05',
    title: 'Structured Feedback',
    duration: 'Within 48 hrs',
    body: 'Human and AI-assisted feedback that names what you did well and what needs revision — specifically, not generically. "Your acceptance criteria are testable but your edge cases are not" beats "good job."',
    icon: (active: boolean) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 8 Q4 4 8 4 h12 Q24 4 24 8 v8 Q24 20 20 20 h-8 l-6 4 v-4 H8 Q4 20 4 16 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 11 h10 M9 15 h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    output: 'Specific, actionable revision notes',
  },
  {
    num: '06',
    title: 'Reflection',
    duration: '15 min · Async',
    body: 'A short written note — in Notion — on how you would explain this week\'s work in an interview or to a stakeholder. "What did I produce? What decision does it inform? What would I do differently?" This becomes your interview story bank.',
    icon: (active: boolean) => (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4 C8 4 4 8 4 14 s4 10 10 10 10-4 10-10 S20 4 14 4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 12 v6 M14 10 v1" stroke={active ? 'var(--amber)' : 'currentColor'} strokeWidth="2" strokeLinecap="round" style={{ transition: 'stroke 200ms' }}/>
      </svg>
    ),
    output: 'Interview story added to your bank',
  },
];

export default function WeeklyRhythmInteractive() {
  const [active, setActive] = useState<number | null>(null);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const visible = useStagger(RHYTHM_STEPS.length, 80, inView);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {/* Circular rhythm diagram */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="rhythm-grid">
        {RHYTHM_STEPS.map((step, i) => {
          const isActive = active === i;
          return (
            <button
              key={step.num}
              onClick={() => setActive(isActive ? null : i)}
              style={{
                background: isActive ? 'var(--ink)' : 'var(--white)',
                border: `1.5px solid ${isActive ? 'var(--ink)' : 'var(--paper-line)'}`,
                borderTop: `3px solid ${isActive ? 'var(--amber)' : 'var(--paper-line)'}`,
                padding: '24px 20px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 400ms ease ${i * 80}ms, transform 400ms ease ${i * 80}ms, background 200ms, border-color 200ms`,
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: isActive ? 'rgba(250,247,241,0.12)' : 'var(--paper-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: isActive ? 'var(--paper)' : 'var(--ink)',
                transition: 'all 200ms',
              }}>
                {step.icon(isActive)}
              </div>
              <div>
                <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: isActive ? 'var(--amber-soft)' : 'var(--amber-deep)', marginBottom: 6 }}>
                  {step.num}
                </p>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.018em', color: isActive ? 'var(--paper)' : 'var(--ink)', lineHeight: 1.2 }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.625rem', color: isActive ? 'rgba(250,247,241,0.5)' : 'var(--ink-muted)', marginTop: 4, letterSpacing: '0.06em' }}>
                  {step.duration}
                </p>
              </div>
              <div style={{
                padding: '6px 10px',
                background: isActive ? 'rgba(197,116,58,0.2)' : 'var(--paper-soft)',
                borderLeft: `2px solid ${isActive ? 'var(--amber)' : 'var(--paper-line)'}`,
              }}>
                <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.5625rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: isActive ? 'var(--amber-soft)' : 'var(--ink-muted)' }}>
                  → {step.output}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      {active !== null && (
        <div style={{
          marginTop: 20,
          padding: '28px 32px',
          background: 'var(--paper-soft)',
          border: '1px solid var(--paper-line)',
          borderLeft: '4px solid var(--amber)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24,
          animation: 'slideDown 250ms cubic-bezier(0.2,0.7,0.2,1)',
        }}>
          <div>
            <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber-deep)', marginBottom: 8 }}>
              {RHYTHM_STEPS[active].num} · {RHYTHM_STEPS[active].duration}
            </p>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.375rem', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 12 }}>
              {RHYTHM_STEPS[active].title}
            </h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 640 }}>
              {RHYTHM_STEPS[active].body}
            </p>
          </div>
          <button onClick={() => setActive(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', fontSize: '1.25rem', flexShrink: 0, padding: 4 }}>
            ✕
          </button>
        </div>
      )}

      <p style={{ marginTop: 16, fontSize: '0.875rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
        Click any step to see what it involves.
      </p>

      <style>{`
        @media (max-width: 760px) { .rhythm-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .rhythm-grid { grid-template-columns: 1fr !important; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
