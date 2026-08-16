'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import CapstonesInteractive from '@/components/CapstonesInteractive';
import { COHORT, PATHWAY_LIST, type PathwaySlug } from '@/lib/cohort-config';
import { PATHWAY_CONTENT } from '@/lib/pathways-content';
import { getPricing, formatPrice, REGION_LABELS, REGION_PROCESSOR } from '@/lib/config';
import { useRegion } from '@/lib/useRegion';

const WHY_NOW = [
  { was: 'Certificate collected', now: 'Evidence produced', pct: 85 },
  { was: 'Course completed', now: 'Capability demonstrated', pct: 78 },
  { was: '"I attended X program"', now: '"Here is my capstone"', pct: 91 },
  { was: 'Passive learner', now: 'Active builder', pct: 83 },
];

const RHYTHM = [
  { num: '01', title: 'Concept class', meta: '90 MIN · LIVE', outcome: 'Weekly framework understood', detail: 'A live 90-minute session on one framework — no more. You leave able to name the thing, know when it applies, and know what bad practice looks like.' },
  { num: '02', title: 'Real-world case', meta: '30 MIN · LIVE', outcome: 'Context and pattern recognition', detail: 'A real product situation from Nigerian, UK, or Canadian teams, walked through end to end. What the team decided, what it cost, what they would do differently.' },
  { num: '03', title: 'Practical lab', meta: '60 MIN · LIVE', outcome: 'Skill practised under supervision', detail: 'You do the work while a facilitator watches. Mistakes get corrected in the room, not two weeks later in a comment thread.' },
  { num: '04', title: 'Weekly assignment', meta: 'SELF-PACED · 3–4 HRS', outcome: 'Real portfolio artefact produced', detail: 'One artefact per week, on a real capstone brief. This is the work that ends up in your portfolio and in front of employers.' },
  { num: '05', title: 'Structured feedback', meta: `WITHIN ${COHORT.feedbackSlaHours} HRS`, outcome: 'Specific, actionable revision notes', detail: 'Scored against the published rubric with written notes on what to change. Not a grade. A revision list.' },
  { num: '06', title: 'Reflection', meta: '15 MIN · ASYNC', outcome: 'Interview story added to your bank', detail: 'You write down what you decided and why, in interview language. By Week 12 you have eight to ten stories you can tell without preparing.' },
];

const PHASES = [
  {
    label: 'Foundation', range: 'WEEKS 0–3', weeks: [
      { num: 'W00', title: 'Onboarding & diagnostic', desc: 'Baseline assessment, tool setup, pathway confirmation, community induction. You know exactly what you are building toward before Week 1.' },
      { num: 'W01', title: 'Digital product foundations', desc: 'How real product teams work. The roles of PM, BA, Design, Engineering, QA, Marketing, Ops — and how they hand work to each other.' },
      { num: 'W02', title: 'Problem discovery', desc: 'How to define user and business problems clearly before jumping to solutions. What a well-framed problem brief looks like.' },
      { num: 'W03', title: 'Product strategy & business context', desc: 'Connecting problems to business goals, MVP scope, success measures, and why we are solving this now and not something else.' },
    ],
  },
  {
    label: 'Core skills', range: 'WEEKS 4–7', weeks: [
      { num: 'W04', title: 'Requirements & user stories', desc: 'Turning a framed problem into requirements a delivery team can build — functional, non-functional, and acceptance criteria that hold.' },
      { num: 'W05', title: 'Process & journey mapping', desc: 'As-Is and To-Be process maps, user journeys, and finding the handoffs where work quietly breaks.' },
      { num: 'W06', title: 'Documentation that holds up', desc: 'A full PRD on PM, a BRD on BA, an IA and flow set on Design, a reconciliation model on Payment Operations. Writing precisely enough that the team can act without you in the room.' },
      { num: 'W07', title: 'Prioritisation & scope', desc: 'MVP scope, trade-offs, sequencing — and how to defend what you deliberately left out.' },
    ],
  },
  {
    label: 'Delivery', range: 'WEEKS 8–11', weeks: [
      { num: 'W08', title: 'Agile delivery in practice', desc: 'Backlog refinement, sprint ceremonies, and what each role is actually accountable for inside a delivery team.' },
      { num: 'W09', title: 'Quality, UAT & edge cases', desc: 'Test scenarios, a full UAT pack, usability testing on Design, exception and dispute handling on Payment Operations — and the discipline of finding the case nobody scoped.' },
      { num: 'W10', title: 'Launch & measurement', desc: 'Launch briefs, success metrics, kill criteria, and the post-launch reporting that tells you whether it worked.' },
      { num: 'W11', title: 'Portfolio & interview stories', desc: 'Packaging twelve weeks of artefacts into one case study and a story bank that survives a real interview.' },
    ],
  },
  {
    label: 'Capstone', range: 'WEEK 12', weeks: [
      { num: 'W12', title: 'Capstone defence', desc: 'You present and defend your capstone to a facilitator panel. Every capability area is scored against the published rubric, then signed off. This is what the Capability Passport records.' },
    ],
  },
];

const ACCEL_FAQ = [
  { q: 'What exactly is the Career Capability Accelerator?', a: 'A 12-week practical program across four pathways — Product Management, Business Analysis, Product Design, and Payment Operations — with live sessions, weekly portfolio assignments, AI feedback, and expert review. Eligible learners earn a Capability Passport: a verifiable record of what you produced.' },
  { q: 'How much time per week does this take?', a: 'Plan for 8–10 hours: 2 hrs live, 1 hr lab, 3–4 hrs assignment, 1 hr feedback. People doing less than 6 hours tend to fall behind by Week 3.' },
  { q: 'What is the difference between Standard and Premium?', a: 'Standard: full program, templates, community, certificate. Premium adds: 1:1 portfolio review, mock interview, enhanced feedback, Capability Passport eligibility, Demo Day spotlight.' },
  { q: 'Can I switch pathways mid-program?', a: 'In rare cases yes — within the first 2 weeks. After that, pathway-specific work has diverged. Take the assessment and consultation before enrolling.' },
  { q: 'Do you offer payment plans?', a: 'Yes. Both Standard and Premium can be paid in two installments. Discuss your plan on the consultation call.' },
];

function WeeklyLoopDial({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const radiusPct = (115 / 300) * 100; // node orbit radius, as % of the dial's own size
  return (
    <div style={{ position: 'relative', width: 'min(300px, 72vw)', height: 'min(300px, 72vw)', margin: '0 auto' }}>
      <div style={{ position: 'absolute', inset: 0, border: '1px solid var(--border-soft)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', inset: '11.33%', border: '1px solid var(--border-soft)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', inset: '22.67%', border: '1px dashed var(--border-soft)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--fg-3)' }}>ONE WEEK</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: 4 }}>
            8–10<span style={{ fontSize: 18 }}> hrs</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>one artefact</div>
        </div>
      </div>
      {RHYTHM.map((r, i) => {
        const angle = (i / RHYTHM.length) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const leftPct = 50 + radiusPct * Math.cos(rad);
        const topPct = 50 + radiusPct * Math.sin(rad);
        const isActive = active === i;
        return (
          <button
            key={r.num}
            onClick={() => onSelect(i)}
            style={{
              position: 'absolute', left: `${leftPct}%`, top: `${topPct}%`, transform: 'translate(-50%, -50%)',
              width: 44, height: 44, borderRadius: '50%',
              border: `1px solid ${isActive ? 'var(--seal-500)' : 'var(--ink-800)'}`,
              background: isActive ? 'var(--seal-500)' : 'var(--bone)',
              color: isActive ? 'var(--bone)' : 'var(--fg-1)',
              fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer', transition: 'all 180ms var(--ease-quint-out)',
            }}
          >
            {r.num}
          </button>
        );
      })}
    </div>
  );
}

export default function AcceleratorPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const [region] = useRegion('OTHER');
  const [pricingPathway, setPricingPathway] = useState<PathwaySlug>(PATHWAY_LIST[0].slug);
  const price = getPricing(pricingPathway, region);

  return (
    <>
      {/* HERO */}
      <section className="ledger-grid" style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '80px 24px 0' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: 64, alignItems: 'start' }}>
            <div>
              <div style={{ width: 40, height: 2, background: 'var(--seal-500)', marginBottom: 20 }} />
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-2)' }}>The Career Capability Accelerator</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4.8vw, 4.125rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '20px 0 0' }}>
                Twelve weeks. Real product work. Evidence at the end.
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--fg-2)', maxWidth: '32em', margin: '22px 0 0' }}>
                Four pathways. Work through realistic product scenarios, build portfolio-grade deliverables, defend your decisions, and earn a Capability Passport.
              </p>
              <div style={{ display: 'flex', gap: 12, margin: '30px 0 0', flexWrap: 'wrap' }}>
                <Link href="/assessment" className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 48, padding: '0 24px' }}>Take the assessment</Link>
                <Link href="/enrol" className="btn" style={{ background: 'var(--bone)', color: 'var(--fg-1)', border: '1px solid var(--border-strong)', height: 48, padding: '0 24px' }}>Enrol now</Link>
              </div>
            </div>
            <div style={{ position: 'relative', aspectRatio: '4/3', border: '1px solid var(--border-strong)', background: 'var(--bone-dim)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
              <Image
                src="/images/accelerator-hero.jpg"
                alt="A learner working through a live practical session at a computer"
                fill
                sizes="(max-width: 900px) 100vw, 560px"
                style={{ objectFit: 'cover' }}
                priority
              />
              <div style={{ position: 'relative', background: 'var(--ink-800)', color: 'var(--bone)', padding: '12px 16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--seal-300)' }}>LIVE · PRACTICAL · COHORT-BASED</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', borderTop: '1px solid var(--ink-800)', margin: '56px 0 0' }}>
            {[['Duration', '12 weeks'], ['Cohort size', '15–25'], ['Time / week', '8–10 hrs'], ['Pathways', 'All four'], ['Format', 'Live + async']].map(([l, v], i) => (
              <div key={l} style={{ padding: i === 0 ? '20px 20px 26px 0' : '20px', borderLeft: i > 0 ? '1px solid var(--border-soft)' : 'none' }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>{l}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 25, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section style={{ background: 'var(--ink-800)', color: 'var(--bone)' }}>
        <div className="container" style={{ padding: '96px 24px' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 64, alignItems: 'end' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--seal-300)' }}>WHY NOW</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.12, margin: '16px 0 0', color: 'var(--bone)' }}>
                The market moved from credentials to capability.
              </h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-300)', margin: 0 }}>Share of employers who said each shift mattered more in 2024–25 hiring than the year before.</p>
          </div>
          <div style={{ margin: '52px 0 0' }}>
            {WHY_NOW.map((row) => (
              <div key={row.was} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) 88px', gap: 24, alignItems: 'center', padding: '22px 0', borderTop: '1px solid rgba(244,239,230,.14)' }}>
                <span style={{ fontSize: 17, color: 'var(--ink-300)', textDecoration: 'line-through', textDecorationColor: 'var(--seal-500)' }}>{row.was}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600, color: 'var(--bone)' }}>{row.now}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: 'var(--bone)' }}>{row.pct}%</span>
                <span style={{ gridColumn: '1 / -1', height: 3, background: 'rgba(244,239,230,.14)' }}>
                  <span style={{ display: 'block', height: 3, width: `${row.pct}%`, background: 'var(--seal-500)' }} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEEKLY LOOP */}
      <section style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--bone-dim)' }}>
        <div className="container" style={{ padding: '96px 24px' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 64, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>The weekly loop</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.12, margin: '16px 0 0' }}>
                Six steps. Repeated twelve times.
              </h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>
              Concept. Real case. Lab. Assignment. Feedback. Reflection. The repetition is the point — select any step to see what it involves.
            </p>
          </div>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,300px) minmax(0,1fr)', gap: 56, margin: '52px 0 0', alignItems: 'start' }}>
            <WeeklyLoopDial active={activeStep} onSelect={setActiveStep} />
            <div style={{ borderTop: '1px solid var(--ink-800)' }}>
              {RHYTHM.map((r, i) => (
                <div key={r.num} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                  <button
                    onClick={() => setActiveStep(i)}
                    style={{
                      width: '100%', textAlign: 'left', background: 'none', border: 0, padding: '18px 0', cursor: 'pointer',
                      display: 'grid', gridTemplateColumns: '46px minmax(0,1.3fr) minmax(0,1fr) 24px', gap: 18, alignItems: 'center',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--seal-600)', letterSpacing: '0.08em' }}>{r.num}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.016em' }}>{r.title}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.06em' }}>{r.meta}</span>
                    <span style={{ fontSize: 17, color: 'var(--fg-3)', justifySelf: 'end' }}>{activeStep === i ? '−' : '+'}</span>
                  </button>
                  {activeStep === i && (
                    <div style={{ padding: '0 0 22px 64px', maxWidth: '46em' }}>
                      <p style={{ fontSize: 16, lineHeight: 1.6, margin: '0 0 10px' }}>{r.detail}</p>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--moss-700)' }}>→ {r.outcome}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12-WEEK CURRICULUM */}
      <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '96px 24px' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 64, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>The 12-week curriculum</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.12, margin: '16px 0 0' }}>
                Twelve weeks, each one building on the last.
              </h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>Four phases. Each pathway layers its own work on top of this shared spine.</p>
          </div>

          <div style={{ margin: '44px 0 0' }}>
            <div style={{ display: 'flex', borderTop: '1px solid var(--ink-800)', borderBottom: '1px solid var(--border-soft)' }}>
              {PHASES.map((phase, i) => (
                <button
                  key={phase.label}
                  onClick={() => setActivePhase(i)}
                  style={{
                    flex: 1, textAlign: 'left', background: 'none', border: 0, borderRight: i < PHASES.length - 1 ? '1px solid var(--border-soft)' : 0,
                    padding: '16px 18px', cursor: 'pointer', color: activePhase === i ? 'var(--fg-1)' : 'var(--fg-3)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-3)', display: 'block' }}>{phase.range}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.018em' }}>{phase.label}</span>
                </button>
              ))}
            </div>
            <div style={{ height: 3, background: 'var(--border-soft)', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, height: 3, background: 'var(--seal-500)',
                width: `${100 / PHASES.length}%`, marginLeft: `${(activePhase * 100) / PHASES.length}%`,
                transition: 'margin-left 380ms var(--ease-in-out-circ)',
              }} />
            </div>
            <div>
              {PHASES[activePhase].weeks.map((w) => (
                <div key={w.num} style={{ display: 'grid', gridTemplateColumns: '80px minmax(0,1fr) minmax(0,1.5fr)', gap: 24, padding: '22px 0', borderBottom: '1px solid var(--border-soft)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', color: 'var(--seal-600)' }}>{w.num}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, letterSpacing: '-0.016em', lineHeight: 1.25 }}>{w.title}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU WALK OUT WITH */}
      <section style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--paper)' }}>
        <div className="container" style={{ padding: '96px 24px' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 64, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>What you walk out with</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '16px 0 0' }}>Evidence, not attendance.</h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>
              Twelve artefacts per pathway. Each one produced on a real brief, scored against a published rubric, and revised before it enters your portfolio.
            </p>
          </div>
          <div className="accel-2col-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '56px 48px', margin: '48px 0 0' }}>
            {PATHWAY_LIST.map((p) => (
              <div key={p.slug}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--ink-800)', paddingBottom: 10 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600 }}>{p.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--fg-3)' }}>12 ARTEFACTS</span>
                </div>
                {PATHWAY_CONTENT[p.slug].art.map((item, i) => (
                  <div key={item} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: '1px solid var(--border-hair)', fontSize: 15, color: i === 11 ? 'var(--seal-600)' : 'var(--fg-1)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: i === 11 ? 'var(--seal-300)' : 'var(--fg-4)', paddingTop: 3 }}>{String(i + 1).padStart(2, '0')}</span>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '96px 24px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Who this is for</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '16px 0 0' }}>
            Upthrust is not for everyone. That is deliberate.
          </h2>
          <div className="accel-2col-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '44px 0 0' }}>
            <div style={{ background: 'var(--paper)', padding: '32px 30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--moss-500)', paddingBottom: 14 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--moss-50)', border: '1px solid var(--moss-500)', color: 'var(--moss-700)', display: 'grid', placeItems: 'center', fontSize: 12 }}>✓</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600 }}>You&rsquo;ll thrive here if…</span>
              </div>
              {[
                ['Career switchers who are serious', 'Banking, ops, support, healthcare, education, consulting — you are making a move, not dabbling.'],
                ['Diaspora professionals rebuilding', 'You need a portfolio that speaks the language of the market you moved to.'],
                ['People stuck in product-adjacent roles', 'You already do the work. The Passport helps your title catch up to your reality.'],
                ['Early-career professionals filtering out', 'Evidence replaces the "3 years experience required" catch-22.'],
                ['People who will actually do the work', 'Every session. Every assignment. Every revision.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ padding: '14px 0', borderBottom: '1px solid var(--border-hair)' }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
                  <div style={{ fontSize: 14, color: 'var(--fg-2)', marginTop: 3 }}>{desc}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--paper-dim)', padding: '32px 30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--crimson-500)', paddingBottom: 14 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--crimson-50)', border: '1px solid var(--crimson-500)', color: 'var(--crimson-700)', display: 'grid', placeItems: 'center', fontSize: 12 }}>✕</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 600 }}>You probably shouldn&rsquo;t enrol if…</span>
              </div>
              {[
                ['You are collecting certificates', 'We do not lead with credentials, and the work is not optional.'],
                ['You cannot commit 8–10 hours a week', 'Partial engagement produces weak portfolios. Weak portfolios do not impress employers.'],
                ['You expect a guaranteed job', 'We promise readiness, evidence, and confidence — not a hire.'],
                ['You want self-paced video', 'This is live and cohort-based. Upthrust is not a video library.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ padding: '14px 0', borderBottom: '1px solid var(--border-hair)' }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
                  <div style={{ fontSize: 14, color: 'var(--fg-2)', marginTop: 3 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING — geo-locked, no switcher */}
      <section style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--bone-dim)' }}>
        <div className="container" style={{ padding: '96px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Pricing</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '16px 0 0' }}>Two ways to participate. One outcome.</h2>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--fg-3)', textAlign: 'right' }}>
              PRICING FOR<br />{REGION_LABELS[region].toUpperCase()}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '40px 0 0', borderBottom: '1px solid var(--border-soft)', paddingBottom: 20 }}>
            {PATHWAY_LIST.map((p) => (
              <button
                key={p.slug}
                onClick={() => setPricingPathway(p.slug)}
                style={{
                  padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  border: `1px solid ${pricingPathway === p.slug ? 'var(--ink-800)' : 'var(--border-soft)'}`,
                  background: pricingPathway === p.slug ? 'var(--ink-800)' : 'var(--paper)',
                  color: pricingPathway === p.slug ? 'var(--bone)' : 'var(--fg-2)',
                  transition: 'all 150ms',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '32px 0 0' }}>
            <div style={{ background: 'var(--paper)', padding: '34px 32px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>TIER 01</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 27, fontWeight: 600, letterSpacing: '-0.02em', margin: '10px 0 0' }}>Standard</h3>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, letterSpacing: '-0.028em', margin: '18px 0 0', fontVariantNumeric: 'tabular-nums' }}>{formatPrice(price.standard, region)}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>or {formatPrice(price.standardInstallment2, region)} × 2 installments</div>
              <p style={{ fontSize: 15, color: 'var(--fg-2)', margin: '16px 0 0' }}>For self-driven learners who want the live program, the assignments, and the community.</p>
              <div style={{ margin: '22px 0 0' }}>
                {['Live concept classes + labs', 'All program templates', 'Weekly assignments + group feedback', 'Cohort community access', 'Completion certificate'].map((f) => (
                  <div key={f} style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)' }}>{f}</div>
                ))}
                <div style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)', borderBottom: '1px solid var(--border-hair)', color: 'var(--fg-4)' }}>Capability Passport — not included</div>
              </div>
              <span style={{ flex: 1, minHeight: 24 }} />
              <Link href="/enrol?tier=standard" className="btn" style={{ background: 'var(--ink-800)', color: 'var(--bone)', height: 46, justifyContent: 'center', marginTop: 20 }}>Enrol on Standard</Link>
            </div>
            <div style={{ background: 'var(--paper)', padding: '34px 32px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: 'var(--shadow-2)' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--seal-500)', color: 'var(--bone)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', padding: '6px 10px' }}>RECOMMENDED</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>TIER 02</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 27, fontWeight: 600, letterSpacing: '-0.02em', margin: '10px 0 0' }}>Premium</h3>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, letterSpacing: '-0.028em', margin: '18px 0 0', fontVariantNumeric: 'tabular-nums' }}>{formatPrice(price.premium, region)}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>or {formatPrice(price.premiumInstallment2, region)} × 2 installments</div>
              <p style={{ fontSize: 15, color: 'var(--fg-2)', margin: '16px 0 0' }}>For serious career switchers. Everything in Standard, plus review, mock interview, and the Passport.</p>
              <div style={{ margin: '22px 0 0' }}>
                {['Everything in Standard', '1:1 portfolio review session', 'Mock interview with feedback', 'Enhanced facilitator feedback'].map((f) => (
                  <div key={f} style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)' }}>{f}</div>
                ))}
                <div style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)', color: 'var(--seal-600)', fontWeight: 600 }}>Capability Passport eligibility</div>
                <div style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)', borderBottom: '1px solid var(--border-hair)' }}>Demo Day spotlight slot</div>
              </div>
              <span style={{ flex: 1, minHeight: 24 }} />
              <Link href="/enrol?tier=premium" className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 46, justifyContent: 'center', marginTop: 20 }}>Enrol on Premium</Link>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginTop: 20, fontSize: 13, color: 'var(--fg-3)', flexWrap: 'wrap' }}>
            <span>VIP 1:1 mentorship is available on request — raise it on your consultation call.</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em' }}>PROCESSED VIA {REGION_PROCESSOR[region].toUpperCase()} · BANK TRANSFER ON REQUEST</span>
          </div>
        </div>
      </section>

      {/* CAPSTONE BRIEFS */}
      <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '96px 24px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Capstone briefs</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '16px 0 8px' }}>Real briefs. Real industries. You pick one.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: '0 0 40px' }}>
            Eight briefs across fintech, health, logistics, proptech, edtech, and government — each with a version per pathway.
          </p>
          <CapstonesInteractive />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--paper)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '96px 24px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Common questions</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '16px 0 32px' }}>Before you ask.</h2>
          <FAQAccordion items={ACCEL_FAQ} />
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{ background: 'var(--ink-800)', color: 'var(--bone)' }}>
        <div className="container stack-mobile" style={{ padding: '96px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 48, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.028em', lineHeight: 1.1, margin: 0, color: 'var(--bone)' }}>
              Twelve weeks from now, you&rsquo;ll have something to show.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--ink-300)', margin: '14px 0 0' }}>All four pathways run on the same twelve-week spine, starting {COHORT.startDateDisplay}.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 250 }}>
            <Link href="/assessment" className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 50, padding: '0 24px', justifyContent: 'center' }}>Take the assessment</Link>
            <Link href="/consultation" className="btn" style={{ background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', height: 50, padding: '0 24px', justifyContent: 'center' }}>Book a consultation →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
