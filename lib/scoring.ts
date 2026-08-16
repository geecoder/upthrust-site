import { scenarios, type Track } from './scenarios';
import { getPathway, type PathwayKey } from './cohort-config';

export type Answer = {
  scenarioId: number;
  optionId: 'A' | 'B' | 'C' | 'D';
};

export type ResultType =
  | 'PM_DOMINANT'
  | 'BA_DOMINANT'
  | 'DESIGN_DOMINANT'
  | 'PAYMENTOPS_DOMINANT'
  | 'PM_BA_HYBRID'
  | 'PM_DESIGN_HYBRID'
  | 'PM_PAYMENTOPS_HYBRID'
  | 'BA_DESIGN_HYBRID'
  | 'BA_PAYMENTOPS_HYBRID'
  | 'DESIGN_PAYMENTOPS_HYBRID'
  | 'EXPLORER';

export interface AssessmentResult {
  scores: Record<Track, number>;
  percentages: Record<Track, number>;
  primary: Track;
  secondary: Track;
  resultType: ResultType;
  // Top three answers to quote on the result page (most predictive scenarios)
  quotableAnswers: Array<{
    scenarioId: number;
    scenarioTitle: string;
    optionId: 'A' | 'B' | 'C' | 'D';
    optionText: string;
    insight: string;
  }>;
}

const TRACKS: Track[] = ['PM', 'BA', 'Design', 'PaymentOps'];

const DOMINANT_TYPE: Record<Track, ResultType> = {
  PM: 'PM_DOMINANT',
  BA: 'BA_DOMINANT',
  Design: 'DESIGN_DOMINANT',
  PaymentOps: 'PAYMENTOPS_DOMINANT',
};

function hybridType(a: Track, b: Track): ResultType {
  const [first, second] = TRACKS.filter((t) => t === a || t === b);
  return `${first.toUpperCase()}_${second.toUpperCase()}_HYBRID` as ResultType;
}

export function calculateResult(answers: Answer[]): AssessmentResult {
  const scores: Record<Track, number> = { PM: 0, BA: 0, Design: 0, PaymentOps: 0 };

  for (const answer of answers) {
    const scenario = scenarios.find((s) => s.id === answer.scenarioId);
    if (!scenario) continue;
    const option = scenario.options.find((o) => o.id === answer.optionId);
    if (!option) continue;
    for (const [track, points] of Object.entries(option.scores)) {
      scores[track as Track] += points as number;
    }
  }

  const total = TRACKS.reduce((sum, t) => sum + scores[t], 0) || 1;
  const percentages = TRACKS.reduce((acc, t) => {
    acc[t] = Math.round((scores[t] / total) * 100);
    return acc;
  }, {} as Record<Track, number>);

  // Rank tracks
  const ranked = TRACKS.slice().sort((a, b) => scores[b] - scores[a]);
  const primary = ranked[0];
  const secondary = ranked[1];

  // Determine result type: dominant if primary leads secondary by a wide enough
  // margin, otherwise hybrid between the top two.
  const primaryPct = percentages[primary];
  const secondaryPct = percentages[secondary];
  const gap = primaryPct - secondaryPct;

  let resultType: ResultType;
  if (primaryPct < 32) {
    // No clear winner across four tracks — Explorer
    resultType = 'EXPLORER';
  } else if (gap >= 14) {
    resultType = DOMINANT_TYPE[primary];
  } else {
    resultType = hybridType(primary, secondary);
  }

  // Pick 3 quotable answers from the most predictive scenarios (in priority order)
  const predictiveScenarios = [12, 10, 11, 3, 8];
  const quotableAnswers: AssessmentResult['quotableAnswers'] = [];
  for (const sid of predictiveScenarios) {
    if (quotableAnswers.length >= 3) break;
    const answer = answers.find((a) => a.scenarioId === sid);
    if (!answer) continue;
    const scenario = scenarios.find((s) => s.id === sid);
    if (!scenario) continue;
    const option = scenario.options.find((o) => o.id === answer.optionId);
    if (!option) continue;
    quotableAnswers.push({
      scenarioId: sid,
      scenarioTitle: scenario.title,
      optionId: answer.optionId,
      optionText: option.text,
      insight: scenario.insight[answer.optionId],
    });
  }

  return { scores, percentages, primary, secondary, resultType, quotableAnswers };
}

export interface ResultMeta {
  headline: string;
  subhead: string;
  pathway: PathwayKey | 'CONSULTATION';
  cohortStatus: 'open' | 'consult';
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
  tertiaryCTA?: { label: string; href: string };
}

export function getResultMeta(resultType: ResultType): ResultMeta {
  switch (resultType) {
    case 'PM_DOMINANT':
      return {
        headline: 'You think like a Product Manager.',
        subhead:
          'Your reflexes consistently point toward decisions, scope, and outcomes. You are someone who wants the work to mean something measurable.',
        pathway: 'pm',
        cohortStatus: 'open',
        primaryCTA: { label: 'Enrol on the Product Management pathway', href: '/enrol?pathway=product-management' },
        secondaryCTA: { label: 'Explore the pathway first', href: '/pathways/product-management' },
        tertiaryCTA: { label: 'Book a consultation to confirm fit', href: '/consultation' },
      };
    case 'BA_DOMINANT':
      return {
        headline: 'You think like a Business Analyst.',
        subhead:
          'Your reflexes consistently point toward clarity, structure, and getting the underlying truth on paper. You are someone who turns chaos into something a team can act on.',
        pathway: 'ba',
        cohortStatus: 'open',
        primaryCTA: { label: 'Enrol on the Business Analysis pathway', href: '/enrol?pathway=business-analysis' },
        secondaryCTA: { label: 'Explore the pathway first', href: '/pathways/business-analysis' },
        tertiaryCTA: { label: 'Book a consultation to confirm fit', href: '/consultation' },
      };
    case 'DESIGN_DOMINANT':
      return {
        headline: 'You think like a Product Designer.',
        subhead:
          'Your reflexes consistently point toward users, journeys, and the experience itself. You believe the experience is the proposition.',
        pathway: 'pd',
        cohortStatus: 'open',
        primaryCTA: { label: 'Enrol on the Product Design pathway', href: '/enrol?pathway=product-design' },
        secondaryCTA: { label: 'Explore the pathway first', href: '/pathways/product-design' },
        tertiaryCTA: { label: 'Book a consultation to confirm fit', href: '/consultation' },
      };
    case 'PAYMENTOPS_DOMINANT':
      return {
        headline: 'You think like a Payment Operations analyst.',
        subhead:
          'Your reflexes consistently point toward reconciliation, settlement, and where money can quietly go wrong. You trust a number only after you have checked it against another source.',
        pathway: 'po',
        cohortStatus: 'open',
        primaryCTA: { label: 'Enrol on the Payment Operations pathway', href: '/enrol?pathway=payment-operations' },
        secondaryCTA: { label: 'Explore the pathway first', href: '/pathways/payment-operations' },
        tertiaryCTA: { label: 'Book a consultation to confirm fit', href: '/consultation' },
      };
    case 'PM_BA_HYBRID':
      return {
        headline: 'You sit between Product Management and Business Analysis.',
        subhead:
          'You reach for decisions and for structure with almost equal strength. A short conversation is the fastest way to see which pathway fits how you actually want to work.',
        pathway: 'CONSULTATION',
        cohortStatus: 'consult',
        primaryCTA: { label: 'Book a 20-minute consultation', href: '/consultation' },
        secondaryCTA: { label: 'Compare PM and BA pathways', href: '/accelerator' },
      };
    case 'PM_DESIGN_HYBRID':
      return {
        headline: 'You sit between Product Management and Product Design.',
        subhead:
          'You think in outcomes and in user experience equally. Both pathways are open this cohort — a consultation is the fastest way to decide which seat you actually want.',
        pathway: 'CONSULTATION',
        cohortStatus: 'consult',
        primaryCTA: { label: 'Book a consultation', href: '/consultation' },
        secondaryCTA: { label: 'Compare Product Management and Product Design', href: '/accelerator' },
      };
    case 'PM_PAYMENTOPS_HYBRID':
      return {
        headline: 'You sit between Product Management and Payment Operations.',
        subhead:
          'You want to own outcomes, but you keep reaching for where the money actually moves. A consultation will help you see which pathway matches how you want to spend Week 1.',
        pathway: 'CONSULTATION',
        cohortStatus: 'consult',
        primaryCTA: { label: 'Book a consultation', href: '/consultation' },
        secondaryCTA: { label: 'Compare Product Management and Payment Operations', href: '/accelerator' },
      };
    case 'BA_DESIGN_HYBRID':
      return {
        headline: 'You sit between Business Analysis and Product Design.',
        subhead:
          'You think in process structure and in user journeys at the same time. A consultation is the fastest way to work out which pathway is the stronger fit.',
        pathway: 'CONSULTATION',
        cohortStatus: 'consult',
        primaryCTA: { label: 'Book a consultation to talk it through', href: '/consultation' },
        secondaryCTA: { label: 'Compare Business Analysis and Product Design', href: '/accelerator' },
      };
    case 'BA_PAYMENTOPS_HYBRID':
      return {
        headline: 'You sit between Business Analysis and Payment Operations.',
        subhead:
          'You reach for structure and for reconciliation with almost equal strength — both are about making sure the underlying truth is right. A consultation will help you pick a lane.',
        pathway: 'CONSULTATION',
        cohortStatus: 'consult',
        primaryCTA: { label: 'Book a consultation', href: '/consultation' },
        secondaryCTA: { label: 'Compare Business Analysis and Payment Operations', href: '/accelerator' },
      };
    case 'DESIGN_PAYMENTOPS_HYBRID':
      return {
        headline: 'You sit between Product Design and Payment Operations.',
        subhead:
          'You care about the experience and about what happens underneath it. That is an unusual, valuable combination — a consultation will help you decide where to start.',
        pathway: 'CONSULTATION',
        cohortStatus: 'consult',
        primaryCTA: { label: 'Book a consultation', href: '/consultation' },
        secondaryCTA: { label: 'Compare Product Design and Payment Operations', href: '/accelerator' },
      };
    case 'EXPLORER':
      return {
        headline: 'You are still exploring — and that is a real answer.',
        subhead:
          'Your scores are evenly spread across all four pathways. That usually means you have real instincts in more than one, or you have not yet had the chance to discover where you lean. A consultation is the right next step.',
        pathway: 'CONSULTATION',
        cohortStatus: 'consult',
        primaryCTA: { label: 'Book a 20-minute consultation', href: '/consultation' },
        secondaryCTA: { label: 'See all four pathways', href: '/accelerator' },
      };
  }
}

// The cohort-facts status line for a result's pathway (e.g. "Cohort 2 · Open"),
// for use in the CTA section. Empty string when the result routes to consultation.
export function getResultCohortLine(meta: ResultMeta): string {
  if (meta.pathway === 'CONSULTATION') return '';
  return getPathway(meta.pathway).status;
}
