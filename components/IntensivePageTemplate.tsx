'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getIntensive, formatDate, INTENSIVE_LIST, PATHWAY_LIST, COHORT, type IntensiveSlug } from '@/lib/cohort-config';
import { INTENSIVE_CONTENT } from '@/lib/intensives-content';
import { getIntensivePricing, formatPrice, type Region } from '@/lib/config';
import { useRegion } from '@/lib/useRegion';
import StageTrack from '@/components/StageTrack';
import { FacilitatorSlot } from '@/components/FacilitatorSlot';
import { ArtefactStack } from '@/components/ArtefactStack';
import { PricingSectionHeader } from '@/components/pricing/PricingSectionHeader';
import { PaymentPanel } from '@/components/pricing/PaymentPanel';
import { Reveal } from '@/components/Reveal';

// Sibling to PathwayPageTemplate.tsx, not branches inside it — a new template
// so the 4 live pathway pages carry zero regression risk from this work.
// Intensives are structurally different: 5-week single-price offerings with
// no diagram, no Standard/Premium tiers, and no Capability Passport (that
// stays a pathway-Premium perk). Section structure, inline-style conventions,
// and the useRegion()/initialRegion threading are all mirrored from
// PathwayPageTemplate.tsx on purpose — this should read as the same site,
// not a different product.

function PricingBlock({ slug, initialRegion }: { slug: IntensiveSlug; initialRegion: Region }) {
  const [region] = useRegion(initialRegion);
  const content = INTENSIVE_CONTENT[slug];
  const p = getIntensivePricing(slug, region);
  return (
    <Reveal id="pricing" style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--bone-dim)' }}>
      <div className="container" style={{ padding: '80px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Choose how far you take it</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '14px 0 20px' }}>
          One price on {content.code}.
        </h2>
        <PricingSectionHeader region={region} isIntensive />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)' }}>
          <div style={{ background: 'var(--paper)', padding: '30px 28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>SINGLE PRICE · 5 WEEKS</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, letterSpacing: '-0.028em', margin: '14px 0 0', fontVariantNumeric: 'tabular-nums' }}>{formatPrice(p.standalone, region)}</div>
            <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>Single payment · nothing further</div>
            {['Live cohort sessions, all 5 weeks', 'Every template and worked example', 'Five artefacts, rubric-scored', 'Interview story bank + capstone defence'].map((f, i) => (
              <div key={f} style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)', marginTop: i === 0 ? 18 : 0 }}>{f}</div>
            ))}
            <div style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)', borderBottom: '1px solid var(--border-hair)', color: 'var(--fg-4)' }}>Capability Passport — not included (pathway-only)</div>
          </div>
          <div style={{ background: 'var(--paper)', padding: '30px 28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>ALREADY ON A PATHWAY?</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', margin: '14px 0 0' }}>Add {content.name} for {formatPrice(p.bundled, region)}.</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)', margin: '10px 0 0' }}>
              That is {formatPrice(p.standalone - p.bundled, region)} off the standalone price when it runs alongside a 12-week pathway enrolment.
              Bundled enrolment is set up by hand for now — tell us on a consultation call and we will configure it for you.
            </p>
            <span style={{ flex: 1, minHeight: 20 }} />
            <Link href="/consultation" className="btn" style={{ background: 'none', color: 'var(--fg-1)', border: '1px solid var(--border-strong)', height: 46, justifyContent: 'center', marginTop: 20 }}>
              Talk to us about bundling
            </Link>
          </div>
        </div>

        <PaymentPanel
          dueToday={formatPrice(p.standalone, region)}
          planLabel="Single payment · 5 weeks"
          credentialLine="Ends with a Capability Record (not a Passport — that stays pathway-only)"
          ctaHref={`/enrol?pathway=${slug}`}
          ctaLabel={`Enrol on ${content.code}`}
        />
      </div>
    </Reveal>
  );
}

function FAQBlock({ slug }: { slug: IntensiveSlug }) {
  const [open, setOpen] = useState<number | null>(null);
  const content = INTENSIVE_CONTENT[slug];
  const faqs = content.faq;
  return (
    <Reveal style={{ borderBottom: '1px solid var(--border-soft)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>
          Questions about {content.name}
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '14px 0 0' }}>Before you enrol.</h2>
        <div style={{ margin: '32px 0 0', borderTop: '1px solid var(--ink-800)' }}>
          {faqs.map((f, i) => (
            <div key={f.q} style={{ borderBottom: '1px solid var(--border-soft)' }}>
              <button
                onClick={() => setOpen((o) => (o === i ? null : i))}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 0, padding: '20px 0', cursor: 'pointer', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 24px', gap: 16, alignItems: 'baseline' }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, letterSpacing: '-0.014em' }}>{f.q}</span>
                <span style={{ fontSize: 17, color: 'var(--fg-3)', justifySelf: 'end' }}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <p style={{ margin: '0 0 24px', fontSize: 16, lineHeight: 1.65, color: 'var(--fg-2)', maxWidth: '44em' }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, margin: '32px 0 0', padding: '22px 24px', background: 'var(--paper)', border: '1px solid var(--border-soft)', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600 }}>Still weighing it up?</div>
            <div style={{ fontSize: 15, color: 'var(--fg-2)', marginTop: 4 }}>Thirty minutes with Genesis. He will tell you if this intensive is wrong for you.</div>
          </div>
          <Link href="/consultation" className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 46, padding: '0 22px' }}>Book a consultation</Link>
        </div>
      </div>
    </Reveal>
  );
}

export function IntensivePageTemplate({ slug, initialRegion = 'OTHER' }: { slug: IntensiveSlug; initialRegion?: Region }) {
  const [region] = useRegion(initialRegion);
  const intensive = getIntensive(slug);
  const content = INTENSIVE_CONTENT[slug];
  const otherIntensive = INTENSIVE_LIST.find((i) => i.slug !== slug)!;
  const price = getIntensivePricing(slug, region);
  const artefactStackItems = content.stages.map((s) => ({ label: s.artefact, body: s.title }));

  return (
    <>
      {/* 1. HERO — ink-900, distinguishing the intensive family from the
          light-bone pathway heroes. Artefact stack fills the right column
          that had no visual at all in v1. */}
      <Reveal className="ledger-grid-dark" style={{ background: 'var(--ink-900)', color: 'var(--bone)', borderBottom: '1px solid var(--border-on-ink)' }}>
        <div className="container" style={{ padding: '72px 24px 0' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ width: 40, height: 2, background: 'var(--seal-500)', marginBottom: 20 }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--seal-300)' }}>
                5-WEEK INTENSIVE · {intensive.status.toUpperCase()} · STARTS {formatDate(intensive.start).toUpperCase()}
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.375rem)', fontWeight: 600, letterSpacing: '-0.032em', lineHeight: 1.02, margin: '18px 0 0', color: 'var(--bone)' }}>
                {content.name}
              </h1>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.4, color: 'var(--bone)', margin: '18px 0 0', maxWidth: '26em' }}>{content.line}</p>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-200)', margin: '12px 0 0', maxWidth: '34em' }}>{content.blurb}</p>
              <div style={{ display: 'flex', gap: 12, margin: '28px 0 0', flexWrap: 'wrap' }}>
                <Link href={`/enrol?pathway=${slug}`} className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 48, padding: '0 24px' }}>Enrol on {content.code}</Link>
                <Link href="/assessment" className="btn" style={{ background: 'none', color: 'var(--bone)', border: '1px solid var(--border-on-ink)', height: 48, padding: '0 24px' }}>Check my fit first</Link>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-200)' }}>A PREVIEW OF THE WORK</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--seal-300)' }}>{content.code} · 5 OF 5</span>
              </div>
              <ArtefactStack items={artefactStackItems} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', borderTop: '1px solid var(--border-on-ink)', margin: '56px 0 0' }}>
            {[
              ['Starts', formatDate(intensive.start)],
              ['Duration', '5 weeks'],
              ['Commitment', '6–8 hrs'],
              ['Live sessions', 'Tue & Thu'],
              ['From', formatPrice(price.standalone, region)],
            ].map(([label, val], i) => (
              <div key={label} style={{ padding: i === 0 ? '18px 18px 24px 0' : '18px', borderLeft: i > 0 ? '1px solid var(--border-on-ink)' : 'none' }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-200)' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 23, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 6, fontVariantNumeric: 'tabular-nums', color: 'var(--bone)' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 2. THE FIVE-STAGE TRACK */}
      <Reveal style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--bone-dim)' }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Stage by stage on {content.code}</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.12, margin: '14px 0 0' }}>
                Five weeks, five artefacts.
              </h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>
              Select any stage to see what you learn and what you hand in. Every artefact is reviewed against the published rubric within {COHORT.feedbackSlaHours} hours.
            </p>
          </div>
          <div style={{ margin: '44px 0 0' }}>
            <StageTrack intensiveLabel={content.name} stages={content.stages} feedbackSlaHours={COHORT.feedbackSlaHours} resetKey={slug} />
          </div>
        </div>
      </Reveal>

      {/* 3. HOW YOU ARE ASSESSED + TOOLS */}
      <Reveal style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container stack-mobile" style={{ padding: '80px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>How you are assessed</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.625rem, 3vw, 2.25rem)', fontWeight: 600, letterSpacing: '-0.024em', margin: '14px 0 0' }}>Six capability areas, three levels.</h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-2)', margin: '12px 0 0' }}>
              Every learner on this intensive is scored against the same published wording. The level you reach is the level that appears on your record — nothing is rounded up.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '22px 0 0' }}>
              <div style={{ background: 'var(--ochre-50)', padding: '14px 16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ochre-700)' }}>DEVELOPING</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-1)', marginTop: 6 }}>You can do it with support and a template.</div>
              </div>
              <div style={{ background: 'var(--moss-50)', padding: '14px 16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--moss-700)' }}>PROFICIENT</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-1)', marginTop: 6 }}>You can do it unaided, to a standard a team can use.</div>
              </div>
              <div style={{ background: 'var(--paper-dim)', padding: '14px 16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-1)' }}>STRONG</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-1)', marginTop: 6 }}>You improve on the brief and catch what others missed.</div>
              </div>
            </div>
            <div style={{ margin: '24px 0 0', borderTop: '1px solid var(--ink-800)' }}>
              {content.caps.map((c) => (
                <div key={c.area} style={{ padding: '13px 0', borderBottom: '1px solid var(--border-hair)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', fontSize: 15 }}>
                    <span>{c.area}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)', whiteSpace: 'nowrap' }}>RUBRIC-SCORED</span>
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-3)', marginTop: 4 }}>{c.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'start', margin: '22px 0 0', padding: '16px 18px', background: 'var(--paper)', border: '1px solid var(--border-soft)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-3)', paddingTop: 2, whiteSpace: 'nowrap' }}>WEEK 05</span>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)' }}>You present and defend your capstone to a facilitator panel. Scores are signed off and the record becomes immutable — that is what an employer checks.</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Tools you will actually use</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.625rem, 3vw, 2.25rem)', fontWeight: 600, letterSpacing: '-0.024em', margin: '14px 0 20px' }}>Not a slide deck about AI.</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {content.tools.map((t) => (
                <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', border: '1px solid var(--border-strong)', padding: '6px 10px', borderRadius: 'var(--radius-1)', color: 'var(--fg-1)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* 4. WHERE IT LEADS */}
      <Reveal style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Where it leads</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.12, margin: '14px 0 0' }}>
                The roles this intensive opens.
              </h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>{content.ladderNote}</p>
          </div>
          <div style={{ marginTop: 40 }}>
            {content.ladder.map((l, i) => (
              <div key={l.role} className="stack-mobile-sm" style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 280px) minmax(0,1fr)', gap: 24, alignItems: 'center', padding: '16px 0', borderTop: '1px solid var(--border-soft)' }}>
                <span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--seal-600)' }}>{['NEXT ROLE', 'THEN', 'IN TIME'][i]}</span>
                  <span style={{ fontSize: 17, fontWeight: 600 }}>{l.role}</span>
                </span>
                <span style={{ height: 14, background: 'var(--paper-dim)', display: 'block' }}>
                  <span style={{ display: 'block', height: 14, width: l.width, background: 'var(--ink-800)' }} />
                </span>
              </div>
            ))}
            <div className="stack-mobile-sm" style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 280px) minmax(0,1fr)', gap: 24, padding: '10px 0 0', borderTop: '1px solid var(--ink-800)' }}>
              <span />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)' }}>SCOPE OF WORK EXPECTED AT EACH RUNG →</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '28px 0 0', fontSize: 14, color: 'var(--fg-2)', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>HONEST NOTE</span>
            <span>Upthrust does not guarantee employment. We build capability, evidence, and readiness.</span>
          </div>
        </div>
      </Reveal>

      {/* 5. WHO TEACHES THIS — a 3-slot roster, with an honest TBC state for
          the two facilitator slots not yet confirmed. */}
      <Reveal style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Who teaches this</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.12, margin: '14px 0 0' }}>
            Three slots, five weeks, one accountable panel.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--fg-2)', margin: '16px 0 0', maxWidth: '38em' }}>
            Genesis leads the opening stages of every intensive. The remaining slots are being finalised for this cohort — shown honestly below rather than filled with a placeholder name.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '32px 0 0' }}>
            {content.facilitators.map((f, i) => (
              <FacilitatorSlot key={i} slot={f} />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '32px 0 0' }}>
            {[
              ['Cohort size', `Up to ${intensive.seatsMax} learners`],
              ['Feedback', 'Written, within 48 hours'],
              ['Time zones', 'WAT · BST/CET · EST'],
              ['Recordings', 'Available within 24 hours'],
            ].map(([label, val]) => (
              <div key={label} style={{ background: 'var(--paper)', padding: '18px 20px' }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>{label}</div>
                <div style={{ fontSize: 15, color: 'var(--fg-1)', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 6. PRICING */}
      <PricingBlock slug={slug} initialRegion={initialRegion} />

      {/* 7. FAQ */}
      <FAQBlock slug={slug} />

      {/* 8. CLOSING CTA */}
      <Reveal className="ledger-grid-dark" style={{ background: 'var(--ink-800)', color: 'var(--bone)' }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-200)' }}>Compare programmes</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.028em', lineHeight: 1.1, margin: '18px 0 32px', color: 'var(--bone)' }}>
            Not sure {content.code} is the one?
          </h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href={`/intensives/${otherIntensive.slug}`} className="btn" style={{ background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', height: 46, padding: '0 20px' }}>
              Compare with {otherIntensive.trackCode} →
            </Link>
            {PATHWAY_LIST.map((p) => (
              <Link key={p.slug} href={`/pathways/${p.slug}`} className="btn" style={{ background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', height: 46, padding: '0 20px' }}>
                Explore {p.trackCode} — 12 weeks →
              </Link>
            ))}
            <Link href="/assessment" className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 46, padding: '0 20px' }}>
              Take the assessment
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
