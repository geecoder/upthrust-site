export type Track = 'PM' | 'BA' | 'Design' | 'PaymentOps';

export interface Option {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  // The single track this option maps to. Each option is worth exactly
  // one point toward its track — no split scoring.
  track: Track;
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
    title: 'The vague dashboard request',
    setup: 'A stakeholder asks for "a dashboard."',
    question: 'Your first move?',
    options: [
      { id: 'A', text: 'Ask what decision it is meant to support', track: 'PM' },
      { id: 'B', text: 'Ask who uses it and where the data lives', track: 'BA' },
      { id: 'C', text: 'Sketch two versions and watch someone read them', track: 'Design' },
      { id: 'D', text: 'Ask which numbers must reconcile daily', track: 'PaymentOps' },
    ],
    insight: {
      A: 'You reach for the decision first — a Product judgement reflex. A dashboard is only useful if it changes what someone does next.',
      B: 'You reach for the audience and the source first — a Structured thinking reflex. You want the request grounded before anything gets built.',
      C: 'You reach for something concrete to react to — an Experience reasoning reflex. A sketch tells you more than a description ever could.',
      D: 'You reach for what has to tie out — an Operational rigour reflex. A dashboard is only as trustworthy as the numbers underneath it.',
    },
  },
  {
    id: 2,
    title: 'The two-week launch crunch',
    setup: 'Two weeks to launch, one flow will not be ready.',
    question: 'What do you do?',
    options: [
      { id: 'A', text: 'Cut scope, protect the date, write down what dropped', track: 'PM' },
      { id: 'B', text: 'Map affected requirements, recheck acceptance criteria', track: 'BA' },
      { id: 'C', text: 'Design a simpler interim journey', track: 'Design' },
      { id: 'D', text: 'Write the manual workaround and name its owner', track: 'PaymentOps' },
    ],
    insight: {
      A: 'You protect the date and log the trade-off — a Product judgement reflex. You would rather ship less, deliberately, than slip.',
      B: 'You go back to the requirements first — a Structured thinking reflex. You want to know exactly what breaks before you decide what to cut.',
      C: 'You redesign around the constraint — an Experience reasoning reflex. A smaller journey beats a broken one.',
      D: 'You name the workaround and its owner — an Operational rigour reflex. Nothing ships without someone accountable for the gap.',
    },
  },
  {
    id: 3,
    title: 'The undocumented process',
    setup: 'You inherit an undocumented process.',
    question: 'Where do you start?',
    options: [
      { id: 'A', text: 'Interview the people who run it, draw the As-Is', track: 'BA' },
      { id: 'B', text: 'Find the metric it moves, work backwards', track: 'PM' },
      { id: 'C', text: 'Walk it as a user, note every friction point', track: 'Design' },
      { id: 'D', text: 'Trace one real transaction until it breaks', track: 'PaymentOps' },
    ],
    insight: {
      A: 'You start by drawing the As-Is — a Structured thinking reflex. You want the true process on paper before you touch it.',
      B: 'You start with the metric it is supposed to move — a Product judgement reflex. You anchor to outcome before mechanics.',
      C: 'You start by walking it yourself — an Experience reasoning reflex. Friction you feel is friction you cannot unsee.',
      D: 'You start by tracing one transaction to its breaking point — an Operational rigour reflex. One real case tells you more than a diagram.',
    },
  },
  {
    id: 4,
    title: 'The tie-breaker',
    setup: 'The team cannot agree what to build next.',
    question: 'How do you break the tie?',
    options: [
      { id: 'A', text: 'Rank the options against the business goal', track: 'PM' },
      { id: 'B', text: 'Get agreement on the problem statement first', track: 'BA' },
      { id: 'C', text: 'Prototype both so the argument gets concrete', track: 'Design' },
      { id: 'D', text: 'Cost each one in operational load', track: 'PaymentOps' },
    ],
    insight: {
      A: 'You rank against the goal — a Product judgement reflex. You believe the right frame settles most arguments.',
      B: 'You go back to the problem statement — a Structured thinking reflex. Most disagreements are actually about what problem is being solved.',
      C: 'You make both options real — an Experience reasoning reflex. A prototype ends debates that words cannot.',
      D: 'You cost the operational load — an Operational rigour reflex. You want to know what each option actually costs to run, not just to build.',
    },
  },
  {
    id: 5,
    title: 'The unused feature',
    setup: 'A feature launched last month is barely used.',
    question: 'First check?',
    options: [
      { id: 'A', text: 'The funnel and the instrumentation', track: 'PM' },
      { id: 'B', text: 'The requirements against what shipped', track: 'BA' },
      { id: 'C', text: 'Five users attempting the task while I watch', track: 'Design' },
      { id: 'D', text: 'Error rates, and what happened to the money', track: 'PaymentOps' },
    ],
    insight: {
      A: 'You check the funnel first — a Product judgement reflex. You want to know where in the outcome chain it is actually failing.',
      B: 'You check what shipped against what was asked for — a Structured thinking reflex. A gap there explains a lot.',
      C: 'You go watch real people try it — an Experience reasoning reflex. Numbers tell you that it failed; watching tells you why.',
      D: 'You check the errors and the money — an Operational rigour reflex. Low usage sometimes means a silent failure, not disinterest.',
    },
  },
  {
    id: 6,
    title: 'A free day',
    setup: 'A full day, no meetings.',
    question: 'What would you enjoy writing?',
    options: [
      { id: 'A', text: 'A strategy canvas and a metrics plan', track: 'PM' },
      { id: 'B', text: 'A BRD with acceptance criteria and edge cases', track: 'BA' },
      { id: 'C', text: 'A journey map and a set of screens', track: 'Design' },
      { id: 'D', text: 'A reconciliation model and a controls matrix', track: 'PaymentOps' },
    ],
    insight: {
      A: 'Given free time, you reach for strategy and metrics — a Product judgement reflex. Outcomes are what you enjoy thinking about.',
      B: 'Given free time, you reach for requirements and edge cases — a Structured thinking reflex. Precision is satisfying, not tedious, to you.',
      C: 'Given free time, you reach for the journey and the screens — an Experience reasoning reflex. You think by making things visible.',
      D: 'Given free time, you reach for reconciliation and controls — an Operational rigour reflex. You find the numbers tying out genuinely satisfying.',
    },
  },
  {
    id: 7,
    title: 'The mid-sprint update',
    setup: 'An executive wants a mid-sprint update.',
    question: 'What do you bring?',
    options: [
      { id: 'A', text: 'Outcomes, risks, and the one decision I need', track: 'PM' },
      { id: 'B', text: 'Requirement status with open questions listed', track: 'BA' },
      { id: 'C', text: 'The current build and what changed', track: 'Design' },
      { id: 'D', text: 'Volumes processed and exceptions outstanding', track: 'PaymentOps' },
    ],
    insight: {
      A: 'You bring outcomes and one clear ask — a Product judgement reflex. You use exec time to unblock a decision, not to report status.',
      B: 'You bring requirement status and open questions — a Structured thinking reflex. You want the record straight before anything else.',
      C: 'You bring the current build — an Experience reasoning reflex. You would rather show than describe.',
      D: 'You bring volumes and exceptions — an Operational rigour reflex. You report on what actually moved, and what did not.',
    },
  },
  {
    id: 8,
    title: 'The AI vendor demo',
    setup: 'A vendor demos an AI tool. The room is excited.',
    question: 'Your instinct?',
    options: [
      { id: 'A', text: 'Ask what outcome it moves and how we would know', track: 'PM' },
      { id: 'B', text: 'Ask what data it needs and who reviews output', track: 'BA' },
      { id: 'C', text: 'Ask how a user recovers when it is wrong', track: 'Design' },
      { id: 'D', text: 'Ask what happens to the audit trail', track: 'PaymentOps' },
    ],
    insight: {
      A: 'You ask what outcome it actually moves — a Product judgement reflex. Excitement is not evidence of value.',
      B: 'You ask about data and review — a Structured thinking reflex. You want to know exactly what feeds it and who is accountable for its output.',
      C: 'You ask about failure recovery — an Experience reasoning reflex. You judge a tool by what happens when it gets it wrong.',
      D: 'You ask about the audit trail — an Operational rigour reflex. A tool that cannot be traced is a tool you cannot trust with anything real.',
    },
  },
  {
    id: 9,
    title: 'De-risking the bet',
    setup: 'One week to de-risk an expensive bet.',
    question: 'What do you run?',
    options: [
      { id: 'A', text: 'The cheapest test that could prove us wrong', track: 'PM' },
      { id: 'B', text: 'Stakeholder interviews to surface constraints', track: 'BA' },
      { id: 'C', text: 'A clickable prototype with real users', track: 'Design' },
      { id: 'D', text: 'A dry run on real volumes', track: 'PaymentOps' },
    ],
    insight: {
      A: 'You reach for the cheapest disproof — a Product judgement reflex. You would rather be wrong fast than right slowly.',
      B: 'You reach for the constraints first — a Structured thinking reflex. You want to know what could sink the bet before you test it.',
      C: 'You reach for a prototype and real users — an Experience reasoning reflex. Watching someone use it is your fastest signal.',
      D: 'You reach for a dry run at real volumes — an Operational rigour reflex. You trust what happens under real load over what happens on paper.',
    },
  },
  {
    id: 10,
    title: 'The difficult project',
    setup: 'Your last difficult project.',
    question: 'What frustrated you most?',
    options: [
      { id: 'A', text: 'Work not tied to any outcome', track: 'PM' },
      { id: 'B', text: 'Ambiguity nobody would write down', track: 'BA' },
      { id: 'C', text: 'Decisions made without seeing the experience', track: 'Design' },
      { id: 'D', text: 'Numbers that never balanced, nobody chasing why', track: 'PaymentOps' },
    ],
    insight: {
      A: 'What frustrated you was work with no outcome attached — a Product judgement reflex. You need to know what effort is actually for.',
      B: 'What frustrated you was ambiguity nobody would resolve — a Structured thinking reflex. Unwritten assumptions bother you more than hard problems.',
      C: 'What frustrated you was deciding blind — an Experience reasoning reflex. You want the experience in the room before the decision is made.',
      D: 'What frustrated you was numbers left unchased — an Operational rigour reflex. An unexplained discrepancy is not a detail to you, it is the problem.',
    },
  },
  {
    id: 11,
    title: 'The UAT defect',
    setup: 'UAT finds a defect that is arguably "as specified."',
    question: 'Next?',
    options: [
      { id: 'A', text: 'Fix the spec first, then decide on the defect', track: 'BA' },
      { id: 'B', text: 'Judge it on user impact, decide if we ship', track: 'PM' },
      { id: 'C', text: 'Check whether the design misled the user', track: 'Design' },
      { id: 'D', text: 'Check what it did to the ledger', track: 'PaymentOps' },
    ],
    insight: {
      A: 'You fix the spec before ruling on the defect — a Structured thinking reflex. You want the source of truth correct first.',
      B: 'You judge it on user impact — a Product judgement reflex. Whether it matches the spec is secondary to whether it hurts the user.',
      C: 'You check whether the design misled the user — an Experience reasoning reflex. "As specified" is not the same as "as it should feel."',
      D: 'You check what it did to the ledger — an Operational rigour reflex. A defect that touches money outranks a defect that touches a spec.',
    },
  },
  {
    id: 12,
    title: 'The interview answer',
    setup: 'Twelve weeks from now, in an interview.',
    question: 'What do you want to show?',
    options: [
      { id: 'A', text: 'A product decision I made and what it delivered', track: 'PM' },
      { id: 'B', text: 'A requirements pack a team could build from', track: 'BA' },
      { id: 'C', text: 'A journey I redesigned and how it tested', track: 'Design' },
      { id: 'D', text: 'An incident I resolved and the control I added', track: 'PaymentOps' },
    ],
    insight: {
      A: 'You want to show a decision and its outcome — a Product judgement reflex. You want proof the call you made moved something real.',
      B: 'You want to show a buildable requirements pack — a Structured thinking reflex. You want proof you can turn ambiguity into something a team can act on.',
      C: 'You want to show a redesigned journey and its test results — an Experience reasoning reflex. You want proof the experience got better, not just different.',
      D: 'You want to show an incident and the control you added — an Operational rigour reflex. You want proof you make the system harder to break next time.',
    },
  },
];
