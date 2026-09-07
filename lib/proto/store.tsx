'use client';

// A direct port of the prototype component's state, timers and observers.
// The prototype holds everything in one component, and its interactions are
// interdependent (the hero rotator, the ticker, the loop player, the gallery,
// the AI stage assembly, the week track, the count-up, the reveal observer),
// so this keeps that single shared state rather than splintering it and
// changing the timing.

import {
  createContext, useContext, useEffect, useRef, useState, useTransition,
  type Dispatch, type ReactNode, type SetStateAction,
} from 'react';
import { useRouter } from 'next/navigation';
import { ARTS, type CurKey, type ProgKey } from './data';
import { setRegionOverride } from '@/app/actions/region';
import { CUR_TO_REGION } from './region-map';

export type Route = 'home' | 'assess' | 'about' | 'accel' | ProgKey;

export type ProtoState = {
  rot: number; stackN: number; loopI: number; loopAuto: boolean; loopT: number;
  fam: 'all' | 'path' | 'int'; hoverTile: ProgKey | null; gal: number;
  cProg: ProgKey; cTier: 'std' | 'prem'; cPlan: 'full' | 'p2'; cAdd: boolean;
  aiKey: 'aipb' | 'baai'; aiStage: number; aiAuto: boolean; proofT: number;
  route: Route; pWeek: number; wkAuto: boolean; menu: boolean; askOpen: number; prFaq: number;
  acLoop: number; acPhase: number; acLv: string; acFaq: number; currOpen: boolean;
  aStage: 'intro' | 'quiz' | 'computing' | 'result';
  qi: number; answers: (number | null)[]; leadName: string; leadEmail: string; capOpen: number;
  payOpen: boolean; copied: string;
  cur: CurKey;
};

type Ctx = {
  s: ProtoState;
  set: (patch: Partial<ProtoState>) => void;
  upd: Dispatch<SetStateAction<ProtoState>>;
  setCur: (c: CurKey) => void;
  go: (href: string) => void;
};

const ProtoCtx = createContext<Ctx | null>(null);

const INITIAL: ProtoState = {
  rot: 0, stackN: 1, loopI: 0, loopAuto: true, loopT: 0,
  fam: 'all', hoverTile: null, gal: 0,
  cProg: 'ba', cTier: 'prem', cPlan: 'full', cAdd: false,
  aiKey: 'aipb', aiStage: 0, aiAuto: true, proofT: 0,
  route: 'home', pWeek: 0, wkAuto: true, menu: false, askOpen: 0, prFaq: 0,
  acLoop: 0, acPhase: 0, acLv: 'All briefs', acFaq: 0, currOpen: false,
  aStage: 'intro', qi: 0, answers: [], leadName: '', leadEmail: '', capOpen: 0,
  payOpen: false, copied: '',
  cur: 'us',
};

export function ProtoProvider({ initialCur, children }: { initialCur: CurKey; children: ReactNode }) {
  const [s, upd] = useState<ProtoState>({ ...INITIAL, cur: initialCur });
  const [, startTransition] = useTransition();
  const router = useRouter();

  const set = (patch: Partial<ProtoState>) => upd(prev => ({ ...prev, ...patch }));

  // The currency the prototype guessed from a browser timezone is resolved on
  // the server here instead, so the right prices are in the first paint. This
  // keeps that value authoritative when a refresh delivers a new one.
  useEffect(() => { upd(prev => ({ ...prev, cur: initialCur })); }, [initialCur]);

  // Selecting a region in the pricing header writes the cookie and refreshes,
  // which re-renders every figure server-side. Local state updates first so
  // the switcher's own pill responds without waiting a round trip.
  const setCur = (c: CurKey) => {
    upd(prev => ({ ...prev, cur: c, payOpen: false }));
    startTransition(async () => {
      await setRegionOverride(CUR_TO_REGION[c]);
      router.refresh();
    });
  };

  const go = (href: string) => {
    upd(prev => ({ ...prev, menu: false }));
    router.push(href);
  };

  // Refs so the long-lived intervals below read fresh values at tick time —
  // the prototype reads `this.state` directly for the same reason.
  const r = useRef(s);
  r.current = s;

  useEffect(() => {
    const t: number[] = [];

    t.push(window.setInterval(() => upd(p => ({ ...p, rot: (p.rot + 1) % 6 })), 2200));
    t.push(window.setInterval(() => upd(p => ({ ...p, stackN: p.stackN >= 12 ? 1 : p.stackN + 1 })), 1400));

    t.push(window.setInterval(() => {
      if (r.current.route !== 'accel') return;
      upd(p => ({ ...p, acLoop: (p.acLoop + 1) % 6 }));
    }, 3400));

    t.push(window.setInterval(() => {
      if (!r.current.loopAuto) return;
      upd(p => {
        const nt = p.loopT + 10;
        if (nt >= 100) return { ...p, loopT: 0, loopI: (p.loopI + 1) % 6 };
        return { ...p, loopT: nt };
      });
    }, 240));

    t.push(window.setInterval(() => upd(p => ({ ...p, gal: (p.gal + 1) % 3 })), 4600));

    t.push(window.setInterval(() => {
      if (!r.current.aiAuto) return;
      upd(p => ({ ...p, aiStage: (p.aiStage + 1) % 5 }));
    }, 2100));

    t.push(window.setInterval(() => {
      const st = r.current;
      if (!st.wkAuto || st.route === 'home') return;
      const n = (ARTS[st.route as ProgKey] || []).length || 12;
      upd(p => ({ ...p, pWeek: (p.pWeek + 1) % n }));
    }, 2000));

    return () => t.forEach(window.clearInterval);
  }, []);

  // The stats band counts up once, when it scrolls into view.
  useEffect(() => {
    let roll = 0;
    const io = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return;
      io.disconnect();
      window.clearInterval(probe);
      const t0 = Date.now();
      roll = window.setInterval(() => {
        const p = Math.min(1, (Date.now() - t0) / 1200);
        const eased = 1 - Math.pow(1 - p, 4);
        upd(prev => ({ ...prev, proofT: eased }));
        if (p >= 1) window.clearInterval(roll);
      }, 30);
    }, { threshold: 0.3 });

    const probe = window.setInterval(() => {
      const el = document.getElementById('v3-proof');
      if (el) io.observe(el);
    }, 600);

    return () => { io.disconnect(); window.clearInterval(probe); window.clearInterval(roll); };
  }, [s.route]);

  // Scroll reveal. `data-d` carries the stagger delay; the prototype only ever
  // uses 60, 80, 120 and 200.
  useEffect(() => {
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const d = el.getAttribute('data-d');
        if (d) el.style.animationDelay = `${d}ms`;
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.14 });

    const scan = () => document.querySelectorAll('[data-rv]:not(.in)').forEach(el => io.observe(el));
    const id = window.setTimeout(scan, 90);
    const repeat = window.setInterval(scan, 400);
    return () => { io.disconnect(); window.clearTimeout(id); window.clearInterval(repeat); };
  }, [s.route]);

  return <ProtoCtx.Provider value={{ s, set, upd, setCur, go }}>{children}</ProtoCtx.Provider>;
}

export function useProto(): Ctx {
  const c = useContext(ProtoCtx);
  if (!c) throw new Error('useProto must be used inside ProtoProvider');
  return c;
}

// Each route tells the store which one it is, so the timers that are
// route-scoped in the prototype (the accelerator loop, the week track) behave
// the same way here.
export function useProtoRoute(route: Route) {
  const { set } = useProto();
  useEffect(() => {
    set({ route, pWeek: 0, wkAuto: true, menu: false, gal: 0, askOpen: 0, currOpen: false, ...(route in ARTS ? { cProg: route as ProgKey } : {}) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);
}

// `this.scrollTo(id)` — 70px offset for the sticky header.
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
}
