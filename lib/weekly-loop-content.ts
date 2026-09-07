// The six-move weekly rhythm — shared by the Accelerator page's click-driven
// dial and the home page's self-advancing "weekly loop" section. Content is
// the same either way; only the interaction differs per consumer.
import { COHORT } from './cohort-config';

export const RHYTHM = [
  { num: '01', title: 'Concept class', meta: '90 MIN · LIVE', outcome: 'Weekly framework understood', detail: 'One framework, taught live. No more. You leave able to name the thing, know when it applies, and know what bad practice looks like.' },
  { num: '02', title: 'Real-world case', meta: '30 MIN · LIVE', outcome: 'Pattern recognition in context', detail: 'A real situation from a Nigerian, UK or Canadian team, walked end to end — including what went wrong.' },
  { num: '03', title: 'Practical lab', meta: '60 MIN · LIVE', outcome: 'Corrected technique', detail: 'You do the work while a facilitator watches. Mistakes get corrected in the room, not in a comment thread a week later.' },
  { num: '04', title: 'Weekly assignment', meta: 'SELF-PACED · 3–4 HRS', outcome: 'One portfolio artefact', detail: 'One artefact per week on a real capstone brief. This is the work that becomes your portfolio.' },
  { num: '05', title: 'Structured feedback', meta: `WITHIN ${COHORT.feedbackSlaHours} HRS`, outcome: 'A specific list to fix', detail: 'Scored against the published rubric with written notes. Not a grade — a revision list you can act on.' },
  { num: '06', title: 'Reflection', meta: '15 MIN · ASYNC', outcome: 'An interview-ready story', detail: 'You write down what you decided and why, in the language you will use in an interview.' },
];
