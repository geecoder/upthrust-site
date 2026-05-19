'use client';

import { useState, useRef, useEffect } from 'react';
import { useInView } from '@/lib/animations';

interface FAQItem {
  q: string;
  a: string;
  tag?: string;
}

const FAQS: FAQItem[] = [
  {
    tag: 'Time',
    q: 'How much time per week does this actually take?',
    a: 'Plan for 8 to 10 hours per week. That breaks down to roughly: 2 hours of live concept class, 1 hour of practical lab, 3 to 4 hours on the weekly assignment, 1 hour reviewing feedback and revising, and 30 minutes for reflection. People who try to do it on 4 hours per week tend to fall behind by Week 3 and either produce weak portfolios or drop out.',
  },
  {
    tag: 'Eligibility',
    q: 'Do I need a tech background to join?',
    a: 'No. You do not need to be a developer or have a technical background. You need to be comfortable with computers, willing to learn product vocabulary, and ready to write clearly. Most successful Upthrust learners come from banking, operations, customer success, healthcare, education, consulting, and similar fields.',
  },
  {
    tag: 'Location',
    q: 'Can I join from outside Nigeria?',
    a: 'Yes. Cohort 1 includes learners across Africa, the UK, Canada, and global diaspora markets. Live sessions are scheduled at times that work across Africa (WAT) and UK/Europe (BST/CET) time zones. Recordings are always made available within 24 hours for anyone who misses a session.',
  },
  {
    tag: 'Tiers',
    q: 'What is the real difference between Standard and Premium?',
    a: 'Standard gives you the full live program, all the templates, weekly assignments, group feedback, cohort community, and a completion certificate. Premium adds three things that matter most for a career switcher: a 1:1 portfolio review session (your work reviewed by Genesis directly), a mock interview with specific feedback on your stories, and Capability Passport eligibility. The Passport is the evidence record that summarises what you produced and how you performed — and it is only available on the Premium tier.',
  },
  {
    tag: 'Outcomes',
    q: 'Will you guarantee me a job?',
    a: 'No — and you should be cautious of any program that does. What we guarantee is readiness: a portfolio of real work, a capstone you defended, and the confidence to walk into interviews with something to show. Whether you land a specific role depends on your applications, your interviews, the market, and timing. What we can control is whether you are ready. That is what we are accountable for.',
  },
  {
    tag: 'Payment',
    q: 'Do you offer payment plans?',
    a: 'Yes. Both Standard and Premium tiers can be paid in two or three installments across the program. The exact structure depends on your region and tier — discuss this on the consultation call. We would rather find a plan that works than have you delay a decision that could change your career.',
  },
  {
    tag: 'Design',
    q: 'Why is Product Design not in Cohort 1?',
    a: 'Because the quality of a first cohort is a one-shot reputation event, and we will not compromise it by spreading thin. We are launching with PM and BA so we can deliver both at the standard we promise. Product Design opens in Cohort 2, after we have proven PM and BA delivery. If Design is your pathway, the Cohort 2 waitlist is the right move — waitlist members get first access, early curriculum previews, and any early-cohort pricing we offer.',
  },
  {
    tag: 'After',
    q: 'What happens after Week 12?',
    a: 'You graduate with a portfolio, a defended capstone, and — if Premium tier — a Capability Passport. You join the Upthrust alumni network, which grows more valuable as each cohort graduates. We run a Demo Day where employers and hiring managers can see your work. We support your job search through alumni community channels and ongoing portfolio review opportunities.',
  },
];

function FAQItem({ item, index, isOpen, onToggle }: { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div style={{ borderTop: index === 0 ? '2px solid var(--ink)' : '1px solid var(--paper-line)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', textAlign: 'left', padding: '22px 0',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20,
        }}
        aria-expanded={isOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {item.tag && (
            <span style={{
              fontFamily: 'Manrope, sans-serif', fontSize: '0.5625rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '3px 8px',
              background: isOpen ? 'var(--ink)' : 'var(--paper-soft)',
              color: isOpen ? 'var(--paper)' : 'var(--ink-muted)',
              transition: 'all 200ms', flexShrink: 0,
            }}>{item.tag}</span>
          )}
          <span style={{
            fontFamily: 'Fraunces, serif', fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 500, letterSpacing: '-0.018em',
            color: 'var(--ink)', lineHeight: 1.3,
          }}>{item.q}</span>
        </div>

        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          border: '1.5px solid var(--paper-line)',
          background: isOpen ? 'var(--ink)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 250ms cubic-bezier(0.2,0.7,0.2,1)',
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
            style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 250ms ease' }}>
            <path d="M5 1 v8 M1 5 h8" stroke={isOpen ? 'var(--paper)' : 'var(--ink)'} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      <div style={{
        height, overflow: 'hidden',
        transition: 'height 350ms cubic-bezier(0.2,0.7,0.2,1)',
      }}>
        <div ref={contentRef} style={{ paddingBottom: 24 }}>
          <p style={{
            fontSize: '1rem', lineHeight: 1.75,
            color: 'var(--ink-soft)', maxWidth: 720,
          }}>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQInteractive() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ maxWidth: 880 }}>
      {FAQS.map((faq, i) => (
        <div key={i} style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(12px)',
          transition: `opacity 400ms ease ${i * 60}ms, transform 400ms ease ${i * 60}ms`,
        }}>
          <FAQItem
            item={faq}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        </div>
      ))}
    </div>
  );
}
