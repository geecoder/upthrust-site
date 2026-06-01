import Link from 'next/link';
import { HeroSwirl } from '@/components/HeroSwirl';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import Pricing from '@/components/Pricing';
import CapstonesInteractive from '@/components/CapstonesInteractive';

const WEEKS = [
  { wk: 'Week 0',  title: 'Onboarding & Diagnostic',            desc: 'Baseline assessment, tool setup, pathway confirmation' },
  { wk: 'Week 1',  title: 'Digital Product Foundations',         desc: 'How real product teams work across all roles' },
  { wk: 'Week 2',  title: 'Problem Discovery',                   desc: 'Define user and business problems before solutions' },
  { wk: 'Week 3',  title: 'Product Strategy & Business Context', desc: 'Connect problems to goals, MVP scope, and measures' },
  { wk: 'Week 4',  title: 'Requirements & Scope',                desc: 'Turn ideas into clear requirements and user stories' },
  { wk: 'Week 5',  title: 'Journey, Workflow & Process Design',  desc: 'Map journeys, processes, workflows, and edge cases' },
  { wk: 'Week 6',  title: 'UX & Product Design Foundations',     desc: 'Personas, journey maps, information architecture' },
  { wk: 'Week 7',  title: 'Prototyping & Design Systems',        desc: 'Figma workflows, handoff norms, design system thinking' },
  { wk: 'Week 8',  title: 'Agile Delivery & Backlog',            desc: 'Epics, stories, sprint flow, DoR and DoD' },
  { wk: 'Week 9',  title: 'Stakeholder Management',              desc: 'Vague requests, scope pressure, trade-off conversations' },
  { wk: 'Week 10', title: 'Testing, UAT & Launch Readiness',     desc: 'UAT scenarios, release checklists, go-live controls' },
  { wk: 'Week 11', title: 'Metrics & Continuous Improvement',    desc: 'Define success, funnels, activation, feedback loops' },
  { wk: 'Week 12', title: 'Capstone Defence & Portfolio Review', desc: 'Present and defend. Capability Passport. Demo Day.' },
];

const ACCEL_FAQ = [
  { q: 'What exactly is the Career Capability Accelerator?', a: 'A 12-week practical program for PM or BA — live sessions, weekly portfolio assignments, AI feedback, and expert review. Eligible learners earn a Capability Passport: a verifiable record of what you produced.' },
  { q: 'How much time per week does this take?', a: 'Plan for 8–10 hours: 2 hrs live, 1 hr lab, 3–4 hrs assignment, 1 hr feedback. People doing less than 6 hours tend to fall behind by Week 3.' },
  { q: 'What is the difference between Standard and Premium?', a: 'Standard: full program, templates, community, certificate. Premium adds: 1:1 portfolio review, mock interview, enhanced feedback, Capability Passport eligibility, Demo Day spotlight.' },
  { q: 'Can I switch pathways mid-program?', a: 'In rare cases yes — within the first 2 weeks. After that, pathway-specific work has diverged. Take the assessment and consultation before enrolling.' },
  { q: 'Do you offer payment plans?', a: 'Yes. Both Standard and Premium can be paid in two installments. Discuss your plan on the consultation call.' },
];

export default function AcceleratorPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-navy min-h-[80vh] flex items-center overflow-hidden">
        <HeroSwirl />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber/12 border border-amber/25 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 bg-amber rounded-full animate-pulse flex-shrink-0" />
                <span className="text-amber text-xs font-bold tracking-[0.15em] uppercase">Career Capability Accelerator · Cohort 1</span>
              </div>
              <h1 className="font-serif text-hero-md lg:text-hero text-white mb-5 max-[768px]:text-hero-md">
                Twelve weeks. Real work.<br />
                <span className="text-amber">Evidence at the end.</span>
              </h1>
              <p className="text-paper/65 text-xl leading-relaxed max-w-lg mb-8">
                Build portfolio-grade deliverables. Defend your decisions. Earn a Capability Passport employers can verify.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['12 weeks', '15–25 learners', '8–10 hrs/week', 'Live + async'].map(p => (
                  <span key={p} className="bg-white/8 text-paper/70 text-xs font-medium px-3 py-1.5 rounded-full">{p}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/assessment" className="group inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-amber hover:shadow-lg hover:shadow-amber/30 text-base min-h-[44px]">
                  Take the Assessment <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link href="/consultation" className="border-2 border-white/20 hover:border-white/50 text-white font-bold px-8 py-4 rounded-2xl transition-all min-h-[44px] inline-flex items-center">
                  Book a Call
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-paper/40 text-xs font-bold tracking-widest uppercase mb-5">At a glance</p>
                {[
                  ['12', 'Weeks'],
                  ['15–25', 'Learners per cohort'],
                  ['8–10 hrs', 'Per week'],
                  ['PM + BA', 'Pathways available'],
                  ['Live + async', 'Format'],
                ].map(([v, l]) => (
                  <div key={l} className="flex justify-between items-center py-3 border-b border-white/8 last:border-0">
                    <span className="text-paper/50 text-sm">{l}</span>
                    <span className="text-paper font-semibold text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY NOW ──────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-5">Why now</p>
          <h2 className="font-serif text-h2 text-navy mb-12">The market is moving from credentials to capability.</h2>
          <div className="divide-y divide-gray-100">
            {[
              { pct: '85%', label: 'Employers prioritise portfolio over CV',       quote: '"Show me what you built"' },
              { pct: '78%', label: 'Value capability demo over certification',      quote: '"Not what you studied"' },
              { pct: '91%', label: 'Prefer capstone to course completion',          quote: '"Show me your capstone"' },
              { pct: '83%', label: 'Want active builders, not passive learners',    quote: '"Show me what you did"' },
            ].map(({ pct, label, quote }) => (
              <div key={pct} className="flex items-center gap-8 py-6">
                <p className="font-serif text-5xl text-amber font-light flex-shrink-0 w-28">{pct}</p>
                <p className="font-semibold text-navy text-lg flex-1">{label}</p>
                <p className="text-ink-soft text-sm italic hidden md:block">{quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WEEKLY RHYTHM ────────────────────────────────────── */}
      <section className="bg-paper py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4">How the accelerator works</p>
          <h2 className="font-serif text-h2 text-navy mb-12">The weekly rhythm that turns concept into capability.</h2>
          <div className="divide-y divide-gray-100">
            {[
              { n: '01', title: 'Concept Class',     meta: '90 min · Live',        desc: 'The weekly idea explained by a practitioner who has done the work.' },
              { n: '02', title: 'Real-World Case',   meta: '30 min · Live',        desc: 'A realistic product scenario showing the concept in context.' },
              { n: '03', title: 'Practical Lab',     meta: '60 min · Live',        desc: 'Guided hands-on session. You practise with a facilitator watching.' },
              { n: '04', title: 'Weekly Assignment', meta: 'Self-paced · 3–4 hrs', desc: 'A tangible deliverable that goes straight into your portfolio.' },
              { n: '05', title: 'Feedback Review',   meta: 'Async · 1 hr',         desc: 'Structured feedback from facilitators on your submission.' },
              { n: '06', title: 'Reflection & Prep', meta: 'Self-paced · 30 min',  desc: 'Consolidate what you learned and prepare for next week.' },
            ].map(({ n, title, meta, desc }) => (
              <div key={n} className="flex gap-6 py-5 items-start">
                <p className="font-serif text-3xl text-amber/50 w-10 flex-shrink-0 leading-none">{n}</p>
                <div className="flex-1">
                  <p className="font-bold text-navy text-base">{title}</p>
                  <p className="text-ink-soft text-sm mt-1">{desc}</p>
                </div>
                <p className="text-ink/30 text-xs font-medium hidden sm:block flex-shrink-0">{meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CURRICULUM ───────────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4">12-week curriculum</p>
          <h2 className="font-serif text-h2 text-navy mb-12">Each week builds on the last.</h2>
          <div className="rounded-2xl overflow-hidden border border-gray-100">
            {WEEKS.map(({ wk, title, desc }, i) => (
              <div
                key={wk}
                className={`flex items-center gap-6 px-6 py-4 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-paper/40'}`}
              >
                <span className="text-xs font-bold text-amber uppercase tracking-widest w-16 flex-shrink-0">{wk}</span>
                <p className="font-semibold text-navy text-sm flex-1">{title}</p>
                <p className="text-ink/40 text-xs text-right ml-auto hidden md:block max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DELIVERABLES ─────────────────────────────────────── */}
      <section className="bg-navy py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4">What you walk out with</p>
          <h2 className="font-serif text-h2 text-white mb-12">Evidence, not attendance.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'PM Pathway',
                items: ['Full product case study', 'PRD that another PM would respect', 'Roadmap tied to a business goal', 'Metrics plan with kill criteria', 'Interview story bank (8–10)', 'Capability Passport (Premium)'],
              },
              {
                title: 'BA Pathway',
                items: ['Full BA case study', 'BRD — functional & non-functional', 'As-Is / To-Be process maps', 'User stories with acceptance criteria', 'UAT pack + test scenarios', 'Capability Passport (Premium)'],
              },
            ].map(({ title, items }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="font-serif text-xl text-white mb-6">{title}</h3>
                <ul className="flex flex-col gap-3">
                  {items.map(item => (
                    <li key={item} className="flex gap-2 text-sm text-paper/80">
                      <span className="text-amber flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4">Investment</p>
          <h2 className="font-serif text-h2 text-navy mb-12">Choose your experience.</h2>
          <Pricing />
        </div>
      </section>

      {/* ─── CAPSTONES ────────────────────────────────────────── */}
      <section className="bg-paper py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4">Cohort 1 capstone projects</p>
          <h2 className="font-serif text-h2 text-navy mb-4">Real briefs. Real industries.</h2>
          <p className="text-ink-soft text-lg mb-12">Eight product briefs across fintech, health tech, logistics, and more. You pick one.</p>
          <CapstonesInteractive />
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-3 text-center">FAQ</p>
          <h2 className="font-serif text-h2 text-navy text-center mb-12">Common questions</h2>
          <FAQAccordion items={ACCEL_FAQ} />
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="bg-amber py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-h2 text-white mb-4">Twelve weeks from now, you&rsquo;ll have something to show.</h2>
          <p className="text-white/75 text-lg mb-10">The first step is the 8-minute Career Assessment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment" className="bg-white text-amber font-bold px-8 py-4 rounded-2xl hover:bg-amber-light transition-colors text-base min-h-[44px] inline-flex items-center justify-center">
              Take the Assessment →
            </Link>
            <Link href="/consultation" className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:border-white/60 transition-colors text-base min-h-[44px] inline-flex items-center justify-center">
              Book a Free Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
