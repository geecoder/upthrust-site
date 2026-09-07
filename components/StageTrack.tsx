'use client';

import { useEffect, useRef, useState } from 'react';
import type { IntensiveStage } from '@/lib/intensives-content';

// Sibling to WeekTrack.tsx, sized for the intensives' five-stage narrative
// instead of twelve weeks. WeekTrack's week data is hardcoded inside that
// component, so this is a genuinely new component (not a parameterized
// reuse) — content is fully prop-driven since it differs per intensive.
//
// Unlike WeekTrack, there is no coarser phase-band strip above the rail:
// pathways group twelve weeks into four named phases (Foundation, Core
// skills, ...); the intensives' five stages are already the top-level
// narrative — each stage IS a phase, so a redundant band strip was skipped
// rather than invented.

const AUTOPLAY_INTERVAL_MS = 2400;

export interface StageTrackProps {
  intensiveLabel: string; // e.g. "AI Product Builder"
  stages: IntensiveStage[]; // exactly 5 entries, true stage order
  feedbackSlaHours: number; // e.g. COHORT.feedbackSlaHours
  resetKey: string; // parent passes the intensive slug; resets to stage 0 + autoplay on change
}

export default function StageTrack({ intensiveLabel, stages, feedbackSlaHours, resetKey }: StageTrackProps) {
  const stageCount = stages.length;
  const [pStage, setPStage] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [locked, setLocked] = useState(false); // permanent hand-over to the user
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

  // Respect prefers-reduced-motion: no autoplay, ever, and no scaleX transition.
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

  // Only advances while the track is on-screen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Resets to stage 1 and playing=true whenever the intensive (resetKey) changes.
  useEffect(() => {
    setPStage(0);
    setLocked(false);
    setAutoplay(!reducedMotionRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  // Advances on an interval, only while the track is on-screen.
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!autoplayRef.current || lockedRef.current || hoverRef.current || reducedMotionRef.current || !onScreenRef.current) return;
      setPStage((w) => (w + 1) % stageCount);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [stageCount]);

  // Clicking any node, or a prev/next control, hands control to the user
  // permanently for this mount — autoplay never resumes after this.
  const takeControl = (i: number) => {
    setLocked(true);
    setAutoplay(false);
    setPStage(i);
  };

  const toggleAutoplay = () => {
    if (locked || reducedMotion) return;
    setAutoplay((a) => !a);
  };

  const isPlaying = autoplay && !locked;
  const statusText = isPlaying ? 'PLAYING · SELECT ANY STAGE TO TAKE OVER' : 'PAUSED · YOU ARE DRIVING';

  const current = stages[pStage];
  const bankedFraction = `${pStage + 1} of ${stageCount}`;
  const bankedPct = ((pStage + 1) / stageCount) * 100;
  const isLastStage = pStage === stageCount - 1;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
      }}
      role="group"
      aria-label={`${intensiveLabel} five-week stage track`}
      style={{ background: 'var(--paper)', border: '1px solid var(--border-strong)' }}
    >
      {/* Header: status line + Pause/Play */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '14px 28px',
          borderBottom: '1px solid var(--border-soft)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)' }}>
          {statusText}
        </span>
        <button
          type="button"
          onClick={toggleAutoplay}
          style={{
            font: 'inherit',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '.02em',
            height: 30,
            padding: '0 12px',
            background: 'none',
            color: 'var(--fg-1)',
            border: '1px solid var(--border-strong)',
            borderRadius: 2,
            cursor: 'pointer',
          }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Rail: five nodes */}
      <div style={{ position: 'relative', padding: '26px 28px 24px' }}>
        <div
          className="weektrack-rail-line"
          style={{
            position: 'absolute',
            left: 28,
            right: 28,
            top: 49,
            height: 1,
            background: 'var(--border-soft)',
          }}
        />
        <div className="weektrack-rail" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: 6 }}>
          {stages.map((s, i) => {
            const selected = pStage === i;
            const completed = i < pStage;
            const size = selected ? 46 : 38;
            const bg = selected ? 'var(--seal-500)' : completed ? 'var(--ink-800)' : 'var(--white)';
            const fg = selected || completed ? 'var(--bone)' : 'var(--fg-3)';
            const bd = selected ? 'var(--seal-500)' : completed ? 'var(--ink-800)' : 'var(--border-strong)';
            return (
              <button
                key={s.stage}
                type="button"
                onClick={() => takeControl(i)}
                aria-current={selected ? 'step' : undefined}
                aria-label={`Stage ${i + 1}: ${s.stage}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '.04em',
                  width: size,
                  height: size,
                  flex: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  background: bg,
                  color: fg,
                  border: `1px solid ${bd}`,
                  display: 'grid',
                  placeItems: 'center',
                  transition: 'background 180ms var(--ease-quint-out), width 180ms var(--ease-quint-out), height 180ms var(--ease-quint-out)',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Two-column detail panel */}
      <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: 0, borderTop: '1px solid var(--border-soft)' }}>
        {/* Left: stage / tag / title */}
        <div className="weektrack-detail-left" style={{ padding: '28px 28px 30px', borderRight: '1px solid var(--border-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', color: 'var(--seal-600)' }}>
              S{String(pStage + 1).padStart(2, '0')}
            </span>
            <span style={{ width: 1, height: 12, background: 'var(--border-strong)' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '.1em',
                color: 'var(--fg-3)',
                textTransform: 'uppercase',
              }}
            >
              {current.tag}
            </span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: '-.022em',
              lineHeight: 1.15,
              margin: '12px 0 0',
            }}
          >
            {current.stage}
          </h3>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: '12px 0 0', maxWidth: '34em' }}>
            {current.title}
          </p>
          <div style={{ display: 'flex', gap: 10, margin: '26px 0 0' }}>
            <button
              type="button"
              onClick={() => takeControl(Math.max(0, pStage - 1))}
              style={{
                font: 'inherit',
                fontSize: 13,
                fontWeight: 500,
                height: 38,
                padding: '0 14px',
                background: 'none',
                color: 'var(--fg-1)',
                border: '1px solid var(--border-strong)',
                borderRadius: 2,
                cursor: 'pointer',
              }}
            >
              ← Previous stage
            </button>
            <button
              type="button"
              onClick={() => takeControl(Math.min(stageCount - 1, pStage + 1))}
              style={{
                font: 'inherit',
                fontSize: 13,
                fontWeight: 500,
                height: 38,
                padding: '0 14px',
                background: 'none',
                color: 'var(--fg-1)',
                border: '1px solid var(--border-strong)',
                borderRadius: 2,
                cursor: 'pointer',
              }}
            >
              Next stage →
            </button>
          </div>
        </div>

        {/* Right: the artefact, stage-status chip, SLA note, portfolio-banked meter */}
        <div style={{ padding: '28px 28px 30px', background: 'var(--white)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.12em', color: 'var(--fg-3)' }}>
            WHAT YOU HAND IN
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: '-.02em',
              lineHeight: 1.25,
              margin: '12px 0 0',
            }}
          >
            {current.artefact}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0 0' }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--moss-700)',
                background: 'var(--moss-50)',
                border: '1px solid var(--moss-500)',
                borderRadius: 999,
                padding: '2px 8px',
              }}
            >
              {current.status}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.06em', color: 'var(--fg-3)' }}>
              FEEDBACK WITHIN {feedbackSlaHours} HRS
            </span>
          </div>
          <div style={{ margin: '24px 0 0', paddingTop: 18, borderTop: '1px solid var(--border-soft)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)' }}>
                PORTFOLIO BANKED
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                {bankedFraction}
              </span>
            </div>
            <div style={{ height: 6, background: 'var(--paper-dim)', marginTop: 10, overflow: 'hidden' }}>
              <div
                style={{
                  height: 6,
                  width: '100%',
                  background: 'var(--seal-500)',
                  transformOrigin: 'left',
                  transform: `scaleX(${bankedPct / 100})`,
                  transition: reducedMotion ? 'none' : 'transform 800ms var(--ease-quint-out)',
                }}
              />
            </div>
            {isLastStage && (
              <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--fg-2)', marginTop: 14 }}>
                This is the defence. Scores are signed off here and the record becomes immutable.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
