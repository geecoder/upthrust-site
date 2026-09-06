# Upthrust — Mixpanel tracking plan

The measurement contract for [web.upthrustdigital.com](https://web.upthrustdigital.com).
If an event is not in this document, it should not be firing.

---

## The funnel

```
Visitor  ($mp_web_page_view)
  └─ Program Viewed
       ├─ Assessment Started → Assessment Step Completed ×N → Assessment Completed
       ├─ Consultation Form Started → Consultation Submitted
       └─ Pricing Tier Selected / Payment Plan Selected / Add-on Selected
            └─ Enrolment Started
                 └─ Checkout Started
                      └─ Enrolment Completed   ← server-side, the conversion
                         Payment Failed        ← server-side
```

Every step above `Enrolment Completed` is client-side and describes *intent*.
`Enrolment Completed` is the only event that describes money, and it is emitted
by the server when the application itself records the enrolment as paid.

---

## Architecture

| File | Role |
|---|---|
| `lib/analytics/types.ts` | Event names, payload types, domain unions. `ProgramSlug` is the app's own `ProgrammeSlug`. |
| `lib/analytics/mixpanel.ts` | The only import of `mixpanel-browser`. Init, consent gate, super properties, fail-safe `track`. |
| `lib/analytics/events.ts` | The public API — `analytics.programViewed(…)` etc. Components call these, never `mixpanel.track`. |
| `lib/analytics/programs.ts` | Key↔slug mapping, cohort lookup, tier/plan normalisation. |
| `lib/analytics/server.ts` | Server-side HTTP ingestion with `$insert_id` idempotency. `server-only`. |
| `lib/analytics/enrolment.ts` | Maps a persisted `EnrolmentIntent` to the conversion event. `server-only`. |
| `components/analytics/AnalyticsProvider.tsx` | Initialises the SDK once. Tracks no page views itself. |

Amounts are never read inside the analytics layer. Every figure is passed in by
the caller from live application state, so analytics cannot drift from the
price a visitor was shown.

---

## SDK configuration

```ts
mixpanel.init(token, {
  debug: !isProduction,
  api_host: NEXT_PUBLIC_MIXPANEL_API_HOST ?? host_for(NEXT_PUBLIC_MIXPANEL_RESIDENCY),
  track_pageview: 'url-with-path-and-query-string',
  stop_utm_persistence: true,
  persistence: 'localStorage',
  secure_cookie: isProduction,
  ignore_dnt: false,
  autocapture: {
    pageview: 'url-with-path-and-query-string',
    click: false,
    input: false,
    submit: false,
    scroll: true,
    capture_text_content: false,
  },
});
```

**Why `autocapture.pageview` is set as well as `track_pageview`.** The SDK's
`Autocapture.pageviewTrackingConfig()` reads the top-level `track_pageview`
*only when no `autocapture` object is supplied*. Because one is, the top-level
option is ignored. Setting `autocapture.pageview: false` alongside
`track_pageview: 'url-with-path-and-query-string'` silently produces **zero**
page views — this was observed and fixed during implementation. Both are now
set to the same mode.

Super properties on every custom event: `site: 'upthrust_web'`, `environment`.
Every event also carries `page_path` and `page_type`.

`environment` resolves from `NEXT_PUBLIC_VERCEL_ENV` (`production` / `preview` /
`development`), falling back to `NODE_ENV`.

---

## Events

### `$mp_web_page_view` — SDK

Emitted by the SDK on first load and on every client-side route change.
Nothing in the codebase tracks a page view by hand, so it cannot double-fire.
Carries Mixpanel's standard URL, referrer and UTM properties.

> **Migration note.** The previous implementation tracked a custom
> `Page Viewed` event from a provider effect on every pathname change. That
> event is no longer emitted. Any saved report or board built on `Page Viewed`
> must be repointed to `$mp_web_page_view`.

---

### 1. `Program Viewed`

**Meaning** — a genuine view of a programme page.
**Trigger** — mount of `ProgContent`, guarded by a ref keyed on the programme,
so Strict Mode's double-invoke and ordinary rerenders do not repeat it. A
client-side move between two programme pages does fire again.
**Source** — client · `components/proto/ProgContent.tsx`

| Property | Type | Notes |
|---|---|---|
| `program_slug` | string | `business-analysis`, `ai-product-builder`, … |
| `program_name` | string | |
| `program_type` | `pathway` \| `intensive` | Intensives use this same event — there is no per-course event. |
| `page_path` | string | |

```json
{ "program_slug": "business-analysis", "program_name": "Business Analysis",
  "program_type": "pathway", "page_path": "/pathways/business-analysis" }
```

---

### 2. `CTA Clicked`

**Meaning** — a commercially meaningful action. Ordinary navigation is *not*
tracked here; it is covered by page views.
**Source** — client · home, programme, accelerator, about, assessment result, nav

| Property | Type |
|---|---|
| `cta_name` | string |
| `cta_location` | `homepage_hero` \| `homepage_programmes` \| `homepage_bottom` \| `program_hero` \| `program_pricing` \| `program_curriculum` \| `program_faq` \| `program_bottom` \| `accelerator_hero` \| `accelerator_bottom` \| `assessment_result` \| `about_bottom` \| `navigation` \| `footer` \| `enrol_configure` \| `enrol_payment` |
| `destination` | string, optional |
| `program_slug` | string, optional |
| `tier` | `standard` \| `premium` \| `single`, optional |

Tracked CTAs: Pick a programme · Take an assessment · Explore programme ·
Enrol · View curriculum · Get bank transfer details · Enrol standalone ·
Email payment confirmation · Compare programmes · See programmes & pricing ·
Open {programme}.

---

### 3. `FAQ Expanded`

**Trigger** — opening a question. Collapsing fires nothing.
**Source** — client · `ProgContent`

| Property | Notes |
|---|---|
| `faq_id` | `{program_slug}-{index}` |
| `faq_question` | the question text |
| `program_slug` | |

**The answer is never sent.**

---

### 4. `Curriculum Interacted`

**Trigger** — a user clicking a week in the rail, or a row in the expanded full
curriculum. The auto-advancing week carousel mutates the same state on a timer
and deliberately does **not** route through this call.
**Source** — client · `ProgContent`

`program_slug`, `week_number` (1-based), `curriculum_phase`, `artefact_name`.

---

### 5. `Video Played`

`video_id`, `video_name`, `video_location`, `program_slug`.

**Not currently emitted** — the site embeds no video. The typed function exists
so the first embed is instrumented correctly rather than improvised.

---

### 6. `Pricing Tier Selected`

**Trigger** — deliberate selection of Standard or Premium.
**Source** — client · `ProgContent` pricing section

`program_slug`, `tier`, `amount` (**numeric**, the tier's full price in the
visitor's currency), `currency`, `cohort`.

---

### 7. `Payment Plan Selected`

**Trigger** — changing the payment option.
`program_slug`, `tier`, `payment_plan` (`full` \| `installments`),
`amount_due_now`, `total_amount`, `currency`.

Plan values are normalised: the pathway pages speak `p2` and the payments layer
`installment`; both report as `installments`.

---

### 8. `Add-on Selected`

**Trigger** — toggling the AI intensive add-on. Offered on Product Management
and Business Analysis only.
`program_slug`, `addon_slug`, `addon_name`, `amount`, `currency`,
`selected` (boolean — the event fires on both add and remove).

---

### 9. `Assessment Started`

**Trigger** — the intro form validates and is submitted. **Not** on viewing
`/assessment`.
`source_page`, `total_steps`.

**Never carries name or email.**

---

### 10. `Assessment Step Completed`

**Trigger** — once per scenario answered, de-duplicated by a `Set` of indices
so a rerender cannot double-count.
`step_number`, `total_steps`, `scenario_id`.

**Never carries the chosen answer, the option text, name or email.** The
purpose is drop-off measurement only.

---

### 11. `Assessment Completed`

**Trigger** — once, when the result stage is reached.
`recommended_program` (slug), `total_steps`, `duration_seconds`.

**Never carries raw responses.**

---

### 12. `Consultation Form Started`

**Trigger** — first meaningful interaction with the embedded Tally form (the
iframe taking focus). Not on page load. Once per page.
`source_page`, `program_interest` (optional).

---

### 13. `Consultation Submitted`

**Trigger** — Tally's own `postMessage` confirming a completed submission, from
a `tally.so` origin. **Never on button click.** De-duplicated by a ref, since
Tally can post more than one matching message.
`source_page`, `program_interest` (optional). No PII.

---

### 14. `Enrolment Started`

**Trigger** — `/enrol` mounts with a valid programme. Guarded by a ref keyed on
the programme, so changing tier or plan does not re-fire — that is
configuration within one enrolment, not a new one.
**Source** — client · `app/enrol/EnrolFlow.tsx`

`program_slug`, `program_name`, `program_type`, `cohort`, `tier`,
`payment_plan`, `currency`.

---

### 15. `Checkout Started`

**Trigger** — the visitor proceeds to payment. Two surfaces:

- **Programme page panel** — clicking *Get bank transfer details*. For a
  transfer there is no external checkout, so obtaining the account details *is*
  proceeding to payment.
- **`/enrol`** — a successful `/api/enrol/init`, for either rail. On the
  Paystack path the event is emitted immediately before the redirect via
  `trackBeforeNavigation`, which flushes without adding delay.

`program_slug`, `tier`, `payment_plan`, `amount_due_now`, `total_amount`,
`currency`, `cohort`, `payment_method` (`bank_transfer` \| `paystack`),
`order_id`.

---

### 16. `Enrolment Completed` — **server-side**

**The conversion event.** Never emitted by a browser and never from a success
page.

**Triggers**

| Rail | Where | When |
|---|---|---|
| Bank transfer | `POST /api/enrol/mark-transfer-confirmed` | An ops person matches a bank statement to a reference. Status → `transfer_confirmed`. |
| Paystack | `POST /api/enrol/paystack-webhook` | Signature-verified `charge.success`. Status → `paystack_verified`. |

**Idempotency — three layers**

1. `$insert_id` = `sha256("Enrolment Completed:{reference}")`, so Mixpanel
   collapses duplicates from webhook retries.
2. The pre-update status is read first; if the intent was already in a paid
   status, no request is made at all.
3. Only `paystack_verified` and `transfer_confirmed` qualify as paid.

`order_id` (the enrolment reference), `program_slug`, `program_name`, `tier`,
`payment_plan`, `payment_method`, `revenue` (**numeric**, the amount recomputed
server-side), `currency`, `cohort`.

**Never** card data, bank details, email, name or phone.

**Attribution.** `EnrolmentIntent.analyticsDistinctId` carries the originating
browser's Mixpanel device id, captured at `/api/enrol/init` and used as the
`distinct_id` on the server event, so the conversion lands on the same journey.
When absent (analytics blocked), it falls back to `order_{reference}` — the
conversion is still counted, just not joined.

---

### 17. `Payment Failed` — **server-side**

**Trigger** — signature-verified Paystack `charge.failed`.
`order_id`, `program_slug`, `tier`, `payment_plan`, `payment_method`,
`failure_type`, `currency`.

`failure_type` is a short slug derived from the gateway response. **The raw
provider error object is never sent.** The `$insert_id` includes the failure
type, so genuinely distinct failures on one order are not collapsed.

---

## Identity

- Anonymous visitors are left anonymous. `identify()` is **not** called for
  ordinary traffic — Mixpanel's device journey is preserved.
- `identifyByInternalId()` exists for the point at which someone becomes a real
  record. It takes an internal application id only.
- **Email is never used as the Mixpanel user id, and no hashed email is used as
  a substitute.**
- There is currently **no user account system and no lead table**, so nothing
  calls `identifyByInternalId()` yet. This is deliberate: inventing an identity
  from an email would be worse than staying anonymous.

---

## Privacy

Never sent: names · email addresses · phone numbers · assessment answer text ·
FAQ answer text · bank account details · card data · raw provider errors.

Autocapture is configured with `capture_text_content: false`, `input: false`
and `submit: false`, so no form contents can be captured incidentally.

Verified by driving the assessment with a real name and email and inspecting
every outbound request: no occurrence of the name, first name, email, email
local part, any of the twelve answer texts, FAQ answer text, or any bank
account number.

### Consent — open issue

**The site has no cookie or consent banner, and no privacy or terms page.**
Analytics currently runs for every visitor. This predates this work; it was not
introduced by it, and building a consent UI is a product decision rather than
something to add silently inside an analytics refactor.

What is in place:

- `ignore_dnt: false` — a browser's Do-Not-Track signal is respected.
- `setAnalyticsConsent(false)` stops tracking immediately and persists the
  refusal; `hasAnalyticsConsent()` gates both init and every `track` call.
  A banner need only call these two functions.
- Default is "granted", which matches the site's behaviour before this change.

**For a UK/EU audience this should be treated as a live compliance gap.** PECR
and GDPR require consent before non-essential analytics cookies. The mechanism
to honour a choice exists; the interface to collect one does not.

---

## Environments

`environment` is stamped on every event. To keep development traffic out of
production reporting, use a second Mixpanel project and set
`NEXT_PUBLIC_MIXPANEL_TOKEN` per environment in Vercel — Production gets the
live token, Preview and Development the dev token. Failing that, filter on
`environment == "production"` in every saved report.

---

## Environment variables

| Variable | Scope | Required | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_MIXPANEL_TOKEN` | client | yes | Project token. Public by design. |
| `NEXT_PUBLIC_MIXPANEL_API_HOST` | client | no | Residency host. Preferred control. |
| `NEXT_PUBLIC_MIXPANEL_RESIDENCY` | client | no | Legacy `US`/`EU`/`IN` shorthand, used when API_HOST is unset. |
| `MIXPANEL_TOKEN` | server | no | Server ingestion; falls back to the public token. |
| `MIXPANEL_API_HOST` | server | no | Server ingestion host. |

No service-account secret is used, and none belongs in a `NEXT_PUBLIC_*` variable.
