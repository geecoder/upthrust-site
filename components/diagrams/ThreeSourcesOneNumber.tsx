// Ported 1:1 from the approved prototype (PO pathway template, pthIsPo block).
// Ledger, processor, and bank lanes over one day, one unmatched break
// highlighted, 1,247 matched vs 11 breaks.
export default function ThreeSourcesOneNumber() {
  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox="0 0 520 300"
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        <text x={8} y={16} fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.1em">
          ONE DAY · THREE SOURCES · 08:00–18:00 WAT
        </text>
        <g stroke="var(--border-soft)" strokeWidth={1}>
          <path d="M96 46 L512 46" />
          <path d="M96 110 L512 110" />
          <path d="M96 174 L512 174" />
        </g>
        <g fill="var(--fg-2)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.08em">
          <text x={8} y={42}>LEDGER</text>
          <text x={8} y={106}>PROCESSOR</text>
          <text x={8} y={170}>BANK</text>
        </g>
        <g fill="var(--ink-800)">
          <rect x={120} y={36} width={4} height={20} />
          <rect x={176} y={36} width={4} height={20} />
          <rect x={232} y={36} width={4} height={20} />
          <rect x={288} y={36} width={4} height={20} />
          <rect x={344} y={36} width={4} height={20} />
          <rect x={400} y={36} width={4} height={20} />
          <rect x={456} y={36} width={4} height={20} />
          <rect x={120} y={100} width={4} height={20} />
          <rect x={176} y={100} width={4} height={20} />
          <rect x={232} y={100} width={4} height={20} />
          <rect x={344} y={100} width={4} height={20} />
          <rect x={400} y={100} width={4} height={20} />
          <rect x={456} y={100} width={4} height={20} />
          <rect x={120} y={164} width={4} height={20} />
          <rect x={176} y={164} width={4} height={20} />
          <rect x={232} y={164} width={4} height={20} />
          <rect x={288} y={164} width={4} height={20} />
          <rect x={400} y={164} width={4} height={20} />
          <rect x={456} y={164} width={4} height={20} />
        </g>
        <rect
          x={280}
          y={30}
          width={20}
          height={160}
          fill="none"
          stroke="var(--seal-500)"
          strokeWidth={1.5}
          strokeDasharray="3 2"
        />
        <text x={306} y={206} fill="var(--seal-600)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.06em">
          BREAK · NGN 184,500 UNMATCHED
        </text>
        <text x={306} y={220} fill="var(--fg-2)" fontFamily="var(--font-ui)" fontSize={10}>
          Processor never received it. Ledger says paid.
        </text>
        <g>
          <rect x={8} y={238} width={150} height={46} fill="var(--moss-50)" stroke="var(--moss-500)" />
          <text x={20} y={256} fill="var(--moss-700)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.08em">
            MATCHED 1,247
          </text>
          <text x={20} y={272} fill="var(--fg-2)" fontFamily="var(--font-ui)" fontSize={10}>
            99.1% of volume
          </text>
          <rect x={170} y={238} width={150} height={46} fill="var(--seal-50)" stroke="var(--seal-500)" />
          <text x={182} y={256} fill="var(--seal-700)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.08em">
            BREAKS 11
          </text>
          <text x={182} y={272} fill="var(--fg-2)" fontFamily="var(--font-ui)" fontSize={10}>
            Owner + ageing rule each
          </text>
        </g>
        <text x={332} y={256} fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.06em">
          YOUR JOB:
        </text>
        <text x={332} y={272} fill="var(--fg-1)" fontFamily="var(--font-ui)" fontSize={11} fontWeight={600}>
          Make the number balance.
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
        FIG 01 · A SINGLE DAY OF RECONCILIATION, ELEVEN BREAKS — WEEK 06
      </figcaption>
    </figure>
  );
}
