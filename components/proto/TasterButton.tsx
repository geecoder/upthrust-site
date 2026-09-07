'use client';

// The single entry point to the taster flow. Every placement uses this, so
// the label, the analytics and the dialog it opens cannot drift between
// surfaces.

import { DATES } from '@/lib/cohort-config';
import { analytics } from '@/lib/analytics';
import type { ProgramSlug, CtaLocation } from '@/lib/analytics';
import { useTaster, type TasterSource } from '@/components/proto/TasterModal';

const LABEL = 'Attend the free taster session';

export function TasterButton({
  source,
  ctaLocation,
  programSlug,
  tone = 'seal',
  fullWidth = true,
  showDate = true,
}: {
  source: TasterSource;
  ctaLocation: CtaLocation;
  programSlug?: ProgramSlug;
  /** `seal` for a primary action, `outline` where it sits beside one. */
  tone?: 'seal' | 'outline' | 'dark';
  fullWidth?: boolean;
  showDate?: boolean;
}) {
  const { openTaster } = useTaster();

  const palette =
    tone === 'seal'
      ? { background: 'var(--seal-500)', color: 'var(--bone)', border: 0 }
      : tone === 'dark'
        ? { background: 'var(--ink-900)', color: 'var(--bone)', border: 0 }
        : { background: 'var(--white)', color: 'var(--fg-1)', border: '1px solid var(--ink-900)' };

  const hoverClass = tone === 'seal' ? 'pv-h-seal600' : tone === 'dark' ? 'pv-h-ink800' : 'pv-h-bonedim';

  return (
    <span style={{ display: fullWidth ? 'block' : 'inline-block', width: fullWidth ? '100%' : undefined }}>
      <button
        type="button"
        onClick={() => {
          analytics.ctaClicked({
            cta_name: LABEL,
            cta_location: ctaLocation,
            destination: 'taster_dialog',
            program_slug: programSlug,
          });
          openTaster({ source, programSlug });
        }}
        className={hoverClass}
        style={{
          font: 'inherit', fontSize: 16, fontWeight: 500, height: 54,
          padding: '0 26px', width: fullWidth ? '100%' : undefined,
          borderRadius: 4, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          transition: 'background 150ms',
          ...palette,
        }}
      >
        {/* The pulse marks this as the live, time-bound thing on the page. */}
        <span
          aria-hidden="true"
          style={{
            width: 7, height: 7, borderRadius: '50%', flex: 'none',
            background: tone === 'outline' ? 'var(--seal-500)' : 'var(--bone)',
            animation: 'v3pulse 1.6s ease-in-out infinite alternate',
          }}
        />
        {LABEL}
      </button>
      {showDate && (
        <span
          style={{
            display: 'block', textAlign: 'center', marginTop: 9,
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--fg-3)',
          }}
        >
          {DATES.tasterDayMonth.toUpperCase()} · FREE · NO OBLIGATION
        </span>
      )}
    </span>
  );
}
