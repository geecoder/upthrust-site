'use client';

import { useEffect, useRef, useState } from 'react';

// Ported verbatim from the approved prototype's PHASES array (docs/design/
// Upthrust-prototype-standalone.html). PHASES there includes a W00 onboarding
// week that is NOT one of the twelve track nodes — the build brief's twelve
// weeks are W01–W12, with Foundation narrowed to weeks 1–3 (3/4/4/1 banding).
// The phase/title/description copy is generic across all four pathways; only
// the artefact (right panel) is pathway-specific and comes from the
// `weekArtefacts` prop.
interface TrackWeek {
  num: string; // e.g. "W01"
  phase: string;
  title: string;
  desc: string;
}

const WEEKS: TrackWeek[] = [
  {
    num: 'W01',
    phase: 'Foundation',
    title: 'Digital product foundations',
    desc: 'How real product teams work. The roles of PM, BA, Design, Engineering, QA, Marketing, Ops — and how they hand work to each other.',
  },
  {
    num: 'W02',
    phase: 'Foundation',
    title: 'Problem discovery',
    desc: 'How to define user and business problems clearly before jumping to solutions. What a well-framed problem brief looks like.',
  },
  {
    num: 'W03',
    phase: 'Foundation',
    title: 'Product strategy & business context',
    desc: 'Connecting problems to business goals, MVP scope, success measures, and why we are solving this now and not something else.',
  },
  {
    num: 'W04',
    phase: 'Core skills',
    title: 'Requirements & user stories',
    desc: 'Turning a framed problem into requirements a delivery team can build — functional, non-functional, and acceptance criteria that hold.',
  },
  {
    num: 'W05',
    phase: 'Core skills',
    title: 'Process & journey mapping',
    desc: 'As-Is and To-Be process maps, user journeys, and finding the handoffs where work quietly breaks.',
  },
  {
    num: 'W06',
    phase: 'Core skills',
    title: 'Documentation that holds up',
    desc: 'A full PRD on PM, a BRD on BA, an IA and flow set on Design, a reconciliation model on Payment Operations. Writing precisely enough that the team can act without you in the room.',
  },
  {
    num: 'W07',
    phase: 'Core skills',
    title: 'Prioritisation & scope',
    desc: 'MVP scope, trade-offs, sequencing — and how to defend what you deliberately left out.',
  },
  {
    num: 'W08',
    phase: 'Delivery',
    title: 'Agile delivery in practice',
    desc: 'Backlog refinement, sprint ceremonies, and what each role is actually accountable for inside a delivery team.',
  },
  {
    num: 'W09',
    phase: 'Delivery',
    title: 'Quality, UAT & edge cases',
    desc: 'Test scenarios, a full UAT pack, usability testing on Design, exception and dispute handling on Payment Operations — and the discipline of finding the case nobody scoped.',
  },
  {
    num: 'W10',
    phase: 'Delivery',
    title: 'Launch & measurement',
    desc: 'Launch briefs, success metrics, kill criteria, and the post-launch reporting that tells you whether it worked.',
  },
  {
    num: 'W11',
    phase: 'Delivery',
    title: 'Portfolio & interview stories',
    desc: 'Packaging twelve weeks of artefacts into one case study and a story bank that survives a real interview.',
  },
  {
    num: 'W12',
    phase: 'Capstone',
    title: 'Capstone defence',
    desc: 'You present and defend your capstone to a facilitator panel. Every capability area is scored against the published rubric, then signed off. This is what the Capability Passport records.',
  },
];

// Four phase bands, sized to real week counts (3 / 4 / 4 / 1), matching the
// prototype's `trackPhases` derivation exactly.
const PHASE_BANDS: { label: string; range: string; flex: number }[] = [
  { label: 'Foundation', range: 'W01–W03', flex: 3 },
  { label: 'Core skills', range: 'W04–W07', flex: 4 },
  { label: 'Delivery', range: 'W08–W11', flex: 4 },
  { label: 'Capstone', range: 'W12', flex: 1 },
];

const AUTOPLAY_INTERVAL_MS = 2400;

export interface WeekTrackProps {
  pathwayLabel: string; // e.g. "Business Analysis"
  weekArtefacts: string[]; // exactly 12 entries, index 0 = Week 1 ... index 11 = Week 12
  feedbackSlaHours: number; // e.g. COHORT.feedbackSlaHours
  resetKey: string; // parent passes the pathway slug; resets pWeek=0 + autoplay=true on change
}

export default function WeekTrack({ pathwayLabel, weekArtefacts, feedbackSlaHours, resetKey }: WeekTrackProps) {
  const [pWeek, setPWeek] = useState(0);
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

  // Rule 2: only advances while the track is on-screen. IntersectionObserver
  // is more reliable than polling getBoundingClientRect on every tick.
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

  // Rule: resets to week 1 and playing=true whenever the pathway (resetKey) changes.
  useEffect(() => {
    setPWeek(0);
    setLocked(false);
    setAutoplay(!reducedMotionRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  // Rule 1 + 2: advances every 3400ms, only while the track is on-screen.
  // A single long-lived interval reads fresh values via refs at tick time,
  // same approach the source prototype used with instance state.
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!autoplayRef.current || lockedRef.current || hoverRef.current || reducedMotionRef.current || !onScreenRef.current) return;
      // Rule: loops back to week 1 after week 12, only while still autoplaying.
      setPWeek((w) => (w + 1) % 12);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  // Rule 4: clicking any node, or a prev/next control, hands control to the
  // user permanently for this mount — autoplay never resumes after this.
  const takeControl = (i: number) => {
    setLocked(true);
    setAutoplay(false);
    setPWeek(i);
  };

  // Rule 5: the Pause/Play button is a separate, non-permanent toggle — but
  // once the user has taken control, it can no longer resume autoplay.
  const toggleAutoplay = () => {
    if (locked || reducedMotion) return;
    setAutoplay((a) => !a);
  };

  const isPlaying = autoplay && !locked;
  const statusText = isPlaying ? 'PLAYING · SELECT ANY WEEK TO TAKE OVER' : 'PAUSED · YOU ARE DRIVING';

  const current = WEEKS[pWeek];
  const artefact = weekArtefacts[pWeek] ?? '—';
  const bankedFraction = `${pWeek + 1} of 12`;
  const bankedPct = ((pWeek + 1) / 12) * 100;
  const isLastWeek = pWeek === 11;

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
      aria-label={`${pathwayLabel} twelve-week track`}
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

      {/* Four phase bands, sized 3 / 4 / 4 / 1 */}
      <div style={{ display: 'flex', gap: 2, padding: '20px 28px 0' }}>
        {PHASE_BANDS.map((band, bi) => {
          const on =
            bi === 0 ? pWeek <= 2 : bi === 1 ? pWeek >= 3 && pWeek <= 6 : bi === 2 ? pWeek >= 7 && pWeek <= 10 : pWeek === 11;
          return (
            <div key={band.label} style={{ flex: band.flex, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: '.1em',
                  color: on ? 'var(--fg-1)' : 'var(--fg-3)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {band.range}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: on ? 'var(--fg-1)' : 'var(--fg-3)',
                  marginTop: 2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {band.label}
              </div>
              <div
                style={{
                  height: 3,
                  background: on ? 'var(--ink-800)' : 'var(--border-soft)',
                  marginTop: 8,
                  transition: 'background 220ms var(--ease-quint-out)',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Rail: twelve nodes */}
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
          {WEEKS.map((w, i) => {
            const selected = pWeek === i;
            const completed = i < pWeek;
            const size = selected ? 46 : 38;
            const bg = selected ? 'var(--seal-500)' : completed ? 'var(--ink-800)' : 'var(--white)';
            const fg = selected || completed ? 'var(--bone)' : 'var(--fg-3)';
            const bd = selected ? 'var(--seal-500)' : completed ? 'var(--ink-800)' : 'var(--border-strong)';
            return (
              <button
                key={w.num}
                type="button"
                onClick={() => takeControl(i)}
                aria-current={selected ? 'step' : undefined}
                aria-label={`Week ${i + 1}`}
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
        {/* Left: week / phase / concept / description */}
        <div className="weektrack-detail-left" style={{ padding: '28px 28px 30px', borderRight: '1px solid var(--border-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', color: 'var(--seal-600)' }}>
              {current.num}
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
              {current.phase}
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
            {current.title}
          </h3>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: '12px 0 0', maxWidth: '34em' }}>
            {current.desc}
          </p>
          <div style={{ display: 'flex', gap: 10, margin: '26px 0 0' }}>
            <button
              type="button"
              onClick={() => takeControl(Math.max(0, pWeek - 1))}
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
              ← Previous week
            </button>
            <button
              type="button"
              onClick={() => takeControl(Math.min(11, pWeek + 1))}
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
              Next week →
            </button>
          </div>
        </div>

        {/* Right: the artefact, rubric chip, SLA note, portfolio-banked meter */}
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
            {artefact}
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
              Rubric-scored
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
            {isLastWeek && (
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
