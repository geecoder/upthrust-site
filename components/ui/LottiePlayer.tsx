'use client';

import { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface Props {
  src: string;
  loop?: boolean;
  width?: number;
  height?: number;
  autoplay?: boolean;
}

export function LottiePlayer({ src, loop = true, width = 380, height = 380, autoplay = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setReady(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width, height }}>
      {ready && (
        <DotLottieReact
          src={src}
          loop={loop}
          autoplay={autoplay}
          style={{ width, height }}
        />
      )}
    </div>
  );
}
