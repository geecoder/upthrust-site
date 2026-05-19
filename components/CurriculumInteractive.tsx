'use client';

import { useState } from 'react';
import { useInView, useStagger } from '@/lib/animations';

const PHASES = [
  {
    id: 'foundation',
    label: 'Foundation',
    range: 'Weeks 0–3',
    color: 'var(--ink)',
    weeks: [
      { wk: 'Week 0', title: 'Onboarding & Diagnostic', body: 'Baseline assessment, tool setup, pathway confirmation, community induction. You know exactly what you are building toward before Week 1.' },
      { wk: 'Week 1', title: 'Digital Product Foundations', body: 'How real product teams work. The roles of PM, BA, Design, Engineering, QA, Marketing, Ops — and how they hand work to each other.' },
      { wk: 'Week 2', title: 'Problem Discovery', body: 'How to define user and business problems clearly before jumping to solutions. What a well-framed problem brief looks like.' },
      { wk: 'Week 3', title: 'Product Strategy & Business Context', body: 'Connecting problems to business goals, MVP scope, success measures, and why we are solving this now and not something else.' },
    ],
  },
  {
    id: 'core',
    label: 'Core Skills',
    range: 'Weeks 4–7',
    color: 'var(--amber-deep)',
    weeks: [
      { wk: 'Week 4', title: 'Requirements & Scope', body: 'Turning ideas into clear requirements, user stories, acceptance criteria, and scope boundaries. Writing documents a team can actually act on.' },
      { wk: 'Week 5', title: 'Journey, Workflow & Process Design', body: 'Mapping user journeys, business processes, operational workflows, and edge cases. The gap between what the system does and what the user experiences.' },
      { wk: 'Week 6', title: 'UX & Product Design Foundations', body: 'Understanding users, personas, journey maps, information architecture. What a BA or PM needs to know about design — not how to design.' },
      { wk: 'Week 7', title: 'Prototyping & Design Systems', body: 'How prototypes are built and reviewed. Figma workflows, handoff norms, design system thinking from a non-designer seat.' },
    ],
  },
  {
    id: 'delivery',
    label: 'Delivery',
    range: 'Weeks 8–11',
    color: 'var(--moss)',
    weeks: [
      { wk: 'Week 8', title: 'Agile Delivery & Backlog', body: 'Epics, stories, tasks, Definition of Ready, Definition of Done, sprint flow. What good looks like from a PM or BA seat in an agile team.' },
      { wk: 'Week 9', title: 'Stakeholder Management', body: 'Vague requests, conflicting priorities, scope pressure, trade-off conversations. Practical techniques and live simulations.' },
      { wk: 'Week 10', title: 'Testing, UAT & Launch Readiness', body: 'UAT scenarios, release checklists, support readiness, launch controls. The work that happens before Go Live that most courses skip.' },
      { wk: 'Week 11', title: 'Metrics & Continuous Improvement', body: 'Defining product success, funnels, activation, retention, feedback loops. How to know whether what you shipped is working.' },
    ],
  },
  {
    id: 'capstone',
    label: 'Capstone',
    range: 'Week 12',
    color: 'var(--amber)',
    weeks: [
      { wk: 'Week 12', title: 'Capstone Defence & Portfolio Review', body: 'Present your full capstone project. Defend every decision. Receive live facilitator feedback. Capability Passport assessment. Demo Day preparation. This is the week everything you built is tested under pressure.' },
    ],
  },
];

export default function CurriculumInteractive() {
  const [activePhase, setActivePhase] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const weekVisible = useStagger(
    PHASES[activePhase].weeks.length,
    100,
    true // always trigger — tab switch resets naturally
  );

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {/* Phase tabs */}
      <div style={{
        display: 'flex', gap: 0,
        borderBottom: '2px solid var(--paper-line)',
        marginBottom: 0, overflowX: 'auto',
      }}>
        {PHASES.map((phase, i) => {
          const isActive = i === activePhase;
          return (
            <button
              key={phase.id}
              onClick={() => setActivePhase(i)}
              style={{
                padding: '16px 28px',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: `3px solid ${isActive ? phase.color : 'transparent'}`,
                marginBottom: -2,
                transition: 'border-color 200ms',
                flexShrink: 0,
              }}
            >
              <p style={{
                fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: isActive ? phase.color : 'var(--ink-muted)',
                transition: 'color 200ms',
              }}>{phase.range}</p>
              <p style={{
                fontFamily: 'Fraunces, serif', fontSize: '1.125rem',
                fontWeight: 500, letterSpacing: '-0.02em', marginTop: 4,
                color: isActive ? 'var(--ink)' : 'var(--ink-muted)',
                transition: 'color 200ms',
              }}>{phase.label}</p>
            </button>
          );
        })}
      </div>

      {/* Week cards for active phase */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: PHASES[activePhase].weeks.length === 1 ? '1fr' : 'repeat(2, 1fr)',
        gap: 20,
        padding: '32px 0',
      }} className="curriculum-week-grid">
        {PHASES[activePhase].weeks.map((week, i) => (
          <div
            key={`${activePhase}-${i}`}
            style={{
              padding: '24px 28px',
              background: 'var(--white)',
              border: '1px solid var(--paper-line)',
              borderLeft: `3px solid ${PHASES[activePhase].color}`,
              opacity: weekVisible[i] ? 1 : 0,
              transform: weekVisible[i] ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 400ms cubic-bezier(0.2, 0.7, 0.2, 1) ${i * 80}ms, transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1) ${i * 80}ms`,
            }}
          >
            <p style={{
              fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: PHASES[activePhase].color, marginBottom: 10,
            }}>{week.wk}</p>
            <h4 style={{
              fontFamily: 'Fraunces, serif', fontSize: '1.25rem',
              fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 12,
            }}>{week.title}</h4>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--ink-soft)' }}>
              {week.body}
            </p>
          </div>
        ))}
      </div>

      {/* Phase progress indicator */}
      <div style={{
        display: 'flex', gap: 8, alignItems: 'center',
        paddingTop: 24, borderTop: '1px solid var(--paper-line)',
      }}>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.625rem', color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: 8 }}>
          Program progress
        </p>
        {PHASES.map((phase, i) => (
          <div key={phase.id} style={{
            height: 4, flex: i === 3 ? 0.5 : 1, borderRadius: 2,
            background: i <= activePhase ? phase.color : 'var(--paper-line)',
            transition: 'background 300ms',
            cursor: 'pointer',
          }} onClick={() => setActivePhase(i)} />
        ))}
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.625rem', color: 'var(--ink-muted)', letterSpacing: '0.1em', marginLeft: 8 }}>
          12 weeks
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .curriculum-week-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
