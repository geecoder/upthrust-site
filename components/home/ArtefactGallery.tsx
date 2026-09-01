'use client';

import { useMemo, useState } from 'react';
import { PATHWAY_LIST, INTENSIVE_LIST, isIntensiveSlug, type ProgrammeSlug } from '@/lib/cohort-config';
import { PATHWAY_CONTENT } from '@/lib/pathways-content';
import { INTENSIVE_CONTENT } from '@/lib/intensives-content';
import { Reveal } from '@/components/Reveal';

const IDS: { slug: ProgrammeSlug; code: string; name: string }[] = [
  ...PATHWAY_LIST.map((p) => ({ slug: p.slug as ProgrammeSlug, code: p.trackCode, name: PATHWAY_CONTENT[p.slug].name })),
  ...INTENSIVE_LIST.map((iv) => ({ slug: iv.slug as ProgrammeSlug, code: INTENSIVE_CONTENT[iv.slug].code, name: INTENSIVE_CONTENT[iv.slug].name })),
];

function artefactsFor(slug: ProgrammeSlug): { wk: string; t: string; score: string; initials: string }[] {
  if (isIntensiveSlug(slug)) {
    const c = INTENSIVE_CONTENT[slug];
    return c.stages.map((s, i) => ({ wk: `W${String(i + 1).padStart(2, '0')}`, t: s.artefact, score: c.artScores[i].score, initials: c.artScores[i].initials }));
  }
  const c = PATHWAY_CONTENT[slug];
  return c.weekArt.map((t, i) => ({ wk: `W${String(i + 1).padStart(2, '0')}`, t, score: c.artScores[i].score, initials: c.artScores[i].initials }));
}

// "What you actually leave with" — a paginated, 4-at-a-time gallery of real
// weekly artefacts per programme, matching the ground-truth prototype's
// gArt/galTabs/galLabel/galDots structure.
export function ArtefactGallery() {
  const [slug, setSlug] = useState<ProgrammeSlug>(IDS[0].slug);
  const [page, setPage] = useState(0);

  const arts = useMemo(() => artefactsFor(slug), [slug]);
  const pages = Math.ceil(arts.length / 4);
  const clampedPage = Math.min(page, pages - 1);
  const start = clampedPage * 4;
  const visible = arts.slice(start, start + 4);
  const active = IDS.find((p) => p.slug === slug)!;

  function pick(s: ProgrammeSlug) {
    setSlug(s);
    setPage(0);
  }

  return (
    <Reveal as="section" style={{ borderBottom: '1px solid var(--border-soft)' }}>
      <div className="container" style={{ padding: '96px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Real work, not a syllabus</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '18px 0 0' }}>
          What you actually leave with.
        </h2>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '36px 0 0' }}>
          {IDS.map((p) => (
            <button
              key={p.slug}
              onClick={() => pick(p.slug)}
              style={{
                fontSize: 13, fontWeight: 600, padding: '9px 16px', cursor: 'pointer',
                border: `1px solid ${slug === p.slug ? 'var(--ink-900)' : 'var(--border-strong)'}`,
                background: slug === p.slug ? 'var(--ink-900)' : 'var(--white)',
                color: slug === p.slug ? 'var(--bone)' : 'var(--fg-2)',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, margin: '28px 0 16px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>
            {active.name.toUpperCase()} · WEEKS {String(start + 1).padStart(2, '0')}–{String(Math.min(start + 4, arts.length)).padStart(2, '0')} OF {arts.length}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setPage((p) => (p + pages - 1) % pages)} aria-label="Previous" style={{ width: 34, height: 34, border: '1px solid var(--border-strong)', background: 'var(--white)', cursor: 'pointer' }}>←</button>
            <button onClick={() => setPage((p) => (p + 1) % pages)} aria-label="Next" style={{ width: 34, height: 34, border: '1px solid var(--border-strong)', background: 'var(--white)', cursor: 'pointer' }}>→</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)' }}>
          {visible.map((a) => (
            <div key={a.wk} style={{ background: 'var(--paper)', padding: '22px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--seal-600)', letterSpacing: '0.08em' }}>{a.wk}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)' }}>SCORED {a.score}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, lineHeight: 1.3, margin: '10px 0 0' }}>{a.t}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-hair)' }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--ink-900)', color: 'var(--bone)', fontFamily: 'var(--font-mono)', fontSize: 9, display: 'grid', placeItems: 'center', flexShrink: 0 }}>{a.initials}</span>
                <span style={{ fontSize: 11, color: 'var(--fg-3)' }}>REVIEWED · REVISED · SIGNED OFF</span>
              </div>
            </div>
          ))}
        </div>

        {pages > 1 && (
          <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                style={{ height: 4, width: clampedPage === i ? 34 : 14, background: clampedPage === i ? 'var(--ink-900)' : 'var(--border-strong)', border: 0, cursor: 'pointer', padding: 0 }}
              />
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}
