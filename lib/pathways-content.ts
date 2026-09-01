// Real, approved pathway content ported verbatim from the prototype
// (docs/design/Upthrust-prototype-standalone.html). Copy is approved —
// reformat and lay it out, do not rewrite it. Cohort/date/status facts are
// NOT stored here — they come from lib/cohort-config.ts.

import type { PathwaySlug } from './cohort-config';
import type { FacilitatorEntry } from './intensives-content';

export interface PathwayContent {
  code: string;
  name: string;
  line: string;
  blurb: string;
  // "By Week 12 you can" — four numbered capability statements
  weekTwelve: [string, string, string, string];
  // Marketing bullet list of artefacts — identical to weekArt below (the
  // wording divergence between the two has been closed; kept as a separate
  // field because app/accelerator/AcceleratorContent.tsx and
  // components/home/DisciplineSwitcher.tsx both read `art` directly).
  art: string[];
  // Six capability areas assessed against the rubric
  caps: { area: string; desc: string }[];
  // Explicit week-ordered artefact array — 12 entries, true week order.
  // Do not zip against a separate week-title array by index.
  weekArt: [
    string, string, string, string, string, string,
    string, string, string, string, string, string,
  ];
  // Parallel metadata to weekArt — same 12-entry, same order — score +
  // reviewing-facilitator initials per artefact, used by a homepage gallery.
  artScores: { score: string; initials: string }[];
  sampleWork: { docTitle: string; docMeta: string; reviewerNote: string };
  diagram: { label: string; caption: string };
  quote: { text: string; who: string };
  profiles: { title: string; body: string }[];
  notFor: string;
  tools: string[];
  // Exactly three slots, matching the intensive facilitator-roster convention.
  facilitators: [FacilitatorEntry, FacilitatorEntry, FacilitatorEntry];
  ladder: { role: string; width: string }[];
  ladderNote: string;
  faq: { q: string; a: string }[];
}

export const PATHWAY_CONTENT: Record<PathwaySlug, PathwayContent> = {
  'product-management': {
    code: 'PM',
    name: 'Product Management',
    line: 'For people who want to decide what to build, why, and in what order.',
    blurb:
      'You will learn to write PRDs, define MVP scope, set success metrics, and lead cross-functional teams through real product decisions.',
    weekTwelve: [
      'Frame a problem worth solving',
      'Defend a roadmap to leadership',
      'Prove impact with real metrics',
      'Run a launch end to end',
    ],
    art: [
      'Product teardown + strategy analysis', 'Problem brief', 'Product strategy canvas',
      'Full PRD with edge cases', 'User journey map', 'Sprint backlog',
      'Metrics + kill criteria plan', 'Launch brief', 'Capstone project + presentation',
      'Portfolio case study', 'Interview story bank', 'Capability Passport',
    ],
    caps: [
      { area: 'Problem framing', desc: 'Take a vague executive ask and return a problem statement the team can act on.' },
      { area: 'Strategy & prioritisation', desc: 'Say no to good ideas with a reason your stakeholders accept.' },
      { area: 'Requirements & specs', desc: 'Write a PRD with edge cases engineering does not have to guess at.' },
      { area: 'Delivery partnership', desc: 'Run a sprint without becoming the bottleneck or the ticket clerk.' },
      { area: 'Measurement', desc: 'Instrument a feature before launch and read the result honestly after.' },
      { area: 'Stakeholder communication', desc: 'Give an executive update that ends in a decision, not a status list.' },
    ],
    weekArt: [
      'Product teardown + strategy analysis', 'Problem brief', 'Product strategy canvas',
      'Full PRD with edge cases', 'User journey map', 'Sprint backlog',
      'Metrics + kill criteria plan', 'Launch brief', 'Capstone project + presentation',
      'Portfolio case study', 'Interview story bank', 'Capability Passport',
    ],
    artScores: [
      { score: '82', initials: 'GE' }, { score: '79', initials: 'AO' }, { score: '84', initials: 'GE' },
      { score: '77', initials: 'GE' }, { score: '83', initials: 'AO' }, { score: '85', initials: 'GE' },
      { score: '80', initials: 'AO' }, { score: '86', initials: 'GE' }, { score: '81', initials: 'AO' },
      { score: '84', initials: 'GE' }, { score: '82', initials: 'AO' }, { score: '87', initials: 'GE' },
    ],
    sampleWork: {
      docTitle: 'PRD · Multi-currency savings for diaspora',
      docMeta: 'PRD-C02-v4 · 6 user stories · 3 metrics',
      reviewerNote: 'Your success metrics are stated but not instrumented — name the event and the owner before Week 8 review.',
    },
    diagram: {
      label: 'How a PM turns noise into a sequence',
      caption: 'FIG 01 · Six competing inputs, one defensible order — the Week 03 exercise',
    },
    quote: {
      text: '"Every concept is taught through practical, real-life examples — not slides and theory."',
      who: 'Ayodele Yeye · Senior BA, Government of Nova Scotia',
    },
    profiles: [
      { title: 'The ops or project lead', body: 'You already decide what the team does next week. You have never had to write down why, or defend it to a stakeholder who disagrees.' },
      { title: 'The analyst who wants the wheel', body: 'You produce the documents. Someone else sets the direction. You want to be the one who frames the problem.' },
      { title: 'The founder or consultant', body: 'You have shipped things. You need the vocabulary and artefacts a product team will recognise.' },
    ],
    notFor: 'If you want a title without owning trade-offs, this is the wrong pathway. Every week ends in a decision you have to defend.',
    tools: ['JIRA', 'CONFLUENCE', 'MIXPANEL', 'FIGMA', 'SQL BASICS', 'NOTION'],
    facilitators: [
      {
        status: 'confirmed',
        name: 'Genesis Enwenyeokwu',
        role: 'Product Lead · Rova',
        weeks: 'W01–06',
        bio: 'Product Lead at Rova, building diaspora financial products. Leads the opening six weeks — problem framing through the full PRD.',
      },
      { status: 'tbc', role: 'Senior PM · fintech', weeks: 'W07–11' },
      { status: 'tbc', role: 'Guest reviewer · Hiring manager', weeks: 'W12' },
    ],
    ladder: [
      { role: 'Associate Product Manager', width: '58%' },
      { role: 'Product Manager', width: '80%' },
      { role: 'Senior Product Manager', width: '100%' },
    ],
    ladderNote: 'Cohort graduates target the first two rungs. The bars show how far the twelve artefacts take you against what each rung is asked to produce.',
    faq: [
      { q: 'Can I do this alongside a full-time job?', a: 'Yes. Live sessions are evenings, and the 8–10 hours a week is designed around working professionals.' },
      { q: 'Do I need to have shipped a product before?', a: 'No. Most people arrive from ops, analysis, or delivery roles and have never owned a roadmap.' },
      { q: 'Will I have something to show recruiters?', a: 'Twelve artefacts, including a defended capstone — a roadmap, a PRD, a metrics plan, a launch review.' },
      { q: 'Is AI part of this?', a: 'Yes, throughout, as a working tool. The AI Product Builder intensive goes deeper if you want it.' },
    ],
  },
  'business-analysis': {
    code: 'BA',
    name: 'Business Analysis',
    line: 'For people who structure ambiguity for a living.',
    blurb:
      'You will learn to elicit requirements, map processes, write user stories engineers actually use, and run UAT that catches what others miss.',
    weekTwelve: [
      'Turn vague asks into specs',
      'Model a process others can follow',
      'Write requirements teams can build',
      'Sign off a release with UAT',
    ],
    art: [
      'Stakeholder map + RACI', 'Business case', 'Requirements elicitation notes', 'Full BRD',
      'As-Is / To-Be process maps', 'User stories with acceptance criteria', 'UAT pack + test scenarios',
      'Post-launch reporting framework', 'Capstone project + presentation', 'Portfolio case study',
      'Interview story bank', 'Capability Passport',
    ],
    caps: [
      { area: 'Elicitation', desc: 'Run a stakeholder session that surfaces what people actually need.' },
      { area: 'Requirements documentation', desc: 'Produce a BRD a delivery team can build from without a translator.' },
      { area: 'Process modelling', desc: 'Map As-Is and To-Be so the gap is obvious to everyone in the room.' },
      { area: 'Solution definition', desc: 'Turn a business need into acceptance criteria that hold up in review.' },
      { area: 'Testing & sign-off', desc: 'Write a UAT pack that catches what scoping missed.' },
      { area: 'Benefits & reporting', desc: 'Show whether the change delivered what the business case promised.' },
    ],
    weekArt: [
      'Stakeholder map + RACI', 'Business case', 'Requirements elicitation notes', 'Full BRD',
      'As-Is / To-Be process maps', 'User stories with acceptance criteria', 'UAT pack + test scenarios',
      'Post-launch reporting framework', 'Capstone project + presentation', 'Portfolio case study',
      'Interview story bank', 'Capability Passport',
    ],
    artScores: [
      { score: '84', initials: 'GE' }, { score: '78', initials: 'GE' }, { score: '81', initials: 'AO' },
      { score: '76', initials: 'GE' }, { score: '83', initials: 'AO' }, { score: '84', initials: 'GE' },
      { score: '79', initials: 'AO' }, { score: '85', initials: 'GE' }, { score: '88', initials: 'AO' },
      { score: '82', initials: 'GE' }, { score: '80', initials: 'AO' }, { score: '86', initials: 'GE' },
    ],
    sampleWork: {
      docTitle: 'BRD · Wallet onboarding — identity verification',
      docMeta: 'BRD-C01-v3 · 24 functional · 9 non-functional',
      reviewerNote: 'Your non-functional section is thin — add latency and failure-recovery expectations before Week 7 review.',
    },
    diagram: {
      label: 'As-Is to To-Be, and the break between',
      caption: 'FIG 01 · A real process break and the requirements that close it — Week 05',
    },
    quote: {
      text: '"I am practising Business Analysis at a senior level today because of the practical, in-depth training I received from Upthrust."',
      who: 'Uyoyou Taiye-Ayo · Senior BA, RBC Investor & Treasury',
    },
    profiles: [
      { title: 'The career switcher from a process role', body: 'Banking ops, insurance, healthcare admin, teaching. You have spent years inside processes and can already see where they break.' },
      { title: 'The diaspora professional repositioning', body: 'Your previous work does not translate cleanly to a UK or Canadian job description. You need artefacts that do.' },
      { title: 'The junior BA without a portfolio', body: 'You have the title but not the evidence. Twelve reviewed artefacts fix that.' },
    ],
    notFor: 'If you find precision tedious, this is the wrong pathway. The work rewards people who enjoy getting the detail exactly right.',
    tools: ['JIRA', 'CONFLUENCE', 'VISIO / LUCID', 'EXCEL MODELS', 'SQL BASICS', 'MIRO'],
    facilitators: [
      {
        status: 'confirmed',
        name: 'Genesis Enwenyeokwu',
        role: 'CBAP · Product Lead',
        weeks: 'W01–06',
        bio: 'CBAP-certified Business Analyst and Product Lead at Rova. Leads the opening six weeks — stakeholder mapping through the full BRD.',
      },
      { status: 'tbc', role: 'Senior BA · banking', weeks: 'W07–11' },
      { status: 'tbc', role: 'Guest reviewer · Hiring manager', weeks: 'W12' },
    ],
    ladder: [
      { role: 'Junior Business Analyst', width: '58%' },
      { role: 'Business Analyst', width: '80%' },
      { role: 'Senior BA / Product Owner', width: '100%' },
    ],
    ladderNote: 'Three of our alumni now hold senior BA roles in Canada and the UK. The bars show what each rung is expected to produce against what you build here.',
    faq: [
      { q: 'Is this enough to move into a BA role?', a: 'It gives you the artefacts and the vocabulary. Alumni now work as BAs in Nigeria, the UK, and Canada.' },
      { q: 'Do you cover CBAP or IIBA material?', a: 'The practice aligns with BABOK, and your facilitator is CBAP-certified — but this is a capability programme, not exam prep.' },
      { q: 'What if I already do BA work informally?', a: 'Most of our cohort does. You will formalise it and get a record that proves it.' },
      { q: 'How technical does it get?', a: 'You need SQL basics and comfort with data. No coding required.' },
    ],
  },
  'product-design': {
    code: 'PD',
    name: 'Product Design',
    line: 'For people who see the work through journeys and interface logic.',
    blurb:
      'You will learn to run research that changes a decision, structure a flow, build to a design system, and defend an interface with evidence rather than taste.',
    weekTwelve: [
      'Research before you design',
      'Design a journey that tests well',
      'Hand off work engineers can build',
      'Defend every design decision',
    ],
    art: [
      'Product teardown from a user lens', 'Research plan + interview notes', 'Journey map with friction points',
      'Information architecture + flows', 'Wireframe set for the core flow', 'Hi-fi screens on a design system',
      'Interactive prototype', 'Usability test findings + revisions', 'Capstone project + presentation',
      'Portfolio case study', 'Interview story bank', 'Capability Passport',
    ],
    caps: [
      { area: 'Research', desc: 'Plan and run interviews that change the design rather than confirm it.' },
      { area: 'Synthesis', desc: 'Turn messy findings into a journey map a team can prioritise from.' },
      { area: 'Structure & flows', desc: 'Design an information architecture people navigate without instruction.' },
      { area: 'Interface craft', desc: 'Ship hi-fi screens on a design system, not one-off pixels.' },
      { area: 'Testing', desc: 'Watch five users fail, then fix the design instead of blaming them.' },
      { area: 'Handoff & rationale', desc: 'Hand engineers a spec and defend every decision in it.' },
    ],
    weekArt: [
      'Product teardown from a user lens', 'Research plan + interview notes', 'Journey map with friction points',
      'Information architecture + flows', 'Wireframe set for the core flow', 'Hi-fi screens on a design system',
      'Interactive prototype', 'Usability test findings + revisions', 'Capstone project + presentation',
      'Portfolio case study', 'Interview story bank', 'Capability Passport',
    ],
    artScores: [
      { score: '80', initials: 'NE' }, { score: '83', initials: 'NE' }, { score: '85', initials: 'AO' },
      { score: '78', initials: 'NE' }, { score: '82', initials: 'NE' }, { score: '86', initials: 'AO' },
      { score: '84', initials: 'NE' }, { score: '81', initials: 'AO' }, { score: '79', initials: 'NE' },
      { score: '85', initials: 'NE' }, { score: '83', initials: 'AO' }, { score: '87', initials: 'NE' },
    ],
    sampleWork: {
      docTitle: 'Flow · Wallet onboarding — identity step',
      docMeta: 'FLOW-C01-v5 · 9 screens · 4 states',
      reviewerNote: 'Your error states are missing — a failed BVN check has no path forward. Add recovery before Week 8 review.',
    },
    diagram: {
      label: 'Where the journey actually breaks',
      caption: 'FIG 01 · Friction measured across 12 sessions, mapped to six screens — Week 04',
    },
    quote: {
      text: '"Concepts land because you are made to build the thing, not watch someone describe it."',
      who: 'Cohort 1 · Product Design pathway',
    },
    profiles: [
      { title: 'The self-taught designer', body: 'You can make things look right. You cannot yet show the research and testing that proves a decision, which is what senior roles interview on.' },
      { title: 'The graphic or brand designer moving to product', body: 'Your craft transfers. Flows, states, edge cases and design-system thinking are the gap.' },
      { title: 'The researcher or content person', body: 'You understand users already. You want to own the interface, not just inform it.' },
    ],
    notFor: 'If you want a visual-only portfolio, this is the wrong pathway. Every screen you present has to be justified by something you observed.',
    tools: ['FIGMA', 'FIGJAM', 'MAZE', 'NOTION', 'DESIGN TOKENS', 'WCAG 2.2'],
    facilitators: [
      { status: 'tbc', role: 'Product Design Lead', weeks: 'W01–07' },
      { status: 'tbc', role: 'UX Researcher', weeks: 'W08–11' },
      {
        status: 'confirmed',
        name: 'Genesis Enwenyeokwu',
        role: 'Product Lead · Rova',
        weeks: 'W12',
        bio: 'Product Lead at Rova. Leads Week 12 — the capstone defence panel.',
      },
    ],
    ladder: [
      { role: 'Junior Product Designer', width: '58%' },
      { role: 'Product Designer', width: '80%' },
      { role: 'Senior Product Designer', width: '100%' },
    ],
    ladderNote: 'This is a first cohort, so we quote no placement numbers. The bars show what each rung is asked to produce against what you build in twelve weeks.',
    faq: [
      { q: 'Do I need a portfolio to start?', a: 'No. You build one here — twelve pieces including research, journeys, screens, and a handoff spec.' },
      { q: 'Is this visual design or product design?', a: 'Product design. Research, structure, flows, and testing — not brand or illustration.' },
      { q: 'Which tools will I be working in?', a: 'Figma throughout, plus FigJam and Maze for research and testing.' },
      { q: 'Will my work be critiqued?', a: 'Every week, against a published rubric, and you revise before it enters your portfolio.' },
    ],
  },
  'payment-operations': {
    code: 'PO',
    name: 'Payment Operations',
    line: 'For people who keep money moving, and can prove where it went.',
    blurb:
      'You will learn to map payment flows end to end, run reconciliation and settlement, investigate failed transactions, and design controls that hold up to an audit.',
    weekTwelve: [
      'Map money end to end',
      'Reconcile at scale, daily',
      'Resolve an incident calmly',
      'Design the control that prevents it',
    ],
    art: [
      'Payment flow map (end to end)', 'Reconciliation model', 'Settlement + payout schedule',
      'Failed transaction investigation log', 'Chargeback and dispute runbook',
      'Controls matrix + segregation of duties', 'Ops KPI and SLA dashboard spec', 'Incident postmortem',
      'Capstone project + presentation', 'Portfolio case study', 'Interview story bank', 'Capability Passport',
    ],
    caps: [
      { area: 'Flow mapping', desc: 'Trace money end to end and name every point it can go missing.' },
      { area: 'Reconciliation', desc: 'Build and run a recon model that balances at close of business.' },
      { area: 'Exception handling', desc: 'Investigate a failed transaction and resolve it without guesswork.' },
      { area: 'Disputes & chargebacks', desc: 'Run a dispute response that stands up to a provider and a regulator.' },
      { area: 'Controls & risk', desc: 'Design the control that stops the same incident happening twice.' },
      { area: 'Ops reporting', desc: 'Specify the dashboard your team actually runs the day on.' },
    ],
    weekArt: [
      'Payment flow map (end to end)', 'Reconciliation model', 'Settlement + payout schedule',
      'Failed transaction investigation log', 'Chargeback and dispute runbook',
      'Controls matrix + segregation of duties', 'Ops KPI and SLA dashboard spec', 'Incident postmortem',
      'Capstone project + presentation', 'Portfolio case study', 'Interview story bank', 'Capability Passport',
    ],
    artScores: [
      { score: '81', initials: 'PN' }, { score: '84', initials: 'PN' }, { score: '87', initials: 'AO' },
      { score: '79', initials: 'PN' }, { score: '83', initials: 'PN' }, { score: '80', initials: 'AO' },
      { score: '85', initials: 'PN' }, { score: '82', initials: 'AO' }, { score: '84', initials: 'PN' },
      { score: '86', initials: 'PN' }, { score: '81', initials: 'AO' }, { score: '88', initials: 'PN' },
    ],
    sampleWork: {
      docTitle: 'Recon · Wallet top-up — processor vs ledger',
      docMeta: 'REC-C01-v2 · 3 sources · 11 break types',
      reviewerNote: 'Two break types have no owner and no ageing rule — a real ops team would drown. Assign both before Week 9 review.',
    },
    diagram: {
      label: 'Three sources, one number that must balance',
      caption: 'FIG 01 · A single day of reconciliation, eleven breaks — Week 06',
    },
    quote: {
      text: '"The reconciliation work alone changed how I read a payments incident."',
      who: 'Cohort 1 · Payment Operations pathway',
    },
    profiles: [
      { title: 'The banking or fintech ops person', body: 'You already chase failed transactions. You want the language of settlement, controls and audit so the next role is a step up, not sideways.' },
      { title: 'The finance or reconciliation analyst', body: 'You reconcile already. Payment rails, disputes and scheme rules are the gap between you and a payments ops role.' },
      { title: 'The support lead who escalates money issues', body: 'You see every failure first. You want to own the runbook instead of raising the ticket.' },
    ],
    notFor: 'If you want a purely strategic role, this is the wrong pathway. The work is operational, detailed, and accountable to a number that has to balance.',
    tools: ['EXCEL MODELS', 'SQL', 'PAYSTACK / FLUTTERWAVE', 'ISO 20022', 'RECON TOOLS', 'JIRA'],
    facilitators: [
      { status: 'tbc', role: 'Payment Ops Lead', weeks: 'W01–07' },
      { status: 'tbc', role: 'Settlement & recon', weeks: 'W08–11' },
      {
        status: 'confirmed',
        name: 'Genesis Enwenyeokwu',
        role: 'Product Lead · Rova',
        weeks: 'W12',
        bio: 'Product Lead at Rova, building diaspora financial products with real payment-ops exposure. Leads Week 12 — the capstone defence panel.',
      },
    ],
    ladder: [
      { role: 'Payment Operations Analyst', width: '58%' },
      { role: 'Payment Operations Specialist', width: '80%' },
      { role: 'Payment Ops Manager', width: '100%' },
    ],
    ladderNote: 'This is a first cohort, so we quote no placement numbers. The bars show what each rung is asked to own against what you build in twelve weeks.',
    faq: [
      { q: 'Who is this actually for?', a: 'People in banking, fintech ops, settlement, or customer support who want to own payment operations.' },
      { q: 'Do I need an accounting background?', a: 'No, but you should be comfortable in a spreadsheet. We teach the reconciliation logic from first principles.' },
      { q: 'Is this Nigeria-specific?', a: 'The examples are African-market first, but the controls, recon, and incident practice travel anywhere.' },
      { q: 'What do I leave with?', a: 'A reconciliation model, a controls matrix, an incident post-mortem, and a defended capstone.' },
    ],
  },
};
