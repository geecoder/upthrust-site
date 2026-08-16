'use client';

import { useState } from 'react';
import Link from 'next/link';
import { lookupPassport, type PassportRecord } from '@/lib/verify-registry';
import { PASSPORT_ID_PATTERN } from '@/lib/cohort-config';

type State = 'idle' | 'checking' | 'found' | 'not-found';

function formatTimestamp(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Lagos' });
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()} · ${time} WAT`;
}

export default function VerifyPage() {
  const [input, setInput] = useState('');
  const [state, setState] = useState<State>('idle');
  const [record, setRecord] = useState<PassportRecord | null>(null);
  const [queriedAt, setQueriedAt] = useState<Date | null>(null);

  function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || state === 'checking') return;
    setState('checking');
    setTimeout(() => {
      const found = lookupPassport(input);
      setRecord(found);
      setQueriedAt(new Date());
      setState(found ? 'found' : 'not-found');
    }, 1100);
  }

  function reset() {
    setState('idle');
    setRecord(null);
    setInput('');
  }

  return (
    <>
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(64px, 10vw, 110px) 0 clamp(48px, 6vw, 80px)' }}>
        <div className="container-narrow">
          <p className="eyebrow" style={{ marginBottom: 16 }}>Capability Passport Registry</p>
          <h1 className="display-l text-balance" style={{ color: 'var(--paper)', marginBottom: 20 }}>
            Verify a Capability Passport.
          </h1>
          <p className="lede" style={{ color: 'rgba(250,247,241,0.75)', maxWidth: 620, marginBottom: 40 }}>
            Every Upthrust graduate on the Premium tier is issued a Passport ID once their capstone is scored and signed
            off. Records are immutable once issued — enter an ID below to check it against the registry.
          </p>

          <form onSubmit={handleVerify} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', maxWidth: 560 }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. UP-C2-0047-BA"
              aria-label="Passport ID"
              style={{
                flex: '1 1 260px',
                minWidth: 0,
                padding: '14px 16px',
                border: '1.5px solid var(--border-on-ink)',
                background: 'rgba(250,247,241,0.06)',
                color: 'var(--paper)',
                borderRadius: 'var(--radius-1)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9375rem',
                letterSpacing: '0.02em',
              }}
            />
            <button type="submit" className="btn btn-amber" disabled={state === 'checking'} style={{ fontSize: '1rem', padding: '14px 26px' }}>
              {state === 'checking' ? 'Checking…' : 'Verify'}
            </button>
          </form>
          <p style={{ marginTop: 14, fontSize: '0.8125rem', color: 'rgba(250,247,241,0.45)', fontFamily: 'var(--font-mono)' }}>
            Format: UP-C{'{cohort}'}-{'{4-digit sequence}'}-{'{PM|BA|PD|PO}'}
          </p>
        </div>
      </section>

      {state === 'checking' && (
        <section style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <p className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>Querying the registry…</p>
          </div>
        </section>
      )}

      {state === 'found' && record && queriedAt && (
        <section style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className="container-narrow">
            <div style={{ border: '1px solid var(--verdict-allow-bd)', background: 'var(--verdict-allow-bg)', padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32, borderRadius: 'var(--radius-1)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--verdict-allow-bd)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--verdict-allow-fg)' }}>
                Verified record
              </span>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--paper-line)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)', letterSpacing: '0.08em', marginBottom: 8 }}>
                  ID: {record.id}
                </p>
                <p className="display-s" style={{ marginBottom: 4 }}>{record.name}</p>
                <p style={{ fontSize: '0.9375rem', color: 'var(--ink-soft)' }}>{record.cohortLine}</p>
              </div>

              <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--paper-line)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>Defence score</p>
                  <p className="display-s" style={{ fontVariantNumeric: 'tabular-nums' }}>{record.defenceScore}<span style={{ fontSize: '1rem', color: 'var(--ink-muted)' }}> / 100</span></p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>Artefacts on file</p>
                  <p className="display-s" style={{ fontVariantNumeric: 'tabular-nums' }}>{record.artefactsOnFile}<span style={{ fontSize: '1rem', color: 'var(--ink-muted)' }}> / {record.artefactsTotal}</span></p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>Issued</p>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{record.issuedDate}</p>
                </div>
              </div>

              <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--paper-line)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 14 }}>
                  Assessed capability areas
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {record.capabilityLevels.map((c) => (
                    <div key={c.area} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: '1px solid var(--paper-line)', fontSize: '0.9375rem' }}>
                      <span>{c.area}</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.06em',
                          textTransform: 'uppercase', padding: '3px 10px', borderRadius: 'var(--radius-pill)',
                          color: c.level === 'Proficient' ? 'var(--verdict-allow-fg)' : 'var(--verdict-review-fg)',
                          background: c.level === 'Proficient' ? 'var(--verdict-allow-bg)' : 'var(--verdict-review-bg)',
                          border: `1px solid ${c.level === 'Proficient' ? 'var(--verdict-allow-bd)' : 'var(--verdict-review-bd)'}`,
                        }}
                      >
                        {c.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '20px 32px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)' }}>
                  Signed off by <strong>{record.facilitatorSignOff}</strong>
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                  Hash {record.hash}
                </p>
              </div>
            </div>

            <p style={{ marginTop: 20, fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>
              Queried {formatTimestamp(queriedAt)}. This record is immutable — it cannot be edited or revoked once issued,
              only superseded by a later cohort's rubric.
            </p>
            <button onClick={reset} className="btn-ghost" style={{ marginTop: 20 }}>Check another ID</button>
          </div>
        </section>
      )}

      {state === 'not-found' && queriedAt && (
        <section style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className="container-narrow">
            <div style={{ border: '1px solid var(--verdict-block-bd)', background: 'var(--verdict-block-bg)', padding: '28px 32px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--verdict-block-fg)', marginBottom: 12 }}>
                No matching record
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--ink)', marginBottom: 16 }}>
                We couldn&rsquo;t find a Passport with that ID in the registry. Double-check the format below, or the ID
                may belong to a learner who hasn&rsquo;t reached capstone sign-off yet.
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--ink-soft)' }}>
                Expected format: UP-C{'{cohort}'}-{'{4-digit sequence}'}-{'{track}'}, e.g. UP-C2-0047-BA or UP-C1-0012-PD.
                {' '}Your input matched {PASSPORT_ID_PATTERN.test(input.trim().toUpperCase()) ? 'the format' : 'a different format'}.
              </p>
            </div>
            <p style={{ marginTop: 20, fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>Queried {formatTimestamp(queriedAt)}.</p>
            <button onClick={reset} className="btn-ghost" style={{ marginTop: 20 }}>Try another ID</button>
          </div>
        </section>
      )}

      <section style={{ background: 'var(--paper-soft)', borderTop: '1px solid var(--paper-line)', padding: 'clamp(48px, 6vw, 80px) 0' }}>
        <div className="container-narrow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 8 }}>Hiring an Upthrust graduate?</p>
            <p style={{ fontSize: '0.9375rem', color: 'var(--ink-soft)', maxWidth: 480 }}>
              The Passport&rsquo;s value grows as the alumni network grows. Every record here was scored against a published
              rubric and signed off by a facilitator — not self-reported.
            </p>
          </div>
          <Link href="/" className="btn btn-secondary">Learn how the Passport works</Link>
        </div>
      </section>
    </>
  );
}
