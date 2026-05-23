'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const ENROLLMENT_CLOSE = new Date('2026-06-03T23:59:00');
const COHORT_START = new Date('2026-06-06T00:00:00');

function UrgencyStrip() {
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

  if (phase === 'started') return null;

  return (
    <div style={{
      background: 'var(--ink)', color: 'var(--paper)',
      padding: '10px 24px',
      display: 'flex', flexWrap: 'wrap',
      justifyContent: 'center', alignItems: 'center',
      gap: 16, fontSize: '0.8125rem', lineHeight: 1.4,
    }}>
      {phase === 'closed' ? (
        <>
          <span style={{ color: 'rgba(250,247,241,0.85)' }}>
            Cohort 1 enrollment is closed · Starts <strong style={{ color: 'var(--amber-soft)' }}>June 6, 2026</strong>
          </span>
          <Link href="/consultation" style={{
            fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--amber)', borderBottom: '1px solid currentColor', paddingBottom: 1,
          }}>Join Cohort 2 Waitlist →</Link>
        </>
      ) : (
        <>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#4ade80', flexShrink: 0,
              boxShadow: '0 0 0 2px rgba(74,222,128,0.3)',
              animation: 'hpulse 2s infinite', display: 'inline-block',
            }} />
            <span style={{ color: 'rgba(250,247,241,0.9)' }}>
              <strong style={{ color: 'var(--amber-soft)' }}>Cohort 1 is open</strong>
              {' · '}Starts June 6, 2026
              {daysLeft !== null && (
                <> · Enrollment closes in <strong style={{ color: 'var(--amber-soft)' }}>
                  {daysLeft === 1 ? '1 day' : `${daysLeft} days`}
                </strong></>
              )}
            </span>
          </span>
          <Link href="/assessment" style={{
            fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--amber)', borderBottom: '1px solid currentColor',
            paddingBottom: 1, whiteSpace: 'nowrap',
          }}>Take the Assessment →</Link>
        </>
      )}
      <style>{`@keyframes hpulse{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
    </div>
  );
}

// Program dropdown
function ProgramDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 12px)', left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--paper)',
      border: '1px solid var(--paper-line)',
      boxShadow: '0 16px 48px -12px rgba(15,26,46,0.18)',
      padding: '8px',
      minWidth: 280,
      zIndex: 200,
      animation: 'dropIn 180ms cubic-bezier(0.2,0.7,0.2,1) both',
    }}>
      {/* Arrow */}
      <div style={{
        position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
        width: 12, height: 6,
        overflow: 'hidden',
      }}>
        <div style={{
          width: 12, height: 12, background: 'var(--paper)',
          border: '1px solid var(--paper-line)',
          transform: 'rotate(45deg) translate(1px, 1px)',
        }} />
      </div>

      <Link href="/accelerator" onClick={onClose} style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '12px 14px', textDecoration: 'none',
        transition: 'background 150ms',
        borderRadius: 2,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--paper-soft)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--ink)', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15 9H22L16.5 13.5L18.5 21L12 17L5.5 21L7.5 13.5L2 9H9Z" stroke="#FAF7F1" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)', marginBottom: 2 }}>The Accelerator</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)', lineHeight: 1.4 }}>Full 12-week program overview, pricing, capstones</p>
        </div>
      </Link>

      <div style={{ height: 1, background: 'var(--paper-line)', margin: '4px 14px' }} />

      <Link href="/pathway-product-management" onClick={onClose} style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '12px 14px', textDecoration: 'none',
        transition: 'background 150ms', borderRadius: 2,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--paper-soft)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--amber)', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 3h18v4H3zM3 10h12v4H3zM3 17h8v4H3z" stroke="#FAF7F1" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)', marginBottom: 2 }}>Product Management</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)', lineHeight: 1.4 }}>Strategy, PRDs, roadmaps — the PM pathway</p>
        </div>
      </Link>

      <Link href="/pathway-business-analysis" onClick={onClose} style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '12px 14px', textDecoration: 'none',
        transition: 'background 150ms', borderRadius: 2,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--paper-soft)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--moss)', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="#FAF7F1" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)', marginBottom: 2 }}>Business Analysis</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)', lineHeight: 1.4 }}>Requirements, BRDs, process mapping — the BA pathway</p>
        </div>
      </Link>

      <style>{`@keyframes dropIn { from { opacity:0; transform:translateX(-50%) translateY(-8px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProgOpen, setMobileProgOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const programRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (programRef.current && !programRef.current.contains(e.target as Node)) {
        setProgramOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(250,247,241,0.97)' : 'rgba(250,247,241,0.94)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${scrolled ? 'var(--paper-line)' : 'transparent'}`,
      transition: 'border-color 200ms, background 200ms',
    }}>
      <UrgencyStrip />

      <div className="container" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 68,
      }}>
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          style={{
            display: 'block',
            width: 'clamp(132px, 15vw, 152px)',
            height: 60,
            position: 'relative',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <Image
            src="/brand/upthrust-logo.png"
            alt="Upthrust"
            fill
            priority
            sizes="(max-width: 980px) 132px, 152px"
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">

          {/* Program dropdown trigger */}
          <div ref={programRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setProgramOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 12px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.9375rem', color: programOpen ? 'var(--ink)' : 'var(--ink-soft)',
                fontFamily: 'Manrope, sans-serif', fontWeight: 500,
                transition: 'color 150ms',
                borderRadius: 4,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={e => { if (!programOpen) e.currentTarget.style.color = 'var(--ink-soft)'; }}
              aria-expanded={programOpen}
              aria-haspopup="true"
            >
              Program
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                style={{ transform: programOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms' }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {programOpen && <ProgramDropdown onClose={() => setProgramOpen(false)} />}
          </div>

          {[
            { href: '/about', label: 'About' },
            { href: '/faq', label: 'FAQ' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              padding: '8px 12px',
              fontSize: '0.9375rem', color: 'var(--ink-soft)',
              fontWeight: 500, textDecoration: 'none', transition: 'color 150ms',
              borderRadius: 4,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}
            >
              {label}
            </Link>
          ))}

          <Link href="/assessment" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.875rem', marginLeft: 8 }}>
            Take the Assessment
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="mobile-toggle"
          style={{
            display: 'none', width: 44, height: 44,
            alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            flexShrink: 0,
          }}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            {mobileOpen ? (
              <path d="M1 1L21 15M21 1L1 15" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round"/>
            ) : (
              <>
                <line x1="0" y1="1" x2="22" y2="1" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="0" y1="8" x2="22" y2="8" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="0" y1="15" x2="22" y2="15" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav style={{
          borderTop: '1px solid var(--paper-line)',
          background: 'var(--paper)',
          padding: '0 24px 24px',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Program section with expand */}
          <div>
            <button
              onClick={() => setMobileProgOpen(o => !o)}
              style={{
                width: '100%', textAlign: 'left',
                padding: '16px 0',
                background: 'none', border: 'none',
                borderBottom: '1px solid var(--paper-line)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontSize: '1rem', color: 'var(--ink)', fontFamily: 'Manrope, sans-serif', fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Program
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none"
                style={{ transform: mobileProgOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms' }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {mobileProgOpen && (
              <div style={{ background: 'var(--paper-soft)', margin: '0 -24px', padding: '8px 24px' }}>
                {[
                  { href: '/accelerator', label: 'The Accelerator', sub: '12-week program overview' },
                  { href: '/pathway-product-management', label: 'Product Management', sub: 'PM pathway' },
                  { href: '/pathway-business-analysis', label: 'Business Analysis', sub: 'BA pathway' },
                ].map(({ href, label, sub }) => (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{
                    display: 'flex', flexDirection: 'column',
                    padding: '12px 0',
                    borderBottom: '1px solid var(--paper-line)',
                    textDecoration: 'none',
                  }}>
                    <span style={{ fontSize: '0.9375rem', color: 'var(--ink)', fontWeight: 600 }}>{label}</span>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)', marginTop: 2 }}>{sub}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[
            { href: '/about', label: 'About' },
            { href: '/faq', label: 'FAQ' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{
              padding: '16px 0',
              borderBottom: '1px solid var(--paper-line)',
              fontSize: '1rem', color: 'var(--ink)',
              textDecoration: 'none', display: 'block', fontWeight: 500,
            }}>
              {label}
            </Link>
          ))}

          <Link href="/assessment" onClick={() => setMobileOpen(false)} className="btn btn-primary btn-arrow" style={{
            marginTop: 24, display: 'block', textAlign: 'center',
          }}>
            Take the Assessment
          </Link>
          <Link href="/consultation" onClick={() => setMobileOpen(false)} style={{
            marginTop: 12, display: 'block', textAlign: 'center',
            fontSize: '0.875rem', color: 'var(--ink-muted)', textDecoration: 'underline',
          }}>
            Book a Consultation
          </Link>
        </nav>
      )}

      <style jsx>{`
        @media (max-width: 980px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
