// Mock data for the /dashboard preview. There is no auth layer yet — this route
// renders a representative learner and roster so the product experience can be
// reviewed before real sign-in and per-learner data are wired up.

import { PATHWAY_CONTENT } from './pathways-content';
import { COHORT } from './cohort-config';

export const CURRENT_WEEK = 6; // 1-12, drives the rail + artefact table below

export const LEARNER = {
  name: 'Adaeze Okonkwo',
  pathwaySlug: 'business-analysis' as const,
  pathwayLabel: 'Business Analysis',
  cohortLine: 'Cohort 2 · 2026',
  currentWeek: CURRENT_WEEK,
};

const learnerCaps = PATHWAY_CONTENT[LEARNER.pathwaySlug].caps;
const learnerWeekArt = PATHWAY_CONTENT[LEARNER.pathwaySlug].weekArt;

export const CAPABILITY_READINESS = learnerCaps.map((area, i) => ({
  area,
  readiness: [78, 64, 52, 40, 25, 10][i] ?? 20,
}));

type ArtefactStatus = 'reviewed' | 'submitted' | 'upcoming';

export const ARTEFACTS = learnerWeekArt.map((title, i) => {
  const week = i + 1;
  let status: ArtefactStatus = 'upcoming';
  let score: number | null = null;
  if (week < CURRENT_WEEK) { status = 'reviewed'; score = 68 + ((i * 7) % 28); }
  else if (week === CURRENT_WEEK) { status = 'submitted'; score = null; }
  return { week, title, status, score };
});

export const LATEST_FEEDBACK = {
  week: CURRENT_WEEK - 1,
  artefact: learnerWeekArt[CURRENT_WEEK - 2],
  note: PATHWAY_CONTENT[LEARNER.pathwaySlug].sampleWork.reviewerNote,
};

export const THIS_WEEK = {
  sessions: COHORT.liveSessionDays.map((day, i) => ({
    day,
    time: i === 0 ? '18:00 WAT' : '18:00 WAT',
    title: i === 0 ? 'Live concept class' : 'Practical lab',
  })),
  deadline: `Week ${CURRENT_WEEK} assignment due Sunday 23:59 WAT`,
};

export const COHORT_METRICS = [
  { label: 'Active learners', value: `${COHORT.seatsMax - COHORT.seatsRemaining}`, sub: `of ${COHORT.seatsMax} seats` },
  { label: 'Artefacts submitted this week', value: '19', sub: 'across 4 pathways' },
  { label: 'Avg. defence readiness', value: '61%', sub: 'week 6 of 12' },
  { label: 'Feedback SLA compliance', value: '94%', sub: `within ${COHORT.feedbackSlaHours}h` },
];

export type RiskStatus = 'on-track' | 'at-risk' | 'behind';

export const ROSTER: { name: string; pathway: string; week: number; risk: RiskStatus; nextAction: string }[] = [
  { name: 'Adaeze Okonkwo', pathway: 'BA', week: 6, risk: 'on-track', nextAction: 'Review Week 6 BRD submission' },
  { name: 'Kelechi Nnamdi', pathway: 'PM', week: 6, risk: 'on-track', nextAction: 'None — feedback delivered' },
  { name: 'Fisayo Adewale', pathway: 'PD', week: 5, risk: 'at-risk', nextAction: 'Missed Week 5 usability test — follow up' },
  { name: 'Ifeoma Chukwu', pathway: 'PO', week: 6, risk: 'on-track', nextAction: 'Review reconciliation model' },
  { name: 'Tunde Bakare', pathway: 'PM', week: 4, risk: 'behind', nextAction: 'Two weeks behind — schedule 1:1' },
  { name: 'Ngozi Umeh', pathway: 'BA', week: 6, risk: 'on-track', nextAction: 'None — feedback delivered' },
];

export const REVIEW_QUEUE = [
  { learner: 'Adaeze Okonkwo', artefact: 'Full BRD (functional + non-functional)', submittedHoursAgo: 12, slaHours: COHORT.feedbackSlaHours },
  { learner: 'Ifeoma Chukwu', artefact: 'Reconciliation model', submittedHoursAgo: 30, slaHours: COHORT.feedbackSlaHours },
  { learner: 'Kelechi Nnamdi', artefact: 'Full PRD with edge cases', submittedHoursAgo: 51, slaHours: COHORT.feedbackSlaHours },
];
