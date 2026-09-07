import Link from 'next/link';

const ARCHETYPES = [
  { num: '01', title: 'The Career Switcher', icon: 'switch', body: "You've spent years in banking, ops, support, admin, teaching, or healthcare. You can see how product roles use the exact instincts you've already built — you just need the language, the artefacts, and the proof." },
  { num: '02', title: 'The Early-Career Professional', icon: 'sprout', body: 'You graduated. Maybe you got a junior role. But you keep getting filtered out for "lack of experience." You need a way to demonstrate experience without waiting five years to be given the chance.' },
  { num: '03', title: 'The International Repositioner', icon: 'globe', body: "You moved to the UK, Canada, or Australia. Or you're planning to. Your previous work doesn't translate cleanly. You need portfolio evidence that reads to a Western product team and a story that lands in 30 seconds." },
  { num: '04', title: 'The Quiet Upgrader', icon: 'upgrade', body: "You're already in a product-adjacent role. You're doing some of the work. But your title doesn't say it, your portfolio doesn't show it, and your career growth has stalled. You need to formalise what you already do." },
] as const;

function ArchetypeIcon({ name }: { name: string }) {
  const common = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--seal-600)', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (name === 'switch') {
    return (
      <svg {...common}>
        <path d="M4 8h13l-3-3M20 16H7l3 3" />
      </svg>
    );
  }
  if (name === 'sprout') {
    return (
      <svg {...common}>
        <path d="M12 21V11" />
        <path d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6Z" />
        <path d="M12 15c0-3-2.5-5-6-5 0 3 2.5 5 6 5Z" />
      </svg>
    );
  }
  if (name === 'globe') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 18 20 4M20 4h-7M20 4v7" />
    </svg>
  );
}

// Unwired from the home page during the prototype ground-truth reconciliation
// pass — the prototype's home route doesn't include this section. Kept here,
// compiled but unused, in case it's wanted elsewhere later.
export function WhoItsFor() {
  return (
    <section style={{ borderBottom: '1px solid var(--border-soft)' }}>
      <div className="container" style={{ padding: '96px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Who Upthrust Digital is built for</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.1, margin: '18px 0 0', maxWidth: '26em' }}>
          Four kinds of people land here. They tend to recognise themselves quickly.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '48px 0 0' }}>
          {ARCHETYPES.map((a) => (
            <div key={a.num} style={{ background: 'var(--paper)', padding: '30px 28px' }}>
              <div style={{ width: 44, height: 44, border: '1px solid var(--seal-100)', background: 'var(--seal-50)', display: 'grid', placeItems: 'center', marginBottom: 16 }}>
                <ArchetypeIcon name={a.icon} />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--seal-600)', letterSpacing: '0.1em' }}>{a.num}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.018em', margin: '10px 0 0' }}>{a.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-2)', margin: '12px 0 0' }}>{a.body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <Link href="/assessment" className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', height: 48, padding: '0 24px' }}>
            Take the Career Assessment — 8 minutes
          </Link>
        </div>
      </div>
    </section>
  );
}
