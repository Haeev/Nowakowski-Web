import { FAQ_ITEMS } from "@/lib/faq"

const SITE_URL = "https://nowakowski-web.fr"
const PHONE = "+33652769372"

const buildJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "Nowakowski Web",
      legalName: "Nowakowski Services",
      description:
        "Création de sites web professionnels pour artisans et PME en Moselle et Grand Est. Sites modernes, visibles sur Google, hébergement et maintenance inclus.",
      url: SITE_URL,
      telephone: PHONE,
      founder: {
        "@type": "Person",
        name: "Loïc Nowakowski",
        jobTitle: "Créateur de sites web",
        telephone: PHONE,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Stiring-Wendel",
        addressRegion: "Moselle",
        postalCode: "57350",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "49.1957",
        longitude: "6.9421",
      },
      areaServed: [
        { "@type": "City", name: "Forbach" },
        { "@type": "City", name: "Sarreguemines" },
        { "@type": "City", name: "Metz" },
        { "@type": "City", name: "Stiring-Wendel" },
        { "@type": "City", name: "Saint-Avold" },
        { "@type": "AdministrativeArea", name: "Moselle" },
        { "@type": "AdministrativeArea", name: "Grand Est" },
      ],
      serviceType: "Création de sites web",
      makesOffer: [
        {
          "@type": "Offer",
          name: "Création de site vitrine",
          description:
            "Site vitrine professionnel pour artisans et PME, livré en 5 à 7 jours.",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "1200",
            priceCurrency: "EUR",
            minPrice: "1200",
            maxPrice: "2000",
          },
        },
        {
          "@type": "Offer",
          name: "Formule Présence",
          description:
            "Hébergement, nom de domaine, maintenance et modifications mineures.",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "29",
            priceCurrency: "EUR",
            unitCode: "MON",
          },
        },
        {
          "@type": "Offer",
          name: "Formule Visibilité",
          description:
            "Hébergement, modifications fréquentes et 1 article SEO par mois.",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "69",
            priceCurrency: "EUR",
            unitCode: "MON",
          },
        },
        {
          "@type": "Offer",
          name: "Formule Croissance",
          description:
            "Hébergement, 4 articles ou actualités par mois, gestion de contenu via WhatsApp.",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "179",
            priceCurrency: "EUR",
            unitCode: "MON",
          },
        },
      ],
      knowsLanguage: ["fr", "en"],
      currenciesAccepted: "EUR",
      paymentAccepted: "Virement bancaire, chèque",
      priceRange: "€€",
      image: `${SITE_URL}/og-image.jpg`,
      sameAs: ["https://www.linkedin.com/in/loic-nowakowski"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Nowakowski Web",
      description: "Création de sites web pour artisans et PME en Moselle",
      publisher: { "@id": `${SITE_URL}/#business` },
      inLanguage: "fr-FR",
    },
    {
      "@type": "FAQPage",
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
