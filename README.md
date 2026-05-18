# Upthrust — Career Capability Platform Website

The marketing website for Upthrust, built with Next.js 14 (App Router).

## Tech stack

- **Next.js 14** with App Router
- **TypeScript**
- **No CSS framework** — design system in `app/globals.css` using CSS variables
- **Fonts:** Fraunces (serif headlines) + Geist (body), loaded from Google Fonts
- **Forms:** Tally embeds (free, no code)
- **Deployment target:** Vercel

## Pages built

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/accelerator` | The Career Capability Accelerator overview |
| `/pathway-product-management` | Product Management pathway page |
| `/pathway-business-analysis` | Business Analysis pathway page |
| `/assessment` | Career Assessment (custom-built scoring engine + result page) |
| `/consultation` | Book a consultation (Tally form placeholder) |
| `/about` | About Upthrust |
| `/faq` | Frequently asked questions |
| `/thank-you/consultation` | Post-consultation-booking confirmation |
| `/thank-you/waitlist` | Post-waitlist-signup confirmation |
| `/thank-you/design-cohort-2` | Post-Design-waitlist confirmation |
| `/thank-you/assessment-complete` | Fallback assessment completion page |

## Local development — first time setup

### Prerequisites

You need:
- **Node.js 18.17+** installed ([download here](https://nodejs.org/))
- **A code editor** (we recommend [VS Code](https://code.visualstudio.com/))
- **Git** installed (comes with macOS and most Linux distros; on Windows install [Git for Windows](https://git-scm.com/download/win))
- **A GitHub account** (for deployment)
- **A Vercel account** (free — sign up at [vercel.com](https://vercel.com))

### Steps

1. **Open the project folder in VS Code.**

2. **Install dependencies.** Open the integrated terminal in VS Code (Terminal → New Terminal) and run:

   ```bash
   npm install
   ```

   This downloads Next.js, React, and TypeScript. It takes 2–3 minutes the first time.

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   Then open [http://localhost:3000](http://localhost:3000) in your browser. You'll see the homepage. Edit any file in `app/` and the page hot-reloads.

## Deploying to Vercel — production live in ~15 minutes

### Step 1: Push to GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "Initial Upthrust website build"
```

Create a new repository on [github.com](https://github.com) (private is fine) and follow GitHub's instructions to push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/upthrust-site.git
git branch -M main
git push -u origin main
```

### Step 2: Connect Vercel to GitHub

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository** and authorize Vercel to access GitHub
3. Select your `upthrust-site` repository
4. Vercel auto-detects Next.js — accept all defaults
5. Click **Deploy**

Within 2 minutes you'll have a live URL like `upthrust-site.vercel.app`.

### Step 3: Connect your custom domain

1. In Vercel, go to your project → **Settings → Domains**
2. Add your domain (e.g. `upthrust.io` or `upthrustdigital.com`)
3. Vercel will give you DNS records to add at your domain registrar
4. Add them, wait a few minutes for propagation
5. Vercel auto-provisions SSL

## Forms setup — Tally

The site references three Tally forms that need to be created:

1. **Consultation Booking** — embedded on `/consultation`
2. **General Waitlist** — used as a CTA or embedded where appropriate
3. **Design Cohort 2 Waitlist** — for prospects whose assessment routes them to Design

### How to set up a Tally form

1. Sign up at [tally.so](https://tally.so) (free)
2. Create a new form
3. Add the fields specified in the consultation page or the Notion specs (Page 65, 66, 64)
4. Set the redirect URL after submission to the relevant thank-you page (e.g. `https://upthrust.io/thank-you/consultation`)
5. Get the embed code or form ID from Tally's share menu
6. Find the `[ Tally Form Embed Placeholder ]` section in `app/consultation/page.tsx` and replace with your iframe code

### Sending assessment results

The assessment currently does NOT send data anywhere. To enable lead capture from the assessment:

1. In `app/assessment/page.tsx`, find the `handleAnswer` function and the `// TODO: post leadData + answers` comment
2. Replace with a POST request to either:
   - **Tally** (create a form with hidden fields, POST to its endpoint)
   - **A Vercel serverless function** that emails you the result and saves to a database
   - **A direct integration** with Google Sheets via a webhook service like Zapier

The simplest is a Tally form with hidden fields — same approach as the consultation form.

## Founder photo

Located at `public/images/founder-genesis.jpg`. To swap it, just replace the file with another image of the same name. Recommended specs:
- 4:5 aspect ratio (portrait)
- At least 800px wide
- JPEG or WebP

## Brand customisation

All brand tokens are in `app/globals.css` at the top under `:root`:

```css
--ink: #0F1A2E;             /* deep navy — primary text */
--paper: #FAF7F1;           /* warm off-white background */
--amber: #C5743A;           /* accent */
--moss: #4F6A4A;            /* secondary, for "open" badges */
```

Change these values and the whole site re-themes.

## Adding new pages

To add a page (e.g. `/success-stories`):

1. Create `app/success-stories/page.tsx`
2. Export a default React component
3. Add a link to it in `components/Header.tsx` and/or `components/Footer.tsx`
4. Push to git — Vercel auto-deploys

## Editing copy

All page copy lives inside each page's `.tsx` file. Search for the text you want to change, edit, save, commit, push. Vercel rebuilds and deploys in ~60 seconds.

## What's NOT included yet

- Real Tally form embeds (placeholders only — you create the forms and paste IDs)
- Email autoresponder integration (set up in Tally, or via Resend/Postmark via a Vercel function)
- Analytics (add Plausible or Google Analytics via the `app/layout.tsx`)
- A learner portal — that's a separate project after Cohort 1 launches
- A Success Stories page — intentionally not built yet, will fill with real Cohort 1 graduates

## Maintenance

- Keep dependencies updated: `npm update` periodically
- Monitor Vercel deploys at vercel.com → your project → Deployments
- Form submissions arrive in your Tally dashboard

---

Built with care. Designed to be edited.
