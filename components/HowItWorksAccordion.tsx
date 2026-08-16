'use client';

import { useState } from 'react';
import Link from 'next/link';

const STEPS = [
  {
    num: '01', title: 'Assess', tagline: 'Diagnose your fit',
    body: 'Take the 8-minute Career Assessment — 12 real product scenarios that reveal how you actually think. Not a quiz. Not a personality test. A practical diagnostic that routes you to the pathway that fits your instincts.',
    markLabel: '→ YOUR PATHWAY CONFIRMED', linkLabel: 'Start with the assessment →', href: '/assessment',
  },
  {
    num: '02', title: 'Build', tagline: '12 weeks of real work',
    body: 'Twelve weeks of live concept classes, real-world cases, and supervised labs. Every week ends in one portfolio artefact, reviewed against a published rubric within 48 hours.',
    markLabel: '→ 12 ARTEFACTS PRODUCED', linkLabel: 'See the weekly rhythm →', href: '/accelerator',
  },
  {
    num: '03', title: 'Verify', tagline: 'Earn the Passport',
    body: 'In Week 12 you present and defend your capstone. A facilitator scores each capability area against the published rubric, writes a sign-off, and issues your Capability Passport with a unique ID.',
    markLabel: '→ CAPABILITY PASSPORT ISSUED', linkLabel: 'Explore the program →', href: '/accelerator',
  },
  {
    num: '04', title: 'Showcase', tagline: 'Open the career door',
    body: 'Demo Day puts your capstone in front of hiring managers. Your portfolio case study, interview story bank, and a Passport any employer can verify go with you into every application.',
    markLabel: '→ EVIDENCE EMPLOYERS CAN CHECK', linkLabel: 'Book a consultation →', href: '/consultation',
  },
];

export function HowItWorksAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ marginTop: 56, borderTop: '1px solid var(--ink-800)' }}>
      {STEPS.map((step, i) => (
        <div key={step.num}>
          <button
            onClick={() => setOpen((o) => (o === i ? -1 : i))}
            className="how-it-works-row"
            style={{
              width: '100%', textAlign: 'left', background: 'none', border: 0,
              borderBottom: '1px solid var(--border-soft)', padding: '24px 0', cursor: 'pointer',
              display: 'grid', gridTemplateColumns: '64px 1fr 1fr 24px', gap: 24, alignItems: 'baseline',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--seal-600)', letterSpacing: '0.08em' }}>{step.num}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>{step.title}</span>
            <span className="how-it-works-tagline" style={{ fontSize: 15, color: 'var(--fg-2)' }}>{step.tagline}</span>
            <span style={{ fontSize: 18, color: 'var(--fg-3)', justifySelf: 'end' }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <div style={{ borderBottom: '1px solid var(--border-soft)', padding: '0 0 32px', display: 'grid', gridTemplateColumns: '64px 1fr', gap: 24 }}>
              <span />
              <div style={{ maxWidth: '46em' }}>
                <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0 }}>{step.body}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--moss-700)', letterSpacing: '0.06em' }}>{step.markLabel}</span>
                  <Link href={step.href} style={{ fontSize: 14, fontWeight: 500, color: 'var(--seal-600)', borderBottom: '1px solid var(--seal-300)' }}>
                    {step.linkLabel}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
