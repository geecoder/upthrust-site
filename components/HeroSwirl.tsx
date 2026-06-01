// Organic gradient swirl blobs — used ONLY inside navy hero sections.
export function HeroSwirl({ className = '', variant = 'default' }: {
  className?: string;
  variant?: 'default' | 'subtle' | 'amber';
}) {
  const opacity = variant === 'subtle' ? 0.6 : variant === 'amber' ? 1.3 : 1;
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Primary amber orb — top right */}
      <div style={{
        position: 'absolute',
        width: '60vw', height: '60vw',
        maxWidth: '800px', maxHeight: '800px',
        top: '-20%', right: '-10%',
        background: `radial-gradient(ellipse at 60% 40%, rgba(197,116,58,${0.22 * opacity}) 0%, rgba(197,116,58,${0.08 * opacity}) 40%, transparent 70%)`,
        filter: 'blur(48px)',
        animation: 'swirl1 14s ease-in-out infinite alternate',
      }} />
      {/* Moss/green orb — bottom left */}
      <div style={{
        position: 'absolute',
        width: '45vw', height: '45vw',
        maxWidth: '600px', maxHeight: '600px',
        bottom: '-15%', left: '-8%',
        background: `radial-gradient(ellipse at 40% 60%, rgba(79,106,74,${0.18 * opacity}) 0%, rgba(79,106,74,${0.06 * opacity}) 45%, transparent 70%)`,
        filter: 'blur(56px)',
        animation: 'swirl2 18s ease-in-out infinite alternate',
      }} />
      {/* Amber accent — centre */}
      <div style={{
        position: 'absolute',
        width: '30vw', height: '30vw',
        maxWidth: '400px', maxHeight: '400px',
        top: '40%', left: '25%',
        background: `radial-gradient(ellipse, rgba(197,116,58,${0.10 * opacity}) 0%, transparent 65%)`,
        filter: 'blur(64px)',
        animation: 'swirl3 22s ease-in-out infinite alternate',
      }} />
      {/* Dot grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
      }} />
      <style>{`
        @keyframes swirl1 {
          0%   { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(8deg) scale(1.06); }
        }
        @keyframes swirl2 {
          0%   { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(-10deg) scale(1.08); }
        }
        @keyframes swirl3 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-4%, 6%) scale(1.12); }
        }
      `}</style>
    </div>
  );
}
