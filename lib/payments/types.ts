import type { ProgrammeSlug } from '@/lib/cohort-config';
import type { Region } from '@/lib/config';

export type EnrolmentStatus =
  | 'pending' // reference just issued, no payment action taken yet — does not expire
  | 'paystack_verified' // Paystack webhook confirmed the transaction
  | 'transfer_pending_review' // bank-transfer rail: user says they've sent it, awaiting manual reconciliation
  | 'transfer_confirmed'; // bank-transfer rail: an ops person matched the transfer to this reference

export interface EnrolmentIntent {
  reference: string;
  programmeSlug: ProgrammeSlug;
  tier: 'standard' | 'premium' | null; // null for intensives (single-price, no tiers)
  plan: 'full' | 'installment';
  region: Region;
  amount: number; // recomputed server-side at /api/enrol/init — never trust a client-supplied amount
  currency: string;
  leadName: string;
  leadEmail: string;
  status: EnrolmentStatus;
  createdAt: string; // ISO
  /**
   * The Mixpanel device id of the browser that created this enrolment, when
   * one was available. Analytics context only — never rendered, never used
   * for authorisation, and absent if the visitor blocks analytics. It exists
   * so the server-side Enrolment Completed event lands on the same user
   * journey that produced the enrolment rather than a detached profile.
   */
  analyticsDistinctId?: string | null;
}

export interface InitResult {
  reference: string;
  // Paystack-specific (only present when the rail is 'paystack')
  authorizationUrl?: string;
  accessCode?: string;
  // Bank-transfer-specific (only present when the rail is 'bank_transfer')
  bankDetails?: BankDetailRow[];
}

export interface BankDetailRow {
  label: string;
  value: string;
}

export interface VerifyResult {
  status: EnrolmentStatus;
  intent: EnrolmentIntent | null;
}

export interface WebhookResult {
  handled: boolean;
  reference?: string;
}

export interface PaymentRail {
  /** Server-side: create the provider-side transaction (or persist-only, for bank transfer) and return what the client needs to proceed. */
  initTransaction(intent: EnrolmentIntent): Promise<InitResult>;
  /** Server-side: authoritative status check — never trust a client-reported "success" alone. */
  verifyTransaction(reference: string): Promise<VerifyResult>;
  /** Only meaningful for rails with an async provider callback (Paystack). Bank transfer has none. */
  handleWebhook?(rawBody: string, signatureHeader: string | null): Promise<WebhookResult>;
}
