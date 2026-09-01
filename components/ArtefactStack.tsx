// The programme-page hero's overlapping artefact stack — the prototype's
// `d.stack`, which is the only place its `v3card` keyframe is used.
//
// It is a rolling five-card window ending at the currently selected
// curriculum week: `arts.slice(max(0, wi - 4), wi + 1)`. Each card is
// absolutely positioned 54px below the last with an increasing z-index, so
// the deck fans downward with the newest artefact in front. Back cards are
// clipped to 54px (only their badge row shows) and fade back along a
// 0.38 + i*0.14 ramp; the front card is full height and fully opaque.
//
// Selecting a different week in the curriculum track re-keys the cards, which
// remounts them and replays the entrance — the prototype's behaviour, where
// `sc-for` re-mounts on every `d.stack` re-render. `prefers-reduced-motion`
// zeroes animation durations site-wide, so it degrades to appearing at rest.

'use client';

export interface ArtefactStackItem {
  label: string;
  body?: string;
}

const OFFSET = 54; // px between each stacked card's top position
const WINDOW = 5; // cards visible at once
const STACK_HEIGHT = 520;

// Four skeleton bars standing in for the artefact's content — the prototype
// draws the same placeholder rather than a fake document.
const SKELETON_WIDTHS = ['92%', '78%', '86%', '54%'];

export function ArtefactStack({ items, weekIndex }: { items: ArtefactStackItem[]; weekIndex?: number }) {
  const wi = Math.min(Math.max(weekIndex ?? WINDOW - 1, 0), items.length - 1);
  const start = Math.max(0, wi - (WINDOW - 1));
  const window = items.slice(start, wi + 1);

  return (
    <div style={{ position: 'relative', width: '100%', height: STACK_HEIGHT }}>
      {window.map((item, i) => {
        const isFront = i === window.length - 1;
        const weekNum = start + i + 1;
        return (
          // Wrapper carries the entrance animation; the card inside carries the
          // resting opacity. Keeping them on separate elements is what stops
          // the animation's fill state from flattening the fade ramp.
          <div
            key={`${wi}-${weekNum}`}
            className="v3card"
            style={{ position: 'absolute', left: 0, right: 0, top: i * OFFSET, zIndex: i + 1 }}
          >
            <div
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--ink-800)',
                boxShadow: 'var(--shadow-3)',
                padding: '20px 22px',
                height: isFront ? 'auto' : OFFSET,
                overflow: 'hidden',
                opacity: isFront ? 1 : 0.38 + i * 0.14,
                transition: 'opacity 300ms',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>
                  W{String(weekNum).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    letterSpacing: '0.12em',
                    color: isFront ? 'var(--seal-600)' : 'var(--moss-700)',
                  }}
                >
                  {isFront ? 'IN REVIEW' : 'SIGNED OFF'}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: isFront ? 22 : 15,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  margin: '10px 0 0',
                }}
              >
                {item.label}
              </div>
              {item.body && isFront && (
                <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-2)', margin: '10px 0 0' }}>{item.body}</p>
              )}
              <div style={{ display: 'grid', gap: 8, margin: '18px 0 0' }} aria-hidden="true">
                {SKELETON_WIDTHS.map((w, li) => (
                  <div key={li} style={{ height: 6, width: w, background: 'var(--paper-dim)' }} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
