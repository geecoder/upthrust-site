'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { scenarios } from '@/lib/scenarios';
import { calculateResult, getResultMeta, type Answer } from '@/lib/scoring';
import { TALLY_FORMS, tallyDirectUrl } from '@/lib/config';

type Stage = 'intro' | 'lead-capture' | 'scenario' | 'result';

// Silently submit the assessment to Tally by posting to the form's submission URL via a hidden iframe.
// This avoids CORS issues since Tally's API requires their dashboard auth.
// The hidden iframe technique posts to Tally's public form endpoint just like a regular form submission would.
function submitAssessmentToTally(data: {
  firstName: string;
  email: string;
  country: string;
  selfReported: string;
  resultType: string;
  pmScore: number;
  baScore: number;
  designScore: number;
  primary: string;
  answers: Answer[];
}) {
  if (typeof window === 'undefined') return;

  // Create a hidden form and submit to Tally
  const form = document.createElement('form');
  form.action = tallyDirectUrl(TALLY_FORMS.assessment);
  form.method = 'POST';
  form.target = '_blank';
  form.style.display = 'none';

  const fields: Record<string, string> = {
    'First Name': data.firstName,
    'Email': data.email,
    'Country': data.country,
    'Self-Reported Pathway': data.selfReported || 'Not specified',
    'Assessment Result Type': data.resultType,
    'PM Score': String(data.pmScore),
    'BA Score': String(data.baScore),
    'Design Score': String(data.designScore),
    'Primary Pathway': data.primary,
    'All Answers': JSON.stringify(data.answers),
  };

  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  // NOTE: The direct POST to tally.so/r/{formId} won't work cross-origin.
  // Instead, we use fetch with no-cors mode (fire and forget).
  fetch(tallyDirectUrl(TALLY_FORMS.assessment), {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(fields).toString(),
  }).catch(() => {
    // Silent fail — we still show the result to the user
    // Lead capture is best-effort
  });
}

export default function AssessmentPage() {
  const [stage, setStage] = useState<Stage>('intro');
  const [leadData, setLeadData] = useState({
    firstName: '',
    email: '',
    country: '',
    selfReported: '',
  });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const total = scenarios.length;
  const progress = Math.round(((currentIdx) / total) * 100);

  const result = useMemo(() => {
    if (stage !== 'result') return null;
    return calculateResult(answers);
  }, [stage, answers]);

  const meta = result ? getResultMeta(result.resultType) : null;

  function handleAnswer(optionId: 'A' | 'B' | 'C') {
    const scenario = scenarios[currentIdx];
    const newAnswers = [...answers, { scenarioId: scenario.id, optionId }];
    setAnswers(newAnswers);

    if (currentIdx + 1 >= total) {
      // Calculate and submit to Tally before transitioning to result
      const finalResult = calculateResult(newAnswers);
      submitAssessmentToTally({
        firstName: leadData.firstName,
        email: leadData.email,
        country: leadData.country,
        selfReported: leadData.selfReported,
        resultType: finalResult.resultType,
        pmScore: finalResult.scores.PM,
        baScore: finalResult.scores.BA,
        designScore: finalResult.scores.Design,
        primary: finalResult.primary,
        answers: newAnswers,
      });
      setStage('result');
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  }

  // ────────────── INTRO ──────────────
  if (stage === 'intro') {
    return (
      <section style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: 'clamp(60px, 8vw, 100px)' }}>
        <div className="container-narrow" style={{ textAlign: 'left' }}>
          <p className="eyebrow">The Upthrust Product Career Assessment</p>
          <h1 className="display-l text-balance" style={{ marginTop: 20 }}>
            Discover how you actually think about product work.
          </h1>
          <p className="lede" style={{ marginTop: 24 }}>
            Twelve scenarios. Real product situations — vague stakeholders, conflicting priorities, launches that did not land. Each one reveals something about how you reason under pressure.
          </p>
          <p style={{ marginTop: 20, color: 'var(--ink-muted)', fontSize: '1rem', lineHeight: 1.65 }}>
            At the end, you will get a result that quotes your own answers back to you — not a generic personality type. Whether your reflexes point to Product Management, Business Analysis, or Product Design, you will know why.
          </p>

          <div style={{ marginTop: 48, display: 'flex', flexWrap: 'wrap', gap: 32, color: 'var(--ink-muted)', fontSize: '0.875rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)' }}></span>
              12 scenarios
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)' }}></span>
              About 8 minutes
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)' }}></span>
              No personality test gimmicks
            </span>
          </div>

          <button
            onClick={() => setStage('lead-capture')}
            className="btn btn-primary btn-arrow"
            style={{ marginTop: 48 }}
          >
            Begin
          </button>

          <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--paper-line)' }}>
            <p className="eyebrow">A note on honesty</p>
            <p style={{ marginTop: 12, fontSize: '0.9375rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
              Each scenario has three options that all sound smart. There is no obviously wrong answer — the differentiation is in <em>which</em> smart move you reach for first. Answer instinctively. The result is only useful if you do not game it.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ────────────── LEAD CAPTURE ──────────────
  if (stage === 'lead-capture') {
    const canContinue = leadData.firstName.trim() && leadData.email.trim() && leadData.country.trim();
    return (
      <section style={{ paddingTop: 'clamp(60px, 8vw, 100px)', paddingBottom: 'clamp(60px, 8vw, 100px)' }}>
        <div className="container-narrow">
          <p className="eyebrow">Step 0 · Before we begin</p>
          <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
            Where should we send your result?
          </h2>
          <p style={{ marginTop: 20, color: 'var(--ink-soft)', fontSize: '1.0625rem', lineHeight: 1.6 }}>
            We will email you a copy of your detailed result, along with the most relevant Upthrust pathway. No spam — you can unsubscribe in one click.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); if (canContinue) setStage('scenario'); }} style={{ marginTop: 40 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="form-row">
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--ink-soft)' }}>First name</span>
                <input
                  type="text"
                  required
                  value={leadData.firstName}
                  onChange={(e) => setLeadData({ ...leadData, firstName: e.target.value })}
                  style={{ padding: '14px 16px', border: '1.5px solid var(--paper-line)', background: 'var(--white)', borderRadius: 2, fontSize: '1rem' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--ink-soft)' }}>Email</span>
                <input
                  type="email"
                  required
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                  style={{ padding: '14px 16px', border: '1.5px solid var(--paper-line)', background: 'var(--white)', borderRadius: 2, fontSize: '1rem' }}
                />
              </label>
            </div>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--ink-soft)' }}>Country</span>
              <select
                required
                value={leadData.country}
                onChange={(e) => setLeadData({ ...leadData, country: e.target.value })}
                style={{ padding: '14px 16px', border: '1.5px solid var(--paper-line)', background: 'var(--white)', borderRadius: 2, fontSize: '1rem' }}
              >
                <option value="">Select your country</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
                <option value="South Africa">South Africa</option>
                <option value="Other Africa">Other African country</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="United States">United States</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--ink-soft)' }}>
                Before we start — which pathway are you most drawn to right now? <span style={{ color: 'var(--ink-muted)' }}>(Optional. We will compare this to your assessed result at the end.)</span>
              </span>
              <select
                value={leadData.selfReported}
                onChange={(e) => setLeadData({ ...leadData, selfReported: e.target.value })}
                style={{ padding: '14px 16px', border: '1.5px solid var(--paper-line)', background: 'var(--white)', borderRadius: 2, fontSize: '1rem' }}
              >
                <option value="">Not sure / Skip</option>
                <option value="PM">Product Management</option>
                <option value="BA">Business Analysis</option>
                <option value="Design">Product Design</option>
                <option value="All three">Interested in all three</option>
              </select>
            </label>

            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                type="submit"
                disabled={!canContinue}
                className="btn btn-primary btn-arrow"
                style={{ opacity: canContinue ? 1 : 0.4, cursor: canContinue ? 'pointer' : 'not-allowed' }}
              >
                Start the assessment
              </button>
              <button
                type="button"
                onClick={() => setStage('intro')}
                style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}
              >
                Back
              </button>
            </div>

            <p style={{ marginTop: 24, fontSize: '0.8125rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>
              By continuing, you agree to receive your assessment result and occasional updates about the Upthrust Career Capability Accelerator. We do not share your details with anyone.
            </p>
          </form>

          <style jsx>{`
            @media (max-width: 600px) {
              .form-row { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>
    );
  }

  // ────────────── SCENARIO ──────────────
  if (stage === 'scenario') {
    const scenario = scenarios[currentIdx];
    return (
      <section style={{ paddingTop: 60, paddingBottom: 80, minHeight: 'calc(100vh - 72px)' }}>
        {/* Progress bar */}
        <div style={{ position: 'sticky', top: 72, background: 'var(--paper)', zIndex: 10, paddingBottom: 20, marginBottom: 40 }}>
          <div className="container-narrow">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <p className="eyebrow">Scenario {currentIdx + 1} of {total}</p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>
                {progress}% complete
              </p>
            </div>
            <div style={{ height: 3, background: 'var(--paper-line)', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${((currentIdx + 1) / total) * 100}%`,
                background: 'var(--ink)',
                transition: 'width 400ms cubic-bezier(0.2, 0.7, 0.2, 1)',
              }}></div>
            </div>
          </div>
        </div>

        <div className="container-narrow">
          <div key={scenario.id} style={{ animation: 'fadeIn 400ms cubic-bezier(0.2, 0.7, 0.2, 1) both' }}>
            <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1.125rem', fontStyle: 'italic', color: 'var(--amber-deep)', letterSpacing: '-0.01em' }}>
              {scenario.title}
            </p>
            <p className="display-s" style={{ marginTop: 16, fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', lineHeight: 1.25 }}>
              {scenario.setup}
            </p>
            <p style={{ marginTop: 28, fontSize: '1.125rem', color: 'var(--ink-soft)', fontWeight: 500 }}>
              {scenario.question}
            </p>

            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {scenario.options.map((option, i) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className="option-button"
                  style={{
                    textAlign: 'left',
                    padding: '22px 26px',
                    background: 'var(--white)',
                    border: '1.5px solid var(--paper-line)',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 180ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                    fontSize: '1rem',
                    lineHeight: 1.55,
                    color: 'var(--ink)',
                    display: 'flex',
                    gap: 18,
                    alignItems: 'flex-start',
                  }}
                >
                  <span style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.75rem',
                    color: 'var(--amber-deep)',
                    letterSpacing: '0.08em',
                    paddingTop: 4,
                    flexShrink: 0,
                  }}>{option.id}</span>
                  <span style={{ flex: 1 }}>{option.text}</span>
                </button>
              ))}
            </div>

            {currentIdx > 0 && (
              <button
                onClick={() => {
                  setAnswers(answers.slice(0, -1));
                  setCurrentIdx(currentIdx - 1);
                }}
                style={{ marginTop: 32, color: 'var(--ink-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}
              >
                ← Back to previous scenario
              </button>
            )}
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .option-button:hover {
            border-color: var(--ink) !important;
            background: var(--paper-soft) !important;
            transform: translateX(2px);
          }
        `}</style>
      </section>
    );
  }

  // ────────────── RESULT ──────────────
  if (stage === 'result' && result && meta) {
    const selfReportMatch = leadData.selfReported &&
      ((leadData.selfReported === 'PM' && result.primary === 'PM') ||
       (leadData.selfReported === 'BA' && result.primary === 'BA') ||
       (leadData.selfReported === 'Design' && result.primary === 'Design'));

    return (
      <>
        {/* Result Hero */}
        <section style={{ paddingTop: 'clamp(60px, 8vw, 100px)', paddingBottom: 60 }}>
          <div className="container-narrow">
            <p className="eyebrow">{leadData.firstName ? `${leadData.firstName}, your assessed result` : 'Your assessed result'}</p>
            <h1 className="display-l text-balance" style={{ marginTop: 20 }}>
              {meta.headline}
            </h1>
            <p className="lede" style={{ marginTop: 24 }}>
              {meta.subhead}
            </p>
          </div>
        </section>

        {/* Score breakdown */}
        <section style={{ paddingBottom: 60 }}>
          <div className="container-narrow">
            <div style={{ background: 'var(--paper-soft)', padding: 32, border: '1px solid var(--paper-line)' }}>
              <p className="eyebrow" style={{ marginBottom: 24 }}>Score breakdown</p>
              {(['PM', 'BA', 'Design'] as const).map((track) => {
                const labels = { PM: 'Product Management', BA: 'Business Analysis', Design: 'Product Design' };
                const isPrimary = result.primary === track;
                return (
                  <div key={track} style={{ marginBottom: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                      <span style={{ fontWeight: isPrimary ? 500 : 400, fontSize: '0.9375rem' }}>
                        {labels[track]}
                        {isPrimary && (
                          <span style={{
                            marginLeft: 10,
                            fontFamily: 'Manrope, sans-serif',
                            fontSize: '0.625rem',
                            background: 'var(--amber)',
                            color: 'var(--paper)',
                            padding: '2px 6px',
                            letterSpacing: '0.1em',
                          }}>PRIMARY</span>
                        )}
                      </span>
                      <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>
                        {result.percentages[track]}%
                      </span>
                    </div>
                    <div style={{ height: 4, background: 'var(--paper-line)' }}>
                      <div style={{
                        height: '100%',
                        width: `${result.percentages[track]}%`,
                        background: isPrimary ? 'var(--ink)' : 'var(--amber)',
                        transition: 'width 800ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                      }}></div>
                    </div>
                  </div>
                );
              })}

              {leadData.selfReported && leadData.selfReported !== 'All three' && (
                <p style={{ marginTop: 20, fontSize: '0.875rem', color: 'var(--ink-soft)', fontStyle: 'italic', lineHeight: 1.55 }}>
                  {selfReportMatch
                    ? `You said you were drawn to ${leadData.selfReported === 'PM' ? 'Product Management' : leadData.selfReported === 'BA' ? 'Business Analysis' : 'Product Design'} before starting — and your assessed reflexes confirm it. Good signal.`
                    : `You said you were drawn to ${leadData.selfReported === 'PM' ? 'Product Management' : leadData.selfReported === 'BA' ? 'Business Analysis' : 'Product Design'} — but your reflexes actually pointed somewhere else. That gap is worth a conversation.`}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Quoted answers — the personalised section */}
        <section style={{ paddingBottom: 80 }}>
          <div className="container-narrow">
            <p className="eyebrow">Why we say this</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
              Three of your answers, read back to you.
            </h2>
            <p className="lede" style={{ marginTop: 20, color: 'var(--ink-soft)' }}>
              These are the scenarios that revealed the most about how you reason. Each one is paired with what your choice tells us about your reflexes.
            </p>

            <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 32 }}>
              {result.quotableAnswers.map((qa, i) => (
                <div key={qa.scenarioId} style={{
                  paddingLeft: 24,
                  borderLeft: '3px solid var(--amber)',
                }}>
                  <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: '1rem', color: 'var(--amber-deep)' }}>
                    Scenario {qa.scenarioId} · {qa.scenarioTitle}
                  </p>
                  <p style={{ marginTop: 8, fontSize: '1.0625rem', lineHeight: 1.55, color: 'var(--ink)' }}>
                    <span style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '0.75rem',
                      color: 'var(--ink-muted)',
                      letterSpacing: '0.08em',
                      marginRight: 8,
                    }}>YOU CHOSE {qa.optionId}</span>
                    {qa.optionText}
                  </p>
                  <p style={{ marginTop: 14, fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--ink-soft)', fontStyle: 'italic' }}>
                    {qa.insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What this means — CTA */}
        <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(60px, 8vw, 100px) 0' }}>
          <div className="container-narrow">
            <p className="eyebrow-light">What this means for Cohort 1</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16, color: 'var(--paper)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
              {meta.cohortStatus === 'open' && 'Your pathway is open. The next step is short.'}
              {meta.cohortStatus === 'waitlist' && 'Your pathway opens in Cohort 2. Join the waitlist and we will keep you close.'}
              {meta.cohortStatus === 'consult' && 'Your result is hybrid. A 20-minute consultation is the fastest way to decide.'}
            </h2>

            <p className="lede" style={{ marginTop: 24, color: 'rgba(250,247,241,0.8)' }}>
              {meta.cohortStatus === 'open' && 'Cohort 1 is the first cohort of the new Upthrust Career Capability Accelerator — 15 to 25 learners across Product Management and Business Analysis. Standard and Premium tiers. Twelve weeks. Real product work, real portfolio, real Capability Passport at the end. Built on what we have learned from training 1,000+ professionals globally since 2019.'}
              {meta.cohortStatus === 'waitlist' && 'We are launching Cohort 1 with PM and BA only — so we can prove the new capability-based model before opening Design. Waitlist members get first access to Cohort 2, early curriculum previews, and any early-cohort pricing we offer.'}
              {meta.cohortStatus === 'consult' && 'On the call we will walk through your detailed result, talk through where you might land, and decide together whether Cohort 1 is the right fit — or whether something else makes more sense for you right now.'}
            </p>

            <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <Link href={meta.primaryCTA.href} className="btn btn-amber btn-arrow">
                {meta.primaryCTA.label}
              </Link>
              <Link href={meta.secondaryCTA.href} className="btn btn-secondary" style={{ background: 'transparent', color: 'var(--paper)', borderColor: 'var(--paper)' }}>
                {meta.secondaryCTA.label}
              </Link>
            </div>

            <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid rgba(250,247,241,0.18)' }}>
              <p style={{ fontSize: '0.875rem', color: 'rgba(250,247,241,0.6)', lineHeight: 1.6 }}>
                A copy of your full result is on its way to {leadData.email || 'your inbox'}. If you do not see it within 10 minutes, check your spam folder, or email info@upthrustdigital.com and we will resend it.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return null;
}
