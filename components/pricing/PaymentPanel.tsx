import Link from 'next/link';

export interface PaymentPanelProps {
  dueToday: string; // pre-formatted via formatPrice()
  planLabel: string; // e.g. "Full payment" / "Two instalments" / region + processor note
  credentialLine: string; // e.g. "Ends with a verified Capability Passport"
  ctaHref: string;
  ctaLabel: string;
}

// The ink "due today" panel — shared by pathway (3-card) and intensive
// (2-card) pricing sections.
export function PaymentPanel({ dueToday, planLabel, credentialLine, ctaHref, ctaLabel }: PaymentPanelProps) {
  return (
    <div style={{ background: 'var(--ink-800)', color: 'var(--bone)', padding: '24px 22px', borderRadius: 'var(--radius-1)', marginTop: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 13, color: 'var(--ink-200)' }}>Due today</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{dueToday}</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--ink-300)', marginTop: 6 }}>{planLabel}</div>
      <div style={{ fontSize: 12, color: 'var(--seal-300)', marginTop: 14 }}>{credentialLine}</div>
      <Link href={ctaHref} className="btn" style={{ background: 'var(--seal-500)', color: 'var(--bone)', width: '100%', justifyContent: 'center', marginTop: 18 }}>
        {ctaLabel}
      </Link>
    </div>
  );
}
