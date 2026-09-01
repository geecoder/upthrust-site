'use client';

import { useState } from 'react';
import { useInView, useStagger } from '@/lib/animations';
import { trackEvent } from '@/lib/mixpanel';
import { TRACKING_EVENTS } from '@/lib/tracking-events';

const CAPSTONES = [
  {
    id: 'C01',
    region: 'Nigeria',
    industry: 'Fintech',
    title: 'Digital Wallet Onboarding — Identity Verification Drop-off',
    context: 'A leading Nigerian digital wallet has a 58% drop-off at the BVN/NIN identity verification step.',
    pm_brief: 'You are the PM. Define the problem, scope a v1 fix, write the PRD, set success metrics, and define what kill criteria would tell you the fix failed.',
    ba_brief: 'You are the BA. Document the current-state process, identify every failure point, write the BRD, define UAT scenarios, and map the edge cases engineering will miss.',
    tools: ['Figma (review)', 'Notion (PRD/BRD)', 'Miro (process mapping)', 'Google Sheets (metrics)'],
    difficulty: 'Intermediate',
  },
  {
    id: 'C02',
    region: 'UK / Diaspora',
    industry: 'Fintech',
    title: 'Multi-Currency Savings for the African Diaspora',
    context: 'Save in GBP, USD and NGN simultaneously, with cross-border transfer on maturity.',
    pm_brief: 'Define the user, scope the v1 product, write the product strategy canvas and PRD, define the MVP, and write the metrics plan for the first 90 days post-launch.',
    ba_brief: 'Map the regulatory constraints across the three currencies, define the functional and non-functional requirements, write the full BRD, and produce UAT scenarios for the multi-currency edge cases.',
    tools: ['Notion', 'Miro', 'Google Slides', 'Lucidchart'],
    difficulty: 'Advanced',
  },
  {
    id: 'C03',
    region: 'Nigeria / West Africa',
    industry: 'Health Tech',
    title: 'Community Health Navigation Platform',
    context: 'Helping lower-income users book, triage symptoms, and find affordable care nearby.',
    pm_brief: 'Define the user segments, prioritise which part of the health journey to solve first, write the product strategy, scope the MVP, and define what success looks like in week 1 vs month 6.',
    ba_brief: 'Conduct stakeholder mapping across patients, health providers, and government bodies, document the as-is care-seeking process, write the BRD for the MVP, and produce a UAT pack.',
    tools: ['Miro', 'Notion', 'Figma (review)', 'Google Sheets'],
    difficulty: 'Advanced',
  },
  {
    id: 'C04',
    region: 'Nigeria / Ghana',
    industry: 'E-commerce / SME',
    title: 'SME Invoice, Inventory & Payment Tool',
    context: 'Replacing WhatsApp, Excel and paper for small business owners in Lagos and Accra.',
    pm_brief: 'Define which SME segment to target first, scope the MVP features, write the PRD for the invoicing module, define the go-to-market approach for the first 100 businesses, and set the success metrics.',
    ba_brief: 'Map the end-to-end current-state process for an SME managing a typical week, identify all pain points, write the BRD for the invoicing and inventory modules, and define UAT scenarios.',
    tools: ['Notion', 'Miro', 'Figma (review)', 'Airtable'],
    difficulty: 'Intermediate',
  },
  {
    id: 'C05',
    region: 'Nigeria',
    industry: 'Transport / Logistics',
    title: 'Last-Mile Delivery Operations Platform',
    context: '500+ deliveries a day, losing 23% to wrong addresses, no-shows and comms failures.',
    pm_brief: 'Identify the root cause, define the product scope, write the PRD for the dispatcher dashboard, define the driver-facing mobile flow, and set metrics for delivery success rate and driver retention.',
    ba_brief: 'Map the current delivery operations process end-to-end, identify every failure point and stakeholder interaction, write the BRD for the dispatcher platform, and produce a full UAT pack.',
    tools: ['Miro', 'Notion', 'Google Maps API documentation (review)', 'Figma (review)'],
    difficulty: 'Advanced',
  },
  {
    id: 'C06',
    region: 'UK / Canada',
    industry: 'Proptech',
    title: 'Rental Application & Tenancy Management',
    context: 'Digitising the rental process from application and referencing through to rent collection.',
    pm_brief: 'Define which part of the rental journey to solve first, write the product strategy canvas, scope the v1 product for the tenant-facing application flow, write the PRD, and define success metrics.',
    ba_brief: 'Map the full rental application process for both the letting agent and the tenant, document all compliance requirements (Right to Rent, referencing, deposit protection), write the BRD, and define UAT scenarios.',
    tools: ['Notion', 'Miro', 'Figma (review)', 'Jira (backlog)'],
    difficulty: 'Intermediate',
  },
  {
    id: 'C07',
    region: 'Nigeria / East Africa',
    industry: 'Edtech',
    title: 'Student Learning & Progress Tracking',
    context: 'Courses across 12 countries, 67% mid-course drop-off, no instructor visibility.',
    pm_brief: 'Define the core drop-off problem, scope a v1 retention-focused feature set, write the PRD for the student progress dashboard, set the success metrics, and define a go-to-market plan for deploying to instructors.',
    ba_brief: 'Map the current student learning journey and identify all friction points, document the functional requirements for progress tracking and instructor feedback tools, write the BRD, and produce UAT scenarios.',
    tools: ['Notion', 'Miro', 'Google Data Studio (metrics review)', 'Figma (review)'],
    difficulty: 'Intermediate',
  },
  {
    id: 'C08',
    region: 'Nigeria / West Africa',
    industry: 'Government / NGO',
    title: 'Beneficiary Management & Grant Disbursement',
    context: '10,000 rural beneficiaries on Excel and paper. 18% of the programme lost to waste.',
    pm_brief: 'Define the highest-priority problem to solve first, scope a v1 digital beneficiary registration and payment tracking product, write the PRD, define the success metrics, and scope the compliance requirements.',
    ba_brief: 'Map the current beneficiary onboarding and disbursement process, identify all data integrity failure points, write the BRD for the digital registration and payment tracking modules, and produce UAT scenarios for duplicate-detection edge cases.',
    tools: ['Notion', 'Miro', 'KoboToolbox (review)', 'Google Sheets'],
    difficulty: 'Advanced',
  },
];

const REGIONS = ['All', 'Nigeria', 'UK / Diaspora', 'UK / Canada', 'Nigeria / West Africa', 'Nigeria / East Africa'];
const DIFFICULTIES = ['All', 'Intermediate', 'Advanced'];

export default function CapstonesInteractive() {
  const [activeRegion, setActiveRegion] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pathway, setPathway] = useState<'PM' | 'BA'>('PM');
  const { ref, inView } = useInView({ threshold: 0.1 });

  const filtered = CAPSTONES.filter(c => {
    const regionMatch = activeRegion === 'All' || c.region.includes(activeRegion.replace(' / Diaspora', '').replace(' / Canada', ''));
    const diffMatch = activeDifficulty === 'All' || c.difficulty === activeDifficulty;
    return regionMatch && diffMatch;
  });

  const visible = useStagger(filtered.length, 80, inView);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 32, alignItems: 'center' }}>
        {/* Pathway toggle */}
        <div style={{ display: 'flex', border: '1.5px solid var(--paper-line)', overflow: 'hidden' }}>
          {(['PM', 'BA'] as const).map(p => (
            <button key={p} onClick={() => setPathway(p)} style={{
              padding: '8px 20px', background: pathway === p ? 'var(--ink)' : 'transparent',
              color: pathway === p ? 'var(--paper)' : 'var(--ink-muted)',
              border: 'none', cursor: 'pointer', fontFamily: "'Inter Tight', sans-serif",
              fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'all 200ms',
            }}>{p} Pathway</button>
          ))}
        </div>

        {/* Difficulty filter */}
        <div style={{ display: 'flex', gap: 8 }}>
          {DIFFICULTIES.map(d => (
            <button key={d} onClick={() => setActiveDifficulty(d)} style={{
              padding: '6px 14px',
              background: activeDifficulty === d ? 'var(--amber)' : 'transparent',
              color: activeDifficulty === d ? 'var(--paper)' : 'var(--ink-muted)',
              border: `1px solid ${activeDifficulty === d ? 'var(--amber)' : 'var(--paper-line)'}`,
              cursor: 'pointer', fontFamily: "'Inter Tight', sans-serif",
              fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'all 200ms',
            }}>{d}</button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="capstone-grid">
        {filtered.map((cap, i) => {
          const isExpanded = expanded === cap.id;
          return (
            <div key={cap.id} style={{
              background: 'var(--white)', border: '1px solid var(--paper-line)',
              borderTop: `3px solid ${cap.difficulty === 'Advanced' ? 'var(--amber-deep)' : 'var(--moss)'}`,
              opacity: visible[i] ? 1 : 0,
              transform: visible[i] ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 400ms ease ${i * 80}ms, transform 400ms ease ${i * 80}ms`,
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ padding: '24px 24px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 8px', background: 'var(--paper-soft)', color: 'var(--ink-muted)' }}>{cap.id}</span>
                    <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', background: cap.difficulty === 'Advanced' ? 'rgba(160,90,38,0.1)' : 'rgba(79,106,74,0.1)', color: cap.difficulty === 'Advanced' ? 'var(--amber-deep)' : 'var(--moss)' }}>{cap.difficulty}</span>
                  </div>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '0.5625rem', color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>{cap.region}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber-deep)', padding: '2px 6px', background: 'rgba(197,116,58,0.08)' }}>{cap.industry}</span>
                </div>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.018em', lineHeight: 1.3, marginBottom: 12 }}>{cap.title}</h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink-soft)' }}>{cap.context}</p>
              </div>

              {/* Expandable brief */}
              {isExpanded && (
                <div style={{ padding: '20px 24px', borderTop: '1px solid var(--paper-line)', marginTop: 16, animation: 'slideDown 250ms ease' }}>
                  <div style={{ padding: '16px 18px', background: 'var(--paper-soft)', borderLeft: `3px solid ${pathway === 'PM' ? 'var(--ink)' : 'var(--amber-deep)'}`, marginBottom: 16 }}>
                    <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: pathway === 'PM' ? 'var(--ink)' : 'var(--amber-deep)', marginBottom: 8 }}>
                      {pathway} Brief
                    </p>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--ink-soft)' }}>
                      {pathway === 'PM' ? cap.pm_brief : cap.ba_brief}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 8 }}>Tools used</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {cap.tools.map(tool => (
                        <span key={tool} style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '0.5625rem', padding: '3px 8px', background: 'var(--paper-soft)', color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>{tool}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ padding: '16px 24px', marginTop: 'auto', borderTop: '1px solid var(--paper-line)' }}>
                <button onClick={() => {
                  if (!isExpanded) {
                    trackEvent(TRACKING_EVENTS.resourceViewed, {
                      resource_type: 'capstone_brief',
                      capstone_id: cap.id,
                      capstone_title: cap.title,
                      pathway_name: pathway === 'PM' ? 'Product Management' : 'Business Analysis',
                      program_name: 'Career Capability Accelerator',
                      source_page: window.location.pathname,
                      section_name: 'Capstone projects',
                    });
                  }

                  setExpanded(isExpanded ? null : cap.id);
                }} style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontFamily: "'Inter Tight', sans-serif", fontSize: '0.6875rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: isExpanded ? 'var(--amber-deep)' : 'var(--ink)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span>{isExpanded ? '← Close brief' : `See ${pathway} brief →`}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--ink-muted)', padding: '48px 0', fontStyle: 'italic' }}>
          No capstones match those filters. Try broadening your selection.
        </p>
      )}

      <style>{`
        @media (max-width: 720px) { .capstone-grid { grid-template-columns: 1fr !important; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
