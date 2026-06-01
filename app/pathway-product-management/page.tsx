import Link from 'next/link';
import PMWeeklyWork from '@/components/PMWeeklyWork';

export default function PMPathwayPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        paddingTop: 'clamp(72px, 10vw, 120px)',
        paddingBottom: 0,
        position: 'relative', overflow: 'hidden',
        background: 'var(--paper)',
      }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, var(--paper-line) 1px, transparent 1px)', backgroundSize: '120px 100%', opacity: 0.35 }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-end' }} className="pm-hero-grid">
            {/* Left: copy */}
            <div style={{ paddingBottom: 'clamp(56px, 7vw, 90px)' }}>
              <div className="badge badge-open" style={{ marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
                Cohort 1 · Open
              </div>
              <p className="eyebrow">The Product Management Pathway</p>
              <h1 className="display-xl text-balance" style={{ marginTop: 16 }}>
                Learn to decide what to build,
                <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}> and why.</span>
              </h1>
              <p className="lede" style={{ marginTop: 24, maxWidth: 520 }}>
                Own the product direction. Write PRDs that teams ship from. Set strategy. Manage trade-offs. The PM pathway builds practitioners, not attendees.
              </p>
              <div className="btn-row-mobile" style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <Link href="/assessment" className="btn btn-primary btn-arrow">Take the Assessment First</Link>
                <Link href="/consultation" className="btn btn-secondary">Book a Consultation</Link>
              </div>
            </div>

            {/* Right: human image — professional in a product strategy session */}
            <div style={{ position: 'relative', alignSelf: 'stretch', minHeight: 440 }} className="pm-hero-3d">
              <div className="hero-img-wrap" style={{ position: 'absolute', inset: 0, borderRadius: '4px 4px 0 0' }}>
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80"
                  alt="Product management team building strategy, execution, and roadmap work"
                  className="hero-img"
                  style={{ height: '100%', minHeight: 440 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,26,46,0.65) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20, padding: '6px 14px', background: 'rgba(15,26,46,0.85)', backdropFilter: 'blur(8px)' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.5625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber-soft)' }}>
                    Own the roadmap
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .pm-hero-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
            .pm-hero-3d { min-height: 280px !important; height: 280px !important; }
            .pm-hero-3d .hero-img-wrap { position: relative !important; height: 280px !important; border-radius: 0 !important; }
          }
        `}</style>
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
                    <span style={{ color: 'var(--amber-deep)', fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', flexShrink: 0, paddingTop: 4 }}>0{i + 1}</span>
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
            <p className="eyebrow">The PM-specific work</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              What you'll actually do — week by week.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              On top of the shared 12-week curriculum, here's where the PM pathway diverges. Each week you produce a tangible PM artefact that becomes part of your portfolio.
            </p>
          </div>
          <PMWeeklyWork />
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
              <p style={{ marginTop: 20, fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', color: 'rgba(250,247,241,0.6)', letterSpacing: '0.1em' }}>
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
              Cohort 1 PM graduates are positioned to compete for the following roles. We don't guarantee any specific outcome — but we make sure your evidence holds up against what these roles actually screen for.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: 20 }}>
            {[
              {
                level: 'Entry level',
                role: 'Associate Product Manager',
                body: 'Entry-level PM roles at startups, scale-ups, and product teams within larger orgs. Your portfolio shows you can already do the work.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="4" y="16" width="6" height="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12"/>
                    <rect x="11" y="10" width="6" height="14" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.25"/>
                    <rect x="18" y="4" width="6" height="20" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.4"/>
                  </svg>
                ),
                levelColor: 'var(--moss)',
                salary: 'Typical range: ₦600K–1.2M / £35K–45K',
              },
              {
                level: 'Entry–Mid',
                role: 'Product Owner',
                body: 'Agile-team-embedded role. Heavier on backlog and stakeholder facilitation. Your PRD and stakeholder simulation work directly applies.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="4" y="10" width="6" height="14" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12"/>
                    <rect x="11" y="6" width="6" height="18" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.35"/>
                    <rect x="18" y="2" width="6" height="22" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.6"/>
                  </svg>
                ),
                levelColor: 'var(--amber-deep)',
                salary: 'Typical range: ₦1M–2M / £40K–55K',
              },
              {
                level: 'Internal move',
                role: 'Junior PM',
                body: 'For learners already in the business — moving from ops, analyst, or PM-adjacent into a defined PM role. Your case study makes the internal pitch credible.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="10" r="6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M4 26 C4 20 8 17 14 17 C20 17 24 20 24 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M18 6 L22 2 M20 2 L22 2 L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                levelColor: 'var(--ink)',
                salary: 'Role upgrade: +30–60% typical salary lift',
              },
            ].map((r) => (
              <div key={r.role} className="card card-hover" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: 'var(--paper-soft)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--ink)',
                  }}>
                    {r.icon}
                  </div>
                  <span style={{
                    fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.5625rem',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    padding: '3px 8px',
                    background: r.levelColor === 'var(--moss)' ? 'rgba(79,106,74,0.1)' : r.levelColor === 'var(--amber-deep)' ? 'rgba(160,90,38,0.1)' : 'rgba(15,26,46,0.08)',
                    color: r.levelColor,
                  }}>{r.level}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.018em', marginBottom: 10 }}>{r.role}</h3>
                  <p className="text-soft" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>{r.body}</p>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--paper-line)' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '0.75rem', color: 'var(--ink-muted)', letterSpacing: '0.02em' }}>{r.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — human touch */}
      <section style={{ background: 'var(--ink)', padding: 'clamp(72px, 10vw, 120px) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="pm-cta-grid">
            {/* Right: human moment — professional at work */}
            <div className="pm-cta-3d" style={{ position: 'relative', height: 340, overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80&auto=format&fit=crop"
                alt="Professional reviewing product work on a laptop"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.7) saturate(0.8)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,26,46,0.4) 0%, transparent 100%)' }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center', padding: '20px 28px',
                background: 'rgba(15,26,46,0.7)', backdropFilter: 'blur(12px)',
                minWidth: 220,
              }}>
                <p style={{ fontFamily: 'Fraunces, serif', fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--paper)', lineHeight: 1 }}>8</p>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.5625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber-soft)', marginTop: 6 }}>Minutes to find out</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--amber-soft)', marginBottom: 20 }}>
                Not sure yet?
              </p>
              <h2 className="display-m text-balance" style={{ color: 'var(--paper)', marginBottom: 20, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
                Is PM actually your fit? Let's find out.
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(250,247,241,0.75)', marginBottom: 32 }}>
                Before committing to a pathway, take the 8-minute Career Assessment. It compares your reflexes against PM, BA, and Design — and tells you, with evidence from your own answers, where you actually fit. Most people who thought they wanted PM either confirm it or discover BA is actually stronger.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <Link href="/assessment" className="btn btn-amber btn-arrow">Take the Assessment — 8 min</Link>
                <Link href="/pathway-business-analysis" className="btn btn-secondary" style={{ background: 'transparent', color: 'var(--paper)', borderColor: 'rgba(250,247,241,0.3)' }}>
                  Compare with BA →
                </Link>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 860px) { section .pm-cta-grid { grid-template-columns: 1fr !important; } section .pm-cta-grid .pm-cta-3d { display: none; } }`}</style>
      </section>
    </>
  );
}
