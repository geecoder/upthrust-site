'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

const PROGRAM_ITEMS = [
  { href: '/pathway-product-management', label: 'PM Pathway', sub: 'Strategy, PRDs, roadmaps' },
  { href: '/pathway-business-analysis', label: 'BA Pathway', sub: 'Requirements, BRDs, UAT' },
  { href: '/assessment', label: 'Career Assessment', sub: '8 minutes · 12 scenarios' },
];

function ProgramDropdown({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  return (
    <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 bg-navy border border-white/10 rounded-xl shadow-2xl p-2 min-w-[260px] z-50">
      {PROGRAM_ITEMS.map(({ href, label, sub }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={`flex flex-col px-4 py-3 rounded-lg transition-colors text-sm ${
              active ? 'text-amber bg-white/5' : 'text-paper/80 hover:text-paper hover:bg-white/5'
            }`}
          >
            <span className="font-semibold">{label}</span>
            <span className="text-xs text-paper/40 mt-0.5">{sub}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const programRef = useRef<HTMLDivElement>(null);

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

  // Close dropdowns on route change
  useEffect(() => {
    setProgramOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    return pathname === href;
  }

  return (
    <header className="bg-navy/95 backdrop-blur-md border-b border-white/5 h-[68px]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">

        {/* Logo */}
        <Link href="/" className="relative flex-shrink-0" style={{ width: 140, height: 52 }}>
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

          {/* Standalone: The Accelerator */}
          <Link
            href="/accelerator"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/accelerator')
                ? 'text-amber font-bold'
                : 'text-paper/70 hover:text-paper hover:bg-white/5'
            }`}
          >
            The Accelerator
          </Link>

          {/* Program dropdown */}
          <div ref={programRef} className="relative">
            <button
              onClick={() => setProgramOpen(o => !o)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                PROGRAM_ITEMS.some(i => pathname === i.href)
                  ? 'text-amber font-bold'
                  : 'text-paper/70 hover:text-paper hover:bg-white/5'
              }`}
              aria-expanded={programOpen}
            >
              Program
              <svg
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                className={`transition-transform duration-200 ${programOpen ? 'rotate-180' : ''}`}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {programOpen && <ProgramDropdown onClose={() => setProgramOpen(false)} />}
          </div>

          {/* About + FAQ */}
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(href)
                  ? 'text-amber font-bold'
                  : 'text-paper/70 hover:text-paper hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/consultation"
            className="ml-3 bg-amber hover:bg-amber-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200"
          >
            Book a Consultation
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
              <path d="M1 1L21 17M21 1L1 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <>
                <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="0" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="0" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-navy z-50 flex flex-col">
          {/* Header row */}
          <div className="flex items-center justify-between px-6 h-[68px] border-b border-white/10 flex-shrink-0">
            <Link href="/" onClick={() => setMobileOpen(false)} className="relative" style={{ width: 130, height: 48 }}>
              <Image src="/brand/upthrust-logo.png" alt="Upthrust" fill sizes="130px"
                className="object-contain brightness-0 invert opacity-95" />
            </Link>
            <button onClick={() => setMobileOpen(false)} className="w-11 h-11 flex items-center justify-center text-paper">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Mobile links */}
          <nav className="flex-1 overflow-y-auto flex flex-col justify-center px-8 py-6 gap-0">
            {[
              { href: '/accelerator', label: 'The Accelerator' },
              { href: '/pathway-product-management', label: 'PM Pathway' },
              { href: '/pathway-business-analysis', label: 'BA Pathway' },
              { href: '/assessment', label: 'Career Assessment' },
              { href: '/about', label: 'About' },
              { href: '/faq', label: 'FAQ' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`font-serif text-3xl py-5 border-b border-white/10 transition-colors ${
                  isActive(href) ? 'text-amber' : 'text-paper/80 hover:text-paper'
                }`}
              >
                {label}
              </Link>
            ))}

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/consultation"
                onClick={() => setMobileOpen(false)}
                className="bg-amber hover:bg-amber-dark text-white text-center py-4 rounded-xl font-bold text-base transition-all"
              >
                Book a Consultation
              </Link>
              <Link
                href="/assessment"
                onClick={() => setMobileOpen(false)}
                className="border-2 border-white/20 text-paper text-center py-4 rounded-xl font-bold text-base"
              >
                Take the Assessment
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
