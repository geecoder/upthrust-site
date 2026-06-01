'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnnouncementBanner } from './AnnouncementBanner';

const PROGRAM_LINKS = [
  { href: '/pathway-product-management', label: 'PM Pathway',       desc: 'Build evidence as a Product Manager' },
  { href: '/pathway-business-analysis',  label: 'BA Pathway',       desc: 'Build evidence as a Business Analyst' },
  { href: '/assessment',                 label: 'Career Assessment', desc: 'Discover which path fits you' },
];

export function Navbar() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [programOpen, setProgramOpen]     = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const pathname   = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setProgramOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgramOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname?.startsWith(href));

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      {/* Announcement Banner */}
      <AnnouncementBanner onDismiss={() => setBannerVisible(false)} />

      {/* Navbar */}
      <nav
        className={`bg-navy/96 backdrop-blur-md border-b border-white/6 transition-shadow duration-200 ${
          scrolled ? 'shadow-lg shadow-black/20' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[68px] flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/brand/upthrust-logo.png"
              alt="Upthrust"
              width={130}
              height={32}
              className="h-8 w-auto brightness-0 invert"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            <Link
              href="/accelerator"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/accelerator') ? 'text-amber bg-white/8' : 'text-paper/70 hover:text-paper hover:bg-white/6'
              }`}
            >
              The Accelerator
            </Link>

            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setProgramOpen(o => !o)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  PROGRAM_LINKS.some(l => isActive(l.href)) ? 'text-amber bg-white/8' : 'text-paper/70 hover:text-paper hover:bg-white/6'
                }`}
              >
                Program
                <svg className={`w-3.5 h-3.5 transition-transform duration-150 ${programOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {programOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-navy border border-white/10 rounded-2xl shadow-2xl shadow-black/30 p-2 z-50">
                  {PROGRAM_LINKS.map(l => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex flex-col px-4 py-3 rounded-xl hover:bg-white/6 transition-colors group"
                    >
                      <span className={`text-sm font-semibold transition-colors ${isActive(l.href) ? 'text-amber' : 'text-paper group-hover:text-amber'}`}>
                        {l.label}
                      </span>
                      <span className="text-xs text-paper/40 mt-0.5">{l.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-amber bg-white/8' : 'text-paper/70 hover:text-paper hover:bg-white/6'
              }`}
            >
              About
            </Link>

            <Link
              href="/faq"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/faq') ? 'text-amber bg-white/8' : 'text-paper/70 hover:text-paper hover:bg-white/6'
              }`}
            >
              FAQ
            </Link>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Link href="/consultation" className="text-paper/60 hover:text-paper text-sm font-medium transition-colors px-3 py-2">
              Book a Call
            </Link>
            <Link
              href="/assessment"
              className="bg-amber hover:bg-amber-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-amber/20 hover:shadow-lg hover:shadow-amber/30"
            >
              Take the Assessment
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden text-paper p-2 rounded-lg hover:bg-white/8 flex-shrink-0"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-navy z-50 flex flex-col overflow-y-auto"
          style={{ top: bannerVisible ? '40px' : '0' }}
        >
          <div className="flex items-center justify-between px-5 h-[68px] border-b border-white/10 flex-shrink-0">
            <Image src="/brand/upthrust-logo.png" alt="Upthrust" width={120} height={30} className="h-7 w-auto brightness-0 invert" />
            <button onClick={() => setMenuOpen(false)} className="text-paper/60 hover:text-paper p-2 text-2xl">×</button>
          </div>
          <div className="flex flex-col px-5 py-8 gap-0 flex-1">
            {[
              { href: '/accelerator',               label: 'The Accelerator' },
              { href: '/pathway-product-management', label: 'PM Pathway' },
              { href: '/pathway-business-analysis',  label: 'BA Pathway' },
              { href: '/assessment',                 label: 'Career Assessment' },
              { href: '/about',                      label: 'About' },
              { href: '/faq',                        label: 'FAQ' },
              { href: '/consultation',               label: 'Book a Call' },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`py-4 text-xl font-serif border-b border-white/8 transition-colors ${
                  isActive(l.href) ? 'text-amber' : 'text-paper/80 hover:text-paper'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="px-5 pb-10 flex-shrink-0">
            <Link
              href="/assessment"
              className="block w-full text-center bg-amber hover:bg-amber-dark text-white font-bold py-4 rounded-2xl text-lg transition-all"
            >
              Take the Assessment →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
