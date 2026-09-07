import Link from 'next/link';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed';

// Unwired from the home page during the prototype ground-truth reconciliation
// pass — the prototype's home route doesn't include this section. Kept here,
// compiled but unused, in case it's wanted elsewhere later (same pattern as
// the unused pathway hero diagrams).
export function LiveSessionBand() {
  return (
    <section style={{ background: 'var(--ink-800)', color: 'var(--bone)' }}>
      <div className="stack-mobile" style={{ maxWidth: 1440, margin: '0 auto', padding: '72px 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 48, alignItems: 'stretch' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--seal-300)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--seal-500)' }} />LIVE LAB · WEEK 06
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.018em', marginBottom: 14, color: 'var(--bone)' }}>Requirements walkthrough, in the room</div>
          <YouTubeEmbed videoId="DAFOJhGO6Ig" title="Requirements walkthrough, in the room — Upthrust live session" />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-400)', marginTop: 10 }}>COHORT 01 · SESSION RECORDING</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid rgba(244,239,230,.14)', paddingLeft: 40 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--seal-300)' }}>WHO IS IN THE ROOM</div>
          {[
            { name: 'Chioma Okorie', role: 'Business Analyst · Halifax' },
            { name: 'Ayodele Yeye', role: 'Senior BA · Government of Nova Scotia' },
            { name: 'Uyoyou Taiye-Ayo', role: 'Senior BA · RBC Investor & Treasury' },
          ].map((p) => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 0', borderBottom: '1px solid rgba(244,239,230,.14)' }}>
              <ImagePlaceholder label="" style={{ width: 52, height: 64, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--bone)' }}>{p.name}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-300)' }}>{p.role}</div>
              </div>
            </div>
          ))}
          <Link href="/about" style={{ alignSelf: 'start', marginTop: 22, fontSize: 14, fontWeight: 500, color: 'var(--seal-300)' }}>
            <span style={{ borderBottom: '1px solid rgba(222,139,106,.5)' }}>Meet the facilitator →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
