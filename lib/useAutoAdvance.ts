'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

// Factors out the tick-interval / on-screen-gate / prefers-reduced-motion /
// hover-pause / "take control on click" state machine that WeekTrack.tsx and
// StageTrack.tsx each already implement near-identically. No rendering — the
// three new home-page consumers (weekly loop, discipline switcher, AI
// intensive assembly) each present this state differently, so only the state
// machine is shared.
//
// Two modes, chosen by whether `ticksPerStep` is passed:
//  - Omitted (default 1): the interval itself IS the step duration — index
//    advances on every tick, matching WeekTrack/StageTrack's model exactly.
//  - Provided: the interval is a fine-grained tick (e.g. 240ms) and it takes
//    `ticksPerStep` of them to advance one step (e.g. 100 ticks = 24s/step) —
//    `progress` (0–1) reports how far into the current step's cycle we are,
//    for a visibly-filling progress bar. Used by the home page's weekly loop.

export interface UseAutoAdvanceOptions {
  count: number;
  intervalMs: number;
  ticksPerStep?: number;
  resetKey?: string | number;
}

export interface UseAutoAdvanceResult {
  index: number;
  progress: number; // 0–1; always 1 when ticksPerStep is omitted
  playing: boolean; // true only when actually auto-advancing (not locked, not paused)
  locked: boolean; // true once the user has taken manual control
  reducedMotion: boolean;
  containerRef: RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  goTo: (i: number) => void;
  toggle: () => void;
}

export function useAutoAdvance({ count, intervalMs, ticksPerStep = 1, resetKey }: UseAutoAdvanceOptions): UseAutoAdvanceResult {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0); // fine-grained tick counter within the current step
  const [autoplay, setAutoplay] = useState(true);
  const [locked, setLocked] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const autoplayRef = useRef(autoplay);
  const lockedRef = useRef(locked);
  const reducedMotionRef = useRef(reducedMotion);
  const onScreenRef = useRef(onScreen);

  autoplayRef.current = autoplay;
  lockedRef.current = locked;
  reducedMotionRef.current = reducedMotion;
  onScreenRef.current = onScreen;

  // Respect prefers-reduced-motion: no autoplay, ever.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) setAutoplay(false);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Only advances while on-screen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Resets to the first item and resumes autoplay whenever resetKey changes.
  useEffect(() => {
    setIndex(0);
    setTick(0);
    setLocked(false);
    setAutoplay(!reducedMotionRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!autoplayRef.current || lockedRef.current || hoverRef.current || reducedMotionRef.current || !onScreenRef.current) return;
      setTick((t) => {
        const next = t + 1;
        if (next >= ticksPerStep) {
          setIndex((i) => (i + 1) % count);
          return 0;
        }
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [count, intervalMs, ticksPerStep]);

  // Clicking any item, or a prev/next control, hands control to the user
  // permanently for this mount — autoplay never resumes after this.
  const goTo = (i: number) => {
    setLocked(true);
    setAutoplay(false);
    setIndex(i);
    setTick(0);
  };

  // A separate, non-permanent Pause/Play toggle — once the user has taken
  // control via goTo, it can no longer resume autoplay.
  const toggle = () => {
    if (locked || reducedMotion) return;
    setAutoplay((a) => !a);
  };

  return {
    index,
    progress: ticksPerStep > 1 ? tick / ticksPerStep : 1,
    playing: autoplay && !locked,
    locked,
    reducedMotion,
    containerRef,
    onMouseEnter: () => { hoverRef.current = true; },
    onMouseLeave: () => { hoverRef.current = false; },
    goTo,
    toggle,
  };
}
