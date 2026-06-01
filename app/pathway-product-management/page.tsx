import Link from 'next/link';
import { HeroSwirl } from '@/components/HeroSwirl';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { LottiePlayer } from '@/components/ui/LottiePlayer';

const PM_FAQ = [
  { q: 'Do I need a tech background?', a: 'No. You need curiosity, clarity of thought, and the ability to write clearly. Most successful learners come from non-tech backgrounds.' },
  { q: 'How is this different from other PM courses?', a: 'You practise the work every week under real conditions. By Week 12 you have 12 portfolio artefacts and a capstone you defended — not a certificate of completion.' },
  { q: 'Can I switch from the PM to BA pathway?', a: 'Yes, within the first 2 weeks. After that, the pathway-specific work has diverged enough that switching is impractical. Take the assessment before enrolling.' },
  { q: 'What does the Capability Passport include?', a: 'Assessed capability areas against a published rubric, artefacts you produced, capstone defence score, facilitator sign-off, and a unique ID employers can verify.' },
];

export default function PMPathwayPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] bg-navy overflow-hidden flex items-center">
        <HeroSwirl />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber/12 border border-amber/25 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-amber rounded-full animate-pulse flex-shrink-0" />
              <span className="text-amber text-xs font-bold tracking-[0.15em] uppercase">PM Pathway · Cohort 1 Open</span>
            </div>
            <h1 className="font-serif text-hero-md lg:text-hero text-white mb-5 max-[768px]:text-hero-md">
              Build evidence as a<br />
              <span className="text-amber">Product Manager.</span>
            </h1>
            <p className="text-paper/65 text-xl leading-relaxed max-w-lg mb-8">
              Gain the mindset, skills, and portfolio of artefacts to land your first PM role or grow confidently from where you are.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/assessment" className="group inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white font-bold px-8 py-4 rounded-2xl transition-all text-base shadow-amber hover:shadow-lg hover:shadow-amber/30 min-h-[44px]">
                Take the Assessment <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="/consultation" className="border-2 border-white/20 hover:border-white/50 text-white font-bold px-8 py-4 rounded-2xl transition-all min-h-[44px] inline-flex items-center">
                Book a Call
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {['12 weeks', '15–25 learners', '8–10 hrs/week', 'Live + async'].map(p => (
                <span key={p} className="bg-white/8 text-paper/70 text-xs font-medium px-3 py-1.5 rounded-full">{p}</span>
              ))}
            </div>
          </div>

          {/* Deliverable preview card */}
          <div className="hidden lg:block">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-paper/40 text-xs font-bold tracking-widest uppercase mb-6">You&rsquo;ll build</p>
              {[
                { icon: '📋', label: 'Full PRD',                 desc: 'Production-ready' },
                { icon: '🗺️', label: 'Product Strategy Canvas', desc: 'Week 3 artefact' },
                { icon: '🚀', label: 'Sprint Backlog',           desc: 'Agile delivery' },
                { icon: '📊', label: 'Metrics Plan',             desc: 'Post-launch' },
                { icon: '🏆', label: 'Capstone Presentation',   desc: 'Demo Day' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 py-3 border-b border-white/8 last:border-0">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-paper text-sm font-medium flex-1">{item.label}</span>
                  <span className="text-paper/30 text-xs">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU'LL LEARN ────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-5">What you&rsquo;ll learn</p>
              <h2 className="font-serif text-h2 text-navy mb-10">Build the skills every modern PM needs.</h2>
              <div>
                {[
                  ['Strategic Product Thinking', 'Shift from execution to outcomes — master PM mindset and core frameworks.'],
                  ['Problem Discovery',          'Run user research, frame problems, and uncover high-impact opportunities.'],
                  ['Requirements & Roadmapping', 'Write production-ready PRDs and build roadmaps that drive real results.'],
                  ['Agile Delivery',             'Sprint planning, backlog management, and working with engineering.'],
                  ['Launch Planning',            'Go-to-market, UAT, post-launch measurement, and iteration.'],
                  ['Stakeholder Management',     'Influence without authority — facilitate reviews and defend decisions.'],
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-5 py-5 border-b border-gray-100 last:border-0">
                    <div className="w-6 h-6 rounded-full bg-amber/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-bold text-navy text-base mb-1">{title}</p>
                      <p className="text-ink-soft text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-start pt-16">
              <LottiePlayer
                src="https://lottie.host/3abf2e74-3c9e-4bef-9e80-11e7fdae4d67/E2xNnWCrxI.lottie"
                loop={true}
                width={360}
                height={360}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ──────────────────────────────────── */}
      <section className="bg-paper py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-5">What&rsquo;s included</p>
              <h2 className="font-serif text-h2 text-navy mb-8">Everything you need. Nothing you don&rsquo;t.</h2>
              <div className="space-y-0">
                {[
                  'Live sessions with Genesis — every week',
                  'Weekly portfolio assignments with rubric',
                  'AI-powered instant feedback on submissions',
                  'Expert human review within 48 hours',
                  'Capability Passport (Premium tier)',
                  'Access to cohort community',
                  'Career positioning support',
                ].map(item => (
                  <div key={item} className="flex gap-4 py-3.5 border-b border-ink/8 last:border-0">
                    <span className="text-moss mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-ink-soft text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-navy rounded-2xl p-8 text-paper">
              <p className="text-amber text-xs font-bold tracking-widest uppercase mb-6">Program format</p>
              <div className="space-y-4">
                {[
                  ['Duration',     '12 weeks'],
                  ['Cohort size',  '15–25 learners'],
                  ['Weekly time',  '8–10 hrs/week'],
                  ['Format',       'Live + async'],
                  ['Start date',   'June 6, 2026'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <span className="text-paper/50 text-sm">{label}</span>
                    <span className="text-paper font-semibold text-sm">{value}</span>
                  </div>
                ))}
              </div>
              <Link href="/assessment" className="mt-8 block w-full text-center bg-amber hover:bg-amber-dark text-white font-bold py-3.5 rounded-xl transition-all text-sm">
                Take the Assessment First →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO IS THIS FOR ──────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4">Is this for you?</p>
          <h2 className="font-serif text-h2 text-navy mb-12">Three people who belong here.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🔄', title: 'Career Switchers', body: 'Moving from adjacent roles — ops, BA, engineering, marketing — into product management. You have instincts. Upthrust gives you the language and the evidence.' },
              { icon: '📍', title: 'Early-Career PMs', body: 'You have a PM title but your portfolio is thin. Build the artefacts that make you credible for your next move — or your first real PM role.' },
              { icon: '🌍', title: 'Relocating Professionals', body: 'You moved (or are moving) to the UK, Canada, or Australia. Your existing experience doesn\'t translate cleanly. This program builds evidence that reads globally.' },
            ].map(card => (
              <div key={card.title} className="bg-white border border-gray-100 rounded-2xl p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <span className="text-3xl mb-4 block">{card.icon}</span>
                <p className="font-bold text-navy text-base mb-2">{card.title}</p>
                <p className="text-ink-soft text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="bg-paper py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4 text-center">How it works</p>
          <h2 className="font-serif text-h2 text-navy text-center mb-12">Three steps to your Passport.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: '01', title: 'Take the assessment', body: 'Discover your pathway — 12 scenarios, 8 minutes, a result backed by your own answers.' },
              { n: '02', title: 'Join the cohort',     body: '12 weeks of live sessions, weekly assignments, and real portfolio artefacts.' },
              { n: '03', title: 'Earn your Passport',  body: 'A verifiable credential that shows employers exactly what you can do.' },
            ].map(s => (
              <div key={s.n} className="text-center">
                <p className="font-serif text-5xl text-amber font-light mb-4">{s.n}</p>
                <p className="font-bold text-navy text-lg mb-3">{s.title}</p>
                <p className="text-ink-soft text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-3 text-center">FAQ</p>
          <h2 className="font-serif text-h2 text-navy text-center mb-12">Common questions</h2>
          <FAQAccordion items={PM_FAQ} />
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="bg-amber py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-h2 text-white mb-4">Ready to build your PM evidence?</h2>
          <p className="text-white/75 text-lg mb-10">Start with the 8-minute Career Assessment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment" className="bg-white text-amber font-bold px-8 py-4 rounded-2xl hover:bg-amber-light transition-colors text-base min-h-[44px] inline-flex items-center justify-center">
              Take the Assessment →
            </Link>
            <Link href="/pathway-business-analysis" className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:border-white/60 transition-colors text-base min-h-[44px] inline-flex items-center justify-center">
              Compare with BA →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
