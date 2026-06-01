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
    <div className="bg-navy/90 border-b border-white/10 px-4 py-2.5 flex flex-wrap justify-center items-center gap-4 text-xs">
      {phase === 'closed' ? (
        <>
          <span className="text-paper/80">
            Cohort 1 enrollment is closed · Starts <strong className="text-amber">June 6, 2026</strong>
          </span>
          <Link href="/consultation" className="text-amber underline font-bold tracking-wide uppercase text-[10px]">
            Join Cohort 2 Waitlist →
          </Link>
        </>
      ) : (
        <>
          <span className="flex items-center gap-2 text-paper/80">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_0_3px_rgba(74,222,128,0.3)] animate-pulse" />
            <strong className="text-amber">Cohort 1 is open</strong>
            {' · '}Starts June 6, 2026
            {daysLeft !== null && (
              <> · Closes in <strong className="text-amber">{daysLeft === 1 ? '1 day' : `${daysLeft} days`}</strong></>
            )}
          </span>
          <Link href="/assessment" className="text-amber font-bold tracking-widest uppercase text-[10px] border-b border-amber/40 pb-px">
            Take the Assessment →
          </Link>
        </>
      )}
    </div>
  );
}

function ProgramDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-paper border border-paper/20 shadow-xl rounded-xl p-2 min-w-[280px] z-50 animate-[dropIn_180ms_ease-out_both]">
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-1.5 overflow-hidden">
        <div className="w-3 h-3 bg-paper border border-paper/20 rotate-45 translate-x-0 translate-y-0.5" />
      </div>
      {[
        { href: '/accelerator', icon: '⚡', title: 'The Accelerator', sub: 'Full 12-week program overview' },
        { href: '/pathway-product-management', icon: '📋', title: 'Product Management', sub: 'PM pathway — strategy & PRDs' },
        { href: '/pathway-business-analysis', icon: '📊', title: 'Business Analysis', sub: 'BA pathway — requirements & BRDs' },
        { href: '/assessment', icon: '🎯', title: 'Career Assessment', sub: '8 minutes · 12 scenarios' },
      ].map(({ href, icon, title, sub }) => (
        <Link key={href} href={href} onClick={onClose}
          className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-paper/60 transition-colors group">
          <span className="text-lg mt-0.5 flex-shrink-0">{icon}</span>
          <div>
            <p className="font-bold text-sm text-navy">{title}</p>
            <p className="text-xs text-ink/50 mt-0.5">{sub}</p>
          </div>
        </Link>
      ))}
      <style>{`@keyframes dropIn { from { opacity:0; transform:translateX(-50%) translateY(-8px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const programRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

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
    <header className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? 'bg-navy/98 shadow-lg shadow-navy/20' : 'bg-navy/95'} backdrop-blur-sm`}>
      <UrgencyStrip />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link href="/" onClick={() => setMobileOpen(false)} className="relative flex-shrink-0" style={{ width: 140, height: 52 }}>
          <Image
            src="/brand/upthrust-logo.png"
            alt="Upthrust"
            fill
            priority
            sizes="140px"
            className="object-contain brightness-0 invert opacity-95"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <div ref={programRef} className="relative">
            <button
              onClick={() => setProgramOpen(o => !o)}
              className="flex items-center gap-1.5 px-3 py-2 text-paper/70 hover:text-paper text-sm font-medium transition-colors rounded-lg hover:bg-white/5"
              aria-expanded={programOpen}
            >
              Program
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                className={`transition-transform duration-200 ${programOpen ? 'rotate-180' : ''}`}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {programOpen && <ProgramDropdown onClose={() => setProgramOpen(false)} />}
          </div>

          {[
            { href: '/about', label: 'About' },
            { href: '/faq', label: 'FAQ' },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className="px-3 py-2 text-paper/70 hover:text-paper text-sm font-medium transition-colors rounded-lg hover:bg-white/5">
              {label}
            </Link>
          ))}

          <Link href="/assessment"
            className="ml-3 bg-amber hover:bg-amber-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200">
            Take the Assessment
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden w-11 h-11 flex items-center justify-center text-paper"
        >
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
            {mobileOpen ? (
              <path d="M1 1L21 17M21 1L1 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            ) : (
              <>
                <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="0" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="0" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-navy z-50 flex flex-col">
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 h-[68px] border-b border-white/10">
            <Link href="/" onClick={() => setMobileOpen(false)} className="relative" style={{ width: 130, height: 48 }}>
              <Image src="/brand/upthrust-logo.png" alt="Upthrust" fill sizes="130px"
                className="object-contain brightness-0 invert opacity-95" />
            </Link>
            <button onClick={() => setMobileOpen(false)} className="w-11 h-11 flex items-center justify-center text-paper">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-2">
            {[
              { href: '/accelerator', label: 'The Accelerator' },
              { href: '/pathway-product-management', label: 'Product Management' },
              { href: '/pathway-business-analysis', label: 'Business Analysis' },
              { href: '/assessment', label: 'Career Assessment' },
              { href: '/about', label: 'About' },
              { href: '/faq', label: 'FAQ' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                className="font-serif text-2xl text-paper/80 hover:text-paper py-3 border-b border-white/10 transition-colors">
                {label}
              </Link>
            ))}

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/assessment" onClick={() => setMobileOpen(false)}
                className="bg-amber text-white text-center py-4 rounded-xl font-bold text-base">
                Take the Assessment
              </Link>
              <Link href="/consultation" onClick={() => setMobileOpen(false)}
                className="border-2 border-white/20 text-paper text-center py-4 rounded-xl font-bold text-base">
                Book a Consultation
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
