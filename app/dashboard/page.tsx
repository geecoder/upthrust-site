'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LEARNER, CAPABILITY_READINESS, ARTEFACTS, LATEST_FEEDBACK, THIS_WEEK,
  COHORT_METRICS, ROSTER, REVIEW_QUEUE, type RiskStatus,
} from '@/lib/dashboard-data';

type View = 'learner' | 'facilitator';

const PHASE_BOUNDARIES = [3, 7, 11]; // after week 3, 7, 11 — matches the 3/4/4/1 phase split

function riskColor(risk: RiskStatus) {
  if (risk === 'on-track') return { fg: 'var(--verdict-allow-fg)', bg: 'var(--verdict-allow-bg)', bd: 'var(--verdict-allow-bd)' };
  if (risk === 'at-risk') return { fg: 'var(--verdict-review-fg)', bg: 'var(--verdict-review-bg)', bd: 'var(--verdict-review-bd)' };
  return { fg: 'var(--verdict-block-fg)', bg: 'var(--verdict-block-bg)', bd: 'var(--verdict-block-bd)' };
}

function WeekRail({ currentWeek }: { currentWeek: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8, overflowX: 'auto', paddingBottom: 2 }}>
      {Array.from({ length: 12 }, (_, i) => i + 1).map((week) => {
        const state = week < currentWeek ? 'done' : week === currentWeek ? 'current' : 'upcoming';
        return (
          <div key={week} style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 4 }}>
            <div
              title={`Week ${week}`}
              style={{
                width: state === 'current' ? 30 : 24,
                height: state === 'current' ? 30 : 24,
                borderRadius: '50%',
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                fontWeight: 700,
                background: state === 'current' ? 'var(--seal-500)' : state === 'done' ? 'var(--ink)' : 'transparent',
                border: state === 'upcoming' ? '1.5px solid var(--border-strong)' : 'none',
                color: state === 'upcoming' ? 'var(--ink-muted)' : 'var(--paper)',
              }}
            >
              {week}
            </div>
            {PHASE_BOUNDARIES.includes(week) ? (
              <span style={{ width: 1, height: 20, background: 'var(--paper-line)', flexShrink: 0 }} />
            ) : (
              <span style={{ flex: 1, height: 1, background: 'var(--paper-line)' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function DashboardPage() {
  const [view, setView] = useState<View>('learner');

  return (
    <>
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(48px, 6vw, 72px) 0 clamp(32px, 4vw, 48px)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Dashboard · demo preview</p>
            <h1 className="display-m" style={{ color: 'var(--paper)' }}>
              {view === 'learner' ? `Welcome back, ${LEARNER.name.split(' ')[0]}.` : 'Cohort overview.'}
            </h1>
          </div>
          <div style={{ display: 'inline-flex', border: '1px solid var(--border-on-ink)', borderRadius: 'var(--radius-1)', overflow: 'hidden' }}>
            {(['learner', 'facilitator'] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: '10px 20px', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'capitalize',
                  background: view === v ? 'var(--seal-500)' : 'transparent',
                  color: view === v ? 'var(--paper)' : 'rgba(250,247,241,0.6)',
                  border: 'none', cursor: 'pointer',
                }}
              >
                {v} view
              </button>
            ))}
          </div>
        </div>
        <p style={{ maxWidth: 720, marginTop: 20, fontSize: '0.8125rem', color: 'rgba(250,247,241,0.45)' }}>
          This is a preview built on representative data — real sign-in and per-learner state are not wired up yet.
        </p>
      </section>

      {view === 'learner' && (
        <>
          <section style={{ padding: 'clamp(40px, 5vw, 64px) 0', borderBottom: '1px solid var(--paper-line)' }}>
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
                <p style={{ fontSize: '0.9375rem', color: 'var(--ink-soft)' }}>
                  {LEARNER.pathwayLabel} pathway · {LEARNER.cohortLine}
                </p>
                <p className="eyebrow">Week {LEARNER.currentWeek} of 12</p>
              </div>
              <WeekRail currentWeek={LEARNER.currentWeek} />
            </div>
          </section>

          <section style={{ padding: 'clamp(40px, 5vw, 64px) 0', borderBottom: '1px solid var(--paper-line)' }}>
            <div className="container stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 32 }}>
              <div className="card">
                <p className="eyebrow" style={{ marginBottom: 18 }}>This week</p>
                {THIS_WEEK.sessions.map((s) => (
                  <div key={s.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--paper-line)', fontSize: '0.9375rem' }}>
                    <span>{s.title}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>{s.day} · {s.time}</span>
                  </div>
                ))}
                <p style={{ marginTop: 16, fontSize: '0.875rem', color: 'var(--seal-600)', fontWeight: 600 }}>{THIS_WEEK.deadline}</p>
              </div>
              <div className="card">
                <p className="eyebrow" style={{ marginBottom: 18 }}>Latest feedback · Week {LATEST_FEEDBACK.week}</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 10 }}>{LATEST_FEEDBACK.artefact}</p>
                <p style={{ fontSize: '0.9375rem', color: 'var(--ink-soft)', fontStyle: 'italic', lineHeight: 1.6 }}>{LATEST_FEEDBACK.note}</p>
              </div>
            </div>
          </section>

          <section style={{ padding: 'clamp(40px, 5vw, 64px) 0', borderBottom: '1px solid var(--paper-line)' }}>
            <div className="container">
              <p className="eyebrow" style={{ marginBottom: 20 }}>Passport readiness by capability area</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {CAPABILITY_READINESS.map((c) => (
                  <div key={c.area}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.875rem' }}>
                      <span>{c.area}</span>
                      <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>{c.readiness}%</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--paper-line)', borderRadius: 'var(--radius-1)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${c.readiness}%`, background: c.readiness >= 60 ? 'var(--moss-500)' : 'var(--ochre-500)', transition: 'width 700ms var(--ease-quint-out)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ padding: 'clamp(40px, 5vw, 64px) 0' }}>
            <div className="container">
              <p className="eyebrow" style={{ marginBottom: 20 }}>Artefacts</p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--ink)' }}>
                      <th style={{ textAlign: 'left', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>Week</th>
                      <th style={{ textAlign: 'left', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>Artefact</th>
                      <th style={{ textAlign: 'left', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>Status</th>
                      <th style={{ textAlign: 'right', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ARTEFACTS.map((a) => (
                      <tr key={a.week} style={{ borderBottom: '1px solid var(--paper-line)' }}>
                        <td style={{ padding: '12px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink-muted)' }}>{String(a.week).padStart(2, '0')}</td>
                        <td style={{ padding: '12px' }}>{a.title}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase',
                            padding: '3px 10px', borderRadius: 'var(--radius-pill)',
                            color: a.status === 'reviewed' ? 'var(--verdict-allow-fg)' : a.status === 'submitted' ? 'var(--verdict-review-fg)' : 'var(--ink-muted)',
                            background: a.status === 'reviewed' ? 'var(--verdict-allow-bg)' : a.status === 'submitted' ? 'var(--verdict-review-bg)' : 'transparent',
                            border: `1px solid ${a.status === 'reviewed' ? 'var(--verdict-allow-bd)' : a.status === 'submitted' ? 'var(--verdict-review-bd)' : 'var(--paper-line)'}`,
                          }}>
                            {a.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>{a.score != null ? `${a.score}/100` : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      )}

      {view === 'facilitator' && (
        <>
          <section style={{ padding: 'clamp(40px, 5vw, 64px) 0', borderBottom: '1px solid var(--paper-line)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {COHORT_METRICS.map((m) => (
                <div key={m.label} className="card">
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)', marginBottom: 10 }}>{m.label}</p>
                  <p className="display-s" style={{ fontVariantNumeric: 'tabular-nums', marginBottom: 4 }}>{m.value}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{m.sub}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ padding: 'clamp(40px, 5vw, 64px) 0', borderBottom: '1px solid var(--paper-line)' }}>
            <div className="container">
              <p className="eyebrow" style={{ marginBottom: 20 }}>Roster</p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--ink)' }}>
                      {['Learner', 'Pathway', 'Week', 'Risk', 'Next action'].map((h) => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROSTER.map((r) => {
                      const c = riskColor(r.risk);
                      return (
                        <tr key={r.name} style={{ borderBottom: '1px solid var(--paper-line)' }}>
                          <td style={{ padding: '12px', fontWeight: 600 }}>{r.name}</td>
                          <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>{r.pathway}</td>
                          <td style={{ padding: '12px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink-muted)' }}>{r.week}/12</td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', padding: '3px 10px', borderRadius: 'var(--radius-pill)', color: c.fg, background: c.bg, border: `1px solid ${c.bd}` }}>
                              {r.risk.replace('-', ' ')}
                            </span>
                          </td>
                          <td style={{ padding: '12px', color: 'var(--ink-soft)' }}>{r.nextAction}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section style={{ padding: 'clamp(40px, 5vw, 64px) 0', borderBottom: '1px solid var(--paper-line)' }}>
            <div className="container">
              <p className="eyebrow" style={{ marginBottom: 20 }}>Review queue · 48-hour SLA</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {REVIEW_QUEUE.map((q) => {
                  const overdue = q.submittedHoursAgo > q.slaHours;
                  const remaining = q.slaHours - q.submittedHoursAgo;
                  return (
                    <div key={q.learner + q.artefact} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid var(--paper-line)', flexWrap: 'wrap', gap: 8 }}>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{q.learner}</p>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>{q.artefact}</p>
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700,
                        color: overdue ? 'var(--crimson-500)' : 'var(--ink-soft)',
                      }}>
                        {overdue ? `${Math.abs(remaining)}h over SLA` : `${remaining}h remaining`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section style={{ padding: 'clamp(40px, 5vw, 64px) 0' }}>
            <div className="container">
              <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Capstone panel</p>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--ink-soft)' }}>Review capstone briefs and Week 12 defence scheduling.</p>
                </div>
                <Link href="/accelerator" className="btn btn-secondary">Open capstone briefs</Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
