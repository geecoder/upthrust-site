import { NextRequest, NextResponse } from 'next/server';
import { enrolStatusSchema } from '@/lib/payments/schemas';
import { getEnrolmentIntent } from '@/lib/payments/reference';
import { isKvConfigured } from '@/lib/kv';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  if (!isKvConfigured()) {
    return NextResponse.json({ error: 'Enrolment is temporarily unavailable.' }, { status: 503 });
  }

  const parsed = enrolStatusSchema.safeParse({ reference: request.nextUrl.searchParams.get('reference') });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Missing or invalid reference' }, { status: 400 });
  }

  try {
    const intent = await getEnrolmentIntent(parsed.data.reference);
    if (!intent) {
      // Intents don't expire — a missing record means this reference was
      // never issued (or was mistyped), a genuine 404, not a hold expiry.
      return NextResponse.json({ error: 'No enrolment found for that reference.' }, { status: 404 });
    }
    return NextResponse.json({ status: intent.status, intent });
  } catch (err) {
    console.error('enrol/status failed', err);
    return NextResponse.json({ error: 'Something went wrong checking your enrolment status.' }, { status: 500 });
  }
}
