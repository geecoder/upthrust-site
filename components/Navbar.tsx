'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { COHORT, PATHWAY_LIST, INTENSIVE_LIST, siteSeatsLine } from '@/lib/cohort-config';

const MOBILE_GROUPS: { title: string | null; links: { href: string; label: string }[] }[] = [
  { title: null, links: [{ href: '/accelerator', label: 'The Accelerator' }] },
  {
    title: 'CAREER CAPABILITY PATHWAYS · 12 WEEKS',
    links: [
      { href: '/pathways/product-management', label: 'Product Management' },
      { href: '/pathways/business-analysis', label: 'Business Analysis' },
      { href: '/pathways/product-design', label: 'Product Design' },
      { href: '/pathways/payment-operations', label: 'Payment Operations' },
    ],
  },
  {
    title: 'SPECIALIST INTENSIVES · 5 WEEKS',
    links: [
      { href: '/intensives/ai-product-builder', label: 'AI Product Builder' },
      { href: '/intensives/ba-for-ai-automation', label: 'BA for AI & Automation' },
    ],
  },
  { title: null, links: [{ href: '/assessment', label: 'Assessment' }, { href: '/about', label: 'About' }] },
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
  const isProgrammesActive = pathname?.startsWith('/pathways') || pathname?.startsWith('/intensives');

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
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, background: 'var(--seal-500)', color: 'var(--bone)', padding: '3px 7px', letterSpacing: '0.1em', flexShrink: 0, whiteSpace: 'nowrap' }}>
            {PATHWAY_LIST.length} PATHWAYS · {INTENSIVE_LIST.length} INTENSIVES
          </span>
          <span className="topstrip-hide-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-200)', whiteSpace: 'nowrap' }}>Pathways start {COHORT.startDateDisplay} · intensives {COHORT.intensiveStartDateDisplay}</span>
          <span className="topstrip-hide-sm" style={{ flex: 1 }} />
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-200)', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', marginLeft: 'auto' }}>
            <span style={{ width: 6, height: 6, background: 'var(--moss-500)', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
            {siteSeatsLine()}
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
                  color: isProgrammesActive ? 'var(--fg-1)' : 'var(--fg-2)',
                  borderBottom: `1px solid ${isProgrammesActive ? 'var(--seal-500)' : 'transparent'}`,
                }}
              >
                Programmes
                <span style={{ fontSize: 10, color: 'var(--fg-3)' }}>{pathsOpen ? '▲' : '▼'}</span>
              </button>
              {pathsOpen && (
                <div className="v3drop" style={{ position: 'absolute', top: 32, left: -16, width: 680, display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--white)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-3)', zIndex: 60 }}>
                  {/* Pathways column */}
                  <div style={{ borderRight: '1px solid var(--border-hair)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-3)', padding: '14px 18px 8px' }}>
                      CAREER CAPABILITY PATHWAYS · 12 WEEKS
                    </div>
                    {PATHWAY_LIST.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/pathways/${p.slug}`}
                        style={{ width: '100%', textAlign: 'left', display: 'block', borderTop: '1px solid var(--border-hair)', padding: '14px 18px' }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, letterSpacing: '-0.014em', color: 'var(--fg-1)' }}>{p.label}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--moss-700)', background: 'var(--moss-50)', padding: '2px 6px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                            {p.seatsRemaining} LEFT
                          </span>
                        </span>
                        <span style={{ display: 'block', fontSize: 12, lineHeight: 1.45, color: 'var(--fg-2)', marginTop: 3 }}>
                          {PATHWAY_TAGLINES[p.slug]}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Intensives column */}
                  <div style={{ background: 'var(--paper-dim)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 18px 8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-3)' }}>
                        SPECIALIST INTENSIVES · 5 WEEKS
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.08em', color: 'var(--bone)', background: 'var(--seal-500)', padding: '1px 5px' }}>NEW</span>
                    </div>
                    {INTENSIVE_LIST.map((i) => (
                      <Link
                        key={i.slug}
                        href={`/intensives/${i.slug}`}
                        style={{ width: '100%', textAlign: 'left', display: 'block', borderTop: '1px solid var(--border-hair)', padding: '14px 18px' }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, letterSpacing: '-0.014em', color: 'var(--fg-1)' }}>{i.label}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--seal-600)', background: 'var(--seal-50)', padding: '2px 6px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                            {i.seatsRemaining} LEFT
                          </span>
                        </span>
                        <span style={{ display: 'block', fontSize: 12, lineHeight: 1.45, color: 'var(--fg-2)', marginTop: 3 }}>
                          {INTENSIVE_TAGLINES[i.slug]}
                        </span>
                      </Link>
                    ))}
                    <div style={{ padding: '12px 18px', fontSize: 11, lineHeight: 1.5, color: 'var(--fg-3)' }}>
                      Not scored by the pathway-fit assessment — pick these for a focused, shorter build.
                    </div>
                  </div>

                  <Link href="/assessment" style={{ gridColumn: '1 / -1', width: '100%', textAlign: 'left', display: 'block', borderTop: '1px solid var(--border-hair)', background: 'var(--paper-dim)', padding: '12px 18px', fontSize: 13, fontWeight: 500, color: 'var(--seal-600)' }}>
                    Not sure which fits? Take the assessment →
                  </Link>
                </div>
              )}
            </div>

            {navLink('/assessment', 'Assessment')}

            {navLink('/about', 'About')}
          </nav>

          <span className="hidden lg:flex" style={{ alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <Link href="/enrol" style={{ fontSize: 14, fontWeight: 500, minHeight: 40, padding: '0 18px', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', background: 'var(--seal-500)', color: 'var(--bone)', borderRadius: 'var(--radius-1)' }}>
              Enrol
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
            {MOBILE_GROUPS.map((group, gi) => (
              <div key={group.title ?? `g${gi}`}>
                {group.title && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-3)', padding: '14px 0 4px' }}>
                    {group.title.toUpperCase()}
                  </div>
                )}
                {group.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    style={{
                      padding: '14px 0', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600,
                      borderBottom: '1px solid var(--border-hair)', color: isActive(l.href) ? 'var(--seal-600)' : 'var(--fg-1)',
                      display: 'block',
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div style={{ padding: '20px', flexShrink: 0 }}>
            <Link href="/enrol" style={{ display: 'block', width: '100%', textAlign: 'center', background: 'var(--seal-500)', color: 'var(--bone)', fontWeight: 600, padding: '16px 0', borderRadius: 'var(--radius-1)', fontSize: 16 }}>
              Enrol
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

const INTENSIVE_TAGLINES: Record<string, string> = {
  'ai-product-builder': 'Ship a working AI product.',
  'ba-for-ai-automation': 'Specify AI work that survives audit.',
};
