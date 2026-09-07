import { ImageResponse } from 'next/og';

// Shared per-route OG image renderer — ink background, display-serif
// headline, per the brief's spec. next/og's ImageResponse can't consume CSS
// custom properties (it runs at the edge, outside the app's stylesheet), so
// these are the brand hex values read directly from app/globals.css, not
// approximations. Each route's opengraph-image.tsx still needs its own
// runtime/alt/size/contentType exports — that's a Next.js file-convention
// requirement, not avoidable via this shared function.

export const OG_SIZE = { width: 1200, height: 630 };

export function renderProgrammeOG(name: string, kicker: string, startDisplay: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#060F1A', // --ink-900
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
        }}
      >
        <span
          style={{
            fontSize: 20,
            color: '#DE8B6A', // --seal-300
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontFamily: 'monospace',
          }}
        >
          {kicker}
        </span>

        <h1
          style={{
            fontSize: 76,
            color: '#F4EFE6', // --bone
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            fontWeight: 600,
            fontFamily: 'serif',
            maxWidth: 980,
          }}
        >
          {name}
        </h1>

        <p
          style={{
            fontSize: 22,
            color: '#AFB8C6', // --ink-200
            margin: 0,
            fontFamily: 'sans-serif',
          }}
        >
          Starts {startDisplay} · Upthrust Digital
        </p>
      </div>
    ),
    OG_SIZE,
  );
}
