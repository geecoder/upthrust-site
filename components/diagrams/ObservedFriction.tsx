// Ported 1:1 from the approved prototype (PD pathway template, pthIsPd block).
// A friction line measured across six screens, with 58% abandoning at the
// identity step.
export default function ObservedFriction() {
  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox="0 0 520 300"
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        <text x={8} y={16} fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.1em">
          OBSERVED FRICTION · 12 SESSIONS
        </text>
        <g stroke="var(--border-soft)" strokeWidth={1}>
          <path d="M8 100 L512 100" />
          <path d="M8 70 L512 70" />
          <path d="M8 40 L512 40" />
        </g>
        <path
          d="M40 92 L124 84 L208 30 L292 74 L376 88 L460 94"
          fill="none"
          stroke="var(--seal-500)"
          strokeWidth={2}
        />
        <g fill="var(--seal-500)">
          <circle cx={40} cy={92} r={3} />
          <circle cx={124} cy={84} r={3} />
          <circle cx={208} cy={30} r={4} />
          <circle cx={292} cy={74} r={3} />
          <circle cx={376} cy={88} r={3} />
          <circle cx={460} cy={94} r={3} />
        </g>
        <path d="M208 34 L208 128" stroke="var(--seal-300)" strokeWidth={1} strokeDasharray="2 2" />
        <text x={216} y={26} fill="var(--seal-600)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.06em">
          58% ABANDON HERE
        </text>
        <g>
          <rect x={8} y={138} width={72} height={92} fill="var(--white)" stroke="var(--ink-400)" />
          <rect x={92} y={138} width={72} height={92} fill="var(--white)" stroke="var(--ink-400)" />
          <rect x={176} y={138} width={72} height={92} fill="var(--white)" stroke="var(--seal-500)" strokeWidth={1.5} />
          <rect x={260} y={138} width={72} height={92} fill="var(--white)" stroke="var(--ink-400)" />
          <rect x={344} y={138} width={72} height={92} fill="var(--white)" stroke="var(--ink-400)" />
          <rect x={428} y={138} width={72} height={92} fill="var(--white)" stroke="var(--ink-400)" />
        </g>
        <g fill="var(--paper-dim)">
          <rect x={16} y={148} width={56} height={6} />
          <rect x={16} y={160} width={40} height={6} />
          <rect x={16} y={172} width={50} height={6} />
          <rect x={100} y={148} width={56} height={6} />
          <rect x={100} y={160} width={44} height={6} />
          <rect x={100} y={172} width={36} height={6} />
          <rect x={268} y={148} width={56} height={6} />
          <rect x={268} y={160} width={40} height={6} />
          <rect x={352} y={148} width={56} height={6} />
          <rect x={352} y={160} width={48} height={6} />
          <rect x={436} y={148} width={56} height={6} />
          <rect x={436} y={160} width={42} height={6} />
        </g>
        <g fill="var(--seal-50)">
          <rect x={184} y={148} width={56} height={6} />
          <rect x={184} y={160} width={48} height={6} />
          <rect x={184} y={172} width={52} height={6} />
        </g>
        <g fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={8} letterSpacing="0.06em">
          <text x={16} y={248}>01 ENTRY</text>
          <text x={100} y={248}>02 DETAILS</text>
          <text x={184} y={248} fill="var(--seal-600)">03 IDENTITY</text>
          <text x={268} y={248}>04 REVIEW</text>
          <text x={352} y={248}>05 CONFIRM</text>
          <text x={436} y={248}>06 FIRST USE</text>
        </g>
        <path d="M184 262 L240 262" stroke="var(--moss-500)" strokeWidth={1} />
        <text x={8} y={286} fill="var(--moss-700)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.06em">
          YOUR JOB: REDESIGN STEP 03, THEN PROVE IT MOVED
        </text>
      </svg>
      <figcaption
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '.08em',
          color: 'var(--fg-3)',
          marginTop: 10,
        }}
      >
        FIG 01 · FRICTION MEASURED ACROSS 12 SESSIONS, MAPPED TO SIX SCREENS — WEEK 04
      </figcaption>
    </figure>
  );
}
