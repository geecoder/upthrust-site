'use client';

import Link from 'next/link';
import Image from 'next/image';
import { COHORT } from '@/lib/cohort-config';
import { SITE } from '@/lib/config';

const FULL_MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

// "NEXT COHORT · 20 SEPTEMBER 2026" — derived from COHORT.startDate (the
// pathways cohort, the larger/first of the site's two cohort start dates)
// rather than hardcoded, so this line stays correct whenever cohort-config
// changes.
function nextCohortLine(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `NEXT COHORT · ${d} ${FULL_MONTHS[m - 1]} ${y}`;
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* 5-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-white/10">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <div className="relative" style={{ width: 180, height: 76 }}>
              <Image
                src="/brand/upthrust-logo.png"
                alt="Upthrust"
                fill
                sizes="180px"
                className="object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="mt-4 text-sm text-paper/60 leading-relaxed">
              Live cohort programmes where professionals build evidence of capability, not another certificate.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)' }} className="mt-4 text-paper/50 text-xs tracking-widest">
              {nextCohortLine(COHORT.startDate)}
            </p>

            <h4 style={{ fontFamily: 'var(--font-mono)' }} className="text-paper/40 text-xs font-bold uppercase tracking-widest mt-6 mb-2">Where we operate</h4>
            <p className="text-paper/60 text-sm">Lagos · London · Toronto</p>
          </div>

          {/* Col 2: Pathways */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)' }} className="text-paper/40 text-xs font-bold uppercase tracking-widest mb-4">Pathways</h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/pathways/product-management', label: 'Product Management' },
                { href: '/pathways/business-analysis', label: 'Business Analysis' },
                { href: '/pathways/product-design', label: 'Product Design' },
                { href: '/pathways/payment-operations', label: 'Payment Operations' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-paper/70 text-sm hover:text-paper transition-colors py-1 block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Intensives */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)' }} className="text-paper/40 text-xs font-bold uppercase tracking-widest mb-4">Intensives</h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/intensives/ai-product-builder', label: 'AI Product Builder' },
                { href: '/intensives/ba-for-ai-automation', label: 'BA for AI & Automation' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-paper/70 text-sm hover:text-paper transition-colors py-1 block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Explore */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)' }} className="text-paper/40 text-xs font-bold uppercase tracking-widest mb-4">Explore</h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/assessment', label: 'Career Assessment' },
                { href: '/about', label: 'About' },
                { href: '/accelerator', label: 'The Accelerator' },
                { href: '/consultation', label: 'Consultation' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-paper/70 text-sm hover:text-paper transition-colors py-1 block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Get in touch */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)' }} className="text-paper/40 text-xs font-bold uppercase tracking-widest mb-4">Get in touch</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="mailto:info@upthrustdigital.com"
                  className="text-paper/70 text-sm hover:text-paper transition-colors py-1 block">
                  info@upthrustdigital.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/upthrustdigital/" target="_blank" rel="noopener noreferrer"
                  className="text-paper/70 text-sm hover:text-paper transition-colors py-1 block">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`https://twitter.com/${SITE.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                  className="text-paper/70 text-sm hover:text-paper transition-colors py-1 block">
                  X
                </a>
              </li>
              <li>
                {/* Placeholder — no real Instagram handle exists anywhere in the
                   codebase yet. Point this at the real profile once one exists. */}
                <a href="#"
                  className="text-paper/70 text-sm hover:text-paper transition-colors py-1 block">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-wrap justify-between items-center gap-3">
          <span className="text-paper/30 text-xs">© {year} Upthrust Digital Ltd. All rights reserved.</span>
          {/* /privacy, /terms, /cohort-agreement don't exist yet — placeholder
             links until those pages are built. */}
          <span style={{ fontFamily: 'var(--font-mono)' }} className="flex gap-4 text-paper/30 text-xs uppercase tracking-widest">
            <Link href="#" className="hover:text-paper/60 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-paper/60 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-paper/60 transition-colors">Cohort Agreement</Link>
          </span>
          <span className="text-paper/25 text-xs text-right">
            Upthrust does not guarantee employment. We build capability, evidence, and readiness.
          </span>
        </div>
      </div>
    </footer>
  );
}
