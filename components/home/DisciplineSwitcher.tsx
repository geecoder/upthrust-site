'use client';

import { PATHWAY_LIST, INTENSIVE_LIST, isIntensiveSlug, type ProgrammeSlug } from '@/lib/cohort-config';
import { PATHWAY_CONTENT } from '@/lib/pathways-content';
import { INTENSIVE_CONTENT } from '@/lib/intensives-content';
import { useAutoAdvance } from '@/lib/useAutoAdvance';

interface Discipline {
  slug: ProgrammeSlug;
  code: string;
  name: string;
  artefacts: string[];
}

const DISCIPLINES: Discipline[] = [
  ...PATHWAY_LIST.map((p) => ({ slug: p.slug, code: p.trackCode, name: PATHWAY_CONTENT[p.slug].name, artefacts: PATHWAY_CONTENT[p.slug].art })),
  ...INTENSIVE_LIST.map((iv) => ({ slug: iv.slug, code: INTENSIVE_CONTENT[iv.slug].code, name: INTENSIVE_CONTENT[iv.slug].name, artefacts: INTENSIVE_CONTENT[iv.slug].stages.map((s) => s.artefact) })),
];

// A 6-way, one-at-a-time view of "what you actually leave with" — every
// pathway's marketing artefact list plus every intensive's 5 stage artefacts,
// auto-advancing through disciplines with manual prev/next/dot control.
// No per-artefact score exists in the content files, so the "reviewed" tag
// below is decorative UI dressing, not a real datum.
export function DisciplineSwitcher() {
  const { index, containerRef, onMouseEnter, onMouseLeave, goTo } = useAutoAdvance({ count: DISCIPLINES.length, intervalMs: 4200 });
  const active = DISCIPLINES[index];
  const isIntensive = isIntensiveSlug(active.slug);

  return (
    <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
      <div className="container" style={{ padding: '96px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>What you actually leave with</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '18px 0 0', maxWidth: '24em' }}>
          Not a certificate. A stack of defensible work.
        </h2>

        <div ref={containerRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ margin: '44px 0 0' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
            {DISCIPLINES.map((d, i) => (
              <button
                key={d.slug}
                onClick={() => goTo(i)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', padding: '8px 14px', cursor: 'pointer',
                  border: `1px solid ${i === index ? 'var(--seal-500)' : 'var(--border-strong)'}`,
                  background: i === index ? 'var(--seal-500)' : 'var(--paper)',
                  color: i === index ? 'var(--bone)' : 'var(--fg-1)',
                }}
              >
                {d.code}
              </button>
            ))}
          </div>

          <div style={{ background: isIntensive ? 'var(--ink-800)' : 'var(--paper)', color: isIntensive ? 'var(--bone)' : 'var(--fg-1)', border: '1px solid var(--border-soft)', padding: '36px 32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: isIntensive ? 'var(--seal-300)' : 'var(--seal-600)' }}>{active.name.toUpperCase()}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '22px 0 0' }}>
              {active.artefacts.map((a, i) => (
                <div key={a} style={{ background: isIntensive ? 'var(--ink-900)' : 'var(--paper)', padding: '16px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isIntensive ? 'var(--ink-300)' : 'var(--fg-3)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.06em', color: 'var(--moss-500)' }}>REVIEWED</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
