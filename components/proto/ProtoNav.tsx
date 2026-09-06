'use client';

// Ported from the prototype's <header> block. Same 64px sticky bar, same
// Pathways mega-menu (v3drop on open), same underline-on-active nav items,
// same single seal Enrol button.

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { P, PROG_HREF, type ProgKey } from '@/lib/proto/data';
import { scrollToId, useProto } from '@/lib/proto/store';

const MENU_PATHS: ProgKey[] = ['pm', 'ba', 'pd', 'po'];
const MENU_INTS: ProgKey[] = ['aipb', 'baai'];

const NAV_ITEMS = [
  { l: 'The Accelerator', href: '/accelerator' },
  { l: 'Assessment', href: '/assessment' },
  { l: 'About', href: '/about' },
];

export function ProtoNav() {
  const { s, set } = useProto();
  const router = useRouter();
  const pathname = usePathname();

  // The prototype is a desktop artboard with no mobile navigation at all — its
  // links simply have nowhere to go below the breakpoint. This sheet is the
  // addition that makes the same links reachable on a phone.
  const [sheet, setSheet] = useState(false);

  useEffect(() => { setSheet(false); }, [pathname]);

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSheet(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [sheet]);

  const onProg = Object.values(PROG_HREF).includes(pathname);

  const goHome = () => { set({ menu: false }); setSheet(false); router.push('/'); };

  // `goEnrol` in the prototype: from any other route, go home first, then
  // scroll to the programme picker after the same 90ms it allows itself.
  const goEnrol = () => {
    set({ menu: false });
    setSheet(false);
    if (pathname !== '/') {
      router.push('/');
      window.setTimeout(() => scrollToId('v3-pick'), 90);
    } else scrollToId('v3-pick');
  };

  const goTo = (href: string) => { set({ menu: false }); setSheet(false); router.push(href); };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 80, background: 'var(--bone)', borderBottom: '1px solid var(--border-strong)' }}>
      <div className="pv-wrap pv-navbar" style={{ height: 64, display: 'flex', alignItems: 'center', gap: 32 }}>
        {/* The real brand lockup. The prototype drew its own "U" tile and
            "Upthrust" wordmark because it had no asset to work from. */}
        <button onClick={goHome} aria-label="Upthrust — home" style={{ font: 'inherit', display: 'flex', alignItems: 'center', background: 'none', border: 0, padding: 0, cursor: 'pointer', flex: 'none' }}>
          <Image
            src="/brand/upthrust-logo-full.png"
            alt="Upthrust"
            width={424}
            height={96}
            priority
            className="pv-logo"
            style={{ height: 30, width: 'auto', display: 'block' }}
          />
        </button>
        <span style={{ flex: 1 }} />

        <nav className="pv-navlinks" style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <span style={{ position: 'relative' }}>
            <button
              onClick={() => set({ menu: !s.menu })}
              aria-expanded={s.menu}
              aria-controls="pv-menu"
              className="pv-h-seal"
              style={{ font: 'inherit', fontSize: 14, fontWeight: 500, background: 'none', border: 0, padding: '0 0 3px', cursor: 'pointer', color: onProg ? 'var(--fg-1)' : 'var(--fg-2)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5, position: 'relative', transition: 'color 150ms' }}
            >
              Pathways <span style={{ fontSize: 9, color: 'var(--fg-3)' }}>{s.menu ? '▴' : '▾'}</span>
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: onProg ? 'var(--seal-500)' : 'transparent', transition: 'background 200ms' }} />
            </button>

            {s.menu && (
              <span id="pv-menu" className="pv-menupanel" style={{ position: 'absolute', top: 34, left: -20, width: 620, background: 'var(--bone)', border: '1px solid var(--ink-900)', boxShadow: 'var(--shadow-3)', zIndex: 90, animation: 'v3drop 220ms cubic-bezier(.22,1,.36,1) both', display: 'block' }}>
                <span style={{ display: 'block', padding: '12px 18px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--fg-3)', borderBottom: '1px solid var(--border-soft)' }}>CAREER CAPABILITY PATHWAYS · 12 WEEKS</span>
                <span style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {MENU_PATHS.map(k => {
                    const p = P[k];
                    const low = p.seats <= 16;
                    return (
                      <button key={k} onClick={() => goTo(PROG_HREF[k])} className="pv-h-paperdim" style={{ font: 'inherit', textAlign: 'left', background: pathname === PROG_HREF[k] ? 'var(--paper-dim)' : 'transparent', border: 0, borderBottom: '1px solid var(--border-hair)', borderRight: '1px solid var(--border-hair)', padding: '13px 18px', cursor: 'pointer', display: 'block', width: '100%' }}>
                        <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>{p.n}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', color: low ? 'var(--seal-600)' : 'var(--fg-3)', whiteSpace: 'nowrap' }}>{p.seats} left</span>
                        </span>
                        <span style={{ display: 'block', fontSize: 12, color: 'var(--fg-2)', marginTop: 3 }}>{p.l}</span>
                      </button>
                    );
                  })}
                </span>
                <span style={{ display: 'block', padding: '12px 18px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--seal-600)', borderBottom: '1px solid var(--border-soft)', background: 'var(--paper-dim)' }}>SPECIALIST INTENSIVES · 5 WEEKS</span>
                <span style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {MENU_INTS.map(k => {
                    const p = P[k];
                    return (
                      <button key={k} onClick={() => goTo(PROG_HREF[k])} className="pv-h-ink800" style={{ font: 'inherit', textAlign: 'left', background: 'var(--ink-900)', border: 0, borderRight: '1px solid rgba(244,239,230,.14)', padding: '13px 18px', cursor: 'pointer', display: 'block', width: '100%' }}>
                        <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--bone)' }}>{p.n}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', color: 'var(--seal-300)', whiteSpace: 'nowrap' }}>{p.seats} left</span>
                        </span>
                        <span style={{ display: 'block', fontSize: 12, color: 'var(--ink-200)', marginTop: 3 }}>{p.l}</span>
                      </button>
                    );
                  })}
                </span>
              </span>
            )}
          </span>

          {NAV_ITEMS.map(n => (
            <button key={n.href} onClick={() => goTo(n.href)} className="pv-h-seal" style={{ font: 'inherit', fontSize: 14, fontWeight: 500, background: 'none', border: 0, padding: '0 0 3px', cursor: 'pointer', color: pathname === n.href ? 'var(--fg-1)' : 'var(--fg-2)', whiteSpace: 'nowrap', position: 'relative', transition: 'color 150ms' }}>
              {n.l}
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: pathname === n.href ? 'var(--seal-500)' : 'transparent', transition: 'background 200ms' }} />
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={goEnrol} className="pv-h-seal600" style={{ font: 'inherit', fontSize: 14, fontWeight: 500, height: 38, padding: '0 18px', background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer', whiteSpace: 'nowrap' }}>Enrol</button>

          <button
            onClick={() => { setSheet(!sheet); set({ menu: false }); }}
            className="pv-burger"
            aria-expanded={sheet}
            aria-controls="pv-sheet"
            aria-label={sheet ? 'Close menu' : 'Open menu'}
            style={{ display: 'none', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4, width: 38, height: 38, background: 'none', border: '1px solid var(--border-strong)', borderRadius: 4, cursor: 'pointer', padding: 0 }}
          >
            <span aria-hidden="true" style={{ display: 'block', width: 16, height: 1.5, background: 'var(--fg-1)', transition: 'transform 200ms cubic-bezier(.22,1,.36,1)', transform: sheet ? 'translateY(5.5px) rotate(45deg)' : 'none' }} />
            <span aria-hidden="true" style={{ display: 'block', width: 16, height: 1.5, background: 'var(--fg-1)', transition: 'opacity 160ms', opacity: sheet ? 0 : 1 }} />
            <span aria-hidden="true" style={{ display: 'block', width: 16, height: 1.5, background: 'var(--fg-1)', transition: 'transform 200ms cubic-bezier(.22,1,.36,1)', transform: sheet ? 'translateY(-5.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {sheet && (
        <div
          id="pv-sheet"
          style={{ position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, background: 'var(--bone)', borderTop: '1px solid var(--border-strong)', zIndex: 79, overflowY: 'auto', WebkitOverflowScrolling: 'touch', animation: 'v3drop 220ms cubic-bezier(.22,1,.36,1) both' }}
        >
          <div style={{ padding: '18px 20px 40px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--fg-3)', paddingBottom: 10, borderBottom: '1px solid var(--border-strong)' }}>CAREER CAPABILITY PATHWAYS · 12 WEEKS</div>
            {MENU_PATHS.map(k => {
              const p = P[k];
              const low = p.seats <= 16;
              return (
                <button key={k} onClick={() => goTo(PROG_HREF[k])} style={{ font: 'inherit', display: 'block', width: '100%', textAlign: 'left', background: pathname === PROG_HREF[k] ? 'var(--paper-dim)' : 'none', border: 0, borderBottom: '1px solid var(--border-hair)', padding: '15px 4px', cursor: 'pointer' }}>
                  <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg-1)' }}>{p.n}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', color: low ? 'var(--seal-600)' : 'var(--fg-3)', whiteSpace: 'nowrap' }}>{p.seats} left</span>
                  </span>
                  <span style={{ display: 'block', fontSize: 13, color: 'var(--fg-2)', marginTop: 3 }}>{p.l}</span>
                </button>
              );
            })}

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.12em', color: 'var(--seal-600)', padding: '20px 0 10px', borderBottom: '1px solid var(--border-strong)' }}>SPECIALIST INTENSIVES · 5 WEEKS</div>
            {MENU_INTS.map(k => {
              const p = P[k];
              return (
                <button key={k} onClick={() => goTo(PROG_HREF[k])} style={{ font: 'inherit', display: 'block', width: '100%', textAlign: 'left', background: 'var(--ink-900)', border: 0, borderBottom: '1px solid rgba(244,239,230,.14)', padding: '15px 14px', cursor: 'pointer' }}>
                  <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--bone)' }}>{p.n}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.06em', color: 'var(--seal-300)', whiteSpace: 'nowrap' }}>{p.seats} left</span>
                  </span>
                  <span style={{ display: 'block', fontSize: 13, color: 'var(--ink-200)', marginTop: 3 }}>{p.l}</span>
                </button>
              );
            })}

            <div style={{ marginTop: 24, borderTop: '2px solid var(--ink-900)' }}>
              {NAV_ITEMS.map(n => (
                <button key={n.href} onClick={() => goTo(n.href)} style={{ font: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', textAlign: 'left', fontSize: 17, fontWeight: 500, background: 'none', border: 0, borderBottom: '1px solid var(--border-soft)', padding: '16px 4px', cursor: 'pointer', color: pathname === n.href ? 'var(--seal-600)' : 'var(--fg-1)' }}>
                  {n.l}<span aria-hidden="true" style={{ color: 'var(--fg-3)' }}>→</span>
                </button>
              ))}
            </div>

            <button onClick={goEnrol} className="pv-h-seal600" style={{ font: 'inherit', fontSize: 16, fontWeight: 500, height: 52, width: '100%', marginTop: 24, background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: 'pointer' }}>Enrol</button>
          </div>
        </div>
      )}
    </header>
  );
}
