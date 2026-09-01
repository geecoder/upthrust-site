import type { FacilitatorEntry } from '@/lib/intensives-content';

// No "facilitator TBC" pattern existed anywhere in the repo before this —
// verified directly. Both intensives currently have 2 of their 3 roster
// slots unconfirmed in the prototype (a real, honest state, not an
// oversight), so this renders either a confirmed facilitator card or a
// muted empty state — never a blank div. Uses the same design tokens as
// PathwayPageTemplate.tsx's "who teaches this" section and the About page's
// facilitator bio (var(--font-display), var(--font-mono), var(--fg-3), etc.)
// rather than any new hardcoded colors.
export function FacilitatorSlot({ slot }: { slot: FacilitatorEntry }) {
  if (slot.status === 'tbc') {
    return (
      <div
        style={{
          background: 'var(--paper-dim)',
          border: '1px dashed var(--border-strong)',
          padding: '24px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          minHeight: 168,
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>
          {slot.weeks.toUpperCase()}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, color: 'var(--fg-3)', marginTop: 4 }}>
          Facilitator TBC
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--fg-3)' }}>
          {slot.role} · announced before cohort start
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--border-soft)',
        padding: '24px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minHeight: 168,
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--seal-600)' }}>
        {slot.weeks.toUpperCase()}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, marginTop: 4 }}>{slot.name}</div>
      <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>{slot.role}</div>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--fg-2)', marginTop: 10 }}>{slot.bio}</p>
    </div>
  );
}
