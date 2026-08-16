// The prototype itself uses drop-in placeholder slots rather than stock photography
// (see build brief §9 — real photography is still needed). This mirrors that pattern
// instead of substituting stock images, which the brief explicitly rules out.
export function ImagePlaceholder({
  label,
  aspectRatio,
  shape = 'rect',
  style,
}: {
  label: string;
  aspectRatio?: string;
  shape?: 'rect' | 'circle';
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: 'var(--bone-dim)',
        border: '1px dashed var(--border-strong)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 12,
        aspectRatio,
        borderRadius: shape === 'circle' ? '50%' : 0,
        ...style,
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', color: 'var(--fg-3)', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  );
}
