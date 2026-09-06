// The payment reference a payer types into their bank transfer, and quotes
// when they email their receipt. It is the only thing tying an inbound bank
// payment to a person, so it has to be unique per attempt.
//
// The prototype computed it as `1000 + (k.length * 373) % 8999`, which depends
// only on the length of the programme key. That yields six references for the
// entire site, and every twelve-week pathway shares the same number:
//
//   pm -> UP-PM-C2-1746   ba -> UP-BA-C2-1746
//   pd -> UP-PD-C2-1746   po -> UP-PO-C2-1746
//
// Every Business Analysis payer would transfer quoting UP-BA-C2-1746, making
// reconciliation impossible. This replaces it.
//
// Format: UP-{CODE}-{TIER}{PLAN}{ADDON}-{TOKEN}
//
//   CODE   PM BA PD PO AI BX     the programme
//   TIER   S standard, P premium, X intensive (single tier)
//   PLAN   1 paid in full, 2 two payments
//   ADDON  A when the AI intensive is bundled in; omitted otherwise
//   TOKEN  6 crypto-random characters
//
//   UP-BA-P2A-K7M3QX   Business Analysis, Premium, two payments, plus AI
//   UP-PM-S1-4H8DZR    Product Management, Standard, paid in full
//   UP-AI-X1-9QW2LF    AI Product Builder, standalone
//
// The prefix is readable on a bank statement, so a transfer can be routed
// before anyone opens the email; the token is what makes it unique.

// No 0/O/1/I — these get read aloud, retyped, and copied off screenshots.
const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const TOKEN_LENGTH = 6;

/** ~1.07e9 possibilities. */
export function mintReferenceToken(): string {
  const bytes = new Uint8Array(TOKEN_LENGTH);
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    // Never expected in a browser or modern Node; kept so a reference is still
    // produced rather than throwing at the point of payment.
    for (let i = 0; i < TOKEN_LENGTH; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  let out = '';
  for (let i = 0; i < TOKEN_LENGTH; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

export type ReferenceParts = {
  code: string;                        // PM | BA | PD | PO | AI | BX
  tier: 'std' | 'prem' | 'single';
  plan: 'full' | 'p2';
  withAddOn?: boolean;
};

export function referencePrefix({ code, tier, plan, withAddOn }: ReferenceParts): string {
  const t = tier === 'single' ? 'X' : tier === 'prem' ? 'P' : 'S';
  const p = plan === 'p2' ? '2' : '1';
  return `UP-${code}-${t}${p}${withAddOn ? 'A' : ''}`;
}

export function buildReference(parts: ReferenceParts, token: string): string {
  return `${referencePrefix(parts)}-${token}`;
}

/**
 * One token per browser session, so the reference stays put across a refresh
 * or a change of tier — someone who has already emailed their receipt must not
 * find a different reference on screen afterwards. The prefix still tracks the
 * live selection, so the reference always describes what is actually selected.
 */
const SESSION_KEY = 'upthrust_pay_token';

export function getSessionToken(): string {
  if (typeof window === 'undefined') return '';
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing && existing.length === TOKEN_LENGTH) return existing;
    const fresh = mintReferenceToken();
    window.sessionStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    // Private mode or storage disabled — still unique, just not stable across
    // a reload. The reference in the mailto matches what is on screen.
    return mintReferenceToken();
  }
}
