import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section style={{
        position: 'relative',
        paddingTop: 'clamp(80px, 12vw, 160px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        overflow: 'hidden',
      }}>
        {/* Decorative grid lines */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to right, var(--paper-line) 1px, transparent 1px)`,
          backgroundSize: '120px 100%',
          opacity: 0.5,
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 920 }}>
            <p className="eyebrow rise-in">A Career Capability Platform · Cohort 1 opens this quarter</p>
            <h1 className="display-xl rise-in delay-1 text-balance" style={{ marginTop: 20 }}>
              Build evidence of what you can do.
              <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}> Not another certificate.</span>
            </h1>
            <p className="lede rise-in delay-2 text-pretty" style={{ marginTop: 28, maxWidth: 620 }}>
              Upthrust is a 12-week practical accelerator for ambitious professionals in Product Management and Business Analysis. You'll work through real product problems, build portfolio-grade deliverables, and earn a Capability Passport that shows employers what you can actually do.
            </p>

            <div className="rise-in delay-3" style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <Link href="/assessment" className="btn btn-primary btn-arrow">
                Take the Career Assessment
              </Link>
              <Link href="/accelerator" className="btn btn-secondary">
                Explore the Accelerator
              </Link>
            </div>

            <div className="rise-in delay-4" style={{ marginTop: 56, display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', fontSize: '0.875rem', color: 'var(--ink-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--moss)' }}></span>
                Built for Africa, the UK, Canada, Australia & global diaspora
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)' }}></span>
                15–25 learners · The first cohort of the new Accelerator
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HERITAGE STRIP */}
      <section style={{
        borderTop: '1px solid var(--paper-line)',
        borderBottom: '1px solid var(--paper-line)',
        padding: '28px 0',
        background: 'var(--paper)',
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <p style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
            fontStyle: 'italic',
            color: 'var(--ink-soft)',
            letterSpacing: '-0.01em',
            maxWidth: 720,
          }}>
            From the team that has trained <span style={{ color: 'var(--ink)', fontStyle: 'normal', fontWeight: 500 }}>1,000+ professionals globally since 2019</span> — now repositioned around verified capability.
          </p>
          <div style={{
            display: 'flex',
            gap: 24,
            fontFamily: 'Geist Mono, monospace',
            fontSize: '0.6875rem',
            color: 'var(--ink-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            <span>Est. 2019</span>
            <span>·</span>
            <span>Lagos · London · Toronto · Sydney</span>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: 'clamp(80px, 11vw, 140px) 0',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }} className="problem-grid">
            <div>
              <p className="eyebrow-light">The Premise</p>
              <h2 className="display-l text-balance" style={{ marginTop: 20, color: 'var(--paper)' }}>
                Most people don't have a learning problem.
              </h2>
              <h2 className="display-l text-balance" style={{ marginTop: 4, color: 'var(--amber-soft)', fontStyle: 'italic' }}>
                They have a proof problem.
              </h2>
            </div>

            <div style={{ paddingTop: 12 }}>
              <p className="lede" style={{ color: 'rgba(250, 247, 241, 0.82)', fontSize: '1.1875rem' }}>
                You've watched the videos. You've finished the courses. You have certificates. And yet, when an employer asks <em style={{ color: 'var(--amber-soft)' }}>"can you show me something you've built?"</em> — you hesitate.
              </p>
              <p style={{ marginTop: 20, color: 'rgba(250, 247, 241, 0.7)', fontSize: '1.0625rem', lineHeight: 1.65 }}>
                That hesitation isn't because you're not smart enough. It's because nothing you've done so far required you to <em>practise the work</em>. Watching a product manager explain their process is not the same as facing a vague stakeholder request and having to figure out what they really want.
              </p>
              <p style={{ marginTop: 20, color: 'rgba(250, 247, 241, 0.7)', fontSize: '1.0625rem', lineHeight: 1.65 }}>
                Upthrust closes that gap. You won't just learn what product roles do. You'll do the work, defend your decisions, and walk out with evidence.
              </p>

              <div style={{ marginTop: 40, display: 'inline-flex', alignItems: 'center', gap: 12, paddingBottom: 4, borderBottom: '1.5px solid var(--amber-soft)' }}>
                <Link href="/accelerator" style={{ color: 'var(--amber-soft)', fontWeight: 500 }}>
                  See how the accelerator works →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            section .problem-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
          }
        `}</style>
      </section>

      {/* OPERATING MODEL */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 72 }}>
            <p className="eyebrow">How Upthrust Works</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Four steps. Each one earns the next.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              We don't sell hours of training. We sell a sequence: a way of moving from confusion to capability to evidence, where each step proves you've earned the right to the next one.
            </p>
          </div>

          <div className="grid grid-4">
            {[
              { num: '01', label: 'Assess', body: 'Diagnose where you are. Our Career Assessment routes you to the pathway that fits how you actually think — Product Management or Business Analysis.' },
              { num: '02', label: 'Build', body: 'Twelve weeks of real product work. Stakeholder simulations, weekly assignments, and a capstone project. Mentorship from practitioners. AI-assisted feedback at scale.' },
              { num: '03', label: 'Verify', body: 'Your work is reviewed against capability rubrics built from how real product teams hire. Pass the bar, and your Capability Passport is issued. Not before.' },
              { num: '04', label: 'Showcase', body: 'Your portfolio, your capstone, your Capability Passport — packaged so employers can see exactly what you can do. Demo day puts you in front of them.' },
            ].map((step) => (
              <div key={step.num} style={{ position: 'relative', paddingTop: 24 }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  fontFamily: 'Fraunces, serif',
                  fontSize: '0.875rem',
                  color: 'var(--amber-deep)',
                  letterSpacing: '0.08em',
                }}>{step.num}</div>
                <div style={{
                  borderTop: '2px solid var(--ink)',
                  paddingTop: 20,
                }}>
                  <h3 className="display-s" style={{ fontSize: '1.5rem' }}>{step.label}</h3>
                  <p className="text-soft" style={{ marginTop: 14, fontSize: '0.9375rem', lineHeight: 1.6 }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PATHWAYS */}
      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 24, marginBottom: 56 }}>
            <div style={{ maxWidth: 600 }}>
              <p className="eyebrow">The Pathways</p>
              <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
                Choose where you'll build evidence.
              </h2>
            </div>
            <Link href="/assessment" className="btn-ghost btn-arrow" style={{ fontSize: '0.9375rem' }}>
              Not sure which fits?
            </Link>
          </div>

          <div className="grid grid-3">
            {/* PM */}
            <div className="card card-hover" style={{ padding: 36, display: 'flex', flexDirection: 'column' }}>
              <div className="badge badge-open" style={{ alignSelf: 'flex-start', marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></span>
                Cohort 1 · Open
              </div>
              <h3 className="display-s">Product Management</h3>
              <p className="text-soft" style={{ marginTop: 16, fontSize: '0.9375rem', lineHeight: 1.6, flexGrow: 1 }}>
                For people who want to decide what to build, why, and in what order. You'll learn to write PRDs, define MVP scope, set success metrics, and lead cross-functional teams through real product decisions.
              </p>
              <div style={{ marginTop: 28 }}>
                <p className="caption text-muted" style={{ fontSize: '0.8125rem', marginBottom: 8 }}>You'll leave with</p>
                <ul style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <li>· A full product case study</li>
                  <li>· PRD, roadmap, metrics plan</li>
                  <li>· Capstone presentation</li>
                </ul>
                <Link href="/pathway-product-management" className="btn-ghost btn-arrow" style={{ marginTop: 24, display: 'inline-block', fontSize: '0.9375rem' }}>
                  Explore PM
                </Link>
              </div>
            </div>

            {/* BA */}
            <div className="card card-hover" style={{ padding: 36, display: 'flex', flexDirection: 'column' }}>
              <div className="badge badge-open" style={{ alignSelf: 'flex-start', marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></span>
                Cohort 1 · Open
              </div>
              <h3 className="display-s">Business Analysis</h3>
              <p className="text-soft" style={{ marginTop: 16, fontSize: '0.9375rem', lineHeight: 1.6, flexGrow: 1 }}>
                For people who structure ambiguity for a living. You'll learn to elicit requirements, map processes, write user stories that engineers actually use, and run UAT that catches what others miss.
              </p>
              <div style={{ marginTop: 28 }}>
                <p className="caption text-muted" style={{ fontSize: '0.8125rem', marginBottom: 8 }}>You'll leave with</p>
                <ul style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <li>· A full BA case study</li>
                  <li>· BRD, process maps, UAT pack</li>
                  <li>· Capstone presentation</li>
                </ul>
                <Link href="/pathway-business-analysis" className="btn-ghost btn-arrow" style={{ marginTop: 24, display: 'inline-block', fontSize: '0.9375rem' }}>
                  Explore BA
                </Link>
              </div>
            </div>

            {/* Design Cohort 2 */}
            <div className="card" style={{
              padding: 36,
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--paper)',
              borderStyle: 'dashed',
              borderColor: 'var(--paper-line)',
            }}>
              <div className="badge badge-waitlist" style={{ alignSelf: 'flex-start', marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></span>
                Cohort 2 · Waitlist
              </div>
              <h3 className="display-s">Product Design</h3>
              <p className="text-soft" style={{ marginTop: 16, fontSize: '0.9375rem', lineHeight: 1.6, flexGrow: 1 }}>
                For people who see the world through user journeys, flows, and interface logic. The Design pathway opens in Cohort 2 once we've proven delivery quality with PM and BA first.
              </p>
              <div style={{ marginTop: 28 }}>
                <p className="caption text-muted" style={{ fontSize: '0.8125rem', marginBottom: 16 }}>
                  Why we're sequencing this way: <em>quality of a first cohort is a one-shot reputation event. We won't dilute it.</em>
                </p>
                <Link href="/assessment" className="btn-ghost btn-arrow" style={{ display: 'inline-block', fontSize: '0.9375rem' }}>
                  Join the Design waitlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITY PASSPORT */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center' }} className="passport-grid">
            <div>
              <p className="eyebrow">The Capability Passport</p>
              <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
                A certificate says you attended. Your Passport shows what you can do.
              </h2>
              <p className="lede" style={{ marginTop: 24, color: 'var(--ink-soft)' }}>
                The Upthrust Capability Passport is an evidence record. Capability areas assessed against a published rubric. Real artefacts you produced. A capstone you defended. A facilitator's signed feedback.
              </p>
              <p style={{ marginTop: 20, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
                We're honest about this: the Passport's value to employers grows as our alumni network grows. Today, what you have is a verifiable, defensible record of your work. As Cohort 1 graduates start landing roles, that record will mean more — to more people — every quarter.
              </p>
              <Link href="/accelerator" className="btn-ghost btn-arrow" style={{ marginTop: 32, display: 'inline-block' }}>
                See what's verified
              </Link>
            </div>

            {/* Passport mockup */}
            <div style={{
              background: 'var(--paper-soft)',
              border: '1px solid var(--paper-line)',
              padding: 36,
              position: 'relative',
              fontSize: '0.875rem',
              boxShadow: '0 24px 60px -28px rgba(15,26,46,0.18)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 20 }}>
                <div>
                  <p className="eyebrow" style={{ fontSize: '0.6875rem' }}>Upthrust Capability Passport</p>
                  <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1.625rem', fontWeight: 500, marginTop: 8, letterSpacing: '-0.02em' }}>Adaeze O.</p>
                  <p className="text-muted" style={{ fontSize: '0.8125rem', marginTop: 2 }}>Business Analysis · Cohort 1 · 2026</p>
                </div>
                <div style={{
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '0.625rem',
                  letterSpacing: '0.08em',
                  color: 'var(--ink-muted)',
                  textAlign: 'right',
                }}>
                  VERIFIED<br/>
                  ID 0142-BA
                </div>
              </div>

              <div style={{ height: 1, background: 'var(--paper-line)', margin: '20px 0' }}></div>

              <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Verified Capabilities</p>

              {[
                { label: 'Requirements Documentation', level: 'Strong', value: 88 },
                { label: 'Stakeholder Analysis', level: 'Strong', value: 84 },
                { label: 'Process Mapping', level: 'Developing', value: 68 },
                { label: 'UAT Planning', level: 'Strong', value: 86 },
              ].map((cap, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: 6 }}>
                    <span>{cap.label}</span>
                    <span style={{ color: cap.level === 'Strong' ? 'var(--moss)' : 'var(--amber-deep)', fontFamily: 'Geist Mono, monospace', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cap.level}</span>
                  </div>
                  <div style={{ height: 3, background: 'var(--paper-line)', position: 'relative' }}>
                    <div style={{ height: '100%', width: `${cap.value}%`, background: cap.level === 'Strong' ? 'var(--moss)' : 'var(--amber)' }}></div>
                  </div>
                </div>
              ))}

              <div style={{ height: 1, background: 'var(--paper-line)', margin: '20px 0' }}></div>

              <p className="text-soft" style={{ fontSize: '0.8125rem', fontStyle: 'italic', lineHeight: 1.55 }}>
                "Adaeze demonstrates strong requirements thinking and clear documentation discipline. Her UAT pack caught three edge cases the original PM had missed. She is ready for associate-level BA work in a serious product team."
              </p>
              <p className="text-muted" style={{ fontSize: '0.6875rem', marginTop: 10, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.05em' }}>
                — FACILITATOR REVIEW · CAPSTONE WK 12
              </p>

              <div style={{
                position: 'absolute',
                top: 36,
                right: -10,
                background: 'var(--amber)',
                color: 'var(--paper)',
                padding: '4px 8px',
                fontFamily: 'Geist Mono, monospace',
                fontSize: '0.5625rem',
                letterSpacing: '0.15em',
                transform: 'rotate(8deg)',
              }}>
                SAMPLE
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .passport-grid {
                grid-template-columns: 1fr !important;
                gap: 48px !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section style={{ padding: '60px 0 100px' }}>
        <div className="container-medium">
          <div className="divider-amber"></div>
          <p className="pull-quote text-balance">
            The future of work will not reward people only for what they studied. It will reward people for what they can prove they can do.
          </p>
          <p className="eyebrow" style={{ marginTop: 24 }}>The Upthrust Premise</p>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <p className="eyebrow">Who Upthrust Is Built For</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Four kinds of people land here. They tend to recognise themselves quickly.
            </h2>
          </div>

          <div className="grid grid-2" style={{ gap: 48 }}>
            {[
              {
                title: 'The Career Switcher',
                body: 'You\'ve spent years in banking, ops, support, admin, teaching, or healthcare. You can see how product roles use the exact instincts you\'ve already built — you just need the language, the artefacts, and the proof.',
              },
              {
                title: 'The Early-Career Professional',
                body: 'You graduated. Maybe you got a junior role. But you keep getting filtered out for "lack of experience." You need a way to demonstrate experience without waiting five years to be given the chance.',
              },
              {
                title: 'The International Repositioner',
                body: 'You moved to the UK, Canada, or Australia. Or you\'re planning to. Your previous work doesn\'t translate cleanly. You need portfolio evidence that reads to a Western product team and a story that lands in 30 seconds.',
              },
              {
                title: 'The Quiet Upgrader',
                body: 'You\'re already in a product-adjacent role. You\'re doing some of the work. But your title doesn\'t say it, your portfolio doesn\'t show it, and your career growth has stalled. You need to formalise what you already do.',
              },
            ].map((p) => (
              <div key={p.title}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.018em' }}>{p.title}</h3>
                <p className="text-soft" style={{ marginTop: 12, fontSize: '1rem', lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, textAlign: 'center' }}>
            <Link href="/assessment" className="btn btn-primary btn-arrow">
              Take the Career Assessment — 8 minutes
            </Link>
          </div>
        </div>
      </section>

      {/* FOUNDER STRIP */}
      <section className="section">
        <div className="container-medium">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56, alignItems: 'start' }} className="founder-grid">
            <div>
              {/* Founder photo placeholder — replace with real image */}
              <div style={{
                width: '100%',
                aspectRatio: '4/5',
                background: 'linear-gradient(180deg, var(--paper-soft) 0%, var(--paper-line) 100%)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Fraunces, serif',
                  fontSize: '4rem',
                  color: 'var(--ink-muted)',
                  fontStyle: 'italic',
                  opacity: 0.4,
                }}>
                  G
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '0.6875rem',
                  color: 'var(--ink-muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  [Founder photo — to add]
                </div>
              </div>
            </div>

            <div>
              <p className="eyebrow">Who is behind this</p>
              <h2 className="display-s text-balance" style={{ marginTop: 16 }}>
                Built by a practitioner, not a course-seller.
              </h2>
              <p style={{ marginTop: 24, fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--ink-soft)' }}>
                Upthrust is led by <strong style={{ color: 'var(--ink)' }}>Genesis Nneji Enwenyeokwu</strong> — a CBAP-certified Business Analyst, Product Lead, and facilitator with over a decade across business analysis, product management, business process automation, and digital product delivery.
              </p>
              <p style={{ marginTop: 16, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
                Upthrust has trained over 1,000 professionals globally since 2019. Years of running training programs taught us what works — and what does not. The Career Capability Accelerator is the result: a deliberate repositioning of Upthrust around capability and evidence, not certificates and content. It is the program we wish had existed when we started.
              </p>
              <Link href="/about" className="btn-ghost btn-arrow" style={{ marginTop: 28, display: 'inline-block' }}>
                More about Upthrust
              </Link>
            </div>
          </div>
          <style>{`
            @media (max-width: 760px) {
              .founder-grid {
                grid-template-columns: 1fr !important;
                gap: 32px !important;
              }
              .founder-grid > div:first-child {
                max-width: 280px;
              }
            }
          `}</style>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: 'clamp(80px, 11vw, 140px) 0',
      }}>
        <div className="container-medium" style={{ textAlign: 'center' }}>
          <p className="eyebrow-light">The next move</p>
          <h2 className="display-l text-balance" style={{ marginTop: 20, color: 'var(--paper)' }}>
            Stop collecting certificates.<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--amber-soft)' }}>Start building evidence.</span>
          </h2>
          <p className="lede" style={{ marginTop: 24, color: 'rgba(250, 247, 241, 0.75)', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            The Career Assessment takes 8 minutes. It tells you something true about how you think — not just which pathway fits, but how you'd approach real product problems.
          </p>
          <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <Link href="/assessment" className="btn btn-amber btn-arrow">
              Take the Assessment
            </Link>
            <Link href="/consultation" className="btn btn-secondary" style={{ background: 'transparent', color: 'var(--paper)', borderColor: 'var(--paper)' }}>
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
