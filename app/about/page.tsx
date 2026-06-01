import Link from 'next/link';
import Image from 'next/image';
import { HeroSwirl } from '@/components/HeroSwirl';

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] bg-navy flex items-center py-24 overflow-hidden">
        <HeroSwirl variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.2em] uppercase text-amber mb-6">About Upthrust</p>
          <h1
            className="font-serif text-white max-w-3xl text-balance"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.08, letterSpacing: '-0.035em' }}
          >
            Built on a simple observation:
            <br />
            <span className="text-amber italic">
              Professionals can do the work. They just can&rsquo;t prove it.
            </span>
          </h1>
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────── */}
      <section className="bg-navy border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { num: '2019', label: 'Year Upthrust founded' },
              { num: '1,000+', label: 'Professionals trained' },
              { num: '4', label: 'Continents represented' },
              { num: '2026', label: 'Strategic repositioning' },
            ].map(stat => (
              <div key={stat.label} className="text-center py-6 px-4">
                <p className="font-serif text-4xl text-amber font-light tracking-tight">{stat.num}</p>
                <p className="text-paper/50 text-xs mt-2 uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* ─── WHY REPOSITIONING ────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16">
            <div>
              <p className="text-xs font-black tracking-[0.2em] uppercase text-amber mb-4">Why now</p>
              <h2 className="font-serif text-navy tracking-tight" style={{ fontSize: 'clamp(1.75rem, 3vw, 2rem)' }}>
                The honest reason we&rsquo;re repositioning.
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-ink/80 text-lg leading-relaxed">
                For years, we ran training programs the way most of the industry does — content delivery, projects, certificates.
                People learned. Many got roles. Many did not.
              </p>
              <p className="text-ink/60 text-base leading-relaxed">
                The pattern we kept seeing: capable people with our certificate still struggled to show employers what they could do —
                not because they hadn&rsquo;t learned, but because they&rsquo;d never been forced to practise under real conditions.
                Meanwhile, employers stopped trusting certificates. The bar moved from &ldquo;what did you study?&rdquo; to
                &ldquo;show me what you can do.&rdquo;
              </p>
              <p className="text-ink/60 text-base leading-relaxed">
                So we rebuilt. The Career Capability Accelerator is the result — same team, same care for learners,
                redesigned around what employers now reward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* ─── FOUNDER FULL BIO ─────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Photo column */}
            <div>
              <div className="relative inline-block w-full max-w-sm">
                <div className="absolute -inset-3 bg-amber/10 rounded-3xl blur-xl" />
                <Image
                  src="/images/founder-genesis.jpg"
                  alt="Genesis Nneji Enwenyeokwu — Founder, Upthrust"
                  width={480}
                  height={600}
                  className="relative rounded-2xl shadow-2xl object-cover ring-1 ring-amber/20 w-full"
                  style={{ height: 560 }}
                />
                <div className="absolute -bottom-5 -right-5 bg-navy rounded-2xl p-5 shadow-2xl border border-white/10">
                  <p className="text-amber text-xs font-bold tracking-widest uppercase mb-2">Credentials</p>
                  <p className="text-paper text-sm font-semibold">CBAP Certified</p>
                  <p className="text-paper text-sm font-semibold">MBA — UEL London</p>
                  <p className="text-paper/50 text-xs mt-1">Product Lead · Est. 2019</p>
                </div>
              </div>
            </div>

            {/* Bio column */}
            <div>
              <p className="text-xs font-black tracking-[0.2em] uppercase text-amber mb-4">The Founder</p>
              <h2 className="font-serif text-4xl text-navy mb-2 leading-tight tracking-tight">
                Genesis Nneji Enwenyeokwu
              </h2>
              <p className="text-amber font-bold text-sm mb-8">CBAP · MBA · Product Lead · Facilitator</p>

              <div className="space-y-5 text-ink/75 text-base leading-relaxed">
                <p>
                  Genesis Nneji Enwenyeokwu is a CBAP-certified Business Analyst, Product Lead, facilitator, and digital
                  product practitioner with over a decade of experience across business analysis, product management,
                  business process automation, and digital product delivery.
                </p>
                <p>
                  He has helped hundreds of professionals transition into business analysis and product careers, while also
                  building and supporting B2B and B2C digital products across Nigeria, the UK, and the US.
                </p>
                <p>
                  Upthrust was built from a pattern he kept seeing: talented professionals finishing courses, collecting
                  certificates, and still struggling to show credible evidence of what they could actually do.
                  The Career Capability Accelerator is the answer to that gap.
                </p>
              </div>

              <blockquote className="border-l-4 border-amber pl-6 mt-8 italic text-ink/60 text-lg leading-relaxed">
                &ldquo;Capability that cannot be shown is capability that cannot be used.&rdquo;
              </blockquote>

              <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-ink/10">
                {[
                  ['10+', 'Years experience'],
                  ['1,000+', 'Professionals trained'],
                  ['3', 'Continents'],
                ].map(([val, label]) => (
                  <div key={label}>
                    <p className="font-serif text-3xl text-navy mb-1">{val}</p>
                    <p className="text-ink/50 text-xs font-medium uppercase tracking-wide">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE STAND FOR ────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-black tracking-[0.2em] uppercase text-amber mb-4">What we stand for</p>
          <h2 className="font-serif text-navy mb-12 tracking-tight" style={{ fontSize: 'clamp(1.75rem, 3vw, 2rem)' }}>
            Three things we will not do.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'We are not a certificate factory.', body: 'Capability is the product. Evidence is the proof.' },
              { num: '02', title: 'We are not an AI-only tool.', body: 'Human mentorship and judgement are central to Upthrust.' },
              { num: '03', title: 'We are not a course marketplace.', body: 'PM, BA, and Design only — until each is proven.' },
            ].map(p => (
              <div key={p.num} className="bg-white rounded-2xl p-8 border border-paper/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <p className="text-amber font-bold text-sm mb-3">{p.num}</p>
                <h3 className="font-serif text-xl text-navy mb-3 leading-tight tracking-tight">{p.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* ─── MISSION ──────────────────────────────────────────── */}
      <section className="relative bg-navy py-24 lg:py-32 overflow-hidden">
        <HeroSwirl variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black tracking-[0.2em] uppercase text-amber mb-4">Our Mission</p>
            <h2 className="font-serif text-4xl text-white mb-6 leading-tight tracking-tight">
              To help professionals build capability, prove it, and open doors.
            </h2>
            <p className="text-paper/70 text-lg leading-relaxed mb-4">
              Too many ambitious professionals are stuck between learning and opportunity. They have taken courses,
              watched videos, and earned certificates, but still cannot show credible evidence of what they can do.
            </p>
            <p className="text-paper/70 text-lg leading-relaxed mb-10">
              Upthrust was created to close that gap — for professionals across Africa, the UK, Canada, and the global diaspora.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/assessment"
                className="group inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-lg shadow-amber/20"
              >
                Take the Assessment
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/consultation"
                className="inline-flex items-center border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
