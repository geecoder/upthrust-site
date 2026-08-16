// Real, approved pathway content ported verbatim from the prototype
// (docs/design/Upthrust-prototype-standalone.html). Copy is approved —
// reformat and lay it out, do not rewrite it. Cohort/date/status facts are
// NOT stored here — they come from lib/cohort-config.ts.

import type { PathwaySlug } from './cohort-config';

export interface PathwayContent {
  code: string;
  name: string;
  line: string;
  blurb: string;
  // "By Week 12 you can" — four numbered capability statements
  weekTwelve: [string, string, string, string];
  // Marketing bullet list of artefacts (distinct from the week-ordered weekArt below)
  art: string[];
  // Six capability areas assessed against the rubric
  caps: string[];
  // Explicit week-ordered artefact array — 12 entries, true week order.
  // Do not zip against a separate week-title array by index.
  weekArt: [
    string, string, string, string, string, string,
    string, string, string, string, string, string,
  ];
  sampleWork: { docTitle: string; docMeta: string; reviewerNote: string };
  diagram: { label: string; caption: string };
  quote: { text: string; who: string };
  profiles: { title: string; body: string }[];
  notFor: string;
  tools: string[];
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
      'Frame a problem before proposing a solution',
      'Set MVP scope and defend what you cut',
      'Write a PRD with the edge cases handled',
      'Define metrics and kill criteria up front',
    ],
    art: [
      'Product teardown + strategy analysis', 'Problem brief', 'Product strategy canvas',
      'Full PRD with edge cases', 'User journey map', 'Sprint backlog',
      'Metrics + kill criteria plan', 'Launch brief', 'Capstone project + presentation',
      'Portfolio case study', 'Interview story bank', 'Capability Passport (Premium)',
    ],
    caps: [
      'Problem framing & discovery', 'Product strategy & business context',
      'Prioritisation & scope decisions', 'Requirements & documentation (PRD)',
      'Metrics, measurement & kill criteria', 'Delivery leadership & stakeholder communication',
    ],
    weekArt: [
      'Product teardown + strategy analysis', 'Problem brief', 'Product strategy canvas',
      'Requirements outline + user stories', 'User journey map', 'Full PRD with edge cases',
      'MVP scope + trade-off log', 'Sprint backlog', 'Acceptance criteria + edge case review',
      'Metrics, kill criteria + launch brief', 'Portfolio case study + interview story bank',
      'Capstone presented and defended',
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
    tools: ['Jira', 'Confluence', 'Figma (read)', 'Miro', 'Amplitude', 'Google Analytics', 'Notion', 'Looker Studio', 'SQL basics'],
    ladder: [
      { role: 'Associate Product Manager', width: '58%' },
      { role: 'Product Manager', width: '78%' },
      { role: 'Senior Product Manager', width: '92%' },
      { role: 'Product Lead / Head of Product', width: '100%' },
    ],
    ladderNote: 'Cohort graduates target the first two rungs. The bars show how far the twelve artefacts take you against what each rung is asked to produce.',
    faq: [
      { q: 'Do I need to be technical?', a: 'No. You need to be able to reason about trade-offs and write clearly. You will read enough of a system to ask good questions, not build it.' },
      { q: 'How is this different from the BA pathway?', a: 'PM owns what gets built and why. BA owns the precision of what gets built. If you would rather set direction than specify detail, PM is the fit.' },
      { q: 'What does the capstone look like?', a: 'You pick one of eight real briefs, then produce a problem brief, strategy canvas, full PRD, metrics plan, and launch brief — and defend the whole thing in Week 12.' },
      { q: 'Will I use AI tools?', a: 'Yes, where they help — drafting, synthesis, competitive scans. You will still be marked on your own reasoning, because that is what an interview tests.' },
    ],
  },
  'business-analysis': {
    code: 'BA',
    name: 'Business Analysis',
    line: 'For people who structure ambiguity for a living.',
    blurb:
      'You will learn to elicit requirements, map processes, write user stories engineers actually use, and run UAT that catches what others miss.',
    weekTwelve: [
      'Elicit requirements from stakeholders who disagree',
      'Model the As-Is and defend a To-Be process',
      'Write a BRD a delivery team can build from',
      'Run UAT that finds what scoping missed',
    ],
    art: [
      'Stakeholder map + RACI', 'Business case', 'Requirements elicitation notes', 'Full BRD',
      'As-Is / To-Be process maps', 'User stories with acceptance criteria', 'UAT pack + test scenarios',
      'Post-launch reporting framework', 'Capstone project + presentation', 'Portfolio case study',
      'Interview story bank', 'Capability Passport (Premium)',
    ],
    caps: [
      'Requirements elicitation & analysis', 'Stakeholder management & facilitation',
      'Business process modelling', 'Solution design & documentation (BRD)',
      'UAT planning & test scenario writing', 'Agile delivery & backlog contribution',
    ],
    weekArt: [
      'Stakeholder map + RACI', 'Problem statement + business case', 'Business context analysis',
      'Requirements elicitation notes + user stories', 'As-Is / To-Be process maps',
      'Full BRD (functional + non-functional)', 'Requirement prioritisation log (MoSCoW)',
      'Backlog refinement + acceptance criteria', 'UAT pack + test scenarios',
      'Post-launch reporting framework', 'Portfolio case study + interview story bank',
      'Capstone presented and defended',
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
    tools: ['Jira', 'Confluence', 'Visio / Lucidchart', 'BPMN 2.0', 'Excel (advanced)', 'SQL basics', 'Postman', 'Azure DevOps', 'Miro'],
    ladder: [
      { role: 'Junior Business Analyst', width: '55%' },
      { role: 'Business Analyst', width: '76%' },
      { role: 'Senior Business Analyst', width: '92%' },
      { role: 'Lead BA / Product Owner', width: '100%' },
    ],
    ladderNote: 'Three of our alumni now hold senior BA roles in Canada and the UK. The bars show what each rung is expected to produce against what you build here.',
    faq: [
      { q: 'Is CBAP or ECBA covered?', a: 'The curriculum follows BABOK practice closely, so it is strong preparation, but this is not an exam-prep course. You leave with a portfolio, not a syllabus.' },
      { q: 'How much writing is involved?', a: 'A lot. A BRD, user stories, acceptance criteria, test scenarios. If you cannot write clearly you will find this hard — and that is exactly the skill employers screen for.' },
      { q: 'Do I need to know SQL?', a: 'No, but you will learn enough to check data yourself instead of waiting on an engineer.' },
      { q: 'How is this different from the PM pathway?', a: 'BA owns precision — requirements, process, proof. PM owns direction. Many people do both eventually; start where your instincts already are.' },
    ],
  },
  'product-design': {
    code: 'PD',
    name: 'Product Design',
    line: 'For people who see the work through journeys and interface logic.',
    blurb:
      'You will learn to run research that changes a decision, structure a flow, build to a design system, and defend an interface with evidence rather than taste.',
    weekTwelve: [
      'Run research that changes a product decision',
      'Structure a flow and its information architecture',
      'Build hi-fi screens on a real design system',
      'Test with users and revise on what you saw',
    ],
    art: [
      'Product teardown from a user lens', 'Research plan + interview notes', 'Journey map with friction points',
      'Information architecture + flows', 'Wireframe set for the core flow', 'Hi-fi screens on a design system',
      'Interactive prototype', 'Usability test findings + revisions', 'Capstone project + presentation',
      'Portfolio case study', 'Interview story bank', 'Capability Passport (Premium)',
    ],
    caps: [
      'User research & synthesis', 'Information architecture & flows',
      'Interaction design & prototyping', 'Visual craft & design system use',
      'Usability testing & iteration', 'Design communication & critique',
    ],
    weekArt: [
      'Product teardown from a user lens', 'Research plan + interview notes', 'Opportunity framing + design brief',
      'User stories translated to screen requirements', 'Journey map with friction points',
      'Information architecture + flows', 'Wireframe set for the core flow', 'Hi-fi screens on a design system',
      'Usability test findings + revisions', 'Interactive prototype + handoff notes',
      'Portfolio case study + interview story bank', 'Capstone presented and defended',
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
    tools: ['Figma', 'FigJam', 'Maze / Useberry', 'Design tokens', 'Auto-layout', 'Prototyping', 'Accessibility (WCAG AA)', 'Notion', 'Loom'],
    ladder: [
      { role: 'Junior Product Designer', width: '56%' },
      { role: 'Product Designer', width: '78%' },
      { role: 'Senior Product Designer', width: '92%' },
      { role: 'Design Lead', width: '100%' },
    ],
    ladderNote: 'This is a first cohort, so we quote no placement numbers. The bars show what each rung is asked to produce against what you build in twelve weeks.',
    faq: [
      { q: 'Do I need an existing portfolio to join?', a: 'No. You need to be comfortable in Figma. You will leave with one deep case study, which is worth more than five shallow ones.' },
      { q: 'Is this UI or UX?', a: 'Both, in the order real teams work: research, structure, flow, then interface. Pretty screens with no reasoning do not pass the Week 12 defence.' },
      { q: 'Why is Design only starting now?', a: 'We ran PM and BA first to prove the delivery model. Design opens with the same twelve-week spine and the same review discipline.' },
      { q: 'Will I work with the PM and BA cohorts?', a: 'Yes. Some labs are cross-pathway on the same brief, which is the closest thing to a real product team.' },
    ],
  },
  'payment-operations': {
    code: 'PO',
    name: 'Payment Operations',
    line: 'For people who keep money moving, and can prove where it went.',
    blurb:
      'You will learn to map payment flows end to end, run reconciliation and settlement, investigate failed transactions, and design controls that hold up to an audit.',
    weekTwelve: [
      'Map a payment flow end to end, including failure',
      'Reconcile ledger, processor, and bank statements',
      'Investigate a failed transaction to root cause',
      'Design controls an auditor will accept',
    ],
    art: [
      'Payment flow map (end to end)', 'Reconciliation model', 'Settlement + payout schedule',
      'Failed transaction investigation log', 'Chargeback and dispute runbook',
      'Controls matrix + segregation of duties', 'Ops KPI and SLA dashboard spec', 'Incident postmortem',
      'Capstone project + presentation', 'Portfolio case study', 'Interview story bank', 'Capability Passport (Premium)',
    ],
    caps: [
      'Payment flow & scheme knowledge', 'Reconciliation & settlement',
      'Exception & dispute handling', 'Controls, audit & segregation of duties',
      'Operational reporting & SLAs', 'Incident response & postmortems',
    ],
    weekArt: [
      'Payment flow map (end to end)', 'Failure mode inventory', 'Business case for an operational fix',
      'Requirements for a reconciliation report', 'As-Is / To-Be operations process maps', 'Reconciliation model',
      'Settlement + payout schedule', 'Chargeback and dispute runbook', 'Failed transaction investigation log',
      'Controls matrix + ops KPI and SLA spec', 'Portfolio case study + interview story bank',
      'Capstone presented and defended',
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
    tools: ['Excel (advanced)', 'SQL', 'Postman', 'Paystack / Flutterwave', 'Stripe dashboard', 'Jira Service Mgmt', 'Metabase', 'Sheets + pivot', 'BPMN 2.0'],
    ladder: [
      { role: 'Payment Operations Analyst', width: '58%' },
      { role: 'Payment Operations Specialist', width: '78%' },
      { role: 'Senior Ops / Recon Lead', width: '92%' },
      { role: 'Head of Payment Operations', width: '100%' },
    ],
    ladderNote: 'This is a first cohort, so we quote no placement numbers. The bars show what each rung is asked to own against what you build in twelve weeks.',
    faq: [
      { q: 'Is this a finance or a tech role?', a: 'Both. You sit between the ledger and the engineers. You will read API responses and reconcile a statement in the same afternoon.' },
      { q: 'Do I need payments experience?', a: 'It helps but is not required. Ops, finance, or support experience with a genuine interest in how money moves is enough.' },
      { q: 'Which rails do you cover?', a: 'Cards, bank transfers and wallets, with African rails as the primary context and cross-border settlement as the harder case.' },
      { q: 'Is there coding?', a: 'Enough SQL to answer your own questions, and enough Postman to see what an API actually returned. No software engineering.' },
    ],
  },
};
