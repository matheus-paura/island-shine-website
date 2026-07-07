# Island Shine Property Services — Website

Production-grade lead-generation site for [islandshine.ca](https://islandshine.ca):
window cleaning, pressure washing & soft washing in Victoria, BC.
Built with Next.js (App Router) + TypeScript + Tailwind CSS.

## Quick start

```bash
nvm use          # Node 22 (see .nvmrc)
npm install
cp .env.example .env.local   # then fill in what you have (all optional for dev)
npm run dev      # http://localhost:3000
```

`npm run build` must pass with zero errors before deploying. The site is a fully
static export (`output: "export"` in `next.config.ts` — there's no server-side
code; the quote form posts straight from the browser to the n8n webhook), so it
deploys to Cloudflare Pages, Vercel, Netlify, or any static host.

## Deploying to Cloudflare Pages

**Option A — connect a Git repo (recommended, auto-deploys on push):**

1. Push this repo to GitHub/GitLab.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repo. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
4. Add the environment variables from `.env.example` under **Settings → Environment variables** (at minimum `NEXT_PUBLIC_FORM_ENDPOINT`).
5. Deploy. Add the `islandshine.ca` custom domain under **Custom domains** once it's live.

**Option B — deploy directly from the CLI (no Git needed):**

```bash
npm run deploy:cloudflare
```

This runs `next build` then `wrangler pages deploy out --project-name=island-shine`.
The first run opens a browser tab to log into your Cloudflare account and asks
you to confirm creating the `island-shine` Pages project — after that, rerunning
the same command ships updates.

## Editing content (no code knowledge needed beyond the file)

Everything user-facing lives in two places:

| What | File |
|------|------|
| Business name, phone, email, hours, rating, social links | [`config/site.ts`](config/site.ts) |
| The 3 services (names, descriptions, bullets) | [`content/services.ts`](content/services.ts) |
| Reviews shown on the site | [`content/reviews.ts`](content/reviews.ts) |
| FAQ questions & answers | [`content/faqs.ts`](content/faqs.ts) |
| Service areas + per-city copy | [`content/service-areas.ts`](content/service-areas.ts) |

**Never hardcode the phone number or address anywhere else** — every page reads
from `config/site.ts`, which keeps NAP (Name/Address/Phone) consistent for
local SEO. Keep it identical to the Google Business Profile.

Search the repo for `TODO` to find every placeholder that needs the owner's
real data (reviews, Google review link, photos, WhatsApp number…).

### Replacing placeholder images

All images in `public/images/` are generated illustrations (via
`npm run placeholders`). Before launch, replace them with real photos:

- `hero.jpg` — a strong shot of a clean Victoria home (this is the LCP image; keep it ≤ 300 KB)
- `before.jpg` / `after.jpg` — one real job, **identical framing** (the interactive slider)
- `pair-{1,2,3}-{before,after}.jpg` — three more real jobs (thumbnails)
- `og-image.jpg` — 1200×630 branded share image

Real photos only in the gallery — never stock.

## Turning on analytics

The tracking layer ships dark: with no env vars set, **no analytics code loads
at all**. Set an ID in your host's environment settings and redeploy — no code
changes needed.

| Env var | Tool | Notes |
|---------|------|-------|
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager | **Recommended path.** Set only this, then add GA4/Ads/Meta tags inside GTM's UI — no redeploys ever again. |
| `NEXT_PUBLIC_GA4_ID` | GA4 direct | Only loads when GTM is not set. |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` + `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | Google Ads conversion | Fires on successful quote submissions. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta (Facebook) Pixel | Only loads directly when GTM is not set. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Quote form target | Formspree / Web3Forms URL or an n8n webhook. Required in production for the form to work. |

Details:

- **Consent Mode v2** defaults everything to `denied`; the cookie banner's
  Accept button flips it to `granted` (PIPEDA-friendly). Declining keeps all
  pixels dormant.
- Events fired (see [`lib/analytics.ts`](lib/analytics.ts)): `phone_click`,
  `whatsapp_click`, `cta_click`, `form_start`, and `generate_lead` (the primary
  conversion — map this one in Google Ads / Meta).
- In GTM, create triggers on those dataLayer event names.

## Local SEO notes for the owner

The biggest local-lead driver is usually the **Google Business Profile**, not
the website. This site is built to support it (fast, LocalBusiness/Service/FAQ
structured data, one page per service area) — but make sure the profile itself
is fully set up, verified, and collecting reviews. Once real reviews exist,
paste the review link into `trust.googleReviewsUrl` in `config/site.ts`; that
also switches on the `aggregateRating` structured data.

Also flagged in config: the current phone number (289) is an Ontario area code.
A local 250/236/778 number would build more trust with Victoria customers.

## Architecture

- `app/` — routes: home, `/service-areas` (+ one static page per city),
  `/privacy`, dynamic `sitemap.xml` / `robots.txt` / manifest.
- `components/` — `layout/` (header, footer, sticky call bar), `sections/`
  (home page sections), `forms/QuoteForm`, `analytics/`, `seo/`, `ui/` primitives.
- `lib/` — `analytics.ts` (tracking), `schema.ts` (JSON-LD builders).
- Design tokens live in [`tailwind.config.ts`](tailwind.config.ts) — navy
  surfaces, one orange action color, sand backgrounds. No raw hex in components.
