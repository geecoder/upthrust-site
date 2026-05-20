'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { scenarios } from '@/lib/scenarios';
import { calculateResult, getResultMeta, type Answer } from '@/lib/scoring';
import { TALLY_FORMS, tallyDirectUrl } from '@/lib/config';

type Stage = 'intro' | 'lead' | 'scenario' | 'result';

// Silent Tally submission
function submitToTally(data: Record<string, string>) {
  fetch(tallyDirectUrl(TALLY_FORMS.assessment), {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString(),
  }).catch(() => {});
}

// Animated progress bar
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--paper)', borderBottom: '1px solid var(--paper-line)', padding: '14px 0' }}>
      <div className="container-narrow" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--paper-line)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--ink)', transition: 'width 500ms cubic-bezier(0.2,0.7,0.2,1)', borderRadius: 2 }} />
        </div>
        <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', flexShrink: 0 }}>
          {current} / {total}
        </span>
      </div>
    </div>
  );
}

// Score bar component for result page
function ScoreBar({ label, pct, isPrimary, color }: { label: string; pct: number; isPrimary: boolean; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(pct), 100);
    return () => clearTimeout(timer);
  }, [pct]);

  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontWeight: isPrimary ? 700 : 500, fontSize: '0.9375rem', color: isPrimary ? 'var(--ink)' : 'var(--ink-soft)' }}>{label}</span>
          {isPrimary && (
            <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'var(--amber)', color: 'var(--paper)', padding: '3px 8px' }}>
              PRIMARY
            </span>
          )}
        </div>
        <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.875rem', color: isPrimary ? 'var(--ink)' : 'var(--ink-muted)', letterSpacing: '0.04em' }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: 'var(--paper-line)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${width}%`,
          background: isPrimary ? `linear-gradient(90deg, ${color}, var(--amber))` : 'var(--paper-line)',
          borderRadius: 3,
          transition: 'width 900ms cubic-bezier(0.2,0.7,0.2,1)',
          filter: isPrimary ? 'brightness(1.1)' : 'none',
        }} />
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  const [stage, setStage] = useState<Stage>('intro');
  const [lead, setLead] = useState({ firstName: '', email: '', country: '', selfReported: '' });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<'A' | 'B' | 'C' | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const total = scenarios.length;

  const result = useMemo(() => {
    if (stage !== 'result') return null;
    return calculateResult(answers);
  }, [stage, answers]);

  const meta = result ? getResultMeta(result.resultType) : null;

  // Handle answer with animation
  function handleAnswer(optionId: 'A' | 'B' | 'C') {
    if (transitioning || selected) return;
    setSelected(optionId);
    setTransitioning(true);

    setTimeout(() => {
      const scenario = scenarios[currentIdx];
      const newAnswers = [...answers, { scenarioId: scenario.id, optionId }];
      setAnswers(newAnswers);

      if (currentIdx + 1 >= total) {
        const finalResult = calculateResult(newAnswers);
        submitToTally({
          'First Name': lead.firstName,
          'Email': lead.email,
          'Country': lead.country,
          'Self-Reported Pathway': lead.selfReported || 'Not specified',
          'Assessment Result Type': finalResult.resultType,
          'PM Score': String(finalResult.scores.PM),
          'BA Score': String(finalResult.scores.BA),
          'Design Score': String(finalResult.scores.Design),
          'Primary Pathway': finalResult.primary,
          'All Answers': JSON.stringify(newAnswers),
        });
        setStage('result');
      } else {
        setSelected(null);
        setCurrentIdx(i => i + 1);
        setTransitioning(false);
      }
    }, 400);
  }

  function goBack() {
    if (currentIdx === 0) return;
    setAnswers(answers.slice(0, -1));
    setCurrentIdx(i => i - 1);
    setSelected(null);
    setTransitioning(false);
  }

  // ── INTRO ────────────────────────────────────────────────────
  if (stage === 'intro') {
    return (
      <>
        {/* Hero */}
        <section style={{ paddingTop: 'clamp(80px, 12vw, 140px)', paddingBottom: 'clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, var(--paper-line) 1px, transparent 1px)', backgroundSize: '120px 100%', opacity: 0.4 }} />
          <div className="container" style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="assessment-hero-grid">
              {/* Left: copy */}
              <div>
                <p className="eyebrow">The Upthrust Career Assessment</p>
                <h1 className="display-l text-balance" style={{ marginTop: 16 }}>
                  Discover how you actually
                  <span style={{ fontStyle: 'italic', color: 'var(--amber-deep)' }}> think about product work.</span>
                </h1>
                <p className="lede" style={{ marginTop: 24 }}>
                  Twelve scenarios. Real product situations — vague stakeholders, conflicting priorities, launches that didn't land. Each one reveals something about how you reason under pressure.
                </p>
                <p style={{ marginTop: 16, fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                  At the end you'll get a result that quotes your own answers back — not a generic type. Whether your reflexes point to PM, BA, or Design, you'll know exactly why.
                </p>

                <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '20px', background: 'var(--paper-soft)', border: '1px solid var(--paper-line)' }}>
                  {[{ value: '12', label: 'Scenarios' }, { value: '~8', label: 'Minutes' }, { value: '7', label: 'Result types' }].map(stat => (
                    <div key={stat.label} style={{ textAlign: 'center' }}>
                      <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1.875rem', fontWeight: 500, letterSpacing: '-0.03em' }}>{stat.value}</p>
                      <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.5625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: 4 }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                <button onClick={() => setStage('lead')} className="btn btn-primary btn-arrow" style={{ marginTop: 32, fontSize: '1rem', padding: '16px 28px' }}>
                  Begin the Assessment
                </button>
              </div>

              {/* Right: human image — person thinking/reflecting on career */}
              <div className="assessment-3d" style={{ position: 'relative', height: 440, overflow: 'hidden', borderRadius: 4 }}>
                <div className="hero-img-wrap" style={{ position: 'absolute', inset: 0 }}>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80&auto=format&fit=crop&crop=top"
                    alt="Professional reflecting on their product career direction"
                    className="hero-img"
                    style={{ height: '100%' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,26,46,0.7) 0%, transparent 60%)' }} />
                  {/* PM / BA / Design label cards */}
                  <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, display: 'flex', gap: 8, justifyContent: 'center' }}>
                    {['Product Management', 'Business Analysis', 'Product Design'].map((label, i) => (
                      <div key={label} style={{
                        padding: '5px 10px',
                        background: i === 0 ? 'var(--ink)' : i === 1 ? 'var(--amber)' : 'rgba(15,26,46,0.6)',
                        backdropFilter: 'blur(8px)',
                      }}>
                        <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--paper)', whiteSpace: 'nowrap' }}>
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 860px) {
              .assessment-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
              .assessment-3d { max-width: 420px; margin: 0 auto; }
            }
          `}</style>
        </section>

        {/* What to expect */}
        <section style={{ background: 'var(--paper-soft)', padding: 'clamp(48px, 6vw, 80px) 0', borderTop: '1px solid var(--paper-line)' }}>
          <div className="container-narrow">
            <p className="eyebrow" style={{ marginBottom: 24 }}>What happens next</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="steps-preview">
              {[
                { num: '01', title: 'Tell us where to send your result', body: 'One quick form — name, email, and where you\'re based. That\'s it.' },
                { num: '02', title: 'Work through 12 real scenarios', body: 'Each scenario puts you in a product situation. Pick the response that feels most instinctive to you.' },
                { num: '03', title: 'Get a personalised result', body: 'Your specific answers quoted back to you, with an explanation of what each choice reveals.' },
              ].map(step => (
                <div key={step.num} style={{ padding: '20px 24px', background: 'var(--white)', border: '1px solid var(--paper-line)' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber-deep)', marginBottom: 8 }}>{step.num}</p>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.018em', marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>{step.body}</p>
                </div>
              ))}
            </div>
            <style>{`@media (max-width: 640px) { .steps-preview { grid-template-columns: 1fr !important; } }`}</style>
          </div>
        </section>
      </>
    );
  }

  // ── LEAD CAPTURE ─────────────────────────────────────────────
  if (stage === 'lead') {
    const canContinue = lead.firstName.trim() && lead.email.trim() && lead.country.trim();
    return (
      <section style={{ paddingTop: 'clamp(64px, 8vw, 100px)', paddingBottom: 'clamp(64px, 8vw, 100px)' }}>
        <div className="container-narrow">
          <p className="eyebrow" style={{ marginBottom: 8 }}>Step 0 of 12</p>
          <h2 className="display-m text-balance" style={{ marginTop: 0 }}>Before we start — where should we send your result?</h2>
          <p style={{ marginTop: 16, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
            We'll email you the detailed breakdown — your specific answers and what they reveal. No spam, unsubscribe any time.
          </p>

          <form onSubmit={e => { e.preventDefault(); if (canContinue) { setCurrentIdx(0); setAnswers([]); setStage('scenario'); } }} style={{ marginTop: 40 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }} className="form-row-2">
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>First name</span>
                <input type="text" required autoFocus value={lead.firstName} onChange={e => setLead({ ...lead, firstName: e.target.value })}
                  style={{ padding: '14px 16px', border: '1.5px solid var(--paper-line)', background: 'var(--white)', borderRadius: 2, fontSize: '1rem', transition: 'border-color 150ms' }}
                  onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                  onBlur={e => e.target.style.borderColor = 'var(--paper-line)'}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>Email address</span>
                <input type="email" required value={lead.email} onChange={e => setLead({ ...lead, email: e.target.value })}
                  style={{ padding: '14px 16px', border: '1.5px solid var(--paper-line)', background: 'var(--white)', borderRadius: 2, fontSize: '1rem', transition: 'border-color 150ms' }}
                  onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                  onBlur={e => e.target.style.borderColor = 'var(--paper-line)'}
                />
              </label>
            </div>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>Country</span>
              <select required value={lead.country} onChange={e => setLead({ ...lead, country: e.target.value })}
                style={{ padding: '14px 16px', border: '1.5px solid var(--paper-line)', background: 'var(--white)', borderRadius: 2, fontSize: '1rem' }}>
                <option value="">Select your country</option>
                {['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Other African country', 'United Kingdom', 'Canada', 'Australia', 'United States', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
              <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                Which pathway are you most drawn to right now? <span style={{ color: 'var(--ink-muted)', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>(Optional — we compare this to your result)</span>
              </span>
              <select value={lead.selfReported} onChange={e => setLead({ ...lead, selfReported: e.target.value })}
                style={{ padding: '14px 16px', border: '1.5px solid var(--paper-line)', background: 'var(--white)', borderRadius: 2, fontSize: '1rem' }}>
                <option value="">Not sure / Skip</option>
                <option value="PM">Product Management</option>
                <option value="BA">Business Analysis</option>
                <option value="Design">Product Design</option>
              </select>
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <button type="submit" disabled={!canContinue} className="btn btn-primary btn-arrow"
                style={{ fontSize: '1rem', padding: '16px 28px', opacity: canContinue ? 1 : 0.4, cursor: canContinue ? 'pointer' : 'not-allowed' }}>
                Start the Assessment
              </button>
              <button type="button" onClick={() => setStage('intro')} style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}>← Back</button>
            </div>

            <p style={{ marginTop: 20, fontSize: '0.8125rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>
              By continuing, you agree to receive your result and occasional updates about Upthrust. We don't share your details.
            </p>
          </form>
          <style>{`@media (max-width: 600px) { .form-row-2 { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>
    );
  }

  // ── SCENARIO ─────────────────────────────────────────────────
  if (stage === 'scenario') {
    const scenario = scenarios[currentIdx];
    return (
      <div style={{ minHeight: 'calc(100vh - 68px)' }}>
        <ProgressBar current={currentIdx + 1} total={total} />

        <div style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(80px, 10vw, 120px)' }}>
          <div className="container-narrow">
            {/* Scenario card */}
            <div
              key={scenario.id}
              style={{ animation: 'scenarioIn 350ms cubic-bezier(0.2,0.7,0.2,1) both' }}
            >
              {/* Scenario label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.625rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--amber-deep)' }}>
                  Scenario {currentIdx + 1} of {total}
                </span>
                <span style={{ height: 1, flex: 1, background: 'var(--paper-line)' }} />
                <span style={{ fontFamily: 'Fraunces, serif', fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--ink-muted)' }}>{scenario.title}</span>
              </div>

              {/* Scenario setup */}
              <div style={{ padding: '28px 32px', background: 'var(--paper-soft)', border: '1px solid var(--paper-line)', borderLeft: '4px solid var(--amber)', marginBottom: 28 }}>
                <p style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', fontWeight: 400, lineHeight: 1.4, letterSpacing: '-0.018em', color: 'var(--ink)' }}>
                  {scenario.setup}
                </p>
              </div>

              {/* Question */}
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: 20, textTransform: 'uppercase' }}>
                {scenario.question}
              </p>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {scenario.options.map(option => {
                  const isSelected = selected === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      disabled={!!selected}
                      style={{
                        textAlign: 'left',
                        padding: '20px 24px',
                        background: isSelected ? 'var(--ink)' : 'var(--white)',
                        border: `1.5px solid ${isSelected ? 'var(--ink)' : 'var(--paper-line)'}`,
                        borderRadius: 2,
                        cursor: selected ? 'default' : 'pointer',
                        display: 'flex',
                        gap: 18,
                        alignItems: 'flex-start',
                        transition: 'all 200ms cubic-bezier(0.2,0.7,0.2,1)',
                        transform: isSelected ? 'translateX(4px)' : 'translateX(0)',
                      }}
                      onMouseEnter={e => { if (!selected) { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.background = 'var(--paper-soft)'; } }}
                      onMouseLeave={e => { if (!selected && !isSelected) { e.currentTarget.style.borderColor = 'var(--paper-line)'; e.currentTarget.style.background = 'var(--white)'; } }}
                    >
                      <span style={{
                        fontFamily: 'Manrope, sans-serif', fontWeight: 800,
                        fontSize: '0.6875rem', letterSpacing: '0.14em',
                        color: isSelected ? 'var(--amber-soft)' : 'var(--amber-deep)',
                        paddingTop: 3, flexShrink: 0,
                        transition: 'color 200ms',
                      }}>{option.id}</span>
                      <span style={{
                        flex: 1, fontSize: '1rem', lineHeight: 1.6,
                        color: isSelected ? 'var(--paper)' : 'var(--ink)',
                        transition: 'color 200ms',
                      }}>{option.text}</span>
                      {isSelected && (
                        <span style={{ color: 'var(--amber-soft)', flexShrink: 0, paddingTop: 3 }}>
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9 l4 4 l8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {currentIdx > 0 ? (
                  <button onClick={goBack} style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}>
                    ← Previous
                  </button>
                ) : <span />}
                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500, fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                  Answer instinctively — pick the option you'd reach for first.
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scenarioIn {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────
  if (stage === 'result' && result && meta) {
    const trackLabels: Record<string, string> = { PM: 'Product Management', BA: 'Business Analysis', Design: 'Product Design' };
    const trackColors: Record<string, string> = { PM: '#0F1A2E', BA: '#A05A26', Design: '#4F6A4A' };
    const selfMatch = lead.selfReported && lead.selfReported === result.primary;

    return (
      <>
        {/* Result hero */}
        <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
          <div className="container-narrow">
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--amber-soft)', marginBottom: 20 }}>
              {lead.firstName ? `${lead.firstName}, your result` : 'Your result'}
            </p>
            <h1 className="display-l text-balance" style={{ color: 'var(--paper)', marginBottom: 24 }}>
              {meta.headline}
            </h1>
            <p className="lede" style={{ color: 'rgba(250,247,241,0.8)', maxWidth: 640 }}>
              {meta.subhead}
            </p>

            {/* Self-reported vs assessed */}
            {lead.selfReported && lead.selfReported !== 'All three' && (
              <div style={{ marginTop: 28, padding: '16px 20px', background: 'rgba(250,247,241,0.06)', borderLeft: `3px solid ${selfMatch ? 'var(--moss)' : 'var(--amber)'}` }}>
                <p style={{ fontSize: '0.9375rem', color: 'rgba(250,247,241,0.8)', fontStyle: 'italic' }}>
                  {selfMatch
                    ? `✓ You said you were drawn to ${trackLabels[lead.selfReported] || lead.selfReported} — your assessed result confirms it.`
                    : `You said ${trackLabels[lead.selfReported] || lead.selfReported} — but your reflexes pointed somewhere different. That gap is worth a conversation.`}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Score breakdown */}
        <section style={{ padding: 'clamp(48px, 6vw, 80px) 0', background: 'var(--paper-soft)', borderBottom: '1px solid var(--paper-line)' }}>
          <div className="container-narrow">
            <p className="eyebrow" style={{ marginBottom: 28 }}>Score breakdown</p>
            {(['PM', 'BA', 'Design'] as const).map(track => (
              <ScoreBar
                key={track}
                label={trackLabels[track]}
                pct={result.percentages[track]}
                isPrimary={result.primary === track}
                color={trackColors[track]}
              />
            ))}
          </div>
        </section>

        {/* Quoted answers */}
        <section style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className="container-narrow">
            <p className="eyebrow" style={{ marginBottom: 8 }}>Why we say this</p>
            <h2 className="display-s text-balance" style={{ marginBottom: 12, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Three of your answers, read back to you.
            </h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--ink-muted)', marginBottom: 40 }}>
              These are the scenarios that revealed the most. Each choice is paired with what it tells us about how you think.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {result.quotableAnswers.map((qa, i) => (
                <div key={qa.scenarioId} style={{
                  opacity: 0, animation: `riseIn 500ms cubic-bezier(0.2,0.7,0.2,1) ${i * 150}ms both`,
                  padding: '24px 28px',
                  background: 'var(--white)',
                  border: '1px solid var(--paper-line)',
                  borderLeft: '4px solid var(--amber)',
                }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber-deep)', marginBottom: 10 }}>
                    Scenario {qa.scenarioId} · {qa.scenarioTitle}
                  </p>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--ink)', marginBottom: 14 }}>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginRight: 10 }}>
                      YOU CHOSE {qa.optionId}
                    </span>
                    {qa.optionText}
                  </p>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--ink-soft)', fontStyle: 'italic', borderTop: '1px solid var(--paper-line)', paddingTop: 14 }}>
                    {qa.insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
          <div className="container-narrow">
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--amber-soft)', marginBottom: 20 }}>
              What this means for Cohort 1
            </p>
            <h2 className="display-m text-balance" style={{ color: 'var(--paper)', marginBottom: 24, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
              {meta.cohortStatus === 'open' && 'Your pathway is open.'}
              {meta.cohortStatus === 'waitlist' && 'Your pathway opens in Cohort 2.'}
              {meta.cohortStatus === 'consult' && 'A 20-minute call will clarify everything.'}
            </h2>
            <p className="lede" style={{ color: 'rgba(250,247,241,0.78)', marginBottom: 36, maxWidth: 580 }}>
              {meta.cohortStatus === 'open' && 'Cohort 1 is the first cohort of the new Upthrust Career Capability Accelerator — 15 to 25 learners across PM and BA. Real product work. Real portfolio. Capability Passport at the end. Built on what we\'ve learned from training 1,000+ professionals globally since 2019.'}
              {meta.cohortStatus === 'waitlist' && 'We\'re launching Cohort 1 with PM and BA only — so we can prove the new capability-based model before opening Design. Waitlist members get first access to Cohort 2, early curriculum previews, and any early-cohort pricing we offer.'}
              {meta.cohortStatus === 'consult' && 'Your result sits between two pathways. A 20-minute consultation is the fastest way to decide — we\'ll walk through your answers together and figure out where you\'ll do best.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 40 }}>
              <Link href={meta.primaryCTA.href} className="btn btn-amber btn-arrow" style={{ fontSize: '1rem', padding: '16px 28px' }}>
                {meta.primaryCTA.label}
              </Link>
              <Link href={meta.secondaryCTA.href} className="btn btn-secondary" style={{ background: 'transparent', color: 'var(--paper)', borderColor: 'rgba(250,247,241,0.4)', fontSize: '1rem' }}>
                {meta.secondaryCTA.label}
              </Link>
            </div>

            <div style={{ paddingTop: 28, borderTop: '1px solid rgba(250,247,241,0.12)' }}>
              <p style={{ fontSize: '0.875rem', color: 'rgba(250,247,241,0.5)', lineHeight: 1.6 }}>
                A copy of your result is on its way to {lead.email || 'your inbox'}. If you don't see it within 10 minutes, check spam or email <a href="mailto:info@upthrustdigital.com" style={{ color: 'var(--amber-soft)', borderBottom: '1px solid rgba(197,116,58,0.4)' }}>info@upthrustdigital.com</a>.
              </p>
              <button onClick={() => { setStage('intro'); setAnswers([]); setCurrentIdx(0); setSelected(null); setLead({ firstName: '', email: '', country: '', selfReported: '' }); }}
                style={{ marginTop: 16, color: 'rgba(250,247,241,0.4)', fontSize: '0.8125rem', textDecoration: 'underline' }}>
                Take the assessment again
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return null;
}
