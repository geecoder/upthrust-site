'use client';

import { useEffect, useRef, type RefObject } from 'react';

// Matches the prototype's own scroll-reveal pattern: an IntersectionObserver
// watches the element and adds `.in` the first time it's ~15% visible,
// triggering the `v3rise` fade+rise animation (see app/globals.css). Spread
// the returned `reveal` object directly onto the element you want to
// animate — `<section ref={reveal.ref} data-rv {...}>` — no wrapper div.
// One-shot: once revealed, the observer disconnects, so it never re-hides on
// scroll-away. Optional `delayMs` staggers a group of siblings.
export function useReveal<T extends HTMLElement = HTMLDivElement>(delayMs = 0): { ref: RefObject<T>; 'data-rv': true } {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (delayMs) el.style.animationDelay = `${delayMs}ms`;
        el.classList.add('in');
        observer.unobserve(el);
      },
      { threshold: 0.14 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return { ref, 'data-rv': true };
}
