'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPathway, formatDate, PATHWAY_LIST, COHORT, type PathwaySlug } from '@/lib/cohort-config';
import { PATHWAY_CONTENT } from '@/lib/pathways-content';
import { getPricing, formatPrice, REGION_LABELS, REGION_PROCESSOR } from '@/lib/config';
import { useRegion } from '@/lib/useRegion';
import WeekTrack from '@/components/WeekTrack';
import NoiseToSequence from '@/components/diagrams/NoiseToSequence';
import AsIsToBe from '@/components/diagrams/AsIsToBe';
import ObservedFriction from '@/components/diagrams/ObservedFriction';
import ThreeSourcesOneNumber from '@/components/diagrams/ThreeSourcesOneNumber';

const DIAGRAMS: Record<PathwaySlug, React.ComponentType> = {
  'product-management': NoiseToSequence,
  'business-analysis': AsIsToBe,
  'product-design': ObservedFriction,
  'payment-operations': ThreeSourcesOneNumber,
};

function PricingBlock({ slug }: { slug: PathwaySlug }) {
  const [region] = useRegion('OTHER');
  const p = getPricing(slug, region);
  return (
    <section style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--bone-dim)' }}>
      <div className="container" style={{ padding: '80px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>What it costs</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '14px 0 0' }}>
              Two tiers on {PATHWAY_CONTENT[slug].code}.
            </h2>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--fg-3)', textAlign: 'right' }}>
            PRICING FOR<br />{REGION_LABELS[region].toUpperCase()}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '36px 0 0' }}>
          <div style={{ background: 'var(--paper)', padding: '30px 28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>TIER 01 · STANDARD</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, letterSpacing: '-0.028em', margin: '14px 0 0', fontVariantNumeric: 'tabular-nums' }}>{formatPrice(p.standard, region)}</div>
            <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>or {formatPrice(p.standardInstallment2, region)} × 2 installments</div>
            {['Live concept classes + labs', 'All templates and weekly assignments', 'Group feedback + community'].map((f) => (
              <div key={f} style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)', marginTop: f === 'Live concept classes + labs' ? 18 : 0 }}>{f}</div>
            ))}
            <div style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)', borderBottom: '1px solid var(--border-hair)', color: 'var(--fg-4)' }}>Capability Passport — not included</div>
            <span style={{ flex: 1, minHeight: 20 }} />
            <Link href={`/enrol?pathway=${slug}&tier=standard&region=${region}`} className="btn" style={{ background: 'var(--ink-800)', color: 'var(--bone)', height: 46, justifyContent: 'center', marginTop: 20 }}>
              Enrol on Standard
            </Link>
          </div>
          <div style={{ background: 'var(--paper)', padding: '30px 28px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: 'var(--shadow-2)' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--seal-500)', color: 'var(--bone)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', padding: '6px 10px' }}>RECOMMENDED</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>TIER 02 · PREMIUM</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, letterSpacing: '-0.028em', margin: '14px 0 0', fontVariantNumeric: 'tabular-nums' }}>{formatPrice(p.premium, region)}</div>
            <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>or {formatPrice(p.premiumInstallment2, region)} × 2 installments</div>
            <div style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)', marginTop: 18 }}>Everything in Standard</div>
            <div style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)' }}>1:1 portfolio review + mock interview</div>
            <div style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)', color: 'var(--seal-600)', fontWeight: 600 }}>Capability Passport eligibility</div>
            <div style={{ fontSize: 14, padding: '9px 0', borderTop: '1px solid var(--border-hair)', borderBottom: '1px solid var(--border-hair)' }}>Demo Day spotlight slot</div>
            <span style={{ flex: 1, minHeight: 20 }} />
            <Link href={`/enrol?pathway=${slug}&tier=premium&region=${region}`} className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 46, justifyContent: 'center', marginTop: 20 }}>
              Enrol on Premium
            </Link>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--fg-3)', marginTop: 16 }}>
          PROCESSED VIA {REGION_PROCESSOR[region].toUpperCase()} · BANK TRANSFER ON REQUEST
        </div>
      </div>
    </section>
  );
}

function FAQBlock({ slug }: { slug: PathwaySlug }) {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = PATHWAY_CONTENT[slug].faq;
  return (
    <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>
          Questions about {PATHWAY_CONTENT[slug].name}
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
            <div style={{ fontSize: 15, color: 'var(--fg-2)', marginTop: 4 }}>Thirty minutes with Genesis. He will tell you if this pathway is wrong for you.</div>
          </div>
          <Link href="/consultation" className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 46, padding: '0 22px' }}>Book a consultation</Link>
        </div>
      </div>
    </section>
  );
}

export function PathwayPageTemplate({ slug }: { slug: PathwaySlug }) {
  const [region] = useRegion('OTHER');
  const pathway = getPathway(slug);
  const content = PATHWAY_CONTENT[slug];
  const Diagram = DIAGRAMS[slug];
  const otherPathways = PATHWAY_LIST.filter((p) => p.slug !== slug);
  const price = getPricing(slug, region);

  return (
    <>
      {/* 1. HERO */}
      <section className="ledger-grid" style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '72px 24px 0' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ width: 40, height: 2, background: 'var(--seal-500)', marginBottom: 20 }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--fg-2)' }}>
                PATHWAY · {pathway.status.toUpperCase()} · STARTS {COHORT_DATE(pathway.start)}
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.375rem)', fontWeight: 600, letterSpacing: '-0.032em', lineHeight: 1.02, margin: '18px 0 0' }}>
                {content.name}
              </h1>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.4, color: 'var(--fg-1)', margin: '18px 0 0', maxWidth: '26em' }}>{content.line}</p>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: '12px 0 0', maxWidth: '32em' }}>{content.blurb}</p>
              <div style={{ display: 'flex', gap: 12, margin: '28px 0 0', flexWrap: 'wrap' }}>
                <Link href={`/enrol?pathway=${slug}`} className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 48, padding: '0 24px' }}>Enrol on {content.code}</Link>
                <Link href="/assessment" className="btn" style={{ background: 'var(--bone)', color: 'var(--fg-1)', border: '1px solid var(--border-strong)', height: 48, padding: '0 24px' }}>Check my fit first</Link>
              </div>
            </div>
            <div>
              <div style={{ background: 'var(--paper)', border: '1px solid var(--border-strong)', padding: '22px 24px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--fg-3)' }}>{content.diagram.label.toUpperCase()}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--seal-600)' }}>{content.code} · FIG 01</span>
                </div>
                <div style={{ paddingTop: 16 }}>
                  <Diagram />
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)', marginTop: 10 }}>{content.diagram.caption.toUpperCase()}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', borderTop: '1px solid var(--ink-800)', margin: '56px 0 0' }}>
            {[
              ['Starts', formatDate(pathway.start)],
              ['Duration', '12 weeks'],
              ['Commitment', '8–10 hrs'],
              ['Live sessions', 'Tue & Thu'],
              ['From', formatPrice(price.standard, region)],
            ].map(([label, val], i) => (
              <div key={label} style={{ padding: i === 0 ? '18px 18px 24px 0' : '18px', borderLeft: i > 0 ? '1px solid var(--border-soft)' : 'none' }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 23, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. IS THIS YOU + NOT FOR YOU */}
      <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Is this you?</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.12, margin: '14px 0 0' }}>
                Three kinds of people take this pathway.
              </h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>
              They arrive from different places and recognise themselves quickly. If none of these is you, the assessment will point you somewhere better.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '40px 0 0' }}>
            {content.profiles.map((p, i) => (
              <div key={p.title} style={{ background: 'var(--paper)', padding: '28px 26px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--seal-600)', letterSpacing: '0.1em' }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.018em', lineHeight: 1.25, margin: '10px 0 0' }}>{p.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-2)', margin: '10px 0 0' }}>{p.body}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'start', margin: '24px 0 0', padding: '18px 20px', background: 'var(--paper-dim)', borderLeft: '2px solid var(--crimson-500)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--crimson-700)', paddingTop: 2, whiteSpace: 'nowrap' }}>NOT FOR YOU IF</span>
            <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-1)' }}>{content.notFor}</span>
          </div>
        </div>
      </section>

      {/* 3. BY WEEK 12 YOU CAN */}
      <section style={{ background: 'var(--ink-800)', color: 'var(--bone)', borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '72px 24px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--seal-300)' }}>BY WEEK 12 YOU CAN</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 28, margin: '28px 0 0' }}>
            {content.weekTwelve.map((d, i) => (
              <div key={d} style={{ borderTop: '1px solid rgba(244,239,230,.2)', paddingTop: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--seal-300)' }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, lineHeight: 1.3, marginTop: 8, color: 'var(--bone)' }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE TWELVE-WEEK TRACK */}
      <section style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--bone-dim)' }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Week by week on {content.code}</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.12, margin: '14px 0 0' }}>
                Twelve weeks, twelve artefacts.
              </h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>
              Select any week to see what you learn and what you hand in. Every artefact is reviewed against the published rubric within {COHORT.feedbackSlaHours} hours.
            </p>
          </div>
          <div style={{ margin: '44px 0 0' }}>
            <WeekTrack pathwayLabel={content.name} weekArtefacts={content.weekArt} feedbackSlaHours={COHORT.feedbackSlaHours} resetKey={slug} />
          </div>
        </div>
      </section>

      {/* 5. SAMPLE OF THE WORK + HOW YOU ARE ASSESSED */}
      <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container stack-mobile" style={{ padding: '80px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>A sample of the work</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.625rem, 3vw, 2.25rem)', fontWeight: 600, letterSpacing: '-0.024em', margin: '14px 0 20px' }}>Reviewed, annotated, revised.</h2>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-2)' }}>
              <div style={{ background: 'var(--paper-dim)', borderBottom: '1px solid var(--border-soft)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--fg-2)' }}>{content.sampleWork.docTitle}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)' }}>REVIEWED</span>
              </div>
              <div style={{ padding: '20px 18px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.08em' }}>{content.sampleWork.docMeta}</div>
                <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[92, 78, 86, 54, 70, 88, 44].map((w, i) => (
                    <span key={i} style={{ height: 8, background: i === 3 ? 'var(--seal-50)' : 'var(--paper-dim)', width: `${w}%` }} />
                  ))}
                </div>
                <div style={{ marginTop: 18, borderTop: '1px solid var(--border-soft)', paddingTop: 14, display: 'flex', gap: 10, alignItems: 'start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--seal-600)', border: '1px solid var(--seal-300)', padding: '2px 6px', whiteSpace: 'nowrap' }}>NOTE 3</span>
                  <span style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--fg-2)' }}>{content.sampleWork.reviewerNote}</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)', margin: '36px 0 12px' }}>Tools you will actually use</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {content.tools.map((t) => (
                <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', border: '1px solid var(--border-strong)', padding: '6px 10px', borderRadius: 'var(--radius-1)', color: 'var(--fg-1)' }}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>How you are assessed</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.625rem, 3vw, 2.25rem)', fontWeight: 600, letterSpacing: '-0.024em', margin: '14px 0 0' }}>Six capability areas, three levels.</h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-2)', margin: '12px 0 0' }}>
              Every learner on this pathway is scored against the same published wording. The level you reach is the level that appears on your record — nothing is rounded up.
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
                <div key={c} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', padding: '13px 0', borderBottom: '1px solid var(--border-hair)', fontSize: 15 }}>
                  <span>{c}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)', whiteSpace: 'nowrap' }}>RUBRIC-SCORED</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'start', margin: '22px 0 0', padding: '16px 18px', background: 'var(--paper)', border: '1px solid var(--border-soft)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-3)', paddingTop: 2, whiteSpace: 'nowrap' }}>WEEK 12</span>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)' }}>You present and defend your capstone to a facilitator panel. Scores are signed off and the record becomes immutable — that is what an employer checks.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHERE IT LEADS */}
      <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Where it leads</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.12, margin: '14px 0 0' }}>
                The roles this pathway opens.
              </h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>{content.ladderNote}</p>
          </div>
          <div style={{ marginTop: 40 }}>
            {content.ladder.map((l) => (
              <div key={l.role} className="stack-mobile-sm" style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 280px) minmax(0,1fr)', gap: 24, alignItems: 'center', padding: '16px 0', borderTop: '1px solid var(--border-soft)' }}>
                <span style={{ fontSize: 17, fontWeight: 600 }}>{l.role}</span>
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
      </section>

      {/* 7. WHO TEACHES THIS */}
      <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container stack-mobile" style={{ padding: '80px 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 340px) minmax(0, 1fr)', gap: 56, alignItems: 'start' }}>
          <div>
            <div style={{ position: 'relative', width: '100%', maxWidth: 340, aspectRatio: '340/420', border: '1px solid var(--border-soft)' }}>
              <Image src="/images/founder-genesis.jpg" alt="Genesis Nneji Enwenyeokwu, facilitator" fill sizes="340px" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)', marginTop: 10 }}>GENESIS NNEJI ENWENYEOKWU · FACILITATOR</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Who teaches this</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.12, margin: '14px 0 0' }}>
              You are in the room with someone who does this work.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--fg-2)', margin: '16px 0 0', maxWidth: '38em' }}>
              Genesis is a Product Lead and CBAP-certified Business Analyst with over a decade across product, business analysis, and payments — currently building diaspora financial products at Rova. Every case in the curriculum is one he has worked, not one he read about.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '22px 0 0' }}>
              {['CBAP CERTIFIED', 'MBA · UEL', '1,000+ TRAINED', 'IIBA NIGERIA'].map((chip) => (
                <span key={chip} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', border: '1px solid var(--border-strong)', padding: '6px 10px' }}>{chip}</span>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.45, fontStyle: 'italic', margin: '26px 0 0', paddingLeft: 20, borderLeft: '2px solid var(--seal-500)' }}>
              {content.quote.text}
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--fg-3)', marginTop: 12, paddingLeft: 20 }}>— {content.quote.who.toUpperCase()}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '32px 0 0' }}>
              {[
                ['Cohort size', '15–25 learners, capped'],
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
        </div>
      </section>

      {/* 8. PRICING */}
      <PricingBlock slug={slug} />

      {/* 9. FAQ */}
      <FAQBlock slug={slug} />

      {/* 10. CLOSING CTA */}
      <section style={{ background: 'var(--ink-800)', color: 'var(--bone)' }}>
        <div className="container" style={{ padding: '80px 24px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-200)' }}>Compare pathways</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.028em', lineHeight: 1.1, margin: '18px 0 32px', color: 'var(--bone)' }}>
            Not sure {content.code} is the one?
          </h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {otherPathways.map((p) => (
              <Link key={p.slug} href={`/pathways/${p.slug}`} className="btn" style={{ background: 'none', color: 'var(--bone)', border: '1px solid rgba(244,239,230,.3)', height: 46, padding: '0 20px' }}>
                Compare with {p.trackCode} →
              </Link>
            ))}
            <Link href="/assessment" className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 46, padding: '0 20px' }}>
              Take the assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function COHORT_DATE(iso: string): string {
  return formatDate(iso).toUpperCase();
}
