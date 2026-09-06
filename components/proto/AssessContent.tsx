'use client';

// The prototype's `isAssess` block: four stages driven by `aStage` —
// intro (lead capture) → quiz (12 scenarios) → computing (1400ms) → result.

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DIMS, P, PROG_HREF, Q, type ProgKey } from '@/lib/proto/data';
import { useProto, useProtoRoute } from '@/lib/proto/store';
import { validateLeadEmail, validateLeadName } from '@/lib/validation/lead';
import { analytics, slugForKey } from '@/lib/analytics';

const pad2 = (n: number) => String(n).padStart(2, '0');
const TRACKS: ProgKey[] = ['pm', 'ba', 'pd', 'po'];

export function AssessContent() {
  useProtoRoute('assess');
  const { s, set } = useProto();
  const router = useRouter();

  const qq = Q[s.qi];

  const sc: Record<string, number> = { pm: 0, ba: 0, pd: 0, po: 0 };
  (s.answers || []).forEach((a, i) => {
    if (a == null) return;
    const o = Q[i]?.o[a];
    if (o) sc[o.k] += 1;
  });
  const rTop = TRACKS.reduce((b, k) => (sc[k] > sc[b] ? k : b), 'pm' as ProgKey);

  // Errors are computed every render but only surfaced once a field has been
  // left or the form submitted — nobody wants to be told their email is
  // invalid while they are still typing the first character of it.
  const nameError = validateLeadName(s.leadName);
  const emailError = validateLeadEmail(s.leadEmail);
  const canStart = !nameError && !emailError;

  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});
  const [submitted, setSubmitted] = useState(false);
  const showName = (touched.name || submitted) && !!nameError;
  const showEmail = (touched.email || submitted) && !!emailError;

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Wall-clock start, for Assessment Completed's duration_seconds.
  const startedAt = useRef<number | null>(null);
  // Guards against a step being counted twice by a rerender or Strict Mode.
  const stepsSent = useRef<Set<number>>(new Set());
  const completedSent = useRef(false);

  const start = () => {
    setSubmitted(true);
    if (canStart) {
      startedAt.current = Date.now();
      stepsSent.current = new Set();
      completedSent.current = false;
      analytics.assessmentStarted({ source_page: '/assessment', total_steps: Q.length });
      set({ aStage: 'quiz', qi: 0, answers: [] });
      return;
    }
    // Send the caret to the first thing that needs fixing rather than leaving
    // the person to hunt for the message.
    (nameError ? nameRef : emailRef).current?.focus();
  };

  const answerQ = (i: number) => {
    const ans = s.answers.slice();
    ans[s.qi] = i;

    // The answer itself is deliberately not sent — only which scenario was
    // completed, so drop-off can be measured without recording responses.
    if (!stepsSent.current.has(s.qi)) {
      stepsSent.current.add(s.qi);
      analytics.assessmentStepCompleted({
        step_number: s.qi + 1,
        total_steps: Q.length,
        scenario_id: `scenario-${String(s.qi + 1).padStart(2, '0')}`,
      });
    }

    if (s.qi >= Q.length - 1) {
      set({ answers: ans, aStage: 'computing' });
      window.setTimeout(() => set({ aStage: 'result' }), 1400);
    } else set({ answers: ans, qi: s.qi + 1 });
  };

  useEffect(() => {
    if (s.aStage !== 'result' || completedSent.current) return;
    completedSent.current = true;
    analytics.assessmentCompleted({
      recommended_program: slugForKey(rTop),
      total_steps: Q.length,
      duration_seconds: startedAt.current
        ? Math.max(0, Math.round((Date.now() - startedAt.current) / 1000))
        : 0,
    });
  }, [s.aStage, rTop]);

  const first = (s.leadName || 'Your').trim().split(' ')[0].toUpperCase();

  return (
    <div style={{ animation: 'v3fade 340ms both', minHeight: '70vh' }}>

      {/* ─────────── INTRO ─────────── */}
      {s.aStage === 'intro' && (
        <section style={{ borderBottom: '1px solid var(--border-strong)', position: 'relative', overflow: 'hidden', backgroundImage: 'repeating-linear-gradient(to right,rgba(11,26,43,.045) 0 1px,transparent 1px 28px),repeating-linear-gradient(to bottom,rgba(11,26,43,.045) 0 1px,transparent 1px 28px)' }}>
          <div className="pv-wrap pv-2col" style={{ padding: '56px 40px', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 52, alignItems: 'center' }}>
            <div>
              <div style={{ width: 34, height: 2, background: 'var(--seal-500)', marginBottom: 16 }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.12em', color: 'var(--fg-2)' }}>CAREER ASSESSMENT · 12 SCENARIOS · ~8 MINUTES</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5.4vw,80px)', fontWeight: 600, letterSpacing: '-.042em', lineHeight: .97, margin: '20px 0 0', animation: 'v3rise 620ms cubic-bezier(.22,1,.36,1) both' }}>Which pathway<br />fits how you think?</h1>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--fg-2)', margin: '20px 0 0', maxWidth: '30em' }}>Twelve real product situations. No personality test, no score — your own answers quoted back to you, and the programme your instincts already point to.</p>
              <div className="pv-statrow" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,auto)', gap: '0 36px', margin: '34px 0 0', justifyContent: 'start' }}>
                {[{ n: '12', l: 'SCENARIOS' }, { n: '~8', l: 'MINUTES' }, { n: '4', l: 'PATHWAYS' }, { n: 'Free', l: 'NO CARD' }].map(x => (
                  <span key={x.l} style={{ borderTop: '2px solid var(--ink-900)', paddingTop: 9 }}>
                    <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1 }}>{x.n}</span>
                    <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--fg-3)', marginTop: 6 }}>{x.l}</span>
                  </span>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--paper)', border: '1px solid var(--ink-900)', boxShadow: 'var(--shadow-3)', padding: '30px 28px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', color: 'var(--fg-3)', borderBottom: '1px solid var(--ink-900)', paddingBottom: 12 }}>WHERE SHOULD WE SEND YOUR RESULT?</div>
              <form
                onSubmit={e => { e.preventDefault(); start(); }}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 22 }}
              >
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)', marginBottom: 8 }}>FULL NAME</span>
                  <input
                    ref={nameRef}
                    value={s.leadName}
                    onChange={e => set({ leadName: e.target.value })}
                    onBlur={() => setTouched(t => ({ ...t, name: true }))}
                    placeholder="Adaeze Okonkwo"
                    autoComplete="name"
                    aria-invalid={showName || undefined}
                    aria-describedby={showName ? 'pv-name-err' : undefined}
                    style={{ width: '100%', boxSizing: 'border-box', height: 48, padding: '0 14px', fontFamily: 'var(--font-ui)', fontSize: 16, background: 'var(--white)', border: `1px solid ${showName ? 'var(--crimson-500)' : 'var(--border-strong)'}`, borderRadius: 4, transition: 'border-color 150ms' }}
                  />
                  {showName && (
                    <span id="pv-name-err" role="alert" style={{ display: 'block', fontSize: 13, lineHeight: 1.45, color: 'var(--crimson-500)', marginTop: 7 }}>{nameError}</span>
                  )}
                </label>

                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)', marginBottom: 8 }}>EMAIL</span>
                  <input
                    ref={emailRef}
                    value={s.leadEmail}
                    onChange={e => set({ leadEmail: e.target.value })}
                    onBlur={() => setTouched(t => ({ ...t, email: true }))}
                    placeholder="you@email.com"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    aria-invalid={showEmail || undefined}
                    aria-describedby={showEmail ? 'pv-email-err' : undefined}
                    style={{ width: '100%', boxSizing: 'border-box', height: 48, padding: '0 14px', fontFamily: 'var(--font-ui)', fontSize: 16, background: 'var(--white)', border: `1px solid ${showEmail ? 'var(--crimson-500)' : 'var(--border-strong)'}`, borderRadius: 4, transition: 'border-color 150ms' }}
                  />
                  {showEmail && (
                    <span id="pv-email-err" role="alert" style={{ display: 'block', fontSize: 13, lineHeight: 1.45, color: 'var(--crimson-500)', marginTop: 7 }}>{emailError}</span>
                  )}
                </label>

                {/* Genuinely actionable, always. A disabled (or aria-disabled)
                    submit gives a keyboard or screen-reader user nothing to
                    press and no reason why; pressing it here surfaces the
                    errors and moves focus to the first field that needs work. */}
                <button
                  type="submit"
                  className="pv-h-seal600"
                  style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 52, width: '100%', marginTop: 6, background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', transition: 'background 180ms' }}
                >
                  Begin the assessment →
                </button>
              </form>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', color: 'var(--fg-3)', marginTop: 12, textAlign: 'center' }}>YOU CAN GO BACK AT ANY POINT · NO SPAM</div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────── QUIZ ─────────── */}
      {s.aStage === 'quiz' && qq && (
        <section>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '44px 40px 88px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.1em', color: 'var(--fg-2)' }}>{pad2(s.qi + 1)} / {pad2(Q.length)}</span>
              <span style={{ display: 'flex', gap: 4, flex: 1, minWidth: 200 }} aria-hidden="true">
                {Q.map((_x, i) => (
                  <span key={i} style={{ flex: 1, height: 4, background: i < s.qi ? 'var(--seal-500)' : (i === s.qi ? 'var(--ink-900)' : 'var(--border-soft)'), transition: 'background 220ms cubic-bezier(.65,0,.35,1)' }} />
                ))}
              </span>
              <button onClick={() => set({ qi: Math.max(0, s.qi - 1) })} style={{ font: 'inherit', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', background: 'none', border: 0, padding: 0, cursor: 'pointer', color: 'var(--fg-3)' }}>← BACK</button>
            </div>

            <div key={s.qi} style={{ margin: '48px 0 0', animation: 'v3rise 300ms cubic-bezier(.22,1,.36,1) both' }}>
              <div style={{ background: 'var(--ink-900)', color: 'var(--bone)', padding: '22px 26px', borderLeft: '4px solid var(--seal-500)' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.14em', color: 'var(--seal-300)' }}>THE SITUATION</span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.2vw,27px)', fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.3, color: 'var(--bone)', margin: '10px 0 0' }}>{qq.s}</p>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.8vw,46px)', fontWeight: 600, letterSpacing: '-.032em', lineHeight: 1.1, margin: '24px 0 0' }}>{qq.q}</h2>
              <div style={{ margin: '34px 0 0', borderTop: '2px solid var(--ink-900)' }}>
                {qq.o.map((o, i) => (
                  <button key={o.t} onClick={() => answerQ(i)} className="pv-h-bonedim" style={{ width: '100%', textAlign: 'left', font: 'inherit', background: 'none', border: 0, borderBottom: '1px solid var(--border-soft)', padding: '20px 10px', cursor: 'pointer', display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) 28px', gap: 18, alignItems: 'center', transition: 'background 150ms cubic-bezier(.22,1,.36,1)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', border: '1px solid var(--border-strong)', width: 26, height: 26, display: 'grid', placeItems: 'center' }}>{i + 1}</span>
                    <span style={{ fontSize: 17, lineHeight: 1.5 }}>{o.t}</span>
                    <span style={{ color: 'var(--seal-500)', fontSize: 16, justifySelf: 'end' }}>→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────── COMPUTING ─────────── */}
      {s.aStage === 'computing' && (
        <section>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '150px 40px 190px', textAlign: 'center' }} role="status" aria-live="polite">
            <div style={{ height: 2, background: 'var(--border-soft)', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, width: '30%', background: 'var(--seal-500)', animation: 'v3sweep 900ms cubic-bezier(.65,0,.35,1) infinite' }} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.1em', color: 'var(--fg-2)', marginTop: 26, lineHeight: 2.1 }}>
              READING YOUR TWELVE RESPONSES<br />
              <span style={{ color: 'var(--fg-3)' }}>MATCHING AGAINST PATHWAY PATTERNS</span><br />
              <span style={{ color: 'var(--fg-4)' }}>WRITING YOUR RESULT</span>
            </div>
          </div>
        </section>
      )}

      {/* ─────────── RESULT ─────────── */}
      {s.aStage === 'result' && (
        <div>
          <section style={{ background: 'var(--ink-900)', color: 'var(--bone)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right,rgba(244,239,230,.05) 0 1px,transparent 1px 32px),repeating-linear-gradient(to bottom,rgba(244,239,230,.05) 0 1px,transparent 1px 32px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '60px 40px 64px', animation: 'v3rise 460ms cubic-bezier(.22,1,.36,1) both' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', color: 'var(--seal-300)' }}>{first}&apos;S RESULT</div>
              <div style={{ fontSize: 16, color: 'var(--ink-300)', marginTop: 24 }}>Your strongest fit is</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5.2vw,72px)', fontWeight: 600, letterSpacing: '-.04em', lineHeight: 1, margin: '6px 0 0', color: 'var(--bone)' }}>{P[rTop].n}</h1>
              <p style={{ fontSize: 19, color: 'var(--ink-200)', margin: '14px 0 0' }}>{P[rTop].l}</p>
              <div className="pv-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 22, margin: '40px 0 0' }}>
                {DIMS.map(dm => (
                  <div key={dm.k}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', color: dm.k === rTop ? 'var(--seal-300)' : 'var(--ink-300)' }}>{dm.l}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--bone)', fontVariantNumeric: 'tabular-nums' }}>{sc[dm.k]}</span>
                    </div>
                    <div style={{ height: 8, background: 'rgba(244,239,230,.14)', marginTop: 8 }}>
                      <div style={{ height: 8, width: Math.round((sc[dm.k] / 12) * 100) + '%', background: dm.k === rTop ? 'var(--seal-500)' : 'rgba(244,239,230,.3)', transformOrigin: 'left', animation: 'v3bar 700ms cubic-bezier(.22,1,.36,1) both' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ borderBottom: '1px solid var(--border-strong)' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 40px 56px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', color: 'var(--fg-3)' }}>WHAT YOUR ANSWERS SHOWED</div>
              <div style={{ margin: '22px 0 0', borderTop: '2px solid var(--ink-900)' }}>
                {[0, 5, 11].map(i => (
                  <div key={i} className="pv-3col" style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) 1.2fr', gap: 22, padding: '18px 0', borderBottom: '1px solid var(--border-soft)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--seal-600)' }}>{pad2(i + 1)}</span>
                    <span style={{ fontSize: 15, color: 'var(--fg-2)' }}>{Q[i].s}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, lineHeight: 1.45, fontStyle: 'italic' }}>&quot;{s.answers[i] != null ? Q[i].o[s.answers[i]!].t : '—'}&quot;</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '32px 0 0', flexWrap: 'wrap' }}>
                <button onClick={() => { analytics.ctaClicked({ cta_name: `Open ${P[rTop].n}`, cta_location: 'assessment_result', destination: PROG_HREF[rTop], program_slug: slugForKey(rTop) }); router.push(PROG_HREF[rTop]); }} className="pv-h-seal600" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 52, padding: '0 26px', background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', transition: 'background 150ms' }}>Open {P[rTop].n} →</button>
                <button onClick={() => { analytics.ctaClicked({ cta_name: 'See all six programmes', cta_location: 'assessment_result', destination: '/' }); router.push('/'); }} style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 52, padding: '0 22px', background: 'none', color: 'var(--fg-1)', border: '1px solid var(--border-strong)', borderRadius: 4, cursor: 'pointer' }}>See all six programmes</button>
                <button onClick={() => set({ aStage: 'intro', qi: 0, answers: [] })} style={{ font: 'inherit', fontSize: 14, background: 'none', border: 0, padding: 0, cursor: 'pointer', color: 'var(--fg-3)' }}>Retake</button>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', color: 'var(--seal-600)', marginLeft: 'auto' }}>{P[rTop].seats} of {P[rTop].cap} places left</span>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
