import Link from 'next/link';

export default function NotFound() {
  return (
    <section style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 'clamp(60px, 8vw, 100px)',
      paddingBottom: 'clamp(60px, 8vw, 100px)',
    }}>
      <div className="container-narrow">
        <p className="eyebrow">404 · Not Found</p>
        <h1 className="display-l text-balance" style={{ marginTop: 20 }}>
          That page does not exist.<br />
          <span style={{ color: 'var(--amber-deep)', fontStyle: 'italic' }}>The capability still does.</span>
        </h1>
        <p className="lede" style={{ marginTop: 24 }}>
          You may have hit a broken link, an old URL, or something we have not built yet. Here is what does exist.
        </p>
        <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          <Link href="/" className="btn btn-primary btn-arrow">Back to the homepage</Link>
          <Link href="/assessment" className="btn btn-secondary">Take the Career Assessment</Link>
        </div>
      </div>
    </section>
  );
}
