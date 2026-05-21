import Link from 'next/link';
import BAWeeklyWork from '@/components/BAWeeklyWork';

export default function BAPathwayPage() {
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-end' }} className="ba-hero-grid">
            {/* Left: copy */}
            <div style={{ paddingBottom: 'clamp(56px, 7vw, 90px)' }}>
              <div className="badge badge-open" style={{ marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
                Cohort 1 · Open
              </div>
              <p className="eyebrow">The Business Analysis Pathway</p>
              <h1 className="display-xl text-balance" style={{ marginTop: 16 }}>
                Make the ambiguous
                <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}> actionable.</span>
              </h1>
              <p className="lede" style={{ marginTop: 24, maxWidth: 520 }}>
                Turn chaos into clarity. Elicit requirements, map processes, write BRDs that ship, and run UAT that catches what others miss. The BA is the spine of every well-functioning product team.
              </p>
              <div className="btn-row-mobile" style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <Link href="/assessment" className="btn btn-primary btn-arrow">Take the Assessment First</Link>
                <Link href="/consultation" className="btn btn-secondary">Book a Consultation</Link>
              </div>
            </div>

            {/* Right: human image — BA professional mapping a process */}
            <div style={{ position: 'relative', alignSelf: 'stretch', minHeight: 440 }} className="ba-hero-3d">
              <div className="hero-img-wrap" style={{ position: 'absolute', inset: 0, borderRadius: '4px 4px 0 0' }}>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop"
                  alt="Business analyst facilitating a requirements workshop with stakeholders"
                  className="hero-img"
                  style={{ height: '100%', minHeight: 440 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,26,46,0.65) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20, padding: '6px 14px', background: 'rgba(15,26,46,0.85)', backdropFilter: 'blur(8px)' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.5625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber-soft)' }}>
                    From ambiguity to clarity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .ba-hero-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
            .ba-hero-3d { min-height: 280px !important; height: 280px !important; }
            .ba-hero-3d .hero-img-wrap { position: relative !important; height: 280px !important; border-radius: 0 !important; }
          }
        `}</style>
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
              <p style={{ marginTop: 20, fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', color: 'rgba(250,247,241,0.6)', letterSpacing: '0.1em' }}>
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
              Cohort 1 BA graduates are positioned to compete for the following roles. We don't guarantee any specific outcome — but we make sure your evidence holds up against what these roles actually screen for.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: 20 }}>
            {[
              {
                level: 'Entry level',
                role: 'Junior / Associate Business Analyst',
                body: 'Entry-level BA roles in banks, fintechs, SaaS, government, and consultancies. Your BRD and process maps prove you can produce on day one.',
                levelColor: 'var(--moss)',
                salary: 'Typical: ₦500K–1M / £30K–42K',
                iconPath: 'M10 9 h8 M10 13 h8 M10 17 h5',
              },
              {
                level: 'Entry–Mid',
                role: 'Product Operations / Product BA',
                body: 'Hybrid role in product teams — requirements, traceability, UAT, and process design. Your portfolio reads perfectly for this growing title.',
                levelColor: 'var(--amber-deep)',
                salary: 'Typical: ₦800K–1.8M / £35K–50K',
                iconPath: 'M8 8 h12 M8 14 h8 M8 20 h10',
              },
              {
                level: 'Internal move',
                role: 'Ops / Support → Business Analyst',
                body: 'For learners in operations, support, or analyst roles formalising into BA. Your portfolio makes the internal pitch credible and specific.',
                levelColor: 'var(--ink)',
                salary: 'Role upgrade: +25–50% typical salary lift',
                iconPath: 'M6 22 L6 10 M14 22 L14 6 M22 22 L22 14',
              },
            ].map((r) => (
              <div key={r.role} className="card card-hover" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--paper-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <rect x="6" y="4" width="16" height="20" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                      <path d={r.iconPath} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 8px', background: 'rgba(15,26,46,0.06)', color: r.levelColor }}>{r.level}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.018em', marginBottom: 10 }}>{r.role}</h3>
                  <p className="text-soft" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>{r.body}</p>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--paper-line)' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{r.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--ink)', padding: 'clamp(72px, 10vw, 120px) 0' }}>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--amber-soft)', marginBottom: 20 }}>Not sure yet?</p>
            <h2 className="display-m text-balance" style={{ color: 'var(--paper)', marginBottom: 20, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
              Is BA actually your fit? Let's find out.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(250,247,241,0.75)', marginBottom: 32 }}>
              Before committing, take the 8-minute Career Assessment. It compares your reflexes against PM, BA, and Design — and tells you, with evidence from your own answers, where you actually fit. The best BA practitioners often discover their instincts in the assessment before they can name them.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <Link href="/assessment" className="btn btn-amber btn-arrow">Take the Assessment — 8 min</Link>
              <Link href="/pathway-product-management" className="btn btn-secondary" style={{ background: 'transparent', color: 'var(--paper)', borderColor: 'rgba(250,247,241,0.3)' }}>
                Compare with PM →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
