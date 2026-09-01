import { NextRequest, NextResponse } from 'next/server';
import { enrolStatusSchema } from '@/lib/payments/schemas';
import { paystackRail } from '@/lib/payments/paystack';
import { RailUnavailableError } from '@/lib/payments/rail';
import { isKvConfigured } from '@/lib/kv';

export const runtime = 'nodejs';

// Called when the browser lands back on /enrol after a Paystack checkout
// redirect — does a real-time authoritative check against Paystack rather
// than waiting on the webhook, so the confirmation screen never stalls on
// webhook delivery lag.
export async function GET(request: NextRequest) {
  if (!isKvConfigured()) {
    return NextResponse.json({ error: 'Enrolment is temporarily unavailable.' }, { status: 503 });
  }

  const parsed = enrolStatusSchema.safeParse({ reference: request.nextUrl.searchParams.get('reference') });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Missing or invalid reference' }, { status: 400 });
  }

  try {
    const result = await paystackRail.verifyTransaction(parsed.data.reference);
    if (!result.intent) {
      return NextResponse.json({ error: 'No enrolment found for that reference.' }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof RailUnavailableError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    console.error('paystack-verify failed', err);
    return NextResponse.json({ error: 'Something went wrong confirming your payment.' }, { status: 500 });
  }
}
