import Link from 'next/link';
import Image from 'next/image';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FeatureRow } from '@/components/ui/FeatureRow';
import { HeroSwirl } from '@/components/HeroSwirl';
import { TESTIMONIALS } from '@/lib/testimonials';

export default function Home() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] bg-navy flex items-center py-24 overflow-hidden">
        <HeroSwirl />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-amber rounded-full animate-pulse inline-block flex-shrink-0" />
              <span className="text-amber text-xs font-bold tracking-widest uppercase">
                Cohort 1 · Starts June 6, 2026
              </span>
            </div>

            <h1
              className="font-serif text-white mb-6 text-balance"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.04em' }}
            >
              Build evidence.<br />
              <span className="text-amber italic">Not just credentials.</span>
            </h1>

            <p className="text-paper/70 text-xl leading-relaxed max-w-lg mb-8">
              A 12-week accelerator for Product Management and Business Analysis.
              Real work. Real portfolio. A Passport employers can verify.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/assessment"
                className="group inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-lg shadow-amber/20 hover:shadow-xl hover:shadow-amber/25 min-h-[44px]"
              >
                Take the Assessment
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/accelerator"
                className="inline-flex items-center border-2 border-white/20 hover:border-white/50 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px]"
              >
                Explore the Program
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-paper/40 text-sm">
              <span>1,000+ trained globally</span>
              <span className="text-paper/20">·</span>
              <span>Est. 2019</span>
              <span className="text-paper/20">·</span>
              <span>Lagos · London · Toronto</span>
            </div>
          </div>

          {/* Right: image */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-amber/10 rounded-3xl blur-2xl" />
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85"
                alt="Product and business analysis professionals collaborating in a workshop"
                width={600}
                height={500}
                className="relative rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 w-full"
                style={{ height: 500 }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ROW ────────────────────────────────────────── */}
      <section className="bg-navy border-t border-white/8 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {[
              { value: '1,000+', label: 'Trained globally' },
              { value: 'Since 2019', label: 'Heritage' },
              { value: 'PM + BA', label: 'Pathways open' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center py-8 sm:py-0">
                <p className="font-serif text-5xl text-amber font-light tracking-[-0.03em] mb-2">{value}</p>
                <p className="text-paper/50 text-sm font-medium uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOGO STRIP ───────────────────────────────────────── */}
      <section className="bg-navy py-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-paper/30 text-xs font-bold tracking-widest uppercase mb-8">
            Our learners work at and transition to companies like
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40">
            {['Access Bank', 'Flutterwave', 'Interswitch', 'PwC', 'Deloitte', 'MTN', 'KPMG', 'UBA'].map(company => (
              <span key={company} className="text-paper/60 font-bold text-sm tracking-wide whitespace-nowrap">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* ─── PROOF SECTION ────────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <SectionLabel>The problem we solve</SectionLabel>
            <h2 className="font-serif text-navy tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', lineHeight: 1.1 }}>
              Most people don&rsquo;t have a learning problem.
              <br />
              <span className="text-amber italic">They have a proof problem.</span>
            </h2>
          </div>

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
            <Link
              href="/accelerator"
              className="group inline-flex items-center gap-1 text-amber font-bold border-b border-amber/40 pb-px hover:border-amber transition-colors"
            >
              See how it works
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* ─── FOUR STEPS ───────────────────────────────────────── */}
      <section className="relative bg-navy py-24 lg:py-32 overflow-hidden">
        <HeroSwirl variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel light>How Upthrust Works</SectionLabel>
          <h2 className="font-serif text-white mb-12 tracking-tight" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.1 }}>
            Four steps. Each one earns the next.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { n: '01', title: 'Assess', desc: 'Discover where your instincts actually point.' },
              { n: '02', title: 'Choose a Pathway', desc: 'PM or BA — based on evidence, not assumption.' },
              { n: '03', title: 'Build Evidence', desc: '12 weeks of real work that goes into your portfolio.' },
              { n: '04', title: 'Earn your Passport', desc: 'A verified record of what you can do.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-colors duration-200">
                <p className="font-serif text-5xl text-amber/40 mb-4 leading-none">{n}</p>
                <p className="font-bold text-white text-xl mb-2">{title}</p>
                <p className="text-paper/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/assessment"
              className="group inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-lg shadow-amber/20 hover:shadow-xl hover:shadow-amber/25"
            >
              Start with the Assessment
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* ─── PATHWAYS ─────────────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel>Choose your pathway</SectionLabel>
          <h2 className="font-serif text-navy mb-12 tracking-tight" style={{ fontSize: 'clamp(1.75rem, 3vw, 2rem)' }}>
            Build evidence in the discipline you&rsquo;re moving toward.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* PM */}
            <div className="bg-white border border-paper/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <span className="inline-flex items-center gap-1.5 bg-moss/10 text-moss border border-moss/20 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase mb-4 self-start">
                <span className="w-1.5 h-1.5 bg-moss rounded-full" />
                Cohort 1 · Open
              </span>
              <h3 className="font-serif text-2xl text-navy mt-2 mb-3 tracking-tight">Product Management</h3>
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {['Own the product direction', 'Write PRDs & roadmaps', 'Set metrics & strategy'].map(b => (
                  <li key={b} className="flex gap-2 text-ink/70 text-sm">
                    <span className="text-amber flex-shrink-0">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/pathway-product-management"
                className="w-full text-center bg-navy hover:bg-ink text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 block"
              >
                Explore PM Pathway
              </Link>
            </div>

            {/* BA */}
            <div className="bg-white border border-paper/50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <span className="inline-flex items-center gap-1.5 bg-amber/10 text-amber border border-amber/20 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase mb-4 self-start">
                <span className="w-1.5 h-1.5 bg-amber rounded-full" />
                Cohort 1 · Open
              </span>
              <h3 className="font-serif text-2xl text-navy mt-2 mb-3 tracking-tight">Business Analysis</h3>
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {['Elicit & document requirements', 'Write BRDs & process maps', 'Lead UAT & testing'].map(b => (
                  <li key={b} className="flex gap-2 text-ink/70 text-sm">
                    <span className="text-amber flex-shrink-0">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/pathway-business-analysis"
                className="w-full text-center bg-amber hover:bg-amber-dark text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 block"
              >
                Explore BA Pathway
              </Link>
            </div>

            {/* Design */}
            <div className="bg-white border border-dashed border-paper/50 rounded-2xl p-8 flex flex-col opacity-70">
              <span className="inline-flex items-center gap-1.5 bg-navy/5 text-navy border border-navy/10 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase mb-4 self-start">
                Cohort 2 · Waitlist
              </span>
              <h3 className="font-serif text-2xl text-navy mt-2 mb-3 tracking-tight">Product Design</h3>
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {['User journeys & wireframes', 'Design systems basics', 'Figma handoff workflow'].map(b => (
                  <li key={b} className="flex gap-2 text-ink/40 text-sm">
                    <span className="text-ink/30 flex-shrink-0">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/assessment"
                className="w-full text-center border-2 border-navy/20 hover:border-navy text-navy py-3.5 rounded-xl font-bold text-sm transition-all duration-200 block"
              >
                Join Cohort 2 Waitlist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* ─── PASSPORT ─────────────────────────────────────────── */}
      <section className="relative bg-navy py-24 lg:py-32 overflow-hidden">
        <HeroSwirl variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionLabel light>Capability Passport</SectionLabel>
              <h2 className="font-serif text-white mb-8 tracking-tight" style={{ fontSize: 'clamp(1.75rem, 3vw, 2rem)' }}>
                A certificate says you attended.
                <br />
                <span className="text-amber italic">Your Passport shows what you can do.</span>
              </h2>
              <FeatureRow icon="📋" title="Scored against a rubric" description="Not just completion — every capability has a benchmark." />
              <FeatureRow icon="✍️" title="Backed by real work" description="Every score has an artefact behind it." />
              <FeatureRow icon="👤" title="Signed by a facilitator" description="Who reviewed your capstone and knows what you produced." />
              <FeatureRow icon="🔗" title="Verifiable by employers" description="A unique Passport ID they can check." />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-colors duration-200">
              <p className="text-paper/40 text-xs tracking-widest uppercase mb-6">Upthrust Capability Passport</p>
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

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* ─── FOUNDER BIO STRIP ────────────────────────────────── */}
      <section className="bg-paper py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-black tracking-[0.2em] uppercase text-amber mb-4">About the founder</p>
              <h2 className="font-serif text-4xl text-navy mb-6 leading-tight tracking-tight">
                Built by someone who has trained over 1,000 professionals.
              </h2>
              <p className="text-ink/70 text-lg leading-relaxed mb-6">
                Genesis Nneji Enwenyeokwu is a CBAP-certified Business Analyst, Product Lead, and digital product practitioner
                with over a decade of experience. He has helped hundreds of professionals transition into PM and BA careers
                across Nigeria, the UK, and beyond.
              </p>
              <p className="text-ink/70 text-base leading-relaxed mb-8">
                Upthrust was born from a simple observation: talented people kept finishing courses and collecting certificates
                — and still couldn&rsquo;t show employers what they could do. The Career Capability Accelerator is the answer to that problem.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-amber font-bold"
              >
                Read the full story
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-3 bg-amber/10 rounded-3xl blur-xl" />
                <Image
                  src="/images/founder-genesis.jpg"
                  alt="Genesis Nneji Enwenyeokwu — Founder of Upthrust"
                  width={400}
                  height={500}
                  className="relative rounded-2xl object-cover shadow-2xl ring-1 ring-amber/20 max-w-sm w-full"
                  style={{ height: 480 }}
                />
                <div className="absolute -bottom-4 -left-4 bg-navy rounded-xl p-4 shadow-xl border border-white/10">
                  <p className="text-amber text-xs font-bold tracking-widest uppercase mb-1">Credentials</p>
                  <p className="text-paper text-sm font-medium">CBAP · MBA (UEL)</p>
                  <p className="text-paper/50 text-xs">Product Lead · Est. 2019</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>Outcomes</SectionLabel>
            <h2 className="font-serif text-navy tracking-tight" style={{ fontSize: 'clamp(1.75rem, 3vw, 2rem)' }}>
              What our alumni say
            </h2>
          </div>
          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory testimonials-scroll md:grid md:grid-cols-3 md:overflow-visible">
            {TESTIMONIALS.map((t) => {
              const initials = t.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
              return (
                <div
                  key={t.id}
                  className="flex-shrink-0 w-80 md:w-auto snap-start bg-white rounded-2xl p-8 border border-paper/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="text-amber text-4xl mb-4 font-serif leading-none">&ldquo;</div>
                  <p className="text-ink/80 text-base leading-relaxed mb-6 italic flex-1">{t.quote}</p>
                  <div className="flex items-center gap-3 pt-6 border-t border-paper/50">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} width={40} height={40}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-paper font-bold text-sm flex-shrink-0">
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

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* ─── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="bg-amber py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-white mb-4 tracking-tight" style={{ fontSize: 'clamp(1.75rem, 3vw, 2rem)' }}>
            Stop collecting certificates. Start building evidence.
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            12 weeks. Real portfolio. A Passport employers can verify.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/assessment"
              className="group inline-flex items-center gap-2 bg-white text-amber hover:bg-paper px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px]"
            >
              Take the Assessment
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/consultation"
              className="inline-flex items-center border-2 border-white/40 hover:border-white text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 min-h-[44px]"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
