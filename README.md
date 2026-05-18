# Nowakowski Web : site vitrine

Site officiel de **Nowakowski Web**, agence solo de création de sites web pour artisans et PME en Moselle et Grand Est, opérée par Loïc Nowakowski (Stiring-Wendel, 57350).

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + helper `cn()` (`clsx` + `tailwind-merge`)
- **next-themes** : dark/light avec dark par défaut, persisté en `localStorage`
- **next/font/google** : `Poppins` (titres) + `Inter` (body)
- **lucide-react** : icônes
- **framer-motion** : animations
- **Sanity** : blog (Studio embarqué sur `/studio`)
- **MDX + gray-matter** : réalisations
- **Resend** : envoi du formulaire de contact
- **Plausible** : analytics (production uniquement)
- Déploiement : **Vercel**

## Démarrer

```bash
npm install
cp .env.example .env.local
# remplir les variables nécessaires
npm run dev
```

Ouvrir http://localhost:3000

## Build production

```bash
npm run build
npm run start
```

## Structure

```
app/
  layout.tsx              ← métadonnées SEO + Providers + fonts + PreviewBanner
  page.tsx                ← homepage (assemble les sections)
  globals.css             ← reset + tokens CSS du thème
  providers.tsx           ← ThemeProvider next-themes
  sitemap.ts              ← sitemap.xml
  robots.ts               ← robots.txt
  api/contact/route.ts    ← endpoint Resend pour le formulaire
content/
  realisations/           ← fichiers MDX des réalisations clients
lib/
  site-config.ts          ← config site (nom, contacts, adresse)
  env.ts                  ← helpers VERCEL_ENV / SITE_URL
  cn.ts                   ← helper Tailwind (clsx + tailwind-merge)
  realisations.ts         ← lecture des MDX (frontmatter)
  content/                ← données extraites des composants
    services.ts, pricing.ts, extras.ts, pillars.ts,
    why-items.ts, trust-badges.ts, navigation.ts, faq.ts
components/
  ui/                     ← primitives & atomes
    Button, Container, Section, SectionHeading, IconBubble,
    SectionLabel, Logo, ThemeToggle, ObfuscatedEmail,
    FloatingCallButton, RealisationCard, animations,
    PreviewBanner
  layout/                 ← Nav, Footer
  sections/               ← sections de la homepage
  blog/                   ← PortableTextComponents (Sanity)
sanity/                   ← config Sanity Studio
middleware.ts             ← X-Robots-Tag noindex sur preview/dev
public/
  logo-primary.svg, logo-light.svg, monogram-icon.svg
  llms.txt                ← pour les crawlers IA (GEO)
  realisations/           ← images des réalisations clients
```

## Environnements Vercel

Le projet utilise les **trois environnements Vercel standards** :

| Env | Branche | URL | Indexation | Plausible |
|---|---|---|---|---|
| **Production** | `main` | `nowakowski-web.fr` | `index, follow` | activé |
| **Preview** | `feature/*`, autres | `*.vercel.app` (par déploiement) | `noindex` (middleware + meta + `X-Robots-Tag`) | désactivé |
| **Development** | local | `localhost:3000` | `noindex` | désactivé |

### Workflow

1. Créer une branche : `git checkout -b feature/<sujet>`
2. Pousser : Vercel déploie automatiquement une preview, l'URL apparaît dans la PR.
3. Tester l'URL preview (bandeau rouge `PREVIEW` visible en haut de page).
4. Merger dans `main` → déploiement automatique en production sur le domaine.

### Variables d'environnement

Voir [`.env.example`](./.env.example) pour la liste exhaustive. Configurer chaque variable dans Vercel pour les bons environnements (Production / Preview / Development) :

| Variable | Production | Preview | Development |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://nowakowski-web.fr` | (vide → utilise `VERCEL_URL`) | `http://localhost:3000` |
| `RESEND_API_KEY` | clé prod | clé test (idéalement séparée) | clé test |
| `CONTACT_EMAIL_FROM` | `contact@nowakowski-web.fr` | `contact+preview@…` | identique preview |
| `CONTACT_EMAIL_TO` | adresse réelle | adresse de test | identique preview |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | identique partout | identique | identique |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | `staging` (si dispo) | `staging` |
| `GOOGLE_SITE_VERIFICATION` | code GSC | (vide) | (vide) |

## Ajouter une réalisation client

1. Créer `content/realisations/<slug>.mdx`
2. Remplir le frontmatter :
   ```yaml
   ---
   title: "Nom du client"
   secteur: "Plombier"
   ville: "Forbach"
   url: "https://site-client.fr"
   image: "/realisations/<slug>.jpg"
   couleur: "#1A3A5C"
   date: "2026-05-01"
   description: "Courte description SEO du projet."
   ---
   ```
3. Ajouter l'image dans `public/realisations/`
4. Push sur une branche `feature/*` → preview Vercel pour valider
5. Merger sur `main` → mise en ligne automatique

## SEO

- `metadataBase` dynamique selon l'environnement (Production → domaine, Preview → URL Vercel)
- Métadonnées Open Graph + Twitter dans `app/layout.tsx`
- Schema JSON-LD (`ProfessionalService` + `WebSite` + `FAQPage`) dans `components/sections/JsonLd.tsx`
- `sitemap.xml` et `robots.txt` générés via App Router (production uniquement)
- `noindex` sur previews via 3 niveaux (meta tag, `X-Robots-Tag` middleware, `robots` Next.js)
- `public/llms.txt` pour les crawlers IA (GEO 2026)
- NAP cohérent (Nom · Adresse · Téléphone) via `lib/site-config.ts`

### Avant la mise en ligne

- [ ] Renseigner `GOOGLE_SITE_VERIFICATION` en production
- [ ] Créer une vraie image OG `/public/og-image.jpg` (1200×630)
- [ ] Vérifier le formulaire de contact en preview avant prod
- [ ] Soumettre le sitemap dans Google Search Console

## Identité visuelle

- Couleur principale : `#AB19F5` (violet, token Tailwind `brand`)
- Accent : `#F51934` (rouge, token Tailwind `brand-red`)
- Police titres : **Poppins** 600/700/800
- Police body : **Inter** 400/500/600
- Logo SVG officiel dans `public/logo-primary.svg` et `public/logo-light.svg`
