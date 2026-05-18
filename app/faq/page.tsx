import Link from 'next/link';

const FAQS = [
  {
    section: 'The program',
    items: [
      {
        q: 'What exactly is the Career Capability Accelerator?',
        a: 'A 12-week practical program that helps you build real-world capability in Product Management or Business Analysis — through guided projects, workplace simulations, weekly assignments, mentorship, and AI-assisted feedback. At the end, eligible learners earn a Capability Passport: an evidence record of what you produced and how you performed.',
      },
      {
        q: 'How is this different from other bootcamps and courses?',
        a: 'Most programs sell content and certificates. We sell practice and evidence. You are not watching us explain product work — you are doing the work yourself, under deadline, with feedback. By Week 12 you have a portfolio of real artefacts you produced, a capstone you defended, and a Capability Passport that documents what you can do. That is the difference.',
      },
      {
        q: 'How much time per week does this actually take?',
        a: 'Plan for 8 to 10 hours per week. Roughly: 2 hours of live class, 1 hour of lab, 3 to 4 hours on the weekly assignment, 1 hour of feedback review and revision, plus reading and reflection. People who try to do this on 4 hours a week tend to fall behind by Week 3 and either drop out or finish with weak portfolios.',
      },
      {
        q: 'Is the program live or pre-recorded?',
        a: 'Live-anchored. Concept classes and labs are live and synchronous. Recordings are always available, so missing a session is recoverable — but the program is designed around live participation. If you cannot commit to most live sessions, this is not the right program.',
      },
    ],
  },
  {
    section: 'Pathways and choosing',
    items: [
      {
        q: 'Which pathway should I choose — PM or BA?',
        a: 'Take the Career Assessment first. It will tell you, with evidence from your own answers, where you actually fit. If your scores are close (a hybrid result), the consultation call is where we decide together. Most people who think they want PM but score BA end up doing better starting in BA and growing into PM.',
      },
      {
        q: 'I want to do Product Design. Why is it not in Cohort 1?',
        a: 'Because we are launching with PM and BA only — so we can deliver both at the quality we promise. The quality of a first cohort is a one-shot reputation event. Product Design opens in Cohort 2 once we have proven PM and BA delivery. If Design is your fit, the Cohort 2 waitlist is the right place to be — you take the same assessment and we will route you there.',
      },
      {
        q: 'Can I switch pathways mid-program?',
        a: 'In rare cases, yes — within the first 2 weeks. After Week 2, the pathway-specific work diverges enough that switching becomes impractical. This is why we strongly recommend taking the assessment and doing the consultation before enrolling, rather than figuring it out after Week 1.',
      },
    ],
  },
  {
    section: 'Eligibility and background',
    items: [
      {
        q: 'Do I need tech experience to enroll?',
        a: 'No. You do not need to be a developer or have a tech background. You need to be comfortable with computers, willing to learn product vocabulary, and ready to write clearly. Most successful learners come from non-tech backgrounds — banking, operations, customer success, healthcare, education, consulting.',
      },
      {
        q: 'Can I join from outside Nigeria?',
        a: 'Yes. Cohort 1 includes learners from across Africa, the UK, Canada, Australia, and the global diaspora. Live sessions are scheduled at times that work for both Africa and UK/Europe time zones. Pricing is set regionally — see below.',
      },
      {
        q: 'I am already in a junior product role. Will this help me?',
        a: 'Yes — this is one of our strongest learner profiles. If your title says PM, BA, or analyst but your portfolio does not reflect it, the Accelerator will help you formalise what you already do and produce the evidence to grow.',
      },
      {
        q: 'I have done other courses already. Is this redundant?',
        a: 'Probably not. Most courses teach concepts. This program forces you to apply them under realistic conditions. If you have completed courses but cannot confidently show a PRD, BRD, process map, or capstone you defended, this is the next step. If you genuinely already have all of that, we will tell you so on the consultation call.',
      },
    ],
  },
  {
    section: 'Cohort, tiers, and pricing',
    items: [
      {
        q: 'What is the difference between Standard and Premium?',
        a: 'Standard gives you the full live program, the templates, the assignments, the community, and a completion certificate. Premium adds: a 1:1 portfolio review session, a mock interview with feedback, enhanced facilitator feedback throughout, Capability Passport eligibility, and a Demo Day spotlight slot. Premium is the recommended tier for serious career switchers — the Capability Passport alone is worth the gap for most prospects.',
      },
      {
        q: 'Why is VIP not available in Cohort 1?',
        a: 'Because 1:1 mentorship requires proven capacity. We are intentionally proving that capacity through PM and BA delivery in Cohort 1 before selling it. If we sold VIP today without proving we can deliver it, we would compromise the whole cohort. VIP opens in Cohort 2.',
      },
      {
        q: 'How much does it cost?',
        a: 'Pricing is regional and is shared on the consultation call. Africa pricing is set in NGN with consideration of local realities. UK, Canada, and Australia pricing is set in GBP, CAD, and AUD respectively. The pricing reflects the value of a 12-week mentor-led program with portfolio review and Passport eligibility — not the price of a passive video course. We are not the cheapest option, and we do not try to be.',
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes. Both Standard and Premium tiers can be paid in installments. We will work out a plan that makes the program accessible during the consultation call.',
      },
      {
        q: 'How many learners are in Cohort 1?',
        a: '15 to 25 learners across PM and BA combined. We are intentionally keeping the first cohort small to protect delivery quality and feedback depth.',
      },
    ],
  },
  {
    section: 'Outcomes and after the program',
    items: [
      {
        q: 'Will you guarantee me a job?',
        a: 'No, and you should be wary of any program that does. We promise readiness, portfolio evidence, structured practice, and a strong alumni network. Whether you land a specific role depends on your applications, your interviews, the market, and timing. What we can promise is that you will walk into those interviews with something to show — and the confidence to explain it.',
      },
      {
        q: 'What is the Capability Passport, and why does it matter?',
        a: 'The Capability Passport is an evidence record. It documents the capability areas you were assessed on, the artefacts you produced, your capstone performance, facilitator review, and your readiness level. It is not a certificate — certificates say you attended. The Passport shows what you can do. Its value to employers grows as our alumni network grows, but right now it is a verifiable, defensible record of your work that you can include in any application.',
      },
      {
        q: 'Will I be able to put Upthrust on my CV?',
        a: 'Yes. You will list the Career Capability Accelerator (PM or BA pathway), your capstone project title, and any portfolio links you choose to share. We will provide language for both your CV and your LinkedIn that accurately reflects what you completed.',
      },
      {
        q: 'What happens after Week 12?',
        a: 'You graduate with a portfolio, a capstone, and (Premium tier) a Capability Passport. You join the Upthrust alumni network. We run a Demo Day where employers can see your work. We continue to support your job search through alumni community channels, ongoing portfolio review opportunities, and access to future cohort events.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 'clamp(80px, 12vw, 140px)', paddingBottom: 'clamp(48px, 6vw, 80px)' }}>
        <div className="container-narrow">
          <p className="eyebrow">Frequently Asked Questions</p>
          <h1 className="display-l text-balance" style={{ marginTop: 20 }}>
            The questions we get most.
          </h1>
          <p className="lede" style={{ marginTop: 24 }}>
            Everything below comes from real conversations with real prospects. If the answer to your question isn't here, the consultation call is the best place to ask it.
          </p>
        </div>
      </section>

      {/* FAQ SECTIONS */}
      <section style={{ paddingBottom: 'clamp(72px, 10vw, 120px)' }}>
        <div className="container-narrow">
          {FAQS.map((section, sIdx) => (
            <div key={section.section} style={{ marginTop: sIdx === 0 ? 0 : 64 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>{section.section}</p>
              <div>
                {section.items.map((item, i) => (
                  <details key={i} style={{
                    borderTop: i === 0 ? '2px solid var(--ink)' : '1px solid var(--paper-line)',
                    padding: '20px 0',
                  }}>
                    <summary style={{
                      cursor: 'pointer',
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 16,
                      fontFamily: 'Fraunces, serif',
                      fontSize: '1.1875rem',
                      fontWeight: 500,
                      letterSpacing: '-0.018em',
                      color: 'var(--ink)',
                      lineHeight: 1.3,
                    }}>
                      <span>{item.q}</span>
                      <span style={{ color: 'var(--amber-deep)', fontSize: '1.5rem', lineHeight: 1, transform: 'translateY(-2px)', flexShrink: 0 }}>+</span>
                    </summary>
                    <p style={{ marginTop: 14, fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(72px, 10vw, 120px) 0' }}>
        <div className="container-medium" style={{ textAlign: 'center' }}>
          <h2 className="display-m text-balance" style={{ color: 'var(--paper)' }}>
            Still wondering?
          </h2>
          <p className="lede" style={{ marginTop: 20, color: 'rgba(250,247,241,0.78)', maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
            Take the Career Assessment for a personalised result, or book a consultation to ask your specific question directly.
          </p>
          <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <Link href="/assessment" className="btn btn-amber btn-arrow">Take the Assessment</Link>
            <Link href="/consultation" className="btn btn-secondary" style={{ background: 'transparent', color: 'var(--paper)', borderColor: 'var(--paper)' }}>
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
