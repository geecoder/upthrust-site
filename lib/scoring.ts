import { scenarios, type Track, type Option } from './scenarios';

export type Answer = {
  scenarioId: number;
  optionId: 'A' | 'B' | 'C';
};

export type ResultType =
  | 'PM_DOMINANT'
  | 'BA_DOMINANT'
  | 'DESIGN_DOMINANT'
  | 'PM_BA_HYBRID'
  | 'BA_DESIGN_HYBRID'
  | 'PM_DESIGN_HYBRID'
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
    optionId: 'A' | 'B' | 'C';
    optionText: string;
    insight: string;
  }>;
}

export function calculateResult(answers: Answer[]): AssessmentResult {
  const scores: Record<Track, number> = { PM: 0, BA: 0, Design: 0 };

  for (const answer of answers) {
    const scenario = scenarios.find((s) => s.id === answer.scenarioId);
    if (!scenario) continue;
    const option = scenario.options.find((o) => o.id === answer.optionId);
    if (!option) continue;
    for (const [track, points] of Object.entries(option.scores)) {
      scores[track as Track] += points as number;
    }
  }

  const total = scores.PM + scores.BA + scores.Design || 1;
  const percentages: Record<Track, number> = {
    PM: Math.round((scores.PM / total) * 100),
    BA: Math.round((scores.BA / total) * 100),
    Design: Math.round((scores.Design / total) * 100),
  };

  // Rank tracks
  const ranked = (Object.entries(scores) as [Track, number][])
    .sort((a, b) => b[1] - a[1]);
  const primary = ranked[0][0];
  const secondary = ranked[1][0];

  // Determine result type: dominant if primary >= 50% of total, otherwise hybrid
  const primaryPct = percentages[primary];
  const secondaryPct = percentages[secondary];
  const gap = primaryPct - secondaryPct;

  let resultType: ResultType;
  if (primaryPct < 42) {
    // No clear winner — Explorer
    resultType = 'EXPLORER';
  } else if (gap >= 14) {
    // Clear dominant
    resultType =
      primary === 'PM'
        ? 'PM_DOMINANT'
        : primary === 'BA'
        ? 'BA_DOMINANT'
        : 'DESIGN_DOMINANT';
  } else {
    // Hybrid
    const pair = [primary, secondary].sort().join('_');
    if (pair === 'BA_PM') resultType = 'PM_BA_HYBRID';
    else if (pair === 'BA_Design') resultType = 'BA_DESIGN_HYBRID';
    else resultType = 'PM_DESIGN_HYBRID';
  }

  // Pick 3 quotable answers from the most predictive scenarios (3, 8, 10, 11, 12 in priority order)
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

export function getResultMeta(resultType: ResultType): {
  headline: string;
  subhead: string;
  pathway: 'PM' | 'BA' | 'DESIGN_WAITLIST' | 'CONSULTATION';
  cohortStatus: 'open' | 'waitlist' | 'consult';
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
} {
  switch (resultType) {
    case 'PM_DOMINANT':
      return {
        headline: 'You think like a Product Manager.',
        subhead:
          'Your reflexes consistently point toward decisions, scope, and outcomes. You are someone who wants the work to mean something measurable.',
        pathway: 'PM',
        cohortStatus: 'open',
        primaryCTA: { label: 'Explore the Product Management Pathway', href: '/pathway-product-management' },
        secondaryCTA: { label: 'Book a consultation to confirm fit', href: '/consultation' },
      };
    case 'BA_DOMINANT':
      return {
        headline: 'You think like a Business Analyst.',
        subhead:
          'Your reflexes consistently point toward clarity, structure, and getting the underlying truth on paper. You are someone who turns chaos into something a team can act on.',
        pathway: 'BA',
        cohortStatus: 'open',
        primaryCTA: { label: 'Explore the Business Analysis Pathway', href: '/pathway-business-analysis' },
        secondaryCTA: { label: 'Book a consultation to confirm fit', href: '/consultation' },
      };
    case 'DESIGN_DOMINANT':
      return {
        headline: 'You think like a Product Designer.',
        subhead:
          'Your reflexes consistently point toward users, journeys, and the experience itself. Cohort 1 launches with PM and BA — Design opens in Cohort 2. We would love to keep you close.',
        pathway: 'DESIGN_WAITLIST',
        cohortStatus: 'waitlist',
        primaryCTA: { label: 'Join the Design Cohort 2 Waitlist', href: '#waitlist-design' },
        secondaryCTA: { label: 'See why we are sequencing this way', href: '/about' },
      };
    case 'PM_BA_HYBRID':
      return {
        headline: 'You sit between Product Management and Business Analysis.',
        subhead:
          'You reach for decisions and for structure with almost equal strength. Many of the best product people start as BAs and grow into PM — that path is open to you in Cohort 1.',
        pathway: 'CONSULTATION',
        cohortStatus: 'consult',
        primaryCTA: { label: 'Book a 20-minute consultation', href: '/consultation' },
        secondaryCTA: { label: 'Compare PM and BA pathways', href: '/accelerator' },
      };
    case 'BA_DESIGN_HYBRID':
      return {
        headline: 'You sit between Business Analysis and Product Design.',
        subhead:
          'You think in user journeys and in process structure at the same time. For Cohort 1, the BA pathway is the strongest practical fit — Design opens in Cohort 2.',
        pathway: 'CONSULTATION',
        cohortStatus: 'consult',
        primaryCTA: { label: 'Book a consultation to talk it through', href: '/consultation' },
        secondaryCTA: { label: 'Join the Design Cohort 2 waitlist too', href: '#waitlist-design' },
      };
    case 'PM_DESIGN_HYBRID':
      return {
        headline: 'You sit between Product Management and Product Design.',
        subhead:
          'You think in outcomes and in user experience equally. Cohort 1 PM is your strongest open path. Design opens in Cohort 2 — most strong-PM-Design hybrids do well starting with PM.',
        pathway: 'CONSULTATION',
        cohortStatus: 'consult',
        primaryCTA: { label: 'Book a consultation', href: '/consultation' },
        secondaryCTA: { label: 'Explore Product Management', href: '/pathway-product-management' },
      };
    case 'EXPLORER':
      return {
        headline: 'You are still exploring — and that is a real answer.',
        subhead:
          'Your scores are evenly spread across all three tracks. That usually means you have real instincts in all three, or you have not yet had the chance to discover where you lean. A consultation is the right next step.',
        pathway: 'CONSULTATION',
        cohortStatus: 'consult',
        primaryCTA: { label: 'Book a 20-minute consultation', href: '/consultation' },
        secondaryCTA: { label: 'See all three pathways', href: '/accelerator' },
      };
  }
}
