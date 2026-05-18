'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(250, 247, 241, 0.92)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--paper-line)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 22 L14 6 L24 22 M9 18 L19 18" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter"/>
          </svg>
          <span style={{
            fontFamily: 'Fraunces, serif',
            fontSize: '1.375rem',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
          }}>Upthrust</span>
        </Link>

        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <Link href="/accelerator" style={{ fontSize: '0.9375rem', color: 'var(--ink-soft)' }}>The Accelerator</Link>
          <Link href="/pathway-product-management" style={{ fontSize: '0.9375rem', color: 'var(--ink-soft)' }}>Product Management</Link>
          <Link href="/pathway-business-analysis" style={{ fontSize: '0.9375rem', color: 'var(--ink-soft)' }}>Business Analysis</Link>
          <Link href="/about" style={{ fontSize: '0.9375rem', color: 'var(--ink-soft)' }}>About</Link>
          <Link href="/assessment" className="btn btn-primary" style={{ padding: '10px 18px' }}>
            Take the Assessment
          </Link>
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{
            display: 'none',
            width: 40, height: 40,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d={open ? 'M5 5L17 17M17 5L5 17' : 'M3 6h16M3 11h16M3 16h16'} stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {open && (
        <div className="mobile-menu" style={{
          borderTop: '1px solid var(--paper-line)',
          background: 'var(--paper)',
          padding: '20px 24px',
          display: 'flex', flexDirection: 'column', gap: 18,
        }}>
          <Link href="/accelerator" onClick={() => setOpen(false)}>The Accelerator</Link>
          <Link href="/pathway-product-management" onClick={() => setOpen(false)}>Product Management Pathway</Link>
          <Link href="/pathway-business-analysis" onClick={() => setOpen(false)}>Business Analysis Pathway</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link>
          <Link href="/assessment" onClick={() => setOpen(false)} className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
            Take the Assessment
          </Link>
        </div>
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
