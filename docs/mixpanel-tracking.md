# Mixpanel Tracking

## What Was Installed

- `mixpanel-browser`
- A browser-only Mixpanel utility in `lib/mixpanel.ts`
- A route, CTA, link, form, and conversion provider in `components/MixpanelProvider.tsx`

## Environment Variable

Set this in local development and Vercel:

```bash
NEXT_PUBLIC_MIXPANEL_TOKEN=PASTE_MIXPANEL_PROJECT_TOKEN_HERE
```

The site does not crash if the token is missing. Tracking simply no-ops.

## Files Changed

- `app/layout.tsx`
- `app/assessment/page.tsx`
- `app/consultation/page.tsx`
- `components/CapstonesInteractive.tsx`
- `components/FAQInteractive.tsx`
- `components/MixpanelProvider.tsx`
- `components/Pricing.tsx`
- `lib/mixpanel.ts`
- `lib/tracking-events.ts`
- `package.json`
- `package-lock.json`

## Events Implemented

- `Page Viewed`
- `Navigation Link Clicked`
- `Career Assessment Started`
- `Career Assessment Submitted`
- `Consultation Clicked`
- `Consultation Submitted`
- `Application Started`
- `Application Submitted`
- `Waitlist Joined`
- `Contact Form Submitted`
- `Accelerator Viewed`
- `Program Viewed`
- `Program Interest Clicked`
- `Pathway Viewed`
- `Pathway CTA Clicked`
- `Pricing Viewed`
- `Payment Intent Clicked`
- `Checkout Started`
- `Checkout Completed`
- `WhatsApp Clicked`
- `Email Clicked`
- `LinkedIn Clicked`
- `Resource Viewed`
- `Download Clicked`
- `FAQ Expanded`
- `Form Started`
- `Form Submitted`
- `Form Submission Failed`

## Naming Convention

Events use title case and describe a user action in the past tense where possible:

- Object + Action: `Page Viewed`, `FAQ Expanded`
- Intent + Action: `Consultation Clicked`, `Payment Intent Clicked`
- Conversion + Outcome: `Career Assessment Submitted`, `Waitlist Joined`

## Default Properties

Every event includes:

- `app_name`
- `website_url`
- `environment`
- `page_url`
- `page_path`
- `page_title`
- `referrer`
- `timestamp`

Page views also include:

- `query_string`
- `device_type`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

CTA and link events include relevant context when available:

- `cta_text`
- `source_page`
- `destination_url`
- `section_name`
- `program_name`
- `pathway_name`
- `form_name`
- `button_location`
- `user_intent`

## Attribution

UTM values are captured from the landing URL and persisted in `localStorage`:

- `initial_utm_source`
- `initial_utm_medium`
- `initial_utm_campaign`
- `initial_utm_content`
- `initial_utm_term`
- `initial_referrer`
- `landing_page`

Later events include this attribution even after the visitor navigates away from the landing page.

## Privacy Rules

Do not send personal data to Mixpanel.

Do not track:

- Phone numbers
- Email addresses entered by users
- Full names
- CV or resume content
- Messages typed by users
- Payment card details
- Private notes

Allowed form properties:

- `form_name`
- `source_page`
- `number_of_fields`
- `submission_status`
- `selected_program`
- `selected_pathway`

The current implementation avoids sending lead names, email addresses, phone numbers, message bodies, or payment details.

## How To Test In Mixpanel Live View

1. In Mixpanel, open the target project.
2. Go to **Events > Live View**.
3. Visit the site with UTM parameters, for example:

```text
https://upthrust-site.vercel.app/?utm_source=test&utm_medium=qa&utm_campaign=mixpanel_setup
```

4. Navigate between pages and click CTAs.
5. Confirm `Page Viewed`, `Navigation Link Clicked`, and the matching CTA events appear.
6. Start the assessment and submit it without entering sensitive test data.
7. Confirm `Form Started`, `Form Submitted`, `Career Assessment Started`, and `Career Assessment Submitted` appear.

## Adding Future Events

Use the shared helper:

```ts
import { trackEvent } from '@/lib/mixpanel';
import { TRACKING_EVENTS } from '@/lib/tracking-events';

trackEvent(TRACKING_EVENTS.programInterestClicked, {
  cta_text: 'Example CTA',
  source_page: window.location.pathname,
  section_name: 'Example Section',
  program_name: 'Career Capability Accelerator',
});
```

Keep properties descriptive, non-sensitive, and consistent with the existing names.
