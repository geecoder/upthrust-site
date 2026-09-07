export interface ComparisonRow {
  label: string;
  standard: boolean | string;
  premium: boolean | string;
}

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value
      ? <span style={{ color: 'var(--moss-700)', fontWeight: 700 }}>✓</span>
      : <span style={{ color: 'var(--fg-4)' }}>—</span>;
  }
  return <span style={{ fontSize: 13, color: 'var(--fg-1)' }}>{value}</span>;
}

// Standard/Premium tier comparison table — pathway pages only (intensives
// have no tiers to compare, so this component has no intensive variant).
export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div style={{ border: '1px solid var(--border-soft)', marginTop: 32 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 120px 120px', background: 'var(--paper-dim)', borderBottom: '1px solid var(--border-soft)' }}>
        <div style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)' }}>WHAT&rsquo;S INCLUDED</div>
        <div style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)', textAlign: 'center' }}>STANDARD</div>
        <div style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--seal-600)', textAlign: 'center' }}>PREMIUM</div>
      </div>
      {rows.map((row) => (
        <div key={row.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 120px 120px', borderBottom: '1px solid var(--border-hair)' }}>
          <div style={{ padding: '12px 16px', fontSize: 14, color: 'var(--fg-1)' }}>{row.label}</div>
          <div style={{ padding: '12px 16px', textAlign: 'center' }}><Cell value={row.standard} /></div>
          <div style={{ padding: '12px 16px', textAlign: 'center' }}><Cell value={row.premium} /></div>
        </div>
      ))}
    </div>
  );
}
