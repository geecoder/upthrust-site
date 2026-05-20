import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        paddingTop: 'clamp(72px, 10vw, 120px)',
        paddingBottom: 0,
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, var(--paper-line) 1px, transparent 1px)', backgroundSize: '120px 100%', opacity: 0.4 }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-end' }} className="about-hero-grid">
            <div style={{ paddingBottom: 'clamp(56px, 7vw, 90px)' }}>
              <p className="eyebrow">About Upthrust</p>
              <h1 className="display-xl text-balance" style={{ marginTop: 16 }}>
                Trained 1,000+ professionals.
                <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}> Repositioned around what works.</span>
              </h1>
              <p className="lede" style={{ marginTop: 24, maxWidth: 500 }}>
                Since 2019. Now rebuilt around capability and evidence — not certificates and content.
              </p>
            </div>

            {/* Human image — Genesis or team moment */}
            <div style={{ position: 'relative', alignSelf: 'stretch', minHeight: 400 }}>
              <div className="hero-img-wrap" style={{ position: 'absolute', inset: 0, borderRadius: '4px 4px 0 0' }}>
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format&fit=crop&crop=top"
                  alt="Genesis Nneji Enwenyeokwu — founder of Upthrust, product leader and capability builder"
                  className="hero-img"
                  style={{ height: '100%', minHeight: 400 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,26,46,0.65) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20, padding: '6px 14px', background: 'rgba(15,26,46,0.85)', backdropFilter: 'blur(8px)' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.5625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--amber-soft)' }}>
                    Est. 2019 · 1,000+ trained globally
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .about-hero-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
            .about-hero-grid > div:last-child { min-height: 260px !important; height: 260px !important; }
            .about-hero-grid > div:last-child > div { position: relative !important; height: 260px !important; border-radius: 0 !important; }
          }
        `}</style>
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
      <section className="section" style={{ background: 'var(--paper-soft)', padding: 'clamp(80px, 11vw, 130px) 0' }}>
        <div className="container">

          {/* Header */}
          <div style={{ maxWidth: 760, marginBottom: 72 }}>
            <p className="eyebrow">The founder</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Genesis Nneji Enwenyeokwu —
              <span style={{ fontStyle: 'italic', color: 'var(--amber-deep)' }}> practitioner, builder, mentor.</span>
            </h2>
          </div>

          {/* Two-column — photo + credentials / bio */}
          <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 72, alignItems: 'start' }} className="founder-deep-grid">

            {/* Left column */}
            <div>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--ink)' }}>
                  <img
                    src="/images/founder-genesis.jpg"
                    alt="Genesis Nneji Enwenyeokwu, founder of Upthrust"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(1.05) contrast(1.02)' }}
                  />
                </div>
                <div aria-hidden style={{ position: 'absolute', left: -12, top: -12, width: 56, height: 56, borderTop: '2px solid var(--amber)', borderLeft: '2px solid var(--amber)' }} />
                <div aria-hidden style={{ position: 'absolute', right: -12, bottom: -12, width: 56, height: 56, borderBottom: '2px solid var(--ink)', borderRight: '2px solid var(--ink)' }} />
              </div>

              <div style={{ marginTop: 24 }}>
                <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Genesis Nneji Enwenyeokwu</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--amber-deep)', marginTop: 4, fontWeight: 500 }}>Founder & Program Director, Upthrust</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)', marginTop: 2 }}>Product Lead, Rova · IIBA Nigeria Chapter</p>
              </div>

              {/* Credential badges */}
              <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['CBAP Certified', 'MBA · University of East London', 'Product Lead', 'IIBA Nigeria', '10+ Years Experience', 'Nigeria · UK · US'].map((b) => (
                  <span key={b} style={{
                    fontFamily: 'Manrope, sans-serif', fontSize: '0.5625rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '5px 8px', border: '1px solid var(--paper-line)',
                    color: 'var(--ink-muted)', background: 'var(--white)',
                  }}>{b}</span>
                ))}
              </div>

              {/* Expertise matrix */}
              <div style={{ marginTop: 24, border: '1px solid var(--paper-line)', background: 'var(--white)' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--paper-line)' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Expertise spans</p>
                </div>
                {[
                  ['Product Management', 'Strategy · Discovery · Delivery'],
                  ['Business Analysis', 'Requirements · Process · UAT'],
                  ['Fintech', 'Payments · Wallets · Compliance'],
                  ['Design Thinking', 'UX · Service Design · Innovation'],
                  ['Digital Transformation', 'Process · Automation · Change'],
                ].map(([domain, detail]) => (
                  <div key={domain} style={{
                    padding: '10px 16px', borderBottom: '1px solid var(--paper-line)',
                    display: 'flex', justifyContent: 'space-between', gap: 8,
                  }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{domain}</span>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.5625rem', color: 'var(--ink-muted)', letterSpacing: '0.06em', textAlign: 'right' }}>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — full bio */}
            <div>
              {/* Opening quote */}
              <blockquote style={{
                fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
                fontStyle: 'italic', lineHeight: 1.45, letterSpacing: '-0.02em',
                borderLeft: '3px solid var(--amber)', paddingLeft: 28, marginBottom: 40,
              }}>
                "Too many talented people were collecting certificates but still struggling to demonstrate real capability. Upthrust is my answer to that problem."
              </blockquote>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber-deep)', marginBottom: 10 }}>The practitioner</p>
                  <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                    Genesis is a Product Lead, CBAP-certified Business Analyst, and MBA graduate from the University of East London — with over a decade of experience across product management, business analysis, digital strategy, process automation, fintech, and technology-enabled transformation. He has built his career helping organisations move from unclear ideas to well-defined strategies, from fragmented processes to scalable systems, and from customer problems to digital products that create measurable business value. His work spans Nigeria, the UK, and the US.
                  </p>
                </div>

                <div>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber-deep)', marginBottom: 10 }}>The breadth</p>
                  <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                    Over the years, Genesis has operated across multiple roles — Business Analyst, Product Owner, Technical Product Manager, Senior Product Manager, and Product Lead — across fintech, technology, consulting, NGOs, and digital transformation environments. This end-to-end experience has given him a rare perspective: not just how to write requirements or manage delivery, but how to connect business strategy, customer needs, technology decisions, regulatory realities, stakeholder alignment, and commercial outcomes into one coherent product direction.
                  </p>
                </div>

                <div>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber-deep)', marginBottom: 10 }}>Current work at Rova</p>
                  <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                    Genesis currently works as a Product Lead at <strong style={{ color: 'var(--ink)' }}>Rova</strong>, contributing to the development of digital financial products for Africans in the diaspora — multi-currency accounts, cross-border payments, remittance journeys, savings products, compliance-led onboarding, operational tooling, and customer engagement improvements. This hands-on fintech experience has sharpened his ability to operate where customer experience, regulation, technology, operations, and commercial strategy must work together.
                  </p>
                </div>

                <div>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber-deep)', marginBottom: 10 }}>Building people</p>
                  <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>
                    Beyond building products, Genesis has built people. He has trained, mentored, and coached over 1,000 professionals globally — helping career switchers and early-career professionals transition into and grow within business analysis, product management, and digital careers. Many came with ambition but lacked structure, confidence, practical exposure, and evidence of capability. Through his teaching and coaching, Genesis has helped them understand how real product work happens, how to think like professionals, how to engage stakeholders, and how to position themselves in competitive markets. He also serves within the <strong style={{ color: 'var(--ink)' }}>IIBA Nigeria Chapter</strong>, contributing to the growth of the business analysis profession.
                  </p>
                </div>
              </div>

              {/* Mission — from potential to proof */}
              <div style={{ marginTop: 36, background: 'var(--ink)', color: 'var(--paper)', padding: '24px 28px' }}>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber-soft)', marginBottom: 16 }}>
                  His mission through Upthrust
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    'From learning concepts → to applying them',
                    'From collecting certificates → to building evidence',
                    'From career confusion → to professional clarity',
                    'From potential → to proof',
                    'From ambition → to capability',
                  ].map((item) => (
                    <p key={item} style={{ fontSize: '0.9375rem', lineHeight: 1.5, color: 'rgba(250,247,241,0.85)' }}>
                      <span style={{ color: 'var(--amber)', marginRight: 10 }}>—</span>{item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 960px) {
            section .founder-deep-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
        `}</style>
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
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', color: 'var(--amber-deep)', letterSpacing: '0.1em' }}>{principle.num}</p>
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
