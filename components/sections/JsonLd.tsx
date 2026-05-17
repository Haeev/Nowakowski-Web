import { FAQ_ITEMS } from "@/lib/content/faq"
import { getEmail, siteConfig } from "@/lib/site-config"

const SITE_URL = siteConfig.productionUrl
const PHONE = siteConfig.contact.phoneRaw
const EMAIL = getEmail()

const buildJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      description:
        "Création de sites web professionnels pour artisans et PME en Moselle et Grand Est. Sites modernes, conformes RGPD et RGAA, hébergement et maintenance inclus.",
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      founder: { "@id": `${SITE_URL}/#loic` },
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.locality,
        addressRegion: siteConfig.address.region,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.address.geo.latitude,
        longitude: siteConfig.address.geo.longitude,
      },
      areaServed: [
        ...siteConfig.areaServed.map((name) => ({ "@type": "City", name })),
        { "@type": "AdministrativeArea", name: "Moselle" },
        { "@type": "AdministrativeArea", name: "Grand Est" },
      ],
      serviceType: "Création de sites web",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Abonnements mensuels",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Formule Présence",
            description:
              "Hébergement, nom de domaine, maintenance et modifications mineures.",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "20",
              priceCurrency: "EUR",
              unitCode: "MON",
              referenceQuantity: {
                "@type": "QuantitativeValue",
                value: "1",
                unitCode: "MON",
              },
            },
          },
          {
            "@type": "Offer",
            name: "Formule Visibilité",
            description:
              "Hébergement, modifications fréquentes et 1 article SEO par mois.",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "80",
              priceCurrency: "EUR",
              unitCode: "MON",
              referenceQuantity: {
                "@type": "QuantitativeValue",
                value: "1",
                unitCode: "MON",
              },
            },
          },
          {
            "@type": "Offer",
            name: "Formule Croissance",
            description:
              "Hébergement, 4 articles ou actualités par mois, gestion de contenu via WhatsApp.",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "150",
              priceCurrency: "EUR",
              unitCode: "MON",
              referenceQuantity: {
                "@type": "QuantitativeValue",
                value: "1",
                unitCode: "MON",
              },
            },
          },
        ],
      },
      makesOffer: [
        {
          "@type": "Offer",
          name: "Création de site vitrine",
          description:
            "Site vitrine professionnel pour artisans et PME en Moselle et Grand Est, livré en 2 semaines en moyenne.",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "1200",
            priceCurrency: "EUR",
            minPrice: "1200",
          },
        },
      ],
      knowsLanguage: ["fr", "en"],
      currenciesAccepted: "EUR",
      paymentAccepted: "Virement bancaire, chèque",
      priceRange: "€€",
      image: `${SITE_URL}/og-image.jpg`,
      sameAs: [siteConfig.social.linkedin],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#loic`,
      name: siteConfig.founder.fullName,
      givenName: siteConfig.founder.givenName,
      familyName: siteConfig.founder.familyName,
      jobTitle: siteConfig.founder.role,
      description:
        "Développeur web indépendant basé à Stiring-Wendel (Moselle), je conçois des sites professionnels rapides, accessibles et référencés pour les artisans et PME du Grand Est.",
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}/og-image.jpg`,
      telephone: PHONE,
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.locality,
        addressRegion: siteConfig.address.region,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
      worksFor: { "@id": `${SITE_URL}/#business` },
      knowsAbout: [
        "Création de sites web",
        "Next.js",
        "React",
        "Référencement local",
        "SEO",
        "Accessibilité RGAA",
        "RGPD",
        "Hébergement web",
        "Maintenance web",
        "TailwindCSS",
      ],
      knowsLanguage: ["fr", "en"],
      sameAs: [siteConfig.social.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: siteConfig.name,
      description:
        "Création de sites web pour artisans et PME en Moselle et Grand Est",
      publisher: { "@id": `${SITE_URL}/#business` },
      inLanguage: "fr-FR",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
})

const JsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
  />
)

export default JsonLd
