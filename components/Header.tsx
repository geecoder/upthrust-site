'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

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
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: '10px 24px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
      fontSize: '0.8125rem',
      lineHeight: 1.4,
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
          }}>
            Join Cohort 2 Waitlist →
          </Link>
        </>
      ) : (
        <>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#4ade80', flexShrink: 0,
              boxShadow: '0 0 0 2px rgba(74,222,128,0.3)',
              animation: 'hpulse 2s infinite',
              display: 'inline-block',
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
          }}>
            Take the Assessment →
          </Link>
        </>
      )}
      <style>{`@keyframes hpulse{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: scrolled ? 'rgba(250,247,241,0.97)' : 'rgba(250,247,241,0.94)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${scrolled ? 'var(--paper-line)' : 'transparent'}`,
      transition: 'border-color 200ms, background 200ms',
    }}>
      <UrgencyStrip />

      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 68,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <path d="M4 22 L14 6 L24 22 M9 18 L19 18"
              stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter"/>
          </svg>
          <span style={{
            fontFamily: 'Fraunces, serif', fontSize: '1.3125rem',
            fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)',
          }}>Upthrust</span>
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[
            { href: '/accelerator', label: 'The Accelerator' },
            { href: '/pathway-product-management', label: 'Product Management' },
            { href: '/pathway-business-analysis', label: 'Business Analysis' },
            { href: '/about', label: 'About' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontSize: '0.9375rem', color: 'var(--ink-soft)',
              fontWeight: 400, letterSpacing: '-0.005em',
              textDecoration: 'none', transition: 'color 150ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}
            >
              {label}
            </Link>
          ))}
          <Link href="/assessment" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.875rem' }}>
            Take the Assessment
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="mobile-toggle"
          style={{
            display: 'none', width: 40, height: 40,
            alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            {open ? (
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
      {open && (
        <nav style={{
          borderTop: '1px solid var(--paper-line)',
          background: 'var(--paper)',
          padding: '24px',
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          {[
            { href: '/accelerator', label: 'The Accelerator' },
            { href: '/pathway-product-management', label: 'Product Management Pathway' },
            { href: '/pathway-business-analysis', label: 'Business Analysis Pathway' },
            { href: '/about', label: 'About' },
            { href: '/faq', label: 'FAQ' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              padding: '14px 0',
              borderBottom: '1px solid var(--paper-line)',
              fontSize: '1rem', color: 'var(--ink)',
              textDecoration: 'none', display: 'block',
            }}>
              {label}
            </Link>
          ))}
          <Link href="/assessment" onClick={() => setOpen(false)} className="btn btn-primary" style={{
            marginTop: 20, alignSelf: 'flex-start',
          }}>
            Take the Assessment
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
