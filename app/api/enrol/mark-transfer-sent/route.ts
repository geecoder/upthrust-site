import { NextRequest, NextResponse } from 'next/server';
import { markTransferConfirmedSchema as referenceOnlySchema } from '@/lib/payments/schemas';
import { markTransferPendingReview } from '@/lib/payments/bankTransfer';
import { isKvConfigured } from '@/lib/kv';

export const runtime = 'nodejs';

// Self-reported transition when the user says "I've sent the transfer" —
// UX continuity only (so a refresh/return shows "pending review" rather than
// reverting to a bare "pending" state). This does NOT confirm the transfer;
// only the internal-only /api/enrol/mark-transfer-confirmed route does that.
export async function POST(request: NextRequest) {
  if (!isKvConfigured()) {
    return NextResponse.json({ error: 'Enrolment storage is not configured.' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = referenceOnlySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid reference' }, { status: 400 });
  }

  try {
    const intent = await markTransferPendingReview(parsed.data.reference);
    if (!intent) {
      return NextResponse.json({ error: 'No enrolment found for that reference (it may have expired)' }, { status: 404 });
    }
    return NextResponse.json({ status: intent.status, intent });
  } catch (err) {
    console.error('mark-transfer-sent failed', err);
    return NextResponse.json({ error: 'Something went wrong updating that enrolment.' }, { status: 500 });
  }
}
