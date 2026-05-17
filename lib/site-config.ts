export const siteConfig = {
  name: "Nowakowski Web",
  legalName: "Nowakowski Services",
  domain: "nowakowski-web.fr",
  productionUrl: "https://nowakowski-web.fr",
  description:
    "Création de sites web professionnels pour artisans et PME en Moselle. Conformes RGPD et RGAA. À partir de 1 200€. Livrés en 5 à 7 jours.",
  shortDescription:
    "Création de sites web pour artisans et PME en Moselle.",
  contact: {
    phoneRaw: "+33652769372",
    phoneDisplay: "06 52 76 93 72",
    emailParts: ["loic", "@", "nowakowski-web", ".", "fr"] as const,
    emailLabel: "M'écrire par email",
  },
  address: {
    street: "40 rue Victor Hugo",
    locality: "Stiring-Wendel",
    region: "Moselle",
    postalCode: "57350",
    country: "FR",
    countryName: "France",
    departmentCode: "57",
    geo: { latitude: "49.1957", longitude: "6.9421" },
  },
  founder: {
    fullName: "Loïc Nowakowski",
    givenName: "Loïc",
    familyName: "Nowakowski",
    role: "Créateur de sites web",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/loic-nowakowski",
  },
  areaServed: [
    "Forbach",
    "Sarreguemines",
    "Saint-Avold",
    "Metz",
    "Stiring-Wendel",
  ],
  analytics: {
    plausibleDomain: "nowakowski-web.fr",
    plausibleScript: "https://plausible.io/js/script.js",
  },
} as const

export const getEmail = (): string =>
  siteConfig.contact.emailParts.join("")

export const getTelHref = (): string =>
  `tel:${siteConfig.contact.phoneRaw}`
