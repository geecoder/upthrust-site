import Link from 'next/link';
import PMWeeklyWork from '@/components/PMWeeklyWork';

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
            {/* SVG illustration */}
            <div>
              <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxHeight: 280 }}>
                <pattern id="cta-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(250,247,241,0.06)" strokeWidth="0.5"/>
                </pattern>
                <rect width="480" height="340" fill="url(#cta-grid)"/>
                {/* Person at laptop */}
                <rect x="60" y="140" width="240" height="160" rx="4" fill="rgba(250,247,241,0.06)" stroke="rgba(250,247,241,0.15)" strokeWidth="1"/>
                <rect x="60" y="140" width="240" height="20" rx="4" fill="rgba(250,247,241,0.1)"/>
                {/* Screen content */}
                <rect x="80" y="172" width="80" height="8" rx="2" fill="rgba(250,247,241,0.3)"/>
                <rect x="80" y="186" width="120" height="5" rx="2" fill="rgba(250,247,241,0.15)"/>
                <rect x="80" y="196" width="100" height="5" rx="2" fill="rgba(250,247,241,0.15)"/>
                <rect x="80" y="216" width="160" height="40" rx="2" fill="rgba(197,116,58,0.15)" stroke="rgba(197,116,58,0.3)" strokeWidth="1"/>
                <text x="160" y="241" fill="rgba(197,116,58,0.9)" fontFamily="serif" fontSize="11" fontStyle="italic" textAnchor="middle">PRD · v2.0</text>
                {/* Person silhouette */}
                <circle cx="360" cy="180" r="28" fill="rgba(250,247,241,0.2)"/>
                <circle cx="360" cy="180" r="22" fill="rgba(250,247,241,0.9)"/>
                <path d="M336 230 Q360 215 384 230 L392 300 L328 300 Z" fill="rgba(250,247,241,0.8)"/>
                {/* Thinking lines */}
                <circle cx="400" cy="140" r="4" fill="rgba(197,116,58,0.5)"/>
                <circle cx="416" cy="120" r="6" fill="rgba(197,116,58,0.4)"/>
                <circle cx="438" cy="96" r="10" fill="rgba(197,116,58,0.3)" stroke="rgba(197,116,58,0.5)" strokeWidth="1"/>
                <text x="438" y="101" fill="rgba(197,116,58,0.9)" fontFamily="serif" fontSize="10" fontStyle="italic" textAnchor="middle">?</text>
              </svg>
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
        <style>{`@media (max-width: 860px) { section .pm-cta-grid { grid-template-columns: 1fr !important; } section .pm-cta-grid > div:first-child { display: none; } }`}</style>
      </section>
    </>
  );
}
