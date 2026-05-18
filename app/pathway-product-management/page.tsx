import Link from 'next/link';

export default function PMPathwayPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        paddingTop: 'clamp(80px, 12vw, 140px)',
        paddingBottom: 'clamp(64px, 8vw, 100px)',
      }}>
        <div className="container">
          <div style={{ maxWidth: 880 }}>
            <div className="badge badge-open" style={{ marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></span>
              Cohort 1 · Open
            </div>
            <p className="eyebrow">The Product Management Pathway</p>
            <h1 className="display-xl text-balance" style={{ marginTop: 20 }}>
              Learn to decide what to build,
              <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}> and why.</span>
            </h1>
            <p className="lede text-pretty" style={{ marginTop: 28, maxWidth: 620 }}>
              The PM pathway is for people who want to own the outcome of product work — not just the requirements, not just the design, but the decision itself. You'll learn to write PRDs that teams actually use, set success metrics that mean something, and defend trade-offs that protect what matters most.
            </p>
            <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <Link href="/assessment" className="btn btn-primary btn-arrow">Take the Assessment First</Link>
              <Link href="/consultation" className="btn btn-secondary">Book a Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64 }} className="who-grid">
            <div>
              <p className="eyebrow">Who chooses PM</p>
              <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
                You probably belong here if…
              </h2>
            </div>
            <div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: '1.0625rem', lineHeight: 1.6 }}>
                {[
                  'You catch yourself asking "but should we even build this?" while everyone else is talking about how to build it.',
                  'You enjoy the discipline of saying no — to features, to scope creep, to good-but-not-strategic ideas.',
                  "You're drawn to outcomes more than outputs. Whether something shipped matters less to you than whether it worked.",
                  'You think in trade-offs. Speed vs quality, scope vs date, this user vs that user — you find these conversations interesting, not frustrating.',
                  "You're comfortable with ambiguity, because product work is mostly figuring out what the right question is before answering it.",
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 14 }}>
                    <span style={{ color: 'var(--amber-deep)', fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', flexShrink: 0, paddingTop: 4 }}>0{i + 1}</span>
                    <span style={{ color: 'var(--ink-soft)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) {
              section .who-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
            }
          `}</style>
        </div>
      </section>

      {/* WHAT YOU'LL ACTUALLY DO */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <p className="eyebrow">The PM-specific work</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              What you'll actually do — week by week.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              On top of the shared 12-week curriculum, here's where the PM pathway diverges. Each week you produce a tangible PM artefact that becomes part of your portfolio.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { wk: 'Week 1', activity: 'Teardown a real product (likely a fintech or health app). Document the strategy you can infer from the product itself.' },
              { wk: 'Week 2', activity: 'Write a problem brief for a real user problem. Define the user, the moment of pain, the current alternative.' },
              { wk: 'Week 3', activity: 'Build a one-page product strategy canvas. North star metric, success measures, MVP scope, what we will not build.' },
              { wk: 'Week 4', activity: 'Write a full PRD for a real feature. Define done. Anticipate edge cases. Make engineering and design able to start.' },
              { wk: 'Week 5', activity: 'Map the end-to-end user journey for your PRD feature. Identify the riskiest moments.' },
              { wk: 'Week 6', activity: 'Review your feature with a design lens. Where does the experience fail? What are you not seeing?' },
              { wk: 'Week 7', activity: 'Walk through a real Figma prototype. Practise reviewing design as a PM — what feedback adds value, what does not.' },
              { wk: 'Week 8', activity: 'Build a sprint backlog from your PRD. Write user stories. Define ready and done. Run a mock sprint planning.' },
              { wk: 'Week 9', activity: 'Practise stakeholder conversations. Vague exec request, conflicting priorities, scope pressure, trade-off escalation.' },
              { wk: 'Week 10', activity: 'Build a launch plan. UAT scope, support readiness, rollout strategy, kill criteria.' },
              { wk: 'Week 11', activity: 'Define your metrics plan. What will you measure in week 1, week 4, week 12. What would tell you to kill the feature.' },
              { wk: 'Week 12', activity: 'Present your full capstone. Defend every decision. Receive Capability Passport assessment.' },
            ].map((week, i) => (
              <div key={week.wk} style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: 32,
                padding: '20px 0',
                borderTop: i === 0 ? '2px solid var(--ink)' : '1px solid var(--paper-line)',
                alignItems: 'start',
              }} className="pm-week-row">
                <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: 'var(--amber-deep)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{week.wk}</p>
                <p className="text-soft" style={{ fontSize: '1rem', lineHeight: 1.6 }}>{week.activity}</p>
              </div>
            ))}
          </div>

          <style>{`
            @media (max-width: 600px) {
              section .pm-week-row {
                grid-template-columns: 1fr !important;
                gap: 4px !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* PORTFOLIO PROOF */}
      <section className="section" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'center' }} className="portfolio-grid">
            <div>
              <p className="eyebrow-light">By Week 12</p>
              <h2 className="display-m text-balance" style={{ marginTop: 16, color: 'var(--paper)' }}>
                A PM portfolio that hiring managers actually want to read.
              </h2>
              <p className="lede" style={{ marginTop: 24, color: 'rgba(250,247,241,0.78)' }}>
                Most PM portfolios are screenshots of features the candidate did not own and bullet points that describe outputs, not decisions. Your portfolio will be different. It will show how you think, what you chose, and why you chose it.
              </p>
              <ul style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9375rem' }}>
                {[
                  'A full case study walking through one product problem end-to-end',
                  'A PRD that another PM would respect',
                  'A roadmap that connects to a clear business goal',
                  'A metrics plan with success and kill criteria',
                  'An interview story bank — 8 to 10 STAR-format stories ready for behavioural interviews',
                  'Your Capability Passport (Premium tier)',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 12 }}>
                    <span style={{ color: 'var(--amber)' }}>—</span>
                    <span style={{ color: 'rgba(250,247,241,0.85)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              background: 'rgba(250,247,241,0.04)',
              border: '1px solid rgba(250,247,241,0.12)',
              padding: 32,
            }}>
              <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1.625rem', lineHeight: 1.3, fontStyle: 'italic', color: 'var(--amber-soft)' }}>
                "A PM portfolio is not a list of features you touched. It is a record of decisions you made — and your reasoning that holds up to scrutiny."
              </p>
              <p style={{ marginTop: 20, fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: 'rgba(250,247,241,0.6)', letterSpacing: '0.1em' }}>
                — UPTHRUST PM CAPABILITY RUBRIC
              </p>
            </div>
          </div>

          <style>{`
            @media (max-width: 900px) {
              section .portfolio-grid {
                grid-template-columns: 1fr !important;
                gap: 40px !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* WHO YOU BECOME */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <p className="eyebrow">After Cohort 1</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Where this can take you.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Cohort 1 graduates from the PM pathway are positioned to compete for the following kinds of roles. We do not guarantee any specific outcome — but we make sure your evidence holds up against what these roles actually screen for.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: 20 }}>
            {[
              { role: 'Associate Product Manager', body: 'Entry-level PM roles at startups, scale-ups, and product teams within larger orgs. Your portfolio shows you can already do the work.' },
              { role: 'Product Owner', body: 'Agile-team-embedded role. Heavier on backlog management and stakeholder facilitation. Your PRD and stakeholder simulation work directly applies.' },
              { role: 'Junior PM (internal move)', body: 'For learners already in the business — moving from ops, analyst, or PM-adjacent into a defined PM role. Your case study makes the internal pitch credible.' },
            ].map((r) => (
              <div key={r.role} className="card" style={{ padding: 28 }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.018em' }}>{r.role}</h3>
                <p className="text-soft" style={{ marginTop: 12, fontSize: '0.9375rem', lineHeight: 1.55 }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--paper-soft)', padding: 'clamp(72px, 10vw, 120px) 0' }}>
        <div className="container-medium" style={{ textAlign: 'center' }}>
          <h2 className="display-m text-balance">
            Is PM actually your fit? Let's find out.
          </h2>
          <p className="lede" style={{ marginTop: 20, color: 'var(--ink-soft)', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            Before you commit to a pathway, take the 8-minute Career Assessment. It will compare your reflexes against PM, BA, and Design — and tell you, with evidence from your own answers, where you actually fit.
          </p>
          <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <Link href="/assessment" className="btn btn-primary btn-arrow">Take the Assessment</Link>
            <Link href="/pathway-business-analysis" className="btn-ghost btn-arrow">Or compare with the BA pathway</Link>
          </div>
        </div>
      </section>
    </>
  );
}
