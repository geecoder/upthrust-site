import Link from 'next/link';
import Image from 'next/image';
import { HeroSwirl } from '@/components/HeroSwirl';

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] bg-navy overflow-hidden flex items-center py-24">
        <HeroSwirl />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-6">About Upthrust</p>
          <h1 className="font-serif text-hero-md lg:text-hero text-white max-w-3xl leading-tight max-[768px]:text-hero-md">
            Building a better way to<br />
            <span className="text-amber">prove product career capability.</span>
          </h1>
          <p className="text-paper/60 text-xl max-w-xl mt-6">
            Upthrust exists to help ambitious professionals move from learning concepts to proving practical capability.
          </p>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y-2 md:divide-y-0 md:divide-x divide-gray-100">
            {[
              ['1,000+', 'Professionals trained'],
              ['Est. 2019', 'Years of experience'],
              ['3', 'Continents served'],
              ['2', 'Career pathways'],
            ].map(([val, label]) => (
              <div key={label} className="text-center py-6 md:py-0 px-4">
                <p className="font-serif text-5xl text-navy mb-2 font-light tracking-tight">{val}</p>
                <p className="text-ink/50 text-sm font-medium uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY REPOSITIONING ────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16">
            <div>
              <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4">Why now</p>
              <h2 className="font-serif text-h2 text-navy">The honest reason we&rsquo;re repositioning.</h2>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-ink-soft text-lg leading-relaxed">
                For years, we ran training programs the way most of the industry does — content delivery, projects, certificates. People learned. Many got roles. Many did not.
              </p>
              <p className="text-ink-soft text-base leading-relaxed">
                The pattern we kept seeing: capable people with our certificate still struggled to show employers what they could do — not because they hadn&rsquo;t learned, but because they&rsquo;d never been forced to practise under real conditions.
              </p>
              <p className="text-ink-soft text-base leading-relaxed">
                So we rebuilt. The Career Capability Accelerator is the result — same team, same care for learners, redesigned around what employers now reward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER FULL BIO ─────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Photo + credentials */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src="/images/founder-genesis.jpg"
                  alt="Genesis Nneji Enwenyeokwu — Founder, Upthrust"
                  width={480}
                  height={580}
                  className="rounded-2xl object-cover shadow-xl ring-1 ring-gray-100 max-w-sm w-full"
                  style={{ height: 540 }}
                />
                <div className="absolute -bottom-5 -right-5 bg-navy rounded-2xl p-5 shadow-2xl border border-white/10">
                  <p className="text-amber text-xs font-bold tracking-widest uppercase mb-2">Credentials</p>
                  <p className="text-paper text-sm font-semibold">CBAP Certified</p>
                  <p className="text-paper text-sm font-semibold">MBA — UEL London</p>
                  <p className="text-paper/40 text-xs mt-1">Product Lead · Est. 2019</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4">The Founder</p>
              <h2 className="font-serif text-h2 text-navy mb-2">Genesis Nneji Enwenyeokwu</h2>
              <p className="text-amber font-semibold text-sm mb-8">CBAP · MBA · Product Lead · Facilitator</p>

              <div className="space-y-5 text-ink-soft text-base leading-relaxed">
                <p>
                  Genesis Nneji Enwenyeokwu is a CBAP-certified Business Analyst, Product Lead, facilitator, and digital
                  product practitioner with over a decade of experience across business analysis, product management,
                  business process automation, and digital product delivery.
                </p>
                <p>
                  He has helped hundreds of professionals transition into business analysis and product careers, while
                  building and supporting B2B and B2C digital products across Nigeria, the UK, and the US. His work
                  spans financial services, fintech, government, NGOs, and consulting.
                </p>
                <p>
                  Upthrust was built from a pattern he kept seeing: talented professionals finishing courses, collecting
                  certificates, and still struggling to show credible evidence of what they could actually do. The Career
                  Capability Accelerator is the answer to that gap.
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
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE BELIEVE ──────────────────────────────────── */}
      <section className="bg-paper py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4 text-center">What sets us apart</p>
          <h2 className="font-serif text-h2 text-navy text-center mb-12">Why Upthrust works.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['🎯', '100% Practical',           'No passive learning. Every week you build a real artefact.'],
              ['👥', 'Small cohorts',             'Max 25 learners. Direct access to Genesis every session.'],
              ['⚡', 'AI + human review',         'Instant AI feedback, then expert review within 48 hours.'],
              ['📋', 'Portfolio-first',            'You graduate with 12 artefacts, not a participation certificate.'],
              ['🌍', 'Global community',           'Learners across Africa, UK, Canada, Australia, and diaspora markets.'],
              ['🏆', 'Verifiable credential',      'The Capability Passport has a unique ID employers can check.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <span className="text-3xl mb-4 block">{icon}</span>
                <p className="font-bold text-navy text-base mb-2">{title}</p>
                <p className="text-ink-soft text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION STRIP ────────────────────────────────────── */}
      <section className="bg-amber py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-serif text-3xl text-white mb-4 leading-tight">
            &ldquo;The future of work will reward people for what they can prove they can do — not just what they studied.&rdquo;
          </p>
          <p className="text-white/70 text-sm font-medium">The Upthrust Premise</p>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="bg-navy py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-black tracking-[0.18em] uppercase text-amber mb-4">Our promise</p>
          <h2 className="font-serif text-h2 text-white mb-6">
            We don&rsquo;t guarantee jobs.<br />
            <span className="text-amber">We guarantee readiness.</span>
          </h2>
          <p className="text-paper/60 text-lg mb-10 max-w-xl mx-auto">
            What you can show, what you can defend, and the evidence that backs your story in any interview.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment" className="bg-amber hover:bg-amber-dark text-white font-bold px-8 py-4 rounded-2xl transition-all text-base min-h-[44px] inline-flex items-center justify-center shadow-amber">
              Take the Assessment →
            </Link>
            <Link href="/consultation" className="border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-2xl transition-all text-base min-h-[44px] inline-flex items-center justify-center">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
