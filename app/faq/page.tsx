'use client';

import Link from 'next/link';
import { HeroSwirl } from '@/components/HeroSwirl';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

const FAQS = [
  {
    section: 'The program',
    items: [
      { q: 'What exactly is the Career Capability Accelerator?', a: 'A 12-week practical program across four pathways — Product Management, Business Analysis, Product Design, and Payment Operations — with live sessions, weekly portfolio assignments, AI-assisted feedback, and expert review. Eligible learners earn a Capability Passport: a verifiable evidence record of what you produced and how you performed.' },
      { q: 'How is this different from other bootcamps and courses?', a: 'Most programs sell content and certificates. We sell practice and evidence. By Week 12 you have a portfolio of real artefacts you produced, a capstone you defended, and a Capability Passport that documents what you can do.' },
      { q: 'How much time per week does this actually take?', a: 'Plan for 8–10 hours: 2 hrs live class, 1 hr lab, 3–4 hrs assignment, 1 hr feedback review. People doing less than 6 hours tend to fall behind by Week 3 and finish with weak portfolios.' },
      { q: 'Is the program live or pre-recorded?', a: 'Live-anchored. Concept classes and labs are live and synchronous. Recordings are always available — but the program is designed around live participation.' },
    ],
  },
  {
    section: 'Pathways and choosing',
    items: [
      { q: 'Which pathway should I choose?', a: 'Take the Career Assessment first. It will tell you, with evidence from your own answers, where you actually fit. If scores are close, the consultation call is where we decide together.' },
      { q: 'Why did Product Design and Payment Operations open later than PM and BA?', a: 'We ran Product Management and Business Analysis first to prove the delivery model — the same twelve-week spine, the same review discipline. Product Design and Payment Operations now open with that model proven, running their own Cohort 1 while PM and BA run Cohort 2.' },
      { q: 'Can I switch pathways mid-program?', a: 'In rare cases, yes — within the first 2 weeks. After that, the pathway-specific work has diverged enough that switching is impractical. Take the assessment and consultation before enrolling.' },
    ],
  },
  {
    section: 'Eligibility and background',
    items: [
      { q: 'Do I need tech experience to enroll?', a: 'No. You need to be comfortable with computers, willing to learn product vocabulary, and ready to write clearly. Most successful learners come from non-tech backgrounds.' },
      { q: 'Can I join from outside Nigeria?', a: 'Yes. Our cohorts include learners from across Africa, the UK, Canada, Australia, and the global diaspora. Live sessions work for both Africa and UK/Europe time zones.' },
      { q: 'I am already in a junior product role. Will this help me?', a: 'Yes. If your title says PM, BA, or analyst but your portfolio does not reflect it, the Accelerator will help you formalise what you already do and produce the evidence to grow.' },
    ],
  },
  {
    section: 'Tiers and pricing',
    items: [
      { q: 'What is the difference between Standard and Premium?', a: 'Standard: full live program, templates, assignments, community, completion certificate. Premium adds: 1:1 portfolio review, mock interview, enhanced facilitator feedback, Capability Passport eligibility, and Demo Day spotlight.' },
      { q: 'How much does it cost?', a: 'Pricing is regional and shared on the consultation call. Africa pricing is in NGN; UK, Canada, and Australia in local currency. We are not the cheapest option — and we do not try to be.' },
      { q: 'Do you offer payment plans?', a: 'Yes. Both Standard and Premium can be paid in two installments. We will work out a plan on the consultation call.' },
    ],
  },
  {
    section: 'Outcomes',
    items: [
      { q: 'Will you guarantee me a job?', a: 'No. We promise readiness, portfolio evidence, and structured practice. What we guarantee is that you will walk into interviews with something to show — and the confidence to explain it.' },
      { q: 'What is the Capability Passport, and why does it matter?', a: 'An evidence record — not a certificate. It documents capability areas assessed against a rubric, artefacts you produced, your capstone performance, and a facilitator sign-off. Its value to employers grows as our alumni network grows.' },
      { q: 'What happens after Week 12?', a: 'Portfolio, capstone, and (Premium) Capability Passport. You join the Upthrust alumni network. Demo Day where employers see your work. Ongoing alumni community and portfolio support.' },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-navy py-28 lg:py-36 overflow-hidden">
        <HeroSwirl variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber/12 border border-amber/25 px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-amber rounded-full animate-pulse flex-shrink-0" />
            <span className="text-amber text-xs font-bold tracking-[0.15em] uppercase">Frequently Asked Questions</span>
          </div>
          <h1 className="font-serif text-hero-md lg:text-hero text-white max-w-2xl mx-auto max-[768px]:text-hero-md">
            Everything you need to know.
          </h1>
        </div>
      </section>

      {/* ─── FAQ SECTIONS ─────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {FAQS.map((section, sIdx) => (
            <div key={section.section} className={sIdx > 0 ? 'mt-16' : ''}>
              <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-6">{section.section}</p>
              <FAQAccordion items={section.items} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="bg-navy py-24 text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="font-serif text-h2 text-white mb-4">Still wondering?</h2>
          <p className="text-paper/60 text-lg mb-8">Take the assessment for a personalised result, or book a call for your specific question.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment" className="bg-amber hover:bg-amber-dark text-white font-bold px-8 py-4 transition-all text-base min-h-[44px] inline-flex items-center justify-center">
              Take the Assessment →
            </Link>
            <Link href="/consultation" className="border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 transition-all text-base min-h-[44px] inline-flex items-center justify-center">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
