'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">

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
              Build evidence of capability — not another certificate.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['Lagos', 'London', 'Toronto'].map((city) => (
                <span key={city} style={{ fontFamily: 'var(--font-mono)' }} className="bg-white/10 text-paper/60 px-3 py-1 text-xs">
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2: Programme */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)' }} className="text-paper/40 text-xs font-bold uppercase tracking-widest mb-4">Programme</h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/accelerator', label: 'The Accelerator' },
                { href: '/pathways/product-management', label: 'Product Management' },
                { href: '/pathways/business-analysis', label: 'Business Analysis' },
                { href: '/pathways/product-design', label: 'Product Design' },
                { href: '/pathways/payment-operations', label: 'Payment Operations' },
                { href: '/assessment', label: 'Career Assessment' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-paper/70 text-sm hover:text-paper transition-colors py-1 block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)' }} className="text-paper/40 text-xs font-bold uppercase tracking-widest mb-4">Company</h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/about', label: 'About Upthrust' },
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

          {/* Col 4: Connect */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)' }} className="text-paper/40 text-xs font-bold uppercase tracking-widest mb-4">Connect</h4>
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
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-wrap justify-between items-center gap-3">
          <span className="text-paper/30 text-xs">© {year} Upthrust Digital Ltd. All rights reserved.</span>
          <span className="text-paper/25 text-xs text-right">
            Upthrust does not guarantee employment. We build capability, evidence, and readiness.
          </span>
        </div>
      </div>
    </footer>
  );
}
