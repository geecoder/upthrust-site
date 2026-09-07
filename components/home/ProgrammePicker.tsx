'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PATHWAY_LIST, INTENSIVE_LIST, COHORT } from '@/lib/cohort-config';
import { PATHWAY_CONTENT } from '@/lib/pathways-content';
import { INTENSIVE_CONTENT } from '@/lib/intensives-content';
import { getPricing, getIntensivePricing, formatPrice, type Region } from '@/lib/config';
import { useRegion } from '@/lib/useRegion';
import { SeatFillBar } from '@/components/ui/SeatFillBar';
import { Reveal } from '@/components/Reveal';

type Family = 'all' | 'pathways' | 'intensives';

const TABS: { key: Family; label: string }[] = [
  { key: 'all', label: 'All programmes' },
  { key: 'pathways', label: '12-week pathways' },
  { key: 'intensives', label: '5-week intensives' },
];

export function ProgrammePicker({ initialRegion }: { initialRegion: Region }) {
  const [region] = useRegion(initialRegion);
  const [family, setFamily] = useState<Family>('all');

  const pathwayTiles = family === 'intensives' ? [] : PATHWAY_LIST.map((p) => {
    const content = PATHWAY_CONTENT[p.slug];
    const pricing = getPricing(p.slug, region);
    return (
      <div key={p.slug} style={{ background: 'var(--paper)', padding: '28px 26px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--moss-700)' }}>{p.status.toUpperCase()}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 23, fontWeight: 600, letterSpacing: '-0.018em', margin: '12px 0 0' }}>{content.name}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-2)', margin: '10px 0 0' }}>{content.line}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '18px 0 0' }}>
          <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>From</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{formatPrice(pricing.standard, region)}</span>
        </div>
        <div style={{ margin: '16px 0 0' }}><SeatFillBar seatsMax={p.seatsMax} seatsRemaining={p.seatsRemaining} /></div>
        <span style={{ flex: 1, minHeight: 14 }} />
        <Link href={`/pathways/${p.slug}`} className="btn" style={{ background: 'var(--ink-800)', color: 'var(--bone)', height: 42, justifyContent: 'center', marginTop: 18 }}>
          Explore {p.trackCode}
        </Link>
      </div>
    );
  });

  const intensiveTiles = family === 'pathways' ? [] : INTENSIVE_LIST.map((iv) => {
    const content = INTENSIVE_CONTENT[iv.slug];
    const pricing = getIntensivePricing(iv.slug, region);
    return (
      <div key={iv.slug} style={{ background: 'var(--ink-800)', color: 'var(--bone)', padding: '28px 26px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--seal-300)' }}>5-WEEK INTENSIVE · {iv.status.toUpperCase()}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 23, fontWeight: 600, letterSpacing: '-0.018em', margin: '12px 0 0', color: 'var(--bone)' }}>{content.name}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-200)', margin: '10px 0 0' }}>{content.line}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '18px 0 0' }}>
          <span style={{ fontSize: 12, color: 'var(--ink-300)' }}>From</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--bone)' }}>{formatPrice(pricing.standalone, region)}</span>
        </div>
        <div style={{ margin: '18px 0 0', fontSize: 12, color: 'var(--ink-300)' }}>{iv.seatsRemaining} of {iv.seatsMax} seats left</div>
        <span style={{ flex: 1, minHeight: 14 }} />
        <Link href={`/intensives/${iv.slug}`} className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 42, justifyContent: 'center', marginTop: 18 }}>
          Explore {content.code}
        </Link>
      </div>
    );
  });

  return (
    <Reveal as="section" id="programmes" style={{ borderBottom: '1px solid var(--border-soft)' }}>
      <div className="container" style={{ padding: '96px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Six programmes, one spine</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '18px 0 0' }}>
          Choose where you&rsquo;ll build evidence.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--fg-2)', margin: '14px 0 0', maxWidth: '44em' }}>
          Four 12-week career pathways start {COHORT.startDateDisplay}. Two 5-week AI intensives start {COHORT.intensiveStartDateDisplay}.
        </p>
        <div style={{ display: 'flex', gap: 4, margin: '32px 0 0', borderBottom: '1px solid var(--border-soft)' }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setFamily(t.key)}
              style={{
                background: 'none', border: 0, cursor: 'pointer', padding: '10px 16px',
                fontSize: 13, fontWeight: 600, color: family === t.key ? 'var(--fg-1)' : 'var(--fg-3)',
                borderBottom: family === t.key ? '2px solid var(--seal-500)' : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border-soft)', margin: '40px 0 0', border: '1px solid var(--border-soft)' }}>
          {pathwayTiles}
          {intensiveTiles}
        </div>
      </div>
    </Reveal>
  );
}
