# Nowakowski Web : site vitrine

Site officiel de **Nowakowski Web**, agence solo de création de sites web pour artisans et PME en Moselle et Grand Est, opérée par Loïc Nowakowski (Stiring-Wendel, 57350).

**Production :** [nowakowski-web.fr](https://nowakowski-web.fr)

## Fonctionnalités du site

### Page d'accueil (landing)

- Présentation des services (site vitrine, hébergement, contenu & SEO)
- Arguments différenciants (RGPD, RGAA, hébergement EU, livraison 2 semaines, etc.)
- Processus en 4 étapes, grilles tarifaires et formules d'abonnement
- Réalisations clients (MDX + captures)
- FAQ structurée (schema.org)
- Formulaire de contact (email via Resend) + WhatsApp
- **Widget d'audit gratuit** (flottant) : saisie d'une URL → analyse PageSpeed

### Audit gratuit (`/audit-gratuit`)

Outil public d'analyse de site existant, alimenté par **Google PageSpeed Insights** :

- Scores Performance, SEO, Accessibilité, Bonnes pratiques (mobile + desktop)
- Priorités expliquées en français (non techniques)
- Détail par catégorie avec recommandations
- Bouton **Relancer l'analyse** pour forcer une nouvelle analyse (même URL)
- Paramètre `run` dans l'URL pour éviter l'affichage d'un ancien rapport lors d'une nouvelle visite

### Blog (`/blog`)

- Articles gérés dans **Sanity CMS**
- Studio embarqué sur `/studio`
- Portable Text, images optimisées, métadonnées SEO par article

### Pages institutionnelles

- `/about` — présentation de Loïc Nowakowski
- `/mentions-legales`, `/cgv`, `/politique-confidentialite`, `/accessibilite`

### SEO & conformité

- Métadonnées Open Graph / Twitter, JSON-LD (`ProfessionalService`, `FAQPage`, etc.)
- `sitemap.xml`, `robots.txt`, `llms.txt` (GEO)
- Bandeau **PREVIEW** + `noindex` sur les déploiements Vercel preview
- Analytics : Plausible (production) + Google Tag Manager

### UX & accessibilité

- Thème clair / sombre (`next-themes`, dark par défaut)
- Animations Framer Motion, skip link, focus visible
- Email obfusqué côté client, bouton d'appel flottant (mobile)

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styles | Tailwind CSS + `cn()` (`clsx` + `tailwind-merge`) |
| CMS | Sanity v3 (`/studio`) |
| Contenu statique | MDX + gray-matter (réalisations) |
| Email | Resend (`/api/contact`) |
| Audit | Google PageSpeed Insights API (`/api/audit`) |
| Déploiement | Vercel (région `fra1`) |

## Démarrer en local

```bash
npm install
cp .env.example .env.local
# Renseigner au minimum : RESEND_*, SANITY_*, PAGESPEED_API_KEY pour l'audit
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Build production

```bash
npm run build
npm run start
```

## Structure du projet

```
app/
  layout.tsx                 ← SEO global, GTM, Plausible, AuditWidget
  page.tsx                   ← homepage
  audit-gratuit/page.tsx     ← page résultats d'audit
  api/
    contact/route.ts         ← formulaire → Resend
    audit/route.ts           ← PageSpeed mobile + desktop
  blog/, about/, pages légales…
  studio/[[...tool]]/        ← Sanity Studio
components/
  audit/                  ← widget, formulaire, résultats PageSpeed
  ui/                     ← primitives & atomes
    Button, Container, Section, SectionHeading, IconBubble,
    SectionLabel, Logo, ThemeToggle, ObfuscatedEmail,
    FloatingCallButton, RealisationCard, animations,
    PreviewBanner
  layout/                 ← Nav, Footer
  sections/               ← sections de la homepage
  blog/                   ← PortableTextComponents (Sanity)
lib/
  site-config.ts          ← NAP, contacts, domaine
  audit/                  ← types, PageSpeed, traductions FR
  content/                ← données marketing (tarifs, FAQ…)
  realisations.ts         ← lecture MDX réalisations
sanity/                   ← schémas & requêtes GROQ
content/realisations/     ← fiches projets (.mdx)
middleware.ts             ← X-Robots-Tag noindex sur preview/dev
public/
  favicon.ico, icon-192.png, icon-512.png ← favicons & PWA icons
  og-image.jpg            ← Open Graph (1200×630)
  linkedin-banner-nowakowski-web.svg ← bannière LinkedIn (page about)
  manifest.json           ← manifest PWA
  llms.txt                ← pour les crawlers IA (GEO)
  _brand-assets/          ← logos & assets d'identité (non servis sur le site)
  realisations/           ← screenshots des réalisations clients
```

## Environnements Vercel

| Env | Branche | URL | Indexation | Plausible |
|-----|---------|-----|------------|-----------|
| **Production** | `main` | `nowakowski-web.fr` | index | oui |
| **Preview** | `feature/*` | `*.vercel.app` | noindex | non |
| **Development** | local | `localhost:3000` | noindex | non |

### Workflow Git

1. `git checkout -b feature/<sujet>`
2. Push → preview Vercel automatique
3. Tester (bandeau rouge PREVIEW visible)
4. Merge `main` → production sur le domaine

### Variables d'environnement

Voir [`.env.example`](./.env.example). Sur Vercel, configurer par environnement :

| Variable | Production | Preview | Development |
|----------|------------|---------|---------------|
| `NEXT_PUBLIC_SITE_URL` | `https://nowakowski-web.fr` | (vide) | `http://localhost:3000` |
| `RESEND_API_KEY` | clé prod | clé test | clé test |
| `CONTACT_EMAIL_FROM` / `TO` | prod | test | test |
| `NEXT_PUBLIC_SANITY_*` | projet prod | idem | idem |
| `PAGESPEED_API_KEY` | clé Google Cloud | idem | idem |
| `GOOGLE_SITE_VERIFICATION` | code GSC | vide | vide |

**Audit :** activer [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started) sur un projet Google Cloud et créer une clé API restreinte à cette API.

## Ajouter une réalisation

1. Créer `content/realisations/<slug>.mdx` avec frontmatter (`title`, `secteur`, `ville`, `url`, `image`, `couleur`, `date`, `description`)
2. Image dans `public/realisations/`
3. Preview Vercel → merge `main`

## Identité visuelle

- Couleur principale : `#AB19F5` (violet, token Tailwind `brand`)
- Accent : `#F51934` (rouge, token Tailwind `brand-red`)
- Police titres : **Poppins** 600/700/800
- Police body : **Inter** 400/500/600
- Logos SVG officiels dans `public/_brand-assets/` (ne sont pas servis directement par le site)
