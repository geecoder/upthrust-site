// Ported 1:1 from the approved prototype (Home page, "The pathways" section, FIG 01).
// One shared twelve-week spine, four pathway lanes, each colour-banded by phase and
// ending in a capstone.
export default function OneSpineFourPathways() {
  return (
    <figure
      style={{
        margin: 0,
        background: 'var(--paper)',
        border: '1px solid var(--border-strong)',
        padding: '24px 26px 18px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 16,
          borderBottom: '1px solid var(--border-soft)',
          paddingBottom: 12,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '.12em',
            color: 'var(--fg-3)',
          }}
        >
          ONE TWELVE-WEEK SPINE · FOUR PATHWAY OUTPUTS
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '.12em',
            color: 'var(--seal-600)',
          }}
        >
          FIG 01
        </span>
      </div>

      <svg
        viewBox="0 0 1080 344"
        style={{ width: '100%', height: 'auto', display: 'block', marginTop: 18, overflow: 'visible' }}
      >
        <g stroke="var(--border-soft)" strokeWidth={1}>
          <path d="M150 40 L1040 40" />
          <path d="M150 110 L1040 110" />
          <path d="M150 180 L1040 180" />
          <path d="M150 250 L1040 250" />
        </g>
        <g fill="var(--ink-800)">
          <rect x={150} y={304} width={890} height={22} />
        </g>
        <g fontFamily="var(--font-mono)" fontSize={10} letterSpacing="0.08em">
          <text x={162} y={319} fill="var(--bone)">W01 FOUNDATION</text>
          <text x={420} y={319} fill="var(--bone)">W04 CORE SKILLS</text>
          <text x={700} y={319} fill="var(--bone)">W08 DELIVERY</text>
          <text x={936} y={319} fill="var(--bone)">W12 DEFENCE</text>
        </g>
        <g fill="var(--fg-1)" fontFamily="var(--font-ui)" fontSize={13} fontWeight={600}>
          <text x={8} y={36}>Product Management</text>
          <text x={8} y={106}>Business Analysis</text>
          <text x={8} y={176}>Product Design</text>
          <text x={8} y={246}>Payment Operations</text>
        </g>
        <g fill="var(--seal-500)">
          <rect x={150} y={26} width={150} height={10} />
          <rect x={150} y={96} width={150} height={10} />
          <rect x={150} y={166} width={150} height={10} />
          <rect x={150} y={236} width={150} height={10} />
        </g>
        <g fill="var(--ink-600)">
          <rect x={310} y={26} width={330} height={10} />
          <rect x={310} y={96} width={330} height={10} />
          <rect x={310} y={166} width={330} height={10} />
          <rect x={310} y={236} width={330} height={10} />
        </g>
        <g fill="var(--ink-400)">
          <rect x={650} y={26} width={270} height={10} />
          <rect x={650} y={96} width={270} height={10} />
          <rect x={650} y={166} width={270} height={10} />
          <rect x={650} y={236} width={270} height={10} />
        </g>
        <g fill="var(--moss-500)">
          <rect x={930} y={26} width={110} height={10} />
          <rect x={930} y={96} width={110} height={10} />
          <rect x={930} y={166} width={110} height={10} />
          <rect x={930} y={236} width={110} height={10} />
        </g>
        <g fill="var(--fg-2)" fontFamily="var(--font-ui)" fontSize={11}>
          <text x={316} y={58}>PRD · roadmap · metrics plan</text>
          <text x={316} y={128}>BRD · process maps · UAT pack</text>
          <text x={316} y={198}>Research · IA · flows · prototype</text>
          <text x={316} y={268}>Recon model · settlement · controls</text>
        </g>
        <g fill="var(--moss-700)" fontFamily="var(--font-mono)" fontSize={9} letterSpacing="0.06em">
          <text x={930} y={58}>CAPSTONE</text>
          <text x={930} y={128}>CAPSTONE</text>
          <text x={930} y={198}>CAPSTONE</text>
          <text x={930} y={268}>CAPSTONE</text>
        </g>
      </svg>

      <div
        style={{
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap',
          marginTop: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '.08em',
          color: 'var(--fg-3)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 8, background: 'var(--seal-500)', display: 'inline-block' }} />
          SHARED FOUNDATION
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 8, background: 'var(--ink-600)', display: 'inline-block' }} />
          PATHWAY CORE SKILLS
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 8, background: 'var(--ink-400)', display: 'inline-block' }} />
          DELIVERY &amp; PORTFOLIO
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 8, background: 'var(--moss-500)', display: 'inline-block' }} />
          DEFENCE &amp; PASSPORT
        </span>
      </div>

      <figcaption
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '.08em',
          color: 'var(--fg-3)',
          marginTop: 10,
        }}
      >
        FIG 01 · ONE TWELVE-WEEK SPINE, FOUR PATHWAY OUTPUTS — ALL START 26 SEPTEMBER 2026
      </figcaption>
    </figure>
  );
}
