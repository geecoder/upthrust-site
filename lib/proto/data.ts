// Every constant in this file is transcribed verbatim from the prototype's
// `class Component extends DCLogic` (Upthrust-v3-prototype-standalone.html).
// The prototype is the specification. Do not reword, reorder, or "improve"
// anything here — the site's copy, ordering, and numbers all come from it.

export type ProgKey = 'pm' | 'ba' | 'pd' | 'po' | 'aipb' | 'baai';
export type CurKey = 'ng' | 'uk' | 'ca' | 'us';

export const PROG_IDS: ProgKey[] = ['pm', 'ba', 'pd', 'po', 'aipb', 'baai'];

// The prototype's SPA `route` state maps onto real URLs here. Everything else
// about navigation behaviour is unchanged.
export const PROG_HREF: Record<ProgKey, string> = {
  pm: '/pathways/product-management',
  ba: '/pathways/business-analysis',
  pd: '/pathways/product-design',
  po: '/pathways/payment-operations',
  aipb: '/intensives/ai-product-builder',
  baai: '/intensives/ba-for-ai-automation',
};

export const P: Record<ProgKey, { n: string; l: string; wk: string; fam: 'path' | 'int'; seats: number; cap: number; code: string }> = {
  pm: { n: 'Product Management', l: 'Own outcomes, not a backlog.', wk: '12', fam: 'path', seats: 14, cap: 25, code: 'PM' },
  ba: { n: 'Business Analysis', l: 'Turn ambiguity into structure.', wk: '12', fam: 'path', seats: 16, cap: 25, code: 'BA' },
  pd: { n: 'Product Design', l: 'Design what people can actually use.', wk: '12', fam: 'path', seats: 20, cap: 22, code: 'PD' },
  po: { n: 'Payment Operations', l: 'Keep money moving and reconciled.', wk: '12', fam: 'path', seats: 18, cap: 22, code: 'PO' },
  aipb: { n: 'AI Product Builder', l: 'Ship a working AI product.', wk: '5', fam: 'int', seats: 15, cap: 20, code: 'AI' },
  baai: { n: 'BA for AI & Automation', l: 'Specify AI work that survives audit.', wk: '5', fam: 'int', seats: 17, cap: 20, code: 'BX' },
};

// Currency, processor and the two intensive prices (standalone, bundled).
// The intensive figures are the only prices here still carried over from the
// prototype — the two intensives do not exist on production, so there was
// nothing live to read them back from.
// The prototype's own `std`/`prem` arrays are gone: they were one shared price
// table for all four pathways with a three-payment tier, and production is
// per-pathway with two payments. See PATH_PRICE below.
export const CUR: Record<CurKey, { c: string; proc: string; int: [number, number] }> = {
  ng: { c: 'NGN', proc: 'BANK TRANSFER', int: [250000, 180000] },
  uk: { c: 'GBP', proc: 'BANK TRANSFER', int: [395, 295] },
  ca: { c: 'CAD', proc: 'BANK TRANSFER', int: [690, 520] },
  us: { c: 'USD', proc: 'BANK TRANSFER', int: [495, 375] },
};

// Live pricing as served by web.upthrustdigital.com. The USD column was read
// back off production directly (PM 895/1295, BA 795/1195, PD 895/1295,
// PO 995/1495) and matches; NGN/GBP/CAD are the same table's other columns.
export type PathKey = 'pm' | 'ba' | 'pd' | 'po';

export const PATH_PRICE: Record<PathKey, Record<CurKey, { std: number; prem: number }>> = {
  pm: { ng: { std: 375000, prem: 650000 }, uk: { std: 695, prem: 995 }, ca: { std: 1095, prem: 1595 }, us: { std: 895, prem: 1295 } },
  ba: { ng: { std: 350000, prem: 500000 }, uk: { std: 595, prem: 895 }, ca: { std: 995, prem: 1495 }, us: { std: 795, prem: 1195 } },
  pd: { ng: { std: 300000, prem: 550000 }, uk: { std: 695, prem: 995 }, ca: { std: 1095, prem: 1595 }, us: { std: 895, prem: 1295 } },
  po: { ng: { std: 400000, prem: 700000 }, uk: { std: 795, prem: 1195 }, ca: { std: 1195, prem: 1795 }, us: { std: 995, prem: 1495 } },
};

// Production charges no instalment premium — each of two payments is half the
// full price. Keeping it derived means the two can never drift apart.
const half = (n: number) => Math.round(n / 2);

export function priceFor(k: ProgKey, cur: CurKey) {
  const c = CUR[cur];
  if (P[k].fam === 'int') {
    return { code: c.c, proc: c.proc, std: c.int[0], prem: c.int[0], stdP2: c.int[0], premP2: c.int[0], alone: c.int[0], bundle: c.int[1] };
  }
  const p = PATH_PRICE[k as PathKey][cur];
  return { code: c.c, proc: c.proc, std: p.std, prem: p.prem, stdP2: half(p.std), premP2: half(p.prem), alone: c.int[0], bundle: c.int[1] };
}

// The prototype's BANK constant lived here, holding bracketed placeholder
// account details. It has been removed rather than filled in: this module is
// imported by 'use client' components, so anything here is compiled into the
// JavaScript bundle and shipped to every visitor of every page. Real payee
// details now come from lib/payments/bank-accounts.ts, which is `server-only`
// and reads .env.local, and the pathway page passes down just the one region
// the visitor needs.

export const Q: { s: string; q: string; o: { t: string; k: 'pm' | 'ba' | 'pd' | 'po' }[] }[] = [
  { s: 'A stakeholder asks for "a dashboard".', q: 'Your first move?', o: [
    { t: 'Ask what decision it is meant to support', k: 'pm' },
    { t: 'Ask who uses it and where the data lives', k: 'ba' },
    { t: 'Sketch two versions and watch someone read them', k: 'pd' },
    { t: 'Ask which numbers must reconcile daily', k: 'po' } ] },
  { s: 'Two weeks to launch, one flow will not be ready.', q: 'What do you do?', o: [
    { t: 'Cut scope, protect the date, write down what dropped', k: 'pm' },
    { t: 'Map affected requirements, recheck acceptance criteria', k: 'ba' },
    { t: 'Design a simpler interim journey', k: 'pd' },
    { t: 'Write the manual workaround and name its owner', k: 'po' } ] },
  { s: 'You inherit an undocumented process.', q: 'Where do you start?', o: [
    { t: 'Interview the people who run it, draw the As-Is', k: 'ba' },
    { t: 'Find the metric it moves, work backwards', k: 'pm' },
    { t: 'Walk it as a user, note every friction point', k: 'pd' },
    { t: 'Trace one real transaction until it breaks', k: 'po' } ] },
  { s: 'The team cannot agree what to build next.', q: 'How do you break the tie?', o: [
    { t: 'Rank the options against the business goal', k: 'pm' },
    { t: 'Get agreement on the problem statement first', k: 'ba' },
    { t: 'Prototype both so the argument gets concrete', k: 'pd' },
    { t: 'Cost each one in operational load', k: 'po' } ] },
  { s: 'A feature launched last month is barely used.', q: 'First check?', o: [
    { t: 'The funnel and the instrumentation', k: 'pm' },
    { t: 'The requirements against what shipped', k: 'ba' },
    { t: 'Five users attempting the task while I watch', k: 'pd' },
    { t: 'Error rates, and what happened to the money', k: 'po' } ] },
  { s: 'A full day, no meetings.', q: 'What would you enjoy writing?', o: [
    { t: 'A strategy canvas and a metrics plan', k: 'pm' },
    { t: 'A BRD with acceptance criteria and edge cases', k: 'ba' },
    { t: 'A journey map and a set of screens', k: 'pd' },
    { t: 'A reconciliation model and a controls matrix', k: 'po' } ] },
  { s: 'An executive wants a mid-sprint update.', q: 'What do you bring?', o: [
    { t: 'Outcomes, risks, and the one decision I need', k: 'pm' },
    { t: 'Requirement status with open questions listed', k: 'ba' },
    { t: 'The current build and what changed', k: 'pd' },
    { t: 'Volumes processed and exceptions outstanding', k: 'po' } ] },
  { s: 'A vendor demos an AI tool. The room is excited.', q: 'Your instinct?', o: [
    { t: 'Ask what outcome it moves and how we would know', k: 'pm' },
    { t: 'Ask what data it needs and who reviews output', k: 'ba' },
    { t: 'Ask how a user recovers when it is wrong', k: 'pd' },
    { t: 'Ask what happens to the audit trail', k: 'po' } ] },
  { s: 'One week to de-risk an expensive bet.', q: 'What do you run?', o: [
    { t: 'The cheapest test that could prove us wrong', k: 'pm' },
    { t: 'Stakeholder interviews to surface constraints', k: 'ba' },
    { t: 'A clickable prototype with real users', k: 'pd' },
    { t: 'A dry run on real volumes', k: 'po' } ] },
  { s: 'Your last difficult project.', q: 'What frustrated you most?', o: [
    { t: 'Work not tied to any outcome', k: 'pm' },
    { t: 'Ambiguity nobody would write down', k: 'ba' },
    { t: 'Decisions made without seeing the experience', k: 'pd' },
    { t: 'Numbers that never balanced, nobody chasing why', k: 'po' } ] },
  { s: 'UAT finds a defect that is arguably "as specified".', q: 'Next?', o: [
    { t: 'Fix the spec first, then decide on the defect', k: 'ba' },
    { t: 'Judge it on user impact, decide if we ship', k: 'pm' },
    { t: 'Check whether the design misled the user', k: 'pd' },
    { t: 'Check what it did to the ledger', k: 'po' } ] },
  { s: 'Twelve weeks from now, in an interview.', q: 'What do you want to show?', o: [
    { t: 'A product decision I made and what it delivered', k: 'pm' },
    { t: 'A requirements pack a team could build from', k: 'ba' },
    { t: 'A journey I redesigned and how it tested', k: 'pd' },
    { t: 'An incident I resolved and the control I added', k: 'po' } ] },
];

export const DIMS: { l: string; k: 'pm' | 'ba' | 'pd' | 'po' }[] = [
  { l: 'Product judgement', k: 'pm' }, { l: 'Structured thinking', k: 'ba' },
  { l: 'Experience reasoning', k: 'pd' }, { l: 'Operational rigour', k: 'po' },
];

export const ABOUT = {
  shifts: [
    { a: 'Learning concepts', b: 'Applying them' },
    { a: 'Collecting certificates', b: 'Building evidence' },
    { a: 'Career confusion', b: 'Professional clarity' },
    { a: 'Potential', b: 'Proof' },
  ],
  beliefs: [
    { n: '01', t: 'Capability over credentials', d: 'A certificate says you attended. A portfolio says you can do the work.' },
    { n: '02', t: 'Practice over theory', d: 'Every concept is taught through a real scenario from a real market.' },
    { n: '03', t: 'Evidence over claims', d: 'You leave with artefacts a hiring manager can read, not adjectives.' },
    { n: '04', t: 'Honesty over hype', d: 'We do not guarantee jobs. We guarantee you will be ready to compete for one.' },
  ],
  timeline: [
    { y: '2019', t: 'Upthrust begins', d: 'Founded to close the gap between training and capability.' },
    { y: '2021', t: 'Cohort model formalised', d: 'Live, capped cohorts replace one-off workshops.' },
    { y: '2023', t: '1,000 professionals trained', d: 'Alumni working across Nigeria, the UK and Canada.' },
    { y: '2025', t: 'The Capability Passport', d: 'A verifiable record of assessed, defended work.' },
    { y: '2026', t: 'Six programmes', d: 'Four pathways and two AI intensives, all cohort-based.' },
  ],
  stats: [
    { n: 1000, s: '+', l: 'PROFESSIONALS TRAINED', raw: 0 },
    { n: 2019, s: '', l: 'FOUNDED', raw: 1 },
    { n: 6, s: '', l: 'PROGRAMMES', raw: 0 },
    { n: 25, s: '', l: 'MAX PER COHORT', raw: 0 },
  ],
};

export const FOOT: { h: string; links: { l: string; k: string }[] }[] = [
  { h: 'PATHWAYS', links: [
    { l: 'Product Management', k: 'pm' }, { l: 'Business Analysis', k: 'ba' },
    { l: 'Product Design', k: 'pd' }, { l: 'Payment Operations', k: 'po' },
  ] },
  { h: 'INTENSIVES', links: [
    { l: 'AI Product Builder', k: 'aipb' }, { l: 'BA for AI & Automation', k: 'baai' },
  ] },
  { h: 'EXPLORE', links: [
    { l: 'The Accelerator', k: 'accel' }, { l: 'Career Assessment', k: 'assess' }, { l: 'About', k: 'about' },
  ] },
];

export const SHIFT = [
  { a: 'Certificate collected', b: 'Evidence produced', n: 85 },
  { a: 'Course completed', b: 'Capability demonstrated', n: 78 },
  { a: '"I attended X program"', b: '"Here is my capstone"', n: 91 },
  { a: 'Passive learner', b: 'Active builder', n: 83 },
];

export const LOOPX = [
  { n: '01', t: 'Concept class', m: '90 MIN · LIVE', d: 'One framework, taught live. No more. You leave able to name the thing, know when it applies, and know what bad practice looks like.', o: 'Weekly framework understood' },
  { n: '02', t: 'Real-world case', m: '30 MIN · LIVE', d: 'A real situation from a Nigerian, UK or Canadian team, walked end to end — including what went wrong.', o: 'Pattern recognition in context' },
  { n: '03', t: 'Practical lab', m: '60 MIN · LIVE', d: 'You do the work while a facilitator watches. Mistakes get corrected in the room, not in a comment thread a week later.', o: 'Corrected technique' },
  { n: '04', t: 'Weekly assignment', m: 'SELF-PACED · 3–4 HRS', d: 'One artefact per week on a real capstone brief. This is the work that becomes your portfolio.', o: 'One portfolio artefact' },
  { n: '05', t: 'Structured feedback', m: 'WITHIN 48 HRS', d: 'Scored against the published rubric with written notes. Not a grade — a revision list you can act on.', o: 'A specific list to fix' },
  { n: '06', t: 'Reflection', m: '15 MIN · ASYNC', d: 'You write down what you decided and why, in the language you will use in an interview.', o: 'An interview-ready story' },
];

export const SPINE = [
  { w: 'W00', t: 'Onboarding & diagnostic', d: 'Baseline assessment, tool setup, pathway confirmation, community induction.', p: 0 },
  { w: 'W01', t: 'Digital product foundations', d: 'How real product teams work — PM, BA, Design, Engineering, QA, Marketing, Ops, and how they hand work over.', p: 0 },
  { w: 'W02', t: 'Problem discovery', d: 'Defining user and business problems clearly before jumping to solutions.', p: 0 },
  { w: 'W03', t: 'Product strategy & business context', d: 'Connecting problems to business goals, MVP scope, and why this and not something else.', p: 0 },
  { w: 'W04', t: 'Requirements & solution definition', d: 'Turning a framed problem into something a delivery team can actually build.', p: 1 },
  { w: 'W05', t: 'Process & experience mapping', d: 'Making the current and future state visible, and finding where it breaks.', p: 1 },
  { w: 'W06', t: 'Documentation that survives delivery', d: 'Writing the artefact your team still trusts in week nine.', p: 1 },
  { w: 'W07', t: 'Data, metrics & instrumentation', d: 'Deciding what to measure before you ship, not after.', p: 1 },
  { w: 'W08', t: 'Working inside a delivery team', d: 'Ceremonies, trade-offs, and holding the line on scope.', p: 2 },
  { w: 'W09', t: 'Quality, testing & sign-off', d: 'Proving it works before anyone else has to find out that it does not.', p: 2 },
  { w: 'W10', t: 'Launch & go-to-market', d: 'Getting it into the world, and reading what happens next.', p: 2 },
  { w: 'W11', t: 'Portfolio & interview readiness', d: 'Turning twelve weeks of work into a case study and a story bank.', p: 2 },
  { w: 'W12', t: 'Capstone defence', d: 'You present to a panel and answer for every decision. This is where the credential is earned.', p: 3 },
];

export const PHASE = [
  { l: 'Foundation', w: 'WEEKS 0–3', c: 'var(--seal-300)' },
  { l: 'Core skills', w: 'WEEKS 4–7', c: 'var(--ink-300)' },
  { l: 'Delivery', w: 'WEEKS 8–11', c: 'var(--seal-500)' },
  { l: 'Capstone', w: 'WEEK 12', c: 'var(--moss-500)' },
];

export const WHO = {
  yes: [
    { t: 'Career switchers who are serious', d: 'Banking, ops, support, healthcare, education, consulting — you are making a move, not dabbling.' },
    { t: 'Diaspora professionals rebuilding', d: 'You need a portfolio that speaks the language of the market you moved to.' },
    { t: 'Stuck in product-adjacent roles', d: 'You already do the work. The Passport helps your title catch up to your reality.' },
    { t: 'Early-career, filtering out', d: 'Evidence replaces the "3 years experience required" catch-22.' },
    { t: 'People who will do the work', d: 'Every session. Every assignment. Every revision.' },
  ],
  no: [
    { t: 'You are collecting certificates', d: 'We do not lead with credentials, and the work is not optional.' },
    { t: 'You cannot commit 8–10 hours', d: 'Partial engagement produces weak portfolios. Weak portfolios do not impress employers.' },
    { t: 'You expect a guaranteed job', d: 'We promise readiness, evidence, and confidence — not a hire.' },
    { t: 'You want self-paced video', d: 'This is live and cohort-based. Upthrust is not a video library.' },
  ],
};

export const BRIEFS = [
  { id: 'C01', lv: 'Intermediate', r: 'Nigeria', i: 'Fintech', t: 'Digital Wallet Onboarding — Identity Verification Drop-off', d: 'A leading Nigerian digital wallet has a 58% drop-off at the BVN/NIN identity verification step.' },
  { id: 'C02', lv: 'Advanced', r: 'UK / Diaspora', i: 'Fintech', t: 'Multi-Currency Savings for the African Diaspora', d: 'Save in GBP, USD and NGN simultaneously, with cross-border transfer on maturity.' },
  { id: 'C03', lv: 'Advanced', r: 'Nigeria / West Africa', i: 'Health Tech', t: 'Community Health Navigation Platform', d: 'Helping lower-income users book, triage symptoms, and find affordable care nearby.' },
  { id: 'C04', lv: 'Intermediate', r: 'Nigeria / Ghana', i: 'E-commerce / SME', t: 'SME Invoice, Inventory & Payment Tool', d: 'Replacing WhatsApp, Excel and paper for small business owners in Lagos and Accra.' },
  { id: 'C05', lv: 'Advanced', r: 'Nigeria', i: 'Transport / Logistics', t: 'Last-Mile Delivery Operations Platform', d: '500+ deliveries a day, losing 23% to wrong addresses, no-shows and comms failures.' },
  { id: 'C06', lv: 'Intermediate', r: 'UK / Canada', i: 'Proptech', t: 'Rental Application & Tenancy Management', d: 'Digitising the rental process from application and referencing through to rent collection.' },
  { id: 'C07', lv: 'Intermediate', r: 'Nigeria / East Africa', i: 'Edtech', t: 'Student Learning & Progress Tracking', d: 'Courses across 12 countries, 67% mid-course drop-off, no instructor visibility.' },
  { id: 'C08', lv: 'Advanced', r: 'Nigeria / West Africa', i: 'Government / NGO', t: 'Beneficiary Management & Grant Disbursement', d: '10,000 rural beneficiaries on Excel and paper. 18% of the programme lost to waste.' },
];

// The prototype's answer for payment plans reads "in full, two, or three".
// The user has twice confirmed two-payment-only, so the plans themselves are
// unchanged from the prototype and this answer stays as written until they
// resolve the conflict.
export const ACFAQ = [
  { q: 'What exactly is the Career Capability Accelerator?', a: 'A twelve-week live cohort where you work through realistic product scenarios, build portfolio-grade deliverables, defend your decisions, and earn a Capability Passport. Four pathways run on one shared spine.' },
  { q: 'How much time per week does this take?', a: '8–10 hours. Roughly three live, three to four on the weekly artefact, and the rest on feedback and reflection.' },
  { q: 'What is the difference between Standard and Premium?', a: 'Standard is the full live programme with group feedback and a Capability Record. Premium adds individual written feedback, a 1:1 portfolio review, a mock interview, a Demo Day slot, and the Verified Passport.' },
  { q: 'Can I switch pathways mid-programme?', a: 'Up to the end of Week 2, yes — the first three weeks are a shared spine. After that your capstone brief is already in motion.' },
  { q: 'Do you offer payment plans?', a: 'Yes, on every pathway: in full, two payments, or three. Each programme page shows exactly what every option costs in your currency.' },
];

// The four pathway sets are Upthrust's own copy, used verbatim — the one
// place in this file that is not transcribed from the prototype. The two
// intensives below still carry the prototype's original four.
export const ASK: Record<ProgKey, { q: string; a: string }[]> = {
  pm: [
    { q: "Who is the Product Management program designed for?", a: "It is designed for aspiring Product Managers, career switchers, junior PMs, Business Analysts transitioning into product, founders and professionals who want to understand how successful digital products are discovered, built, launched and grown." },
    { q: "Do I need previous Product Management experience?", a: "No. The program covers the foundations while progressively introducing the practical skills and decision-making required to operate effectively within a product team." },
    { q: "What will I learn in the Product Management program?", a: "You will learn product discovery, customer and market understanding, problem definition, product strategy, prioritisation, roadmapping, requirements, experimentation, product delivery, stakeholder management, metrics, growth and continuous product improvement." },
    { q: "Will I build or work on a real product during the program?", a: "The program is highly practical. You will work through product scenarios and projects that require you to identify problems, make product decisions, define solutions and create the artefacts expected from a Product Manager." },
    { q: "Will I learn how to create PRDs, roadmaps and user stories?", a: "Yes. You will learn how and when to use common product artefacts including Product Requirement Documents, product roadmaps, user stories, acceptance criteria, prioritisation frameworks, product briefs and other relevant documentation." },
    { q: "Does the course cover product strategy as well as product delivery?", a: "Yes. Product Management is more than managing tickets or writing requirements. You will learn how customer problems, business objectives, market opportunities, product strategy and execution connect." },
    { q: "Will I learn product analytics and metrics?", a: "Yes. You will learn how Product Managers define success, choose meaningful metrics, analyse product performance, understand funnels and user behaviour, and use data alongside customer insight to inform decisions." },
    { q: "Will I learn how to work with Designers and Engineers?", a: "Yes. A major part of modern Product Management is cross-functional collaboration. You will learn how PMs work with Product Designers, Engineers, Business Analysts, QA, Operations, Commercial teams and other stakeholders." },
    { q: "Is the program suitable for someone transitioning from Business Analysis or Project Management?", a: "Yes. Professionals from BA, project management, operations, engineering, design, marketing and other backgrounds can transition into Product Management. The program helps you understand both the transferable skills you already have and the product-specific capabilities you need to develop." },
    { q: "How long is the Product Management program?", a: "The program runs for 13 weeks in total — a set-up week followed by twelve delivery weeks, each with its own artefact — combining structured learning, practical exercises, project work and mentor support." },
    { q: "Will the program help me build a Product Management portfolio?", a: "The practical work is designed to give you tangible evidence of your product thinking and capability. Rather than simply saying you understand Product Management, you should be able to demonstrate how you approached problems and made product decisions." },
    { q: "What makes the Upthrust Product Management program different?", a: "We focus on helping you think and operate like a Product Manager. The emphasis is on real product problems, decision-making, practical artefacts, business thinking, customer understanding and cross-functional execution—not simply learning frameworks." },
  ],
  ba: [
    { q: "Who is the Business Analysis program designed for?", a: "The program is designed for career switchers, aspiring Business Analysts, junior BAs who want stronger practical experience, and professionals whose roles already involve requirements gathering, process improvement, stakeholder management, or problem-solving." },
    { q: "Do I need previous Business Analysis experience to join?", a: "No. The program is structured to help learners build from the fundamentals into practical Business Analysis capability. What matters most is your willingness to learn, participate and apply what you are taught." },
    { q: "What will I learn during the Business Analysis program?", a: "You will learn how Business Analysts identify business problems, gather and analyse requirements, map processes, manage stakeholders, document solutions, support product and technology teams, and contribute throughout the solution delivery lifecycle." },
    { q: "Will I work on practical Business Analysis projects?", a: "Yes. Practical application is a core part of the Upthrust approach. You will work through realistic business scenarios and activities designed to help you apply BA techniques rather than simply memorise concepts." },
    { q: "What Business Analysis tools and techniques will I learn?", a: "You will be exposed to techniques such as stakeholder analysis, requirements elicitation, process mapping, user stories, acceptance criteria, business rules, gap analysis, root-cause analysis, requirements documentation and solution evaluation." },
    { q: "Will I learn how to write real Business Analysis documents?", a: "Yes. You will learn how to produce and work with practical artefacts such as business requirements, process flows, user stories, acceptance criteria, stakeholder maps, requirement specifications and other documentation commonly used by delivery teams." },
    { q: "Will the program teach Agile Business Analysis?", a: "Yes. You will understand how Business Analysts operate within Agile and modern product teams, including working with Product Managers, Product Owners, Designers, Engineers, QA teams and other stakeholders." },
    { q: "Is the program suitable for someone moving into tech from another industry?", a: "Yes. You do not need to come from a technology background. The program helps you understand how modern digital products and delivery teams work while developing transferable analysis and stakeholder-management skills." },
    { q: "How long is the Business Analysis program?", a: "The Upthrust capability program runs for 13 weeks in total — a set-up week followed by twelve delivery weeks, each with its own artefact — combining structured learning with practical exercises, projects and mentor support." },
    { q: "Will I have something to demonstrate to employers after the program?", a: "The program is designed to help you build practical evidence of your capability through the activities, artefacts and project work you complete. This can help you explain what you can actually do during interviews rather than relying only on theoretical knowledge." },
    { q: "Will the program prepare me for Business Analyst interviews?", a: "The broader objective is to help you become capable of doing the job, which naturally strengthens your ability to discuss BA scenarios, requirements, stakeholders, processes and delivery situations during interviews." },
    { q: "What makes the Upthrust Business Analysis program different?", a: "The focus is on capability, not just classroom knowledge. You learn Business Analysis by applying it to realistic problems, creating relevant artefacts, working through delivery scenarios and developing the thinking expected of a practising Business Analyst." },
  ],
  pd: [
    { q: "Who is the Product Design program designed for?", a: "The program is designed for aspiring Product Designers, UI/UX Designers, career switchers, creatives and professionals who want to learn how to design useful, intuitive and commercially relevant digital products." },
    { q: "Do I need previous design experience to join?", a: "No. Beginners can join. The program takes you through the foundations of product and user experience design before progressing into more practical design activities and projects." },
    { q: "What will I learn during the Product Design program?", a: "You will learn user research, problem definition, user journeys, information architecture, wireframing, interaction design, UI design, prototyping, usability testing and how designers collaborate within product teams." },
    { q: "Is Product Design the same as UI/UX Design?", a: "They overlap significantly, but Product Design generally considers the broader product experience. Beyond creating interfaces, Product Designers think about user problems, journeys, behaviour, business objectives, usability and how the overall product should work." },
    { q: "Will I learn Figma?", a: "Yes. You will gain practical experience using modern design tools such as Figma while learning the principles behind good product and interface design." },
    { q: "Will I create real product designs during the program?", a: "Yes. Practical project work is central to the program. You will move from understanding a problem through research and ideation into wireframes, user flows, interfaces and prototypes." },
    { q: "Will I learn user research?", a: "Yes. Good Product Design begins with understanding users. You will learn how designers gather and interpret user insight and use it to make better design decisions." },
    { q: "Will I learn prototyping and usability testing?", a: "Yes. You will learn how to turn designs into interactive prototypes and how usability testing can be used to validate assumptions and identify areas that need improvement." },
    { q: "Will I learn how to build a design portfolio?", a: "The practical work completed during the program is intended to help you demonstrate your design process and thinking. You will learn that a strong portfolio should show not only attractive screens but also the problem, reasoning and decisions behind the solution." },
    { q: "Will I learn how Product Designers work with Product Managers and Engineers?", a: "Yes. Product Design is highly collaborative. You will understand how Designers work with Product Managers, Business Analysts, Engineers and other stakeholders from discovery through implementation." },
    { q: "How long is the Product Design program?", a: "The program runs for 13 weeks in total — a set-up week followed by twelve delivery weeks, each with its own artefact — combining structured learning, practical exercises, project work and mentor support." },
    { q: "What makes the Upthrust Product Design program different?", a: "The focus is not simply on teaching you how to make beautiful screens. The objective is to help you become a problem-solving Product Designer who can understand users, make thoughtful design decisions, communicate those decisions and contribute effectively within a real product team." },
  ],
  po: [
    { q: "What is Payment Operations?", a: "Payment Operations is the function responsible for helping payment transactions move successfully, accurately and securely across financial systems. It covers areas such as transaction monitoring, reconciliation, settlements, payment failures, investigations, exceptions and operational controls." },
    { q: "Who is the Payment Operations program designed for?", a: "It is suitable for aspiring Payment Operations professionals, fintech and banking professionals, customer operations teams, finance professionals, graduates, career switchers and anyone who wants to build practical knowledge of how payments work behind the scenes." },
    { q: "Do I need a banking or fintech background to join?", a: "No. The program is designed to help learners understand payments from the ground up before progressing into more operational and industry-specific concepts." },
    { q: "What types of payments will I learn about?", a: "You will develop an understanding of modern payment ecosystems and how money moves through different payment methods and rails, including concepts relating to bank transfers, cards, pay-ins, payouts and other relevant payment channels." },
    { q: "Will I learn how card payments work?", a: "Yes. You will understand the key participants and stages involved in a card transaction, including customers, merchants, issuers, acquirers, payment processors and card networks, as well as concepts such as authorisation, clearing and settlement." },
    { q: "Will the program cover reconciliation and settlement?", a: "Yes. Reconciliation and settlement are important components of Payment Operations. You will understand why they matter, how transaction records are compared and what operational teams do when discrepancies occur." },
    { q: "Will I learn how to investigate failed or missing payments?", a: "Yes. You will learn how Payment Operations teams approach transaction exceptions, failed payments, delayed transactions, reversals and other operational issues using structured investigation and escalation processes." },
    { q: "Does the program cover fraud, compliance and payment risk?", a: "The program introduces the operational importance of fraud prevention, compliance, transaction monitoring, controls and risk management within the payment lifecycle and how these areas interact with Payment Operations." },
    { q: "Will I learn about payment systems used in different markets?", a: "You will be introduced to different payment infrastructures and terminology to help you understand how domestic and international payment systems operate and how payment operations can differ across markets." },
    { q: "Is this program relevant for fintech careers?", a: "Absolutely. Payments sit at the core of banks, fintechs, payment service providers, digital wallets, BaaS platforms, remittance businesses, e-commerce businesses and many other financial products." },
    { q: "What roles could the knowledge from this program support?", a: "The capabilities developed are relevant to roles such as Payment Operations Analyst, Payments Specialist, Transaction Operations Analyst, Reconciliation Analyst, Fintech Operations Analyst and other payment-related operational roles." },
    { q: "What makes the Upthrust Payment Operations program different?", a: "The program focuses on helping you understand what actually happens to a payment from initiation to completion. You will learn payment concepts alongside the operational processes, investigations, controls and real-world scenarios professionals encounter." },
  ],
  aipb: [
    { q: 'Do I need to code?', a: 'Python basics help but are not required. You will use model APIs and prototyping tools, not train models.' },
    { q: 'Is five weeks really enough to build something?', a: 'Yes, deliberately. Narrow scope, one working prototype, defended in week five.' },
    { q: 'Should I take this or a 12-week pathway?', a: 'A pathway if you are switching careers. This if you already have a foundation and want AI capability on top.' },
    { q: 'Can I bundle it?', a: 'Yes — 25% off when added to any 12-week pathway.' },
  ],
  baai: [
    { q: 'How is this different from the BA pathway?', a: 'It assumes you already do BA work. Five weeks entirely on specifying and governing AI and automation.' },
    { q: 'Do I need AI experience?', a: 'No. You need analysis experience. We supply the AI-specific practice.' },
    { q: 'Is this about using AI or specifying it?', a: 'Both. Using AI to work faster, and doing the BA work AI projects actually require.' },
    { q: 'Would a regulator accept the output?', a: 'That is the standard we write to — data lineage, human-in-the-loop, and auditable acceptance criteria.' },
  ],
};

export const CAPS: Record<ProgKey, { a: string; c: string }[]> = {
  pm: [
    { a: 'Problem framing', c: 'Take a vague executive ask and return a problem statement the team can act on.' },
    { a: 'Strategy & prioritisation', c: 'Say no to good ideas with a reason your stakeholders accept.' },
    { a: 'Requirements & specs', c: 'Write a PRD with edge cases engineering does not have to guess at.' },
    { a: 'Delivery partnership', c: 'Run a sprint without becoming the bottleneck or the ticket clerk.' },
    { a: 'Measurement', c: 'Instrument a feature before launch and read the result honestly after.' },
    { a: 'Stakeholder communication', c: 'Give an executive update that ends in a decision, not a status list.' },
  ],
  ba: [
    { a: 'Elicitation', c: 'Run a stakeholder session that surfaces what people actually need.' },
    { a: 'Requirements documentation', c: 'Produce a BRD a delivery team can build from without a translator.' },
    { a: 'Process modelling', c: 'Map As-Is and To-Be so the gap is obvious to everyone in the room.' },
    { a: 'Solution definition', c: 'Turn a business need into acceptance criteria that hold up in review.' },
    { a: 'Testing & sign-off', c: 'Write a UAT pack that catches what scoping missed.' },
    { a: 'Benefits & reporting', c: 'Show whether the change delivered what the business case promised.' },
  ],
  pd: [
    { a: 'Research', c: 'Plan and run interviews that change the design rather than confirm it.' },
    { a: 'Synthesis', c: 'Turn messy findings into a journey map a team can prioritise from.' },
    { a: 'Structure & flows', c: 'Design an information architecture people navigate without instruction.' },
    { a: 'Interface craft', c: 'Ship hi-fi screens on a design system, not one-off pixels.' },
    { a: 'Testing', c: 'Watch five users fail, then fix the design instead of blaming them.' },
    { a: 'Handoff & rationale', c: 'Hand engineers a spec and defend every decision in it.' },
  ],
  po: [
    { a: 'Flow mapping', c: 'Trace money end to end and name every point it can go missing.' },
    { a: 'Reconciliation', c: 'Build and run a recon model that balances at close of business.' },
    { a: 'Exception handling', c: 'Investigate a failed transaction and resolve it without guesswork.' },
    { a: 'Disputes & chargebacks', c: 'Run a dispute response that stands up to a provider and a regulator.' },
    { a: 'Controls & risk', c: 'Design the control that stops the same incident happening twice.' },
    { a: 'Ops reporting', c: 'Specify the dashboard your team actually runs the day on.' },
  ],
  aipb: [
    { a: 'Use-case selection', c: 'Tell an AI opportunity worth building from one that just sounds good.' },
    { a: 'Data feasibility', c: 'Check whether the data can carry the idea before anyone commits budget.' },
    { a: 'Prototyping', c: 'Build a working AI-enabled product, not a deck about one.' },
    { a: 'Failure design', c: 'Decide what happens when the model is confidently wrong.' },
    { a: 'Evaluation', c: 'Measure whether the thing actually works, repeatedly.' },
    { a: 'Defence', c: 'Present it to a panel and answer for every call you made.' },
  ],
  baai: [
    { a: 'Automation audit', c: 'Identify which part of a process AI should touch, and which it should not.' },
    { a: 'Data requirements', c: 'Specify what the model needs, where it comes from, and who owns it.' },
    { a: 'Human-in-the-loop', c: 'Redesign a workflow so a person stays accountable for the decision.' },
    { a: 'Acceptance criteria', c: 'Write AI acceptance criteria that survive an audit.' },
    { a: 'Explainability', c: 'Make a model decision legible to someone who has to justify it.' },
    { a: 'Governance handover', c: 'Hand over a spec a risk team and a regulator can both read.' },
  ],
};

export const OUT: Record<ProgKey, string[]> = {
  pm: ['Frame a problem worth solving', 'Defend a roadmap to leadership', 'Prove impact with real metrics', 'Run a launch end to end'],
  ba: ['Turn vague asks into specs', 'Model a process others can follow', 'Write requirements teams can build', 'Sign off a release with UAT'],
  pd: ['Research before you design', 'Design a journey that tests well', 'Hand off work engineers can build', 'Defend every design decision'],
  po: ['Map money end to end', 'Reconcile at scale, daily', 'Resolve an incident calmly', 'Design the control that prevents it'],
  aipb: ['Pick an AI use case that holds', 'Build a working prototype', 'Design for the model being wrong', 'Defend it to a panel'],
  baai: ['Audit a process for automation', 'Specify data and ownership', 'Keep a human in the loop', 'Write criteria that pass audit'],
};

// `icon` is the ToolIcon registry key. A tool with no recognisable product
// mark (a technique rather than a tool — "design tokens", "recon tools") gets
// a monogram tile instead.
export const TOOLS: Record<ProgKey, { l: string; icon: string }[]> = {
  pm: [
    { l: 'JIRA', icon: 'jira' }, { l: 'CONFLUENCE', icon: 'confluence' }, { l: 'MIXPANEL', icon: 'mixpanel' },
    { l: 'FIGMA', icon: 'figma' }, { l: 'SQL BASICS', icon: 'sql' }, { l: 'NOTION', icon: 'notion' },
  ],
  ba: [
    { l: 'JIRA', icon: 'jira' }, { l: 'CONFLUENCE', icon: 'confluence' }, { l: 'DRAW.IO', icon: 'drawio' },
    { l: 'NOTION', icon: 'notion' }, { l: 'CLAUDE COWORK', icon: 'claude' }, { l: 'MIRO', icon: 'miro' },
  ],
  pd: [
    { l: 'FIGMA', icon: 'figma' }, { l: 'FIGJAM', icon: 'figjam' }, { l: 'MAZE', icon: 'maze' },
    { l: 'NOTION', icon: 'notion' }, { l: 'DESIGN TOKENS', icon: 'tokens' }, { l: 'CLAUDE DESIGN', icon: 'claude' },
  ],
  po: [
    { l: 'EXCEL MODELS', icon: 'excel' }, { l: 'SQL', icon: 'sql' },
    { l: 'RECON TOOLS', icon: 'recon' }, { l: 'JIRA', icon: 'jira' },
  ],
  aipb: [
    { l: 'CLAUDE / GPT APIS', icon: 'claude' }, { l: 'CLAUDE CODE', icon: 'claudecode' }, { l: 'CODEX', icon: 'codex' },
    { l: 'CLAUDE DESIGN', icon: 'claude' }, { l: 'FIGMA', icon: 'figma' }, { l: 'GIT', icon: 'git' },
  ],
  baai: [
    { l: 'JIRA', icon: 'jira' }, { l: 'CONFLUENCE', icon: 'confluence' },
    { l: 'PROMPT SPECS', icon: 'prompt' }, { l: 'AUDIT LOGS', icon: 'audit' },
  ],
};

// Genesis's title is set in one place so it stays identical everywhere.
export const FOUNDER_NAME = 'Genesis Nneji Enwenyeokwu';
export const FOUNDER_TITLE = 'Founder and Lead Facilitator';
export const FOUNDER_LI = 'https://www.linkedin.com/in/genesis-enwenyeokwu/';
export const FOUNDER_IMG = '/images/founder-genesis.jpg';

export const UPTHRUST_LI = 'https://www.linkedin.com/company/upthrustdigital/';

export type Fac = {
  id: string; n: string; r: string; w: string;
  img?: string; li?: string;
  anon?: number;  // renders the anonymous avatar, no photo slot and no profile link
  eyebrow: string;
};

const GENESIS = (w: string): Fac => ({
  id: 'ge', n: FOUNDER_NAME, r: FOUNDER_TITLE, w,
  img: FOUNDER_IMG, li: FOUNDER_LI, eyebrow: 'PROGRAMME LEAD',
});

// Identity withheld deliberately — the reviewer is a working hiring manager and
// the point of the exercise is that candidates defend to someone they don't know.
const GUEST: Fac = {
  id: 'gr', n: 'Guest reviewer', r: 'Hiring manager · identity withheld',
  w: 'W12 · CAPSTONE DEFENCE', anon: 1, eyebrow: 'GUEST REVIEWER',
};

export const FACS: Record<ProgKey, Fac[]> = {
  pm: [
    GENESIS('ALL 12 WEEKS'),
    { id: 'os', n: 'Oluwafemi Siji-Kenneth', r: 'Lead Product Manager', w: 'PATHWAY CRAFT · W04–W11', img: '/images/facilitators/oluwafemi-siji-kenneth.jpeg', li: 'https://www.linkedin.com/in/ifemora/', eyebrow: 'PATHWAY FACILITATOR' },
    GUEST,
  ],
  ba: [
    GENESIS('ALL 12 WEEKS'),
    { id: 'aa', n: 'Ayomikun Akinbobola', r: 'Manager, System Integrations', w: 'PATHWAY CRAFT · W04–W11', img: '/images/facilitators/ayomikun-akinbobola.jpeg', li: 'https://www.linkedin.com/in/ayomikuna/', eyebrow: 'PATHWAY FACILITATOR' },
    GUEST,
  ],
  pd: [
    GENESIS('ALL 12 WEEKS'),
    { id: 'mo', n: 'Michael Oyewusi', r: 'Senior Product Designer', w: 'PATHWAY CRAFT · W04–W11', img: '/images/facilitators/michael-oyewusi.jpg', li: 'https://www.linkedin.com/in/michael-oyewusi/', eyebrow: 'PATHWAY FACILITATOR' },
    GUEST,
  ],
  po: [
    GENESIS('ALL 12 WEEKS'),
    { id: 'ks', n: 'Kola Salami', r: 'Operations Manager', w: 'PATHWAY CRAFT · W04–W11', img: '/images/facilitators/kola-salami.jpg', li: 'https://www.linkedin.com/in/kola-salami/', eyebrow: 'PATHWAY FACILITATOR' },
    GUEST,
  ],
  // The intensives are facilitated solely by Genesis.
  aipb: [GENESIS('ALL 5 WEEKS')],
  baai: [GENESIS('ALL 5 WEEKS')],
};

export const LADDER: Record<ProgKey, string[]> = {
  pm: ['Associate Product Manager', 'Product Manager', 'Senior Product Manager'],
  ba: ['Junior Business Analyst', 'Business Analyst', 'Senior BA / Product Owner'],
  pd: ['Junior Product Designer', 'Product Designer', 'Senior Product Designer'],
  po: ['Payment Operations Analyst', 'Payment Operations Specialist', 'Payment Ops Manager'],
  aipb: ['AI Product Associate', 'AI Product Manager', 'Head of AI Product'],
  baai: ['BA · Automation projects', 'Senior BA · AI delivery', 'AI Governance Lead'],
};

export const MIX = [
  { d: 'BA', t: 'Stakeholder map + RACI' },
  { d: 'PM', t: 'Product opportunity brief' },
  { d: 'PD', t: 'Journey map with pain points' },
  { d: 'PO', t: 'Payment flow map' },
  { d: 'BA', t: 'As-Is / To-Be maps' },
  { d: 'PM', t: 'Prioritised roadmap' },
  { d: 'PD', t: 'Wireflows for the core task' },
  { d: 'PO', t: 'Reconciliation model' },
  { d: 'BA', t: 'UAT pack' },
  { d: 'PM', t: 'Metrics & instrumentation plan' },
  { d: 'PD', t: 'Usability test findings' },
  { d: 'PO', t: 'Controls matrix' },
];

export const ARTS: Record<ProgKey, { t: string; s: string; i: string }[]> = {
  pm: [
    { t: 'Product teardown + strategy analysis', s: '82', i: 'GE' }, { t: 'Problem brief', s: '79', i: 'AO' },
    { t: 'Product strategy canvas', s: '84', i: 'GE' }, { t: 'Full PRD with edge cases', s: '77', i: 'GE' },
    { t: 'User journey map', s: '83', i: 'AO' }, { t: 'Sprint backlog', s: '85', i: 'GE' },
    { t: 'Metrics + kill criteria plan', s: '80', i: 'AO' }, { t: 'Launch brief', s: '86', i: 'GE' },
    { t: 'Capstone project + presentation', s: '81', i: 'AO' }, { t: 'Portfolio case study', s: '84', i: 'GE' },
    { t: 'Interview story bank', s: '82', i: 'AO' }, { t: 'Capability Passport', s: '87', i: 'GE' },
  ],
  ba: [
    { t: 'Stakeholder map + RACI', s: '84', i: 'GE' }, { t: 'Business case', s: '78', i: 'GE' },
    { t: 'Requirements elicitation notes', s: '81', i: 'AO' }, { t: 'Full BRD', s: '76', i: 'GE' },
    { t: 'As-Is / To-Be process maps', s: '83', i: 'AO' }, { t: 'User stories with acceptance criteria', s: '84', i: 'GE' },
    { t: 'UAT pack + test scenarios', s: '79', i: 'AO' }, { t: 'Post-launch reporting framework', s: '85', i: 'GE' },
    { t: 'Capstone project + presentation', s: '88', i: 'AO' }, { t: 'Portfolio case study', s: '82', i: 'GE' },
    { t: 'Interview story bank', s: '80', i: 'AO' }, { t: 'Capability Passport', s: '86', i: 'GE' },
  ],
  pd: [
    { t: 'Product teardown from a user lens', s: '80', i: 'NE' }, { t: 'Research plan + interview notes', s: '83', i: 'NE' },
    { t: 'Journey map with friction points', s: '85', i: 'AO' }, { t: 'Information architecture + flows', s: '78', i: 'NE' },
    { t: 'Wireframe set for the core flow', s: '82', i: 'NE' }, { t: 'Hi-fi screens on a design system', s: '86', i: 'AO' },
    { t: 'Interactive prototype', s: '84', i: 'NE' }, { t: 'Usability test findings + revisions', s: '81', i: 'AO' },
    { t: 'Capstone project + presentation', s: '79', i: 'NE' }, { t: 'Portfolio case study', s: '85', i: 'NE' },
    { t: 'Interview story bank', s: '83', i: 'AO' }, { t: 'Capability Passport', s: '87', i: 'NE' },
  ],
  po: [
    { t: 'Payment flow map (end to end)', s: '81', i: 'PN' }, { t: 'Reconciliation model', s: '84', i: 'PN' },
    { t: 'Settlement + payout schedule', s: '87', i: 'AO' }, { t: 'Failed transaction investigation log', s: '79', i: 'PN' },
    { t: 'Chargeback and dispute runbook', s: '83', i: 'PN' }, { t: 'Controls matrix + segregation of duties', s: '80', i: 'AO' },
    { t: 'Ops KPI and SLA dashboard spec', s: '85', i: 'PN' }, { t: 'Incident postmortem', s: '82', i: 'AO' },
    { t: 'Capstone project + presentation', s: '84', i: 'PN' }, { t: 'Portfolio case study', s: '86', i: 'PN' },
    { t: 'Interview story bank', s: '81', i: 'AO' }, { t: 'Capability Passport', s: '88', i: 'PN' },
  ],
  aipb: [
    { t: 'AI opportunity brief', s: '83', i: 'GE' }, { t: 'Data feasibility read', s: '80', i: 'AO' },
    { t: 'Working prototype', s: '86', i: 'GE' }, { t: 'Guardrails & fallback design', s: '84', i: 'AO' },
    { t: 'Capstone defence', s: '87', i: 'GE' },
  ],
  baai: [
    { t: 'Process automation audit', s: '82', i: 'GE' }, { t: 'Data requirements spec', s: '85', i: 'AO' },
    { t: 'Human-in-the-loop redesign', s: '83', i: 'GE' }, { t: 'AI acceptance criteria', s: '86', i: 'AO' },
    { t: 'Governance handover pack', s: '84', i: 'GE' },
  ],
};

export const LOOP = [
  { n: '01', t: 'Concept', m: '90 MIN LIVE' },
  { n: '02', t: 'Real case', m: '30 MIN LIVE' },
  { n: '03', t: 'Lab', m: '60 MIN LIVE' },
  { n: '04', t: 'You build', m: '3–4 HRS' },
  { n: '05', t: 'Scored', m: 'WITHIN 48 HRS' },
  { n: '06', t: 'Revise', m: 'BEFORE IT COUNTS' },
];

export const AI: Record<'aipb' | 'baai', { n: string; alone: string; stages: { t: string; s: string; title: string; tag: string }[] }> = {
  aipb: {
    n: 'AI Product Builder', alone: 'aipb',
    stages: [
      { t: 'Opportunity', s: 'SCOPED', title: 'Find the use case that survives scrutiny.', tag: 'WEEK 01 · PROBLEM SELECTION' },
      { t: 'Data reality', s: 'MAPPED', title: 'Check whether the data can carry the idea.', tag: 'WEEK 02 · FEASIBILITY' },
      { t: 'Prototype', s: 'BUILT', title: 'Build it with the models, not slides about them.', tag: 'WEEK 03 · WORKING BUILD' },
      { t: 'Guardrails', s: 'WIRED', title: 'Decide what happens when it gets things wrong.', tag: 'WEEK 04 · FAILURE DESIGN' },
      { t: 'Ship + defend', s: 'SIGNED', title: 'Present it to a panel and answer for every call.', tag: 'WEEK 05 · CAPSTONE DEFENCE' },
    ],
  },
  baai: {
    n: 'BA for AI & Automation', alone: 'baai',
    stages: [
      { t: 'Process audit', s: 'MAPPED', title: 'Find the workflow AI should actually touch.', tag: 'WEEK 01 · PROCESS SELECTION' },
      { t: 'Data spec', s: 'WRITTEN', title: 'Specify what the model needs and who owns it.', tag: 'WEEK 02 · DATA REQUIREMENTS' },
      { t: 'Human loop', s: 'DESIGNED', title: 'Design where a person stays in the decision.', tag: 'WEEK 03 · WORKFLOW REDESIGN' },
      { t: 'Acceptance', s: 'DEFINED', title: 'Write criteria that hold up in an audit.', tag: 'WEEK 04 · AI ACCEPTANCE CRITERIA' },
      { t: 'Governance', s: 'SIGNED', title: 'Hand over a spec a regulator could read.', tag: 'WEEK 05 · CAPSTONE DEFENCE' },
    ],
  },
};

export const HERO_STATS = [
  { n: '72h', l: 'LIVE TEACHING' },
  { n: '12', l: 'ARTEFACTS BUILT' },
  { n: '48h', l: 'FEEDBACK' },
  { n: '25', l: 'MAX COHORT' },
];

export const LOOP_STATS = [
  { n: '72', l: 'LIVE HOURS' }, { n: '12', l: 'SCORED SUBMISSIONS' },
  { n: '2×', l: 'EVERY ARTEFACT REVISED' }, { n: '1', l: 'DEFENDED CAPSTONE' },
];

export const QUOTES = [
  { id: '1', t: 'Every concept taught through real work, not slides.', n: 'Ayodele Yeye', r: 'Senior BA · Government of Nova Scotia' },
  { id: '2', t: 'Novice to confident enough to land the job.', n: 'Uyoyou Taiye-Ayo', r: 'Senior BA · RBC' },
  { id: '3', t: 'Real tools, real scenarios, real clarity.', n: 'Chioma Okorie', r: 'Business Analyst · MSVU' },
];

export const AC_STATS = [
  { n: '12', l: 'WEEKS' }, { n: '25', l: 'MAX COHORT' }, { n: '8–10h', l: 'PER WEEK' },
  { n: '4', l: 'PATHWAYS' }, { n: 'Live', l: 'ONLINE' },
];

// `this.money(n)` in the prototype.
export function money(n: number): string {
  return n.toLocaleString('en-US');
}
