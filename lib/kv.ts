import { Redis } from '@upstash/redis';

// Lazily constructed so a missing KV credential doesn't crash the whole
// server at import time — only the payment routes that actually touch it
// fail (gracefully, see lib/payments/bankTransfer.ts), not unrelated pages.
// Redis.fromEnv() accepts either UPSTASH_REDIS_REST_URL/TOKEN (Upstash
// directly) or KV_REST_API_URL/TOKEN (Vercel's Redis marketplace
// integration) — see .env.example.
let client: Redis | null = null;

export function getKv(): Redis {
  if (!client) {
    client = Redis.fromEnv();
  }
  return client;
}

export function isKvConfigured(): boolean {
  return Boolean(
    (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) &&
    (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN),
  );
}
