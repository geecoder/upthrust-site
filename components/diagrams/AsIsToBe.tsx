// Ported 1:1 from the approved prototype (BA pathway template, pthIsBa block).
// A five-step As-Is process with a flagged 3.2-day break, and the To-Be
// process that closes it.
export default function AsIsToBe() {
  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox="0 0 520 300"
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        <text x={8} y={18} fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.1em">
          AS-IS · WHAT HAPPENS TODAY
        </text>
        <g>
          <rect x={8} y={30} width={86} height={34} fill="var(--white)" stroke="var(--ink-400)" />
          <rect x={112} y={30} width={86} height={34} fill="var(--white)" stroke="var(--ink-400)" />
          <rect x={216} y={30} width={86} height={34} fill="var(--white)" stroke="var(--ink-400)" />
          <rect x={320} y={30} width={86} height={34} fill="var(--white)" stroke="var(--crimson-500)" />
          <rect x={424} y={30} width={86} height={34} fill="var(--white)" stroke="var(--ink-400)" />
        </g>
        <g fill="var(--fg-2)" fontFamily="var(--font-ui)" fontSize={10}>
          <text x={20} y={51}>Request in</text>
          <text x={124} y={51}>Manual check</text>
          <text x={228} y={51}>Email approval</text>
          <text x={332} y={51} fill="var(--crimson-700)">Re-key to core</text>
          <text x={436} y={51}>Confirmed</text>
        </g>
        <g stroke="var(--ink-400)" strokeWidth={1} fill="none">
          <path d="M94 47 L112 47" />
          <path d="M198 47 L216 47" />
          <path d="M302 47 L320 47" />
          <path d="M406 47 L424 47" />
        </g>
        <g>
          <path d="M363 64 L363 92" stroke="var(--crimson-500)" strokeWidth={1} strokeDasharray="2 2" fill="none" />
          <rect x={250} y={94} width={230} height={46} fill="var(--crimson-50)" stroke="var(--crimson-500)" />
          <text x={262} y={112} fill="var(--crimson-700)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.08em">
            BREAK · 3.2 DAY AVERAGE DELAY
          </text>
          <text x={262} y={128} fill="var(--fg-1)" fontFamily="var(--font-ui)" fontSize={10}>
            No owner, no audit trail, 11% re-key errors
          </text>
        </g>
        <text x={8} y={180} fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.1em">
          TO-BE · WHAT YOU SPECIFY
        </text>
        <g>
          <rect x={8} y={192} width={86} height={34} fill="var(--white)" stroke="var(--ink-800)" />
          <rect x={112} y={192} width={86} height={34} fill="var(--white)" stroke="var(--ink-800)" />
          <rect x={216} y={192} width={138} height={34} fill="var(--moss-50)" stroke="var(--moss-500)" />
          <rect x={372} y={192} width={138} height={34} fill="var(--white)" stroke="var(--ink-800)" />
        </g>
        <g fill="var(--fg-1)" fontFamily="var(--font-ui)" fontSize={10}>
          <text x={20} y={213}>Request in</text>
          <text x={124} y={213}>Rules check</text>
          <text x={228} y={213} fill="var(--moss-700)">Automated write to core</text>
          <text x={384} y={213}>Confirmed + logged</text>
        </g>
        <g stroke="var(--ink-800)" strokeWidth={1} fill="none">
          <path d="M94 209 L112 209" />
          <path d="M198 209 L216 209" />
          <path d="M354 209 L372 209" />
        </g>
        <text x={8} y={256} fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.06em">
          24 FUNCTIONAL · 9 NON-FUNCTIONAL REQUIREMENTS
        </text>
        <text x={8} y={274} fill="var(--moss-700)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.06em">
          RESULT: 3.2 DAYS → 4 MINUTES, FULLY AUDITABLE
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
        FIG 01 · A REAL PROCESS BREAK AND THE REQUIREMENTS THAT CLOSE IT — WEEK 05
      </figcaption>
    </figure>
  );
}
