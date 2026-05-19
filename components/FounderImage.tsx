'use client';

export default function FounderImage() {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '4/5',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--ink)',
    }}>
      <img
        src="/images/founder-genesis.jpg"
        alt="Genesis Nneji Enwenyeokwu — Founder, Upthrust"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.style.background = 'linear-gradient(180deg, var(--paper-soft) 0%, var(--paper-line) 100%)';
            parent.innerHTML = '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Fraunces,serif;font-size:4rem;color:var(--ink-muted);font-style:italic;opacity:0.4">G</div>';
          }
        }}
      />
    </div>
  );
}
