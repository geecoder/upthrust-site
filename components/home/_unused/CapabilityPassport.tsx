function passportRow(area: string, level: 'Proficient' | 'Developing', pct: number) {
  const proficient = level === 'Proficient';
  const color = proficient ? 'var(--moss-500)' : 'var(--seal-500)';
  return (
    <div key={area} style={{ padding: '10px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-800)' }}>{area}</span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color, whiteSpace: 'nowrap' }}>{level}</span>
      </div>
      <div style={{ height: 3, background: 'var(--border-soft)' }}>
        <div style={{ height: 3, width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

// Unwired from the home page during the prototype ground-truth reconciliation
// pass — the prototype's home route doesn't include this section. Kept here,
// compiled but unused, in case it's wanted elsewhere later.
export function CapabilityPassport() {
  return (
    <section style={{ background: 'var(--ink-800)', color: 'var(--fg-on-ink)' }}>
      <div className="container stack-mobile" style={{ padding: '96px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 72, alignItems: 'start' }}>
        <div>
          <div style={{ width: 40, height: 2, background: 'var(--seal-500)', marginBottom: 20 }} />
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-200)' }}>The Capability Passport</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.6vw, 2.875rem)', fontWeight: 600, letterSpacing: '-0.026em', lineHeight: 1.1, margin: '18px 0 0', color: 'var(--bone)' }}>
            A certificate says you attended. Your Passport shows what you can do.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-200)', margin: '24px 0 0' }}>
            The Upthrust Capability Passport is a structured evidence record — not a certificate. Every capability area is assessed against a published rubric. Every score is backed by real work you produced. Every Passport is signed by a facilitator who reviewed your capstone.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-300)', margin: '18px 0 0' }}>
            We&rsquo;re honest: the Passport&rsquo;s value grows as our alumni network grows. Today, what you hold is a verifiable, defensible record of your work that you can present in any interview, on any application, to any employer.
          </p>
          <div style={{ margin: '32px 0 0', borderTop: '1px solid rgba(244,239,230,.14)' }}>
            {[
              'Capability areas assessed against published rubric',
              'Real artefacts produced during the program',
              'Capstone defence score and summary',
              'Facilitator review and sign-off',
              'Shareable digital record with unique Passport ID',
            ].map((line) => (
              <div key={line} style={{ display: 'flex', gap: 12, padding: '13px 0', borderBottom: '1px solid rgba(244,239,230,.14)', fontSize: 15, color: 'var(--bone)' }}>
                <span style={{ color: 'var(--seal-300)' }}>✓</span>{line}
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--paper)', color: 'var(--fg-1)', border: '1px solid rgba(244,239,230,.2)', padding: '34px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 20, borderBottom: '1px solid var(--ink-800)', paddingBottom: 20 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em' }}>Upthrust</div>
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--fg-2)', marginTop: 2 }}>Capability Passport</div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--bone)', background: 'var(--seal-500)', padding: '4px 8px' }}>SAMPLE</div>
          </div>
          <div style={{ padding: '22px 0 0', display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing: '-0.022em' }}>Adaeze Okonkwo</div>
              <div style={{ fontSize: 14, color: 'var(--seal-600)', fontWeight: 600, marginTop: 2 }}>Business Analysis Pathway</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', marginTop: 8, letterSpacing: '0.05em' }}>COHORT 1 · UPTHRUST CAREER CAPABILITY ACCELERATOR · 2026</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--moss-700)', background: 'var(--moss-50)', border: '1px solid var(--moss-500)', padding: '4px 9px', whiteSpace: 'nowrap' }}>
              Verified ready
            </span>
          </div>
          <div style={{ margin: '22px 0 0', paddingTop: 16, borderTop: '1px solid var(--border-soft)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)', marginBottom: 12 }}>Assessed capability areas</div>
            {passportRow('Requirements elicitation & analysis', 'Proficient', 88)}
            {passportRow('Stakeholder management & facilitation', 'Proficient', 84)}
            {passportRow('Business process modelling', 'Developing', 52)}
            {passportRow('Solution design & documentation (BRD)', 'Proficient', 90)}
            {passportRow('UAT planning & test scenario writing', 'Proficient', 86)}
            {passportRow('Agile delivery & backlog contribution', 'Developing', 48)}
          </div>
          <div style={{ margin: '22px 0 0', padding: '18px 0', borderTop: '1px solid var(--border-soft)', borderBottom: '1px solid var(--border-soft)', background: 'var(--bone-dim)', paddingLeft: 16, paddingRight: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--seal-600)', marginBottom: 10 }}>Capstone defence · Week 12</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, lineHeight: 1.5, fontStyle: 'italic', margin: 0, color: 'var(--fg-1)' }}>
              &ldquo;Adaeze demonstrates strong requirements discipline and clear thinking under ambiguity. Her UAT pack caught three edge cases the scoping team had missed. She is ready for associate-level BA work in a serious product team.&rdquo;
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-3)', marginTop: 14 }}>— FACILITATOR SIGN-OFF · GENESIS N. ENWENYEOKWU · CBAP</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', color: 'var(--fg-3)' }}>ISSUED: AUGUST 2026 · upthrustdigital.com</div>
            <div style={{ width: 44, height: 44, border: '1px solid var(--border-strong)', display: 'grid', placeItems: 'center', opacity: 0.6 }}>
              <div style={{ width: 30, height: 30, backgroundImage: 'repeating-linear-gradient(to right, var(--ink-800) 0 3px, transparent 3px 7px), repeating-linear-gradient(to bottom, var(--ink-800) 0 3px, transparent 3px 7px)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
