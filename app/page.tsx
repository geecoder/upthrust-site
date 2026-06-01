import Link from 'next/link';
import Image from 'next/image';
import { HeroSwirl } from '@/components/HeroSwirl';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { LottiePlayer } from '@/components/ui/LottiePlayer';
import { TESTIMONIALS } from '@/lib/testimonials';

const FAQ_ITEMS = [
  {
    q: 'What exactly is the Career Capability Accelerator?',
    a: 'A 12-week practical program for PM or BA — live sessions, weekly portfolio assignments, AI-assisted feedback, and expert review. Eligible learners earn a Capability Passport: a verifiable evidence record of what you produced.',
  },
  {
    q: 'Which pathway should I choose — PM or BA?',
    a: 'Take the Career Assessment first. It will tell you, with evidence from your own answers, where you actually fit. If scores are close, a 20-minute consultation call resolves it.',
  },
  {
    q: 'How much time per week does this take?',
    a: 'Plan for 8–10 hours: 2 hrs live class, 1 hr lab, 3–4 hrs assignment, 1 hr feedback review. Learners doing less than 6 hours tend to fall behind by Week 3.',
  },
  {
    q: 'What is the Capability Passport and why does it matter?',
    a: 'Not a certificate — a verifiable evidence record. It documents capability areas assessed against a published rubric, artefacts you produced, your capstone performance, and a facilitator sign-off employers can check.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. Both Standard and Premium tiers can be paid in two installments. Discuss the plan that works for you on the consultation call.',
  },
];

export default function Home() {
  return (
    <>
      {/* ─── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] bg-navy overflow-hidden flex items-center">
        <HeroSwirl />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber/12 border border-amber/25 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-amber rounded-full animate-pulse flex-shrink-0" />
              <span className="text-amber text-xs font-bold tracking-[0.15em] uppercase">
                Cohort 1 · Starts June 6, 2026
              </span>
            </div>

            <h1 className="font-serif text-hero text-white mb-6 max-[768px]:text-hero-md">
              Build evidence.<br />
              <span className="text-amber">Not just credentials.</span>
            </h1>

            <p className="text-paper/65 text-xl leading-relaxed max-w-xl mb-10">
              A 12-week accelerator for PM and BA professionals.
              Real work, real portfolio, a Capability Passport employers can verify.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/assessment"
                className="group inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-amber hover:shadow-lg hover:shadow-amber/30 text-base min-h-[44px]"
              >
                Take the Assessment
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/accelerator"
                className="inline-flex items-center border-2 border-white/20 hover:border-white/50 text-white font-bold px-8 py-4 rounded-2xl transition-all text-base min-h-[44px]"
              >
                Explore the Program
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-paper/35 text-sm tracking-wide">
              <span>1,000+ trained globally</span>
              <span>·</span>
              <span>Est. 2019</span>
              <span>·</span>
              <span>Lagos · London · Toronto · Sydney</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. LOGOS STRIP ───────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-ink/35 text-xs font-bold tracking-[0.18em] uppercase mb-8">
            Our alumni transition to and work at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-14">
            {['Flutterwave', 'Access Bank', 'PwC', 'Interswitch', 'MTN', 'KPMG', 'Deloitte', 'UBA Group'].map(co => (
              <span key={co} className="text-ink/30 font-bold text-sm tracking-wide hover:text-ink/50 transition-colors cursor-default">
                {co}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. THE SHIFT ─────────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-5">
                The career landscape has shifted
              </p>
              <h2 className="font-serif text-h2 text-navy mb-6">
                Employers no longer ask what you studied.<br />
                <span className="text-amber">They ask what you built.</span>
              </h2>
              <p className="text-ink-soft text-lg leading-relaxed mb-8 max-w-md">
                In 2026, every hiring manager for PM and BA roles asks for a portfolio. Certificates
                tell them you attended. A Capability Passport shows them what you can do.
              </p>
              <div className="space-y-0">
                {[
                  { pct: '85%', text: 'of employers now prioritise portfolio over CV' },
                  { pct: '91%', text: 'prefer a capstone to a course completion certificate' },
                  { pct: '78%', text: 'say candidates cannot demonstrate practical skills' },
                ].map(s => (
                  <div key={s.pct} className="flex items-center gap-4 border-b border-gray-100 py-4 last:border-0">
                    <span className="font-serif text-4xl text-amber font-light w-20 flex-shrink-0">{s.pct}</span>
                    <span className="text-ink-soft text-sm leading-relaxed">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <LottiePlayer
                src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie"
                loop={true}
                width={420}
                height={420}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. PATHWAYS ──────────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-3">Choose your pathway</p>
              <h2 className="font-serif text-h2 text-navy">Two pathways. One standard.</h2>
            </div>
            <Link href="/accelerator" className="text-amber font-semibold text-sm hover:underline underline-offset-4">
              View full program →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PM */}
            <Link
              href="/pathway-product-management"
              className="group border border-gray-200 rounded-2xl p-8 hover:shadow-card-hover hover:border-amber/30 transition-all duration-300 cursor-pointer bg-white block"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="bg-amber/8 text-amber text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">Cohort 1 · Open</span>
                <span className="text-ink/30 text-sm">PM Pathway</span>
              </div>
              <h3 className="font-serif text-h3 text-navy mb-3 group-hover:text-amber transition-colors">Product Management</h3>
              <p className="text-ink-soft text-sm leading-relaxed mb-6">
                Build PRDs, strategy canvases, sprint backlogs, and a full capstone. Graduate with 12 portfolio artefacts.
              </p>
              <div className="space-y-2 mb-8">
                {['Strategic product thinking', 'Requirements & roadmapping', 'Stakeholder management', 'Launch planning & metrics'].map(s => (
                  <div key={s} className="flex items-center gap-2 text-sm text-ink/70">
                    <span className="text-amber font-bold">→</span>
                    {s}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber font-semibold text-sm inline-flex items-center gap-2">
                  View pathway <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
                <span className="text-ink/30 text-xs">12 weeks · Live</span>
              </div>
            </Link>

            {/* BA */}
            <Link
              href="/pathway-business-analysis"
              className="group border border-gray-200 rounded-2xl p-8 hover:shadow-card-hover hover:border-amber/30 transition-all duration-300 cursor-pointer bg-white block"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="bg-amber/8 text-amber text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">Cohort 1 · Open</span>
                <span className="text-ink/30 text-sm">BA Pathway</span>
              </div>
              <h3 className="font-serif text-h3 text-navy mb-3 group-hover:text-amber transition-colors">Business Analysis</h3>
              <p className="text-ink-soft text-sm leading-relaxed mb-6">
                Build BRDs, stakeholder maps, process maps, UAT packs, and a full capstone. Graduate with 12 portfolio artefacts.
              </p>
              <div className="space-y-2 mb-8">
                {['Elicitation & requirements', 'Process mapping & analysis', 'UAT and quality assurance', 'Business case development'].map(s => (
                  <div key={s} className="flex items-center gap-2 text-sm text-ink/70">
                    <span className="text-amber font-bold">→</span>
                    {s}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber font-semibold text-sm inline-flex items-center gap-2">
                  View pathway <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
                <span className="text-ink/30 text-xs">12 weeks · Live</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. HOW IT WORKS ──────────────────────────────────── */}
      <section className="bg-paper py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-5">A structured path to capability</p>
              <h2 className="font-serif text-h2 text-navy mb-10">
                Small cohort. Live sessions.<br />Real feedback.
              </h2>
              {[
                { icon: '🎯', title: 'Live sessions with Genesis', desc: 'Every week — 90-min live class with your cohort of 15–25.' },
                { icon: '📝', title: 'Weekly portfolio assignments', desc: 'Build a real artefact every week. Assessed against a rubric.' },
                { icon: '⚡', title: 'Instant AI feedback', desc: 'Submit work, get structured feedback within minutes.' },
                { icon: '✅', title: 'Expert human review', desc: 'Genesis reviews every submission within 48 hours.' },
                { icon: '🏆', title: 'Capability Passport', desc: 'A verifiable credential backed by 12 weeks of real work.' },
              ].map(f => (
                <div key={f.title} className="flex gap-5 py-5 border-b border-ink/8 last:border-0">
                  <span className="text-2xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <p className="font-bold text-navy text-base mb-1">{f.title}</p>
                    <p className="text-ink-soft text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden lg:flex justify-center">
              <LottiePlayer
                src="https://lottie.host/98b1a29e-71c2-4d59-a6e3-3bdb07c6f26e/nbLu7gjJuF.lottie"
                loop={true}
                width={380}
                height={380}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. GENESIS BIO ───────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src="/images/founder-genesis.jpg"
                  alt="Genesis Nneji Enwenyeokwu — Founder, Upthrust"
                  width={440}
                  height={520}
                  className="rounded-2xl object-cover shadow-xl ring-1 ring-gray-100 max-w-xs w-full"
                  style={{ height: 480 }}
                />
                <div className="absolute -bottom-5 -right-5 bg-navy rounded-xl p-4 shadow-xl border border-white/10">
                  <p className="text-amber text-xs font-bold tracking-widest uppercase mb-1.5">Credentials</p>
                  <p className="text-paper text-sm font-semibold">CBAP Certified</p>
                  <p className="text-paper text-sm font-semibold">MBA — UEL London</p>
                  <p className="text-paper/40 text-xs mt-1">Product Lead · Est. 2019</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4">About the founder</p>
              <h2 className="font-serif text-h2 text-navy mb-2">Genesis Nneji Enwenyeokwu</h2>
              <p className="text-amber font-semibold text-sm mb-8">CBAP · MBA · Product Lead · Facilitator</p>

              <div className="space-y-4 text-ink-soft text-base leading-relaxed">
                <p>
                  Genesis is a CBAP-certified Business Analyst, Product Lead, facilitator, and digital product practitioner
                  with over a decade of experience across business analysis, product management, business process automation,
                  and digital product delivery.
                </p>
                <p>
                  He has helped hundreds of professionals transition into business analysis and product careers, while
                  building and supporting B2B and B2C digital products across Nigeria, the UK, and the US.
                </p>
                <p>
                  Upthrust was born from a pattern he kept seeing: talented professionals finishing courses, collecting
                  certificates, and still struggling to show credible evidence of what they could actually do.
                </p>
              </div>

              <blockquote className="border-l-4 border-amber pl-5 my-8 text-ink/65 italic text-lg leading-relaxed">
                &ldquo;Capability that cannot be shown is capability that cannot be used.&rdquo;
              </blockquote>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                {[['10+', 'Years exp.'], ['1,000+', 'Trained'], ['3', 'Continents']].map(([v, l]) => (
                  <div key={l}>
                    <p className="font-serif text-3xl text-navy mb-1">{v}</p>
                    <p className="text-ink/40 text-xs uppercase tracking-wider">{l}</p>
                  </div>
                ))}
              </div>

              <Link href="/about" className="inline-flex items-center gap-2 text-amber font-bold mt-8 hover:gap-3 transition-all text-sm">
                Full story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. TESTIMONIALS ──────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-3">Outcomes</p>
          <h2 className="font-serif text-h2 text-navy mb-12">Hear from our alumni</h2>
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory testimonials-scroll md:grid md:grid-cols-3 md:overflow-visible">
            {TESTIMONIALS.map(t => {
              const initials = t.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
              return (
                <div
                  key={t.id}
                  className="flex-shrink-0 w-[300px] md:w-auto snap-start bg-white border border-gray-100 rounded-2xl p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="text-amber text-4xl font-serif mb-4 leading-none">&ldquo;</div>
                  <p className="text-ink/75 text-sm leading-relaxed mb-6 italic flex-1">{t.quote}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-paper font-bold text-xs flex-shrink-0">
                      {initials}
                    </div>
                    <div>
                      <p className="font-bold text-navy text-sm">{t.name}</p>
                      <p className="text-amber text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 8. STATS BAR ─────────────────────────────────────── */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x divide-white/10">
            {[
              ['1,000+', 'Professionals trained',     'Since 2019'],
              ['12',     'Weeks of structured learning', 'Per cohort'],
              ['2',      'Career pathways',            'PM & BA'],
              ['100%',   'Practical, portfolio-based', 'No passive learning'],
            ].map(([val, label, sub]) => (
              <div key={label} className="text-center py-6 md:py-0 px-4">
                <p className="font-serif text-5xl text-amber font-light tracking-tight mb-2">{val}</p>
                <p className="text-paper/60 text-sm font-medium uppercase tracking-widest mb-1">{label}</p>
                <p className="text-paper/30 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. FAQ ───────────────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-3 text-center">FAQ</p>
          <h2 className="font-serif text-h2 text-navy text-center mb-12">Frequently asked questions</h2>
          <FAQAccordion items={FAQ_ITEMS} />
          <div className="text-center mt-12">
            <p className="text-ink/50 text-sm mb-4">Still have questions?</p>
            <Link href="/consultation" className="inline-flex items-center gap-2 text-amber font-bold hover:gap-3 transition-all">
              Book a free consultation →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 10. BOTTOM CTA ───────────────────────────────────── */}
      <section className="bg-amber py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-h2 text-white mb-4">
            Stop collecting certificates.<br />Start building evidence.
          </h2>
          <p className="text-white/75 text-lg mb-10">12 weeks. Real portfolio. A Passport employers can verify.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/assessment"
              className="bg-white text-amber font-bold px-8 py-4 rounded-2xl hover:bg-amber-light transition-colors text-base min-h-[44px] inline-flex items-center justify-center"
            >
              Take the Assessment →
            </Link>
            <Link
              href="/consultation"
              className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:border-white/60 transition-colors text-base min-h-[44px] inline-flex items-center justify-center"
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
