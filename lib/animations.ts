'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ─── useInView ────────────────────────────────────────────────
// Returns true when the ref element enters the viewport.
// Once triggered, stays true (one-shot) unless resetOnLeave=true.
export function useInView(options?: { threshold?: number; once?: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once !== false; // default: one-shot

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: options?.threshold ?? 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, options?.threshold]);

  return { ref, inView };
}

// ─── useCountUp ───────────────────────────────────────────────
// Counts from 0 to target when triggered. Returns current value.
export function useCountUp(target: number, duration = 1800, trigger = false) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame.current = requestAnimationFrame(animate);
    };
    frame.current = requestAnimationFrame(animate);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [target, duration, trigger]);

  return value;
}

// ─── useStagger ───────────────────────────────────────────────
// Returns an array of booleans, each becoming true with a staggered delay.
export function useStagger(count: number, delay = 80, trigger = false) {
  const [visible, setVisible] = useState<boolean[]>(Array(count).fill(false));

  useEffect(() => {
    if (!trigger) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => {
          setVisible((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * delay)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [count, delay, trigger]);

  return visible;
}

// ─── fadeUpStyle ─────────────────────────────────────────────
// Returns a style object for a fade-up transition.
export function fadeUpStyle(
  inView: boolean,
  delay = 0,
  duration = 600
): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity ${duration}ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`,
  };
}

// ─── slideInStyle ────────────────────────────────────────────
export function slideInStyle(
  inView: boolean,
  direction: 'left' | 'right' = 'left',
  delay = 0
): React.CSSProperties {
  const dx = direction === 'left' ? '-32px' : '32px';
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : `translateX(${dx})`,
    transition: `opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`,
  };
}
