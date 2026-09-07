// A port of the prototype's `detail(k)` method. Kept pure — it returns the
// same computed values the prototype's template binds to, and the component
// attaches the handlers.
//
// Two things in the original are corrected rather than reproduced, both noted
// at the line:
//   - `planTotalLine` reads a `pi` that is never declared in `detail()`'s
//     scope, so in the prototype it throws for any plan other than "in full".
//     The intent is unambiguous from the surrounding expression.
//   - `payRef` is a weak deterministic formula (`1000 + (k.length*373) % 8999`)
//     that yields one fixed reference per programme. Reconciling bank
//     transfers needs a unique one per attempt, so the panel treats it as a
//     format preview and the real reference is issued server-side in /enrol.

import {
  ARTS, ASK, CAPS, CUR, FACS, LADDER, OUT, P, TOOLS, money, priceFor,
  type CurKey, type ProgKey,
} from './data';
import { CUR_REGION_NAME } from './region-map';
import { DATES } from '@/lib/cohort-config';
import { buildReference, referencePrefix } from '@/lib/payments/enrolment-reference';

const pad2 = (n: number) => String(n).padStart(2, '0');

export type DetailState = {
  cur: CurKey;
  cTier: 'std' | 'prem';
  cPlan: 'full' | 'p2';
  cAdd: boolean;
  pWeek: number;
  wkAuto: boolean;
  currOpen: boolean;
  capOpen: number;
  askOpen: number;
  payOpen: boolean;
  copied: string;
};

/** Resolved server-side and passed in — see lib/payments/bank-accounts.ts. */
export type BankInput = {
  configured: boolean;
  title: string;
  rows: { k: string; v: string; intl?: boolean }[];
  proofEmail: string;
};

export function detail(k: ProgKey, S: DetailState, bank?: BankInput, payToken?: string) {
  const p = P[k];
  const cur = CUR[S.cur];
  const int = p.fam === 'int';
  const arts = ARTS[k] || [];
  const n = arts.length;
  const wi = Math.min(S.pWeek, n - 1);
  const low = p.seats <= 16;
  // The AI intensive is offered as an add-on to Product Management and
  // Business Analysis only — Product Design and Payment Operations have no
  // paired intensive, so no add-on card and no add-on in the totals.
  const canAddOn = !int && (k === 'pm' || k === 'ba');
  const addOnOn = S.cAdd && canAddOn;

  const pr = priceFor(k, S.cur);
  const tierFull = int ? pr.alone : (S.cTier === 'prem' ? pr.prem : pr.std);
  const tierEach = int ? pr.alone : (S.cTier === 'prem' ? pr.premP2 : pr.stdP2);
  const dueNow = S.cPlan === 'full' || int ? tierFull : tierEach;

  const phaseOf = (i: number) => {
    if (n === 5) return ['SCOPE', 'FEASIBILITY', 'BUILD', 'GUARDRAILS', 'DEFENCE'][i];
    if (i < 3) return 'FOUNDATION';
    if (i < 7) return 'CORE CRAFT';
    if (i < 11) return 'DELIVERY';
    return 'CAPSTONE';
  };

  const phaseColor = (i: number) => {
    if (n === 5) return ['var(--seal-300)', 'var(--ink-300)', 'var(--seal-500)', 'var(--ochre-500)', 'var(--moss-500)'][i];
    if (i < 3) return 'var(--seal-300)';
    if (i < 7) return 'var(--ink-300)';
    if (i < 11) return 'var(--seal-500)';
    return 'var(--moss-500)';
  };

  return {
    key: k,
    name: p.n, line: p.l, code: p.code, cap: p.cap,
    tag: int ? 'SPECIALIST INTENSIVE' : 'CAREER CAPABILITY PATHWAY',
    heroBg: int ? 'var(--ink-900)' : 'var(--bone)',
    heroFg: int ? 'var(--bone)' : 'var(--fg-1)',
    dim: int ? 'var(--ink-300)' : 'var(--fg-3)',
    accent: int ? 'var(--seal-300)' : 'var(--seal-600)',
    grid: int ? 'rgba(244,239,230,.04)' : 'rgba(11,26,43,.045)',
    rule: int ? 'rgba(244,239,230,.3)' : 'var(--ink-900)',
    btnbd: int ? 'rgba(244,239,230,.3)' : 'var(--border-strong)',
    trk: int ? 'rgba(244,239,230,.18)' : 'var(--border-soft)',
    tagfg: int ? 'var(--bone)' : 'var(--fg-3)',
    tagbg: int ? 'var(--seal-500)' : 'var(--paper-dim)',

    facts: [
      { n: int ? DATES.intensiveStartShort : DATES.cohortStartShort, l: 'COHORT STARTS' }, { n: p.wk, l: 'WEEKS' },
      { n: int ? '6–8h' : '8–10h', l: 'PER WEEK' }, { n: String(n), l: 'ARTEFACTS' },
      { n: 'Live', l: 'ONLINE' },
    ],
    startDate: int ? DATES.intensiveStartLong : DATES.cohortStartLong,
    startShort: int ? DATES.intensiveStartDayMonth : DATES.cohortStartDayMonth,
    closeLine: 'APPLICATIONS CLOSE ' + (int ? DATES.intensiveApplyByDayMonth : DATES.applyByDayMonth).toUpperCase(),
    closeDate: int ? DATES.intensiveApplyByDayMonth : DATES.applyByDayMonth,

    bothInc: [
      'All live cohort sessions', 'Every template and worked example',
      'AI-assisted workflow throughout', 'One artefact reviewed every week',
      'Interview story bank', 'Portfolio case study', 'Cohort community + alumni network',
    ],
    stdInc: [
      'Group feedback on every artefact', 'Capability Record on completion',
      'Interview story bank you build yourself',
    ],
    premInc: [
      'Individual written feedback on every artefact', '1:1 portfolio review with a facilitator',
      'Mock interview with written debrief', 'Demo Day presenting slot',
      'Rubric-level ratings per capability area', 'Verified Capability Passport employers can check',
    ],

    from: int ? cur.c + ' ' + money(pr.alone) : cur.c + ' ' + money(pr.stdP2) + '×2',
    seats: p.seats + ' of ' + p.cap + ' places left',
    seatfg: low ? 'var(--seal-500)' : (int ? 'var(--ink-300)' : 'var(--fg-3)'),
    pct: Math.round(((p.cap - p.seats) / p.cap) * 100) + '%',

    weekCount: String(n),
    wkHint: S.wkAuto ? 'PLAYING' : 'PAUSED',
    wkBtn: S.wkAuto ? 'Pause' : 'Play',
    wkPct: Math.round(((wi + 1) / n) * 100) + '%',
    wi,
    wkSel: { n: pad2(wi + 1), t: arts[wi] ? arts[wi].t : '', phase: phaseOf(wi) },
    weeks: arts.map((_a, i) => ({
      i,
      n: 'W' + pad2(i + 1),
      bg: i === wi ? 'var(--seal-500)' : (i < wi ? 'rgba(244,239,230,.1)' : 'rgba(244,239,230,.03)'),
      bd: i === wi ? 'var(--seal-500)' : 'rgba(244,239,230,.18)',
      nfg: i === wi ? 'var(--bone)' : (i < wi ? 'var(--bone)' : 'var(--ink-300)'),
      phase: phaseColor(i),
    })),
    currOpen: S.currOpen,
    currBtn: S.currOpen ? 'Hide full curriculum' : 'View full curriculum — all ' + n + ' weeks',
    allWeeks: arts.map((a, i) => ({
      i,
      n: 'W' + pad2(i + 1),
      t: a.t, phase: phaseOf(i), c: phaseColor(i),
      on: i === wi,
      bg: i === wi ? 'rgba(244,239,230,.08)' : 'transparent',
    })),
    phases: (n === 5
      ? [{ l: 'Scope + feasibility', c: 'var(--seal-300)', w: 'W01–02' }, { l: 'Build', c: 'var(--seal-500)', w: 'W03' }, { l: 'Guardrails', c: 'var(--ochre-500)', w: 'W04' }, { l: 'Defence', c: 'var(--moss-500)', w: 'W05' }]
      : [{ l: 'Foundation', c: 'var(--seal-300)', w: 'W01–03' }, { l: 'Core craft', c: 'var(--ink-300)', w: 'W04–07' }, { l: 'Delivery', c: 'var(--seal-500)', w: 'W08–11' }, { l: 'Capstone', c: 'var(--moss-500)', w: 'W12' }]
    ).map(x => ({ l: x.l, c: x.c, w: x.w, fg: 'var(--bone)' })),

    stack: arts.slice(Math.max(0, wi - 4), wi + 1).map((a, i, arr) => {
      const last = i === arr.length - 1;
      return {
        wk: 'W' + pad2(Math.max(0, wi - 4) + i + 1), t: a.t,
        badge: last ? 'IN REVIEW' : 'SIGNED OFF',
        bfg: last ? 'var(--seal-700)' : 'var(--moss-700)',
        bbg: last ? 'var(--seal-50)' : 'var(--moss-50)',
        acc: last ? 'var(--seal-500)' : 'var(--moss-500)',
        y: (i * 54) + 'px', h: last ? 'auto' : '54px',
        z: i + 1, op: last ? 1 : 0.38 + i * 0.14,
      };
    }),

    outcomes: (OUT[k] || []).map((t, i) => ({ n: '0' + (i + 1), t })),
    caps: (CAPS[k] || []).map((x, i) => ({
      i, n: '0' + (i + 1), a: x.a, c: x.c,
      open: S.capOpen === i,
      bg: S.capOpen === i ? 'var(--ink-900)' : 'var(--paper)',
      fg: S.capOpen === i ? 'var(--bone)' : 'var(--fg-1)',
      nfg: S.capOpen === i ? 'var(--seal-300)' : 'var(--fg-3)',
      cfg: S.capOpen === i ? 'var(--ink-200)' : 'var(--fg-2)',
      bd: S.capOpen === i ? 'var(--ink-900)' : 'var(--border-strong)',
    })),
    tools: TOOLS[k] || [],
    facs: (FACS[k] || []).map(f => ({
      id: f.id, n: f.n, r: f.r, w: f.w,
      eyebrow: f.eyebrow, img: f.img, li: f.li, anon: !!f.anon,
    })),

    isPath: !int, isInt: int,

    tierRows: [
      { l: 'Live cohort sessions', s: 'All ' + n + ' weeks', p: 'All ' + n + ' weeks' },
      { l: 'Templates and worked examples', s: 'Full library', p: 'Full library' },
      { l: 'AI-assisted workflow', s: 'Throughout', p: 'Throughout' },
      { l: 'Feedback on your artefacts', s: 'Group review', p: 'Individual, written' },
      { l: 'Feedback turnaround', s: '48 hours', p: '48 hours' },
      { l: '1:1 portfolio review', s: '—', p: 'One session' },
      { l: 'Interview story bank', s: 'You build it', p: 'Reviewed with you' },
      { l: 'Mock interview + written debrief', s: '—', p: 'One session' },
      { l: 'Demo Day presenting slot', s: '—', p: 'Yes' },
      { l: 'Capstone defence', s: 'Yes', p: 'Yes' },
      { l: 'Rubric-level ratings', s: '—', p: 'Per capability area' },
      { l: 'Employer-verifiable link', s: '—', p: 'Yes' },
      { l: 'Credential issued', s: 'Capability Record', p: 'Verified Passport' },
    ].map(x => ({
      l: x.l, s: x.s, p: x.p,
      sfg: x.s === '—' ? 'var(--fg-4)' : 'var(--fg-2)',
      pfg: (x.p === 'Verified Passport' || x.p === 'Yes') ? 'var(--moss-700)' : 'var(--fg-1)',
    })),

    tStd: { on: S.cTier === 'std', bd: S.cTier === 'std' ? 'var(--seal-500)' : 'var(--border-strong)', bg: S.cTier === 'std' ? 'var(--seal-50)' : 'var(--paper)', price: cur.c + ' ' + money(pr.std), each: cur.c + ' ' + money(pr.stdP2) + ' ×2' },
    tPrem: { on: S.cTier === 'prem', bd: S.cTier === 'prem' ? 'var(--seal-500)' : 'var(--border-strong)', bg: S.cTier === 'prem' ? 'var(--seal-50)' : 'var(--paper)', price: cur.c + ' ' + money(pr.prem), each: cur.c + ' ' + money(pr.premP2) + ' ×2' },

    // Two plans, matching production. The prototype's third "3 payments" tier
    // and its instalment premium are both gone: production splits the same
    // total across two payments, so neither plan costs more than the other.
    planTabs: ([
      { k: 'full' as const, l: 'In full', m: 1 },
      { k: 'p2' as const, l: '2 payments', m: 2 },
    ]).map(x => {
      const each = x.m === 1 ? tierFull : tierEach;
      const tot = each * x.m;
      // Production quotes the instalment as round(full / 2), which for an odd
      // full price leaves the two payments summing to one unit more. That is a
      // rounding artefact, not an instalment premium, so it is not billed as
      // "+1" — only a genuine surcharge is called out.
      const surcharge = tot - tierFull;
      const rounding = surcharge <= 1;
      return {
        k: x.k, l: x.l,
        amt: cur.c + ' ' + money(each) + (x.m === 1 ? '' : ' ×' + x.m),
        note: x.m === 1 ? 'Paid once' : ('Total ' + money(tot) + (rounding ? '' : ' · +' + money(surcharge))),
        nfg: (x.m === 1 || rounding) ? 'var(--moss-500)' : 'var(--ochre-500)',
        bd: S.cPlan === x.k ? 'var(--seal-500)' : 'var(--border-strong)',
        bg: S.cPlan === x.k ? 'var(--seal-50)' : 'var(--white)',
      };
    }),

    planTotalLine: int
      ? 'Single payment · nothing further'
      : (S.cPlan === 'full'
        ? ('Total ' + cur.c + ' ' + money(tierFull) + ' · paid once, nothing further')
        : ('Total ' + cur.c + ' ' + money(tierEach * 2) + (tierEach * 2 - tierFull <= 1
            ? ' · split across two payments at no extra cost'
            : ' · paying in full would save ' + cur.c + ' ' + money(tierEach * 2 - tierFull)))),

    canAddOn,
    addOn: {
      name: k === 'pm' ? 'AI Product Builder' : 'BA for AI & Automation',
      slug: (k === 'pm' ? 'aipb' : 'baai') as ProgKey,
      line: k === 'pm' ? 'Ship a working AI product in five weeks.' : 'Specify AI work that survives an audit.',
      alone: cur.c + ' ' + money(pr.alone),
      bundle: cur.c + ' ' + money(pr.bundle),
      on: addOnOn,
      btn: addOnOn ? '✓ Added to your enrolment' : 'Add for ' + cur.c + ' ' + money(pr.bundle),
      btnBg: addOnOn ? 'var(--moss-500)' : 'var(--seal-500)',
      bd: addOnOn ? 'var(--moss-500)' : 'rgba(244,239,230,.22)',
    },

    // Every region pays by bank transfer. The prototype routed Nigeria to
    // Paystack; that rail is not in use, so there is no NG/international split
    // any more and no card checkout to fall back to.
    isNg: false,
    isIntl: true,
    tierName: int ? 'Single tier' : (S.cTier === 'prem' ? 'Premium' : 'Standard'),
    planName: int ? 'Single payment' : (S.cPlan === 'full' ? 'Paid in full' : 'Two payments'),
    regionName: CUR_REGION_NAME[S.cur],
    payMethod: cur.c + ' bank transfer',
    payCta: 'Get bank transfer details',

    // Encodes programme, tier, plan and whether the AI intensive is bundled
    // in, then a crypto-random token. See lib/payments/enrolment-reference.ts
    // for why the prototype's formula could not be kept.
    payRef: (() => {
      const parts = {
        code: p.code,
        tier: (int ? 'single' : S.cTier) as 'std' | 'prem' | 'single',
        plan: (int ? 'full' : S.cPlan) as 'full' | 'p2',
        withAddOn: addOnOn,
      };
      // The token is minted in the browser, so the very first server render has
      // none. The panel only opens on a click, long after hydration.
      return payToken ? buildReference(parts, payToken) : referencePrefix(parts) + '-••••••';
    })(),

    bankConfigured: !!bank?.configured,
    bankTitle: bank?.title || '',
    bankRows: (bank?.rows || []).map(r => ({
      k: r.k, v: r.v, intl: !!r.intl,
      copied: S.copied === r.k,
      btn: S.copied === r.k ? 'Copied' : 'Copy',
    })),
    proofEmail: bank?.proofEmail || '',
    payOpen: S.payOpen,

    // Numeric equivalents of `due`/`total`, for analytics and anything else
    // that needs a number rather than a formatted string.
    amounts: {
      currency: cur.c,
      tierFull,
      tierEach,
      addOn: addOnOn ? pr.bundle : 0,
      dueNow: dueNow + (addOnOn ? pr.bundle : 0),
      total: tierFull + (addOnOn ? pr.bundle : 0),
      addOnBundle: pr.bundle,
    },

    due: cur.c + ' ' + money(dueNow + (addOnOn ? pr.bundle : 0)),
    total: cur.c + ' ' + money(tierFull + (addOnOn ? pr.bundle : 0)),
    dueNote: int ? 'Single payment · five weeks' : (S.cPlan === 'full' ? 'Paid in full · nothing further' : 'Then one more payment in October'),
    credLine: int ? 'Capability Record · Passport via a pathway' : (S.cTier === 'prem' ? 'Verified Capability Passport' : 'Capability Record'),
    proc: 'PROCESSED VIA ' + cur.proc,

    askLabel: 'THE ' + (ASK[k] || []).length + ' WE GET ASKED MOST',
    ask: (ASK[k] || []).map((x, i) => ({
      i, q: x.q, a: x.a,
      open: S.askOpen === i,
      mark: S.askOpen === i ? '−' : '+',
      bg: S.askOpen === i ? 'var(--paper)' : 'transparent',
    })),

    ladder: (LADDER[k] || []).map((t, i) => ({
      n: ['NEXT ROLE', 'THEN', 'IN TIME'][i], t,
      bg: i === 2 ? 'var(--ink-900)' : 'var(--paper)',
      bd: i === 2 ? 'var(--ink-900)' : 'var(--border-strong)',
      nfg: i === 2 ? 'var(--seal-300)' : 'var(--fg-3)',
      tfg: i === 2 ? 'var(--bone)' : 'var(--fg-1)',
    })),
  };
}

export type Detail = ReturnType<typeof detail>;
