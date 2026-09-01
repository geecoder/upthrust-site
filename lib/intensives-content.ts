// Real, approved specialist-intensive content ported verbatim (or, where noted,
// composed from verbatim source phrases) from the prototype
// (docs/design/Upthrust-v3-prototype-standalone.html — decoded from its
// __bundler/template JSON blob, `AI`, `ARTS`, `CAPS`, `TOOLS`, `FACS`, `LADDER`
// and `ASK` objects, keys `aipb` / `baai`). Sibling to lib/pathways-content.ts,
// not an extension of it — intensives are structurally different: 5 stages
// (not 12 weeks), a single price (not two tiers), and no Capability Passport.
// Cohort/date/status facts are NOT stored here — they come from
// lib/cohort-config.ts, same rule as the pathway content file.
//
// Gaps found in the prototype (not fabricated, left out — see the Part B
// report for detail): no `blurb`, `sampleWork`, `diagram`, `quote`, `profiles`
// or `notFor` equivalent exists for either intensive. `blurb` below is
// composed from the prototype's own `OUT.aipb` / `OUT.baai` outcome phrases
// (near-verbatim), not invented. `ladder` widths are decorative UI values —
// the prototype only ever supplied role *names* (three rungs, labelled "Next
// role" / "Then" / "In time"), never widths or placement numbers, exactly
// like the pathway ladders' bar lengths are also decorative rather than
// measured statistics.

import type { IntensiveSlug } from './cohort-config';

export interface IntensiveStage {
  stage: string; // e.g. 'Opportunity' — the AI[k].stages[i].t value
  status: string; // e.g. 'SCOPED' — the AI[k].stages[i].s value, a short badge word
  title: string; // e.g. 'Find the use case that survives scrutiny.'
  tag: string; // e.g. 'WEEK 01 · PROBLEM SELECTION'
  artefact: string; // the ARTS[k][i].t value, index-aligned with stage
}

export type FacilitatorEntry =
  | { status: 'confirmed'; name: string; role: string; weeks: string; bio: string }
  | { status: 'tbc'; role: string; weeks: string };

export interface IntensiveContent {
  code: string;
  name: string;
  line: string;
  blurb: string;
  // Exactly five entries, true stage order — do not zip against a separate
  // artefact array by index; artefact already lives on each stage.
  stages: [IntensiveStage, IntensiveStage, IntensiveStage, IntensiveStage, IntensiveStage];
  caps: { area: string; desc: string }[];
  // Example rubric score + reviewing-facilitator initials per stage, index-
  // aligned with `stages` — used by the home page's artefact gallery.
  artScores: { score: string; initials: string }[];
  tools: string[];
  // Exactly three slots, matching the prototype's FACS[k] roster.
  facilitators: [FacilitatorEntry, FacilitatorEntry, FacilitatorEntry];
  ladder: { role: string; width: string }[];
  ladderNote: string;
  faq: { q: string; a: string }[];
}

export const INTENSIVE_CONTENT: Record<IntensiveSlug, IntensiveContent> = {
  'ai-product-builder': {
    code: 'AI',
    name: 'AI Product Builder',
    line: 'Ship a working AI product in five weeks.',
    blurb:
      'In five weeks you pick an AI use case that holds, build a working prototype, design for the model being wrong, and defend it to a panel.',
    stages: [
      {
        stage: 'Opportunity',
        status: 'SCOPED',
        title: 'Find the use case that survives scrutiny.',
        tag: 'WEEK 01 · PROBLEM SELECTION',
        artefact: 'AI opportunity brief',
      },
      {
        stage: 'Data reality',
        status: 'MAPPED',
        title: 'Check whether the data can carry the idea.',
        tag: 'WEEK 02 · FEASIBILITY',
        artefact: 'Data feasibility read',
      },
      {
        stage: 'Prototype',
        status: 'BUILT',
        title: 'Build it with the models, not slides about them.',
        tag: 'WEEK 03 · WORKING BUILD',
        artefact: 'Working prototype',
      },
      {
        stage: 'Guardrails',
        status: 'WIRED',
        title: 'Decide what happens when it gets things wrong.',
        tag: 'WEEK 04 · FAILURE DESIGN',
        artefact: 'Guardrails & fallback design',
      },
      {
        stage: 'Ship + defend',
        status: 'SIGNED',
        title: 'Present it to a panel and answer for every call.',
        tag: 'WEEK 05 · CAPSTONE DEFENCE',
        artefact: 'Capstone defence',
      },
    ],
    caps: [
      { area: 'Use-case selection', desc: 'Tell an AI opportunity worth building from one that just sounds good.' },
      { area: 'Data feasibility', desc: 'Check whether the data can carry the idea before anyone commits budget.' },
      { area: 'Prototyping', desc: 'Build a working AI-enabled product, not a deck about one.' },
      { area: 'Failure design', desc: 'Decide what happens when the model is confidently wrong.' },
      { area: 'Evaluation', desc: 'Measure whether the thing actually works, repeatedly.' },
      { area: 'Defence', desc: 'Present it to a panel and answer for every call you made.' },
    ],
    artScores: [
      { score: '83', initials: 'GE' }, { score: '80', initials: 'AO' }, { score: '86', initials: 'GE' },
      { score: '84', initials: 'AO' }, { score: '87', initials: 'GE' },
    ],
    tools: ['CLAUDE / GPT APIS', 'PYTHON BASICS', 'VECTOR STORES', 'FIGMA', 'EVAL HARNESSES', 'GIT'],
    facilitators: [
      {
        status: 'confirmed',
        name: 'Genesis Enwenyeokwu',
        role: 'Product Lead · Rova',
        weeks: 'W01–03',
        bio: 'Product Lead at Rova, building AI-enabled diaspora fintech products. Leads weeks one to three — scoping the use case and building the first working prototype.',
      },
      { status: 'tbc', role: 'AI engineer', weeks: 'W04–05' },
      { status: 'tbc', role: 'Guest reviewer · AI product lead', weeks: 'W05' },
    ],
    ladder: [
      { role: 'AI Product Associate', width: '58%' },
      { role: 'AI Product Manager', width: '80%' },
      { role: 'Head of AI Product', width: '100%' },
    ],
    ladderNote: 'This is a first cohort, so we quote no placement numbers. The bars show what each rung is asked to own against the five artefacts you build.',
    faq: [
      { q: 'Do I need to code?', a: 'Python basics help but are not required. You will use model APIs and prototyping tools, not train models.' },
      { q: 'Is five weeks really enough to build something?', a: 'Yes, deliberately. Narrow scope, one working prototype, defended in week five.' },
      { q: 'Should I take this or a 12-week pathway?', a: 'A pathway if you are switching careers. This if you already have a foundation and want AI capability on top.' },
      { q: 'Can I bundle it?', a: 'Yes — 25% off when added to any 12-week pathway.' },
    ],
  },
  'ba-for-ai-automation': {
    code: 'BX',
    name: 'BA for AI & Automation',
    line: 'Specify AI work that survives an audit.',
    blurb:
      'In five weeks you audit a process for automation, specify data and ownership, keep a human in the loop, and write acceptance criteria that pass audit.',
    stages: [
      {
        stage: 'Process audit',
        status: 'MAPPED',
        title: 'Find the workflow AI should actually touch.',
        tag: 'WEEK 01 · PROCESS SELECTION',
        artefact: 'Process automation audit',
      },
      {
        stage: 'Data spec',
        status: 'WRITTEN',
        title: 'Specify what the model needs and who owns it.',
        tag: 'WEEK 02 · DATA REQUIREMENTS',
        artefact: 'Data requirements spec',
      },
      {
        stage: 'Human loop',
        status: 'DESIGNED',
        title: 'Design where a person stays in the decision.',
        tag: 'WEEK 03 · WORKFLOW REDESIGN',
        artefact: 'Human-in-the-loop redesign',
      },
      {
        stage: 'Acceptance',
        status: 'DEFINED',
        title: 'Write criteria that hold up in an audit.',
        tag: 'WEEK 04 · AI ACCEPTANCE CRITERIA',
        artefact: 'AI acceptance criteria',
      },
      {
        stage: 'Governance',
        status: 'SIGNED',
        title: 'Hand over a spec a regulator could read.',
        tag: 'WEEK 05 · CAPSTONE DEFENCE',
        artefact: 'Governance handover pack',
      },
    ],
    caps: [
      { area: 'Automation audit', desc: 'Identify which part of a process AI should touch, and which it should not.' },
      { area: 'Data requirements', desc: 'Specify what the model needs, where it comes from, and who owns it.' },
      { area: 'Human-in-the-loop', desc: 'Redesign a workflow so a person stays accountable for the decision.' },
      { area: 'Acceptance criteria', desc: 'Write AI acceptance criteria that survive an audit.' },
      { area: 'Explainability', desc: 'Make a model decision legible to someone who has to justify it.' },
      { area: 'Governance handover', desc: 'Hand over a spec a risk team and a regulator can both read.' },
    ],
    artScores: [
      { score: '82', initials: 'GE' }, { score: '85', initials: 'AO' }, { score: '83', initials: 'GE' },
      { score: '86', initials: 'AO' }, { score: '84', initials: 'GE' },
    ],
    tools: ['PROCESS MINING', 'JIRA', 'CONFLUENCE', 'PROMPT SPECS', 'DATA DICTIONARIES', 'AUDIT LOGS'],
    facilitators: [
      {
        status: 'confirmed',
        name: 'Genesis Enwenyeokwu',
        role: 'CBAP · Product Lead',
        weeks: 'W01–03',
        bio: 'CBAP-certified Business Analyst and Product Lead at Rova, with over a decade across product, business analysis, and payments. Leads weeks one to three — the process audit and data specification.',
      },
      { status: 'tbc', role: 'Automation lead', weeks: 'W04–05' },
      { status: 'tbc', role: 'Guest reviewer · Risk & governance', weeks: 'W05' },
    ],
    ladder: [
      { role: 'BA · Automation projects', width: '58%' },
      { role: 'Senior BA · AI delivery', width: '80%' },
      { role: 'AI Governance Lead', width: '100%' },
    ],
    ladderNote: 'This is a first cohort, so we quote no placement numbers. The bars show what each rung is asked to own against the five artefacts you build.',
    faq: [
      { q: 'How is this different from the BA pathway?', a: 'It assumes you already do BA work. Five weeks entirely on specifying and governing AI and automation.' },
      { q: 'Do I need AI experience?', a: 'No. You need analysis experience. We supply the AI-specific practice.' },
      { q: 'Is this about using AI or specifying it?', a: 'Both. Using AI to work faster, and doing the BA work AI projects actually require.' },
      { q: 'Would a regulator accept the output?', a: 'That is the standard we write to — data lineage, human-in-the-loop, and auditable acceptance criteria.' },
    ],
  },
};
