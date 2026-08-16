import Link from 'next/link';
import Image from 'next/image';
import { PATHWAY_LIST, COHORT } from '@/lib/cohort-config';
import { PATHWAY_CONTENT } from '@/lib/pathways-content';
import { TESTIMONIALS } from '@/lib/testimonials';
import { HowItWorksAccordion } from '@/components/HowItWorksAccordion';
import OneSpineFourPathways from '@/components/diagrams/OneSpineFourPathways';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed';
import { CountUpStat } from '@/components/ui/CountUpStat';

const PROBLEM_ROWS = [
  { complaint: '"I have 3 certificates but no one calls me back"', replacement: 'Portfolio + Capability Passport' },
  { complaint: '"I finished the course but can\'t explain what I built"', replacement: '12 artefacts defended under review' },
  { complaint: '"I don\'t know how to show my value in interviews"', replacement: '10 interview stories from real work' },
];

const ARCHETYPES = [
  { num: '01', title: 'The Career Switcher', icon: 'switch', body: "You've spent years in banking, ops, support, admin, teaching, or healthcare. You can see how product roles use the exact instincts you've already built — you just need the language, the artefacts, and the proof." },
  { num: '02', title: 'The Early-Career Professional', icon: 'sprout', body: 'You graduated. Maybe you got a junior role. But you keep getting filtered out for "lack of experience." You need a way to demonstrate experience without waiting five years to be given the chance.' },
  { num: '03', title: 'The International Repositioner', icon: 'globe', body: "You moved to the UK, Canada, or Australia. Or you're planning to. Your previous work doesn't translate cleanly. You need portfolio evidence that reads to a Western product team and a story that lands in 30 seconds." },
  { num: '04', title: 'The Quiet Upgrader', icon: 'upgrade', body: "You're already in a product-adjacent role. You're doing some of the work. But your title doesn't say it, your portfolio doesn't show it, and your career growth has stalled. You need to formalise what you already do." },
] as const;

function ArchetypeIcon({ name }: { name: string }) {
  const common = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--seal-600)', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (name === 'switch') {
    return (
      <svg {...common}>
        <path d="M4 8h13l-3-3M20 16H7l3 3" />
      </svg>
    );
  }
  if (name === 'sprout') {
    return (
      <svg {...common}>
        <path d="M12 21V11" />
        <path d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6Z" />
        <path d="M12 15c0-3-2.5-5-6-5 0 3 2.5 5 6 5Z" />
      </svg>
    );
  }
  if (name === 'globe') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 18 20 4M20 4h-7M20 4v7" />
    </svg>
  );
}

function passportRow(area: string, level: 'Proficient' | 'Developing', pct: number) {
  const proficient = level === 'Proficient';
  const color = proficient ? 'var(--moss-500)' : 'var(--seal-500)';
  return (
    <div key={area} style={{ padding: '10px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-800)' }}>{area}</span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color, whiteSpace: 'nowrap' }}>{level}</span>
      </div>
      <div style={{ height: 3, background: 'var(--border-soft)' }}>
        <div style={{ height: 3, width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* 1. HERO */}
      <section className="ledger-grid" style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container stack-mobile" style={{ padding: '88px 24px 0', display: 'grid', gridTemplateColumns: 'minmax(0, 1.02fr) minmax(0, 0.98fr)', gap: 72, alignItems: 'start' }}>
          <div>
            <div style={{ width: 40, height: 2, background: 'var(--seal-500)', marginBottom: 20 }} />
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-2)' }}>
              Career capability platform · Four pathways · All start {COHORT.startDateDisplay}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5.6vw, 5rem)', fontWeight: 600, letterSpacing: '-0.032em', lineHeight: 1.03, margin: '22px 0 0' }}>
              Build evidence.<br />
              <span style={{ boxShadow: 'inset 0 -0.1em 0 var(--seal-500)' }}>Not just credentials.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--fg-2)', maxWidth: '32em', margin: '26px 0 0' }}>
              A 12-week practical accelerator for Product Management, Business Analysis, Product Design, and Payment Operations. Real work. Real portfolio. A Capability Passport employers can verify.
            </p>
            <div style={{ display: 'flex', gap: 12, margin: '34px 0 0', flexWrap: 'wrap' }}>
              <Link href="/assessment" className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 48, padding: '0 24px' }}>Take the assessment</Link>
              <Link href="/accelerator" className="btn" style={{ background: 'var(--bone)', color: 'var(--fg-1)', border: '1px solid var(--border-strong)', height: 48, padding: '0 24px' }}>Explore the program</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '30px 0 0' }}>
              <div style={{ display: 'flex' }}>
                {[0, 1, 2, 3].map((i) => (
                  <ImagePlaceholder key={i} label="" shape="circle" style={{ width: 44, height: 44, marginLeft: i === 0 ? 0 : -12, boxShadow: '0 0 0 2px var(--bone)' }} />
                ))}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--fg-2)' }}>
                Alumni now working as BAs and PMs in <strong style={{ fontWeight: 600, color: 'var(--fg-1)' }}>Lagos, London, Toronto</strong><br />and Halifax. 1,000+ trained since 2019.
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', borderTop: '1px solid var(--border-soft)', margin: '56px 0 0' }}>
              {[['1,000+', 'Trained globally'], ['2019', 'Heritage'], ['Four', 'Pathways open']].map(([v, l], i) => (
                <div key={l} style={{ padding: i === 0 ? '22px 20px 34px 0' : '22px 20px 34px', borderLeft: i > 0 ? '1px solid var(--border-soft)' : 'none' }}>
                  <CountUpStat value={v} style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, letterSpacing: '-0.02em' }} />
                  <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Capability Passport card */}
          <div style={{ paddingBottom: 88 }}>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-3)', boxShadow: 'var(--shadow-2)', overflow: 'hidden' }}>
              <div style={{ background: 'var(--ink-800)', color: 'var(--bone)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em' }}>UPTHRUST · CAPABILITY PASSPORT</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--bone)', background: 'var(--seal-500)', padding: '3px 8px' }}>SAMPLE</span>
              </div>
              <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid var(--border-soft)' }}>
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.08em' }}>ID: UP-C1-0047-BA</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 6 }}>Adaeze Okonkwo</div>
                    <div style={{ fontSize: 13, color: 'var(--seal-600)', marginTop: 2, fontWeight: 600 }}>Business Analysis Pathway</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>Cohort 1 · Upthrust Career Capability Accelerator · 2026</div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--moss-700)', background: 'var(--moss-50)', border: '1px solid var(--moss-500)', padding: '4px 9px', whiteSpace: 'nowrap' }}>
                    Verified ready
                  </span>
                </div>
              </div>
              <div style={{ padding: '6px 20px 10px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)', padding: '12px 0 8px' }}>Assessed capability areas</div>
                {passportRow('Requirements elicitation & analysis', 'Proficient', 88)}
                {passportRow('Stakeholder management & facilitation', 'Proficient', 84)}
                {passportRow('Business process modelling', 'Developing', 52)}
                {passportRow('Solution design & documentation (BRD)', 'Proficient', 90)}
                {passportRow('UAT planning & test scenario writing', 'Proficient', 86)}
                {passportRow('Agile delivery & backlog contribution', 'Developing', 48)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '14px 20px', background: 'var(--paper-dim)', borderTop: '1px solid var(--border-soft)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.05em' }}>ISSUED: AUGUST 2026</div>
                <div style={{ width: 40, height: 40, border: '1px solid var(--border-strong)', display: 'grid', placeItems: 'center', opacity: 0.6 }}>
                  <div style={{ width: 28, height: 28, backgroundImage: 'repeating-linear-gradient(to right, var(--ink-800) 0 3px, transparent 3px 6px), repeating-linear-gradient(to bottom, var(--ink-800) 0 3px, transparent 3px 6px)' }} />
                </div>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.06em', marginTop: 12 }}>
              SAMPLE RECORD · NOT ISSUED
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE SESSION BAND (dark) */}
      <section style={{ background: 'var(--ink-800)', color: 'var(--bone)' }}>
        <div className="stack-mobile" style={{ maxWidth: 1440, margin: '0 auto', padding: '72px 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 48, alignItems: 'stretch' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--seal-300)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--seal-500)' }} />LIVE LAB · WEEK 06
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.018em', marginBottom: 14, color: 'var(--bone)' }}>Requirements walkthrough, in the room</div>
            <YouTubeEmbed videoId="DAFOJhGO6Ig" title="Requirements walkthrough, in the room — Upthrust live session" />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-400)', marginTop: 10 }}>COHORT 01 · SESSION RECORDING</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid rgba(244,239,230,.14)', paddingLeft: 40 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--seal-300)' }}>WHO IS IN THE ROOM</div>
            {[
              { name: 'Chioma Okorie', role: 'Business Analyst · Halifax' },
              { name: 'Ayodele Yeye', role: 'Senior BA · Government of Nova Scotia' },
              { name: 'Uyoyou Taiye-Ayo', role: 'Senior BA · RBC Investor & Treasury' },
            ].map((p) => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 0', borderBottom: '1px solid rgba(244,239,230,.14)' }}>
                <ImagePlaceholder label="" style={{ width: 52, height: 64, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--bone)' }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-300)' }}>{p.role}</div>
                </div>
              </div>
            ))}
            <Link href="/about" style={{ alignSelf: 'start', marginTop: 22, fontSize: 14, fontWeight: 500, color: 'var(--seal-300)' }}>
              <span style={{ borderBottom: '1px solid rgba(222,139,106,.5)' }}>Meet the facilitator →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM */}
      <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '96px 24px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>The problem we solve</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.125rem, 4vw, 3.25rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.08, margin: '18px 0 0', maxWidth: '20em' }}>
            Most people don&rsquo;t have a learning problem. They have a proof problem.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--fg-2)', margin: '20px 0 0', maxWidth: '38em' }}>Certificates say you attended. A Capability Passport shows what you can do.</p>
          <div style={{ margin: '56px 0 0', borderTop: '1px solid var(--ink-800)' }}>
            {PROBLEM_ROWS.map((row) => (
              <div key={row.complaint} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 40px minmax(0,1fr)', alignItems: 'center', gap: 16, padding: '26px 0', borderBottom: '1px solid var(--border-soft)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: 'var(--fg-2)', fontStyle: 'italic' }}>{row.complaint}</div>
                <div style={{ textAlign: 'center', color: 'var(--seal-500)', fontSize: 20 }}>→</div>
                <div style={{ fontSize: 17, fontWeight: 500 }}>{row.replacement}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--bone-dim)' }}>
        <div className="container" style={{ padding: '96px 24px' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 72, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>How Upthrust works</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.1, margin: '18px 0 0' }}>
                Four steps. Each one earns the next.
              </h2>
            </div>
            <p style={{ fontSize: 17, color: 'var(--fg-2)', margin: 0, maxWidth: '34em' }}>
              We don&rsquo;t sell hours of training. We sell a sequence: a way of moving from confusion to capability to evidence, where each step proves you&rsquo;ve earned the right to the next one.
            </p>
          </div>
          <HowItWorksAccordion />
        </div>
      </section>

      {/* 5. THE PATHWAYS */}
      <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '96px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>The pathways</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '18px 0 0' }}>
                Choose where you&rsquo;ll build evidence.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', margin: '14px 0 0', maxWidth: '44em' }}>
                All four start {COHORT.startDateDisplay}. Product Management and Business Analysis are on their second cohort; Product Design and Payment Operations open their first.
              </p>
              <div style={{ margin: '36px 0 0', background: 'var(--paper)', border: '1px solid var(--border-strong)', padding: '24px 26px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--fg-3)' }}>ONE TWELVE-WEEK SPINE · FOUR PATHWAY OUTPUTS</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--seal-600)' }}>FIG 01</span>
                </div>
                <div style={{ marginTop: 18 }}>
                  <OneSpineFourPathways />
                </div>
              </div>
            </div>
            <Link href="/assessment" style={{ fontSize: 15, fontWeight: 500, color: 'var(--seal-600)', borderBottom: '1px solid var(--seal-300)', whiteSpace: 'nowrap' }}>
              Not sure which fits? →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border-soft)', margin: '48px 0 0', border: '1px solid var(--border-soft)' }}>
            {PATHWAY_LIST.map((p) => (
              <div key={p.slug} style={{ background: 'var(--paper)', padding: '32px 28px 28px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--moss-700)' }}>{p.status.toUpperCase()}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '14px 0 0' }}>{p.label}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-2)', margin: '14px 0 0' }}>{PATHWAY_CONTENT[p.slug].line} {PATHWAY_CONTENT[p.slug].blurb}</p>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)', margin: '26px 0 10px' }}>You&rsquo;ll leave with</div>
                <div style={{ fontSize: 14, color: 'var(--fg-1)', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {PATHWAY_CONTENT[p.slug].art.slice(0, 3).map((a) => (
                    <span key={a} style={{ borderTop: '1px solid var(--border-hair)', paddingTop: 7 }}>{a}</span>
                  ))}
                </div>
                <span style={{ flex: 1, minHeight: 24 }} />
                <Link href={`/pathways/${p.slug}`} className="btn" style={{ background: 'var(--ink-800)', color: 'var(--bone)', height: 42, justifyContent: 'center', marginTop: 20 }}>
                  Explore {p.trackCode}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THE CAPABILITY PASSPORT (dark) */}
      <section style={{ background: 'var(--ink-800)', color: 'var(--fg-on-ink)' }}>
        <div className="container stack-mobile" style={{ padding: '96px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 72, alignItems: 'start' }}>
          <div>
            <div style={{ width: 40, height: 2, background: 'var(--seal-500)', marginBottom: 20 }} />
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-200)' }}>The Capability Passport</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.1, margin: '18px 0 0', color: 'var(--bone)' }}>
              A certificate says you attended. Your Passport shows what you can do.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-200)', margin: '24px 0 0' }}>
              The Upthrust Capability Passport is a structured evidence record — not a certificate. Every capability area is assessed against a published rubric. Every score is backed by real work you produced. Every Passport is signed by a facilitator who reviewed your capstone.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-300)', margin: '18px 0 0' }}>
              We&rsquo;re honest: the Passport&rsquo;s value grows as our alumni network grows. Today, what you hold is a verifiable, defensible record of your work that you can present in any interview, on any application, to any employer.
            </p>
            <div style={{ margin: '32px 0 0', borderTop: '1px solid rgba(244,239,230,.14)' }}>
              {[
                'Capability areas assessed against published rubric',
                'Real artefacts produced during the program',
                'Capstone defence score and summary',
                'Facilitator review and sign-off',
                'Shareable digital record with unique Passport ID',
              ].map((line) => (
                <div key={line} style={{ display: 'flex', gap: 12, padding: '13px 0', borderBottom: '1px solid rgba(244,239,230,.14)', fontSize: 15, color: 'var(--bone)' }}>
                  <span style={{ color: 'var(--seal-300)' }}>✓</span>{line}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--paper)', color: 'var(--fg-1)', border: '1px solid rgba(244,239,230,.2)', padding: '34px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 20, borderBottom: '1px solid var(--ink-800)', paddingBottom: 20 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em' }}>Upthrust</div>
                <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--fg-2)', marginTop: 2 }}>Capability Passport</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--bone)', background: 'var(--seal-500)', padding: '4px 8px' }}>SAMPLE</div>
            </div>
            <div style={{ padding: '22px 0 0', display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing: '-0.022em' }}>Adaeze Okonkwo</div>
                <div style={{ fontSize: 14, color: 'var(--seal-600)', fontWeight: 600, marginTop: 2 }}>Business Analysis Pathway</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', marginTop: 8, letterSpacing: '0.05em' }}>COHORT 1 · UPTHRUST CAREER CAPABILITY ACCELERATOR · 2026</div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--moss-700)', background: 'var(--moss-50)', border: '1px solid var(--moss-500)', padding: '4px 9px', whiteSpace: 'nowrap' }}>
                Verified ready
              </span>
            </div>
            <div style={{ margin: '22px 0 0', paddingTop: 16, borderTop: '1px solid var(--border-soft)' }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)', marginBottom: 12 }}>Assessed capability areas</div>
              {passportRow('Requirements elicitation & analysis', 'Proficient', 88)}
              {passportRow('Stakeholder management & facilitation', 'Proficient', 84)}
              {passportRow('Business process modelling', 'Developing', 52)}
              {passportRow('Solution design & documentation (BRD)', 'Proficient', 90)}
              {passportRow('UAT planning & test scenario writing', 'Proficient', 86)}
              {passportRow('Agile delivery & backlog contribution', 'Developing', 48)}
            </div>
            <div style={{ margin: '22px 0 0', padding: '18px 0', borderTop: '1px solid var(--border-soft)', borderBottom: '1px solid var(--border-soft)', background: 'var(--bone-dim)', paddingLeft: 16, paddingRight: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--seal-600)', marginBottom: 10 }}>Capstone defence · Week 12</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, lineHeight: 1.5, fontStyle: 'italic', margin: 0, color: 'var(--fg-1)' }}>
                &ldquo;Adaeze demonstrates strong requirements discipline and clear thinking under ambiguity. Her UAT pack caught three edge cases the scoping team had missed. She is ready for associate-level BA work in a serious product team.&rdquo;
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)', marginTop: 14 }}>— FACILITATOR SIGN-OFF · GENESIS N. ENWENYEOKWU · CBAP</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', color: 'var(--fg-3)' }}>ISSUED: AUGUST 2026 · upthrustdigital.com</div>
              <div style={{ width: 44, height: 44, border: '1px solid var(--border-strong)', display: 'grid', placeItems: 'center', opacity: 0.6 }}>
                <div style={{ width: 30, height: 30, backgroundImage: 'repeating-linear-gradient(to right, var(--ink-800) 0 3px, transparent 3px 7px), repeating-linear-gradient(to bottom, var(--ink-800) 0 3px, transparent 3px 7px)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREMISE PULL-QUOTE */}
      <section style={{ background: 'var(--bone-dim)', borderBottom: '1px solid var(--border-soft)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.625rem, 3.2vw, 2.5rem)', fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.02em', margin: 0 }}>
            The future of work will not reward people only for what they studied. It will reward people for what they can prove they can do.
          </p>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--fg-3)', marginTop: 28 }}>The Upthrust premise</div>
        </div>
      </section>

      {/* 8. WHO IT'S FOR */}
      <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '96px 24px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Who Upthrust Digital is built for</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.1, margin: '18px 0 0', maxWidth: '26em' }}>
            Four kinds of people land here. They tend to recognise themselves quickly.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '48px 0 0' }}>
            {ARCHETYPES.map((a) => (
              <div key={a.num} style={{ background: 'var(--paper)', padding: '30px 28px' }}>
                <div style={{ width: 44, height: 44, border: '1px solid var(--seal-100)', background: 'var(--seal-50)', display: 'grid', placeItems: 'center', marginBottom: 16 }}>
                  <ArchetypeIcon name={a.icon} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--seal-600)', letterSpacing: '0.1em' }}>{a.num}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.018em', margin: '10px 0 0' }}>{a.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-2)', margin: '12px 0 0' }}>{a.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link href="/assessment" className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 48, padding: '0 24px' }}>
              Take the Career Assessment — 8 minutes
            </Link>
          </div>
        </div>
      </section>

      {/* 9. ALUMNI TESTIMONIALS */}
      <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '96px 24px' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 72, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Alumni results</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '18px 0 0' }}>
                From people who have done the work.
              </h2>
            </div>
            <p style={{ fontSize: 17, color: 'var(--fg-2)', margin: 0 }}>
              These are real Upthrust alumni — working as Business Analysts in Canada and the UK. Their words, not ours.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32, margin: '48px 0 0', borderTop: '1px solid var(--ink-800)', paddingTop: 32 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.id}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 19, lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--border-soft)' }}>
                  <span style={{ width: 38, height: 38, border: '1px solid var(--border-strong)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.05em', flexShrink: 0 }}>
                    {t.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </span>
                  <span>
                    <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>{t.name}</span>
                    <span style={{ display: 'block', fontSize: 13, color: 'var(--fg-3)' }}>{t.role} · {t.company}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--fg-3)', margin: '28px 0 0' }}>
            All three alumni above completed the Business Analysis pathway. Cohort 1 graduated in August 2026.
          </p>
        </div>
      </section>

      {/* 10. FOUNDER BAND */}
      <section style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--paper)' }}>
        <div className="container stack-mobile" style={{ padding: '96px 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 340px) minmax(0, 1fr)', gap: 64, alignItems: 'start' }}>
          <div>
            <div style={{ position: 'relative', width: '100%', maxWidth: 340, aspectRatio: '340/420', border: '1px solid var(--border-soft)' }}>
              <Image src="/images/founder-genesis.jpg" alt="Genesis Nneji Enwenyeokwu, founder of Upthrust" fill sizes="340px" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)', marginTop: 10 }}>GENESIS NNEJI ENWENYEOKWU · LAGOS / LONDON</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Who is behind Upthrust</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.1, margin: '18px 0 0' }}>
              Built by someone who has done the work. Every layer of it.
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '24px 0 0' }}>
              {['CBAP CERTIFIED', 'MBA · UEL', 'PRODUCT LEAD', 'IIBA NIGERIA', '10+ YEARS'].map((chip) => (
                <span key={chip} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', border: '1px solid var(--border-strong)', padding: '5px 9px', borderRadius: 'var(--radius-1)' }}>{chip}</span>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.45, fontStyle: 'italic', margin: '28px 0 0', paddingLeft: 20, borderLeft: '2px solid var(--seal-500)' }}>
              &ldquo;Too many talented people were collecting certificates but still struggling to demonstrate real capability. Upthrust is my answer to that problem.&rdquo;
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '32px 0 0' }}>
              {[
                ['Product Management', 'Strategy · Discovery · Delivery · Growth'],
                ['Business Analysis', 'Requirements · Process · UAT · Strategy'],
                ['Fintech', 'Payments · Wallets · Lending · Wealth · Compliance'],
                ['Transformation', 'Digital · Process · Capability'],
              ].map(([label, val]) => (
                <div key={label} style={{ background: 'var(--paper)', padding: '20px 22px' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>{label}</div>
                  <div style={{ fontSize: 14, color: 'var(--fg-2)', marginTop: 6 }}>{val}</div>
                </div>
              ))}
            </div>
            <Link href="/about" style={{ display: 'inline-block', fontSize: 15, fontWeight: 500, paddingTop: 24, color: 'var(--seal-600)' }}>
              <span style={{ borderBottom: '1px solid var(--seal-300)' }}>Full story and background →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. CLOSING CTA */}
      <section style={{ background: 'var(--ink-800)', color: 'var(--bone)' }}>
        <div className="container stack-mobile" style={{ padding: '104px 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 56, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--seal-300)' }}>FOUR PATHWAYS · OPEN NOW</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 600, letterSpacing: '-0.028em', lineHeight: 1.08, margin: '18px 0 0', color: 'var(--bone)' }}>
              Stop collecting certificates. Start building evidence.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--ink-200)', margin: '20px 0 0', maxWidth: '40em' }}>
              The Career Assessment takes 8 minutes. It tells you something true about how you think — not just which pathway fits, but how you&rsquo;d approach real product problems.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 260 }}>
            <Link href="/assessment" className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 50, padding: '0 24px', justifyContent: 'center' }}>Take the Career Assessment</Link>
            <Link href="/consultation" className="btn" style={{ background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', height: 50, padding: '0 24px', justifyContent: 'center' }}>Or book a consultation →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
