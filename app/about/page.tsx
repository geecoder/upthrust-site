import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        paddingTop: 'clamp(80px, 12vw, 140px)',
        paddingBottom: 'clamp(64px, 8vw, 100px)',
      }}>
        <div className="container">
          <div style={{ maxWidth: 880 }}>
            <p className="eyebrow">About Upthrust</p>
            <h1 className="display-xl text-balance" style={{ marginTop: 20 }}>
              Trained over 1,000 professionals.
              <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}> Repositioned around what actually works.</span>
            </h1>
            <p className="lede text-pretty" style={{ marginTop: 28, maxWidth: 640 }}>
              Upthrust has been training digital professionals globally since 2019. Cohort 1 of the new Career Capability Accelerator is the result of everything those years taught us about what learners actually need — and what the certificate model can't deliver.
            </p>
          </div>
        </div>
      </section>

      {/* HERITAGE STRIP */}
      <section style={{ borderTop: '1px solid var(--paper-line)', borderBottom: '1px solid var(--paper-line)', padding: '40px 0', background: 'var(--paper-soft)' }}>
        <div className="container">
          <div className="grid grid-4" style={{ gap: 32 }}>
            {[
              { num: '2019', label: 'Year Upthrust was founded' },
              { num: '1,000+', label: 'Professionals trained globally' },
              { num: '4', label: 'Continents represented' },
              { num: '2026', label: 'Year of strategic repositioning' },
            ].map((stat) => (
              <div key={stat.label}>
                <p style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 500, letterSpacing: '-0.022em', color: 'var(--ink)' }}>
                  {stat.num}
                </p>
                <p style={{ marginTop: 4, fontSize: '0.875rem', color: 'var(--ink-muted)', lineHeight: 1.4 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WE'RE REPOSITIONING */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80 }} className="why-grid">
            <div>
              <p className="eyebrow">Why now</p>
              <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
                The honest reason we're repositioning.
              </h2>
            </div>
            <div>
              <p className="lede" style={{ color: 'var(--ink-soft)' }}>
                For years, we ran training programs the way most of the industry runs them — content delivery, projects, certificates. People learned. People graduated. Many got roles. Many did not.
              </p>
              <p style={{ marginTop: 20, fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--ink-soft)' }}>
                But the pattern we kept seeing was uncomfortable: capable people with our certificate still struggled to show employers what they could do. Not because they hadn't learned — but because they'd never been forced to <em>practise the work under real conditions</em>. Watching a PM explain their process is not the same as facing a vague stakeholder request and figuring out what they really mean.
              </p>
              <p style={{ marginTop: 20, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
                Meanwhile, the market shifted. Employers stopped trusting certificates. They started asking for portfolios, case studies, evidence. The bar moved from "what did you study?" to "show me what you can do."
              </p>
              <p style={{ marginTop: 20, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
                So we rebuilt. The Career Capability Accelerator is the result. Same team, same standards, same care for learners — but redesigned around what employers now reward and what learners actually need.
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

      {/* FOUNDER */}
      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container-medium">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'center' }} className="founder-grid">
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '100%',
                aspectRatio: '4/5',
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--ink)',
              }}>
                <img
                  src="/images/founder-genesis.jpg"
                  alt="Genesis Nneji Enwenyeokwu, founder of Upthrust"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(1.05) contrast(1.02)' }}
                />
              </div>
              <div aria-hidden style={{ position: 'absolute', left: -12, top: -12, width: 64, height: 64, borderTop: '2px solid var(--amber)', borderLeft: '2px solid var(--amber)' }}></div>
              <div aria-hidden style={{ position: 'absolute', right: -12, bottom: -12, width: 64, height: 64, borderBottom: '2px solid var(--ink)', borderRight: '2px solid var(--ink)' }}></div>
              <p style={{ marginTop: 20, fontFamily: 'Geist Mono, monospace', fontSize: '0.6875rem', color: 'var(--ink-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Genesis N. Enwenyeokwu · Founder
              </p>
            </div>

            <div>
              <p className="eyebrow">The founder</p>
              <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
                Built by a practitioner, not a course-seller.
              </h2>
              <p style={{ marginTop: 24, fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--ink-soft)' }}>
                Upthrust is led by <strong style={{ color: 'var(--ink)' }}>Genesis Nneji Enwenyeokwu</strong> — a CBAP-certified Business Analyst, Product Lead, and facilitator with over a decade across business analysis, product management, business process automation, and digital product delivery.
              </p>
              <p style={{ marginTop: 16, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
                Genesis has trained, mentored, and coached over 1,000 professionals across Africa, the UK, Canada, Australia, and the global diaspora since 2019. He has shipped real products, written hundreds of BRDs, run countless stakeholder workshops, and learned every lesson the hard way — which is why the Accelerator does not teach theory disconnected from practice.
              </p>
              <p style={{ marginTop: 16, fontSize: '1rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>
                The reason this exists, in his words: <em>"Too many talented people lose confidence — not because they cannot do the work, but because no one ever made them practise it under real conditions. Upthrust is the program I wish had existed when I was switching careers."</em>
              </p>
            </div>
          </div>
          <style>{`
            @media (max-width: 760px) {
              section .founder-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
              section .founder-grid > div:first-child { max-width: 320px; margin: 0 auto; }
            }
          `}</style>
        </div>
      </section>

      {/* WHAT WE STAND FOR */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <p className="eyebrow">What we stand for</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Three things we will not do.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Most education companies grow by saying yes to everything. We grew by saying no.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: 24 }}>
            {[
              { num: '01', title: 'We are not a certificate factory.', body: 'Capability is the product. Evidence is the proof. Certificates exist because the system asks for them — but they are not what we sell.' },
              { num: '02', title: 'We are not an AI-only tool.', body: 'Human mentorship and human judgement are central to how Upthrust works. AI enhances feedback, surfaces patterns, and scales review — but it does not replace mentors.' },
              { num: '03', title: 'We are not a course marketplace.', body: 'We stay narrow on Product Management, Business Analysis, and Product Design until each is proven. No drift into adjacent tracks. No padding the catalogue.' },
            ].map((principle) => (
              <div key={principle.num} className="card" style={{ padding: 32 }}>
                <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.75rem', color: 'var(--amber-deep)', letterSpacing: '0.1em' }}>{principle.num}</p>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.375rem', fontWeight: 500, letterSpacing: '-0.02em', marginTop: 12, lineHeight: 1.25 }}>{principle.title}</h3>
                <p className="text-soft" style={{ marginTop: 14, fontSize: '0.9375rem', lineHeight: 1.6 }}>{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(80px, 11vw, 140px) 0' }}>
        <div className="container-medium" style={{ textAlign: 'center' }}>
          <p className="eyebrow-light">Our promise</p>
          <h2 className="display-l text-balance" style={{ marginTop: 20, color: 'var(--paper)' }}>
            We do not guarantee jobs.<br />
            <span style={{ fontStyle: 'italic', color: 'var(--amber-soft)' }}>We guarantee readiness.</span>
          </h2>
          <p className="lede" style={{ marginTop: 24, color: 'rgba(250,247,241,0.78)', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            What you can show. What you can defend. What you can build under deadline. The story you can tell in an interview. The evidence that backs that story up. That is what we are accountable for.
          </p>
          <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <Link href="/assessment" className="btn btn-amber btn-arrow">Take the Assessment</Link>
            <Link href="/consultation" className="btn btn-secondary" style={{ background: 'transparent', color: 'var(--paper)', borderColor: 'var(--paper)' }}>
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
