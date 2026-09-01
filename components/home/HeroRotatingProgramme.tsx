'use client';

import { useAutoAdvance } from '@/lib/useAutoAdvance';

// Cross-fades through every programme name every 2.2s in the hero eyebrow —
// "Four pathways" from v2 becomes a rotation across all six live programmes.
export function HeroRotatingProgramme({ names }: { names: string[] }) {
  const { index, containerRef } = useAutoAdvance({ count: names.length, intervalMs: 2200 });
  return (
    <span ref={containerRef} style={{ display: 'inline-block', position: 'relative', minWidth: '11em', verticalAlign: 'top' }}>
      {names.map((name, i) => (
        <span
          key={name}
          style={{
            position: i === index ? 'static' : 'absolute',
            left: 0,
            top: 0,
            opacity: i === index ? 1 : 0,
            transition: 'opacity 500ms var(--ease-quint-out)',
            color: 'var(--seal-600)',
          }}
          aria-hidden={i === index ? undefined : true}
        >
          {name}
        </span>
      ))}
    </span>
  );
}
