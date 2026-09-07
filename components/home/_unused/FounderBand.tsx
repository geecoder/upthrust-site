import Link from 'next/link';
import Image from 'next/image';

// Unwired from the home page during the prototype ground-truth reconciliation
// pass — the prototype's home route doesn't include this section (the
// founder's bio lives in full on /about instead). Kept here, compiled but
// unused, in case it's wanted elsewhere later.
export function FounderBand() {
  return (
    <section style={{ borderBottom: '1px solid var(--border-soft)', background: 'var(--paper)' }}>
      <div className="container stack-mobile" style={{ padding: '96px 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 340px) minmax(0, 1fr)', gap: 64, alignItems: 'start' }}>
        <div>
          <div style={{ position: 'relative', width: '100%', maxWidth: 340, aspectRatio: '340/420', border: '1px solid var(--border-soft)' }}>
            <Image src="/images/founder-genesis.jpg" alt="Genesis Nneji Enwenyeokwu, founder of Upthrust" fill sizes="340px" style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)', marginTop: 10 }}>GENESIS NNEJI ENWENYEOKWU · LAGOS / LONDON</div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>Who is behind Upthrust</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.1, margin: '18px 0 0' }}>
            Built by someone who has done the work. Every layer of it.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '24px 0 0' }}>
            {['CBAP CERTIFIED', 'MBA · UEL', 'PRODUCT LEAD', 'IIBA NIGERIA', '10+ YEARS'].map((chip) => (
              <span key={chip} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', border: '1px solid var(--border-strong)', padding: '5px 9px', borderRadius: 'var(--radius-1)' }}>{chip}</span>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.45, fontStyle: 'italic', margin: '28px 0 0', paddingLeft: 20, borderLeft: '2px solid var(--seal-500)' }}>
            &ldquo;Too many talented people were collecting certificates but still struggling to demonstrate real capability. Upthrust is my answer to that problem.&rdquo;
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, background: 'var(--border-soft)', border: '1px solid var(--border-soft)', margin: '32px 0 0' }}>
            {[
              ['Product Management', 'Strategy · Discovery · Delivery · Growth'],
              ['Business Analysis', 'Requirements · Process · UAT · Strategy'],
              ['Fintech', 'Payments · Wallets · Lending · Wealth · Compliance'],
              ['Transformation', 'Digital · Process · Capability'],
            ].map(([label, val]) => (
              <div key={label} style={{ background: 'var(--paper)', padding: '20px 22px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>{label}</div>
                <div style={{ fontSize: 14, color: 'var(--fg-2)', marginTop: 6 }}>{val}</div>
              </div>
            ))}
          </div>
          <Link href="/about" style={{ display: 'inline-block', fontSize: 15, fontWeight: 500, paddingTop: 24, color: 'var(--seal-600)' }}>
            <span style={{ borderBottom: '1px solid var(--seal-300)' }}>Full story and background →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
