'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { scenarios } from '@/lib/scenarios';
import { calculateResult, getResultMeta, type Answer } from '@/lib/scoring';
import { getPathway, formatDate, seatsLine } from '@/lib/cohort-config';
import { TALLY_FORMS, tallyDirectUrl, getPricing, formatPrice, type Region } from '@/lib/config';
import { useRegion } from '@/lib/useRegion';
import { trackEvent } from '@/lib/mixpanel';
import { TRACKING_EVENTS } from '@/lib/tracking-events';
import { Reveal } from '@/components/Reveal';

type Stage = 'intro' | 'lead' | 'scenario' | 'computing' | 'result';
type OptionId = 'A' | 'B' | 'C' | 'D';

const STORAGE_KEY = 'upthrust_assessment_v1';

type SavedSession = { stage: Stage; lead: { firstName: string; email: string; country: string; selfReported: string }; currentIdx: number; answers: Answer[] };

const EMAIL_FORMAT_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Disposable/temporary email providers — blocked at lead capture so results
// and cohort follow-up actually reach a real inbox.
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'yopmail.com', 'mailinator.com', 'guerrillamail.com', 'guerrillamail.info',
  'tempmail.com', 'temp-mail.org', '10minutemail.com', '10minutemail.net',
  'throwawaymail.com', 'trashmail.com', 'getnada.com', 'dispostable.com',
  'fakeinbox.com', 'sharklasers.com', 'maildrop.cc', 'mintemail.com',
  'mailnesia.com', 'moakt.com', 'emailondeck.com', 'mohmal.com',
  'discard.email', 'spamgourmet.com', 'trbvm.com', 'inboxbear.com',
]);

function validateEmailValue(email: string): string {
  const trimmed = email.trim();
  if (!trimmed) return '';
  if (!EMAIL_FORMAT_RE.test(trimmed)) return 'Enter a valid email address.';
  const domain = trimmed.split('@')[1]?.toLowerCase();
  if (domain && DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return 'Please use a permanent email address — disposable/temporary emails aren’t accepted.';
  }
  return '';
}

function submitToTally(data: Record<string, string>) {
  fetch(tallyDirectUrl(TALLY_FORMS.assessment), {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString(),
  }).catch(() => {});
}

// Twelve-segment ledger bar — not a smooth percentage.
function LedgerProgress({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--bone)', borderBottom: '1px solid var(--border-strong)', padding: '14px 0' }}>
      <div className="container-narrow" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--fg-2)' }}>{current} / {total}</span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {Array.from({ length: total }, (_, i) => (
            <span key={i} style={{ flex: 1, height: 4, background: i < current ? 'var(--seal-500)' : 'var(--border-soft)', transition: 'background 220ms var(--ease-in-out-circ)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, pct, isPrimary, dominant }: { label: string; pct: number; isPrimary: boolean; dominant: boolean }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 60);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr) 40px', gap: 14, alignItems: 'center', marginBottom: 14 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: dominant ? 'var(--bone)' : 'var(--ink-300)' }}>{label.toUpperCase()}</span>
      <span style={{ height: 8, background: 'rgba(244,239,230,.14)', display: 'block' }}>
        <span style={{ display: 'block', height: 8, width: `${width}%`, background: dominant ? 'var(--seal-500)' : 'var(--ink-300)', transition: 'width 700ms var(--ease-quint-out)' }} />
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textAlign: 'right', color: dominant ? 'var(--bone)' : 'var(--ink-300)', fontVariantNumeric: 'tabular-nums' }}>{isPrimary ? '★' : `${pct}%`}</span>
    </div>
  );
}

export default function AssessmentContent({ initialRegion }: { initialRegion: Region }) {
  const [stage, setStage] = useState<Stage>('intro');
  const [lead, setLead] = useState({ firstName: '', email: '', country: '', selfReported: '' });
  const [emailTouched, setEmailTouched] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<OptionId | null>(null);
  const [savedSession, setSavedSession] = useState<SavedSession | null>(null);
  const [region] = useRegion(initialRegion);
  const total = scenarios.length;
  const finalResultRef = useRef<ReturnType<typeof calculateResult> | null>(null);

  const result = useMemo(() => {
    if (stage !== 'result') return null;
    return finalResultRef.current ?? calculateResult(answers);
  }, [stage, answers]);

  const meta = result ? getResultMeta(result.resultType) : null;
  const recommendedPathway = meta && meta.pathway !== 'CONSULTATION' ? getPathway(meta.pathway) : null;
  const recommendedPrice = recommendedPathway ? getPricing(recommendedPathway.slug, region) : null;

  // Restore a saved mid-quiz session, if one exists — offered on the intro
  // screen, not auto-applied, so a returning visitor isn't silently dropped
  // mid-quiz without context.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as SavedSession;
      if (saved && Array.isArray(saved.answers) && saved.stage && saved.stage !== 'intro' && saved.stage !== 'result') {
        setSavedSession(saved);
      }
    } catch { /* sessionStorage unavailable or corrupt — start fresh */ }
  }, []);

  // Persist progress as it happens. Cleared once the user is back at intro
  // or has a finished result — there is nothing useful to resume into either state.
  useEffect(() => {
    try {
      if (stage === 'intro' || stage === 'result') {
        sessionStorage.removeItem(STORAGE_KEY);
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ stage, lead, currentIdx, answers }));
    } catch { /* sessionStorage unavailable — progress simply won't survive a refresh */ }
  }, [stage, lead, currentIdx, answers]);

  function resumeSavedSession() {
    if (!savedSession) return;
    setLead(savedSession.lead);
    setAnswers(savedSession.answers);
    setCurrentIdx(savedSession.currentIdx);
    setStage(savedSession.stage);
    setSavedSession(null);
  }

  function commitAnswer(optionId: OptionId) {
    if (selected) return;
    setSelected(optionId);
    setTimeout(() => {
      const scenario = scenarios[currentIdx];
      const newAnswers = [...answers, { scenarioId: scenario.id, optionId }];
      setAnswers(newAnswers);

      if (currentIdx + 1 >= total) {
        const finalResult = calculateResult(newAnswers);
        finalResultRef.current = finalResult;
        const props = {
          form_name: 'Career Assessment',
          source_page: window.location.pathname,
          number_of_fields: 4,
          submission_status: 'submitted',
          selected_pathway: lead.selfReported || 'Not specified',
          primary_pathway: finalResult.primary,
          assessment_result_type: finalResult.resultType,
          pm_score: finalResult.scores.PM,
          ba_score: finalResult.scores.BA,
          design_score: finalResult.scores.Design,
          payment_ops_score: finalResult.scores.PaymentOps,
        };
        trackEvent(TRACKING_EVENTS.formSubmitted, props);
        trackEvent(TRACKING_EVENTS.careerAssessmentSubmitted, props);
        submitToTally({
          'First Name': lead.firstName,
          'Email': lead.email,
          'Country': lead.country,
          'Self-Reported Pathway': lead.selfReported || 'Not specified',
          'Assessment Result Type': finalResult.resultType,
          'PM Score': String(finalResult.scores.PM),
          'BA Score': String(finalResult.scores.BA),
          'Design Score': String(finalResult.scores.Design),
          'Payment Ops Score': String(finalResult.scores.PaymentOps),
          'Primary Pathway': finalResult.primary,
          'All Answers': JSON.stringify(newAnswers),
        });
        setStage('computing');
        setTimeout(() => setStage('result'), 1400);
      } else {
        setSelected(null);
        setCurrentIdx((i) => i + 1);
      }
    }, 350);
  }

  function goBack() {
    if (currentIdx === 0 || selected) return;
    setAnswers(answers.slice(0, -1));
    setCurrentIdx((i) => i - 1);
  }

  // Keyboard: number keys 1-4 answer, Backspace goes back.
  useEffect(() => {
    if (stage !== 'scenario') return;
    function onKey(e: KeyboardEvent) {
      if (e.key >= '1' && e.key <= '4') {
        const idx = Number(e.key) - 1;
        const scenario = scenarios[currentIdx];
        const opt = scenario.options[idx];
        if (opt) commitAnswer(opt.id);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        goBack();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, currentIdx, selected]);

  // ── INTRO ────────────────────────────────────────────────────
  if (stage === 'intro') {
    return (
      <>
        <Reveal className="ledger-grid" style={{ borderBottom: '1px solid var(--border-soft)' }}>
          <div className="container stack-mobile" style={{ padding: '80px 24px 88px', display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,0.95fr)', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ width: 40, height: 2, background: 'var(--seal-500)', marginBottom: 20 }} />
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-2)' }}>The Upthrust Career Assessment</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.375rem, 4.6vw, 3.875rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.06, margin: '20px 0 0' }}>
                Which pathway fits how you think?
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--fg-2)', maxWidth: '32em', margin: '22px 0 0' }}>
                Twelve real product situations. No personality test, no score — your own answers quoted back to you, and the programme your instincts already point to.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 40, margin: '34px 0 0', justifyContent: 'start' }}>
                {[['12', 'Scenarios'], ['~8', 'Minutes'], ['4', 'Pathways'], ['Free', 'NO CARD']].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)' }}>{l}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  trackEvent(TRACKING_EVENTS.careerAssessmentStarted, {
                    cta_text: 'Begin the Assessment', source_page: window.location.pathname, section_name: 'Assessment Hero',
                    form_name: 'Career Assessment', button_location: 'page_section', user_intent: 'career_fit',
                  });
                  setStage('lead');
                }}
                className="btn"
                style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 50, padding: '0 26px', marginTop: 32 }}
              >
                Begin the assessment →
              </button>
              <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 14 }}>No score. No personality type. Your own answers, quoted back to you.</div>
              {savedSession && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20, padding: '14px 18px', background: 'var(--paper-dim)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-1)', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>You have an assessment in progress ({savedSession.answers.length} of {total} answered).</span>
                  <button onClick={resumeSavedSession} style={{ fontSize: 13, fontWeight: 600, color: 'var(--seal-600)', textDecoration: 'underline' }}>Continue where you left off →</button>
                </div>
              )}
            </div>
            <div>
              <div style={{ position: 'relative', aspectRatio: '4/5', border: '1px solid var(--border-strong)', overflow: 'hidden' }}>
                <Image
                  src="/images/assessment-hero.jpg"
                  alt="A confident professional, ready to discover their pathway"
                  fill
                  sizes="(max-width: 900px) 100vw, 480px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                {['PRODUCT MANAGEMENT', 'BUSINESS ANALYSIS', 'PRODUCT DESIGN', 'PAYMENT OPS'].map((t) => (
                  <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', border: '1px solid var(--border-strong)', padding: '5px 9px' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </>
    );
  }

  // ── LEAD CAPTURE ─────────────────────────────────────────────
  if (stage === 'lead') {
    const emailError = validateEmailValue(lead.email);
    const canContinue = lead.firstName.trim() && lead.email.trim() && !emailError && lead.country.trim();
    return (
      <Reveal>
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '80px 24px 96px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--fg-3)' }}>STEP 01 OF 03 · WHERE TO SEND YOUR RESULT</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 600, letterSpacing: '-0.028em', lineHeight: 1.1, margin: '16px 0 0' }}>First, who are we talking to?</h1>
          <p style={{ fontSize: 16, color: 'var(--fg-2)', margin: '14px 0 0' }}>Name, email, and where you&rsquo;re based. That&rsquo;s it.</p>

          <form onSubmit={(e) => {
            e.preventDefault();
            if (!canContinue) return;
            trackEvent(TRACKING_EVENTS.careerAssessmentStarted, {
              cta_text: 'Start the Assessment', source_page: window.location.pathname, section_name: 'Career Assessment Lead Capture',
              form_name: 'Career Assessment Lead', number_of_fields: 4, selected_pathway: lead.selfReported || 'Not specified',
              button_location: 'page_section', user_intent: 'career_fit',
            });
            setCurrentIdx(0);
            setAnswers([]);
            setStage('scenario');
          }} style={{ marginTop: 36 }}>
            <label style={{ display: 'block', marginBottom: 20 }}>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)', marginBottom: 8 }}>Full name</span>
              <input required autoFocus value={lead.firstName} onChange={(e) => setLead({ ...lead, firstName: e.target.value })} placeholder="Adaeze Okonkwo"
                style={{ width: '100%', boxSizing: 'border-box', height: 48, padding: '0 14px', fontSize: 16, color: 'var(--fg-1)', background: 'var(--white)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-1)' }} />
            </label>
            <label style={{ display: 'block', marginBottom: 20 }}>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)', marginBottom: 8 }}>Email</span>
              <input required type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })}
                onBlur={() => setEmailTouched(true)} placeholder="you@email.com"
                style={{
                  width: '100%', boxSizing: 'border-box', height: 48, padding: '0 14px', fontSize: 16, color: 'var(--fg-1)', background: 'var(--white)',
                  border: `1px solid ${emailTouched && emailError ? 'var(--crimson-500)' : 'var(--border-strong)'}`, borderRadius: 'var(--radius-1)',
                }} />
              {emailTouched && emailError && (
                <span style={{ display: 'block', fontSize: 13, color: 'var(--crimson-600)', marginTop: 6 }}>{emailError}</span>
              )}
            </label>
            <label style={{ display: 'block', marginBottom: 20 }}>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)', marginBottom: 8 }}>Where you&rsquo;re based</span>
              <select required value={lead.country} onChange={(e) => setLead({ ...lead, country: e.target.value })}
                style={{ width: '100%', boxSizing: 'border-box', height: 48, padding: '0 14px', fontSize: 16, color: 'var(--fg-1)', background: 'var(--white)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-1)' }}>
                <option value="">Select your country</option>
                {['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Other African country', 'United Kingdom', 'Canada', 'Australia', 'United States', 'Other'].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label style={{ display: 'block', marginBottom: 28 }}>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)', marginBottom: 8 }}>
                Which pathway are you drawn to? <span style={{ fontWeight: 500, textTransform: 'none', letterSpacing: 0, color: 'var(--fg-3)' }}>(optional — we compare this to your result)</span>
              </span>
              <select value={lead.selfReported} onChange={(e) => setLead({ ...lead, selfReported: e.target.value })}
                style={{ width: '100%', boxSizing: 'border-box', height: 48, padding: '0 14px', fontSize: 16, color: 'var(--fg-1)', background: 'var(--white)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-1)' }}>
                <option value="">Not sure / Skip</option>
                <option value="PM">Product Management</option>
                <option value="BA">Business Analysis</option>
                <option value="Design">Product Design</option>
                <option value="PaymentOps">Payment Operations</option>
              </select>
            </label>
            <button type="submit" disabled={!canContinue} className="btn" style={{ width: '100%', justifyContent: 'center', background: canContinue ? 'var(--seal-500)' : 'var(--border-strong)', color: 'var(--bone)', height: 50, cursor: canContinue ? 'pointer' : 'not-allowed' }}>
              Start the 12 scenarios →
            </button>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--fg-3)', marginTop: 14, textAlign: 'center' }}>
              TAKES ABOUT 8 MINUTES · YOU CAN GO BACK AT ANY POINT
            </div>
          </form>
        </div>
      </Reveal>
    );
  }

  // ── SCENARIO ─────────────────────────────────────────────────
  if (stage === 'scenario') {
    const scenario = scenarios[currentIdx];
    return (
      <div>
        <LedgerProgress current={currentIdx + 1} total={total} />
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '56px 24px 96px' }}>
          <div key={scenario.id}>
            <div style={{ background: 'var(--ink-800)', borderLeft: '4px solid var(--seal-500)', padding: '22px 26px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--seal-300)', margin: 0 }}>The situation</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.2vw, 1.6875rem)', fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.012em', color: 'var(--bone)', margin: '10px 0 0' }}>
                {scenario.setup}
              </p>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.8vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.15, margin: '28px 0 0' }}>
              {scenario.question}
            </h2>
            <div style={{ margin: '36px 0 0', borderTop: '1px solid var(--ink-800)' }}>
              {scenario.options.map((option, i) => {
                const isSelected = selected === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => commitAnswer(option.id)}
                    disabled={!!selected}
                    style={{
                      width: '100%', textAlign: 'left', background: isSelected ? 'var(--bone-dim)' : 'none', border: 0,
                      borderBottom: '1px solid var(--border-soft)', padding: '22px 8px', cursor: selected ? 'default' : 'pointer',
                      display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) 28px', gap: 18, alignItems: 'center',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', border: '1px solid var(--border-strong)', width: 26, height: 26, display: 'grid', placeItems: 'center' }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 17, lineHeight: 1.5 }}>{option.text}</span>
                    <span style={{ color: 'var(--seal-500)', fontSize: 16, justifySelf: 'end' }}>{isSelected ? '✓' : '→'}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, flexWrap: 'wrap', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--fg-4)' }}>
                PRESS 1–{scenario.options.length} TO ANSWER · BACKSPACE TO GO BACK
              </span>
              {currentIdx > 0 && (
                <button onClick={goBack} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--fg-3)' }}>← BACK</button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── COMPUTING ────────────────────────────────────────────────
  if (stage === 'computing') {
    return (
      <section>
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '140px 24px 180px', textAlign: 'center' }}>
          <div style={{ height: 2, background: 'var(--border-soft)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, width: '30%', background: 'var(--seal-500)', animation: 'upSweep 900ms var(--ease-in-out-circ) infinite' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--fg-2)', marginTop: 28, lineHeight: 2 }}>
            READING YOUR TWELVE RESPONSES<br />
            <span style={{ color: 'var(--fg-3)' }}>MATCHING AGAINST PATHWAY PATTERNS</span><br />
            <span style={{ color: 'var(--fg-4)' }}>WRITING YOUR RESULT</span>
          </div>
        </div>
        <style>{`@keyframes upSweep { from { transform: translateX(-100%); } to { transform: translateX(320%); } }`}</style>
      </section>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────
  if (stage === 'result' && result && meta) {
    const trackLabels: Record<string, string> = { PM: 'Product Management', BA: 'Business Analysis', Design: 'Product Design', PaymentOps: 'Payment Operations' };
    // Bar-chart axis labels are the same 4 scores as trackLabels, renamed to the
    // trait each track's scenario copy already themes toward — a relabel, not
    // a new scoring dimension. trackLabels above stays programme-named since
    // it also describes the self-reported *pathway* choice, not a trait.
    const axisLabels: Record<string, string> = { PM: 'Product judgement', BA: 'Structured thinking', Design: 'Experience reasoning', PaymentOps: 'Operational rigour' };
    const selfMatch = lead.selfReported && lead.selfReported === result.primary;

    return (
      <>
        <Reveal style={{ background: 'var(--ink-800)', color: 'var(--bone)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '72px 24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--seal-300)' }}>
              {lead.firstName ? `${lead.firstName.toUpperCase()}, YOUR RESULT` : 'YOUR RESULT'}
            </div>
            <div style={{ fontSize: 16, color: 'var(--ink-300)', marginTop: 26 }}>Your instincts point to</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', fontWeight: 600, letterSpacing: '-0.032em', lineHeight: 1.04, margin: '8px 0 0', color: 'var(--bone)' }}>
              {meta.headline}
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink-200)', margin: '20px 0 0', maxWidth: '36em' }}>{meta.subhead}</p>

            {lead.selfReported && (
              <div style={{ marginTop: 24, padding: '14px 18px', background: 'rgba(244,239,230,.06)', borderLeft: `3px solid ${selfMatch ? 'var(--moss-500)' : 'var(--seal-500)'}`, maxWidth: 560 }}>
                <p style={{ fontSize: 14, color: 'var(--ink-200)', fontStyle: 'italic', margin: 0 }}>
                  {selfMatch
                    ? `✓ You said you were drawn to ${trackLabels[lead.selfReported] || lead.selfReported} — your assessed result confirms it.`
                    : `You said ${trackLabels[lead.selfReported] || lead.selfReported} — your reflexes pointed somewhere different. That gap is worth a conversation.`}
                </p>
              </div>
            )}

            <div style={{ margin: '40px 0 0', maxWidth: 520 }}>
              {(['PM', 'BA', 'Design', 'PaymentOps'] as const).map((track) => (
                <ScoreBar key={track} label={axisLabels[track]} pct={result.percentages[track]} isPrimary={result.primary === track} dominant={result.primary === track} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal style={{ borderBottom: '1px solid var(--border-soft)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '72px 24px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>What your answers showed</div>
            <div style={{ margin: '28px 0 0', borderTop: '1px solid var(--ink-800)' }}>
              {result.quotableAnswers.map((qa) => (
                <div key={qa.scenarioId} className="stack-mobile-sm" style={{ display: 'grid', gridTemplateColumns: '52px minmax(0,1fr) minmax(0,1.2fr)', gap: 24, padding: '22px 0', borderBottom: '1px solid var(--border-soft)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--seal-600)' }}>{String(qa.scenarioId).padStart(2, '0')}</span>
                  <span style={{ fontSize: 15, color: 'var(--fg-2)' }}>{qa.scenarioTitle}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, lineHeight: 1.45, fontStyle: 'italic' }}>&ldquo;{qa.optionText}&rdquo;</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, margin: '36px 0 0', flexWrap: 'wrap' }}>
              <Link href={meta.primaryCTA.href} className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 50, padding: '0 26px' }}>{meta.primaryCTA.label}</Link>
              <Link href={meta.secondaryCTA.href} className="btn" style={{ background: 'none', color: 'var(--fg-1)', border: '1px solid var(--border-strong)', height: 50, padding: '0 26px' }}>{meta.secondaryCTA.label}</Link>
              {meta.tertiaryCTA && (
                <Link href={meta.tertiaryCTA.href} className="btn" style={{ background: 'none', color: 'var(--fg-1)', border: '1px solid var(--border-strong)', height: 50, padding: '0 26px' }}>{meta.tertiaryCTA.label}</Link>
              )}
              <button onClick={() => { setStage('intro'); setAnswers([]); setCurrentIdx(0); setSelected(null); finalResultRef.current = null; setLead({ firstName: '', email: '', country: '', selfReported: '' }); setEmailTouched(false); }} style={{ fontSize: 14, color: 'var(--fg-3)', padding: '0 8px' }}>
                Retake
              </button>
            </div>
            {recommendedPathway && recommendedPrice && (
              <div className="card" style={{ marginTop: 28, maxWidth: 480, padding: '20px 22px' }}>
                <p style={{ ...({ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-muted)' } as const), marginBottom: 14 }}>Recommended</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '8px 0', borderBottom: '1px solid var(--paper-line)' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Pathway</span>
                  <span style={{ fontWeight: 600 }}>{recommendedPathway.label}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '8px 0', borderBottom: '1px solid var(--paper-line)' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Starts</span>
                  <span style={{ fontWeight: 600 }}>{formatDate(recommendedPathway.start)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '8px 0', borderBottom: '1px solid var(--paper-line)' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Seats</span>
                  <span style={{ fontWeight: 600 }}>{seatsLine(recommendedPathway.slug)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '8px 0' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>From</span>
                  <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatPrice(recommendedPrice.standard, region)}</span>
                </div>
              </div>
            )}
            <p style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 16 }}>
              A copy of your result is on its way to {lead.email || 'your inbox'}.
            </p>
          </div>
        </Reveal>
      </>
    );
  }

  return null;
}
