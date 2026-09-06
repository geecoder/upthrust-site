'use client';

import { useState, useEffect, useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  PATHWAY_LIST, INTENSIVE_LIST, COHORT, formatDate,
  getPathway, getIntensive, isIntensiveSlug, type ProgrammeSlug,
} from '@/lib/cohort-config';
import { getPricing, getIntensivePricing, formatPrice, currencyFor, railFor, type Region } from '@/lib/config';
import { amountDue, type Tier, type Plan } from '@/lib/pricing';
import { useRegion } from '@/lib/useRegion';
import type { BankDetailRow } from '@/lib/payments/types';
import { validateLeadEmail, validateLeadName } from '@/lib/validation/lead';
import { analytics, cohortFor, getDistinctId, normalisePlan, normaliseTier, programContextForSlug } from '@/lib/analytics';

type Stage = 'configure' | 'payment' | 'confirmation';

type PaymentOutcome =
  | { kind: 'paystack_verified'; reference: string; passportId: string | null }
  | { kind: 'paystack_pending'; reference: string }
  | { kind: 'transfer_pending'; reference: string };

const LABEL: CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.6875rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--ink-muted)',
};

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable — the value is still visible/selectable as plain text.
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--paper-line)' }}>
      <span style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600 }}>{value || '—'}</span>
        {value && (
          <button type="button" onClick={copy}
            style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--seal-600)', border: '1px solid var(--paper-line)', padding: '4px 8px', borderRadius: 'var(--radius-1)' }}>
            <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        )}
      </span>
    </div>
  );
}

export default function EnrolFlow({ initialRegion }: { initialRegion: Region }) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get('pathway') as ProgrammeSlug | null;
  const preselectedTier = searchParams.get('tier') as Tier | null;

  const knownSlugs = new Set<ProgrammeSlug>([...PATHWAY_LIST.map((p) => p.slug), ...INTENSIVE_LIST.map((i) => i.slug)]);

  const [stage, setStage] = useState<Stage>('configure');
  const [programmeSlug, setProgrammeSlug] = useState<ProgrammeSlug>(
    preselected && knownSlugs.has(preselected) ? preselected : 'product-management',
  );
  const [tier, setTier] = useState<Tier>(preselectedTier === 'premium' ? 'premium' : 'standard');
  const [plan, setPlan] = useState<Plan>('full');
  const [region] = useRegion(initialRegion);
  const [lead, setLead] = useState({ name: '', email: '' });
  const [leadTouched, setLeadTouched] = useState<{ name?: boolean; email?: boolean }>({});
  const enrolmentStartedFor = useRef<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  const [paymentOutcome, setPaymentOutcome] = useState<PaymentOutcome | null>(null);
  const [transferInit, setTransferInit] = useState<{ reference: string; bankDetails: BankDetailRow[] } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [verifyingReturn, setVerifyingReturn] = useState(false);

  // Landed back here after a Paystack checkout redirect — verify in real
  // time against Paystack rather than trusting the query string alone.
  useEffect(() => {
    const reference = searchParams.get('paystack_reference');
    if (!reference) return;
    setVerifyingReturn(true);
    fetch(`/api/enrol/paystack-verify?reference=${encodeURIComponent(reference)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'paystack_verified') {
          // A real Capability Passport ID is only assigned once a seat is
          // formally allocated (a manual/ops step) — never fabricated here.
          setPaymentOutcome({ kind: 'paystack_verified', reference, passportId: null });
        } else {
          setPaymentOutcome({ kind: 'paystack_pending', reference });
        }
        setStage('confirmation');
      })
      .catch(() => setPaymentOutcome({ kind: 'paystack_pending', reference }))
      .finally(() => setVerifyingReturn(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (enrolmentStartedFor.current === programmeSlug) return;
    enrolmentStartedFor.current = programmeSlug;
    const ctx = programContextForSlug(programmeSlug);
    if (!ctx) return;
    analytics.enrolmentStarted({
      ...ctx,
      cohort: cohortFor(programmeSlug).cohort,
      tier: normaliseTier(tier, isIntensiveSlug(programmeSlug)),
      payment_plan: normalisePlan(plan),
      currency: currencyFor(region),
    });
    // Intentionally keyed on the programme alone: changing tier or plan is
    // configuration within one enrolment, not a new enrolment.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programmeSlug]);

  const isIntensive = isIntensiveSlug(programmeSlug);
  const programme = isIntensive ? getIntensive(programmeSlug) : getPathway(programmeSlug);
  const rail = railFor(region);

  const price = !isIntensive ? getPricing(programmeSlug, region) : null;
  const intensivePrice = isIntensive ? getIntensivePricing(programmeSlug, region) : null;
  const due = amountDue(programmeSlug, region, tier, plan);
  const dueFull = price ? (tier === 'standard' ? price.standard : price.premium) : due;
  const dueInstallment = price ? (tier === 'standard' ? price.standardInstallment2 : price.premiumInstallment2) : due;

  // Real Paystack init: creates the enrolment intent server-side, asks
  // Paystack to start a transaction, and redirects the browser to Paystack's
  // hosted checkout. If PAYSTACK_SECRET_KEY isn't configured in this
  // environment, /api/enrol/init returns a clear 503 instead of faking a URL.
  async function handleContinueToPaystack() {
    setApiError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/enrol/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programmeSlug,
          tier: isIntensive ? null : tier,
          plan: isIntensive ? 'full' : plan,
          region,
          leadName: lead.name,
          leadEmail: lead.email,
          analyticsDistinctId: getDistinctId(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      if (data.authorizationUrl) {
      const checkoutProps = {
        program_slug: programmeSlug,
        tier: normaliseTier(tier, isIntensive),
        payment_plan: normalisePlan(plan),
        amount_due_now: due,
        total_amount: isIntensive ? due : dueFull,
        currency: currencyFor(region),
        cohort: cohortFor(programmeSlug).cohort,
      } as const;
        analytics.checkoutStarted({ ...checkoutProps, payment_method: 'paystack', order_id: data.reference });
        window.location.href = data.authorizationUrl;
      } else {
        setApiError('Paystack did not return a checkout link. Please try again.');
      }
    } catch {
      setApiError('Something went wrong. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGetBankDetails() {
    setApiError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/enrol/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programmeSlug,
          tier: isIntensive ? null : tier,
          plan: isIntensive ? 'full' : plan,
          region,
          leadName: lead.name,
          leadEmail: lead.email,
          analyticsDistinctId: getDistinctId(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      const checkoutProps = {
        program_slug: programmeSlug,
        tier: normaliseTier(tier, isIntensive),
        payment_plan: normalisePlan(plan),
        amount_due_now: due,
        total_amount: isIntensive ? due : dueFull,
        currency: currencyFor(region),
        cohort: cohortFor(programmeSlug).cohort,
      } as const;
      analytics.checkoutStarted({ ...checkoutProps, payment_method: 'bank_transfer', order_id: data.reference });
      setTransferInit({ reference: data.reference, bankDetails: data.bankDetails ?? [] });
    } catch {
      setApiError('Something went wrong. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSentTransfer() {
    if (!transferInit) return;
    setSubmitting(true);
    try {
      await fetch('/api/enrol/mark-transfer-sent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: transferInit.reference }),
      });
    } catch {
      // Self-report only, non-fatal — proceed to confirmation regardless.
    } finally {
      setSubmitting(false);
      setPaymentOutcome({ kind: 'transfer_pending', reference: transferInit.reference });
      setStage('confirmation');
    }
  }

  // The same rules /api/enrol/init enforces (lib/payments/schemas.ts). Using a
  // looser check here would let someone submit a disposable address or a
  // two-letter name and only find out from a server rejection.
  const leadNameError = validateLeadName(lead.name);
  const leadEmailError = validateLeadEmail(lead.email);
  const leadOk = !leadNameError && !leadEmailError;

  const canPay = leadOk && agreed;
  const canRequestTransfer = leadOk && agreed && !submitting;
  const hasRealBankDetails = transferInit?.bankDetails.some((r) => r.value.trim().length > 0) ?? false;
  const weeksLabel = isIntensive ? 'Five weeks' : 'Twelve weeks';

  const mailtoHref = transferInit
    ? `mailto:info@upthrustdigital.com?subject=${encodeURIComponent(`Transfer confirmation — ${transferInit.reference}`)}&body=${encodeURIComponent(
        `Name: ${lead.name}\nEmail: ${lead.email}\nProgramme: ${programme.label}\nAmount: ${formatPrice(due, region)}\nReference: ${transferInit.reference}`,
      )}`
    : '#';

  return (
    <>
      {stage === 'configure' && (
        <section style={{ padding: 'clamp(56px, 8vw, 96px) 0 clamp(48px, 6vw, 80px)' }}>
          <div className="container enrol-config-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 340px)', gap: 48 }}>
            <div>
              <p style={LABEL}>Step 1 of 2 · Configure your seat</p>
              <h1 className="display-l text-balance" style={{ margin: '16px 0 0' }}>Enrol in Cohort {programme.cohort}.</h1>
              <p style={{ fontSize: '1.0625rem', color: 'var(--ink-soft)', margin: '14px 0 0', maxWidth: '34em' }}>
                {weeksLabel}, starting {formatDate(programme.start)}. {programme.seatsRemaining} of {programme.seatsMax} seats remain.
              </p>

              {isIntensive ? (
                <>
                  <p style={{ ...LABEL, margin: '44px 0 12px' }}>Programme</p>
                  <div className="card" style={{ padding: '18px 20px' }}>
                    <span className="display-s" style={{ fontSize: '1.25rem' }}>{programme.label}</span>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)', marginTop: 4 }}>5-week specialist intensive · Cohort {programme.cohort}</p>
                  </div>
                  <p style={{ fontSize: '0.8125rem', marginTop: 12 }}>
                    <Link href="/pathways/product-management" style={{ color: 'var(--seal-600)', textDecoration: 'underline' }}>
                      Looking for a 12-week pathway instead? Browse pathways →
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  {/* Pathway */}
                  <p style={{ ...LABEL, margin: '44px 0 12px' }}>Pathway</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                    {PATHWAY_LIST.map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => setProgrammeSlug(p.slug)}
                        style={{
                          textAlign: 'left', padding: '18px 20px',
                          border: `1.5px solid ${programmeSlug === p.slug ? 'var(--ink)' : 'var(--paper-line)'}`,
                          background: programmeSlug === p.slug ? 'var(--ink)' : 'var(--white)',
                          color: programmeSlug === p.slug ? 'var(--paper)' : 'var(--ink)',
                          borderRadius: 'var(--radius-1)', cursor: 'pointer', transition: 'all 150ms',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                          <span className="display-s" style={{ fontSize: '1.25rem' }}>{p.label}</span>
                          <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.1em',
                            padding: '2px 6px', flexShrink: 0,
                            border: `1px solid ${programmeSlug === p.slug ? 'rgba(244,239,230,.3)' : 'var(--paper-line)'}`,
                            opacity: 0.85,
                          }}>
                            {p.status.split('·').pop()!.trim().toUpperCase()}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Tier */}
                  <p style={{ ...LABEL, margin: '36px 0 12px' }}>Tier</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {(['premium', 'standard'] as Tier[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTier(t)}
                        style={{
                          textAlign: 'left', padding: 20,
                          border: `1.5px solid ${tier === t ? 'var(--ink)' : 'var(--paper-line)'}`,
                          background: tier === t ? 'var(--paper-soft)' : 'var(--white)',
                          borderRadius: 'var(--radius-1)', cursor: 'pointer', transition: 'all 150ms',
                          display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'center',
                        }}
                      >
                        <span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span className="display-s" style={{ fontSize: '1.25rem', textTransform: 'capitalize' }}>{t}</span>
                            {t === 'premium' && (
                              <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.1em',
                                background: 'var(--amber)', color: 'var(--paper)', padding: '3px 7px',
                              }}>RECOMMENDED</span>
                            )}
                          </span>
                          <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--ink-soft)', marginTop: 6 }}>
                            {t === 'standard'
                              ? 'The full live program, templates, assignments, group feedback, and completion certificate.'
                              : 'Everything in Standard, plus 1:1 portfolio review, mock interview, and Capability Passport eligibility.'}
                          </span>
                        </span>
                        <span className="display-s" style={{ fontSize: '1.5rem', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                          {formatPrice(t === 'standard' ? price!.standard : price!.premium, region)}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Plan */}
                  <p style={{ ...LABEL, margin: '36px 0 12px' }}>Payment plan</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                    {(['full', 'installment'] as Plan[]).map((pl) => (
                      <button
                        key={pl}
                        onClick={() => setPlan(pl)}
                        style={{
                          textAlign: 'left', padding: '16px 18px',
                          border: `1.5px solid ${plan === pl ? 'var(--ink)' : 'var(--paper-line)'}`,
                          background: plan === pl ? 'var(--paper-soft)' : 'var(--white)',
                          borderRadius: 'var(--radius-1)', cursor: 'pointer', transition: 'all 150ms',
                        }}
                      >
                        <p style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{pl === 'full' ? 'Pay in full' : 'Two instalments'}</p>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)', marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>
                          {pl === 'full' ? `${formatPrice(dueFull, region)} today` : `${formatPrice(dueInstallment, region)} × 2`}
                        </p>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {isIntensive && (
                <>
                  <p style={{ ...LABEL, margin: '36px 0 12px' }}>Price</p>
                  <div className="card" style={{ padding: '16px 18px' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Standalone</p>
                    <p style={{ fontSize: '1.25rem', fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>{formatPrice(intensivePrice!.standalone, region)}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: 8 }}>
                      Already enrolling on a 12-week pathway? Add this intensive for {formatPrice(intensivePrice!.bundled, region)} instead — <Link href="/consultation" style={{ color: 'var(--seal-600)', textDecoration: 'underline' }}>raise it on a consultation call</Link>.
                    </p>
                  </div>
                </>
              )}

              <button onClick={() => setStage('payment')} className="btn btn-primary" style={{ marginTop: 40 }}>
                Continue to payment →
              </button>
            </div>

            {/* Sticky summary */}
            <div style={{ alignSelf: 'start', position: 'sticky', top: 24 }}>
              <div className="card">
                <p style={{ ...LABEL, marginBottom: 20 }}>Your seat</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>Cohort</span>
                    <span style={{ fontWeight: 600 }}>{programme.cohort} · {formatDate(programme.start)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>Programme</span>
                    <span style={{ fontWeight: 600 }}>{programme.label}</span>
                  </div>
                  {!isIntensive && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                        <span style={{ color: 'var(--ink-muted)' }}>Tier</span>
                        <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{tier}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                        <span style={{ color: 'var(--ink-muted)' }}>Plan</span>
                        <span style={{ fontWeight: 600 }}>{plan === 'full' ? 'Full payment' : 'Two instalments'}</span>
                      </div>
                    </>
                  )}
                </div>
                <div style={{ borderTop: '1px solid var(--paper-line)', paddingTop: 16, marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--ink-muted)' }}>{!isIntensive && plan === 'installment' ? 'Due today (1 of 2)' : 'Due today'}</span>
                    <span className="display-s" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatPrice(due, region)}</span>
                  </div>
                </div>
                <button onClick={() => setStage('payment')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 16 }}>
                  Continue to payment
                </button>
                <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>
                  Includes all templates, live sessions, and structured feedback. No hidden fees.
                </p>
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 900px) { .enrol-config-grid { grid-template-columns: minmax(0,1fr) !important; } }`}</style>
        </section>
      )}

      {stage === 'payment' && rail === 'paystack' && (
        <section style={{ padding: 'clamp(56px, 8vw, 96px) 0 clamp(48px, 6vw, 80px)' }}>
          <div className="container enrol-config-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 340px)', gap: 48 }}>
            <div>
              <button onClick={() => setStage('configure')} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
                ← BACK TO YOUR SEAT
              </button>
              <p style={{ ...LABEL, marginTop: 22 }}>Step 2 of 2 · Payment</p>
              <h1 className="display-l text-balance" style={{ margin: '16px 0 0' }}>Confirm and pay.</h1>
              <p style={{ fontSize: '1rem', color: 'var(--ink-soft)', margin: '12px 0 0' }}>
                Pay by card, transfer, or USSD. You will be taken to Paystack to complete payment — your place is confirmed the moment payment succeeds.
              </p>

              <form
                onSubmit={(e) => { e.preventDefault(); if (canPay && !submitting) handleContinueToPaystack(); }}
                style={{ marginTop: 36 }}
              >
                <div className="stack-mobile-sm" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 18 }}>
                  <label style={{ display: 'block', gridColumn: '1 / -1' }}>
                    <span style={{ ...LABEL, display: 'block', marginBottom: 8 }}>Full name</span>
                    <input required value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })}
                      onBlur={() => setLeadTouched((t) => ({ ...t, name: true }))} placeholder="Adaeze Okonkwo" autoComplete="name"
                      aria-invalid={(leadTouched.name && !!leadNameError) || undefined}
                      style={{ width: '100%', boxSizing: 'border-box', height: 46, padding: '0 14px', fontSize: '0.9375rem', background: 'var(--white)', border: `1px solid ${leadTouched.name && leadNameError ? 'var(--crimson-500)' : 'var(--border-strong)'}`, borderRadius: 'var(--radius-1)' }} />
                    {leadTouched.name && leadNameError && (
                      <span role="alert" style={{ display: 'block', fontSize: '0.8125rem', lineHeight: 1.45, color: 'var(--crimson-500)', marginTop: 7 }}>{leadNameError}</span>
                    )}
                  </label>
                  <label style={{ display: 'block', gridColumn: '1 / -1' }}>
                    <span style={{ ...LABEL, display: 'block', marginBottom: 8 }}>Email</span>
                    <input required type="email" inputMode="email" spellCheck={false} value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })}
                      onBlur={() => setLeadTouched((t) => ({ ...t, email: true }))} placeholder="you@email.com" autoComplete="email"
                      aria-invalid={(leadTouched.email && !!leadEmailError) || undefined}
                      style={{ width: '100%', boxSizing: 'border-box', height: 46, padding: '0 14px', fontSize: '0.9375rem', background: 'var(--white)', border: `1px solid ${leadTouched.email && leadEmailError ? 'var(--crimson-500)' : 'var(--border-strong)'}`, borderRadius: 'var(--radius-1)' }} />
                    {leadTouched.email && leadEmailError && (
                      <span role="alert" style={{ display: 'block', fontSize: '0.8125rem', lineHeight: 1.45, color: 'var(--crimson-500)', marginTop: 7 }}>{leadEmailError}</span>
                    )}
                  </label>
                </div>

                <div style={{ display: 'flex', gap: 8, margin: '26px 0 0' }}>
                  {['Card', 'Bank transfer', 'USSD'].map((m) => (
                    <span key={m} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '7px 12px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-1)', color: 'var(--ink-soft)' }}>
                      {m}
                    </span>
                  ))}
                </div>

                <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '22px 0 0', fontSize: '0.8125rem', color: 'var(--ink-soft)', maxWidth: '44em', cursor: 'pointer' }}>
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                    style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }} />
                  <span>I have read the cohort agreement. I understand Upthrust promises readiness and evidence, not employment.</span>
                </label>

                {apiError && (
                  <p role="alert" style={{ fontSize: '0.8125rem', color: 'var(--crimson-700)', background: 'var(--crimson-50)', border: '1px solid var(--crimson-500)', borderRadius: 'var(--radius-1)', padding: '12px 14px', marginTop: 20 }}>
                    {apiError}
                  </p>
                )}

                <button type="submit" disabled={!canPay || submitting} className="btn btn-primary"
                  style={{ marginTop: 24, opacity: canPay && !submitting ? 1 : 0.5, cursor: canPay && !submitting ? 'pointer' : 'not-allowed' }}>
                  {submitting ? 'Starting checkout…' : `Continue to Paystack · ${formatPrice(due, region)}`}
                </button>
              </form>
            </div>

            {/* Dark order summary */}
            <div style={{ alignSelf: 'start', position: 'sticky', top: 24 }}>
              <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '24px 22px', borderRadius: 'var(--radius-1)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--seal-300)', borderBottom: '1px solid var(--border-on-ink)', paddingBottom: 12, marginBottom: 4 }}>
                  Order summary
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-on-ink)', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--ink-200)' }}>Programme</span><span style={{ fontWeight: 600 }}>{programme.label}</span>
                </div>
                {!isIntensive && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-on-ink)', fontSize: '0.8125rem' }}>
                      <span style={{ color: 'var(--ink-200)' }}>Tier</span><span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{tier}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', fontSize: '0.8125rem' }}>
                      <span style={{ color: 'var(--ink-200)' }}>Plan</span><span style={{ fontWeight: 600 }}>{plan === 'full' ? 'Full payment' : 'Two instalments'}</span>
                    </div>
                  </>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', paddingTop: 16 }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--ink-200)' }}>Due today</span>
                  <span className="display-s" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatPrice(due, region)}</span>
                </div>
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 900px) { .enrol-config-grid { grid-template-columns: minmax(0,1fr) !important; } }`}</style>
        </section>
      )}

      {stage === 'payment' && rail === 'bank_transfer' && (
        <section style={{ padding: 'clamp(56px, 8vw, 96px) 0 clamp(48px, 6vw, 80px)' }}>
          <div className="container enrol-config-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 340px)', gap: 48 }}>
            <div>
              <button onClick={() => setStage('configure')} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
                ← BACK TO YOUR SEAT
              </button>
              <p style={{ ...LABEL, marginTop: 22 }}>Step 2 of 2 · Payment</p>
              <h1 className="display-l text-balance" style={{ margin: '16px 0 0' }}>Pay by bank transfer.</h1>
              <p style={{ fontSize: '1rem', color: 'var(--ink-soft)', margin: '12px 0 0' }}>
                {currencyFor(region)} transfer, verified by hand. Your place is confirmed once we've matched your transfer to your reference.
              </p>

              {!transferInit ? (
                <form onSubmit={(e) => { e.preventDefault(); if (canRequestTransfer) handleGetBankDetails(); }} style={{ marginTop: 36 }}>
                  <div className="stack-mobile-sm" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 18 }}>
                    <label style={{ display: 'block', gridColumn: '1 / -1' }}>
                      <span style={{ ...LABEL, display: 'block', marginBottom: 8 }}>Full name</span>
                      <input required value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })}
                        onBlur={() => setLeadTouched((t) => ({ ...t, name: true }))} placeholder="Adaeze Okonkwo" autoComplete="name"
                        aria-invalid={(leadTouched.name && !!leadNameError) || undefined}
                        style={{ width: '100%', boxSizing: 'border-box', height: 46, padding: '0 14px', fontSize: '0.9375rem', background: 'var(--white)', border: `1px solid ${leadTouched.name && leadNameError ? 'var(--crimson-500)' : 'var(--border-strong)'}`, borderRadius: 'var(--radius-1)' }} />
                      {leadTouched.name && leadNameError && (
                        <span role="alert" style={{ display: 'block', fontSize: '0.8125rem', lineHeight: 1.45, color: 'var(--crimson-500)', marginTop: 7 }}>{leadNameError}</span>
                      )}
                    </label>
                    <label style={{ display: 'block', gridColumn: '1 / -1' }}>
                      <span style={{ ...LABEL, display: 'block', marginBottom: 8 }}>Email</span>
                      <input required type="email" inputMode="email" spellCheck={false} value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })}
                        onBlur={() => setLeadTouched((t) => ({ ...t, email: true }))} placeholder="you@email.com" autoComplete="email"
                        aria-invalid={(leadTouched.email && !!leadEmailError) || undefined}
                        style={{ width: '100%', boxSizing: 'border-box', height: 46, padding: '0 14px', fontSize: '0.9375rem', background: 'var(--white)', border: `1px solid ${leadTouched.email && leadEmailError ? 'var(--crimson-500)' : 'var(--border-strong)'}`, borderRadius: 'var(--radius-1)' }} />
                      {leadTouched.email && leadEmailError && (
                        <span role="alert" style={{ display: 'block', fontSize: '0.8125rem', lineHeight: 1.45, color: 'var(--crimson-500)', marginTop: 7 }}>{leadEmailError}</span>
                      )}
                    </label>
                  </div>

                  <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '26px 0 0', fontSize: '0.8125rem', color: 'var(--ink-soft)', maxWidth: '44em', cursor: 'pointer' }}>
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                      style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }} />
                    <span>I have read the cohort agreement. I understand Upthrust promises readiness and evidence, not employment.</span>
                  </label>

                  {apiError && (
                    <p role="alert" style={{ fontSize: '0.8125rem', color: 'var(--crimson-700)', background: 'var(--crimson-50)', border: '1px solid var(--crimson-500)', borderRadius: 'var(--radius-1)', padding: '12px 14px', marginTop: 20 }}>
                      {apiError}
                    </p>
                  )}

                  <button type="submit" disabled={!canRequestTransfer} className="btn btn-primary"
                    style={{ marginTop: 20, opacity: canRequestTransfer ? 1 : 0.5, cursor: canRequestTransfer ? 'pointer' : 'not-allowed' }}>
                    {submitting ? 'Getting your details…' : 'Get bank transfer details →'}
                  </button>
                </form>
              ) : (
                <div style={{ marginTop: 36 }}>
                  {hasRealBankDetails ? (
                    <div className="card" style={{ padding: '20px 22px' }}>
                      {transferInit.bankDetails.map((row) => (
                        <CopyRow key={row.label} label={row.label} value={row.value} />
                      ))}
                      <CopyRow label="Payment reference — required" value={transferInit.reference} />
                    </div>
                  ) : (
                    <div className="card" style={{ padding: '20px 22px' }}>
                      <p style={{ fontSize: '0.9375rem' }}>Your bank transfer details will be sent to <strong>{lead.email}</strong> shortly.</p>
                      <CopyRow label="Payment reference — required" value={transferInit.reference} />
                    </div>
                  )}

                  <p style={{ fontSize: '0.8125rem', color: 'var(--ink-soft)', marginTop: 20, lineHeight: 1.6 }}>
                    Email your transfer confirmation to <a href={mailtoHref} style={{ color: 'var(--seal-600)', textDecoration: 'underline' }}>info@upthrustdigital.com</a> with your name, programme, amount, and the reference above.
                  </p>

                  <a href={mailtoHref} className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>
                    Email payment confirmation
                  </a>

                  <button onClick={handleSentTransfer} disabled={submitting} className="btn btn-secondary" style={{ marginTop: 12, marginLeft: 12 }}>
                    {submitting ? 'Confirming…' : "I've sent the transfer"}
                  </button>

                  <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: 20 }}>
                    Your place is confirmed once we verify the transfer. We will email your enrolment confirmation after review.
                  </p>
                </div>
              )}
            </div>

            {/* Dark order summary */}
            <div style={{ alignSelf: 'start', position: 'sticky', top: 24 }}>
              <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '24px 22px', borderRadius: 'var(--radius-1)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--seal-300)', borderBottom: '1px solid var(--border-on-ink)', paddingBottom: 12, marginBottom: 4 }}>
                  Order summary
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-on-ink)', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--ink-200)' }}>Programme</span><span style={{ fontWeight: 600 }}>{programme.label}</span>
                </div>
                {!isIntensive && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-on-ink)', fontSize: '0.8125rem' }}>
                      <span style={{ color: 'var(--ink-200)' }}>Tier</span><span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{tier}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', fontSize: '0.8125rem' }}>
                      <span style={{ color: 'var(--ink-200)' }}>Plan</span><span style={{ fontWeight: 600 }}>{plan === 'full' ? 'Full payment' : 'Two instalments'}</span>
                    </div>
                  </>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', paddingTop: 16 }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--ink-200)' }}>Due today</span>
                  <span className="display-s" style={{ fontVariantNumeric: 'tabular-nums' }}>{formatPrice(due, region)}</span>
                </div>
                {transferInit && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, paddingTop: 16, fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--ink-200)' }}>Reference</span><span style={{ fontFamily: 'var(--font-mono)' }}>{transferInit.reference}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 900px) { .enrol-config-grid { grid-template-columns: minmax(0,1fr) !important; } }`}</style>
        </section>
      )}

      {stage === 'confirmation' && paymentOutcome?.kind === 'paystack_verified' && (
        <>
          <section style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
            <div className="container enrol-confirm-grid" style={{ padding: 'clamp(56px, 8vw, 88px) 24px clamp(56px, 7vw, 88px)', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.14em', color: 'var(--seal-300)' }}>
                  PAYMENT CONFIRMED · {paymentOutcome.reference}
                </p>
                <h1 className="display-l text-balance" style={{ color: 'var(--paper)', margin: '18px 0 0' }}>
                  You&rsquo;re in.
                </h1>
                <p style={{ fontSize: '1.0625rem', lineHeight: 1.55, color: 'var(--ink-200)', margin: '20px 0 0', maxWidth: '34em' }}>
                  Cohort {programme.cohort} of {programme.label} opens on {formatDate(programme.start)}. Onboarding and your Week 0 diagnostic unlock immediately.
                </p>

                <div style={{ marginTop: 40, borderTop: '1px solid var(--border-on-ink)' }}>
                  {[
                    { n: 'NOW', title: 'Receipt and welcome pack sent', body: `Sent to ${lead.email}. Check your inbox for the cohort agreement and the tool setup list.` },
                    { n: 'WEEK 0', title: 'Diagnostic and pathway confirmation', body: 'A 40-minute baseline so your facilitator knows where you start.' },
                    { n: formatDate(programme.start).toUpperCase(), title: `Week 1 begins`, body: `Live sessions run ${COHORT.liveSessionDays.join(' and ')}, ${COHORT.hoursPerWeek} hours a week.` },
                  ].map((s) => (
                    <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '96px minmax(0,1fr)', gap: 20, padding: '18px 0', borderBottom: '1px solid var(--border-on-ink)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.08em', color: 'var(--seal-300)' }}>{s.n}</span>
                      <span>
                        <span style={{ display: 'block', fontSize: '1rem', fontWeight: 600, color: 'var(--paper)' }}>{s.title}</span>
                        <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--ink-300)', marginTop: 2 }}>{s.body}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 34, flexWrap: 'wrap' }}>
                  <Link href="/dashboard" className="btn" style={{ background: 'var(--amber)', color: 'var(--paper)' }}>
                    Open your dashboard →
                  </Link>
                  <Link href={isIntensiveSlug(programmeSlug) ? `/intensives/${programmeSlug}` : `/pathways/${programmeSlug}`} className="btn" style={{ background: 'none', color: 'var(--paper)', border: '1px solid var(--border-on-ink)' }}>
                    Review the curriculum
                  </Link>
                </div>
              </div>

              <div style={{ background: 'var(--white)', color: 'var(--ink)', padding: '26px 24px', position: 'relative' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.12em', color: 'var(--ink-muted)', borderBottom: '1px solid var(--ink)', paddingBottom: 12 }}>
                  RECEIPT · {paymentOutcome.reference}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--paper-line)', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Programme</span><span style={{ fontWeight: 600 }}>{programme.label}</span>
                </div>
                {!isIntensive && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--paper-line)', fontSize: '0.8125rem' }}>
                      <span style={{ color: 'var(--ink-muted)' }}>Tier</span><span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{tier}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--paper-line)', fontSize: '0.8125rem' }}>
                      <span style={{ color: 'var(--ink-muted)' }}>Plan</span><span style={{ fontWeight: 600 }}>{plan === 'full' ? 'Paid in full' : '2 instalments'}</span>
                    </div>
                  </>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--paper-line)', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Charged today</span><span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatPrice(due, region)}</span>
                </div>
                {paymentOutcome.passportId && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', fontSize: '0.8125rem' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>Passport ID</span><span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{paymentOutcome.passportId}</span>
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.06em', color: 'var(--ink-muted)', borderTop: '1px solid var(--ink)', paddingTop: 12, marginTop: 8 }}>
                  {paymentOutcome.passportId ? 'ISSUED ON GRADUATION · WEEK 12' : 'INTENSIVE ENROLMENT · NO PASSPORT ISSUED'}
                </div>
              </div>
            </div>
          </section>
          <style>{`@media (max-width: 900px) { .enrol-confirm-grid { grid-template-columns: minmax(0,1fr) !important; } }`}</style>
        </>
      )}

      {stage === 'confirmation' && paymentOutcome?.kind === 'transfer_pending' && (
        <>
          <section style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
            <div className="container enrol-confirm-grid" style={{ padding: 'clamp(56px, 8vw, 88px) 24px clamp(56px, 7vw, 88px)', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.14em', color: 'var(--seal-300)' }}>
                  REFERENCE · {paymentOutcome.reference}
                </p>
                <h1 className="display-l text-balance" style={{ color: 'var(--paper)', margin: '18px 0 0' }}>
                  We've got your reference.
                </h1>
                <p style={{ fontSize: '1.0625rem', lineHeight: 1.55, color: 'var(--ink-200)', margin: '20px 0 0', maxWidth: '34em' }}>
                  Confirming your bank transfer for {programme.label}. We'll email {lead.email || 'you'} once it's verified — usually within one business day. Send your transfer as soon as you can so we can confirm your place.
                </p>
                <div style={{ display: 'flex', gap: 12, marginTop: 34, flexWrap: 'wrap' }}>
                  <Link href="/" className="btn" style={{ background: 'var(--amber)', color: 'var(--paper)' }}>
                    Back to home
                  </Link>
                  <Link href="/consultation" className="btn" style={{ background: 'none', color: 'var(--paper)', border: '1px solid var(--border-on-ink)' }}>
                    Questions? Book a consultation
                  </Link>
                </div>
              </div>

              <div style={{ background: 'var(--white)', color: 'var(--ink)', padding: '26px 24px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.12em', color: 'var(--ink-muted)', borderBottom: '1px solid var(--ink)', paddingBottom: 12 }}>
                  PENDING VERIFICATION · {paymentOutcome.reference}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--paper-line)', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Programme</span><span style={{ fontWeight: 600 }}>{programme.label}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Amount</span><span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatPrice(due, region)}</span>
                </div>
              </div>
            </div>
          </section>
          <style>{`@media (max-width: 900px) { .enrol-confirm-grid { grid-template-columns: minmax(0,1fr) !important; } }`}</style>
        </>
      )}

      {stage === 'confirmation' && paymentOutcome?.kind === 'paystack_pending' && (
        <section style={{ padding: 'clamp(80px, 12vw, 140px) 0' }}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <h1 className="display-m">Confirming your payment…</h1>
            <p style={{ fontSize: '1rem', color: 'var(--ink-soft)', margin: '14px 0 28px' }}>
              Reference <strong style={{ fontFamily: 'var(--font-mono)' }}>{paymentOutcome.reference}</strong>. If Paystack has already confirmed the charge on their side, this will update within a few seconds — otherwise we will follow up by email once it clears.
            </p>
            <Link href="/consultation" className="btn btn-primary">Talk to us about this reference</Link>
          </div>
        </section>
      )}

      {verifyingReturn && (
        <section style={{ padding: 'clamp(80px, 12vw, 140px) 0' }}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <h1 className="display-m">Confirming your payment…</h1>
          </div>
        </section>
      )}
    </>
  );
}
