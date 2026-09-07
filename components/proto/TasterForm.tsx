'use client';

// Register interest in the free taster session.
//
// Appears in three places — the landing page, the assessment page, and each
// programme's pricing panel — so it takes a `variant` for width and a
// `defaultProgramme` so the assessment result can pre-select the pathway it
// just recommended.
//
// Validation mirrors the assessment form: the shared lead validators, errors
// on blur rather than mid-typing, and a submit button that stays pressable so
// it can explain what is wrong instead of sitting inert.

import { useRef, useState } from 'react';
import { P, PROG_IDS, PROG_HREF, type ProgKey } from '@/lib/proto/data';
import { COHORT, DATES } from '@/lib/cohort-config';
import { validateLeadEmail, validateLeadName } from '@/lib/validation/lead';
import { analytics, getDistinctId, slugForKey } from '@/lib/analytics';

type Variant = 'full' | 'panel';

const MONO = { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-3)' } as const;

function field(invalid: boolean) {
  return {
    width: '100%', boxSizing: 'border-box' as const, height: 46, padding: '0 13px',
    fontFamily: 'var(--font-ui)', fontSize: 15, background: 'var(--white)',
    border: `1px solid ${invalid ? 'var(--crimson-500)' : 'var(--border-strong)'}`,
    borderRadius: 4, transition: 'border-color 150ms',
  };
}

export function TasterForm({
  variant = 'full',
  defaultProgramme,
  location,
}: {
  variant?: Variant;
  defaultProgramme?: ProgKey;
  /** Where this instance lives — carried on the analytics events. */
  location: 'landing' | 'assessment' | 'program_pricing';
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [prog, setProg] = useState<ProgKey>(defaultProgramme ?? 'pm');
  const [phone, setPhone] = useState('');

  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [needsEmailFallback, setNeedsEmailFallback] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);

  const nameError = validateLeadName(name);
  const emailError = validateLeadEmail(email);
  const valid = !nameError && !emailError;
  const showName = (touched.name || submitted) && !!nameError;
  const showEmail = (touched.email || submitted) && !!emailError;

  function noteStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    analytics.tasterFormStarted({ source_page: location });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setFailure(null);
    if (!valid) {
      (nameError ? nameRef : emailRef).current?.focus();
      return;
    }

    setBusy(true);
    try {
      const res = await fetch('/api/taster/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          email,
          programmeSlug: slugForKey(prog),
          phone: phone || undefined,
          analyticsDistinctId: getDistinctId(),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.ok) {
        setDone(true);
        analytics.tasterSessionRegistered({
          source_page: location,
          program_slug: slugForKey(prog),
          program_name: P[prog].n,
          has_phone: Boolean(phone),
        });
        return;
      }

      if (res.status === 503) {
        // Storage is not configured. Say so and offer the email route rather
        // than showing a success the team would never see.
        setNeedsEmailFallback(true);
        setFailure(data?.error || 'We could not record that automatically.');
        return;
      }
      setFailure(data?.error || 'Something went wrong. Please try again.');
    } catch {
      setFailure('Please check your connection and try again.');
    } finally {
      setBusy(false);
    }
  }

  const mailto = `mailto:info@upthrustdigital.com?subject=${encodeURIComponent(
    `Taster session — ${DATES.tasterDayMonth}`,
  )}&body=${encodeURIComponent(
    `Full name: ${name}\nEmail: ${email}\nPathway of interest: ${P[prog].n}\nPhone: ${phone || '—'}\n\nPlease register me for the taster session on ${DATES.tasterLong}.`,
  )}`;

  const panel = variant === 'panel';

  if (done) {
    return (
      <div style={{ background: 'var(--moss-50)', border: '1px solid var(--moss-500)', borderRadius: 6, padding: panel ? '18px 20px' : '26px 24px' }}>
        <div style={{ ...MONO, color: 'var(--moss-700)' }}>YOU ARE REGISTERED</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: panel ? 20 : 24, fontWeight: 600, letterSpacing: '-.022em', marginTop: 8 }}>
          See you on {DATES.tasterDayMonth}.
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-2)', margin: '8px 0 0' }}>
          We will email the joining link to <strong>{email}</strong> before the session.
        </p>
      </div>
    );
  }

  return (
    <div
      id={location === 'landing' ? 'v3-taster' : undefined}
      style={{
        background: 'var(--paper)', border: '1px solid var(--ink-900)',
        borderRadius: 6, padding: panel ? '20px 20px 22px' : '28px 26px 30px',
        boxShadow: panel ? 'none' : 'var(--shadow-2)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.1em', color: 'var(--bone)', background: 'var(--seal-500)', padding: '3px 7px' }}>FREE TASTER</span>
        <span style={{ ...MONO }}>{DATES.tasterLong.toUpperCase()}</span>
      </div>

      <div style={{ fontFamily: 'var(--font-display)', fontSize: panel ? 21 : 27, fontWeight: 600, letterSpacing: '-.024em', lineHeight: 1.15, marginTop: 12 }}>
        Sit in before you commit.
      </div>
      <p style={{ fontSize: panel ? 13 : 15, lineHeight: 1.55, color: 'var(--fg-2)', margin: '8px 0 0' }}>
        One live session on {DATES.tasterDayMonth}, a week before the cohort starts on {DATES.cohortStartDayMonth}. Register your interest and we will send the joining link.
      </p>

      <form onSubmit={submit} noValidate style={{ marginTop: 20, display: 'grid', gap: 14, gridTemplateColumns: panel ? '1fr' : '1fr 1fr' }}>
        <label style={{ display: 'block', gridColumn: panel ? 'auto' : '1 / -1' }}>
          <span style={{ ...MONO, display: 'block', marginBottom: 7 }}>FULL NAME</span>
          <input
            ref={nameRef}
            value={name}
            onChange={(e) => { setName(e.target.value); noteStarted(); }}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            placeholder="Adaeze Okonkwo"
            autoComplete="name"
            aria-invalid={showName || undefined}
            aria-describedby={showName ? `taster-name-err-${location}` : undefined}
            style={field(showName)}
          />
          {showName && (
            <span id={`taster-name-err-${location}`} role="alert" style={{ display: 'block', fontSize: 13, color: 'var(--crimson-500)', marginTop: 6 }}>{nameError}</span>
          )}
        </label>

        <label style={{ display: 'block' }}>
          <span style={{ ...MONO, display: 'block', marginBottom: 7 }}>EMAIL</span>
          <input
            ref={emailRef}
            value={email}
            onChange={(e) => { setEmail(e.target.value); noteStarted(); }}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="you@email.com"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            aria-invalid={showEmail || undefined}
            aria-describedby={showEmail ? `taster-email-err-${location}` : undefined}
            style={field(showEmail)}
          />
          {showEmail && (
            <span id={`taster-email-err-${location}`} role="alert" style={{ display: 'block', fontSize: 13, color: 'var(--crimson-500)', marginTop: 6 }}>{emailError}</span>
          )}
        </label>

        <label style={{ display: 'block' }}>
          <span style={{ ...MONO, display: 'block', marginBottom: 7 }}>PHONE <span style={{ color: 'var(--fg-4)' }}>· OPTIONAL</span></span>
          <input
            value={phone}
            onChange={(e) => { setPhone(e.target.value); noteStarted(); }}
            placeholder="+44 7000 000000"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            style={field(false)}
          />
        </label>

        <label style={{ display: 'block', gridColumn: panel ? 'auto' : '1 / -1' }}>
          <span style={{ ...MONO, display: 'block', marginBottom: 7 }}>PATHWAY YOU ARE INTERESTED IN</span>
          <select
            value={prog}
            onChange={(e) => { setProg(e.target.value as ProgKey); noteStarted(); }}
            style={{ ...field(false), appearance: 'none', backgroundImage: 'none', cursor: 'pointer' }}
          >
            {PROG_IDS.map((k) => (
              <option key={k} value={k}>
                {P[k].n}{P[k].fam === 'int' ? ' · 5-week intensive' : ' · 12-week pathway'}
              </option>
            ))}
          </select>
        </label>

        <div style={{ gridColumn: panel ? 'auto' : '1 / -1' }}>
          <button
            type="submit"
            disabled={busy}
            className="pv-h-seal600"
            style={{ font: 'inherit', fontSize: 15, fontWeight: 500, height: 50, width: '100%', background: 'var(--seal-500)', color: 'var(--bone)', border: 0, borderRadius: 4, cursor: busy ? 'progress' : 'pointer', transition: 'background 150ms' }}
          >
            {busy ? 'Registering…' : 'Register for the taster'}
          </button>

          {failure && (
            <div role="alert" style={{ display: 'flex', gap: 10, alignItems: 'start', marginTop: 12, padding: '12px 14px', background: 'var(--ochre-50)', borderLeft: '2px solid var(--ochre-500)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.08em', color: 'var(--ochre-700)', whiteSpace: 'nowrap', paddingTop: 2 }}>NOTE</span>
              <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-1)' }}>
                {failure}
                {needsEmailFallback && (
                  <>
                    {' '}
                    <a href={mailto} className="pv-h-seal7" style={{ color: 'var(--seal-600)', textDecoration: 'underline' }}>
                      Email your details instead
                    </a>
                    {' — everything you typed is pre-filled.'}
                  </>
                )}
              </span>
            </div>
          )}

          <div style={{ ...MONO, fontSize: 9, marginTop: 10, textAlign: 'center' }}>
            NO PAYMENT · NO OBLIGATION · APPLICATIONS CLOSE {DATES.applyByDayMonth.toUpperCase()}
          </div>
        </div>
      </form>
    </div>
  );
}

export { COHORT as TASTER_COHORT, PROG_HREF as TASTER_PROG_HREF };
