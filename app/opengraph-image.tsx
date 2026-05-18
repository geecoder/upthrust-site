import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Upthrust — Build evidence of capability. Not another certificate.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#FAF7F1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
            <path d="M14 78 L50 22 L86 78 M32 65 L68 65" stroke="#0F1A2E" strokeWidth="8" strokeLinecap="square" />
          </svg>
          <span style={{ fontSize: 36, color: '#0F1A2E', fontWeight: 500, letterSpacing: '-0.02em' }}>Upthrust</span>
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{
            fontSize: 16,
            color: '#A05A26',
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            margin: 0,
            fontFamily: 'monospace',
          }}>
            A Career Capability Platform
          </p>
          <h1 style={{
            fontSize: 84,
            color: '#0F1A2E',
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            fontWeight: 500,
          }}>
            Build evidence of capability.
          </h1>
          <p style={{
            fontSize: 60,
            color: '#A05A26',
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontStyle: 'italic',
            fontWeight: 400,
          }}>
            Not another certificate.
          </p>
        </div>

        {/* Bottom: subline */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{
            fontSize: 22,
            color: '#4A5468',
            margin: 0,
            maxWidth: 720,
          }}>
            12-week practical accelerator. Product Management &amp; Business Analysis. Cohort 1 open.
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            fontSize: 13,
            color: '#4A5468',
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            <span>Est. 2019</span>
            <span>1,000+ Trained</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
