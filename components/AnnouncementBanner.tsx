'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ENROLLMENT_CLOSE = new Date('2026-06-03T23:59:00');
const COHORT_START = new Date('2026-06-06T00:00:00');

interface Props {
  onDismiss?: () => void;
}

export function AnnouncementBanner({ onDismiss }: Props) {
  const [visible, setVisible] = useState(true);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [phase, setPhase] = useState<'enrolling' | 'closed' | 'started'>('enrolling');

  useEffect(() => {
    function update() {
      const now = new Date();
      if (now >= COHORT_START) { setPhase('started'); return; }
      if (now >= ENROLLMENT_CLOSE) { setPhase('closed'); return; }
      const diff = ENROLLMENT_CLOSE.getTime() - now.getTime();
      setDaysLeft(Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  if (!visible || phase === 'started') return null;

  function dismiss() {
    setVisible(false);
    document.documentElement.style.setProperty('--nav-offset', '68px');
    onDismiss?.();
  }

  return (
    <div className="bg-amber text-white text-sm font-medium py-2.5 px-4 text-center relative">
      <span className="inline-flex items-center gap-2 flex-wrap justify-center">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
        {phase === 'closed' ? (
          <>
            <strong>Cohort 1 enrollment closed</strong>
            <span className="text-white/80">· Starts June 6, 2026</span>
          </>
        ) : (
          <>
            <strong>Cohort 1 is open</strong>
            <span className="text-white/80">
              · Starts June 6, 2026
              {daysLeft !== null && ` · ${daysLeft === 1 ? '1 day' : `${daysLeft} days`} left`}
            </span>
          </>
        )}
        <Link
          href="/assessment"
          className="ml-1 bg-white text-amber text-xs font-bold px-3 py-1 rounded-full hover:bg-amber-light transition-colors whitespace-nowrap"
        >
          Take the Assessment →
        </Link>
      </span>
      <button
        aria-label="Dismiss"
        onClick={dismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-xl leading-none w-8 h-8 flex items-center justify-center"
      >
        ×
      </button>
    </div>
  );
}
