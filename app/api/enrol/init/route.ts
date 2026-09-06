import { NextRequest, NextResponse } from 'next/server';
import { enrolInitSchema } from '@/lib/payments/schemas';
import { createEnrolmentIntent } from '@/lib/payments/reference';
import { getPaymentRail, RailUnavailableError } from '@/lib/payments/rail';
import { isKvConfigured } from '@/lib/kv';
import { amountDue } from '@/lib/pricing';
import { currencyFor } from '@/lib/config';
import { getRegionFromRequest } from '@/lib/geoServer';

export const runtime = 'nodejs'; // crypto.randomInt + raw-body-friendly, matches the webhook route's needs

export async function POST(request: NextRequest) {
  // Validate the request before checking infrastructure. The other order told
  // someone who submitted a disposable address or a two-letter name that
  // "enrolment is temporarily unavailable" — which is both untrue and
  // unactionable, and hid the real problem behind a 503.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = enrolInitSchema.safeParse(body);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    // Surface the first field message so the client can show something useful
    // rather than a generic failure.
    const first = Object.values(flat.fieldErrors).flat().find(Boolean);
    return NextResponse.json(
      { error: first || 'Invalid enrolment details', issues: flat },
      { status: 400 },
    );
  }
  const { programmeSlug, tier, plan, leadName, leadEmail, analyticsDistinctId } = parsed.data;

  // Resolved from this request's geo headers, never from the body.
  const region = await getRegionFromRequest();

  if (!isKvConfigured()) {
    return NextResponse.json(
      { error: 'Enrolment is temporarily unavailable. Please try again shortly or book a consultation instead.' },
      { status: 503 },
    );
  }

  // Amount is always recomputed here from config — never trust a client-supplied amount.
  const amount = amountDue(programmeSlug, region, tier ?? 'standard', plan);
  const currency = currencyFor(region);

  try {
    const intent = await createEnrolmentIntent({
      programmeSlug, tier, plan, region, amount, currency, leadName, leadEmail,
      analyticsDistinctId: analyticsDistinctId ?? null,
    });

    const rail = getPaymentRail(region);
    const result = await rail.initTransaction(intent);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof RailUnavailableError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    console.error('enrol/init failed', err);
    return NextResponse.json({ error: 'Something went wrong starting your enrolment. Please try again.' }, { status: 500 });
  }
}
