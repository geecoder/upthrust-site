import Link from 'next/link';
import { HeroSwirl } from '@/components/HeroSwirl';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { LottiePlayer } from '@/components/ui/LottiePlayer';

const BA_FAQ = [
  { q: 'Do I need a technical background?', a: 'No. You need to be comfortable with computers, able to write clearly, and willing to learn product vocabulary. Most successful learners come from operations, support, or analytical roles.' },
  { q: 'How is this different from BA courses I\'ve seen?', a: 'You practise real BA work every week: elicitation sessions, writing BRDs, mapping processes, running UAT. By Week 12 you have 12 documented artefacts, not a certificate.' },
  { q: 'I\'m already a junior BA — will this help me?', a: 'Yes. If your title says BA but your portfolio doesn\'t reflect it, this program will give you the documented evidence to grow into senior roles.' },
  { q: 'What\'s the difference between Standard and Premium?', a: 'Standard gives you the full program, templates, and community. Premium adds 1:1 portfolio review, mock interview, enhanced feedback, and Capability Passport eligibility.' },
];

export default function BAPathwayPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] bg-navy overflow-hidden flex items-center">
        <HeroSwirl />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber/12 border border-amber/25 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-amber rounded-full animate-pulse flex-shrink-0" />
              <span className="text-amber text-xs font-bold tracking-[0.15em] uppercase">BA Pathway · Cohort 1 Open</span>
            </div>
            <h1 className="font-serif text-hero-md lg:text-hero text-white mb-5 max-[768px]:text-hero-md">
              Build evidence as a<br />
              <span className="text-amber">Business Analyst.</span>
            </h1>
            <p className="text-paper/65 text-xl leading-relaxed max-w-lg mb-8">
              Gain the skills, documentation discipline, and portfolio to land your first BA role or advance to senior level.
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
                { icon: '📄', label: 'Full BRD',           desc: 'Functional + non-functional' },
                { icon: '🔄', label: 'Process Maps',       desc: 'As-Is & To-Be' },
                { icon: '✅', label: 'UAT Pack',            desc: 'Test scenarios & edge cases' },
                { icon: '👥', label: 'Stakeholder Map',    desc: 'RACI & influence map' },
                { icon: '🏆', label: 'Capstone Case Study', desc: 'Demo Day' },
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
              <h2 className="font-serif text-h2 text-navy mb-10">Build the core BA skills that employers need.</h2>
              <div>
                {[
                  ['Requirements Elicitation',    'Structure and run discovery sessions with vague stakeholders.'],
                  ['Business Requirements Docs',   'Write BRDs that engineers and PMs can actually act on.'],
                  ['Process Mapping & Analysis',   'Document current and future state with all exceptions captured.'],
                  ['Stakeholder Management',       'Navigate conflicting priorities and build stakeholder buy-in.'],
                  ['UAT & Quality Assurance',      'Design test scenarios that catch what others miss before go-live.'],
                  ['Business Case Development',    'Justify initiatives with structured business cases that hold up to scrutiny.'],
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
                src="https://lottie.host/e6f96dad-66bb-4e90-b3d8-b3b0cbf27e09/KBnXBWcXSd.lottie"
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
              <h2 className="font-serif text-h2 text-navy mb-8">Everything you need to graduate job-ready.</h2>
              <div className="space-y-0">
                {[
                  'Live sessions with Genesis — every week',
                  'Weekly BA assignments with rubric scoring',
                  'AI-powered instant feedback on submissions',
                  'Expert human review within 48 hours',
                  'Capability Passport (Premium tier)',
                  'Cohort community access',
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
                  ['Duration',    '12 weeks'],
                  ['Cohort size', '15–25 learners'],
                  ['Weekly time', '8–10 hrs/week'],
                  ['Format',      'Live + async'],
                  ['Start date',  'June 6, 2026'],
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
              { icon: '📊', title: 'Ops Professionals → BA', body: 'You\'ve been doing BA work without the title. Formalise what you already do with documented evidence that makes the transition explicit.' },
              { icon: '📍', title: 'Early-Career BAs', body: 'You have the role but not the portfolio. Build BRDs, stakeholder maps, and UAT packs that prove you can produce on day one.' },
              { icon: '🌍', title: 'International Repositioners', body: 'Your work history doesn\'t translate cleanly to UK or Canadian BA norms. Build portfolio evidence that reads to Western teams.' },
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

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-3 text-center">FAQ</p>
          <h2 className="font-serif text-h2 text-navy text-center mb-12">Common questions</h2>
          <FAQAccordion items={BA_FAQ} />
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="bg-amber py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-h2 text-white mb-4">Ready to build your BA evidence?</h2>
          <p className="text-white/75 text-lg mb-10">Start with the 8-minute Career Assessment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment" className="bg-white text-amber font-bold px-8 py-4 rounded-2xl hover:bg-amber-light transition-colors text-base min-h-[44px] inline-flex items-center justify-center">
              Take the Assessment →
            </Link>
            <Link href="/pathway-product-management" className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:border-white/60 transition-colors text-base min-h-[44px] inline-flex items-center justify-center">
              Compare with PM →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
