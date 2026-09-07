import 'server-only';

// Server-side Mixpanel ingestion, for the two events that must never be
// trusted to a browser: a confirmed enrolment and a definitive payment
// failure. A client-side "thank you page" fires when someone reaches a URL;
// this fires when the application itself records the money as received.
//
// Uses the HTTP ingestion API directly rather than a Node SDK — one POST, no
// extra dependency, and no background flushing to reason about in a serverless
// function that may be frozen the moment the response is returned.

import { createHash } from 'crypto';
import type {
  AnalyticsProperties, EnrolmentCompletedProps, Environment, EventName, PaymentFailedProps,
} from './types';
import { EVENTS } from './types';

function environment(): Environment {
  const vercelEnv = process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV;
  if (vercelEnv === 'production') return 'production';
  if (vercelEnv === 'preview') return 'preview';
  if (vercelEnv === 'development') return 'development';
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

// Ingestion accepts the ordinary project token. MIXPANEL_TOKEN is offered so
// the value can be kept out of the client bundle if preferred; it falls back
// to the public token, which is the same string. No service-account secret is
// used here, and none belongs in a NEXT_PUBLIC_* variable.
function token(): string {
  return (process.env.MIXPANEL_TOKEN || process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '').trim();
}

function apiHost(): string {
  const explicit = (process.env.MIXPANEL_API_HOST || process.env.NEXT_PUBLIC_MIXPANEL_API_HOST || '').trim();
  if (explicit) return explicit.replace(/\/+$/, '');
  const residency = (process.env.NEXT_PUBLIC_MIXPANEL_RESIDENCY || 'US').toUpperCase();
  if (residency === 'EU') return 'https://api-eu.mixpanel.com';
  if (residency === 'IN') return 'https://api-in.mixpanel.com';
  return 'https://api.mixpanel.com';
}

/**
 * Idempotency. Mixpanel de-duplicates events sharing an $insert_id, so a
 * webhook delivered twice — or an ops person clicking confirm twice — produces
 * one conversion. Derived from the event name and the order reference, so the
 * same order always yields the same id without needing to store one.
 */
function insertId(event: string, orderId: string): string {
  return createHash('sha256').update(`${event}:${orderId}`).digest('hex').slice(0, 32);
}

type ServerTrackOptions = {
  /** The originating browser's Mixpanel device id, when the order captured one. */
  distinctId?: string | null;
  /** Overrides the derived id where a caller has a better one. */
  insertId?: string;
};

async function serverTrack(
  event: EventName,
  orderId: string,
  properties: AnalyticsProperties,
  options: ServerTrackOptions = {},
): Promise<boolean> {
  const tok = token();
  if (!tok) {
    console.warn('[analytics] server event skipped — no Mixpanel token configured', { event, orderId });
    return false;
  }

  // Falling back to the order reference keeps the event attributable to
  // *something* stable when no browser id was captured. It will not join the
  // anonymous journey, but the conversion is still counted rather than lost.
  const distinct_id = options.distinctId || `order_${orderId}`;

  const payload = [{
    event,
    properties: {
      token: tok,
      distinct_id,
      $insert_id: options.insertId || insertId(event, orderId),
      time: Date.now(),
      site: 'upthrust_web',
      environment: environment(),
      source: 'server',
      ...properties,
    },
  }];

  try {
    const res = await fetch(`${apiHost()}/track?ip=0`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'text/plain' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.warn('[analytics] server event rejected', { event, orderId, status: res.status });
      return false;
    }
    return true;
  } catch (error) {
    // Analytics must never take down a payment webhook.
    console.warn('[analytics] server event failed', { event, orderId, error });
    return false;
  }
}

/**
 * The conversion event. Call only where the application genuinely records the
 * learner as paid — a verified provider webhook, or an ops confirmation of a
 * matched bank transfer. Safe to call twice for the same order.
 */
export async function trackEnrolmentCompleted(
  props: EnrolmentCompletedProps,
  options: ServerTrackOptions = {},
): Promise<boolean> {
  const { order_id, ...rest } = props;
  return serverTrack(EVENTS.enrolmentCompleted, order_id, { order_id, ...rest }, options);
}

export async function trackPaymentFailed(
  props: PaymentFailedProps,
  options: ServerTrackOptions = {},
): Promise<boolean> {
  const { order_id, ...rest } = props;
  // Failures can legitimately repeat for one order, so the attempt is folded
  // into the id rather than collapsing every failure into the first.
  return serverTrack(EVENTS.paymentFailed, order_id, { order_id, ...rest }, {
    ...options,
    insertId: options.insertId
      || insertId(`${EVENTS.paymentFailed}:${rest.failure_type}`, order_id),
  });
}
