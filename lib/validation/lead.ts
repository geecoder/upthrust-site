// Lead-capture validation, shared by the assessment form, the enrol flow, and
// the server routes behind them. Pure functions with no React or Node
// dependencies so the same rules apply on both sides — client-side checks are
// a courtesy to the person filling the form, never a control.
//
// Lifted out of app/assessment/AssessmentContent.tsx, which had the only copy
// and is no longer wired to a route. The blocklist is extended and now matches
// subdomains, which the original missed (mail.yopmail.com passed).

export const NAME_MIN = 5;

/** Practical rather than RFC-complete: one @, no spaces, a dotted TLD. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Disposable and temporary inboxes, blocked so results and cohort follow-up
// actually reach a real person. Matched on the domain and any subdomain of it.
export const DISPOSABLE_DOMAINS: readonly string[] = [
  // yopmail runs a large family of alias domains
  'yopmail.com', 'yopmail.fr', 'yopmail.net', 'cool.fr.nf', 'jetable.fr.nf',
  'nospam.ze.tc', 'nomail.xl.cx', 'mega.zik.dj', 'speed.1s.fr', 'courriel.fr.nf',
  'moncourrier.fr.nf', 'monemail.fr.nf', 'monmail.fr.nf',
  // mailinator and friends
  'mailinator.com', 'mailinator.net', 'mailinator2.com', 'notmailinator.com',
  'reallymymail.com', 'sogetthis.com', 'suremail.info', 'binkmail.com',
  'bobmail.info', 'chammy.info', 'devnullmail.com', 'letthemeatspam.com',
  'mailin8r.com', 'mailnator.com', 'spamherelots.com', 'thisisnotmyrealemail.com',
  // guerrillamail family
  'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org', 'guerrillamail.biz',
  'guerrillamail.de', 'guerrillamail.info', 'guerrillamailblock.com',
  'sharklasers.com', 'grr.la', 'spam4.me', 'pokemail.net',
  // ten-minute style
  '10minutemail.com', '10minutemail.net', '10minutemail.co.uk', '20minutemail.com',
  '30minutemail.com', 'tempmailo.com', 'minutemail.com',
  // temp-mail / tempmail family
  'temp-mail.org', 'temp-mail.io', 'temp-mail.ru', 'tempmail.com', 'tempmail.net',
  'tempmail.plus', 'tempmailaddress.com', 'tempr.email', 'tempail.com',
  'tmpmail.org', 'tmpmail.net', 'tmails.net', 'tmail.ws',
  // throwaway / trash
  'throwawaymail.com', 'throwaway.email', 'trashmail.com', 'trashmail.de',
  'trashmail.net', 'trash-mail.com', 'trashmail.ws', 'wegwerfmail.de',
  'dispostable.com', 'discard.email', 'discardmail.com', 'spamgourmet.com',
  'spambox.us', 'spam.la', 'mytrashmail.com', 'kurzepost.de',
  // one-off inbox services
  'getnada.com', 'nada.email', 'maildrop.cc', 'mintemail.com', 'mailnesia.com',
  'moakt.com', 'moakt.cc', 'emailondeck.com', 'mohmal.com', 'fakeinbox.com',
  'fakemailgenerator.com', 'inboxbear.com', 'trbvm.com', 'mailcatch.com',
  'inboxkitten.com', 'mailsac.com', 'harakirimail.com', 'byom.de',
  'anonaddy.me', 'mailbox.in.ua', 'linshiyouxiang.net', 'yomail.info',
  'burnermail.io', 'emltmp.com', 'tmpbox.net', 'mail-temporaire.fr',
  'dropmail.me', 'emailfake.com', 'generator.email', 'internxt.com',
  'mail.tm', 'mailtemp.uk', 'luxusmail.org', 'vpsvcs.com',
];

const DISPOSABLE = new Set(DISPOSABLE_DOMAINS);

/**
 * Blocked if the domain is on the list, or is a subdomain of one — the
 * original exact-match check let mail.yopmail.com straight through.
 */
export function isDisposableDomain(domain: string): boolean {
  const d = domain.trim().toLowerCase().replace(/\.$/, '');
  if (!d) return false;
  if (DISPOSABLE.has(d)) return true;
  const parts = d.split('.');
  for (let i = 1; i < parts.length - 1; i++) {
    if (DISPOSABLE.has(parts.slice(i).join('.'))) return true;
  }
  return false;
}

/** '' when valid; otherwise the message to show the person. */
export function validateLeadEmail(email: string): string {
  const v = email.trim();
  if (!v) return 'Enter your email address.';
  if (v.length > 254) return 'That email address is too long.';
  if (!EMAIL_RE.test(v)) return 'Enter a valid email address, like you@company.com.';

  const domain = v.split('@')[1]?.toLowerCase() ?? '';
  // A dotted-quad or bracketed literal is valid per RFC but never a real
  // person's inbox on a form like this.
  if (/^\[|^\d+\.\d+\.\d+\.\d+$/.test(domain)) return 'Enter a valid email address, like you@company.com.';
  if (domain.includes('..') || domain.startsWith('-') || domain.startsWith('.')) {
    return 'Enter a valid email address, like you@company.com.';
  }
  if (isDisposableDomain(domain)) {
    return 'Please use a permanent email address — disposable inboxes are not accepted.';
  }
  return '';
}

/** '' when valid; otherwise the message to show the person. */
export function validateLeadName(name: string): string {
  const v = name.trim().replace(/\s+/g, ' ');
  if (!v) return 'Enter your full name.';
  if (v.length < NAME_MIN) return `Your name needs at least ${NAME_MIN} characters.`;
  if (v.length > 80) return 'That name is too long.';
  // Guards against "aaaaa" and "12345" clearing a bare length check.
  if (!/\p{L}/u.test(v)) return 'Enter your name using letters.';
  if ((v.match(/\p{L}/gu) || []).length < NAME_MIN) return `Your name needs at least ${NAME_MIN} letters.`;
  return '';
}

export function isLeadValid(name: string, email: string): boolean {
  return !validateLeadName(name) && !validateLeadEmail(email);
}
