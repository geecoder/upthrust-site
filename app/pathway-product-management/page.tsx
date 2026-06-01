import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';

const PM_WEEKS = [
  { wk: 'Week 1',  title: 'Product Teardown',            desc: 'Analyse a live product — strategy, positioning, gaps' },
  { wk: 'Week 2',  title: 'Problem Brief',                desc: 'Write a well-framed problem brief for a real scenario' },
  { wk: 'Week 3',  title: 'Strategy Canvas',              desc: 'Product strategy canvas tied to a business goal' },
  { wk: 'Week 4',  title: 'PRD — Part 1',                 desc: 'User stories, acceptance criteria, scope boundaries' },
  { wk: 'Week 5',  title: 'User Journey Map',             desc: 'End-to-end user journey with edge cases mapped' },
  { wk: 'Week 6',  title: 'UX Review',                    desc: 'Evaluate a product against UX principles' },
  { wk: 'Week 7',  title: 'PRD — Part 2',                 desc: 'Edge cases, constraints, design specs' },
  { wk: 'Week 8',  title: 'Sprint Backlog',               desc: 'Epics, stories, and DoD for one sprint' },
  { wk: 'Week 9',  title: 'Stakeholder Simulation',       desc: 'Handle vague requirements and scope pressure live' },
  { wk: 'Week 10', title: 'Launch Brief',                 desc: 'Release criteria, support readiness, comms plan' },
  { wk: 'Week 11', title: 'Metrics Plan',                 desc: 'Success metrics, funnel, kill criteria' },
  { wk: 'Week 12', title: 'Capstone Defence',             desc: 'Present and defend your full product case study' },
];

export default function PMPathwayPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="bg-navy min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-ink/80 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
            <div>
              <Badge variant="green">Cohort 1 · Open Now</Badge>
              <h1 className="font-serif text-display-lg text-white mt-6 text-balance max-[768px]:text-display-sm">
                Learn to decide what to build,
                <span className="text-amber italic"> and why.</span>
              </h1>
              <p className="text-paper/70 text-xl mt-5 max-w-lg leading-relaxed">
                Own the product direction. Write PRDs teams ship from.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/assessment"
                  className="bg-amber hover:bg-amber-dark text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px] inline-flex items-center">
                  Take the Assessment First
                </Link>
                <Link href="/consultation"
                  className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px] inline-flex items-center">
                  Book a Consultation
                </Link>
              </div>
            </div>

            {/* Deliverable preview card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hidden lg:block">
              <p className="text-paper/40 text-xs tracking-widest uppercase mb-6">What you&rsquo;ll build</p>
              {[
                { icon: '📄', label: 'Full Product Requirements Doc' },
                { icon: '🗺️', label: 'User Journey Map' },
                { icon: '📋', label: 'Sprint Backlog' },
                { icon: '📊', label: 'Metrics & Kill Criteria Plan' },
                { icon: '🎯', label: 'Product Case Study' },
                { icon: '🏆', label: 'Capability Passport (Premium)' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0">
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <p className="text-paper/80 text-sm font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─────────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel>Who chooses PM</SectionLabel>
          <h2 className="font-serif text-display-sm text-navy mb-12">You probably belong here if&hellip;</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'You ask "should we even build this?" before talking about how.',
              'You enjoy the discipline of saying no to scope creep.',
              "You care about outcomes more than outputs.",
              'You think in trade-offs — speed vs quality, scope vs date.',
              "You're comfortable with ambiguity and love shaping the question.",
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-paper/50">
                <span className="text-amber font-bold text-sm">0{i + 1}</span>
                <p className="text-ink/70 text-sm mt-2 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CURRICULUM ───────────────────────────────────────── */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel light>PM-specific work</SectionLabel>
          <h2 className="font-serif text-display-sm text-white mb-12">What you&rsquo;ll actually do — week by week.</h2>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            {PM_WEEKS.map(({ wk, title, desc }, i) => (
              <div key={wk}
                className={`flex items-center gap-6 px-6 py-4 border-b border-white/5 last:border-0 ${i % 2 === 0 ? 'bg-white/5' : 'bg-white/3'}`}>
                <span className="text-xs font-bold text-amber uppercase tracking-widest w-16 flex-shrink-0">{wk}</span>
                <p className="font-bold text-paper text-sm flex-1">{title}</p>
                <p className="text-paper/40 text-xs text-right ml-auto hidden md:block max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DELIVERABLES GRID ────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel>By Week 12</SectionLabel>
          <h2 className="font-serif text-display-sm text-navy mb-12">
            A PM portfolio hiring managers actually want to read.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: '📄', title: 'Full PRD', desc: 'That another PM would respect' },
              { icon: '🗺️', title: 'Journey Map', desc: 'End-to-end with edge cases' },
              { icon: '📋', title: 'Sprint Backlog', desc: 'Epics, stories, DoD' },
              { icon: '📊', title: 'Metrics Plan', desc: 'Success and kill criteria' },
              { icon: '💬', title: 'Story Bank', desc: '8–10 STAR-format stories' },
              { icon: '🏆', title: 'Capability Passport', desc: 'Premium tier only' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-paper/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <span className="text-3xl block mb-3">{icon}</span>
                <p className="font-bold text-navy text-sm mb-1">{title}</p>
                <p className="text-ink/50 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROLES ────────────────────────────────────────────── */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel light>After Cohort 1</SectionLabel>
          <h2 className="font-serif text-display-sm text-white mb-12">Where this can take you.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { level: 'Entry level', role: 'Associate Product Manager', salary: '₦600K–1.2M / £35K–45K', body: 'Entry-level PM roles at startups and product teams. Your portfolio shows you can do the work.' },
              { level: 'Entry–Mid', role: 'Product Owner', salary: '₦1M–2M / £40K–55K', body: 'Agile-embedded PO role. Your PRD and stakeholder work directly applies.' },
              { level: 'Internal move', role: 'Junior PM', salary: '+30–60% salary lift typical', body: 'Moving from ops or analyst into a PM role. Your case study makes the pitch credible.' },
            ].map(r => (
              <div key={r.role} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <span className="text-xs font-bold text-amber uppercase tracking-widest">{r.level}</span>
                <h3 className="font-serif text-xl text-white mt-3 mb-3">{r.role}</h3>
                <p className="text-paper/60 text-sm leading-relaxed mb-4">{r.body}</p>
                <p className="text-paper/40 text-xs font-medium">{r.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="bg-amber py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-display-sm text-white mb-4">Is PM actually your fit?</h2>
          <p className="text-white/80 text-lg mb-8">The 8-minute assessment tells you — with evidence from your own answers.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/assessment"
              className="bg-white text-amber hover:bg-paper px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px] inline-flex items-center">
              Take the Assessment — 8 min
            </Link>
            <Link href="/pathway-business-analysis"
              className="border-2 border-white/40 hover:border-white text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px] inline-flex items-center">
              Compare with BA →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
