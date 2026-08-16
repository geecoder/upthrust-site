'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CountUpStat } from '@/components/ui/CountUpStat';

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container stack-mobile" style={{ padding: '76px 24px 80px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,400px)', gap: 64, alignItems: 'start' }}>
          <div>
            <div style={{ width: 40, height: 2, background: 'var(--seal-500)', marginBottom: 20 }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--fg-2)' }}>WHO IS BEHIND UPTHRUST</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.4vw, 3.75rem)', fontWeight: 600, letterSpacing: '-0.032em', lineHeight: 1.05, margin: '20px 0 0' }}>
              Built by someone who has done the work. Every layer of it.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--fg-2)', margin: '22px 0 0', maxWidth: '34em' }}>
              Genesis Nneji Enwenyeokwu is a Product Lead, CBAP-certified Business Analyst, and MBA graduate from the University of East London — with over a decade across product management, business analysis, digital strategy, process automation, fintech, and technology-enabled transformation.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '26px 0 0' }}>
              {['CBAP CERTIFIED', 'MBA · UEL', 'PRODUCT LEAD · ROVA', 'IIBA NIGERIA CHAPTER', '1,000+ TRAINED'].map((chip) => (
                <span key={chip} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', border: '1px solid var(--border-strong)', padding: '6px 10px' }}>{chip}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ position: 'relative', width: '100%', maxWidth: 400, aspectRatio: '400/500', border: '1px solid var(--border-soft)' }}>
              <Image src="/images/founder-genesis.jpg" alt="Genesis Nneji Enwenyeokwu, founder of Upthrust" fill sizes="400px" style={{ objectFit: 'cover' }} priority />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)', marginTop: 10 }}>GENESIS NNEJI ENWENYEOKWU · FOUNDER</div>
          </div>
        </div>
      </section>

      {/* THE CAREER BEHIND THE CURRICULUM */}
      <section style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--paper)' }}>
        <div className="container stack-mobile" style={{ padding: '80px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 64 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>The career behind the curriculum</div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-1)', margin: '16px 0 0' }}>
              He currently works as a Product Lead at Rova, building digital financial products for Africans in the diaspora — multi-currency accounts, cross-border payments, remittance journeys, savings products, compliance-led onboarding, and customer engagement.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', margin: '16px 0 0' }}>
              His career has spanned Business Analyst, Product Owner, Technical Product Manager, Senior Product Manager, and Product Lead — across Nigeria, the UK, and the US, in fintech, technology, consulting, NGOs, and digital transformation.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', margin: '16px 0 0' }}>
              Beyond building products, he has built people: over 1,000 professionals trained, mentored, and coached globally. He also serves within the IIBA Nigeria Chapter, contributing to the growth of the business analysis profession.
            </p>
          </div>
          <div>
            <div style={{ borderTop: '1px solid var(--ink-800)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(90px,120px) minmax(0,1fr)', gap: 20, padding: '18px 0', borderBottom: '1px solid var(--border-soft)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--seal-600)' }}>THE PROBLEM</span>
                <span style={{ fontSize: 15, lineHeight: 1.6 }}>Talented professionals collecting credentials but unable to demonstrate real capability when it counted.</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(90px,120px) minmax(0,1fr)', gap: 20, padding: '18px 0', borderBottom: '1px solid var(--border-soft)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--seal-600)' }}>WHAT THIS IS</span>
                <span style={{ fontSize: 15, lineHeight: 1.6 }}>A capability-building ecosystem — not a training platform. Built for professionals who want to become, not just attend.</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(90px,120px) minmax(0,1fr)', gap: 20, padding: '18px 0', borderBottom: '1px solid var(--border-soft)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--seal-600)' }}>THE MISSION</span>
                <span style={{ fontSize: 15, lineHeight: 1.7 }}>
                  From learning concepts → to applying them<br />
                  From collecting certificates → to building evidence<br />
                  From career confusion → to professional clarity<br />
                  From potential → to proof
                </span>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 21, lineHeight: 1.45, fontStyle: 'italic', margin: '28px 0 0', paddingLeft: 20, borderLeft: '2px solid var(--seal-500)' }}>
              &ldquo;Too many talented people were collecting certificates but still struggling to demonstrate real capability. Upthrust is my answer to that problem.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: 'var(--ink-800)', color: 'var(--bone)' }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 32 }}>
            {[
              ['1,000+', 'Professionals trained globally'],
              ['2019', 'Year Upthrust was founded'],
              ['4', 'Continents represented'],
              ['25', 'Cohort seats, maximum'],
            ].map(([v, l]) => (
              <div key={l}>
                <CountUpStat value={v} style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--bone)' }} />
                <div style={{ fontSize: 13, color: 'var(--ink-300)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{ background: 'var(--bone-dim)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Our promise</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.15, margin: '16px 0 0' }}>
            We don&rsquo;t guarantee jobs. We guarantee readiness.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--fg-2)', margin: '18px auto 32px', maxWidth: '32em' }}>
            What you can show, what you can defend, and the evidence that backs your story in any interview.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/assessment" className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 48, padding: '0 24px' }}>Take the assessment</Link>
            <Link href="/consultation" className="btn" style={{ background: 'var(--bone)', color: 'var(--fg-1)', border: '1px solid var(--border-strong)', height: 48, padding: '0 24px' }}>Book a consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
