import Link from 'next/link';
import BAWeeklyWork from '@/components/BAWeeklyWork';

export default function BAPathwayPage() {
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
            <p className="eyebrow">The Business Analysis Pathway</p>
            <h1 className="display-xl text-balance" style={{ marginTop: 20 }}>
              Make the ambiguous
              <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}> actionable.</span>
            </h1>
            <p className="lede text-pretty" style={{ marginTop: 28, maxWidth: 620 }}>
              The BA pathway is for people who turn chaos into something a team can ship. You'll learn to elicit requirements from stakeholders who do not know what they want, write BRDs that engineers actually use, map processes that surface hidden complexity, and run UAT that catches what others miss. The BA is the spine of every well-functioning product team.
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
              <p className="eyebrow">Who chooses BA</p>
              <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
                You probably belong here if…
              </h2>
            </div>
            <div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: '1.0625rem', lineHeight: 1.6 }}>
                {[
                  'You catch yourself asking "wait, what do you actually mean by that?" when someone gives you a vague requirement.',
                  'You enjoy writing things down. You believe the act of documenting reveals where the thinking is unfinished.',
                  'You think in edge cases. Where most people see a happy path, you see all the ways it can break.',
                  'You like being the bridge between people who do not naturally speak the same language — business and engineering, ops and product.',
                  'You take quiet satisfaction from a process map that captures every step, every exception, every handoff.',
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

      {/* WHAT YOU'LL ACTUALLY DO — interactive grid */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <p className="eyebrow">The BA-specific work</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              What you'll actually do — week by week.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              On top of the shared 12-week curriculum, here's where the BA pathway diverges. Each week produces a tangible BA artefact that lives in your portfolio.
            </p>
          </div>
          <BAWeeklyWork />
        </div>
      </section>

      {/* PORTFOLIO PROOF */}
      <section className="section" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'center' }} className="portfolio-grid">
            <div>
              <p className="eyebrow-light">By Week 12</p>
              <h2 className="display-m text-balance" style={{ marginTop: 16, color: 'var(--paper)' }}>
                A BA portfolio that proves you can deliver from day one.
              </h2>
              <p className="lede" style={{ marginTop: 24, color: 'rgba(250,247,241,0.78)' }}>
                Hiring managers for BA roles screen for one thing above all: <em>can you produce documentation a team can actually act on?</em> Most candidates cannot, so they fall back on generic templates. Yours will be specific, contextual, and traceable to real decisions.
              </p>
              <ul style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9375rem' }}>
                {[
                  'A full case study walking through one business problem end-to-end',
                  'A BRD that another BA would respect',
                  'Current-state and future-state process maps',
                  'User stories with INVEST-grade acceptance criteria',
                  'A complete UAT pack with test scenarios and edge cases',
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
                "A great BA is invisible in the success of a product — but the failure of a product almost always traces back to where one was missing."
              </p>
              <p style={{ marginTop: 20, fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: 'rgba(250,247,241,0.6)', letterSpacing: '0.1em' }}>
                — UPTHRUST BA CAPABILITY RUBRIC
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
              Cohort 1 graduates from the BA pathway are positioned to compete for the following kinds of roles. We do not guarantee any specific outcome — but we make sure your evidence holds up against what these roles actually screen for.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: 20 }}>
            {[
              { role: 'Junior / Associate Business Analyst', body: 'Entry-level BA roles in banks, fintechs, SaaS companies, government, and consultancies. Your BRD and process maps prove you can produce.' },
              { role: 'Product Operations / Product BA', body: 'Hybrid role in product teams — heavy on requirements, requirements traceability, UAT, and process design. Your portfolio reads perfectly for this.' },
              { role: 'Internal Move (Ops → BA)', body: 'For learners already in operations, support, or analyst roles wanting to formalise into BA. Your portfolio makes the internal pitch credible.' },
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
            Is BA actually your fit? Let's find out.
          </h2>
          <p className="lede" style={{ marginTop: 20, color: 'var(--ink-soft)', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            Before you commit to a pathway, take the 8-minute Career Assessment. It will compare your reflexes against PM, BA, and Design — and tell you, with evidence from your own answers, where you actually fit.
          </p>
          <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <Link href="/assessment" className="btn btn-primary btn-arrow">Take the Assessment</Link>
            <Link href="/pathway-product-management" className="btn-ghost btn-arrow">Or compare with the PM pathway</Link>
          </div>
        </div>
      </section>
    </>
  );
}
