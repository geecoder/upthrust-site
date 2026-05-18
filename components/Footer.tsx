import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--paper-line)',
      background: 'var(--paper-soft)',
      paddingTop: 80,
      paddingBottom: 40,
      marginTop: 80,
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
          marginBottom: 64,
        }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M4 22 L14 6 L24 22 M9 18 L19 18" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="square"/>
              </svg>
              <span style={{
                fontFamily: 'Fraunces, serif',
                fontSize: '1.375rem',
                fontWeight: 500,
                letterSpacing: '-0.02em',
              }}>Upthrust</span>
            </div>
            <p className="text-soft" style={{ maxWidth: 360, fontSize: '0.9375rem', lineHeight: 1.5 }}>
              A career capability platform for ambitious professionals in Product Management, Business Analysis, and Product Design. Built for global product careers.
            </p>
            <p className="eyebrow" style={{ marginTop: 24 }}>Lagos · London · Toronto · Sydney</p>
          </div>

          <div>
            <h4 className="eyebrow" style={{ marginBottom: 16 }}>Program</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li><Link href="/accelerator" style={{ fontSize: '0.9375rem' }}>The Accelerator</Link></li>
              <li><Link href="/pathway-product-management" style={{ fontSize: '0.9375rem' }}>Product Management</Link></li>
              <li><Link href="/pathway-business-analysis" style={{ fontSize: '0.9375rem' }}>Business Analysis</Link></li>
              <li><Link href="/assessment" style={{ fontSize: '0.9375rem' }}>Career Assessment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow" style={{ marginBottom: 16 }}>Company</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li><Link href="/about" style={{ fontSize: '0.9375rem' }}>About</Link></li>
              <li><Link href="/faq" style={{ fontSize: '0.9375rem' }}>FAQ</Link></li>
              <li><Link href="/consultation" style={{ fontSize: '0.9375rem' }}>Book a Consultation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow" style={{ marginBottom: 16 }}>Connect</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li><a href="mailto:hello@upthrust.io" style={{ fontSize: '0.9375rem' }}>hello@upthrust.io</a></li>
              <li><a href="https://linkedin.com/company/upthrust" target="_blank" rel="noopener" style={{ fontSize: '0.9375rem' }}>LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--paper-line)',
          paddingTop: 32,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: '0.8125rem',
          color: 'var(--ink-muted)',
        }}>
          <span>© {new Date().getFullYear()} Upthrust. All rights reserved.</span>
          <span>Upthrust does not guarantee employment. We help you build capability, evidence, and readiness.</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
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
