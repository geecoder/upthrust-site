'use client';
import { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface Props {
  src: string; loop?: boolean; width?: number; height?: number;
  className?: string; threshold?: number; speed?: number;
  fallbackIcon?: string;
}

export function LottieOnScroll({
  src, loop = false, width = 200, height = 200,
  className = '', threshold = 0.3, speed = 1, fallbackIcon = '✦',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !triggered) setTriggered(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggered, threshold]);

  return (
    <div ref={ref} className={className}
      style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {triggered && !failed && (
        <DotLottieReact src={src} autoplay loop={loop}
          style={{ width, height }} speed={speed}
          onError={() => setFailed(true)} />
      )}
      {failed && (
        <span style={{ fontSize: Math.min(width, height) * 0.5 }}>{fallbackIcon}</span>
      )}
    </div>
  );
}
