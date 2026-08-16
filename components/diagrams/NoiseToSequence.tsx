// Ported 1:1 from the approved prototype (PM pathway template, pthIsPm block).
// Six competing inputs funnel through problem framing into one ranked sequence
// with kill criteria, plus a "deliberately not doing" branch.
export default function NoiseToSequence() {
  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox="0 0 520 300"
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        <g fill="none" stroke="var(--ink-400)" strokeWidth={1}>
          <rect x={8} y={18} width={120} height={26} />
          <rect x={8} y={52} width={120} height={26} />
          <rect x={8} y={86} width={120} height={26} />
          <rect x={8} y={120} width={120} height={26} />
          <rect x={8} y={154} width={120} height={26} />
          <rect x={8} y={188} width={120} height={26} />
        </g>
        <g fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.06em">
          <text x={18} y={35}>CHURN SIGNAL</text>
          <text x={18} y={69}>SALES REQUEST</text>
          <text x={18} y={103}>SUPPORT VOLUME</text>
          <text x={18} y={137}>COMPETITOR MOVE</text>
          <text x={18} y={171}>TECH DEBT</text>
          <text x={18} y={205}>FOUNDER IDEA</text>
        </g>
        <g fill="none" stroke="var(--ink-300)" strokeWidth={1} strokeDasharray="3 3">
          <path d="M128 31 L216 116" />
          <path d="M128 65 L216 116" />
          <path d="M128 99 L216 116" />
          <path d="M128 133 L216 116" />
          <path d="M128 167 L216 116" />
          <path d="M128 201 L216 116" />
        </g>
        <circle cx={232} cy={116} r={30} fill="none" stroke="var(--seal-500)" strokeWidth={1.5} />
        <circle cx={232} cy={116} r={20} fill="none" stroke="var(--seal-300)" strokeWidth={1} />
        <text x={232} y={113} textAnchor="middle" fill="var(--seal-600)" fontFamily="var(--font-mono)" fontSize={8} letterSpacing="0.1em">
          PROBLEM
        </text>
        <text x={232} y={124} textAnchor="middle" fill="var(--seal-600)" fontFamily="var(--font-mono)" fontSize={8} letterSpacing="0.1em">
          FRAMING
        </text>
        <path d="M262 116 L306 116" stroke="var(--ink-800)" strokeWidth={1} />
        <g>
          <rect x={306} y={34} width={180} height={42} fill="var(--white)" stroke="var(--ink-800)" strokeWidth={1} />
          <text x={318} y={52} fill="var(--fg-1)" fontFamily="var(--font-ui)" fontSize={11} fontWeight={600}>
            01 · Ship the smallest test
          </text>
          <text x={318} y={67} fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={8.5}>
            METRIC: ACTIVATION +4pt
          </text>
          <rect x={306} y={95} width={180} height={42} fill="var(--white)" stroke="var(--ink-400)" strokeWidth={1} />
          <text x={318} y={113} fill="var(--fg-1)" fontFamily="var(--font-ui)" fontSize={11} fontWeight={600}>
            02 · Widen if it holds
          </text>
          <text x={318} y={128} fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={8.5}>
            METRIC: RETENTION D30
          </text>
          <rect x={306} y={156} width={180} height={42} fill="var(--white)" stroke="var(--ink-400)" strokeWidth={1} />
          <text x={318} y={174} fill="var(--fg-1)" fontFamily="var(--font-ui)" fontSize={11} fontWeight={600}>
            03 · Scale or kill
          </text>
          <text x={318} y={189} fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={8.5}>
            KILL IF &lt; 2pt BY WEEK 6
          </text>
        </g>
        <path
          d="M232 146 L232 244 L300 244"
          stroke="var(--ink-300)"
          strokeWidth={1}
          strokeDasharray="3 3"
          fill="none"
        />
        <text x={306} y={248} fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.06em">
          DELIBERATELY NOT DOING
        </text>
        <text x={8} y={278} fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.06em">
          SIX COMPETING INPUTS
        </text>
        <text x={306} y={278} fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.06em">
          ONE DEFENSIBLE SEQUENCE
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
        FIG 01 · SIX COMPETING INPUTS, ONE DEFENSIBLE ORDER — THE WEEK 03 EXERCISE
      </figcaption>
    </figure>
  );
}
