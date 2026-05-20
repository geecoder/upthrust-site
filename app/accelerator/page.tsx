import Link from 'next/link';
import Pricing from '@/components/Pricing';
import CurriculumInteractive from '@/components/CurriculumInteractive';
import WeeklyRhythmInteractive from '@/components/WeeklyRhythmInteractive';
import WhyNowVisual from '@/components/WhyNowVisual';
import WhoIsForSection from '@/components/WhoIsForSection';
import CapstonesInteractive from '@/components/CapstonesInteractive';
import FAQInteractive from '@/components/FAQInteractive';
import { AcceleratorHeroWrapper } from '@/components/Scene3D';

export default function AcceleratorPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        paddingTop: 'clamp(80px, 12vw, 140px)',
        paddingBottom: 'clamp(64px, 8vw, 100px)',
        background: 'var(--paper)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, var(--paper-line) 1px, transparent 1px)', backgroundSize: '120px 100%', opacity: 0.4, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="accel-hero-grid">
            {/* Left: copy */}
            <div>
              <p className="eyebrow">The Upthrust Career Capability Accelerator</p>
              <h1 className="display-xl text-balance" style={{ marginTop: 20 }}>
                Twelve weeks. Real product work.
                <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}> Evidence at the end.</span>
              </h1>
              <p className="lede text-pretty" style={{ marginTop: 28, maxWidth: 560 }}>
                Cohort 1 is the first cohort of the new Upthrust capability-based program. Work through realistic scenarios, build portfolio-grade deliverables, defend your decisions, and earn a Capability Passport that shows what you can actually do.
              </p>
              <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <Link href="/assessment" className="btn btn-primary btn-arrow">Take the Career Assessment</Link>
                <Link href="/consultation" className="btn btn-secondary">Book a Consultation</Link>
              </div>
            </div>

            {/* Right: 3D orbiting capability illustration */}
            <div className="accel-hero-3d">
              <AcceleratorHeroWrapper height={460} />
              <p style={{ marginTop: 8, textAlign: 'center', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.5625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                PM · BA · UX — the capabilities you'll build
              </p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .accel-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .accel-hero-3d { max-width: 480px; margin: 0 auto; }
          }
        `}</style>
      </section>

      {/* AT A GLANCE */}
      <section style={{ borderTop: '1px solid var(--paper-line)', borderBottom: '1px solid var(--paper-line)', padding: '40px 0', background: 'var(--ink)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 32 }} className="glance-grid">
            {[
              { label: 'Duration', value: '12 weeks' },
              { label: 'Cohort size', value: '15–25' },
              { label: 'Time / week', value: '8–10 hrs' },
              { label: 'Pathways', value: 'PM & BA' },
              { label: 'Format', value: 'Live + async' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.625rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(250,247,241,0.5)', marginBottom: 8 }}>{stat.label}</p>
                <p style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--paper)' }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 900px) { section .glance-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; } }`}</style>
        </div>
      </section>

      {/* WHY THIS EXISTS — visual */}
      <section className="section">
        <div className="container">
          <WhyNowVisual />
        </div>
      </section>

      {/* HOW IT WORKS — interactive rhythm */}
      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <p className="eyebrow">How the Accelerator works</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              The weekly rhythm that turns concept into capability.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Every week is the same six-step shape. Concept. Real case. Lab. Assignment. Feedback. Reflection. This repetition is the point — capability comes from practising the same loop until it becomes second nature.
            </p>
          </div>
          <WeeklyRhythmInteractive />
        </div>
      </section>

      {/* 12-WEEK CURRICULUM — interactive tabs */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <p className="eyebrow">The 12-week curriculum</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Twelve weeks, each one building on the last.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              The program runs in four phases. Select a phase to explore the weekly content. PM and BA pathway-specific work layers on top of this shared curriculum.
            </p>
          </div>
          <CurriculumInteractive />
        </div>
      </section>

      {/* WHAT YOU WALK OUT WITH */}
      <section className="section" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <p className="eyebrow-light">What you walk out with</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16, color: 'var(--paper)' }}>
              Evidence, not attendance.
            </h2>
            <p className="lede" style={{ marginTop: 20, color: 'rgba(250,247,241,0.78)' }}>
              By Week 12 you have produced a body of real work — not a stack of certificates. This is what makes the Capability Passport meaningful, and what makes you ready for real product roles.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="deliverables-grid">
            {[
              {
                pathway: 'PM Pathway',
                color: 'var(--ink)',
                accent: 'var(--amber)',
                items: ['Product teardown + strategy analysis', 'Problem brief', 'Product strategy canvas', 'Full PRD with edge cases', 'User journey map', 'Sprint backlog', 'Metrics + kill criteria plan', 'Launch brief', 'Capstone project + presentation', 'Portfolio case study', 'Interview story bank (8–10 stories)', 'Capability Passport (Premium)'],
              },
              {
                pathway: 'BA Pathway',
                color: 'var(--amber-deep)',
                accent: 'var(--amber)',
                items: ['Stakeholder map + RACI', 'Business case', 'Requirements elicitation notes', 'Full BRD (functional + non-functional)', 'As-Is / To-Be process maps', 'User stories with acceptance criteria', 'UAT pack + test scenarios', 'Post-launch reporting framework', 'Capstone project + presentation', 'Portfolio case study', 'Interview story bank (8–10 stories)', 'Capability Passport (Premium)'],
              },
            ].map((section) => (
              <div key={section.pathway} style={{
                padding: '32px',
                background: 'rgba(250,247,241,0.04)',
                border: '1px solid rgba(250,247,241,0.12)',
                borderTop: `3px solid ${section.accent}`,
              }}>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: section.accent, marginBottom: 24 }}>{section.pathway}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, fontSize: '0.9375rem', color: i === section.items.length - 1 ? section.accent : 'rgba(250,247,241,0.82)', fontWeight: i === section.items.length - 1 ? 500 : 400 }}>
                      <span style={{ color: section.accent, flexShrink: 0 }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <style>{`@media (max-width: 760px) { section .deliverables-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* WHO THIS IS FOR / NOT FOR */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <p className="eyebrow">Who this is for</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Upthrust is not for everyone. That is deliberate.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              A selective, serious cohort produces better outcomes than a large, passive one. Read both sides before enrolling.
            </p>
          </div>
          <WhoIsForSection />
        </div>
      </section>

      {/* TIERS / PRICING */}
      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <p className="eyebrow">Cohort 1 tiers</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Two ways to participate. One outcome.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Pricing is set regionally — Nigeria/Africa, UK, Canada, and US are priced differently to reflect local realities. The selector below automatically detects your location.
            </p>
          </div>
          <Pricing />
        </div>
      </section>

      {/* CAPSTONE OPTIONS */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <p className="eyebrow">Cohort 1 capstone projects</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>
              Real briefs. Real industries. You pick one.
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Eight real product briefs — spanning fintech, health tech, logistics, proptech, edtech, and government. Each has a PM-specific and a BA-specific version. Filter by region or difficulty, then click to see your brief.
            </p>
          </div>
          <CapstonesInteractive />
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--paper-soft)' }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <p className="eyebrow">Common questions</p>
            <h2 className="display-m text-balance" style={{ marginTop: 16 }}>Before you ask.</h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Everything we get asked before enrollment. If your question is not here, the consultation call is where we answer it.
            </p>
          </div>
          <FAQInteractive />
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(80px, 11vw, 140px) 0' }}>
        <div className="container-medium" style={{ textAlign: 'center' }}>
          <p className="eyebrow-light">The next move</p>
          <h2 className="display-l text-balance" style={{ marginTop: 20, color: 'var(--paper)' }}>
            Twelve weeks from now,<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--amber-soft)' }}>you'll have something to show.</span>
          </h2>
          <p className="lede" style={{ marginTop: 24, color: 'rgba(250,247,241,0.78)', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            The first step is the Career Assessment — 8 minutes, 12 scenarios, a result that quotes your own answers back to you. From there, we talk.
          </p>
          <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <Link href="/assessment" className="btn btn-amber btn-arrow">Take the Career Assessment</Link>
            <Link href="/consultation" className="btn btn-secondary" style={{ background: 'transparent', color: 'var(--paper)', borderColor: 'var(--paper)' }}>
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
