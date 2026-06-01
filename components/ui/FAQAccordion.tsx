'use client';

import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  items: FAQItem[];
}

function FAQItemRow({ q, a }: FAQItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group min-h-[44px]"
        aria-expanded={open}
      >
        <span className="font-semibold text-navy text-base leading-snug group-hover:text-amber transition-colors">
          {q}
        </span>
        <svg
          className={`w-5 h-5 text-amber flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20" fill="none"
        >
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-ink-soft text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export function FAQAccordion({ items }: Props) {
  return (
    <div>
      {items.map((item, i) => (
        <FAQItemRow key={i} q={item.q} a={item.a} />
      ))}
    </div>
  );
}
