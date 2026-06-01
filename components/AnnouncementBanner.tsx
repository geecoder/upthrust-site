'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ENROLLMENT_CLOSE = new Date('2026-06-03T23:59:00');
const COHORT_START = new Date('2026-06-06T00:00:00');

interface Props {
  onDismiss?: () => void;
}

export function AnnouncementBanner({ onDismiss }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [phase, setPhase] = useState<'enrolling' | 'closed' | 'started'>('enrolling');

  useEffect(() => {
    function update() {
      const now = new Date();
      if (now >= COHORT_START) { setPhase('started'); return; }
      if (now >= ENROLLMENT_CLOSE) { setPhase('closed'); return; }
      const diff = ENROLLMENT_CLOSE.getTime() - now.getTime();
      setDaysLeft(Math.ceil(diff / (1000 * 60 * 60 * 24)));
      setPhase('enrolling');
    }
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  if (dismissed || phase === 'started') return null;

  function handleDismiss() {
    setDismissed(true);
    onDismiss?.();
    document.documentElement.style.setProperty('--header-h', '68px');
  }

  return (
    <div className="relative bg-amber text-white py-2.5 px-4 text-center text-sm font-medium">
      <span className="w-2 h-2 bg-white/80 rounded-full animate-pulse inline-block mr-2 align-middle" />
      {phase === 'closed' ? (
        <>
          Cohort 1 enrollment closed · Starts <strong>June 6, 2026</strong>
          <Link
            href="/consultation"
            className="ml-2 bg-white text-amber px-3 py-0.5 rounded-full text-xs font-bold hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            Join Cohort 2 Waitlist →
          </Link>
        </>
      ) : (
        <>
          Cohort 1 is open · Starts June 6, 2026
          {daysLeft !== null && (
            <> · <strong>{daysLeft === 1 ? '1 day' : `${daysLeft} days`}</strong> left</>
          )}
          <Link
            href="/assessment"
            className="ml-2 bg-white text-amber px-3 py-0.5 rounded-full text-xs font-bold hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            Take the Assessment →
          </Link>
        </>
      )}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors text-xl leading-none w-8 h-8 flex items-center justify-center"
      >
        ×
      </button>
    </div>
  );
}
