'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// All 3D components are dynamically imported with no SSR
// This is required because Three.js uses browser APIs unavailable during server rendering
const PassportHero3D = dynamic(() => import('./three/PassportHero3D'), { ssr: false });
const AssessmentBrain3D = dynamic(() => import('./three/AssessmentBrain3D'), { ssr: false });
const RoadmapCanvas3D = dynamic(() => import('./three/RoadmapCanvas3D'), { ssr: false });
const DocumentStack3D = dynamic(() => import('./three/DocumentStack3D'), { ssr: false });
const AcceleratorHero3D = dynamic(() => import('./three/AcceleratorHero3D'), { ssr: false });

// Loading skeleton shared across all 3D components
function Skeleton({ height, dark = false }: { height: number; dark?: boolean }) {
  return (
    <div style={{
      width: '100%', height,
      background: dark
        ? 'linear-gradient(135deg, #0F1A2E 0%, #1F2B42 100%)'
        : 'linear-gradient(135deg, var(--paper-soft) 0%, var(--paper-line) 100%)',
      borderRadius: 4,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 12,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: `3px solid ${dark ? 'rgba(197,116,58,0.2)' : 'rgba(15,26,46,0.1)'}`,
        borderTopColor: dark ? '#C5743A' : 'var(--ink)',
        animation: 'threeSpin 700ms linear infinite',
      }} />
      <p style={{
        fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '0.625rem',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: dark ? 'rgba(250,247,241,0.3)' : 'rgba(15,26,46,0.25)',
      }}>
        Loading
      </p>
      <style>{`@keyframes threeSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// Hook to detect if 3D should be shown (skip on low-end or mobile)
function useCanRender3D() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // Don't render 3D on very narrow screens (mobile) to save battery
    // Also check for reduced motion preference
    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowMemory = (navigator as any).deviceMemory !== undefined && (navigator as any).deviceMemory < 4;

    if (!isMobile && !prefersReduced && !lowMemory) {
      // Small delay to let the page paint first
      const timer = setTimeout(() => setCanRender(true), 200);
      return () => clearTimeout(timer);
    }
    // On mobile/low-end, leave canRender false — fallback SVG will show
  }, []);

  return canRender;
}

// ── Public wrappers ──────────────────────────────────────────

export function PassportHeroWrapper({ height = 500, fallback }: { height?: number; fallback?: React.ReactNode }) {
  const canRender = useCanRender3D();
  if (!canRender) return <>{fallback || <Skeleton height={height} dark />}</>;
  return (
    <div style={{ position: 'relative' }}>
      <PassportHero3D height={height} />
    </div>
  );
}

export function AssessmentBrainWrapper({ height = 420, fallback }: { height?: number; fallback?: React.ReactNode }) {
  const canRender = useCanRender3D();
  if (!canRender) return <>{fallback || <Skeleton height={height} />}</>;
  return <AssessmentBrain3D height={height} />;
}

export function RoadmapWrapper({ height = 400, fallback }: { height?: number; fallback?: React.ReactNode }) {
  const canRender = useCanRender3D();
  if (!canRender) return <>{fallback || <Skeleton height={height} />}</>;
  return <RoadmapCanvas3D height={height} />;
}

export function DocumentStackWrapper({ height = 400, fallback }: { height?: number; fallback?: React.ReactNode }) {
  const canRender = useCanRender3D();
  if (!canRender) return <>{fallback || <Skeleton height={height} />}</>;
  return <DocumentStack3D height={height} />;
}

export function AcceleratorHeroWrapper({ height = 480, fallback }: { height?: number; fallback?: React.ReactNode }) {
  const canRender = useCanRender3D();
  if (!canRender) return <>{fallback || <Skeleton height={height} dark />}</>;
  return <AcceleratorHero3D height={height} />;
}
