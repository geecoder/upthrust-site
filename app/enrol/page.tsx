'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PATHWAY_LIST, COHORT, formatDate, formatPassportId, type PathwaySlug } from '@/lib/cohort-config';
import { getPricing, formatPrice, currencyFor, type Region } from '@/lib/config';
import { useRegion } from '@/lib/useRegion';

type Stage = 'configure' | 'payment' | 'confirmation';
type Tier = 'standard' | 'premium';
type Plan = 'full' | 'installment';

const REGION_OPTIONS: { id: Region; label: string; processor: string }[] = [
  { id: 'NG', label: 'Nigeria & Africa', processor: 'Paystack' },
  { id: 'GB', label: 'United Kingdom', processor: 'Stripe' },
  { id: 'CA', label: 'Canada', processor: 'Stripe' },
  { id: 'US', label: 'United States', processor: 'Stripe' },
  { id: 'OTHER', label: 'Rest of world', processor: 'Stripe' },
];

function amountDue(pathway: PathwaySlug, region: Region, tier: Tier, plan: Plan): number {
  const p = getPricing(pathway, region);
  if (plan === 'full') return tier === 'standard' ? p.standard : p.premium;
  return tier === 'standard' ? p.standardInstallment2 : p.premiumInstallment2;
}

function EnrolPageInner() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get('pathway') as PathwaySlug | null;
  const preselectedTier = searchParams.get('tier') as Tier | null;

  const [stage, setStage] = useState<Stage>('configure');
  const [pathwaySlug, setPathwaySlug] = useState<PathwaySlug>(
    preselected && PATHWAY_LIST.some((p) => p.slug === preselected) ? preselected : 'product-management',
  );
  const [tier, setTier] = useState<Tier>(preselectedTier === 'premium' ? 'premium' : 'standard');
  const [plan, setPlan] = useState<Plan>('full');
  const [region, setRegion] = useRegion('OTHER');
  const [lead, setLead] = useState({ name: '', email: '' });

  const [confirmed, setConfirmed] = useState<{ seat: number; ref: string; passportId: string } | null>(null);

  const pathway = PATHWAY_LIST.find((p) => p.slug === pathwaySlug)!;
  const regionInfo = REGION_OPTIONS.find((r) => r.id === region)!;
  const price = getPricing(pathwaySlug, region);
  const due = amountDue(pathwaySlug, region, tier, plan);

  const total = tier === 'standard' ? price.standard : price.premium;

  function handleConfirmPayment() {
    const seat = COHORT.seatsMax - COHORT.seatsRemaining + 1 + Math.floor(Math.random() * COHORT.seatsRemaining);
    const ref = `ENR-C${pathway.cohort}${pathway.trackCode}-${Math.floor(100000 + Math.random() * 900000)}`;
    const passportId = formatPassportId(pathwaySlug, seat);
    setConfirmed({ seat, ref, passportId });
    setStage('confirmation');
  }

  const canPay = lead.name.trim().length > 0 && /\S+@\S+\.\S+/.test(lead.email);

  return (
    <>
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(56px, 8vw, 90px) 0 clamp(40px, 5vw, 60px)' }}>
        <div className="container-narrow">
          <p className="eyebrow" style={{ marginBottom: 16 }}>Enrolment</p>
          <h1 className="display-l text-balance" style={{ color: 'var(--paper)' }}>
            {stage === 'configure' && 'Configure your seat.'}
            {stage === 'payment' && 'Confirm and pay.'}
            {stage === 'confirmation' && 'You’re in.'}
          </h1>
        </div>
      </section>

      {stage === 'configure' && (
        <section style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className="container enrol-config-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: 48 }}>
            <div>
              {/* Pathway */}
              <p className="eyebrow" style={{ marginBottom: 16 }}>1. Pathway</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 40 }}>
                {PATHWAY_LIST.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => setPathwaySlug(p.slug)}
                    style={{
                      textAlign: 'left', padding: '18px 20px',
                      border: `1.5px solid ${pathwaySlug === p.slug ? 'var(--ink)' : 'var(--paper-line)'}`,
                      background: pathwaySlug === p.slug ? 'var(--ink)' : 'var(--white)',
                      color: pathwaySlug === p.slug ? 'var(--paper)' : 'var(--ink)',
                      borderRadius: 'var(--radius-1)', cursor: 'pointer', transition: 'all 150ms',
                    }}
                  >
                    <p style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: 4 }}>{p.label}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.06em', opacity: 0.7 }}>{p.status}</p>
                  </button>
                ))}
              </div>

              {/* Tier */}
              <p className="eyebrow" style={{ marginBottom: 16 }}>2. Tier</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 40 }}>
                {(['standard', 'premium'] as Tier[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTier(t)}
                    style={{
                      textAlign: 'left', padding: '18px 20px',
                      border: `1.5px solid ${tier === t ? 'var(--ink)' : 'var(--paper-line)'}`,
                      background: tier === t ? 'var(--paper-soft)' : 'var(--white)',
                      borderRadius: 'var(--radius-1)', cursor: 'pointer', transition: 'all 150ms',
                    }}
                  >
                    <p style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: 4, textTransform: 'capitalize' }}>{t}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>
                      {t === 'standard'
                        ? 'Full live program, templates, weekly feedback, community.'
                        : 'Everything in Standard, plus 1:1 portfolio review, mock interview, and Capability Passport eligibility.'}
                    </p>
                  </button>
                ))}
              </div>

              {/* Plan */}
              <p className="eyebrow" style={{ marginBottom: 16 }}>3. Payment plan</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 40 }}>
                {(['full', 'installment'] as Plan[]).map((pl) => (
                  <button
                    key={pl}
                    onClick={() => setPlan(pl)}
                    style={{
                      textAlign: 'left', padding: '18px 20px',
                      border: `1.5px solid ${plan === pl ? 'var(--ink)' : 'var(--paper-line)'}`,
                      background: plan === pl ? 'var(--paper-soft)' : 'var(--white)',
                      borderRadius: 'var(--radius-1)', cursor: 'pointer', transition: 'all 150ms',
                    }}
                  >
                    <p style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{pl === 'full' ? 'Pay in full' : 'Two instalments'}</p>
                  </button>
                ))}
              </div>

              {/* Region */}
              <p className="eyebrow" style={{ marginBottom: 16 }}>4. Region</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                {REGION_OPTIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRegion(r.id)}
                    style={{
                      textAlign: 'left', padding: '14px 16px',
                      border: `1.5px solid ${region === r.id ? 'var(--ink)' : 'var(--paper-line)'}`,
                      background: region === r.id ? 'var(--paper-soft)' : 'var(--white)',
                      borderRadius: 'var(--radius-1)', cursor: 'pointer', transition: 'all 150ms',
                    }}
                  >
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{r.label}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--ink-muted)', marginTop: 2 }}>via {r.processor}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Sticky summary */}
            <div style={{ alignSelf: 'start', position: 'sticky', top: 24 }}>
              <div className="card">
                <p className="eyebrow" style={{ marginBottom: 20 }}>Summary</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>Pathway</span>
                    <span style={{ fontWeight: 600 }}>{pathway.label}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>Cohort</span>
                    <span style={{ fontWeight: 600 }}>{pathway.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>Starts</span>
                    <span style={{ fontWeight: 600 }}>{formatDate(pathway.start)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>Tier</span>
                    <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{tier}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>Plan</span>
                    <span style={{ fontWeight: 600 }}>{plan === 'full' ? 'Full payment' : 'Two instalments'}</span>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--paper-line)', paddingTop: 16, marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--ink-muted)' }}>{plan === 'full' ? 'Due now' : 'Due today (1 of 2)'}</span>
                    <span className="display-s" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatPrice(due, region)}</span>
                  </div>
                  {plan === 'full' && tier === 'premium' && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: 4 }}>Total programme value: {formatPrice(total, region)}</p>
                  )}
                </div>
                <button onClick={() => setStage('payment')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Continue to payment
                </button>
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 900px) { .enrol-config-grid { grid-template-columns: minmax(0,1fr) !important; } }`}</style>
        </section>
      )}

      {stage === 'payment' && (
        <section style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className="container-narrow">
            <button onClick={() => setStage('configure')} style={{ color: 'var(--ink-muted)', fontSize: '0.875rem', textDecoration: 'underline', marginBottom: 24 }}>
              ← Back to configuration
            </button>

            <div className="card" style={{ marginBottom: 32 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>Order summary</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', marginBottom: 8 }}>
                <span>{pathway.label} · {tier} · {plan === 'full' ? 'full payment' : 'instalment 1 of 2'}</span>
                <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatPrice(due, region)}</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>
                Charged via {regionInfo.processor} in {currencyFor(region)}. {plan === 'installment' && 'A second, equal instalment is billed automatically before Week 6.'}
              </p>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); if (canPay) handleConfirmPayment(); }}
              className="card"
            >
              <p className="eyebrow" style={{ marginBottom: 20 }}>Your details</p>
              <div className="stack-mobile-sm" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16, marginBottom: 24 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)' }}>Full name</span>
                  <input required value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    style={{ padding: '12px 14px', border: '1.5px solid var(--paper-line)', borderRadius: 'var(--radius-1)', fontSize: '0.9375rem' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)' }}>Email</span>
                  <input required type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })}
                    style={{ padding: '12px 14px', border: '1.5px solid var(--paper-line)', borderRadius: 'var(--radius-1)', fontSize: '0.9375rem' }} />
                </label>
              </div>
              <button type="submit" disabled={!canPay} className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', opacity: canPay ? 1 : 0.5, cursor: canPay ? 'pointer' : 'not-allowed' }}>
                Pay {formatPrice(due, region)} via {regionInfo.processor}
              </button>
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: 14, textAlign: 'center' }}>
                You will be redirected to {regionInfo.processor} to complete payment securely.
              </p>
            </form>
          </div>
        </section>
      )}

      {stage === 'confirmation' && confirmed && (
        <section style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
          <div className="container-narrow">
            <div style={{ border: '1px solid var(--verdict-allow-bd)', background: 'var(--verdict-allow-bg)', padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32, borderRadius: 'var(--radius-1)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--verdict-allow-bd)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--verdict-allow-fg)' }}>
                Enrolment confirmed
              </span>
            </div>

            <h2 className="display-m" style={{ marginBottom: 12 }}>Welcome to {pathway.label}, {lead.name.split(' ')[0] || 'there'}.</h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--ink-soft)', marginBottom: 32 }}>
              You are seat {confirmed.seat} of {COHORT.seatsMax} in {pathway.status.toLowerCase()}. A confirmation and onboarding pack is on its way to {lead.email}.
            </p>

            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--paper-line)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--ink-muted)' }}>Enrolment reference</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{confirmed.ref}</span>
              </div>
              <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--paper-line)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--ink-muted)' }}>Amount paid today</span>
                <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatPrice(due, region)}</span>
              </div>
              <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--paper-line)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--ink-muted)' }}>Plan</span>
                <span style={{ fontWeight: 600 }}>{tier} · {plan === 'full' ? 'paid in full' : '2 instalments'}</span>
              </div>
              <div style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--ink-muted)' }}>Passport ID (issued on graduation)</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{confirmed.passportId}</span>
              </div>
            </div>

            <p className="eyebrow" style={{ marginBottom: 20 }}>What happens next</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 40 }}>
              {[
                { n: '01', title: 'Confirmation & onboarding pack', body: `Sent to ${lead.email || 'your inbox'} within the hour, with tool setup and community access.` },
                { n: '02', title: 'Live orientation', body: 'A short live session in the week before start, to confirm pathway fit and answer questions.' },
                { n: '03', title: `Week 1 begins ${formatDate(pathway.start)}`, body: `Live sessions run ${COHORT.liveSessionDays.join(' and ')}, ${COHORT.hoursPerWeek} hours a week.` },
              ].map((s) => (
                <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '48px minmax(0,1fr)', gap: 16, padding: '18px 0', borderTop: '1px solid var(--paper-line)' }}>
                  <span className="display-s" style={{ color: 'var(--ink-muted)', fontSize: '1.5rem' }}>{s.n}</span>
                  <div>
                    <p style={{ fontWeight: 700, marginBottom: 4 }}>{s.title}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ink-soft)' }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/" className="btn btn-secondary">Back to home</Link>
          </div>
        </section>
      )}
    </>
  );
}

export default function EnrolPage() {
  return (
    <Suspense fallback={null}>
      <EnrolPageInner />
    </Suspense>
  );
}
