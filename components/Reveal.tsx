'use client';

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';

// A thin client wrapper so server components (app/page.tsx, app/about/page.tsx,
// etc.) can still use the prototype's own scroll-reveal pattern — the
// underlying [data-rv]/v3rise mechanics live in app/globals.css. Renders as
// `as` (default 'section'), forwarding style/className, so it drops in
// wherever a plain <section> already sits without changing layout.
export function Reveal({
  as: As = 'section',
  delayMs = 0,
  id,
  style,
  className,
  children,
}: {
  as?: ElementType;
  delayMs?: number;
  id?: string;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

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

  return (
    <As ref={ref} data-rv id={id} style={style} className={className}>
      {children}
    </As>
  );
}
