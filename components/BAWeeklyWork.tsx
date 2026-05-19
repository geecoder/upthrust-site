'use client';

import { useState } from 'react';
import { useInView, useStagger } from '@/lib/animations';

const BA_WEEKS = [
  { wk: 'Week 1', title: 'Stakeholder Mapping', artefact: 'Stakeholder Map', body: 'Map the stakeholders of a real product. Who decides, who is affected, who blocks, and who advocates. RACI matrix included.' },
  { wk: 'Week 2', title: 'Elicitation Interview', artefact: 'Interview Notes', body: 'Run a structured elicitation interview with a real or simulated stakeholder. Capture the underlying problem, not the stated request.' },
  { wk: 'Week 3', title: 'Business Case', artefact: 'Business Case', body: 'Build the business case for a real feature. Connect it to revenue, cost reduction, risk mitigation, or strategic positioning.' },
  { wk: 'Week 4', title: 'Full BRD', artefact: 'BRD Document', body: 'Write a full Business Requirements Document. Functional and non-functional requirements. Assumptions, constraints, out-of-scope items.' },
  { wk: 'Week 5', title: 'Process Mapping (As-Is / To-Be)', artefact: 'Process Maps', body: 'Map the current-state process for a real workflow. Map the future-state. Identify the gap, the risks, and what needs to change.' },
  { wk: 'Week 6', title: 'User Journey vs Process Gap', artefact: 'Gap Analysis', body: 'Layer user journey analysis onto your process map. Where do users get stuck where the system does not see it? Where do they drop?' },
  { wk: 'Week 7', title: 'BA Review of Figma Prototype', artefact: 'BA Design Notes', body: 'Review a Figma prototype as a BA. Spot the requirements the design assumes but does not document. Flag what is missing.' },
  { wk: 'Week 8', title: 'User Stories + Acceptance Criteria', artefact: 'Story Library', body: 'Write user stories with acceptance criteria. Practise INVEST. Get the Definition of Ready right. Write from a team\'s perspective, not a user\'s alone.' },
  { wk: 'Week 9', title: 'Stakeholder Workshop', artefact: 'Workshop Pack', body: 'Practise facilitating stakeholder workshops — conflicting priorities, missing approvers, scope creep mid-build. Handle them on paper first.' },
  { wk: 'Week 10', title: 'UAT Pack', artefact: 'UAT Pack', body: 'Build a complete UAT pack. Test scenarios, expected results, edge cases, regression considerations. This is the BA\'s most important pre-launch artefact.' },
  { wk: 'Week 11', title: 'Post-Launch Reporting', artefact: 'Reporting Framework', body: 'Define the reporting and feedback structure for the feature post-launch. What signals will tell us it worked. What signals trigger a rethink.' },
  { wk: 'Week 12', title: 'Capstone Defence', artefact: 'Capability Passport', body: 'Present your full capstone artefacts. Walk through your BA documentation under scrutiny. Receive Capability Passport assessment.' },
];

const PHASES = [
  { label: 'Foundation', weeks: [0, 1, 2, 3], color: 'var(--ink)' },
  { label: 'Core Skills', weeks: [4, 5, 6, 7], color: 'var(--amber-deep)' },
  { label: 'Delivery', weeks: [8, 9, 10, 11], color: 'var(--moss)' },
];

export default function BAWeeklyWork() {
  const [selected, setSelected] = useState<number | null>(null);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const visible = useStagger(BA_WEEKS.length, 60, inView);

  const getPhaseColor = (weekIndex: number) => {
    for (const phase of PHASES) {
      if (phase.weeks.includes(weekIndex)) return phase.color;
    }
    return 'var(--amber)';
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }} className="ba-week-grid">
        {BA_WEEKS.map((week, i) => {
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
                padding: '16px 18px', textAlign: 'left', cursor: 'pointer',
                transition: 'all 220ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: isSelected ? 'rgba(250,247,241,0.6)' : 'var(--ink-muted)', marginBottom: 6 }}>{week.wk}</p>
              <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.015em', color: isSelected ? 'var(--paper)' : 'var(--ink)', lineHeight: 1.3 }}>{week.title}</p>
              <div style={{ marginTop: 10, padding: '4px 8px', background: isSelected ? 'rgba(250,247,241,0.12)' : 'var(--paper-soft)', display: 'inline-block' }}>
                <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: isSelected ? 'var(--amber-soft)' : phaseColor }}>{week.artefact}</p>
              </div>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div style={{ marginTop: 20, padding: '24px 28px', background: 'var(--paper-soft)', border: '1px solid var(--paper-line)', borderLeft: `4px solid ${getPhaseColor(selected)}`, animation: 'slideDown 250ms cubic-bezier(0.2, 0.7, 0.2, 1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div>
              <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: getPhaseColor(selected), marginBottom: 8 }}>{BA_WEEKS[selected].wk} · {BA_WEEKS[selected].artefact}</p>
              <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.375rem', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 12 }}>{BA_WEEKS[selected].title}</h4>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--ink-soft)', maxWidth: 640 }}>{BA_WEEKS[selected].body}</p>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', fontSize: '1.25rem', flexShrink: 0, padding: 4 }}>✕</button>
          </div>
        </div>
      )}

      <p style={{ marginTop: 20, fontSize: '0.875rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
        Click any week to see what you'll produce.
      </p>

      <style>{`
        @media (max-width: 860px) { .ba-week-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 560px) { .ba-week-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
