export type Track = 'PM' | 'BA' | 'Design' | 'PaymentOps';

export interface Option {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  // Points awarded to each track for this option
  scores: Partial<Record<Track, number>>;
}

export interface Scenario {
  id: number;
  title: string;
  setup: string;
  question: string;
  options: Option[];
  // Used on the result page to quote the user's answer back
  insight: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'The vague stakeholder request',
    setup: 'A senior stakeholder messages you: "We need a dashboard for management. Can you sort that out this week?"',
    question: "What's your first move?",
    options: [
      {
        id: 'A',
        text: 'Reply asking what decisions the dashboard should help management make, and what they currently use instead.',
        scores: { BA: 3, PM: 1 },
      },
      {
        id: 'B',
        text: 'Set up a 30-minute call with the stakeholder to align on the business goal and what success looks like.',
        scores: { PM: 3, BA: 1 },
      },
      {
        id: 'C',
        text: 'Sketch three rough dashboard layouts based on common management views, and bring them to the stakeholder for reaction.',
        scores: { Design: 3, PM: 1 },
      },
      {
        id: 'D',
        text: 'Ask which numbers on that dashboard have to reconcile against the ledger before anyone can trust what it shows.',
        scores: { PaymentOps: 3 },
      },
    ],
    insight: {
      A: 'You instinctively interrogate the ambiguity in writing — a strong Business Analysis reflex. The first job of a BA is to make sure everyone is solving the same problem.',
      B: 'You reach for alignment before action — the PM reflex. Before building anything, you want a shared definition of success.',
      C: 'You think visually under uncertainty — a Product Design reflex. You make the abstract concrete so people can react to something real.',
      D: 'You go straight to reconciliation — a Payment Operations reflex. A dashboard is only as trustworthy as the numbers underneath it tying out.',
    },
  },
  {
    id: 2,
    title: 'The drop-off problem',
    setup: 'A fintech you work for has a sign-up flow with a 60% drop-off at the BVN/ID verification step.',
    question: 'Three teammates suggest three different first steps. Which do you instinctively trust?',
    options: [
      {
        id: 'A',
        text: 'Pull the analytics data, segment by user type, country, device, and time of day. See where exactly people leave.',
        scores: { PM: 3, BA: 1 },
      },
      {
        id: 'B',
        text: 'Watch 10 session recordings of users who dropped off. Look for friction patterns in how they interact with the page.',
        scores: { Design: 3, PM: 1 },
      },
      {
        id: 'C',
        text: 'Map the current flow end-to-end and identify every step where the system could fail, time out, or confuse the user.',
        scores: { BA: 3, Design: 1 },
      },
      {
        id: 'D',
        text: 'Pull the integration logs for that step and check whether failures cluster around a specific processor, a timeout, or a reversal — before assuming it is a user experience problem.',
        scores: { PaymentOps: 3, BA: 1 },
      },
    ],
    insight: {
      A: 'Your default is data segmentation — you trust patterns before stories. That is a PM-strong instinct.',
      B: 'Your default is user observation — you trust what you see real people do. That is a Design-strong instinct.',
      C: 'Your default is systems mapping — you trust completeness before correlation. That is a BA-strong instinct.',
      D: 'Your default is to suspect the pipes before the user — a Payment Operations instinct. Many "drop-offs" are actually silent failures in a verification or payment call that never surface as an error.',
    },
  },
  {
    id: 3,
    title: 'The savings feature',
    setup: 'A product team is about to start building a new savings feature for a digital wallet. The PM lead asks what part you would want to own.',
    question: 'Pick your strongest preference:',
    options: [
      {
        id: 'A',
        text: 'Defining the business rules, edge cases, and UAT scenarios — how the feature behaves under every condition.',
        scores: { BA: 4 },
      },
      {
        id: 'B',
        text: "Defining the MVP scope, success metrics, and what we will ship in v1 vs v2 vs never.",
        scores: { PM: 4 },
      },
      {
        id: 'C',
        text: 'Mapping the user journey, designing the screens, and prototyping the savings flow.',
        scores: { Design: 4 },
      },
      {
        id: 'D',
        text: 'Owning the settlement and reconciliation logic — how deposits, interest accruals, and withdrawals tie out to the penny, every day.',
        scores: { PaymentOps: 4 },
      },
    ],
    insight: {
      A: 'You chose the BA seat directly — rules, edges, conditions. The work you described is the spine of every well-functioning product team.',
      B: 'You chose the PM seat directly — scope, metrics, decisions. You are someone who wants the outcome of the work to be the work.',
      C: 'You chose the Design seat directly — journey, screens, prototype. You believe the experience is the proposition.',
      D: 'You chose the Payment Operations seat directly — settlement, reconciliation, the penny that has to tie out. You believe trust in a savings product is earned in the back office, not the front end.',
    },
  },
  {
    id: 4,
    title: 'The conflicting priorities',
    setup: 'Two stakeholders are pulling you in opposite directions. Sales wants a new feature shipped to close a deal worth $40k. Engineering wants the same two weeks to fix tech debt that is slowing every future release. You have one team.',
    question: 'What do you do first?',
    options: [
      {
        id: 'A',
        text: 'Quantify both: estimate the revenue impact of the deal vs the velocity gain from the tech debt fix over 6 months. Decide based on net value.',
        scores: { PM: 3, BA: 1 },
      },
      {
        id: 'B',
        text: 'Document both requests, the trade-offs, and present a structured comparison to leadership for the call.',
        scores: { BA: 3, PM: 1 },
      },
      {
        id: 'C',
        text: "Talk to both stakeholders separately to understand the real underlying need — maybe Sales does not actually need the full feature, or Eng can phase the debt fix.",
        scores: { PM: 2, BA: 2 },
      },
      {
        id: 'D',
        text: "Check whether the tech debt is actually a reconciliation or settlement risk — if money could break before a feature could, that reframes the whole priority call.",
        scores: { PaymentOps: 3, PM: 1 },
      },
    ],
    insight: {
      A: 'You reach for decision frameworks — a PM strength. You believe the right number, well-defined, settles the argument.',
      B: 'You reach for structured analysis and escalation — a BA strength. You make the trade-off visible and let the right person own the call.',
      C: 'You go to the people first — a hybrid PM/BA instinct. Many conflicts dissolve once you understand what is actually being asked for.',
      D: 'You look for where money is actually at risk — a Payment Operations instinct. When the tech debt touches settlement or reconciliation, that is not debt, that is exposure.',
    },
  },
  {
    id: 5,
    title: 'The new market launch',
    setup: 'Your company is launching its product in Kenya for the first time. The product works in Nigeria.',
    question: "What is the first thing you want to understand?",
    options: [
      {
        id: 'A',
        text: 'How payment behaviour, regulatory requirements, and local fintech infrastructure differ between Nigeria and Kenya.',
        scores: { BA: 3, PM: 1 },
      },
      {
        id: 'B',
        text: "How Kenyan users actually behave — what they expect, what frustrates them, how they currently solve this problem without your product.",
        scores: { Design: 3, PM: 1 },
      },
      {
        id: 'C',
        text: 'What the success metrics for the launch are, what we will measure in the first 90 days, and what would make us pull out.',
        scores: { PM: 3, BA: 1 },
      },
      {
        id: 'D',
        text: 'Which payment rails, settlement times, and reconciliation processes exist in Kenya versus Nigeria — and where money could get stuck or go missing.',
        scores: { PaymentOps: 3, BA: 1 },
      },
    ],
    insight: {
      A: 'You start with context and constraints — a BA strength. Different market means different rules, and rules shape what is possible.',
      B: 'You start with user behaviour — a Design strength. A new market is a new set of humans with their own logic.',
      C: 'You start with outcomes and kill criteria — a PM strength. You want to know what success looks like before you spend a dollar.',
      D: "You start with the money's path — a Payment Operations strength. A new market means new rails, new settlement windows, and new ways a transaction can go unmatched.",
    },
  },
  {
    id: 6,
    title: 'The "just build it" pressure',
    setup: 'A founder you work with says: "Stop overthinking. Just build the feature, we will figure out the details as we go." You disagree but cannot refuse outright.',
    question: "What's your move?",
    options: [
      {
        id: 'A',
        text: 'Build a one-page document with the assumptions you are making, what could go wrong, and what you would need to learn after launch. Share it before starting.',
        scores: { BA: 3, PM: 1 },
      },
      {
        id: 'B',
        text: 'Agree to start building, but block out the first 2 days to talk to 5 users so you are not building completely blind.',
        scores: { Design: 3, PM: 1 },
      },
      {
        id: 'C',
        text: 'Identify the smallest possible version that tests the riskiest assumption, propose that as the starting point instead of the full feature.',
        scores: { PM: 3, BA: 1 },
      },
      {
        id: 'D',
        text: 'Ask what happens to a transaction if this feature fails mid-flow, and insist the reconciliation and rollback path is defined before anything ships.',
        scores: { PaymentOps: 3, BA: 1 },
      },
    ],
    insight: {
      A: 'You document risk before action — a BA strength. The assumptions you write down today are the post-mortem you do not have to write later.',
      B: 'You buy time to talk to users — a Design strength. Even two days of real observation beats two weeks of guessing.',
      C: 'You reframe the work into a test — a PM strength. The smartest answer to "just build it" is often "let us build the right small thing first."',
      D: 'You protect the money path first — a Payment Operations strength. "We\'ll figure it out as we go" is fine for a feature; it is not fine for a transaction that has to balance.',
    },
  },
  {
    id: 7,
    title: 'The "good enough" question',
    setup: "You are reviewing a feature before launch. The team is asking: \"Is this good enough to ship?\"",
    question: 'What does "good enough" mean to you?',
    options: [
      {
        id: 'A',
        text: 'The core user journey works end-to-end, the known edge cases are handled, and we have a plan for the ones we could not fix in time.',
        scores: { BA: 3, PM: 1 },
      },
      {
        id: 'B',
        text: 'The screens are clear, accessible, consistent with the rest of the product, and a first-time user can complete the task without help.',
        scores: { Design: 3 },
      },
      {
        id: 'C',
        text: 'The feature solves the user problem we set out to solve, success metrics are instrumented, and we know what we are measuring in week 1.',
        scores: { PM: 3, BA: 1 },
      },
      {
        id: 'D',
        text: 'Every transaction the feature touches reconciles correctly against the ledger and the processor, and we have a way to catch and explain the ones that do not.',
        scores: { PaymentOps: 3 },
      },
    ],
    insight: {
      A: 'Your bar is completeness and known edges — a BA mindset. You launch when the unknowns are at least documented.',
      B: 'Your bar is usability and consistency — a Design mindset. You launch when a stranger can use it.',
      C: 'Your bar is problem-solution fit and measurement — a PM mindset. You launch when you know what to learn next.',
      D: 'Your bar is reconciliation — a Payment Operations mindset. You launch when the money can be explained, not just when the screen looks right.',
    },
  },
  {
    id: 8,
    title: 'The portfolio question',
    setup: 'If you spent a free Saturday building something for fun, which would you most likely do?',
    question: 'Pick what genuinely sounds most like you:',
    options: [
      {
        id: 'A',
        text: 'Take a website or app you use every day, write down everything that frustrates you, and document how you would fix it.',
        scores: { BA: 3, Design: 1 },
      },
      {
        id: 'B',
        text: 'Pick a problem you have noticed in your community, sketch out how a digital product could help, and define what v1 would do.',
        scores: { PM: 3 },
      },
      {
        id: 'C',
        text: 'Find a beautiful product interface you admire, recreate it in Figma, and try to figure out why the design choices work.',
        scores: { Design: 3 },
      },
      {
        id: 'D',
        text: 'Take a fintech app\'s transaction history, try to reconcile it against your bank statement by hand, and document every discrepancy you find.',
        scores: { PaymentOps: 3 },
      },
    ],
    insight: {
      A: 'In your free time you analyse and document — that is the BA instinct expressing itself for fun. Friction makes you reach for a pen.',
      B: 'In your free time you spot a problem and scope a product — that is the PM instinct on autopilot. Opportunities feel like puzzles to you.',
      C: 'In your free time you study craft — that is the Design instinct. You believe great execution is itself a kind of thinking.',
      D: 'In your free time you reconcile for fun — that is the Payment Operations instinct at rest. You trust a number only after you have checked it against another source.',
    },
  },
  {
    id: 9,
    title: 'The retrospective',
    setup: 'A product you worked on missed its launch target by 6 weeks.',
    question: 'In the retrospective, what do you most want to dig into?',
    options: [
      {
        id: 'A',
        text: 'Where the scope expanded, which requirements changed mid-build, and which dependencies we did not catch early.',
        scores: { BA: 3 },
      },
      {
        id: 'B',
        text: 'Whether we were solving the right problem, whether the success metrics still make sense, and whether the delay actually hurt outcomes.',
        scores: { PM: 3 },
      },
      {
        id: 'C',
        text: 'Whether the user experience suffered from the rush, what feedback users gave, and what we would design differently next time.',
        scores: { Design: 3 },
      },
      {
        id: 'D',
        text: 'Whether any settlement, reconciliation, or payment-provider dependency was underestimated — those timelines are rarely in the team\'s control.',
        scores: { PaymentOps: 3 },
      },
    ],
    insight: {
      A: 'You investigate scope and dependency drift — BA territory. Missed dates almost always have a missed-requirement upstream.',
      B: 'You investigate whether the goal still made sense — PM territory. You separate execution failure from strategy failure.',
      C: 'You investigate user impact and craft — Design territory. You believe the user experience tells you what the team could not see.',
      D: 'You investigate the money-moving dependencies — Payment Operations territory. Bank and processor timelines have a way of quietly setting the real schedule.',
    },
  },
  {
    id: 10,
    title: 'The launch that did not land',
    setup: 'You shipped a feature three months ago. The team celebrated. Today, the data comes in: usage is 12% of what was forecast. The CEO wants to know in a meeting tomorrow what went wrong and what you would do next.',
    question: "Walking into that meeting, what's the first thing you want on the table?",
    options: [
      {
        id: 'A',
        text: 'A breakdown of who did use it, how they used it, and where the rest of the audience dropped off or never engaged in the first place — the data tells us where to look.',
        scores: { PM: 3, BA: 1 },
      },
      {
        id: 'B',
        text: 'A list of every assumption we made about the user when we scoped the feature, and which ones we now know were wrong — because the gap between forecast and reality is an assumption gap.',
        scores: { BA: 3, PM: 1 },
      },
      {
        id: 'C',
        text: 'A short video or replay of three users trying to use the feature for the first time — because numbers tell us that it failed, but watching real users tells us why it failed.',
        scores: { Design: 3, PM: 1 },
      },
      {
        id: 'D',
        text: 'A reconciliation of what the feature was supposed to move in transaction volume versus what actually settled — because sometimes the feature works, but the money never fully flows through it.',
        scores: { PaymentOps: 3, PM: 1 },
      },
    ],
    insight: {
      A: 'Under pressure you reach for segmentation and behavioural data — a PM-strong move. You believe the truth is hiding in the numbers if you slice them correctly.',
      B: 'Under pressure you reach for assumption auditing — a BA-strong move. You believe failures of forecast are usually failures of belief.',
      C: 'Under pressure you reach for direct user observation — a Design-strong move. You believe numbers tell you that something failed; only watching tells you why.',
      D: 'Under pressure you reconcile forecast against settled reality — a Payment Operations-strong move. You believe the gap between "used" and "money moved" is where the real story lives.',
    },
  },
  {
    id: 11,
    title: 'The handover',
    setup: 'You are rolling off a project and handing it to a teammate who is new to the product. You have 45 minutes with them and a blank Notion page.',
    question: 'What do you spend most of that time documenting?',
    options: [
      {
        id: 'A',
        text: 'The system itself — how the data flows, which services depend on which, where the edge cases live, and the things that will break if they are not careful.',
        scores: { BA: 3 },
      },
      {
        id: 'B',
        text: 'The people — who the key stakeholders are, what they actually care about (not what they say they care about), and which conversations to have first.',
        scores: { PM: 3, BA: 1 },
      },
      {
        id: 'C',
        text: 'The "why" — why this product exists, what users were doing before it existed, what we tried that did not work, and what success looks like from here.',
        scores: { PM: 2, Design: 2 },
      },
      {
        id: 'D',
        text: 'The reconciliation model — which systems are the source of truth for money, how they are matched against each other, and what an unmatched break actually means.',
        scores: { PaymentOps: 3 },
      },
    ],
    insight: {
      A: 'What you hand over is systems and constraints — a BA hallmark. You believe the technical truth must transfer first or nothing else holds.',
      B: 'What you hand over is people and politics — a PM hallmark. You believe products live or die through stakeholder relationships.',
      C: 'What you hand over is intent and history — a hybrid Design/PM hallmark. You believe the next person cannot make good decisions without knowing what you tried and why.',
      D: 'What you hand over is the reconciliation model — a Payment Operations hallmark. You believe the next person cannot be trusted with money they do not know how to check.',
    },
  },
  {
    id: 12,
    title: 'The founder asking what you think',
    setup: 'A founder shows you their new product idea over coffee. They are excited. They have already built a landing page, hired a designer, and have a developer starting next month. They ask: "What do you think?" You see three things you are worried about, but you also know this is the founder\'s baby.',
    question: 'What do you actually say first?',
    options: [
      {
        id: 'A',
        text: 'You ask them to walk you through the specific user they are building for — name, age, what their day looks like, what they currently do instead of this product. You want to know if the user is real or imagined before anything else.',
        scores: { BA: 3, Design: 1 },
      },
      {
        id: 'B',
        text: 'You ask them what would make them shut this down. What is the signal in the next 90 days that would tell them this is not working? Because if they cannot answer that, they will keep building no matter what the market tells them.',
        scores: { PM: 3 },
      },
      {
        id: 'C',
        text: 'You ask them to show you the landing page and walk you through it as if you were the target user. You want to see whether the proposition lands in 10 seconds — because if it does not land for you, it will not land for anyone.',
        scores: { Design: 3, PM: 1 },
      },
      {
        id: 'D',
        text: 'You ask how money actually moves in this product — who holds it, when it settles, and what happens the first time a payment fails or gets disputed. If they cannot answer that, the rest is premature.',
        scores: { PaymentOps: 3 },
      },
    ],
    insight: {
      A: 'Your closing instinct is to demand the user is real — a BA strength. You believe the right question, asked early, prevents months of waste.',
      B: 'Your closing instinct is to demand kill criteria — a PM strength. You believe a project without a way to fail is a project that cannot succeed.',
      C: 'Your closing instinct is to test the proposition through experience — a Design strength. You believe whether something works is decided in the first ten seconds.',
      D: 'Your closing instinct is to interrogate the money path — a Payment Operations strength. You believe a product that touches money has to earn trust in its plumbing before its pitch.',
    },
  },
];
