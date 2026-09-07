'use client';

import { RHYTHM } from '@/lib/weekly-loop-content';
import { useAutoAdvance } from '@/lib/useAutoAdvance';
import { Reveal } from '@/components/Reveal';

// Self-advancing take on the six-move weekly rhythm — a fresh card row for
// the home page, distinct from /accelerator's click-only dial (same RHYTHM
// content, different interaction). 240ms ticks, 100 ticks/step = 24s/step,
// with a visibly filling progress bar on the active card.
export function WeeklyLoopSection() {
  const { index, progress, containerRef, onMouseEnter, onMouseLeave, goTo } = useAutoAdvance({
    count: RHYTHM.length,
    intervalMs: 240,
    ticksPerStep: 100,
  });
  const active = RHYTHM[index];

  return (
    <Reveal as="section" style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--bone-dim)' }}>
      <div className="container" style={{ padding: '96px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Every week, on repeat</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', margin: '18px 0 0', maxWidth: '20em' }}>
          One week, six moves. Repeated twelve times.
        </h2>
        <div ref={containerRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ margin: '48px 0 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 2 }}>
            {RHYTHM.map((move, i) => (
              <button
                key={move.num}
                onClick={() => goTo(i)}
                style={{ background: i === index ? 'var(--ink-800)' : 'var(--paper)', border: '1px solid var(--border-soft)', cursor: 'pointer', padding: '14px 10px', textAlign: 'left', position: 'relative', overflow: 'hidden' }}
              >
                {i === index && (
                  <span style={{ position: 'absolute', left: 0, bottom: 0, height: 2, width: `${progress * 100}%`, background: 'var(--seal-500)', transition: 'width 200ms linear' }} />
                )}
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: i === index ? 'var(--seal-300)' : 'var(--fg-3)' }}>{move.num}</span>
                <span style={{ display: 'block', fontSize: 13, fontWeight: 600, marginTop: 6, color: i === index ? 'var(--bone)' : 'var(--fg-1)' }}>{move.title}</span>
              </button>
            ))}
          </div>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--border-soft)', borderTop: 0, padding: '32px 28px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--seal-600)' }}>{active.meta}</div>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--fg-1)', margin: '12px 0 0', maxWidth: '42em' }}>{active.detail}</p>
            <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 14, fontWeight: 600 }}>→ {active.outcome}</div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
