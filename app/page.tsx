import Link from 'next/link';
import Image from 'next/image';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatCard } from '@/components/ui/StatCard';
import { FeatureRow } from '@/components/ui/FeatureRow';
import { Badge } from '@/components/ui/Badge';
import { TESTIMONIALS } from '@/lib/testimonials';

export default function Home() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="bg-navy min-h-[88vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-ink/80 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <Badge variant="amber">Cohort 1 · Starts June 6, 2026</Badge>
              <h1 className="font-serif text-display-xl text-white mt-6 text-balance leading-[1.05]
                             max-[768px]:text-display-sm">
                Build evidence.<br/>
                <span className="text-amber italic">Not just credentials.</span>
              </h1>
              <p className="text-paper/70 text-xl mt-6 max-w-lg leading-relaxed max-[768px]:text-base">
                A 12-week accelerator for PM and BA. Real work. Real portfolio.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/assessment"
                  className="bg-amber hover:bg-amber-dark text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px] inline-flex items-center">
                  Take the Assessment
                </Link>
                <Link href="/accelerator"
                  className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px] inline-flex items-center">
                  Explore the Program
                </Link>
              </div>
              <p className="text-paper/40 text-sm tracking-wide mt-8">
                1,000+ trained · Since 2019 · Lagos · London · Toronto
              </p>
            </div>

            {/* Right image */}
            <div className="hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85"
                alt="Product and business analysis professionals in a workshop session"
                width={560}
                height={520}
                className="rounded-2xl object-cover shadow-2xl w-full"
                style={{ height: 520 }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ROW ────────────────────────────────────────── */}
      <section className="bg-navy border-t border-paper/10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-paper/10">
            <StatCard value="1,000+" label="Trained Globally" sub="Since 2019" />
            <StatCard value="Since 2019" label="Heritage" sub="Repositioned 2026" />
            <StatCard value="2 Pathways" label="PM & BA" sub="Cohort 1 open" />
          </div>
        </div>
      </section>

      {/* ─── PROOF SECTION ────────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <SectionLabel>The problem we solve</SectionLabel>
            <h2 className="font-serif text-display-md text-navy">
              Most people don't have a learning problem.
              <br/>
              <span className="text-amber italic">They have a proof problem.</span>
            </h2>
          </div>

          {/* Before → After table */}
          <div className="max-w-3xl">
            {[
              { before: 'I have 3 certificates', after: 'Here is my portfolio' },
              { before: 'I finished the course', after: 'Here is what I built' },
              { before: 'I attended X program', after: 'Here is my capstone' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 py-5 border-b border-ink/10">
                <p className="text-ink/50 text-base italic">&ldquo;{row.before}&rdquo;</p>
                <span className="text-amber font-bold text-lg flex-shrink-0">→</span>
                <p className="text-navy font-bold text-base">{row.after}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/accelerator"
              className="text-amber font-bold border-b border-amber/40 pb-px hover:border-amber transition-colors">
              See how it works →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOUR STEPS ───────────────────────────────────────── */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel light>How Upthrust Works</SectionLabel>
          <h2 className="font-serif text-display-md text-white mb-12">
            Four steps. Each one earns the next.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { n: '01', title: 'Assess', desc: 'Discover where your instincts actually point.' },
              { n: '02', title: 'Choose a Pathway', desc: 'PM or BA — based on evidence, not assumption.' },
              { n: '03', title: 'Build Evidence', desc: '12 weeks of real work that goes into your portfolio.' },
              { n: '04', title: 'Earn your Passport', desc: 'A verified record of what you can do.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-colors">
                <p className="font-serif text-5xl text-amber/40 mb-4 leading-none">{n}</p>
                <p className="font-bold text-white text-xl mb-2">{title}</p>
                <p className="text-paper/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/assessment"
              className="inline-flex items-center bg-amber hover:bg-amber-dark text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200">
              Start with the Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PATHWAYS ─────────────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel>Choose your pathway</SectionLabel>
          <h2 className="font-serif text-display-sm text-navy mb-12">
            Build evidence in the discipline you&rsquo;re moving toward.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* PM */}
            <div className="bg-white border border-paper/50 rounded-2xl p-8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
              <Badge variant="green">Cohort 1 · Open</Badge>
              <h3 className="font-serif text-2xl text-navy mt-4 mb-3">Product Management</h3>
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {['→ Own the product direction', '→ Write PRDs & roadmaps', '→ Set metrics & strategy'].map(b => (
                  <li key={b} className="text-ink/70 text-sm">{b}</li>
                ))}
              </ul>
              <Link href="/pathway-product-management"
                className="w-full text-center bg-navy hover:bg-ink text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 block">
                Explore PM Pathway
              </Link>
            </div>

            {/* BA */}
            <div className="bg-white border border-paper/50 rounded-2xl p-8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
              <Badge variant="amber">Cohort 1 · Open</Badge>
              <h3 className="font-serif text-2xl text-navy mt-4 mb-3">Business Analysis</h3>
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {['→ Elicit & document requirements', '→ Write BRDs & process maps', '→ Lead UAT & testing'].map(b => (
                  <li key={b} className="text-ink/70 text-sm">{b}</li>
                ))}
              </ul>
              <Link href="/pathway-business-analysis"
                className="w-full text-center bg-amber hover:bg-amber-dark text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 block">
                Explore BA Pathway
              </Link>
            </div>

            {/* Design */}
            <div className="bg-white border border-dashed border-paper/50 rounded-2xl p-8 flex flex-col opacity-70">
              <Badge variant="navy">Cohort 2 · Waitlist</Badge>
              <h3 className="font-serif text-2xl text-navy mt-4 mb-3">Product Design</h3>
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {['→ User journeys & wireframes', '→ Design systems basics', '→ Figma handoff workflow'].map(b => (
                  <li key={b} className="text-ink/40 text-sm">{b}</li>
                ))}
              </ul>
              <Link href="/assessment"
                className="w-full text-center border-2 border-navy/20 hover:border-navy text-navy py-3.5 rounded-xl font-bold text-sm transition-all duration-200 block">
                Join Cohort 2 Waitlist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PASSPORT ─────────────────────────────────────────── */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: feature rows */}
            <div>
              <SectionLabel light>Capability Passport</SectionLabel>
              <h2 className="font-serif text-display-sm text-white mb-8">
                A certificate says you attended.
                <br/>
                <span className="text-amber italic">Your Passport shows what you can do.</span>
              </h2>
              <FeatureRow icon="📋" title="Scored against a rubric" description="Not just completion — every capability has a benchmark." />
              <FeatureRow icon="✍️" title="Backed by real work" description="Every score has an artefact behind it." />
              <FeatureRow icon="👤" title="Signed by a facilitator" description="Who reviewed your capstone and knows what you produced." />
              <FeatureRow icon="🔗" title="Verifiable by employers" description="A unique Passport ID they can check." />
            </div>

            {/* Right: mock passport card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-paper/40 text-xs tracking-widest uppercase mb-6">
                Upthrust Capability Passport
              </p>
              <p className="font-serif text-paper text-xl mb-6">Learner Name</p>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Product Thinking', pct: 80 },
                  { label: 'Requirements Elicitation', pct: 87 },
                  { label: 'Stakeholder Management', pct: 75 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-paper/70 font-medium">{label}</span>
                      <span className="text-amber font-bold">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-paper/40 text-xs tracking-wide">Cohort 1 · 2026 · Verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Outcomes</SectionLabel>
            <h2 className="font-serif text-display-sm text-navy">What our alumni say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => {
              const initials = t.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
              return (
                <div key={t.id}
                  className="bg-white rounded-2xl p-8 border border-paper/50 shadow-sm flex flex-col">
                  <blockquote className="font-serif italic text-ink/80 leading-relaxed mb-6 flex-1 text-base line-clamp-4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 pt-6 border-t border-paper/50">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} width={44} height={44}
                        className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-navy text-paper flex items-center justify-center font-serif font-medium text-sm flex-shrink-0">
                        {initials}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-navy text-sm">{t.name}</p>
                      <p className="text-amber text-xs font-bold mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="bg-amber py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-display-sm text-white mb-4">
            Stop collecting certificates. Start building evidence.
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            12 weeks. Real portfolio. A Passport employers can verify.
          </p>
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
