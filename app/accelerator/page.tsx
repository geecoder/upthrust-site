import Link from 'next/link';
import Image from 'next/image';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';
import Pricing from '@/components/Pricing';
import CapstonesInteractive from '@/components/CapstonesInteractive';

const WEEKS = [
  { wk: 'Week 0',  title: 'Onboarding & Diagnostic',              desc: 'Baseline assessment, tool setup, pathway confirmation' },
  { wk: 'Week 1',  title: 'Digital Product Foundations',           desc: 'How real product teams work across all roles' },
  { wk: 'Week 2',  title: 'Problem Discovery',                     desc: 'Define user and business problems before jumping to solutions' },
  { wk: 'Week 3',  title: 'Product Strategy & Business Context',   desc: 'Connect problems to goals, MVP scope, and success measures' },
  { wk: 'Week 4',  title: 'Requirements & Scope',                  desc: 'Turn ideas into clear requirements and user stories' },
  { wk: 'Week 5',  title: 'Journey, Workflow & Process Design',    desc: 'Map journeys, processes, workflows, and edge cases' },
  { wk: 'Week 6',  title: 'UX & Product Design Foundations',       desc: 'Personas, journey maps, information architecture' },
  { wk: 'Week 7',  title: 'Prototyping & Design Systems',          desc: 'Figma workflows, handoff norms, design system thinking' },
  { wk: 'Week 8',  title: 'Agile Delivery & Backlog',              desc: 'Epics, stories, sprint flow, DoR and DoD' },
  { wk: 'Week 9',  title: 'Stakeholder Management',                desc: 'Vague requests, scope pressure, trade-off conversations' },
  { wk: 'Week 10', title: 'Testing, UAT & Launch Readiness',       desc: 'UAT scenarios, release checklists, go-live controls' },
  { wk: 'Week 11', title: 'Metrics & Continuous Improvement',      desc: 'Define success, funnels, activation, feedback loops' },
  { wk: 'Week 12', title: 'Capstone Defence & Portfolio Review',   desc: 'Present and defend. Capability Passport. Demo Day.' },
];

const RHYTHM = [
  { n: '01', title: 'Concept Class',      meta: '90 min · Live',        desc: 'The weekly idea explained by a practitioner who has done the work.' },
  { n: '02', title: 'Real-World Case',    meta: '30 min · Live',        desc: 'A realistic product scenario showing the concept in action.' },
  { n: '03', title: 'Practical Lab',      meta: '60 min · Live',        desc: 'Guided hands-on session. You practise with a facilitator watching.' },
  { n: '04', title: 'Weekly Assignment',  meta: 'Self-paced · 3–4 hrs', desc: 'A tangible deliverable that goes straight into your portfolio.' },
  { n: '05', title: 'Feedback Review',    meta: 'Async · 1 hr',         desc: 'Structured feedback on your submission from facilitators.' },
  { n: '06', title: 'Reflection & Prep',  meta: 'Self-paced · 30 min',  desc: 'Review what you learned and prepare for the next week.' },
];

export default function AcceleratorPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="bg-navy min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-ink/80 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
            <div>
              <Badge variant="amber">Career Capability Accelerator · Cohort 1</Badge>
              <h1 className="font-serif text-display-lg text-white mt-6 text-balance max-[768px]:text-display-sm">
                Twelve weeks. Real work.
                <span className="text-amber italic"> Evidence at the end.</span>
              </h1>
              <p className="text-paper/70 text-xl mt-5 max-w-lg leading-relaxed">
                Build portfolio-grade deliverables. Earn a Capability Passport.
              </p>
              {/* Stat pills */}
              <div className="flex flex-wrap gap-2 mt-6">
                {['12 weeks', '15–25 learners', '8–10 hrs/week', 'Live + async'].map(p => (
                  <span key={p} className="bg-white/10 text-paper/80 px-4 py-2 rounded-full text-sm font-medium">
                    {p}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
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

            <div className="hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=85"
                alt="Cohort learning session"
                width={520}
                height={480}
                className="rounded-2xl object-cover shadow-2xl w-full"
                style={{ height: 480 }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARKET STATS ─────────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel>Why now</SectionLabel>
          <h2 className="font-serif text-display-sm text-navy mb-12">
            The market is moving from credentials to capability.
          </h2>
          <div className="divide-y divide-ink/10">
            {[
              { pct: '85%', label: 'Employers prioritise portfolio over CV',    quote: '"Show me what you built"' },
              { pct: '78%', label: 'Value capability demo over certification',   quote: '"Not what you studied"' },
              { pct: '91%', label: 'Prefer capstone to course completion',       quote: '"Show me your capstone"' },
              { pct: '83%', label: 'Want active builders not passive learners',  quote: '"Show me what you did"' },
            ].map(({ pct, label, quote }) => (
              <div key={pct} className="flex items-center gap-8 py-6">
                <p className="font-serif text-5xl text-amber flex-shrink-0 w-28 leading-none">{pct}</p>
                <p className="font-bold text-navy text-lg flex-1">{label}</p>
                <p className="text-ink/50 text-sm italic hidden md:block">{quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WEEKLY RHYTHM ────────────────────────────────────── */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel light>How the accelerator works</SectionLabel>
          <h2 className="font-serif text-display-sm text-white mb-12">
            The weekly rhythm that turns concept into capability.
          </h2>
          <div className="divide-y divide-white/10">
            {RHYTHM.map(({ n, title, meta, desc }) => (
              <div key={n} className="flex gap-6 py-5 items-start">
                <p className="font-serif text-3xl text-amber/40 w-12 flex-shrink-0 leading-none">{n}</p>
                <div className="flex-1">
                  <p className="font-bold text-white text-base">{title}</p>
                  <p className="text-paper/60 text-sm mt-1">{desc}</p>
                </div>
                <p className="text-paper/30 text-xs font-medium hidden sm:block flex-shrink-0">{meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CURRICULUM ───────────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel>12-week curriculum</SectionLabel>
          <h2 className="font-serif text-display-sm text-navy mb-12">Each week builds on the last.</h2>
          <div className="rounded-2xl overflow-hidden border border-ink/10">
            {WEEKS.map(({ wk, title, desc }, i) => (
              <div key={wk}
                className={`flex items-center gap-6 px-6 py-4 border-b border-ink/5 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-paper'}`}>
                <span className="text-xs font-bold text-amber uppercase tracking-widest w-16 flex-shrink-0">{wk}</span>
                <p className="font-bold text-navy text-sm flex-1">{title}</p>
                <p className="text-ink/50 text-xs text-right ml-auto hidden md:block max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DELIVERABLES ─────────────────────────────────────── */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel light>What you walk out with</SectionLabel>
          <h2 className="font-serif text-display-sm text-white mb-12">Evidence, not attendance.</h2>
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
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel>Investment</SectionLabel>
          <h2 className="font-serif text-display-sm text-navy mb-12">Choose your experience.</h2>
          <Pricing />
        </div>
      </section>

      {/* ─── CAPSTONES ────────────────────────────────────────── */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel light>Cohort 1 capstone projects</SectionLabel>
          <h2 className="font-serif text-display-sm text-white mb-4">Real briefs. Real industries.</h2>
          <p className="text-paper/60 text-lg mb-12">Eight product briefs across fintech, health tech, logistics, and more.</p>
          <CapstonesInteractive />
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-amber py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-display-sm text-white mb-4">
            Twelve weeks from now, you&rsquo;ll have something to show.
          </h2>
          <p className="text-white/80 text-lg mb-8">The first step is the Career Assessment — 8 minutes.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/assessment"
              className="bg-white text-amber hover:bg-paper px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px] inline-flex items-center">
              Take the Assessment
            </Link>
            <Link href="/consultation"
              className="border-2 border-white/40 hover:border-white text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px] inline-flex items-center">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
