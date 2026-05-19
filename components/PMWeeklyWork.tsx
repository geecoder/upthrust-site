'use client';

import { useState } from 'react';
import { useInView, useStagger } from '@/lib/animations';

const PM_WEEKS = [
  { wk: 'Week 1', title: 'Product Teardown', artefact: 'Teardown Report', body: 'Analyse a real product you use — the strategy you can infer, the decisions you can read from the features, the business model underneath.' },
  { wk: 'Week 2', title: 'Problem Brief', artefact: 'Problem Brief', body: 'Write a structured problem brief for a real user problem. Define the user, the moment of pain, the current alternative, and why it matters now.' },
  { wk: 'Week 3', title: 'Product Strategy Canvas', artefact: 'Strategy Canvas', body: 'Build a one-page product strategy canvas. North star metric, success measures, MVP scope, and what you will not build.' },
  { wk: 'Week 4', title: 'Full PRD', artefact: 'PRD Document', body: 'Write a full Product Requirements Document for a real feature. Define done. Anticipate edge cases. Make engineering and design able to start from it.' },
  { wk: 'Week 5', title: 'User Journey Mapping', artefact: 'Journey Map', body: 'Map the end-to-end user journey for your PRD feature. Identify the riskiest moments. Find where the product will lose the user.' },
  { wk: 'Week 6', title: 'Design Review (PM lens)', artefact: 'Design Critique', body: 'Review your feature with a design lens. Where does the experience fail? What does the PM need to flag back to design before build starts?' },
  { wk: 'Week 7', title: 'Figma Prototype Walkthrough', artefact: 'Review Notes', body: 'Walk through a real Figma prototype. Practise reviewing design as a PM — what feedback adds value, what creates noise, what to push back on.' },
  { wk: 'Week 8', title: 'Sprint Backlog', artefact: 'Sprint Backlog', body: 'Build a sprint backlog from your PRD. Write user stories. Define ready and done. Run a mock sprint planning against your own requirements.' },
  { wk: 'Week 9', title: 'Stakeholder Simulation', artefact: 'Simulation Notes', body: 'Practise stakeholder conversations live — vague exec request, conflicting priorities, scope pressure, trade-off escalation. Then debrief.' },
  { wk: 'Week 10', title: 'Launch Plan', artefact: 'Launch Brief', body: 'Build a launch plan. UAT scope, support readiness, rollout strategy, kill criteria. The work most courses treat as optional.' },
  { wk: 'Week 11', title: 'Metrics Plan', artefact: 'Metrics Framework', body: 'Define your metrics plan. Week 1, Week 4, Week 12 measures. What would tell you the feature is working. What would tell you to kill it.' },
  { wk: 'Week 12', title: 'Capstone Defence', artefact: 'Capability Passport', body: 'Present your full capstone. Defend every decision. Receive facilitator feedback. Capability Passport assessment. Demo Day preparation.' },
];

const PHASES = [
  { label: 'Foundation', weeks: [0, 1, 2, 3], color: 'var(--ink)' },
  { label: 'Core Skills', weeks: [4, 5, 6, 7], color: 'var(--amber-deep)' },
  { label: 'Delivery', weeks: [8, 9, 10, 11], color: 'var(--moss)' },
];

export default function PMWeeklyWork() {
  const [selected, setSelected] = useState<number | null>(null);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const visible = useStagger(PM_WEEKS.length, 60, inView);

  const getPhaseColor = (weekIndex: number) => {
    for (const phase of PHASES) {
      if (phase.weeks.includes(weekIndex)) return phase.color;
    }
    return 'var(--amber)'; // Week 12
  };

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {/* Phase legend */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
        {PHASES.map((phase) => (
          <div key={phase.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, background: phase.color, borderRadius: 1 }} />
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
              {phase.label}
            </span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, background: 'var(--amber)', borderRadius: 1 }} />
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
            Capstone
          </span>
        </div>
      </div>

      {/* Week grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
      }} className="pm-week-grid">
        {PM_WEEKS.map((week, i) => {
          const phaseColor = getPhaseColor(i);
          const isSelected = selected === i;
          return (
            <button
              key={week.wk}
              onClick={() => setSelected(isSelected ? null : i)}
              style={{
                background: isSelected ? 'var(--ink)' : 'var(--white)',
                border: `1px solid ${isSelected ? 'var(--ink)' : 'var(--paper-line)'}`,
                borderTop: `3px solid ${phaseColor}`,
                padding: '16px 18px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 220ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <p style={{
                fontFamily: 'Geist Mono, monospace', fontSize: '0.625rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: isSelected ? 'rgba(250,247,241,0.6)' : 'var(--ink-muted)',
                marginBottom: 6,
              }}>{week.wk}</p>
              <p style={{
                fontFamily: 'Fraunces, serif', fontSize: '1rem',
                fontWeight: 500, letterSpacing: '-0.015em',
                color: isSelected ? 'var(--paper)' : 'var(--ink)',
                lineHeight: 1.3,
              }}>{week.title}</p>
              <div style={{
                marginTop: 10, padding: '4px 8px',
                background: isSelected ? 'rgba(250,247,241,0.12)' : 'var(--paper-soft)',
                display: 'inline-block',
              }}>
                <p style={{
                  fontFamily: 'Geist Mono, monospace', fontSize: '0.5625rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: isSelected ? 'var(--amber-soft)' : phaseColor,
                }}>{week.artefact}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected week detail */}
      {selected !== null && (
        <div style={{
          marginTop: 20,
          padding: '24px 28px',
          background: 'var(--paper-soft)',
          border: '1px solid var(--paper-line)',
          borderLeft: `4px solid ${getPhaseColor(selected)}`,
          animation: 'slideDown 250ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div>
              <p style={{
                fontFamily: 'Geist Mono, monospace', fontSize: '0.6875rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: getPhaseColor(selected), marginBottom: 8,
              }}>{PM_WEEKS[selected].wk} · {PM_WEEKS[selected].artefact}</p>
              <h4 style={{
                fontFamily: 'Fraunces, serif', fontSize: '1.375rem',
                fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 12,
              }}>{PM_WEEKS[selected].title}</h4>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--ink-soft)', maxWidth: 640 }}>
                {PM_WEEKS[selected].body}
              </p>
            </div>
            <button onClick={() => setSelected(null)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--ink-muted)', fontSize: '1.25rem', flexShrink: 0,
              padding: 4,
            }}>✕</button>
          </div>
        </div>
      )}

      <p style={{ marginTop: 20, fontSize: '0.875rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
        Click any week to see what you'll produce.
      </p>

      <style>{`
        @media (max-width: 860px) { .pm-week-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 560px) { .pm-week-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
