import Link from 'next/link';
import Testimonials from '@/components/Testimonials';
import AnimatedHeritage from '@/components/AnimatedHeritage';
import OperatingModelInteractive from '@/components/OperatingModelInteractive';
import FounderPhoto from '@/components/FounderPhoto';
import { LottieOnScroll } from '@/components/LottieOnScroll';

export default function Home() {
  return (
    <>

      {/* HERO */}
      <section style={{
        position: 'relative',
        paddingTop: 'clamp(80px, 11vw, 140px)',
        paddingBottom: 0,
        overflow: 'hidden',
        background: 'var(--paper)',
      }}>
        <div aria-hidden className="hero-bg-accent" />

        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-end' }} className="hero-grid">

            {/* Left: copy */}
            <div style={{ paddingBottom: 'clamp(64px, 8vw, 100px)' }}>
              <div className="rise-in" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--moss)', display: 'inline-block' }} />
                <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--moss)' }}>PM &amp; BA Pathways · Cohort 1 Open</span>
              </div>
              <h1 className="display-xl rise-in delay-1 text-balance" style={{ marginTop: 0 }}>
                Build evidence.<br/>
                <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}>Not just credentials.</span>
              </h1>
              <p className="lede rise-in delay-2" style={{ marginTop: 20, maxWidth: 460 }}>
                12 weeks of real product work, portfolio-grade deliverables, and a verified Capability Passport.
              </p>

              <div className="rise-in delay-3 btn-row-mobile" style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <Link href="/assessment" className="btn btn-primary btn-arrow" data-analytics-event="Hero CTA Clicked">
                  Take the Assessment
                </Link>
                <Link href="/accelerator" className="btn btn-secondary" data-analytics-event="Hero CTA Clicked">
                  Explore the Program
                </Link>
              </div>

              {/* Trust strip */}
              <div className="rise-in delay-4 hero-stat-strip">
                {[
                  { value: '1,000+', label: 'Trained globally' },
                  { value: 'Since 2019', label: 'Established' },
                  { value: 'PM + BA', label: 'Pathways open' },
                ].map(item => (
                  <div key={item.label} className="hero-stat-item">
                    <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1.375rem', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1 }}>{item.value}</p>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: 4 }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Lottie on desktop, image on mobile */}
            <div style={{ position: 'relative', alignSelf: 'stretch', minHeight: 480 }} className="hero-img-side">
              {/* ANIMATION 1 — hero right (desktop only) */}
              <div className="hidden lg:flex items-center justify-center" style={{ position: 'absolute', inset: 0 }}>
                <LottieOnScroll
                  src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie"
                  autoplay={true}
                  loop={true}
                  width={340}
                  height={340}
                  speed={0.7}
                  fallbackIcon="📈"
                />
              </div>
              {/* Image — visible on mobile/tablet, hidden on lg+ */}
              <div className="hero-img-wrap lg:hidden" style={{ position: 'absolute', inset: 0, borderRadius: '4px 4px 0 0' }}>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
                  alt="Product managers and business analysts collaborating in a real workshop session"
                  className="hero-img"
                  style={{ height: '100%', minHeight: 480 }}
                />
                {/* Amber overlay gradient at bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                  background: 'linear-gradient(to top, rgba(15,26,46,0.7) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }} />
                {/* Caption tag */}
                <div style={{
                  position: 'absolute', bottom: 20, left: 20,
                  padding: '6px 12px',
                  background: 'rgba(15,26,46,0.85)',
                  backdropFilter: 'blur(8px)',
                }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.5625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber-soft)' }}>
                    From potential → to proof
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
            .hero-img-side { min-height: 300px !important; height: 300px !important; position: relative !important; }
            .hero-img-side .hero-img-wrap { position: relative !important; height: 300px !important; border-radius: 0 !important; }
          }
        `}</style>
      </section>

      {/* HERITAGE STRIP — animated count-up */}
      <AnimatedHeritage />

      {/* PROBLEM SECTION */}
      <section style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: 'clamp(72px, 10vw, 120px) 0',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="problem-grid">

            {/* Left */}
            <div>
              <p className="eyebrow-light">The problem we solve</p>
              <h2 className="display-l text-balance" style={{ marginTop: 16, color: 'var(--paper)' }}>
                Most people don't have a learning problem.
                <span style={{ display: 'block', color: 'var(--amber-soft)', fontStyle: 'italic' }}>They have a proof problem.</span>
              </h2>
              <p className="lede" style={{ marginTop: 20, color: 'rgba(250,247,241,0.7)' }}>
                Certificates say you attended. A Capability Passport shows what you can do.
              </p>
              <Link href="/accelerator" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginTop: 28, color: 'var(--amber-soft)', fontWeight: 600,
                fontSize: '0.9375rem', borderBottom: '1px solid rgba(241,222,196,0.4)', paddingBottom: 2,
              }}>
                See how it works →
              </Link>
            </div>

            {/* Right: before/after cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { before: '"3 certificates — no callbacks"', after: 'Portfolio + Capability Passport' },
                { before: '"Finished the course, can\'t explain what I built"', after: '12 artefacts defended under review' },
                { before: '"Can\'t show my value in interviews"', after: '10 ready-to-use interview stories' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(250,247,241,0.05)',
                  border: '1px solid rgba(250,247,241,0.1)',
                  padding: '16px 20px',
                  display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center',
                }}>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(250,247,241,0.5)', fontStyle: 'italic', lineHeight: 1.5 }}>{item.before}</p>
                  <span style={{ color: 'var(--amber)', fontSize: '1rem', flexShrink: 0 }}>→</span>
                  <p style={{ fontSize: '0.875rem', color: 'var(--amber-soft)', fontWeight: 600, lineHeight: 1.5 }}>{item.after}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { section .problem-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
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
              A structured sequence from career clarity to verified capability — where every step produces real evidence.
            </p>
          </div>
          {/* ANIMATION 1b — four steps progress path, desktop only */}
          <div className="hidden md:flex justify-center mb-10">
            <LottieOnScroll
              src="https://lottie.host/7efaabd9-0c77-4b52-8b2a-5e56db6b10a8/fzHnVjXCFQ.lottie"
              loop={false}
              width={280}
              height={90}
              threshold={0.4}
              fallbackIcon="→"
            />
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
            <div className="card card-hover" style={{ padding: 36, display: 'flex', flexDirection: 'column', borderTop: '3px solid var(--ink)' }}>
              <div className="badge badge-open" style={{ alignSelf: 'flex-start', marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></span>
                Cohort 1 · Open
              </div>
              <h3 className="display-s">Product Management</h3>
              <p className="text-soft" style={{ marginTop: 12, fontSize: '0.9375rem', lineHeight: 1.6, flexGrow: 1 }}>
                Decide what to build, why, and in what order. Write PRDs teams actually ship from, set strategy, and own the product direction.
              </p>
              <div style={{ marginTop: 24 }}>
                <ul style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Full product case study', 'PRD, roadmap, metrics plan', 'Interview story bank (8–10)'].map(i => (
                    <li key={i} style={{ display: 'flex', gap: 10 }}>
                      <span style={{ color: 'var(--amber-deep)', flexShrink: 0 }}>—</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/pathway-product-management" className="btn-ghost btn-arrow" style={{ marginTop: 24, display: 'inline-block', fontSize: '0.9375rem' }}>
                  Explore PM
                </Link>
              </div>
            </div>

            {/* BA */}
            <div className="card card-hover" style={{ padding: 36, display: 'flex', flexDirection: 'column', borderTop: '3px solid var(--amber-deep)' }}>
              <div className="badge badge-open" style={{ alignSelf: 'flex-start', marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></span>
                Cohort 1 · Open
              </div>
              <h3 className="display-s">Business Analysis</h3>
              <p className="text-soft" style={{ marginTop: 12, fontSize: '0.9375rem', lineHeight: 1.6, flexGrow: 1 }}>
                Turn ambiguous requirements into documentation that ships. Elicit, document, and validate — and run UAT that catches what others miss.
              </p>
              <div style={{ marginTop: 24 }}>
                <ul style={{ fontSize: '0.875rem', color: 'var(--ink-soft)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Full BA case study', 'BRD, process maps, UAT pack', 'Interview story bank (8–10)'].map(i => (
                    <li key={i} style={{ display: 'flex', gap: 10 }}>
                      <span style={{ color: 'var(--amber-deep)', flexShrink: 0 }}>—</span>
                      <span>{i}</span>
                    </li>
                  ))}
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
              <p className="lede" style={{ marginTop: 20, color: 'var(--ink-soft)' }}>
                Every capability is scored against a published rubric, backed by real work you produced, and signed off by a facilitator who reviewed your capstone.
              </p>
              <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Capability areas scored against published rubric',
                  'Real artefacts produced during the program',
                  'Capstone defence score and facilitator sign-off',
                  'Shareable digital record with unique Passport ID',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: 12, fontSize: '0.9375rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--moss)', flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ color: 'var(--ink-soft)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/accelerator" className="btn-ghost btn-arrow" style={{ marginTop: 28, display: 'inline-block' }}>
                See what gets verified
              </Link>
            </div>

            {/* Passport mockup — professional document style */}
            <div style={{ position: 'relative' }}>
              {/* ANIMATION 4 — passport verification, desktop only */}
              <div className="hidden md:flex justify-center mb-6">
                <LottieOnScroll
                  src="https://lottie.host/e6f96dad-66bb-4e90-b3d8-b3b0cbf27e09/KBnXBWcXSd.lottie"
                  loop={false}
                  width={100}
                  height={100}
                  threshold={0.3}
                  fallbackIcon="🏆"
                />
              </div>
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
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <p className="eyebrow">Who Upthrust Is Built For</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Four kinds of people land here.
            </h2>
          </div>

          <div className="grid grid-2" style={{ gap: 40 }}>
            {[
              {
                title: 'The Career Switcher',
                body: 'Years in banking, ops, support, or healthcare — you already have the instincts. You need the language, the artefacts, and the proof.',
                emoji: '🔄',
                lottieUrl: 'https://lottie.host/e2978bab-bf5a-4de4-8e3d-eb5d72aa7a8b/mLCLGWMRLb.lottie',
                loop: true as boolean, speed: 0.8,
              },
              {
                title: 'The Early-Career Professional',
                body: 'You keep getting filtered out for "lack of experience." You need a way to demonstrate capability without waiting five years to be given the chance.',
                emoji: '📍',
                lottieUrl: 'https://lottie.host/b23d71d4-89ae-4e14-8efe-c9d62a374dff/dK6rAXADFh.lottie',
                loop: false as boolean, speed: 1,
              },
              {
                title: 'The International Repositioner',
                body: 'You moved (or are moving) to the UK, Canada, or Australia. Your previous work doesn\'t translate. You need portfolio evidence that reads to a Western product team.',
                emoji: '🌍',
                lottieUrl: 'https://lottie.host/c62b8eca-c7bb-4cbb-83fb-69b03a8f2c47/gBwlVSQ3hY.lottie',
                loop: true as boolean, speed: 0.5,
              },
              {
                title: 'The Quiet Upgrader',
                body: 'Already doing product work — but your title doesn\'t say it and your portfolio doesn\'t show it. You need to formalise what you already do.',
                emoji: '💪',
                lottieUrl: 'https://lottie.host/f10a1ede-9b4d-4c18-b0e3-7f0f4a2b2d51/HtJRFyBKiy.lottie',
                loop: false as boolean, speed: 1,
              },
            ].map((p) => (
              <div key={p.title}>
                <span className="md:hidden text-3xl">{p.emoji}</span>
                <div className="hidden md:block">
                  <LottieOnScroll src={p.lottieUrl} width={52} height={52} loop={p.loop} speed={p.speed} fallbackIcon={p.emoji} />
                </div>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.018em', marginTop: 8 }}>{p.title}</h3>
                <p className="text-soft" style={{ marginTop: 10, fontSize: '1rem', lineHeight: 1.6 }}>{p.body}</p>
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
                paddingLeft: 24, marginBottom: 32,
              }}>
                "Too many talented people were collecting certificates but still struggling to demonstrate real capability. Upthrust is my answer to that problem."
              </blockquote>

              <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                Genesis is a CBAP-certified Product Lead with over a decade spanning product management, business analysis, fintech, and digital transformation across Nigeria, the UK, and the US. He currently works as Product Lead at <strong style={{ color: 'var(--ink)' }}>Rova</strong>, building financial products for the African diaspora. He has trained over 1,000 professionals globally and serves within the <strong style={{ color: 'var(--ink)' }}>IIBA Nigeria Chapter</strong>.
              </p>

              {/* Key fact strip */}
              <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="journey-grid">
                {[
                  { label: 'Roles held', detail: 'BA · Product Owner · TPM · Senior PM · Product Lead' },
                  { label: 'Industries', detail: 'Fintech · Tech · NGO · Consulting · Digital Transformation' },
                  { label: 'Certifications', detail: 'CBAP · MBA (University of East London)' },
                  { label: 'Geography', detail: 'Nigeria · United Kingdom · United States' },
                ].map(({ label, detail }) => (
                  <div key={label} style={{ padding: '16px 18px', background: 'var(--white)', border: '1px solid var(--paper-line)' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber-deep)', marginBottom: 6 }}>{label}</p>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.5, color: 'var(--ink-soft)' }}>{detail}</p>
                  </div>
                ))}
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
