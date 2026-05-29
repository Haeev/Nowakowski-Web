import { siteConfig } from "@/lib/site-config"

const SITE_URL = siteConfig.productionUrl
const PAGE_URL = `${SITE_URL}/audit-gratuit`

export const buildAuditPageJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${PAGE_URL}#app`,
      name: "Audit gratuit de site web",
      url: PAGE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      description:
        "Outil gratuit d'analyse de site web : performance, référencement (SEO), accessibilité et bonnes pratiques, sur mobile et ordinateur.",
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: SITE_URL,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Audit gratuit",
          item: PAGE_URL,
        },
      ],
    },
  ],
})
