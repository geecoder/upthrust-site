import 'server-only';

// Turns a persisted EnrolmentIntent into the server-side conversion event.
//
// Kept separate from ./server so the transport stays generic and this file
// owns the one mapping that matters: intent -> Enrolment Completed. It is the
// single place that decides what a confirmed enrolment looks like in
// analytics, so the bank-transfer and Paystack paths cannot disagree.

import { getIntensive, getPathway, isIntensiveSlug } from '@/lib/cohort-config';
import type { EnrolmentIntent, EnrolmentStatus } from '@/lib/payments/types';
import { normalisePlan, normaliseTier } from './programs';
import { trackEnrolmentCompleted, trackPaymentFailed } from './server';
import type { PaymentMethod } from './types';

/** The statuses that mean the money is genuinely in. */
const PAID: EnrolmentStatus[] = ['paystack_verified', 'transfer_confirmed'];

export function isPaidStatus(status: EnrolmentStatus): boolean {
  return PAID.includes(status);
}

function programmeName(intent: EnrolmentIntent): string {
  try {
    return isIntensiveSlug(intent.programmeSlug)
      ? getIntensive(intent.programmeSlug).label
      : getPathway(intent.programmeSlug).label;
  } catch {
    return intent.programmeSlug;
  }
}

function cohortOf(intent: EnrolmentIntent): number | undefined {
  try {
    return isIntensiveSlug(intent.programmeSlug)
      ? getIntensive(intent.programmeSlug).cohort
      : getPathway(intent.programmeSlug).cohort;
  } catch {
    return undefined;
  }
}

/**
 * Emit the conversion for a confirmed enrolment.
 *
 * Idempotent twice over: it refuses anything that is not in a paid status,
 * and the underlying request carries an $insert_id derived from the reference,
 * so a replayed webhook or a double-clicked ops confirmation still yields one
 * Enrolment Completed. `previousStatus` lets a caller skip the request
 * entirely when the intent was already paid before this call.
 */
export async function reportEnrolmentCompleted(
  intent: EnrolmentIntent,
  paymentMethod: PaymentMethod,
  previousStatus?: EnrolmentStatus,
): Promise<boolean> {
  if (!isPaidStatus(intent.status)) return false;
  if (previousStatus && isPaidStatus(previousStatus)) return false; // already counted

  return trackEnrolmentCompleted(
    {
      order_id: intent.reference,
      program_slug: intent.programmeSlug,
      program_name: programmeName(intent),
      tier: normaliseTier(intent.tier, isIntensiveSlug(intent.programmeSlug)),
      payment_plan: normalisePlan(intent.plan),
      payment_method: paymentMethod,
      revenue: intent.amount,
      currency: intent.currency,
      cohort: cohortOf(intent),
    },
    { distinctId: intent.analyticsDistinctId ?? null },
  );
}

export async function reportPaymentFailed(
  intent: EnrolmentIntent,
  paymentMethod: PaymentMethod,
  failureType: string,
): Promise<boolean> {
  return trackPaymentFailed(
    {
      order_id: intent.reference,
      program_slug: intent.programmeSlug,
      tier: normaliseTier(intent.tier, isIntensiveSlug(intent.programmeSlug)),
      payment_plan: normalisePlan(intent.plan),
      payment_method: paymentMethod,
      // A short, enumerable classification — never the provider's raw error.
      failure_type: failureType,
      currency: intent.currency,
    },
    { distinctId: intent.analyticsDistinctId ?? null },
  );
}
