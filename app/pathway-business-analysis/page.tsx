import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';

const BA_WEEKS = [
  { wk: 'Week 1',  title: 'Business Problem Framing',      desc: 'Scope a business problem from a vague brief' },
  { wk: 'Week 2',  title: 'Stakeholder Analysis',          desc: 'Stakeholder map and RACI matrix' },
  { wk: 'Week 3',  title: 'Business Case',                 desc: 'Justify the initiative with a structured business case' },
  { wk: 'Week 4',  title: 'Requirements Elicitation',      desc: 'Structured elicitation notes from a stakeholder session' },
  { wk: 'Week 5',  title: 'As-Is Process Map',             desc: 'Document the current state with all exceptions' },
  { wk: 'Week 6',  title: 'To-Be Process Design',          desc: 'Redesigned future state with rationale' },
  { wk: 'Week 7',  title: 'BRD — Part 1',                  desc: 'Functional requirements and business rules' },
  { wk: 'Week 8',  title: 'BRD — Part 2 + User Stories',   desc: 'Non-functional requirements and INVEST user stories' },
  { wk: 'Week 9',  title: 'Stakeholder Facilitation Sim',  desc: 'Handle conflicting requirements under pressure live' },
  { wk: 'Week 10', title: 'UAT Planning',                   desc: 'UAT scenarios, test cases, and acceptance criteria' },
  { wk: 'Week 11', title: 'Reporting Framework',           desc: 'Post-launch reporting and continuous improvement plan' },
  { wk: 'Week 12', title: 'Capstone Defence',              desc: 'Present and defend your full BA case study' },
];

export default function BAPathwayPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="bg-navy min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-ink/80 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
            <div>
              <Badge variant="amber">Cohort 1 · Open Now</Badge>
              <h1 className="font-serif text-display-lg text-white mt-6 text-balance max-[768px]:text-display-sm">
                Make the ambiguous
                <span className="text-amber italic"> actionable.</span>
              </h1>
              <p className="text-paper/70 text-xl mt-5 max-w-lg leading-relaxed">
                Elicit requirements, map processes, and write BRDs that ship.
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
                { icon: '📋', label: 'Full Business Requirements Doc' },
                { icon: '🔄', label: 'As-Is & To-Be Process Maps' },
                { icon: '✅', label: 'UAT Pack & Test Scenarios' },
                { icon: '👥', label: 'User Stories with Acceptance Criteria' },
                { icon: '🎯', label: 'BA Case Study' },
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
          <SectionLabel>Who chooses BA</SectionLabel>
          <h2 className="font-serif text-display-sm text-navy mb-12">You probably belong here if&hellip;</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'You ask "what do you actually mean by that?" when given a vague requirement.',
              'You believe the act of documenting reveals where the thinking is unfinished.',
              'You see edge cases where most people only see the happy path.',
              'You enjoy being the bridge between business and engineering.',
              'You take satisfaction from a process map that captures every handoff.',
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
          <SectionLabel light>BA-specific work</SectionLabel>
          <h2 className="font-serif text-display-sm text-white mb-12">What you&rsquo;ll actually do — week by week.</h2>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            {BA_WEEKS.map(({ wk, title, desc }, i) => (
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
            A BA portfolio that proves you can deliver from day one.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: '📋', title: 'Full BRD', desc: 'That another BA would respect' },
              { icon: '🔄', title: 'Process Maps', desc: 'As-Is & To-Be documented' },
              { icon: '✅', title: 'UAT Pack', desc: 'Test scenarios & edge cases' },
              { icon: '👥', title: 'User Stories', desc: 'INVEST-grade with AC' },
              { icon: '💬', title: 'Story Bank', desc: '8–10 interview stories' },
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
              { level: 'Entry level', role: 'Junior / Associate BA', salary: '₦500K–1M / £30K–42K', body: 'BA roles in banks, fintechs, SaaS, and consultancies. Your BRD proves you can produce on day one.' },
              { level: 'Entry–Mid', role: 'Product Operations / BA', salary: '₦800K–1.8M / £35K–50K', body: 'Hybrid product-BA role. Requirements, traceability, UAT, and process design.' },
              { level: 'Internal move', role: 'Ops → Business Analyst', salary: '+25–50% salary lift typical', body: 'Formalising from ops or support into a defined BA role. The portfolio makes it credible.' },
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
          <h2 className="font-serif text-display-sm text-white mb-4">Is BA actually your fit?</h2>
          <p className="text-white/80 text-lg mb-8">Many people discover they&rsquo;re a natural BA before they can name it.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/assessment"
              className="bg-white text-amber hover:bg-paper px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px] inline-flex items-center">
              Take the Assessment — 8 min
            </Link>
            <Link href="/pathway-product-management"
              className="border-2 border-white/40 hover:border-white text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px] inline-flex items-center">
              Compare with PM →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
