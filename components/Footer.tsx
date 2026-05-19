'use client';

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      background: 'var(--ink)',
      color: 'var(--paper)',
      paddingTop: 'clamp(64px, 8vw, 100px)',
      paddingBottom: 40,
    }}>
      <div className="container">

        {/* Top — CTA strip */}
        <div style={{
          paddingBottom: 64,
          borderBottom: '1px solid rgba(250,247,241,0.12)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 32,
        }}>
          <div>
            <p style={{
              fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--amber-soft)', marginBottom: 16,
            }}>
              Cohort 1 · Open Now
            </p>
            <h2 style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400, letterSpacing: '-0.025em',
              lineHeight: 1.05, color: 'var(--paper)',
              maxWidth: 600,
            }}>
              Start building evidence of what<br/>
              <span style={{ fontStyle: 'italic', color: 'var(--amber-soft)' }}>
                you can actually do.
              </span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <Link href="/assessment" className="btn btn-amber btn-arrow" style={{ fontSize: '0.9375rem' }}>
              Take the Career Assessment
            </Link>
            <Link href="/consultation" style={{
              fontSize: '0.875rem', color: 'rgba(250,247,241,0.65)',
              borderBottom: '1px solid rgba(250,247,241,0.3)', paddingBottom: 1,
              textDecoration: 'none',
            }}>
              Or book a consultation →
            </Link>
          </div>
        </div>

        {/* Middle — links */}
        <div style={{
          paddingTop: 56,
          paddingBottom: 56,
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
          borderBottom: '1px solid rgba(250,247,241,0.12)',
        }} className="footer-grid">

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <path d="M4 22 L14 6 L24 22 M9 18 L19 18"
                  stroke="var(--paper)" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter"/>
              </svg>
              <span style={{
                fontFamily: 'Fraunces, serif', fontSize: '1.3125rem',
                fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--paper)',
              }}>Upthrust</span>
            </div>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'rgba(250,247,241,0.65)', maxWidth: 320 }}>
              A career capability platform for ambitious professionals in Product Management and Business Analysis. Built for global product careers.
            </p>
            <div style={{
              marginTop: 24,
              display: 'flex', gap: 8, flexWrap: 'wrap',
            }}>
              {['Lagos', 'London', 'Toronto', 'Sydney'].map((city) => (
                <span key={city} style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.6875rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  border: '1px solid rgba(250,247,241,0.2)',
                  color: 'rgba(250,247,241,0.5)',
                }}>
                  {city}
                </span>
              ))}
            </div>
            <p style={{
              marginTop: 20,
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.6875rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'rgba(250,247,241,0.35)',
            }}>
              Est. 2019 · 1,000+ Professionals Trained
            </p>
          </div>

          {/* Program */}
          <div>
            <h4 style={{
              fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(250,247,241,0.45)', marginBottom: 20,
            }}>
              Program
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', margin: 0, padding: 0 }}>
              {[
                { href: '/accelerator', label: 'The Accelerator' },
                { href: '/pathway-product-management', label: 'Product Management' },
                { href: '/pathway-business-analysis', label: 'Business Analysis' },
                { href: '/assessment', label: 'Career Assessment' },
                { href: '/accelerator#faq', label: 'How It Works' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{
                    fontSize: '0.9375rem', color: 'rgba(250,247,241,0.75)',
                    textDecoration: 'none', transition: 'color 150ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--paper)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,241,0.75)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(250,247,241,0.45)', marginBottom: 20,
            }}>
              Company
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', margin: 0, padding: 0 }}>
              {[
                { href: '/about', label: 'About Upthrust' },
                { href: '/faq', label: 'FAQ' },
                { href: '/consultation', label: 'Consultation' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{
                    fontSize: '0.9375rem', color: 'rgba(250,247,241,0.75)',
                    textDecoration: 'none', transition: 'color 150ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--paper)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,241,0.75)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{
              fontFamily: 'Manrope, sans-serif', fontSize: '0.6875rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(250,247,241,0.45)', marginBottom: 20,
            }}>
              Connect
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', margin: 0, padding: 0 }}>
              <li>
                <a href="mailto:info@upthrustdigital.com" style={{
                  fontSize: '0.9375rem', color: 'rgba(250,247,241,0.75)',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  info@upthrustdigital.com
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/upthrust" target="_blank" rel="noopener noreferrer" style={{
                  fontSize: '0.9375rem', color: 'rgba(250,247,241,0.75)',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>

            {/* Heritage badge */}
            <div style={{
              marginTop: 32,
              padding: '16px',
              border: '1px solid rgba(250,247,241,0.1)',
              background: 'rgba(250,247,241,0.04)',
            }}>
              <p style={{
                fontFamily: 'Fraunces, serif', fontStyle: 'italic',
                fontSize: '0.9375rem', lineHeight: 1.5,
                color: 'rgba(250,247,241,0.6)',
              }}>
                "Build evidence of capability. Not another certificate."
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: 28,
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center',
          gap: 12,
          fontSize: '0.8125rem',
          color: 'rgba(250,247,241,0.35)',
        }}>
          <span>© {year} Upthrust Digital Ltd. All rights reserved.</span>
          <span style={{ textAlign: 'right' }}>
            Upthrust does not guarantee employment. We build capability, evidence, and readiness.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          footer .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          footer .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
