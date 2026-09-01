import type { Region } from '@/lib/config';
import { updateEnrolmentStatus, getEnrolmentIntent } from './reference';
import type { PaymentRail, EnrolmentIntent, InitResult, VerifyResult, BankDetailRow } from './types';

// ============================================================
// RECEIVING BANK DETAILS
// ============================================================
// One source of truth: lib/payments/bank-accounts.ts, reading .env.local.
// This module previously kept its own hard-coded table with every value blank,
// which meant the enrol flow and the pathway page could drift apart — and that
// the real accounts would have had to be pasted into source in two places.
//
// The fallbacks below are the shapes each region's panel expects when its
// environment values are not set. The enrol flow renders an empty value as
// "details will follow by email" rather than a blank or invented number, so a
// misconfigured region can never present an unpayable account as real.

import { getBankDetails } from './bank-accounts';

const UNSET: Partial<Record<Region, BankDetailRow[]>> = {
  NG: [
    { label: 'Account name', value: '' }, { label: 'Bank', value: '' },
    { label: 'Account number', value: '' },
  ],
  GB: [
    { label: 'Account name', value: '' }, { label: 'Bank', value: '' },
    { label: 'Sort code', value: '' }, { label: 'Account number', value: '' },
  ],
  CA: [
    { label: 'Account name', value: '' }, { label: 'Institution number', value: '' },
    { label: 'Transit number', value: '' }, { label: 'Account number', value: '' },
  ],
};

const UNSET_USD: BankDetailRow[] = [
  { label: 'Account name', value: '' }, { label: 'Bank', value: '' },
  { label: 'Routing number', value: '' }, { label: 'Account number', value: '' },
  { label: 'Account type', value: 'Checking' },
];

export function bankDetailsFor(region: Region): BankDetailRow[] {
  const d = getBankDetails(region);
  if (d.configured) return d.rows.map(r => ({ label: r.k, value: r.v }));
  return UNSET[region] ?? UNSET_USD;
}

export const bankTransferRail: PaymentRail = {
  async initTransaction(intent: EnrolmentIntent): Promise<InitResult> {
    // The intent (and its reference) is already created and persisted by
    // lib/payments/reference.ts's createEnrolmentIntent before this runs —
    // bank transfer has no external provider to hand off to, so this just
    // returns what the client needs to render the transfer panel.
    return {
      reference: intent.reference,
      bankDetails: bankDetailsFor(intent.region),
    };
  },

  async verifyTransaction(reference: string): Promise<VerifyResult> {
    // No automatic verification exists for this rail — a human matches a
    // bank statement to the reference and calls markTransferConfirmed below.
    // This just echoes the current persisted status.
    const intent = await getEnrolmentIntent(reference);
    return { status: intent?.status ?? 'pending', intent };
  },
  // No handleWebhook — nothing calls back for this rail.
};

// Bank-transfer-specific manual reconciliation action, invoked only from the
// internal ops route (guarded by INTERNAL_OPS_TOKEN) — not part of the
// generic PaymentRail interface since Paystack has no equivalent of it.
export async function markTransferConfirmed(reference: string): Promise<EnrolmentIntent | null> {
  return updateEnrolmentStatus(reference, 'transfer_confirmed');
}

// Self-reported client transition when the user says "I've sent the
// transfer" — UX continuity only, does not mean the transfer is actually
// verified. Real confirmation still requires markTransferConfirmed above.
export async function markTransferPendingReview(reference: string): Promise<EnrolmentIntent | null> {
  return updateEnrolmentStatus(reference, 'transfer_pending_review');
}
