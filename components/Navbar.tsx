'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { COHORT, PATHWAY_LIST, seatsLine } from '@/lib/cohort-config';

const MOBILE_LINKS = [
  { href: '/accelerator', label: 'The Accelerator' },
  { href: '/pathways/product-management', label: 'Product Management' },
  { href: '/pathways/business-analysis', label: 'Business Analysis' },
  { href: '/pathways/product-design', label: 'Product Design' },
  { href: '/pathways/payment-operations', label: 'Payment Operations' },
  { href: '/assessment', label: 'Career Assessment' },
  { href: '/about', label: 'About' },
];

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ height: 2, background: 'transparent', overflow: 'hidden' }}>
      <div ref={barRef} style={{ height: 2, background: 'var(--seal-500)', transform: 'scaleX(0)', transformOrigin: 'left', willChange: 'transform' }} />
    </div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pathsOpen, setPathsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setPathsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setPathsOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname?.startsWith(href));

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      style={{
        fontSize: 14, fontWeight: 500, padding: '2px 0', color: isActive(href) ? 'var(--fg-1)' : 'var(--fg-2)',
        borderBottom: `1px solid ${isActive(href) ? 'var(--seal-500)' : 'transparent'}`,
      }}
    >
      {label}
    </Link>
  );

  return (
    <>
      {/* Top strip — scrolls away with the page, not sticky */}
      <div style={{ background: 'var(--ink-900)', color: 'var(--fg-on-ink)', fontSize: 12, letterSpacing: '0.06em' }}>
        <div className="container topstrip" style={{ height: 36, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, background: 'var(--seal-500)', color: 'var(--bone)', padding: '3px 7px', letterSpacing: '0.1em', flexShrink: 0 }}>
            4 PATHWAYS
          </span>
          <span className="topstrip-hide-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-200)', whiteSpace: 'nowrap' }}>Starts {COHORT.startDateDisplay}</span>
          <span className="topstrip-hide-sm" style={{ flex: 1 }} />
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-200)', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', marginLeft: 'auto' }}>
            <span style={{ width: 6, height: 6, background: 'var(--moss-500)', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
            {seatsLine()}
          </span>
          <Link href="/assessment" className="topstrip-hide-sm" style={{ fontSize: 12, fontWeight: 500, color: 'var(--bone)', borderBottom: '1px solid rgba(244,239,230,0.4)', paddingBottom: 1, whiteSpace: 'nowrap' }}>
            Take the assessment →
          </Link>
        </div>
      </div>

      {/* Sticky header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bone)', borderBottom: '1px solid var(--border-strong)' }}>
        <div className="container" style={{ minHeight: 68, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px 28px', padding: '10px 24px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <Image src="/brand/upthrust-logo.png" alt="Upthrust" width={168} height={72} className="h-11 w-auto" priority />
          </Link>

          <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: 22, marginLeft: 'auto', minWidth: 0 }}>
            {navLink('/accelerator', 'The Accelerator')}

            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setPathsOpen((o) => !o)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, background: 'none', border: 0, padding: '2px 0', cursor: 'pointer',
                  color: PATHWAY_LIST.some((p) => isActive(`/pathways/${p.slug}`)) ? 'var(--fg-1)' : 'var(--fg-2)',
                  borderBottom: `1px solid ${PATHWAY_LIST.some((p) => isActive(`/pathways/${p.slug}`)) ? 'var(--seal-500)' : 'transparent'}`,
                }}
              >
                Pathways
                <span style={{ fontSize: 10, color: 'var(--fg-3)' }}>{pathsOpen ? '▲' : '▼'}</span>
              </button>
              {pathsOpen && (
                <div style={{ position: 'absolute', top: 32, left: -16, width: 340, background: 'var(--white)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-3)', zIndex: 60 }}>
                  {PATHWAY_LIST.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/pathways/${p.slug}`}
                      style={{ width: '100%', textAlign: 'left', display: 'block', borderBottom: '1px solid var(--border-hair)', padding: '14px 18px' }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.014em', color: 'var(--fg-1)' }}>{p.label}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--moss-700)', background: 'var(--moss-50)', padding: '2px 6px', flexShrink: 0 }}>
                          {p.status.toUpperCase()}
                        </span>
                      </span>
                      <span style={{ display: 'block', fontSize: 13, lineHeight: 1.45, color: 'var(--fg-2)', marginTop: 3 }}>
                        {PATHWAY_TAGLINES[p.slug]}
                      </span>
                    </Link>
                  ))}
                  <Link href="/assessment" style={{ width: '100%', textAlign: 'left', display: 'block', background: 'var(--paper-dim)', padding: '12px 18px', fontSize: 13, fontWeight: 500, color: 'var(--seal-600)' }}>
                    Not sure which fits? Take the assessment →
                  </Link>
                </div>
              )}
            </div>

            {navLink('/about', 'About')}
          </nav>

          <span className="hidden lg:flex" style={{ alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <Link href="/assessment" style={{ fontSize: 14, fontWeight: 500, minHeight: 40, padding: '0 18px', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', background: 'var(--seal-500)', color: 'var(--bone)', borderRadius: 'var(--radius-1)' }}>
              Take the assessment
            </Link>
          </span>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden"
            style={{ padding: 8, borderRadius: 'var(--radius-1)', flexShrink: 0, marginLeft: 'auto' }}
          >
            <div style={{ width: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ display: 'block', height: 2, background: 'var(--fg-1)', transition: 'transform 150ms', transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
              <span style={{ display: 'block', height: 2, background: 'var(--fg-1)', opacity: menuOpen ? 0 : 1, transition: 'opacity 150ms' }} />
              <span style={{ display: 'block', height: 2, background: 'var(--fg-1)', transition: 'transform 150ms', transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
            </div>
          </button>
        </div>
        <ScrollProgress />
      </header>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div className="lg:hidden" style={{ position: 'fixed', inset: 0, background: 'var(--bone)', zIndex: 55, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 68, borderBottom: '1px solid var(--border-strong)', flexShrink: 0 }}>
            <Image src="/brand/upthrust-logo.png" alt="Upthrust" width={144} height={62} className="h-9 w-auto" />
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{ fontSize: 28, lineHeight: 1, padding: 8, color: 'var(--fg-2)' }}>×</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 20px', flex: 1 }}>
            {MOBILE_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  padding: '16px 0', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600,
                  borderBottom: '1px solid var(--border-hair)', color: isActive(l.href) ? 'var(--seal-600)' : 'var(--fg-1)',
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div style={{ padding: '20px', flexShrink: 0 }}>
            <Link href="/assessment" style={{ display: 'block', width: '100%', textAlign: 'center', background: 'var(--seal-500)', color: 'var(--bone)', fontWeight: 600, padding: '16px 0', borderRadius: 'var(--radius-1)', fontSize: 16 }}>
              Take the assessment →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

const PATHWAY_TAGLINES: Record<string, string> = {
  'product-management': 'Build evidence as a Product Manager',
  'business-analysis': 'Build evidence as a Business Analyst',
  'product-design': 'Build evidence as a Product Designer',
  'payment-operations': 'Build evidence in Payment Operations',
};
