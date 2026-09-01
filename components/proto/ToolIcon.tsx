'use client';

// Tool marks for the "tools you will work in" row.
//
// Each icon first tries a real file at /tools/{key}.svg, so dropping an
// official vendor SVG in public/tools/ upgrades it with no code change. Until
// then it renders the built-in mark below. The built-ins are hand-drawn,
// deliberately simple approximations in each product's own brand colour —
// recognisable at 18px, but not the licensed vendor artwork.
//
// Entries that describe a technique rather than a product (design tokens,
// recon tools, eval harnesses) have no product mark and get a monogram tile.

import { useEffect, useState } from 'react';

const S = 18;

function Wrap({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 24 24" width={S} height={S} role="img" aria-label={label} style={{ display: 'block', flex: 'none' }}>
      {children}
    </svg>
  );
}

function Monogram({ text, label }: { text: string; label: string }) {
  return (
    <svg viewBox="0 0 24 24" width={S} height={S} role="img" aria-label={label} style={{ display: 'block', flex: 'none' }}>
      <rect x="1" y="1" width="22" height="22" rx="3" fill="var(--ink-900)" />
      <text
        x="12" y="12" textAnchor="middle" dominantBaseline="central"
        fontFamily="var(--font-mono)" fontSize="9" fontWeight="700" fill="var(--bone)" letterSpacing="-.02em"
      >
        {text}
      </text>
    </svg>
  );
}

const MARKS: Record<string, (label: string) => React.ReactNode> = {
  figma: l => (
    <Wrap label={l}>
      <path d="M8 1.5h4v5H8a2.5 2.5 0 0 1 0-5Z" fill="#F24E1E" />
      <path d="M12 1.5h4a2.5 2.5 0 0 1 0 5h-4v-5Z" fill="#A259FF" />
      <path d="M8 6.5h4v5H8a2.5 2.5 0 0 1 0-5Z" fill="#FF7262" />
      <circle cx="16" cy="9" r="2.5" fill="#1ABCFE" />
      <path d="M8 11.5h4v2.5a2.5 2.5 0 1 1-4-1.8v-.7Z" fill="#0ACF83" />
    </Wrap>
  ),
  figjam: l => (
    <Wrap label={l}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#FFC700" />
      <circle cx="9" cy="9" r="2.4" fill="#0ACF83" />
      <circle cx="15" cy="9" r="2.4" fill="#1ABCFE" />
      <path d="M7.5 15c1.6 1.8 7.4 1.8 9 0" stroke="#0B1A2B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </Wrap>
  ),
  notion: l => (
    <Wrap label={l}>
      <rect x="1.5" y="1.5" width="21" height="21" rx="3" fill="#FFFFFF" stroke="#0B1A2B" strokeWidth="1.4" />
      <path d="M8 17V7l8 9.4V7" stroke="#0B1A2B" strokeWidth="2" fill="none" strokeLinejoin="round" />
    </Wrap>
  ),
  jira: l => (
    <Wrap label={l}>
      <path d="M12 1.6 22 12l-4 4-6-6.2-6 6.2L2 12 12 1.6Z" fill="#2684FF" />
      <path d="M12 9.8 18 16l-6 6.4L6 16l6-6.2Z" fill="#0052CC" />
    </Wrap>
  ),
  confluence: l => (
    <Wrap label={l}>
      <path d="M1.6 17.4c3.4-4.8 7.6-5.4 12-2.6l4.6 2.9-2.4 4-4.6-2.9c-2-1.2-3.6-.9-5 .9l-4.6-2.3Z" fill="#2684FF" />
      <path d="M22.4 6.6c-3.4 4.8-7.6 5.4-12 2.6L5.8 6.3l2.4-4 4.6 2.9c2 1.2 3.6.9 5-.9l4.6 2.3Z" fill="#0052CC" />
    </Wrap>
  ),
  miro: l => (
    <Wrap label={l}>
      <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="#FFD02F" />
      <path d="M7 18V8.4L4.6 12M12 18V7.6L9.2 12M17 18V7l-2.8 5" stroke="#0B1A2B" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Wrap>
  ),
  claude: l => (
    <Wrap label={l}>
      <g fill="#D97757">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x="11.1" y="2.4" width="1.8" height="9.6" rx=".9" transform={`rotate(${i * 22.5} 12 12)`} />
        ))}
      </g>
    </Wrap>
  ),
  // Claude Code: the terracotta mark reduced to a terminal prompt.
  claudecode: l => (
    <Wrap label={l}>
      <rect x="1.5" y="3" width="21" height="18" rx="2.5" fill="none" stroke="#D97757" strokeWidth="1.8" />
      <path d="M6.4 9.4 9.2 12l-2.8 2.6" stroke="#D97757" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.6 15.2h6" stroke="#D97757" strokeWidth="1.8" strokeLinecap="round" />
    </Wrap>
  ),
  // Codex: OpenAI's mark is an interlaced hexafoil; this is a six-fold
  // approximation of it, not the licensed artwork.
  codex: l => (
    <Wrap label={l}>
      <g fill="none" stroke="#0B1A2B" strokeWidth="1.5" strokeLinecap="round">
        {Array.from({ length: 3 }, (_, i) => (
          <ellipse key={i} cx="12" cy="12" rx="4.1" ry="9.4" transform={`rotate(${i * 60} 12 12)`} />
        ))}
      </g>
    </Wrap>
  ),
  python: l => (
    <Wrap label={l}>
      <path d="M11.6 1.8c-2.9 0-4.3.9-4.3 3v2.4h5.9v1.3H5.5c-2 0-3.5 1.3-3.5 4s1.2 4 3.2 4h1.6v-2.7c0-2.2 1.6-3.6 3.7-3.6h4.3V1.8h-3.2Z" fill="#3776AB" />
      <path d="M12.4 22.2c2.9 0 4.3-.9 4.3-3v-2.4h-5.9v-1.3h7.7c2 0 3.5-1.3 3.5-4s-1.2-4-3.2-4h-1.6v2.7c0 2.2-1.6 3.6-3.7 3.6H9.2v8.4h3.2Z" fill="#FFD43B" />
    </Wrap>
  ),
  git: l => (
    <Wrap label={l}>
      <path d="M5.5 18.5 18.5 5.5" stroke="#F05032" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M11 12h4.2a2 2 0 0 1 2 2v2.6" stroke="#F05032" strokeWidth="1.9" fill="none" strokeLinecap="round" />
      <circle cx="5" cy="19" r="2.6" fill="#F05032" />
      <circle cx="19" cy="5" r="2.6" fill="#F05032" />
      <circle cx="17.2" cy="18" r="2.6" fill="#F05032" />
    </Wrap>
  ),
  mixpanel: l => (
    <Wrap label={l}>
      <circle cx="5" cy="12" r="3.4" fill="#7856FF" />
      <circle cx="13" cy="12" r="2.4" fill="#A78BFA" />
      <circle cx="19.6" cy="12" r="1.6" fill="#C4B5FD" />
    </Wrap>
  ),
  drawio: l => (
    <Wrap label={l}>
      <path d="M12 6.5v4M7.5 17.5h9" stroke="#F08705" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="8.2" y="1.8" width="7.6" height="5" rx="1" fill="#F08705" />
      <rect x="2.4" y="15" width="6.4" height="5" rx="1" fill="#F08705" />
      <rect x="15.2" y="15" width="6.4" height="5" rx="1" fill="#F08705" />
      <path d="M12 10.5v3.2c0 .8-.6 1.3-1.4 1.3M12 13.7c0 .8.6 1.3 1.4 1.3" stroke="#F08705" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </Wrap>
  ),
  excel: l => (
    <Wrap label={l}>
      <rect x="2" y="2.5" width="20" height="19" rx="2.5" fill="#217346" />
      <path d="M8.4 8.2l7.2 7.6M15.6 8.2l-7.2 7.6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </Wrap>
  ),
  sql: l => (
    <Wrap label={l}>
      <ellipse cx="12" cy="5.6" rx="8" ry="3.1" fill="none" stroke="var(--seal-600)" strokeWidth="1.7" />
      <path d="M4 5.6v12.8c0 1.7 3.6 3.1 8 3.1s8-1.4 8-3.1V5.6" fill="none" stroke="var(--seal-600)" strokeWidth="1.7" />
      <path d="M4 12c0 1.7 3.6 3.1 8 3.1s8-1.4 8-3.1" fill="none" stroke="var(--seal-600)" strokeWidth="1.7" />
    </Wrap>
  ),
  maze: l => (
    <Wrap label={l}>
      <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="#1B1B3A" />
      <path d="M6 18V9l3 4 3-4 3 4 3-4v9" stroke="#4FD1C5" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Wrap>
  ),
  tokens: l => <Monogram text="DT" label={l} />,
  recon: l => <Monogram text="RC" label={l} />,
  vector: l => <Monogram text="VS" label={l} />,
  eval: l => <Monogram text="EV" label={l} />,
  process: l => <Monogram text="PM" label={l} />,
  prompt: l => <Monogram text="PS" label={l} />,
  dictionary: l => <Monogram text="DD" label={l} />,
  audit: l => <Monogram text="AL" label={l} />,
};

// Probe results are cached per icon key for the page's lifetime, so six tool
// chips don't each re-request the same file.
const probed = new Map<string, boolean>();

export function ToolIcon({ icon, label }: { icon: string; label: string }) {
  const [hasFile, setHasFile] = useState(() => probed.get(icon) ?? false);

  // The built-in mark renders first and a vendor file only replaces it once it
  // has actually decoded. Probing with an off-DOM Image rather than rendering
  // <img> and waiting for onError means a missing file never paints as a
  // broken-image icon.
  useEffect(() => {
    if (probed.has(icon)) return;
    const probe = new Image();
    probe.onload = () => { probed.set(icon, true); setHasFile(true); };
    probe.onerror = () => { probed.set(icon, false); };
    probe.src = `/tools/${icon}.svg`;
  }, [icon]);

  if (hasFile) {
    return (
      <img
        src={`/tools/${icon}.svg`}
        alt=""
        aria-hidden="true"
        width={S}
        height={S}
        style={{ display: 'block', flex: 'none', width: S, height: S, objectFit: 'contain' }}
      />
    );
  }

  const mark = MARKS[icon];
  return <>{mark ? mark(label) : <Monogram text={label.slice(0, 2).toUpperCase()} label={label} />}</>;
}
