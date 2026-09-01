import { createHmac, timingSafeEqual } from 'crypto';
import { SITE } from '@/lib/config';
import { updateEnrolmentStatus, getEnrolmentIntent } from './reference';
import { RailUnavailableError } from './rail-error';
import type { PaymentRail, EnrolmentIntent, InitResult, VerifyResult, WebhookResult } from './types';

// ============================================================
// PAYSTACK (NG) — real API integration, gated behind PAYSTACK_SECRET_KEY.
// The UI is fully built to match the ground-truth prototype's flow even
// though this environment may not have live keys configured yet; when the
// key is absent, every call here throws a clear, honest RailUnavailableError
// instead of faking a success.
// ============================================================

const PAYSTACK_BASE = 'https://api.paystack.co';

function secretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new RailUnavailableError('Paystack is not configured in this environment yet — please try again shortly, or book a consultation call to arrange payment.');
  }
  return key;
}

export function isPaystackConfigured(): boolean {
  return Boolean(process.env.PAYSTACK_SECRET_KEY);
}

export const paystackRail: PaymentRail = {
  async initTransaction(intent: EnrolmentIntent): Promise<InitResult> {
    const key = secretKey();
    const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: intent.leadEmail,
        amount: Math.round(intent.amount * 100), // kobo
        currency: intent.currency,
        reference: intent.reference,
        callback_url: `${SITE.url}/enrol?paystack_reference=${encodeURIComponent(intent.reference)}`,
        metadata: {
          programmeSlug: intent.programmeSlug,
          tier: intent.tier,
          plan: intent.plan,
          leadName: intent.leadName,
        },
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.status) {
      throw new Error(data.message || 'Paystack could not start this transaction.');
    }
    return {
      reference: intent.reference,
      authorizationUrl: data.data.authorization_url,
      accessCode: data.data.access_code,
    };
  },

  async verifyTransaction(reference: string): Promise<VerifyResult> {
    const key = secretKey();
    const res = await fetch(`${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    const data = await res.json();
    const existing = await getEnrolmentIntent(reference);
    if (res.ok && data.status && data.data?.status === 'success') {
      const updated = await updateEnrolmentStatus(reference, 'paystack_verified');
      return { status: 'paystack_verified', intent: updated ?? existing };
    }
    // Not yet successful (still pending, abandoned, or failed on Paystack's
    // side) — echo the current persisted status rather than guessing.
    return { status: existing?.status ?? 'pending', intent: existing };
  },

  async handleWebhook(rawBody: string, signatureHeader: string | null): Promise<WebhookResult> {
    const key = secretKey();
    if (!signatureHeader) return { handled: false };
    const expected = createHmac('sha512', key).update(rawBody).digest('hex');
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(signatureHeader, 'utf8');
    if (a.length !== b.length || !timingSafeEqual(a, b)) return { handled: false };

    const event = JSON.parse(rawBody);
    if (event.event === 'charge.success') {
      const reference = event.data?.reference as string | undefined;
      if (reference) {
        await updateEnrolmentStatus(reference, 'paystack_verified');
        return { handled: true, reference };
      }
    }
    return { handled: true };
  },
};
