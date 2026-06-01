'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';

const FAQS = [
  {
    section: 'The program',
    items: [
      {
        q: 'What exactly is the Career Capability Accelerator?',
        a: 'A 12-week practical program for PM or BA — guided projects, workplace simulations, weekly assignments, mentorship, and AI-assisted feedback. Eligible learners earn a Capability Passport: an evidence record of what you produced.',
      },
      {
        q: 'How is this different from other bootcamps and courses?',
        a: 'Most programs sell content and certificates. We sell practice and evidence. By Week 12 you have a portfolio of real artefacts, a capstone you defended, and a Capability Passport that documents what you can do.',
      },
      {
        q: 'How much time per week does this actually take?',
        a: 'Plan for 8–10 hours per week: 2 hrs live class, 1 hr lab, 3–4 hrs assignment, 1 hr feedback review, plus reading. People who try to do this on 4 hours per week tend to fall behind by Week 3.',
      },
      {
        q: 'Is the program live or pre-recorded?',
        a: 'Live-anchored. Concept classes and labs are live and synchronous. Recordings are always available, so missing a session is recoverable — but the program is designed around live participation.',
      },
    ],
  },
  {
    section: 'Pathways and choosing',
    items: [
      {
        q: 'Which pathway should I choose — PM or BA?',
        a: 'Take the Career Assessment first. It will tell you, with evidence from your own answers, where you actually fit. If your scores are close, the consultation call is where we decide together.',
      },
      {
        q: 'I want to do Product Design. Why is it not in Cohort 1?',
        a: 'We launched with PM and BA only to protect delivery quality. Product Design opens in Cohort 2 once we have proven PM and BA delivery. Join the Cohort 2 waitlist via the assessment.',
      },
      {
        q: 'Can I switch pathways mid-program?',
        a: 'In rare cases, yes — within the first 2 weeks. After Week 2 the pathway-specific work diverges enough that switching becomes impractical. Take the assessment before enrolling.',
      },
    ],
  },
  {
    section: 'Eligibility and background',
    items: [
      {
        q: 'Do I need tech experience to enroll?',
        a: 'No. You need to be comfortable with computers, willing to learn product vocabulary, and ready to write clearly. Most successful learners come from banking, operations, customer success, healthcare, or education.',
      },
      {
        q: 'Can I join from outside Nigeria?',
        a: 'Yes. Cohort 1 includes learners from Africa, the UK, Canada, Australia, and the global diaspora. Live sessions work for both Africa and UK/Europe time zones. Pricing is regional.',
      },
      {
        q: 'I am already in a junior product role. Will this help me?',
        a: 'Yes — this is one of our strongest learner profiles. If your title says PM or BA but your portfolio does not reflect it, the Accelerator will help you formalise and produce the evidence to grow.',
      },
    ],
  },
  {
    section: 'Cohort, tiers, and pricing',
    items: [
      {
        q: 'What is the difference between Standard and Premium?',
        a: 'Standard: full live program, templates, assignments, community, completion certificate. Premium adds: 1:1 portfolio review, mock interview, enhanced feedback, Capability Passport eligibility, and Demo Day spotlight.',
      },
      {
        q: 'How much does it cost?',
        a: 'Pricing is regional and shared on the consultation call. Africa pricing is in NGN; UK, Canada, and Australia pricing is in local currency. We are not the cheapest option — and we do not try to be.',
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes. Both Standard and Premium can be paid in installments. We will work out a plan during the consultation call.',
      },
    ],
  },
  {
    section: 'Outcomes',
    items: [
      {
        q: 'Will you guarantee me a job?',
        a: 'No. We promise readiness, portfolio evidence, and structured practice. You will walk into interviews with something to show and the confidence to explain it.',
      },
      {
        q: 'What is the Capability Passport, and why does it matter?',
        a: 'An evidence record — capability areas assessed against a rubric, artefacts you produced, capstone performance, and facilitator review. Not a certificate. A verifiable record of your work.',
      },
      {
        q: 'What happens after Week 12?',
        a: 'Portfolio, capstone, and (Premium) Capability Passport. You join the Upthrust alumni network. Demo Day where employers see your work. Ongoing alumni community and portfolio support.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ink/10 py-6">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-start gap-4 text-left group min-h-[44px]"
        aria-expanded={open}
      >
        <span className="font-bold text-navy text-base leading-snug group-hover:text-amber transition-colors">
          {q}
        </span>
        <svg
          width="20" height="20" viewBox="0 0 20 20" fill="none"
          className={`flex-shrink-0 text-amber transition-transform duration-200 mt-0.5 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <p className="text-ink/70 text-sm leading-relaxed pt-4">{a}</p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="bg-navy py-32 lg:py-40 text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Badge variant="paper">Frequently Asked Questions</Badge>
          <h1 className="font-serif text-display-md text-white mt-6">
            Everything you need to know.
          </h1>
        </div>
      </section>

      {/* ─── FAQ LIST ─────────────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {FAQS.map((section, sIdx) => (
            <div key={section.section} className={sIdx > 0 ? 'mt-16' : ''}>
              <SectionLabel>{section.section}</SectionLabel>
              <div>
                {section.items.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="bg-navy py-24 lg:py-32 text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-display-sm text-white mb-4">Still wondering?</h2>
          <p className="text-paper/60 text-lg mb-8 max-w-md mx-auto">
            Take the assessment for a personalised result, or book a call to ask your specific question.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/assessment"
              className="bg-amber hover:bg-amber-dark text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px] inline-flex items-center">
              Take the Assessment
            </Link>
            <Link href="/consultation"
              className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px] inline-flex items-center">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
