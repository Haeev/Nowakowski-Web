# Nowakowski Web : site vitrine

Site officiel de **Nowakowski Web**, agence solo de création de sites web pour artisans et PME en Moselle et Grand Est, opérée par Loïc Nowakowski (Stiring-Wendel, 57350).

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** (pur, zéro librairie de composants)
- **next-themes** : dark/light avec dark par défaut, persisté en `localStorage`
- **next/font/google** : `Poppins` (titres) + `Inter` (body)
- **lucide-react** : icônes
- **gray-matter** : frontmatter MDX des réalisations
- Déploiement : **Vercel**

## Démarrer

```bash
npm install
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
  layout.tsx          ← métadonnées SEO globales + ThemeProvider + fonts
  page.tsx            ← page principale complète
  globals.css         ← reset + tokens CSS du thème
  providers.tsx       ← ThemeProvider next-themes
  sitemap.ts          ← sitemap.xml
  robots.ts           ← robots.txt
  icon.svg            ← favicon (monogramme NW)
content/
  realisations/       ← fichiers MDX des réalisations clients
lib/
  realisations.ts     ← lecture des MDX (frontmatter)
components/
  Nav.tsx, Hero.tsx, Services.tsx, Tarifs.tsx, ALaCarte.tsx,
  PourquoiMoi.tsx, Realisations.tsx, Faq.tsx, Contact.tsx,
  Footer.tsx, ThemeToggle.tsx, FloatingCallButton.tsx,
  Logo.tsx, Reveal.tsx, JsonLd.tsx, SectionLabel.tsx
public/
  logo-primary.svg, logo-light.svg, monogram-icon.svg
  llms.txt            ← pour les crawlers IA (GEO)
  realisations/       ← images des réalisations clients
```

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
4. Push → Vercel redéploie automatiquement

## SEO

- Métadonnées Open Graph + Twitter complètes dans `app/layout.tsx`
- Schema JSON-LD (`ProfessionalService` + `WebSite` + `FAQPage`) dans `components/JsonLd.tsx`
- `sitemap.xml` et `robots.txt` générés via App Router
- `public/llms.txt` pour les crawlers IA (GEO 2026)
- NAP cohérent (Nom · Adresse · Téléphone) entre footer, contact et JSON-LD

### Avant la mise en ligne

- [ ] Remplacer `TODO_GOOGLE_SEARCH_CONSOLE_CODE` dans `app/layout.tsx`
- [ ] Créer une vraie image OG `/public/og-image.jpg` (1200×630)
- [ ] Connecter le formulaire de contact à un backend (Resend, Formspree, route API…)
- [ ] Remplacer les 3 réalisations placeholder par les vraies
- [ ] Soumettre le sitemap dans Google Search Console

## Déploiement Vercel

```bash
npx vercel
```

Ou push sur GitHub puis importer le repo dans Vercel : auto-déploiement à chaque push.

## Identité visuelle

- Couleur principale : `#7C3AED` (violet electric, charte officielle)
- Couleur d'accent : `#A78BFA` (violet light)
- Police titres : **Poppins** 600/700/800
- Police body : **Inter** 400/500/600
- Logo SVG officiel dans `public/logo-primary.svg` et `public/logo-light.svg`
