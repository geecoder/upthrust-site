import Link from 'next/link';

export default function AcceleratorPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        paddingTop: 'clamp(80px, 12vw, 140px)',
        paddingBottom: 'clamp(64px, 8vw, 100px)',
        position: 'relative',
      }}>
        <div className="container">
          <div style={{ maxWidth: 880 }}>
            <p className="eyebrow">The Upthrust Career Capability Accelerator</p>
            <h1 className="display-xl text-balance" style={{ marginTop: 20 }}>
              Twelve weeks. Real product work.
              <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}> Evidence at the end.</span>
            </h1>
            <p className="lede text-pretty" style={{ marginTop: 28, maxWidth: 640 }}>
              Cohort 1 is the first cohort of the new Upthrust capability-based program. You'll work through realistic product scenarios, build portfolio-grade deliverables, defend your decisions, and earn a Capability Passport that shows what you can actually do — not just what you attended.
            </p>
            <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <Link href="/assessment" className="btn btn-primary btn-arrow">Take the Career Assessment</Link>
              <Link href="/consultation" className="btn btn-secondary">Book a Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section style={{ borderTop: '1px solid var(--paper-line)', borderBottom: '1px solid var(--paper-line)', padding: '40px 0', background: 'var(--paper-soft)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 32,
          }} className="glance-grid">
            {[
              { label: 'Duration', value: '12 weeks' },
              { label: 'Cohort Size', value: '15–25 learners' },
              { label: 'Time Commitment', value: '8–10 hrs/week' },
              { label: 'Pathways', value: 'PM & BA' },
              { label: 'Format', value: 'Live + async' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="eyebrow" style={{ fontSize: '0.6875rem' }}>{stat.label}</p>
                <p style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', fontWeight: 500, marginTop: 8, letterSpacing: '-0.02em' }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 900px) {
              section .glance-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
            }
          `}</style>
        </div>
      </section>

      {/* WHY THIS PROGRAM EXISTS */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80 }} className="why-grid">
            <div>
              <p className="eyebrow">Why this exists</p>
              <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
                The market is moving from credentials to capability.
              </h2>
            </div>
            <div>
              <p className="lede" style={{ color: 'var(--ink-soft)' }}>
                Upthrust has been training digital professionals since 2019. Over the years we have seen the same pattern repeat: people complete courses, collect certificates, and still cannot confidently show employers what they can do.
              </p>
              <p style={{ marginTop: 20, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
                Employers have shifted. They no longer want to know only what you studied. They want to know whether you can think clearly, solve real problems, communicate with stakeholders, work with teams, and produce useful work under pressure.
              </p>
              <p style={{ marginTop: 20, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
                The Career Capability Accelerator is our answer: a deliberate shift away from content-and-certificate training toward verified capability and portfolio evidence. Twelve weeks of doing the work, with mentors who have done it themselves.
              </p>
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) {
              section .why-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
            }
          `}</style>
        </div>
      </section>

      {/* HOW IT WORKS — DETAILED */}
      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <p className="eyebrow">How the Accelerator works</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              The weekly rhythm that turns concept into capability.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Every week is the same shape. Concept. Real case. Lab. Assignment. Feedback. Reflection. This repetition is the point — capability comes from practising the same loop until it becomes second nature.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: 24 }}>
            {[
              { num: '01', title: 'Concept Class', body: 'A live session where the weekly idea is explained in practical, plain language — no abstract theory.' },
              { num: '02', title: 'Real-World Case', body: 'A breakdown of a realistic product scenario that puts the concept in context.' },
              { num: '03', title: 'Practical Lab', body: 'A guided hands-on session where you practise the skill with a facilitator beside you.' },
              { num: '04', title: 'Assignment', body: 'A tangible deliverable you produce — a PRD, a BRD, a process map, a metric plan, a story.' },
              { num: '05', title: 'Feedback', body: 'AI-assisted and human feedback that names what you did well and what needs revision.' },
              { num: '06', title: 'Reflection', body: 'A short written note on how you would explain this work in an interview or to a stakeholder.' },
            ].map((step) => (
              <div key={step.num} className="card" style={{ padding: 28, background: 'var(--paper)' }}>
                <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: 'var(--amber-deep)', letterSpacing: '0.1em' }}>{step.num}</p>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.375rem', fontWeight: 500, letterSpacing: '-0.02em', marginTop: 10 }}>{step.title}</h3>
                <p className="text-soft" style={{ marginTop: 10, fontSize: '0.9375rem', lineHeight: 1.6 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEEKLY CURRICULUM */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <p className="eyebrow">The 12-week curriculum</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Twelve weeks, each one building on the last.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              This is the spine of the program. Specific pathway content (PM vs BA) layers on top of this structure — but every learner moves through the same weekly themes so cross-pathway collaboration is possible.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { wk: 'Week 0', title: 'Onboarding & Diagnostic', body: 'Baseline assessment, tool setup, pathway confirmation, community induction.' },
              { wk: 'Week 1', title: 'Digital Product Foundations', body: 'How real product teams work. The roles of PM, BA, Design, Engineering, QA, Marketing, Ops.' },
              { wk: 'Week 2', title: 'Problem Discovery', body: 'How to define user and business problems clearly before jumping to solutions.' },
              { wk: 'Week 3', title: 'Product Strategy & Business Context', body: 'Connecting problems to business goals, MVP scope, and success measures.' },
              { wk: 'Week 4', title: 'Requirements & Scope', body: 'Turning ideas into clear requirements, user stories, acceptance criteria, and scope boundaries.' },
              { wk: 'Week 5', title: 'Journey, Workflow & Process Design', body: 'Mapping user journeys, business processes, operational workflows, and edge cases.' },
              { wk: 'Week 6', title: 'UX & Product Design Foundations', body: 'Understanding users, personas, journey maps, information architecture.' },
              { wk: 'Week 7', title: 'Prototyping & Design Systems', body: 'How prototypes are built and reviewed. Figma workflows. Design system thinking.' },
              { wk: 'Week 8', title: 'Agile Delivery & Backlog', body: 'Epics, stories, tasks, Definition of Ready, Definition of Done, sprint flow.' },
              { wk: 'Week 9', title: 'Stakeholder Management', body: 'Vague requests, conflicting priorities, scope pressure, trade-off conversations.' },
              { wk: 'Week 10', title: 'Testing, UAT & Launch Readiness', body: 'UAT scenarios, release checklists, support readiness, launch controls.' },
              { wk: 'Week 11', title: 'Metrics & Continuous Improvement', body: 'Defining product success, funnels, activation, retention, feedback loops.' },
              { wk: 'Week 12', title: 'Capstone & Portfolio Defence', body: 'Present your final project. Defend your decisions. Submit evidence for Capability Passport review.' },
            ].map((week, i) => (
              <div key={week.wk} style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 2fr',
                gap: 24,
                padding: '24px 0',
                borderTop: i === 0 ? '2px solid var(--ink)' : '1px solid var(--paper-line)',
                alignItems: 'start',
              }} className="week-row">
                <div>
                  <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: 'var(--amber-deep)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{week.wk}</p>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.018em' }}>{week.title}</h3>
                </div>
                <div>
                  <p className="text-soft" style={{ fontSize: '0.9375rem', lineHeight: 1.55 }}>{week.body}</p>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @media (max-width: 760px) {
              section .week-row {
                grid-template-columns: 1fr !important;
                gap: 8px !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="section" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <p className="eyebrow-light">What you walk out with</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16, color: 'var(--paper)' }}>
              Evidence, not attendance.
            </h2>
            <p className="lede" style={{ marginTop: 20, color: 'rgba(250,247,241,0.78)' }}>
              By Week 12, you have produced a body of work — not a stack of certificates. This is what makes the Capability Passport meaningful, and what makes you ready for real product work.
            </p>
          </div>

          <div className="grid grid-2" style={{ gap: 48 }}>
            <div>
              <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: 'var(--amber-soft)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>If you're on the PM pathway</p>
              <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.9375rem', color: 'rgba(250,247,241,0.85)' }}>
                {['Product teardown', 'Problem brief', 'Product strategy canvas', 'MVP definition + prioritisation', 'Full PRD', 'Roadmap', 'Metrics & success plan', 'Launch brief', 'Capstone presentation', 'Portfolio case study', 'Interview story bank', 'Capability Passport'].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 12, paddingLeft: 0 }}>
                    <span style={{ color: 'var(--amber)', flexShrink: 0 }}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: 'var(--amber-soft)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>If you're on the BA pathway</p>
              <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.9375rem', color: 'rgba(250,247,241,0.85)' }}>
                {['Business case', 'Stakeholder map & RACI', 'Requirements elicitation plan', 'Full BRD', 'Functional + non-functional requirements', 'Process maps', 'User stories + acceptance criteria', 'UAT pack with test scenarios', 'Capstone presentation', 'Portfolio case study', 'Interview story bank', 'Capability Passport'].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 12 }}>
                    <span style={{ color: 'var(--amber)', flexShrink: 0 }}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR / NOT FOR */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: 56 }}>
            <div>
              <p className="eyebrow">Who this is for</p>
              <h3 className="display-s" style={{ marginTop: 16, fontSize: '1.625rem' }}>You'll thrive here if…</h3>
              <ul style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'You are switching careers from banking, ops, support, education, healthcare, admin, or a similar field — and you can see how product roles use the same instincts.',
                  'You are early in your career and keep getting filtered out for "lack of experience."',
                  'You moved to the UK, Canada, or Australia and your previous work does not translate cleanly.',
                  "You're already in a product-adjacent role, doing some of the work, but the title and the portfolio do not reflect it yet.",
                  'You want to put in the work. You are not looking for a shortcut.',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--moss)', flexShrink: 0, fontWeight: 500 }}>✓</span>
                    <span style={{ color: 'var(--ink-soft)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow" style={{ color: 'var(--ink-muted)' }}>Who this isn't for</p>
              <h3 className="display-s" style={{ marginTop: 16, fontSize: '1.625rem' }}>You probably shouldn't enroll if…</h3>
              <ul style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'You only want a certificate. We do not lead with certificates.',
                  'You cannot commit 8–10 hours per week. The program will not work for you part-attended.',
                  'You expect a guaranteed job at the end. We promise readiness, evidence, and confidence — not a hire.',
                  'You want passive video content you watch on your own time. This is live and synchronous-anchored.',
                  'You are not willing to receive feedback or revise your work. Revision is the bulk of the learning.',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--ink-muted)', flexShrink: 0 }}>✕</span>
                    <span style={{ color: 'var(--ink-muted)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <p className="eyebrow">Cohort 1 tiers</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Two ways to participate. One outcome.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              VIP 1:1 mentorship opens in Cohort 2 — we are intentionally proving capacity through PM and BA delivery first. For Cohort 1, you choose between Standard and Premium. Both deliver the program. Premium adds the Capability Passport and portfolio review.
            </p>
          </div>

          <div className="grid grid-2" style={{ gap: 24 }}>
            {/* STANDARD */}
            <div className="card" style={{ padding: 40, display: 'flex', flexDirection: 'column' }}>
              <p className="eyebrow">Tier 01</p>
              <h3 className="display-s" style={{ marginTop: 12, fontSize: '1.875rem' }}>Standard</h3>
              <p className="text-soft" style={{ marginTop: 12, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                For self-driven learners who want the live program, the assignments, and the community — without portfolio review or Passport eligibility.
              </p>
              <ul style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9375rem' }}>
                {['Live concept classes + labs', 'All program templates', 'Weekly assignments + group feedback', 'Cohort community access', 'Completion certificate', 'Capstone submission'].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 10 }}>
                    <span style={{ color: 'var(--moss)' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/consultation" className="btn btn-secondary" style={{ marginTop: 32, alignSelf: 'flex-start' }}>
                Discuss Standard tier
              </Link>
            </div>

            {/* PREMIUM */}
            <div className="card" style={{ padding: 40, display: 'flex', flexDirection: 'column', background: 'var(--white)', border: '2px solid var(--ink)', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: -12,
                right: 24,
                background: 'var(--amber)',
                color: 'var(--paper)',
                padding: '6px 12px',
                fontFamily: 'Geist Mono, monospace',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
              }}>
                MOST CHOSEN
              </div>
              <p className="eyebrow">Tier 02</p>
              <h3 className="display-s" style={{ marginTop: 12, fontSize: '1.875rem' }}>Premium</h3>
              <p className="text-soft" style={{ marginTop: 12, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                For serious career switchers. Everything in Standard, plus enhanced feedback, portfolio review, mock interview, and Capability Passport eligibility.
              </p>
              <ul style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9375rem' }}>
                {['Everything in Standard', '1:1 portfolio review session', 'Mock interview with feedback', 'Enhanced facilitator feedback', 'Capability Passport eligibility', 'Demo Day spotlight slot'].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 10 }}>
                    <span style={{ color: 'var(--moss)' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/consultation" className="btn btn-primary" style={{ marginTop: 32, alignSelf: 'flex-start' }}>
                Discuss Premium tier
              </Link>
            </div>
          </div>

          <div style={{
            marginTop: 32,
            padding: 24,
            background: 'var(--paper)',
            border: '1px dashed var(--paper-line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <div>
              <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1.125rem', fontStyle: 'italic', color: 'var(--ink-soft)' }}>
                VIP 1:1 mentorship
              </p>
              <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: 4 }}>
                Not available in Cohort 1. We are proving mentorship capacity through PM and BA delivery first. Opens in Cohort 2.
              </p>
            </div>
            <Link href="/consultation" className="btn-ghost btn-arrow" style={{ fontSize: '0.875rem' }}>
              Join the VIP waitlist
            </Link>
          </div>

          <p style={{ marginTop: 32, fontSize: '0.875rem', color: 'var(--ink-muted)', fontStyle: 'italic', textAlign: 'center' }}>
            Pricing is shared during the consultation. We use regional pricing — Nigeria/Africa, UK, Canada, Australia are priced differently to reflect local realities.
          </p>
        </div>
      </section>

      {/* CAPSTONE OPTIONS */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <p className="eyebrow">Cohort 1 capstone options</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Real product challenges. You pick one.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Every Cohort 1 learner works on a single capstone over Weeks 8–12. Choose from briefs designed to stretch your pathway and produce portfolio-grade evidence.
            </p>
          </div>

          <div className="grid grid-2" style={{ gap: 20 }}>
            {[
              { title: 'Digital Wallet Onboarding Improvement', body: 'A 60% drop-off problem at identity verification. Diagnose, redesign, and ship a v1 plan.' },
              { title: 'Multi-Currency Savings Product', body: 'Design and scope a savings feature for diaspora users moving money across borders.' },
              { title: 'Health Navigation Support Platform', body: 'A discovery and design problem for a health-tech startup serving lower-income users.' },
              { title: 'SME Invoice & Payment Tool', body: 'Define and document an invoicing and reconciliation product for small businesses.' },
            ].map((cap, i) => (
              <div key={cap.title} className="card" style={{ padding: 28 }}>
                <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.6875rem', color: 'var(--amber-deep)', letterSpacing: '0.1em' }}>BRIEF 0{i + 1}</p>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', fontWeight: 500, marginTop: 10, letterSpacing: '-0.018em' }}>{cap.title}</h3>
                <p className="text-soft" style={{ marginTop: 10, fontSize: '0.9375rem', lineHeight: 1.55 }}>{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <p className="eyebrow">Common questions</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>Before you ask.</h2>
          </div>

          <div style={{ maxWidth: 880 }}>
            {[
              {
                q: 'How much time per week does this actually take?',
                a: 'Plan for 8 to 10 hours per week. That breaks down to roughly: 2 hours of live class, 1 hour of lab, 3 to 4 hours on the assignment, 1 hour of feedback review and revision, and time for reading and reflection. People who try to do it on 4 hours per week tend to fall behind by Week 3.',
              },
              {
                q: 'Do I need tech experience to do this?',
                a: 'No. You do not need to be a developer or have a tech background. You need to be comfortable with computers, willing to learn product vocabulary, and ready to write clearly. Most successful learners come from non-tech backgrounds — banking, operations, customer success, healthcare, education.',
              },
              {
                q: 'Can I join from anywhere?',
                a: 'Yes. Cohort 1 includes learners across Africa, the UK, Canada, Australia, and global diaspora markets. Live sessions are scheduled at times that work for both Africa and UK/Europe time zones. Recordings are always available.',
              },
              {
                q: 'What is the difference between Standard and Premium?',
                a: 'Standard gives you the full live program, the assignments, the community, and a completion certificate. Premium adds: a 1:1 portfolio review session, a mock interview with feedback, enhanced facilitator feedback throughout, and Capability Passport eligibility — the evidence record that summarises what you produced and how you performed. Premium is the recommended tier for serious career switchers.',
              },
              {
                q: 'Will you guarantee me a job?',
                a: 'No, and you should be wary of any program that does. We promise readiness, portfolio evidence, structured practice, and a strong network. Whether you land a role depends on your applications, your interviews, and the market. What we can promise is that you will walk into those interviews with something to show.',
              },
              {
                q: 'What if I cannot afford the full fee?',
                a: 'We offer payment plans for both Standard and Premium tiers. Discuss this on the consultation call — we will work with you on a plan that makes the program accessible without compromising the cohort.',
              },
              {
                q: 'Why is Product Design not in Cohort 1?',
                a: 'Because the quality of a first cohort is a one-shot reputation event. We are launching with PM and BA so we can deliver both at the standard we promise. Product Design opens in Cohort 2, after we have proven PM and BA delivery. If Design is your fit, the Cohort 2 waitlist is the right place to be.',
              },
              {
                q: 'What happens after Week 12?',
                a: 'You graduate with a portfolio, a capstone, and (if Premium tier) a Capability Passport. You join the Upthrust alumni network. We open employer conversations with you, run a Demo Day, and continue to support you as the alumni network grows. The Capability Passport itself becomes more powerful over time as more cohorts graduate and employer recognition deepens.',
              },
            ].map((faq, i) => (
              <details key={i} style={{
                borderTop: i === 0 ? '2px solid var(--ink)' : '1px solid var(--paper-line)',
                padding: '24px 0',
              }}>
                <summary style={{
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 16,
                  fontFamily: 'Fraunces, serif',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  letterSpacing: '-0.018em',
                  color: 'var(--ink)',
                }}>
                  <span>{faq.q}</span>
                  <span style={{ color: 'var(--amber-deep)', fontSize: '1.5rem', lineHeight: 1, transform: 'translateY(-2px)' }}>+</span>
                </summary>
                <p style={{ marginTop: 16, fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 720 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(80px, 11vw, 140px) 0' }}>
        <div className="container-medium" style={{ textAlign: 'center' }}>
          <p className="eyebrow-light">The next move</p>
          <h2 className="display-l text-balance" style={{ marginTop: 20, color: 'var(--paper)' }}>
            Twelve weeks from now,<br />
            <span style={{ fontStyle: 'italic', color: 'var(--amber-soft)' }}>you'll have something to show.</span>
          </h2>
          <p className="lede" style={{ marginTop: 24, color: 'rgba(250,247,241,0.78)', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            The first step is the Career Assessment — 8 minutes, 12 scenarios, a result that quotes your own answers back to you. From there, we'll talk.
          </p>
          <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <Link href="/assessment" className="btn btn-amber btn-arrow">Take the Career Assessment</Link>
            <Link href="/consultation" className="btn btn-secondary" style={{ background: 'transparent', color: 'var(--paper)', borderColor: 'var(--paper)' }}>
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
