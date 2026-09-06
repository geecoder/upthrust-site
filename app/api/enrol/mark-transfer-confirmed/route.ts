import { NextRequest, NextResponse } from 'next/server';
import { markTransferConfirmedSchema } from '@/lib/payments/schemas';
import { markTransferConfirmed } from '@/lib/payments/bankTransfer';
import { isKvConfigured } from '@/lib/kv';
import { getEnrolmentIntent } from '@/lib/payments/reference';
import { reportEnrolmentCompleted } from '@/lib/analytics/enrolment';

export const runtime = 'nodejs';

// Internal-only reconciliation action: an ops person calls this after
// matching a bank statement to a reference. Guarded by a shared-secret
// header rather than a full admin UI/auth system — deliberately minimal for
// this launch, per the implementation plan.
export async function POST(request: NextRequest) {
  const token = request.headers.get('x-ops-token');
  const expected = process.env.INTERNAL_OPS_TOKEN;
  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isKvConfigured()) {
    return NextResponse.json({ error: 'Enrolment storage is not configured.' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = markTransferConfirmedSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid reference' }, { status: 400 });
  }

  try {
    // Read the status first so a second confirmation of the same reference is
    // recognised as already-counted and does not emit a duplicate conversion.
    const before = await getEnrolmentIntent(parsed.data.reference);

    const intent = await markTransferConfirmed(parsed.data.reference);
    if (!intent) {
      return NextResponse.json({ error: 'No enrolment found for that reference (it may have expired)' }, { status: 404 });
    }

    // Analytics is deliberately awaited but never allowed to fail the request:
    // reportEnrolmentCompleted swallows its own errors and returns a boolean.
    await reportEnrolmentCompleted(intent, 'bank_transfer', before?.status);

    return NextResponse.json({ status: intent.status, intent });
  } catch (err) {
    console.error('mark-transfer-confirmed failed', err);
    return NextResponse.json({ error: 'Something went wrong updating that enrolment.' }, { status: 500 });
  }
}
