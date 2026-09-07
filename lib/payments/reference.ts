import { randomInt } from 'crypto';
import { getPathway, getIntensive, isIntensiveSlug } from '@/lib/cohort-config';
import { getKv } from '@/lib/kv';
import type { EnrolmentIntent } from './types';

function kvKey(reference: string): string {
  return `enrol:${reference}`;
}

// Generates a real, server-side, collision-resistant enrolment reference in
// the format UP-{trackCode}-C{cohort}-{number}, and persists the intent
// record atomically in the same operation. No seat hold / expiry — an
// enrolment intent, once created, does not self-expire; collisions are
// checked via Redis's atomic SET ... NX, not by a separate read-then-write.
export async function createEnrolmentIntent(
  input: Omit<EnrolmentIntent, 'reference' | 'status' | 'createdAt'>,
): Promise<EnrolmentIntent> {
  const programme = isIntensiveSlug(input.programmeSlug) ? getIntensive(input.programmeSlug) : getPathway(input.programmeSlug);
  const kv = getKv();

  for (let attempt = 0; attempt < 5; attempt++) {
    const number = randomInt(100000, 999999); // 6-digit, crypto-random
    const reference = `UP-${programme.trackCode}-C${programme.cohort}-${number}`;
    const now = new Date();

    const intent: EnrolmentIntent = {
      ...input,
      reference,
      status: 'pending',
      createdAt: now.toISOString(),
    };

    // SET ... NX: the write only succeeds if the key doesn't already exist —
    // collision check, no TTL/expiry attached.
    const created = await kv.set(kvKey(reference), intent, { nx: true });
    if (created === 'OK') return intent;
  }

  throw new Error('Could not allocate a unique enrolment reference after 5 attempts');
}

export async function getEnrolmentIntent(reference: string): Promise<EnrolmentIntent | null> {
  const kv = getKv();
  const intent = await kv.get<EnrolmentIntent>(kvKey(reference));
  return intent ?? null;
}

// Updates an intent's status in place.
export async function updateEnrolmentStatus(reference: string, status: EnrolmentIntent['status']): Promise<EnrolmentIntent | null> {
  const kv = getKv();
  const existing = await kv.get<EnrolmentIntent>(kvKey(reference));
  if (!existing) return null;
  const updated: EnrolmentIntent = { ...existing, status };
  await kv.set(kvKey(reference), updated);
  return updated;
}

// Re-creates an intent record from Paystack webhook metadata in the rare case
// the original KV record is missing but the payment genuinely succeeded — a
// safety net so a real payment is never silently dropped. Not used by the
// bank-transfer rail (no webhook exists for it).
export async function reviveVerifiedIntent(
  reference: string,
  data: Omit<EnrolmentIntent, 'reference' | 'status' | 'createdAt'>,
): Promise<EnrolmentIntent> {
  const kv = getKv();
  const now = new Date().toISOString();
  const intent: EnrolmentIntent = { ...data, reference, status: 'paystack_verified', createdAt: now };
  await kv.set(kvKey(reference), intent);
  return intent;
}
