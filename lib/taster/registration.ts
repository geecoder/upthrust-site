import 'server-only';

// Taster session registrations.
//
// The taster is a free open evening before enrolment closes, so a registration
// is a lead rather than an order: no payment, no reference, no seat. It is
// stored separately from EnrolmentIntent for that reason.
//
// Two sinks, tried in order, and the route reports which one accepted:
//   1. Upstash Redis, when configured — the durable record.
//   2. Resend, when configured — an email to the team inbox.
// If neither is available the route says so plainly and the form falls back to
// a pre-filled mailto, so a registration is never silently dropped.

import { randomUUID } from 'crypto';
import { z } from 'zod';
import { getKv, isKvConfigured } from '@/lib/kv';
import { PROGRAMME_SLUGS } from '@/lib/payments/schemas';
import { validateLeadEmail, validateLeadName } from '@/lib/validation/lead';
import { COHORT } from '@/lib/cohort-config';

export const tasterRegistrationSchema = z.object({
  fullName: z.string().trim().superRefine((v, ctx) => {
    const msg = validateLeadName(v);
    if (msg) ctx.addIssue({ code: 'custom', message: msg });
  }),
  email: z.string().trim().toLowerCase().superRefine((v, ctx) => {
    const msg = validateLeadEmail(v);
    if (msg) ctx.addIssue({ code: 'custom', message: msg });
  }),
  programmeSlug: z.enum(PROGRAMME_SLUGS),
  // Optional by design. Loose on format because international numbers vary
  // wildly and rejecting a valid one costs a lead; it is only ever used to
  // call someone back.
  phone: z.string().trim().max(32).optional().or(z.literal('')),
  /** Analytics correlation only — never shown, never used for authorisation. */
  analyticsDistinctId: z.string().trim().max(128).optional().nullable(),
});

export type TasterRegistrationInput = z.infer<typeof tasterRegistrationSchema>;

export type TasterRegistration = TasterRegistrationInput & {
  id: string;
  sessionDate: string;
  createdAt: string;
};

export type StoreResult =
  | { ok: true; id: string; sinks: string[] }
  | { ok: false; reason: 'not_configured' };

const KEY = (id: string) => `taster:${id}`;
const INDEX = 'taster:index';

async function toKv(record: TasterRegistration): Promise<boolean> {
  if (!isKvConfigured()) return false;
  try {
    const kv = getKv();
    await kv.set(KEY(record.id), record);
    // A list so the team can read registrations back without scanning keys.
    await kv.lpush(INDEX, record.id);
    return true;
  } catch (err) {
    console.error('taster: KV write failed', err);
    return false;
  }
}

async function toEmail(record: TasterRegistration): Promise<boolean> {
  const key = (process.env.RESEND_API_KEY || '').trim();
  const to = (process.env.PAYMENT_PROOF_EMAIL || 'info@upthrustdigital.com').trim();
  if (!key) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Upthrust <onboarding@resend.dev>',
        to: [to],
        subject: `Taster session registration — ${record.fullName}`,
        text: [
          `Name:      ${record.fullName}`,
          `Email:     ${record.email}`,
          `Pathway:   ${record.programmeSlug}`,
          `Phone:     ${record.phone || '—'}`,
          `Session:   ${record.sessionDate}`,
          `Received:  ${record.createdAt}`,
        ].join('\n'),
      }),
    });
    if (!res.ok) {
      console.error('taster: Resend rejected', res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error('taster: Resend failed', err);
    return false;
  }
}

export async function storeTasterRegistration(input: TasterRegistrationInput): Promise<StoreResult> {
  const record: TasterRegistration = {
    ...input,
    phone: input.phone || undefined,
    id: randomUUID(),
    sessionDate: COHORT.tasterDate,
    createdAt: new Date().toISOString(),
  };

  const sinks: string[] = [];
  if (await toKv(record)) sinks.push('kv');
  if (await toEmail(record)) sinks.push('email');

  // Refusing rather than returning a hollow success: a form that says "thanks"
  // and writes nowhere is worse than one that admits it cannot take the
  // registration and offers an address instead.
  if (sinks.length === 0) return { ok: false, reason: 'not_configured' };

  return { ok: true, id: record.id, sinks };
}
