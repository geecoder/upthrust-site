# Upthrust — Career Capability Platform Website

Next.js 14 (App Router) marketing site for Upthrust. Production-ready. Tally forms wired up. Payment link slots ready to fill.

## Quick start (5 minutes)

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's already wired up

- ✅ All 12 pages (homepage, accelerator, 2 pathway pages, assessment, consultation, about, FAQ, 4 thank-you pages)
- ✅ Working assessment engine with personalised result page
- ✅ Tally form embeds (consultation, waitlist, design cohort 2, silent assessment submission)
- ✅ Regional pricing component with country selector
- ✅ SEO: sitemap, robots.txt, dynamic Open Graph image, favicon
- ✅ Security headers via vercel.json
- ✅ URL redirects (/home → /, /program → /accelerator, /pm and /ba shortcuts)
- ✅ 404 not-found page
- ✅ Mobile-responsive throughout

## What needs your hand before going live

### 1. Set your Cohort 1 prices in `lib/config.ts`

Open `lib/config.ts`. Find the `PRICING` object. Default values are my recommended Cohort 1 prices:
- Nigeria Standard: ₦350,000, Premium: ₦600,000
- UK Standard: £750, Premium: £1,250
- Canada Standard: CAD 1,200, Premium: CAD 2,000
- Australia Standard: AUD 1,250, Premium: AUD 2,000

Change them if needed.

### 2. Add your payment links to `lib/config.ts`

Find the `PAYMENT_LINKS` object. For each region, paste in the Paystack (Nigeria/Africa) or Stripe (UK/Canada/Australia) payment links you create.

**Until you fill these in**, all enrollment buttons fall back to `/consultation`. The site still works — visitors just route through a consultation instead of self-checkout.

When you create real payment links:
```ts
NG: {
  standardFull: 'https://paystack.com/pay/your-link-here',
  standardInstallment: 'https://paystack.com/pay/your-other-link',
  premiumFull: 'https://paystack.com/pay/...',
  premiumInstallment: 'https://paystack.com/pay/...',
},
```

### 3. Update SITE.url and SITE.email in `lib/config.ts`

When you connect your custom domain, update `SITE.url` from `https://upthrust-site.vercel.app` to your real domain.

Update `SITE.email` if it's not `hello@upthrust.io`.

### 4. Set Tally redirect URLs

In each Tally form's settings, set the post-submission redirect to:
- Consultation form → `https://YOUR-DOMAIN/thank-you/consultation`
- Waitlist form → `https://YOUR-DOMAIN/thank-you/waitlist`
- Design Cohort 2 form → `https://YOUR-DOMAIN/thank-you/design-cohort-2`

## Deploying to Vercel

### One-time setup

1. Push this project to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial Upthrust website"
   # create a repo on github.com then:
   git remote add origin https://github.com/YOUR-USERNAME/upthrust-site.git
   git branch -M main
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new), import your GitHub repo, accept all defaults, click Deploy.

3. In ~2 minutes you'll have a live URL like `upthrust-site.vercel.app`.

### Connecting a custom domain (later)

1. In Vercel → your project → Settings → Domains → Add domain
2. Vercel gives you DNS records to add at your domain registrar
3. Add them; SSL auto-provisions in a few minutes

## Editing copy

All page copy lives inside each page's `.tsx` file. Search for the text you want to change, edit, save, commit, push. Vercel auto-deploys in ~60 seconds.

## Adding new pages

To add a page (e.g. `/success-stories`):
1. Create `app/success-stories/page.tsx`
2. Export a default React component
3. Add a link to it in `components/Header.tsx` and/or `components/Footer.tsx`
4. Push to git — Vercel auto-deploys

## Project structure

```
upthrust-site/
├── app/
│   ├── about/page.tsx
│   ├── accelerator/page.tsx
│   ├── assessment/page.tsx              # custom assessment engine
│   ├── consultation/page.tsx            # Tally embed
│   ├── faq/page.tsx
│   ├── pathway-business-analysis/page.tsx
│   ├── pathway-product-management/page.tsx
│   ├── thank-you/
│   │   ├── assessment-complete/page.tsx
│   │   ├── consultation/page.tsx
│   │   ├── design-cohort-2/page.tsx
│   │   └── waitlist/page.tsx
│   ├── globals.css                      # design system (CSS vars)
│   ├── layout.tsx                       # root layout + metadata
│   ├── not-found.tsx                    # 404 page
│   ├── opengraph-image.tsx              # auto-generated OG image
│   ├── page.tsx                         # homepage
│   ├── robots.ts                        # robots.txt generator
│   └── sitemap.ts                       # sitemap.xml generator
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── Pricing.tsx                      # regional pricing with checkout
├── lib/
│   ├── config.ts                        # Tally IDs, pricing, payment links — EDIT ME
│   ├── scenarios.ts                     # 12 assessment scenarios
│   ├── scoring.ts                       # assessment scoring engine
│   └── useRegion.ts                     # geo-detection hook
├── public/
│   ├── favicon.svg
│   └── images/
│       └── founder-genesis.jpg
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
└── vercel.json
```

## Common edits

**Change a price?** → `lib/config.ts` → `PRICING` object
**Add a Paystack link?** → `lib/config.ts` → `PAYMENT_LINKS` object
**Change the brand colors?** → `app/globals.css` → `:root` variables
**Update the founder photo?** → Replace `public/images/founder-genesis.jpg`
**Add a FAQ?** → `app/faq/page.tsx` → `FAQS` array

## What's NOT included yet

- Real payment links (you create these in Paystack/Stripe and paste into `lib/config.ts`)
- Analytics (recommend adding Plausible.io or Vercel Analytics later)
- Email auto-responses (set these up in Tally's form settings)
- Custom domain (use Vercel's free domain to start)

---

Built to ship today. Designed to be edited by hand.
