import Link from 'next/link';
import Image from 'next/image';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FeatureRow } from '@/components/ui/FeatureRow';
import { Badge } from '@/components/ui/Badge';

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="bg-navy py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Badge variant="paper">About Upthrust</Badge>
          <h1 className="font-serif text-display-md text-white mt-6 max-w-3xl mx-auto text-balance">
            Built on a simple observation:
            <br/>
            <span className="text-amber italic">Professionals can do the work. They just can&rsquo;t prove it.</span>
          </h1>
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────── */}
      <section className="bg-navy border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '2019', label: 'Year Upthrust founded' },
              { num: '1,000+', label: 'Professionals trained' },
              { num: '4', label: 'Continents represented' },
              { num: '2026', label: 'Strategic repositioning' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-serif text-4xl text-paper font-light tracking-tight">{stat.num}</p>
                <p className="text-paper/50 text-xs mt-2 uppercase tracking-wide font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY REPOSITIONING ────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16">
            <div>
              <SectionLabel>Why now</SectionLabel>
              <h2 className="font-serif text-display-sm text-navy">The honest reason we&rsquo;re repositioning.</h2>
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

      {/* ─── FOUNDER ──────────────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel>The founder</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-16 items-start mt-8">

            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="relative max-w-xs w-full mx-auto lg:mx-0" style={{ maxWidth: 280 }}>
                <Image
                  src="/images/founder-genesis.jpg"
                  alt="Genesis Nneji Enwenyeokwu, founder of Upthrust"
                  width={280}
                  height={350}
                  className="rounded-2xl shadow-lg object-cover w-full"
                  style={{ height: 350 }}
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="font-serif text-3xl text-navy mb-1">Genesis Nneji Enwenyeokwu</h2>
              <p className="text-amber text-sm font-bold mb-8">Founder &amp; Program Director, Upthrust · Product Lead, Rova</p>

              <FeatureRow dark={false} icon="📍" title="Based in" description="Lagos & London" />
              <FeatureRow dark={false} icon="📅" title="Founded" description="2019" />
              <FeatureRow dark={false} icon="🎓" title="Background" description="Product Lead, CBAP, MBA (UEL) · 10+ years across PM & BA" />
              <FeatureRow dark={false} icon="🌍" title="Trained" description="1,000+ professionals globally" />

              <blockquote className="border-l-4 border-amber pl-6 mt-8 italic text-ink/70 text-lg leading-relaxed">
                &ldquo;Too many talented people were collecting certificates but still struggling to demonstrate real capability.
                Upthrust is my answer to that problem.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE STAND FOR ────────────────────────────────── */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionLabel>What we stand for</SectionLabel>
          <h2 className="font-serif text-display-sm text-navy mb-12">Three things we will not do.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'We are not a certificate factory.', body: 'Capability is the product. Evidence is the proof.' },
              { num: '02', title: 'We are not an AI-only tool.', body: 'Human mentorship and judgement are central to Upthrust.' },
              { num: '03', title: 'We are not a course marketplace.', body: 'PM, BA, and Design only — until each is proven.' },
            ].map(p => (
              <div key={p.num} className="bg-white rounded-2xl p-8 border border-paper/50">
                <p className="text-amber font-bold text-sm mb-3">{p.num}</p>
                <h3 className="font-serif text-xl text-navy mb-3 leading-tight">{p.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION ──────────────────────────────────────────── */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel light>Our mission</SectionLabel>
          <h2 className="font-serif text-display-md text-white mb-6 max-w-3xl mx-auto">
            We do not guarantee jobs.
            <span className="text-amber italic"> We guarantee readiness.</span>
          </h2>
          <p className="text-paper/60 text-lg max-w-2xl mx-auto">
            What you can show. What you can defend. The evidence that backs your story in any interview.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
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
      </section>
    </>
  );
}
