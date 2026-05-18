export const siteConfig = {
  name: "Nowakowski Web",
  legalName: "Nowakowski Services",
  domain: "nowakowski-web.fr",
  productionUrl: "https://nowakowski-web.fr",
  description:
    "Création de sites web professionnels pour artisans et PME en Moselle. Conformes RGPD et RGAA. À partir de 1 000€. Livrés sous 2 semaines.",
  shortDescription:
    "Création de sites web pour artisans et PME en Moselle.",
  contact: {
    phoneRaw: "+33652769372",
    phoneDisplay: "06 52 76 93 72",
    emailParts: ["loic", "@", "nowakowski-web", ".", "fr"] as const,
    emailLabel: "M'écrire par email",
    whatsapp: {
      number: "33652769372",
      message:
        "Bonjour, je suis intéressé par la création d'un site web pour mon activité.",
    },
  },
  address: {
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

export const getWhatsAppHref = (
  customMessage?: string,
): string => {
  const { number, message } = siteConfig.contact.whatsapp
  const text = encodeURIComponent(customMessage ?? message)
  return `https://wa.me/${number}?text=${text}`
}
