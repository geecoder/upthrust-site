'use client';
import { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LottieOnScrollProps {
  src: string;
  loop?: boolean;
  width?: number;
  height?: number;
  className?: string;
  threshold?: number;
  speed?: number;
  fallbackIcon?: string;
  autoplay?: boolean;
}

export function LottieOnScroll({
  src,
  loop = false,
  width = 200,
  height = 200,
  className = '',
  threshold = 0.25,
  speed = 1,
  fallbackIcon = '',
  autoplay = false,
}: LottieOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(autoplay);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (autoplay) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) setTriggered(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered, threshold, autoplay]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {triggered && !failed && (
        <DotLottieReact
          src={src}
          autoplay
          loop={loop}
          speed={speed}
          style={{ width, height }}
          onError={() => setFailed(true)}
        />
      )}
      {(failed || (!triggered && fallbackIcon)) && fallbackIcon && (
        <span style={{ fontSize: Math.round(Math.min(width, height) * 0.5) }}>
          {fallbackIcon}
        </span>
      )}
    </div>
  );
}
