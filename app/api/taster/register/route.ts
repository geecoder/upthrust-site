import { NextRequest, NextResponse } from 'next/server';
import { storeTasterRegistration, tasterRegistrationSchema } from '@/lib/taster/registration';

export const runtime = 'nodejs'; // randomUUID + the Upstash client

export async function POST(request: NextRequest) {
  // Validation first, before any infrastructure check — the same ordering
  // correction made on /api/enrol/init. Telling someone with a two-letter name
  // that registration is "unavailable" hides the real problem behind a 503.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = tasterRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    const first = Object.values(flat.fieldErrors).flat().find(Boolean);
    return NextResponse.json(
      { ok: false, error: first || 'Please check the details you entered.', issues: flat },
      { status: 400 },
    );
  }

  try {
    const result = await storeTasterRegistration(parsed.data);

    if (!result.ok) {
      // 503 rather than 500: the request was fine, the destination is not
      // configured. The form uses this to offer an email fallback instead of
      // pretending the registration was taken.
      return NextResponse.json(
        {
          ok: false,
          reason: 'not_configured',
          error: 'We could not record your registration automatically. Please email us and we will add you.',
        },
        { status: 503 },
      );
    }

    // Deliberately does not echo the submitted name, email or phone back.
    return NextResponse.json({ ok: true, id: result.id });
  } catch (err) {
    console.error('taster/register failed', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
