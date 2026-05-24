'use client';

import { useEffect, useState } from 'react';
import {
  getAnalyticsDiagnostics,
  initAnalytics,
  sendMixpanelHttpFallbackTest,
  trackDebugEvent,
  type AnalyticsDiagnostics,
  type MixpanelHttpFallbackResult,
} from '@/lib/analytics';

export default function MixpanelDebugPage() {
  const [diagnostics, setDiagnostics] = useState<AnalyticsDiagnostics | null>(null);
  const [sdkResult, setSdkResult] = useState('');
  const [fallbackResult, setFallbackResult] = useState<MixpanelHttpFallbackResult | null>(null);
  const [fallbackLoading, setFallbackLoading] = useState(false);

  function refreshDiagnostics() {
    setDiagnostics(getAnalyticsDiagnostics());
  }

  useEffect(() => {
    initAnalytics();
    refreshDiagnostics();
  }, []);

  function sendSdkTestEvent() {
    const sent = trackDebugEvent();
    setSdkResult(sent ? 'SDK test event queued.' : 'SDK test event was not sent. Check token and diagnostics.');
    refreshDiagnostics();
  }

  async function sendHttpFallbackEvent() {
    setFallbackLoading(true);
    setFallbackResult(null);

    const result = await sendMixpanelHttpFallbackTest();
    setFallbackResult(result);
    setFallbackLoading(false);
    refreshDiagnostics();
  }

  return (
    <section style={{
      background: 'var(--paper)',
      minHeight: '70vh',
      padding: 'clamp(48px, 8vw, 96px) 0',
    }}>
      <div className="container-narrow">
        <p className="eyebrow">Debug</p>
        <h1 style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(2.25rem, 5vw, 4rem)',
          fontWeight: 400,
          letterSpacing: '-0.025em',
          lineHeight: 1,
          color: 'var(--ink)',
          marginBottom: 24,
        }}>
          Mixpanel diagnostics
        </h1>

        <div style={{
          border: '1px solid var(--paper-line)',
          padding: 24,
          marginBottom: 24,
          background: 'rgba(255,255,255,0.36)',
        }}>
          <dl style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(140px, 220px) 1fr',
            gap: '12px 20px',
            margin: 0,
            fontSize: '0.9375rem',
          }}>
            <dt style={{ color: 'var(--ink-muted)' }}>Token present</dt>
            <dd style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>
              {String(Boolean(diagnostics?.token_present))}
            </dd>

            <dt style={{ color: 'var(--ink-muted)' }}>Token prefix</dt>
            <dd style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>
              {diagnostics?.token_prefix || 'not set'}
            </dd>

            <dt style={{ color: 'var(--ink-muted)' }}>Residency</dt>
            <dd style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>
              {diagnostics?.residency || 'US'}
            </dd>

            <dt style={{ color: 'var(--ink-muted)' }}>API host</dt>
            <dd style={{ margin: 0, color: 'var(--ink)', fontWeight: 700, wordBreak: 'break-word' }}>
              {diagnostics?.api_host || 'https://api-js.mixpanel.com'}
            </dd>

            <dt style={{ color: 'var(--ink-muted)' }}>Initialised</dt>
            <dd style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>
              {String(Boolean(diagnostics?.has_initialised))}
            </dd>

            <dt style={{ color: 'var(--ink-muted)' }}>Current URL</dt>
            <dd style={{ margin: 0, color: 'var(--ink)', fontWeight: 700, wordBreak: 'break-word' }}>
              {diagnostics?.current_url || ''}
            </dd>
          </dl>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <button type="button" className="btn btn-primary" onClick={sendSdkTestEvent}>
            Send Mixpanel Test Event
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={sendHttpFallbackEvent}
            disabled={fallbackLoading}
          >
            {fallbackLoading ? 'Sending...' : 'Send HTTP Fallback Test Event'}
          </button>
        </div>

        {sdkResult && (
          <p style={{ color: 'var(--ink)', fontWeight: 700, marginBottom: 16 }}>
            {sdkResult}
          </p>
        )}

        {fallbackResult && (
          <div style={{
            border: '1px solid var(--paper-line)',
            padding: 20,
            background: 'var(--paper-soft)',
          }}>
            <p style={{ marginBottom: 8, color: 'var(--ink)', fontWeight: 700 }}>
              HTTP fallback response: {fallbackResult.status} {fallbackResult.ok ? 'OK' : 'Failed'}
            </p>
            <pre style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
              color: 'var(--ink-muted)',
              fontSize: '0.875rem',
            }}>
              {fallbackResult.body}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
