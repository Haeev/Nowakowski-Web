# Nowakowski Web — Agency Website

Official website for **Nowakowski Web**, a solo web agency building sites for local tradespeople and SMBs in Moselle and Grand Est, France. Operated by Loïc Nowakowski (Stiring-Wendel, 57350).

**Production:** [nowakowski-web.fr](https://nowakowski-web.fr)

## Open-source showcase projects

Demo websites for tradespeople, featured on the agency site. Fictional projects (no real client data) — source code is public:

| Project | Live demo | Source |
|---------|-----------|--------|
| **Plomberie Müller** (Sarreguemines) | [plomberie-muller-template.vercel.app](https://plomberie-muller-template.vercel.app) | [Haeev/plomberie-muller-template](https://github.com/Haeev/plomberie-muller-template) |
| **Électricité Schmitt** (Forbach) | [electricite-schmitt.vercel.app](https://electricite-schmitt.vercel.app) | [Haeev/electricite-schmitt](https://github.com/Haeev/electricite-schmitt) |

## Site features

### Homepage (landing)

- Service overview (showcase sites, hosting, content & SEO)
- Key differentiators (GDPR, accessibility, EU hosting, 2-week delivery, etc.)
- 4-step process, pricing grids, and subscription plans
- Client showcase (MDX + screenshots)
- Structured FAQ (schema.org)
- Contact form (email via Resend) + WhatsApp
- **Free audit widget** (floating): enter a URL → PageSpeed analysis

### Free audit (`/audit-gratuit`)

Public website analysis tool powered by **Google PageSpeed Insights**:

- Performance, SEO, Accessibility, and Best Practices scores (mobile + desktop)
- Priorities explained in plain French (non-technical)
- Category breakdown with recommendations
- **Re-run analysis** button to force a fresh report (same URL)
- `run` URL parameter to avoid showing a stale report on revisit

### Blog (`/blog`)

- Articles managed in **Sanity CMS**
- Embedded Studio at `/studio`
- Portable Text, optimized images, per-article SEO metadata

### Institutional pages

- `/about` — Loïc Nowakowski profile
- `/mentions-legales`, `/cgv`, `/politique-confidentialite`, `/accessibilite`

### SEO & compliance

- Open Graph / Twitter metadata, JSON-LD (`ProfessionalService`, `FAQPage`, etc.)
- `sitemap.xml`, `robots.txt`, `llms.txt` (GEO)
- **PREVIEW** banner + `noindex` on Vercel preview deployments
- Analytics: Plausible (production) + Google Tag Manager

### UX & accessibility

- Light / dark theme (`next-themes`, dark by default)
- Framer Motion animations, skip link, visible focus states
- Client-side obfuscated email, floating call button (mobile)

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + `cn()` (`clsx` + `tailwind-merge`) |
| CMS | Sanity v3 (`/studio`) |
| Static content | MDX + gray-matter (showcase projects) |
| Email | Resend (`/api/contact`) |
| Audit | Google PageSpeed Insights API (`/api/audit`) |
| Hosting | Vercel (region `fra1`) |

## Run locally

```bash
npm install
cp .env.example .env.local
# Set at minimum: RESEND_*, SANITY_*, PAGESPEED_API_KEY for the audit tool
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production build

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx                 ← global SEO, GTM, Plausible, AuditWidget
  page.tsx                   ← homepage
  audit-gratuit/page.tsx     ← audit results page
  api/
    contact/route.ts         ← contact form → Resend
    audit/route.ts           ← PageSpeed mobile + desktop
  blog/, about/, legal pages…
  studio/[[...tool]]/        ← Sanity Studio
components/
  audit/                     ← widget, form, PageSpeed results
  ui/                        ← primitives & atoms
  layout/                    ← Nav, Footer
  sections/                  ← homepage sections
  blog/                      ← PortableTextComponents (Sanity)
lib/
  site-config.ts             ← NAP, contacts, domain
  audit/                     ← types, PageSpeed, French translations
  content/                   ← marketing data (pricing, FAQ…)
  realisations.ts            ← MDX showcase reader
sanity/                      ← schemas & GROQ queries
content/realisations/        ← project case studies (.mdx)
middleware.ts                ← X-Robots-Tag noindex on preview/dev
public/
  favicon.ico, icon-192.png, icon-512.png
  og-image.jpg
  manifest.json
  llms.txt
  _brand-assets/             ← brand logos (not served directly)
  realisations/              ← showcase screenshots
```

## Vercel environments

| Env | Branch | URL | Indexing | Plausible |
|-----|--------|-----|----------|-----------|
| **Production** | `main` | `nowakowski-web.fr` | index | yes |
| **Preview** | `feature/*` | `*.vercel.app` | noindex | no |
| **Development** | local | `localhost:3000` | noindex | no |

### Git workflow

1. `git checkout -b feature/<topic>`
2. Push → automatic Vercel preview
3. Test (red PREVIEW banner visible)
4. Merge to `main` → production on custom domain

### Environment variables

See [`.env.example`](./.env.example). On Vercel, configure per environment:

| Variable | Production | Preview | Development |
|----------|------------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://nowakowski-web.fr` | (empty) | `http://localhost:3000` |
| `RESEND_API_KEY` | prod key | test key | test key |
| `CONTACT_EMAIL_FROM` / `TO` | prod | test | test |
| `NEXT_PUBLIC_SANITY_*` | prod project | same | same |
| `PAGESPEED_API_KEY` | Google Cloud key | same | same |
| `GOOGLE_SITE_VERIFICATION` | GSC code | empty | empty |

**Audit tool:** enable the [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started) on a Google Cloud project and create an API key restricted to that API.

## Add a showcase project

1. Create `content/realisations/<slug>.mdx` with frontmatter (`title`, `secteur`, `ville`, `url`, `image`, `couleur`, `date`, `description`)
2. Add image to `public/realisations/`
3. Vercel preview → merge to `main`

## Brand identity

- Primary color: `#AB19F5` (purple, Tailwind token `brand`)
- Accent: `#F51934` (red, Tailwind token `brand-red`)
- Headings: **Poppins** 600/700/800
- Body: **Inter** 400/500/600
- Official SVG logos in `public/_brand-assets/` (not served directly by the site)
