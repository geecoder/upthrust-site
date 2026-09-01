'use client';

// A photo slot that degrades to the labelled placeholder when the file isn't
// on disk yet, so a missing asset reads as "drop a photo here" rather than a
// broken image.
//
// next/image rather than a bare <img>: the source headshots are 2400–2544px
// and up to 9MB, and these render in cards ~440px wide. The optimiser resizes
// and re-encodes per request from `sizes`, so the browser never downloads the
// originals.

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export function Photo({
  src, alt, placeholder, aspectRatio, sizes = '(max-width: 860px) 100vw, 480px',
  priority, style, imgStyle,
}: {
  src: string;
  alt: string;
  placeholder: string;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);

  // The image is server-rendered, so a missing file can fail its load before
  // React attaches onError — the event is then gone and the fallback never
  // fires. A decoded image always reports a non-zero naturalWidth, so
  // complete-but-zero on mount means it errored.
  const check = useCallback((el: HTMLImageElement | null) => {
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return <ImagePlaceholder label={placeholder} aspectRatio={aspectRatio} style={style} />;
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', aspectRatio, background: 'var(--bone-dim)', ...style }}>
      <Image
        ref={check}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
        style={{ objectFit: 'cover', ...imgStyle }}
      />
    </div>
  );
}

// The guest reviewer is deliberately unnamed, so there is no photo to show —
// this is the stand-in mark, not a missing asset.
export function AnonAvatar({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      role="img"
      aria-label="Guest reviewer, identity withheld"
      style={{ position: 'relative', display: 'grid', placeItems: 'center', background: 'var(--ink-900)', overflow: 'hidden', ...style }}
    >
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right,rgba(244,239,230,.06) 0 1px,transparent 1px 14px),repeating-linear-gradient(to bottom,rgba(244,239,230,.06) 0 1px,transparent 1px 14px)' }}
      />
      <svg viewBox="0 0 64 64" width="42%" height="42%" aria-hidden="true" style={{ position: 'relative', opacity: .55 }}>
        <circle cx="32" cy="22" r="11" fill="none" stroke="var(--seal-300)" strokeWidth="2.5" />
        <path d="M11 57c0-11.6 9.4-21 21-21s21 9.4 21 21" fill="none" stroke="var(--seal-300)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span
        style={{ position: 'absolute', bottom: 9, left: 9, fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '.08em', color: 'var(--ink-300)', border: '1px solid rgba(244,239,230,.28)', padding: '3px 6px' }}
      >
        IDENTITY WITHHELD
      </span>
    </div>
  );
}
