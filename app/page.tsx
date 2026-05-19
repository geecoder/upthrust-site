import Link from 'next/link';
import Testimonials from '@/components/Testimonials';
import AnimatedHeritage from '@/components/AnimatedHeritage';
import OperatingModelInteractive from '@/components/OperatingModelInteractive';
import FounderPhoto from '@/components/FounderPhoto';

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

      {/* HERITAGE STRIP — animated count-up */}
      <AnimatedHeritage />

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

      {/* OPERATING MODEL — interactive step-through */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <p className="eyebrow">How Upthrust Works</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Four steps. Each one earns the next.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              We don't sell hours of training. We sell a sequence: a way of moving from confusion to capability to evidence, where each step proves you've earned the right to the next one.
            </p>
          </div>
          <OperatingModelInteractive />
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

          <div className="pathways-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.75fr', gap: 24 }}>
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

            {/* Design Cohort 2 - smaller and visually deprioritized */}
            <div className="card design-card" style={{
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--paper)',
              borderStyle: 'dashed',
              borderColor: 'var(--paper-line)',
            }}>
              <div className="badge badge-waitlist" style={{ alignSelf: 'flex-start', marginBottom: 18, fontSize: '0.6875rem' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }}></span>
                Cohort 2
              </div>
              <h3 className="display-s" style={{ fontSize: '1.5rem' }}>Product Design</h3>
              <p className="text-soft" style={{ marginTop: 14, fontSize: '0.875rem', lineHeight: 1.55, flexGrow: 1 }}>
                For people who see the world through user journeys and interface logic. Opens in Cohort 2 once PM and BA delivery is validated.
              </p>
              <div style={{ marginTop: 24 }}>
                <Link href="/assessment" className="btn-ghost btn-arrow" style={{ display: 'inline-block', fontSize: '0.875rem' }}>
                  Join Cohort 2 waitlist
                </Link>
              </div>
            </div>
          </div>
          {/* Responsive: stack on smaller screens */}
          <style>{`
            @media (max-width: 1024px) {
              .pathways-grid {
                grid-template-columns: 1fr 1fr !important;
              }
              .pathways-grid .design-card {
                grid-column: span 2;
                max-width: 480px;
                margin: 0 auto;
              }
            }
            @media (max-width: 700px) {
              .pathways-grid {
                grid-template-columns: 1fr !important;
              }
              .pathways-grid .design-card {
                grid-column: auto;
                max-width: none;
              }
            }
          `}</style>
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
                The Upthrust Capability Passport is a structured evidence record — not a certificate. Every capability area is assessed against a published rubric. Every score is backed by real work you produced. Every Passport is signed by a facilitator who reviewed your capstone.
              </p>
              <p style={{ marginTop: 20, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
                We're honest: the Passport's value grows as our alumni network grows. Today, what you hold is a verifiable, defensible record of your work that you can present in any interview, on any application, to any employer. As Cohort 1 graduates land roles, that record will carry more weight every quarter.
              </p>
              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Capability areas assessed against published rubric', 'Real artefacts produced during the program', 'Capstone defence score and summary', 'Facilitator review and sign-off', 'Shareable digital record with unique Passport ID'].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: 12, fontSize: '0.9375rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--moss)', flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ color: 'var(--ink-soft)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/accelerator" className="btn-ghost btn-arrow" style={{ marginTop: 32, display: 'inline-block' }}>
                See what gets verified
              </Link>
            </div>

            {/* Passport mockup — professional document style */}
            <div style={{ position: 'relative' }}>
              {/* Shadow stack effect */}
              <div aria-hidden style={{
                position: 'absolute', top: 8, left: 8, right: -8, bottom: -8,
                background: 'var(--paper-line)', border: '1px solid var(--paper-line)',
                zIndex: 0,
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                background: 'var(--white)',
                border: '1px solid var(--paper-line)',
                boxShadow: '0 24px 60px -20px rgba(15,26,46,0.2)',
              }}>
                {/* Passport header bar */}
                <div style={{
                  background: 'var(--ink)', padding: '20px 28px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                      <path d="M4 22 L14 6 L24 22 M9 18 L19 18" stroke="var(--paper)" strokeWidth="2" strokeLinecap="square"/>
                    </svg>
                    <span style={{ fontFamily: 'Fraunces, serif', fontSize: '1rem', color: 'var(--paper)', letterSpacing: '-0.01em' }}>Upthrust</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.5625rem', letterSpacing: '0.18em', color: 'var(--amber-soft)', textTransform: 'uppercase' }}>Capability Passport</p>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.5625rem', color: 'rgba(250,247,241,0.45)', marginTop: 2, letterSpacing: '0.1em' }}>ID: UP-C1-0047-BA</p>
                  </div>
                </div>

                <div style={{ padding: '24px 28px' }}>
                  {/* Learner info */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 20, borderBottom: '1px solid var(--paper-line)' }}>
                    <div>
                      <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Adaeze Okonkwo</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--amber-deep)', fontWeight: 500, marginTop: 4 }}>Business Analysis Pathway</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: 2 }}>Cohort 1 · Upthrust Career Capability Accelerator · 2026</p>
                    </div>
                    <div style={{
                      background: 'var(--moss)', color: 'var(--paper)',
                      padding: '6px 10px', textAlign: 'center',
                      fontFamily: 'Manrope, sans-serif', fontSize: '0.5625rem',
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                    }}>
                      VERIFIED<br/>READY
                    </div>
                  </div>

                  {/* Capabilities grid */}
                  <div style={{ marginTop: 20 }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 16 }}>
                      Assessed Capability Areas
                    </p>

                    {[
                      { label: 'Requirements Elicitation & Analysis', level: 'Proficient', score: 87 },
                      { label: 'Stakeholder Management & Facilitation', level: 'Proficient', score: 83 },
                      { label: 'Business Process Modelling', level: 'Developing', score: 71 },
                      { label: 'Solution Design & Documentation (BRD)', level: 'Proficient', score: 89 },
                      { label: 'UAT Planning & Test Scenario Writing', level: 'Proficient', score: 85 },
                      { label: 'Agile Delivery & Backlog Contribution', level: 'Developing', score: 69 },
                    ].map((cap) => (
                      <div key={cap.label} style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                          <span style={{ fontSize: '0.8125rem', color: 'var(--ink)' }}>{cap.label}</span>
                          <span style={{
                            fontFamily: 'Manrope, sans-serif', fontSize: '0.5625rem',
                            letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 6px',
                            background: cap.level === 'Proficient' ? 'rgba(79,106,74,0.12)' : 'rgba(197,116,58,0.1)',
                            color: cap.level === 'Proficient' ? 'var(--moss)' : 'var(--amber-deep)',
                            flexShrink: 0, marginLeft: 8,
                          }}>
                            {cap.level}
                          </span>
                        </div>
                        <div style={{ height: 4, background: 'var(--paper-line)', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', width: `${cap.score}%`,
                            background: cap.level === 'Proficient' ? 'var(--moss)' : 'var(--amber)',
                            borderRadius: 2,
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Capstone summary */}
                  <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--paper-soft)', borderLeft: '3px solid var(--amber)' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber-deep)', marginBottom: 6 }}>
                      Capstone Defence · Week 12
                    </p>
                    <p style={{ fontSize: '0.8125rem', fontStyle: 'italic', lineHeight: 1.55, color: 'var(--ink-soft)' }}>
                      "Adaeze demonstrates strong requirements discipline and clear thinking under ambiguity. Her UAT pack caught three edge cases the scoping team had missed. She is ready for associate-level BA work in a serious product team."
                    </p>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.5625rem', color: 'var(--ink-muted)', marginTop: 8, letterSpacing: '0.08em' }}>
                      — FACILITATOR SIGN-OFF · GENESIS N. ENWENYEOKWU · CBAP
                    </p>
                  </div>

                  {/* Footer */}
                  <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.5625rem', color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>
                      ISSUED: AUGUST 2026 · upthrustdigital.com/verify
                    </p>
                    <div style={{
                      width: 36, height: 36, border: '1px solid var(--paper-line)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Manrope, sans-serif', fontSize: '0.5rem', color: 'var(--ink-muted)',
                      textAlign: 'center', letterSpacing: '0.05em', lineHeight: 1.2,
                    }}>
                      QR<br/>CODE
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample stamp */}
              <div style={{
                position: 'absolute', top: 20, right: -6,
                background: 'var(--amber)', color: 'var(--paper)',
                padding: '4px 8px',
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.5rem', letterSpacing: '0.18em',
                transform: 'rotate(8deg)',
                zIndex: 2,
              }}>
                SAMPLE
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .passport-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
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

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* WHO IS BEHIND THIS — full thought leadership section */}
      <section className="section" style={{ background: 'var(--paper-soft)', padding: 'clamp(80px, 11vw, 140px) 0' }}>
        <div className="container">

          {/* Top header */}
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <p className="eyebrow">Who is behind Upthrust</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Built by someone who has done the work.
              <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}> Every layer of it.</span>
            </h2>
          </div>

          {/* Main grid — photo + credentials left, bio right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 72, alignItems: 'start' }} className="founder-main-grid">

            {/* Left: photo + credential badges */}
            <div>
              <FounderPhoto />

              {/* Name + title */}
              <div style={{ marginTop: 20 }}>
                <p style={{
                  fontFamily: 'Fraunces, serif', fontSize: '1.25rem',
                  fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)',
                }}>Genesis Nneji Enwenyeokwu</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--amber-deep)', marginTop: 4, fontWeight: 500 }}>
                  Founder, Upthrust · Product Lead, Rova
                </p>
              </div>

              {/* Credential badges */}
              <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['CBAP Certified', 'MBA · UEL', 'Product Lead', 'IIBA Nigeria', '10+ Years'].map((badge) => (
                  <span key={badge} style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.625rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', padding: '5px 10px',
                    border: '1px solid var(--paper-line)',
                    color: 'var(--ink-muted)', background: 'var(--white)',
                  }}>
                    {badge}
                  </span>
                ))}
              </div>

              {/* Expertise domains */}
              <div style={{ marginTop: 24, padding: 20, background: 'var(--white)', border: '1px solid var(--paper-line)' }}>
                <p className="eyebrow" style={{ marginBottom: 12, fontSize: '0.625rem' }}>Expertise spans</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { domain: 'Product Management', detail: 'Strategy · Discovery · Delivery' },
                    { domain: 'Business Analysis', detail: 'Requirements · Process · UAT' },
                    { domain: 'Fintech', detail: 'Payments · Wallets · Compliance' },
                    { domain: 'Transformation', detail: 'Digital · Process · Capability' },
                  ].map(({ domain, detail }) => (
                    <div key={domain} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{domain}</span>
                      <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.625rem', color: 'var(--ink-muted)', letterSpacing: '0.06em', textAlign: 'right' }}>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: bio content */}
            <div>
              {/* Opening pull quote */}
              <blockquote style={{
                fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
                fontStyle: 'italic', lineHeight: 1.45, letterSpacing: '-0.02em',
                color: 'var(--ink)', borderLeft: '3px solid var(--amber)',
                paddingLeft: 24, marginBottom: 36,
              }}>
                "Too many talented people were collecting certificates but still struggling to demonstrate real capability. Upthrust is my answer to that problem."
              </blockquote>

              {/* Bio paragraphs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                  Genesis is a Product Lead, CBAP-certified Business Analyst, and MBA graduate from the University of East London — with over a decade of experience across product management, business analysis, digital strategy, process automation, fintech, and technology-enabled transformation. He currently works as a Product Lead at <strong style={{ color: 'var(--ink)' }}>Rova</strong>, building digital financial products for Africans in the diaspora — multi-currency accounts, cross-border payments, remittance journeys, savings products, compliance-led onboarding, and customer engagement improvements.
                </p>

                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                  His career has spanned multiple roles — Business Analyst, Product Owner, Technical Product Manager, Senior Product Manager, Product Lead — across Nigeria, the UK, and the US, supporting organisations in fintech, technology, consulting, NGOs, and digital transformation. This end-to-end experience has given him a rare perspective: not just how to write requirements or manage delivery, but how to connect business strategy, customer needs, technology decisions, regulatory realities, and commercial outcomes into one coherent product direction.
                </p>

                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                  Beyond building products, Genesis has built people. He has trained, mentored, and coached over 1,000 professionals globally, helping career switchers and early-career professionals transition into and grow within business analysis, product management, and digital careers. He also serves within the <strong style={{ color: 'var(--ink)' }}>IIBA Nigeria Chapter</strong>, contributing to the growth of the business analysis profession through leadership, sponsorship, and professional development.
                </p>
              </div>

              {/* Journey callout boxes */}
              <div style={{
                marginTop: 36,
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
              }} className="journey-grid">
                {[
                  { label: 'The problem he kept seeing', body: 'Talented professionals collecting credentials but unable to demonstrate real capability when it counted.' },
                  { label: 'What Upthrust is', body: 'A capability-building ecosystem — not a training platform. Built for professionals who want to become, not just attend.' },
                ].map(({ label, body }) => (
                  <div key={label} style={{
                    padding: '20px 22px',
                    background: 'var(--white)', border: '1px solid var(--paper-line)',
                    borderTop: '3px solid var(--amber)',
                  }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber-deep)', marginBottom: 10 }}>{label}</p>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--ink-soft)' }}>{body}</p>
                  </div>
                ))}
              </div>

              {/* Mission statement */}
              <div style={{
                marginTop: 24, padding: '20px 24px',
                background: 'var(--ink)', color: 'var(--paper)',
              }}>
                <p className="eyebrow-light" style={{ marginBottom: 12 }}>The mission</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    'From learning concepts → to applying them',
                    'From collecting certificates → to building evidence',
                    'From career confusion → to professional clarity',
                    'From potential → to proof',
                  ].map((item) => (
                    <p key={item} style={{ fontSize: '0.9375rem', color: 'rgba(250,247,241,0.85)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--amber)', marginRight: 8 }}>—</span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <Link href="/about" className="btn btn-secondary" style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Full story and background →
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .founder-main-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .journey-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
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
