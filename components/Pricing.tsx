'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRegion } from '@/lib/useRegion';
import { PRICING, formatPrice, getPaymentLink, type Region } from '@/lib/config';

interface Props {
  initialRegion?: Region;
}

const REGION_LABELS: Record<Region, string> = {
  NG: 'Nigeria & Africa',
  GB: 'United Kingdom',
  CA: 'Canada',
  US: 'United States',
  OTHER: 'Other / International',
};

export default function Pricing({ initialRegion = 'NG' }: Props) {
  const [region, setRegion] = useRegion(initialRegion);
  const [showSelector, setShowSelector] = useState(false);
  const pricing = PRICING[region];

  return (
    <div>
      {/* Region indicator — subtle, with override option */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 12,
          marginBottom: 32,
          fontSize: '0.875rem',
        }}
      >
        <p style={{ color: 'var(--ink-muted)' }}>
          Showing pricing for <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>{REGION_LABELS[region]}</strong>.
        </p>

        {!showSelector ? (
          <button
            type="button"
            onClick={() => setShowSelector(true)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'var(--amber-deep)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontFamily: 'inherit',
            }}
          >
            Wrong region? Change
          </button>
        ) : (
          <select
            autoFocus
            value={region}
            onChange={(e) => {
              setRegion(e.target.value as Region);
              setShowSelector(false);
            }}
            style={{
              padding: '4px 8px',
              border: '1.5px solid var(--ink)',
              background: 'var(--white)',
              fontSize: '0.875rem',
              fontFamily: 'inherit',
              borderRadius: 2,
              cursor: 'pointer',
            }}
          >
            {(Object.keys(REGION_LABELS) as Region[]).map((r) => (
              <option key={r} value={r}>{REGION_LABELS[r]}</option>
            ))}
          </select>
        )}
      </div>

      {/* Tier cards */}
      <div className="grid grid-2" style={{ gap: 24 }}>
        {/* STANDARD */}
        <div className="card" style={{ padding: 40, display: 'flex', flexDirection: 'column' }}>
          <p className="eyebrow">Tier 01</p>
          <h3 className="display-s" style={{ marginTop: 12, fontSize: '1.875rem' }}>Standard</h3>
          <div style={{ marginTop: 20 }}>
            <p style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 500,
              letterSpacing: '-0.022em',
              color: 'var(--ink)',
            }}>
              {formatPrice(pricing.standard, region)}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', marginTop: 4 }}>
              Or {formatPrice(pricing.standardInstallment2, region)} × 2 installments
            </p>
          </div>

          <p className="text-soft" style={{ marginTop: 20, fontSize: '0.9375rem', lineHeight: 1.6 }}>
            For self-driven learners who want the live program, the assignments, and the community.
          </p>

          <ul style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9375rem', flexGrow: 1 }}>
            {['Live concept classes + labs', 'All program templates', 'Weekly assignments + group feedback', 'Cohort community access', 'Completion certificate', 'Capstone submission'].map((item) => (
              <li key={item} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: 'var(--moss)' }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link
              href={getPaymentLink(region, 'standard', 'full')}
              className="btn btn-primary btn-arrow"
              style={{ justifyContent: 'center' }}
              target={getPaymentLink(region, 'standard', 'full').startsWith('http') ? '_blank' : undefined}
              rel={getPaymentLink(region, 'standard', 'full').startsWith('http') ? 'noopener' : undefined}
            >
              Enroll — Pay in full
            </Link>
            <Link
              href={getPaymentLink(region, 'standard', 'installment')}
              className="btn btn-secondary"
              style={{ justifyContent: 'center' }}
              target={getPaymentLink(region, 'standard', 'installment').startsWith('http') ? '_blank' : undefined}
              rel={getPaymentLink(region, 'standard', 'installment').startsWith('http') ? 'noopener' : undefined}
            >
              Pay in 2 installments
            </Link>
            <Link href="/consultation" style={{ marginTop: 4, fontSize: '0.8125rem', color: 'var(--ink-muted)', textAlign: 'center', textDecoration: 'underline' }}>
              Have questions? Book a consultation first
            </Link>
          </div>
        </div>

        {/* PREMIUM */}
        <div className="card" style={{
          padding: 40,
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--white)',
          border: '2px solid var(--ink)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: -12,
            right: 24,
            background: 'var(--amber)',
            color: 'var(--paper)',
            padding: '6px 12px',
            fontFamily: 'Manrope, sans-serif',
            fontSize: '0.6875rem',
            letterSpacing: '0.12em',
          }}>
            RECOMMENDED
          </div>
          <p className="eyebrow">Tier 02</p>
          <h3 className="display-s" style={{ marginTop: 12, fontSize: '1.875rem' }}>Premium</h3>
          <div style={{ marginTop: 20 }}>
            <p style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 500,
              letterSpacing: '-0.022em',
              color: 'var(--ink)',
            }}>
              {formatPrice(pricing.premium, region)}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', marginTop: 4 }}>
              Or {formatPrice(pricing.premiumInstallment2, region)} × 2 installments
            </p>
          </div>

          <p className="text-soft" style={{ marginTop: 20, fontSize: '0.9375rem', lineHeight: 1.6 }}>
            For serious career switchers. Everything in Standard, plus portfolio review, mock interview, and Capability Passport.
          </p>

          <ul style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9375rem', flexGrow: 1 }}>
            {['Everything in Standard', '1:1 portfolio review session', 'Mock interview with feedback', 'Enhanced facilitator feedback', 'Capability Passport eligibility', 'Demo Day spotlight slot'].map((item) => (
              <li key={item} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: 'var(--moss)' }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link
              href={getPaymentLink(region, 'premium', 'full')}
              className="btn btn-amber btn-arrow"
              style={{ justifyContent: 'center' }}
              target={getPaymentLink(region, 'premium', 'full').startsWith('http') ? '_blank' : undefined}
              rel={getPaymentLink(region, 'premium', 'full').startsWith('http') ? 'noopener' : undefined}
            >
              Enroll — Pay in full
            </Link>
            <Link
              href={getPaymentLink(region, 'premium', 'installment')}
              className="btn btn-secondary"
              style={{ justifyContent: 'center' }}
              target={getPaymentLink(region, 'premium', 'installment').startsWith('http') ? '_blank' : undefined}
              rel={getPaymentLink(region, 'premium', 'installment').startsWith('http') ? 'noopener' : undefined}
            >
              Pay in 2 installments
            </Link>
            <Link href="/consultation" style={{ marginTop: 4, fontSize: '0.8125rem', color: 'var(--ink-muted)', textAlign: 'center', textDecoration: 'underline' }}>
              Have questions? Book a consultation first
            </Link>
          </div>
        </div>
      </div>

      {/* VIP note */}
      <div style={{
        marginTop: 32,
        padding: 24,
        background: 'var(--paper)',
        border: '1px dashed var(--paper-line)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div>
          <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1.125rem', fontStyle: 'italic', color: 'var(--ink-soft)' }}>
            VIP 1:1 mentorship
          </p>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: 4 }}>
            Not available in Cohort 1. We are proving mentorship capacity through PM and BA delivery first. Opens in Cohort 2.
          </p>
        </div>
        <Link href="/consultation" className="btn-ghost btn-arrow" style={{ fontSize: '0.875rem' }}>
          Join the VIP waitlist
        </Link>
      </div>

      {/* Payment methods note */}
      <p style={{ marginTop: 32, fontSize: '0.875rem', color: 'var(--ink-muted)', textAlign: 'center', lineHeight: 1.6 }}>
        Payments processed via Paystack (Nigeria &amp; Africa) and Stripe (international). Bank transfer available on request — mention this on your consultation call.
      </p>
    </div>
  );
}
