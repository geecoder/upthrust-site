'use client';

import { useState } from 'react';
import Link from 'next/link';
import { INTENSIVE_LIST, type IntensiveSlug } from '@/lib/cohort-config';
import { INTENSIVE_CONTENT } from '@/lib/intensives-content';
import { getIntensivePricing, formatPrice, type Region } from '@/lib/config';
import { useRegion } from '@/lib/useRegion';
import { Reveal } from '@/components/Reveal';

// All 5 stages shown simultaneously (unlike StageTrack, which shows one at a
// time) — later stages held at a low opacity to read as "not yet reached"
// rather than hidden. Pure CSS state, no auto-advance.
function StageAssembly({ slug }: { slug: IntensiveSlug }) {
  const [reached, setReached] = useState(1);
  const content = INTENSIVE_CONTENT[slug];
  return (
    <div>
      {content.stages.map((stage, i) => {
        const active = i < reached;
        return (
          <button
            key={stage.stage}
            onClick={() => setReached(i + 1)}
            style={{
              display: 'grid', gridTemplateColumns: '32px minmax(0,1fr) auto', gap: 14, alignItems: 'center', width: '100%',
              padding: '15px 4px', background: 'none', border: 0, borderBottom: '1px solid var(--border-on-ink)', cursor: 'pointer', textAlign: 'left',
              opacity: active ? 1 : 0.42, transition: 'opacity 300ms',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--seal-300)' }}>{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: 'var(--bone)' }}>{stage.stage}</span>
              <span style={{ display: 'block', fontSize: 12, color: 'var(--ink-300)', marginTop: 2 }}>{stage.artefact}</span>
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.06em', color: 'var(--ink-200)', whiteSpace: 'nowrap' }}>{stage.status}</span>
          </button>
        );
      })}
    </div>
  );
}

function IntensivePriceRail({ slug, region }: { slug: IntensiveSlug; region: Region }) {
  const p = getIntensivePricing(slug, region);
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '16px 0 0', borderTop: '1px solid var(--border-on-ink)', marginTop: 20, flexWrap: 'wrap' }}>
      <div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--bone)', fontVariantNumeric: 'tabular-nums' }}>{formatPrice(p.standalone, region)}</span>
        <span style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-300)', marginTop: 2 }}>STANDALONE</span>
      </div>
      <div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--bone)', fontVariantNumeric: 'tabular-nums' }}>{formatPrice(p.bundled, region)}</span>
        <span style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', color: 'var(--moss-500)', marginTop: 2 }}>BUNDLED · SAVE 25%</span>
      </div>
    </div>
  );
}

export function AIIntensivesSection({ initialRegion }: { initialRegion: Region }) {
  const [region] = useRegion(initialRegion);
  const [active, setActive] = useState<IntensiveSlug>(INTENSIVE_LIST[0].slug);
  const content = INTENSIVE_CONTENT[active];

  return (
    <Reveal as="section" className="ledger-grid-dark" style={{ background: 'var(--ink-800)', color: 'var(--bone)' }}>
      <div className="container" style={{ padding: '96px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-200)' }}>New · 5 weeks · Specialist intensives</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '18px 0 0', color: 'var(--bone)', maxWidth: '24em' }}>
          Watch a product get built.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--ink-200)', margin: '16px 0 0', maxWidth: '42em' }}>
          Standalone, or bundled onto any 12-week pathway at a discount. No Capability Passport — that stays pathway-only — but the same rubric-scored, facilitator-reviewed rigour.
        </p>

        <div style={{ display: 'flex', gap: 8, margin: '36px 0 0' }}>
          {INTENSIVE_LIST.map((iv) => (
            <button
              key={iv.slug}
              onClick={() => setActive(iv.slug)}
              style={{
                fontSize: 13, fontWeight: 600, padding: '10px 18px', cursor: 'pointer',
                border: `1px solid ${active === iv.slug ? 'var(--seal-500)' : 'var(--border-on-ink)'}`,
                background: active === iv.slug ? 'var(--seal-500)' : 'none',
                color: 'var(--bone)',
              }}
            >
              {INTENSIVE_CONTENT[iv.slug].code}
            </button>
          ))}
        </div>

        <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 56, margin: '32px 0 0', alignItems: 'start' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.018em', margin: 0, color: 'var(--bone)' }}>{content.name}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-200)', margin: '10px 0 0' }}>{content.blurb}</p>
            <IntensivePriceRail slug={active} region={region} />
            <Link href={`/intensives/${active}`} className="btn" style={{ background: 'var(--bone)', color: 'var(--ink-800)', height: 46, padding: '0 22px', marginTop: 22 }}>
              See this intensive →
            </Link>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-300)', marginBottom: 6 }}>CLICK A STAGE TO PREVIEW IT</div>
            <StageAssembly slug={active} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
