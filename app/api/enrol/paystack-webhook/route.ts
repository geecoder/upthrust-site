import { NextRequest, NextResponse } from 'next/server';
import { paystackRail, isPaystackConfigured } from '@/lib/payments/paystack';

export const runtime = 'nodejs'; // needs the raw request body for signature verification

export async function POST(request: NextRequest) {
  if (!isPaystackConfigured()) {
    return NextResponse.json({ error: 'Paystack is not configured in this environment.' }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-paystack-signature');

  try {
    const result = await paystackRail.handleWebhook!(rawBody, signature);
    if (!result.handled) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('paystack webhook failed', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
