'use client';

import { useEffect, useRef, useState } from 'react';

// Parses "1,000+" -> { prefix: '', target: 1000, suffix: '+' } so we can count
// up numerically while preserving non-numeric decoration. Falls back to a
// simple fade/rise reveal (no counting) for values with no digits, e.g. "Four".
function parseValue(raw: string) {
  const match = raw.match(/^([^\d]*)([\d,]+)([^\d]*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const target = parseInt(digits.replace(/,/g, ''), 10);
  return { prefix, target, suffix, digits };
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUpStat({
  value, style, duration = 900, easing = easeOutCubic, animate = false,
}: {
  value: string;
  style?: React.CSSProperties;
  duration?: number; // ms
  easing?: (t: number) => number;
  // Defaults to false: the prototype this site is built from never animates
  // a number counting up — every stat just fades/rises into place like any
  // other revealed content. Pass animate explicitly true for the rare case
  // that calls for it.
  animate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [display, setDisplay] = useState<string>(() => {
    const parsed = parseValue(value);
    return animate && parsed ? `${parsed.prefix}0${parsed.suffix}` : value;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const parsed = parseValue(value);

    const reveal = () => {
      setRevealed(true);
      if (!animate || !parsed || reduceMotion) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = easing(progress);
        const current = Math.round(parsed.target * eased);
        setDisplay(`${parsed.prefix}${current.toLocaleString()}${parsed.suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(el);
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, animate, duration]);

  return (
    <span
      ref={ref}
      style={{
        ...style,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 400ms var(--ease-quint-out), transform 400ms var(--ease-quint-out)',
        display: 'inline-block',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {display}
    </span>
  );
}
