'use client';

export default function FounderPhoto() {
  return (
    <div style={{
      width: '100%', aspectRatio: '4/5',
      position: 'relative', overflow: 'hidden',
      background: 'var(--ink)',
    }}>
      <img
        src="/images/founder-genesis.jpg"
        alt="Genesis Nneji Enwenyeokwu — Founder, Upthrust"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        onError={(e) => {
          const t = e.currentTarget as HTMLImageElement;
          t.style.display = 'none';
          const p = t.parentElement;
          if (p) {
            p.style.background = 'linear-gradient(160deg, #1a2a40 0%, #0F1A2E 100%)';
            p.innerHTML = '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Fraunces,serif;font-size:5rem;color:rgba(250,247,241,0.15);font-style:italic;">GNE</div>';
          }
        }}
      />
      {/* Corner rule */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 0, height: 0,
        borderStyle: 'solid',
        borderWidth: '0 0 48px 48px',
        borderColor: 'transparent transparent var(--amber) transparent',
      }} />
    </div>
  );
}
