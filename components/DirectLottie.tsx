'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface Props {
  src: string;
  loop?: boolean;
  width?: number;
  height?: number;
  speed?: number;
}

export function DirectLottie({ src, loop = false, width = 200, height = 200, speed = 1 }: Props) {
  return (
    <DotLottieReact
      src={src}
      autoplay
      loop={loop}
      style={{ width, height }}
      speed={speed}
    />
  );
}
