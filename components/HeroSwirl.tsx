export function HeroSwirl({ variant = 'default' }: {
  variant?: 'default' | 'amber' | 'subtle';
}) {
  const colors = {
    default: {
      orb1: 'rgba(197,116,58,0.18)',
      orb2: 'rgba(79,106,74,0.12)',
      orb3: 'rgba(197,116,58,0.08)',
    },
    amber: {
      orb1: 'rgba(197,116,58,0.25)',
      orb2: 'rgba(160,90,38,0.15)',
      orb3: 'rgba(197,116,58,0.10)',
    },
    subtle: {
      orb1: 'rgba(197,116,58,0.10)',
      orb2: 'rgba(79,106,74,0.07)',
      orb3: 'rgba(197,116,58,0.05)',
    },
  };

  const c = colors[variant];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div style={{
        position: 'absolute',
        width: '70vw', height: '70vw',
        maxWidth: 900, maxHeight: 900,
        top: '-20%', right: '-15%',
        background: `radial-gradient(ellipse at center, ${c.orb1} 0%, transparent 70%)`,
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
        filter: 'blur(40px)',
        transform: 'rotate(-20deg)',
        animation: 'swirlFloat1 12s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute',
        width: '50vw', height: '50vw',
        maxWidth: 700, maxHeight: 700,
        bottom: '-10%', left: '-10%',
        background: `radial-gradient(ellipse at center, ${c.orb2} 0%, transparent 65%)`,
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        filter: 'blur(50px)',
        transform: 'rotate(15deg)',
        animation: 'swirlFloat2 16s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute',
        width: '40vw', height: '40vw',
        maxWidth: 500, maxHeight: 500,
        top: '30%', left: '40%',
        background: `radial-gradient(ellipse at center, ${c.orb3} 0%, transparent 60%)`,
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'swirlFloat3 20s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      }} />
      <style>{`
        @keyframes swirlFloat1 {
          0%   { transform: rotate(-20deg) scale(1); }
          100% { transform: rotate(-10deg) scale(1.08); }
        }
        @keyframes swirlFloat2 {
          0%   { transform: rotate(15deg) scale(1); }
          100% { transform: rotate(25deg) scale(1.06); }
        }
        @keyframes swirlFloat3 {
          0%   { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-3%, 4%); }
        }
      `}</style>
    </div>
  );
}
