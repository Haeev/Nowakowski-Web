export type LocalPageSection =
  | "intro"
  | "sectors"
  | "pricing"
  | "trust"
  | "realisations"
  | "process"
  | "faq"
  | "links"

export type LocalFaqItem = {
  question: string
  answer: string
}

export type LocalPage = {
  slug: string
  city: string
  type: "city" | "pillar"
  seo: { title: string; description: string }
  hero: { h1: string; subtitle: string; ctaLabel: string }
  intro: { heading: string; paragraphs: string[] }
  sectors: { heading: string; items: string[] }
  sectionOrder: LocalPageSection[]
  faq: LocalFaqItem[]
  relatedCities?: string[]
  pillarSlug?: string
  blogLinks?: { href: string; label: string }[]
  realisationVille?: string
  contactIntro?: string
}

export const PILLAR_SLUG = "moselle-est"

export const CITY_SLUGS = [
  "forbach",
  "sarreguemines",
  "stiring-wendel",
  "saint-avold",
  "metz",
] as const

export const getLocalPagePath = (slug: string): string =>
  `/creation-site-internet-${slug}`

export const LOCAL_PAGES: LocalPage[] = [
  {
    slug: "forbach",
    city: "Forbach",
    type: "city",
    pillarSlug: PILLAR_SLUG,
    realisationVille: "Forbach",
    seo: {
      title: "Création de site internet à Forbach : agence web locale",
      description:
        "Site internet professionnel pour artisans et PME à Forbach. Création à partir de 1 000€, livré sous 2 semaines. Devis gratuit sous 24h.",
    },
    hero: {
      h1: "Votre site internet professionnel à Forbach",
      subtitle:
        "Artisans du bâtiment, commerçants, professions libérales : un site qui vous rend visible sur Google dans la zone de Forbach et alentours.",
      ctaLabel: "Demander un devis à Forbach",
    },
    intro: {
      heading: "Pourquoi un site web pour votre activité à Forbach ?",
      paragraphs: [
        "Forbach concentre un tissu dense d'artisans du bâtiment, d'électriciens, de plombiers et de commerces de proximité. Quand un habitant cherche un professionnel, il tape souvent « électricien Forbach » ou « plombier près de moi » sur son téléphone. Sans site, vous n'apparaissez tout simplement pas dans ces recherches.",
        "La concurrence locale est réelle, mais beaucoup d'entreprises n'ont toujours pas de présence en ligne digne de ce nom. Un site vitrine clair, rapide et bien référencé vous place devant celles qui comptent encore uniquement sur le bouche-à-oreille ou une page Facebook inactive.",
        "Je conçois des sites adaptés aux artisans et PME de Forbach : pages services lisibles, formulaire de contact, affichage mobile impeccable et référencement local pensé dès la conception. Vous gardez un interlocuteur unique, basé à quelques minutes de chez vous.",
      ],
    },
    sectors: {
      heading: "Secteurs que j'accompagne à Forbach et alentours",
      items: [
        "Artisans du bâtiment (maçonnerie, carrelage, peinture)",
        "Électriciens et installateurs",
        "Plombiers et chauffagistes",
        "Commerces de proximité et boutiques",
        "Restaurants et traiteurs",
        "Professions libérales (avocats, experts-comptables, kinésithérapeutes)",
        "Garages et mécaniciens auto",
        "Entreprises de nettoyage et services aux particuliers",
      ],
    },
    sectionOrder: [
      "intro",
      "sectors",
      "pricing",
      "trust",
      "realisations",
      "process",
      "faq",
      "links",
    ],
    faq: [
      {
        question: "Combien coûte un site internet pour un artisan à Forbach ?",
        answer:
          "La création d'un site vitrine professionnel démarre à partir de 1 000€. Le tarif exact dépend de vos besoins (nombre de pages, fonctionnalités). Je vous envoie un devis gratuit et détaillé sous 24h, sans engagement.",
      },
      {
        question: "Combien de temps faut-il pour avoir mon site en ligne ?",
        answer:
          "En moyenne, comptez 2 semaines entre la validation du devis et la mise en ligne. Je vous tiens informé à chaque étape : brief, maquette, validation, livraison.",
      },
      {
        question: "Travaillez-vous uniquement avec des clients à Forbach ?",
        answer:
          "Forbach est ma zone de chalandise directe, mais j'accompagne aussi des clients dans toute la Moselle-Est et au-delà. Les échanges se font à distance (visio, téléphone, WhatsApp), avec possibilité de rendez-vous sur place si besoin.",
      },
      {
        question: "Mon site sera-t-il visible sur Google à Forbach ?",
        answer:
          "Oui, chaque site est conçu avec le référencement local en tête : structure technique propre, balises adaptées, fiche Google Business Profile optimisée. L'abonnement Visibilité inclut en plus un suivi SEO local et un article par mois.",
      },
    ],
    blogLinks: [
      {
        href: "/blog/site-internet-plombier",
        label: "Site internet pour plombier",
      },
      {
        href: "/blog/combien-coute-un-site-internet",
        label: "Combien coûte un site internet ?",
      },
    ],
    contactIntro:
      "Un projet de site à Forbach ? Décrivez-moi votre activité, je vous réponds sous 24h.",
  },
  {
    slug: "sarreguemines",
    city: "Sarreguemines",
    type: "city",
    pillarSlug: PILLAR_SLUG,
    realisationVille: "Sarreguemines",
    seo: {
      title: "Création de site internet à Sarreguemines",
      description:
        "Site vitrine pour commerçants et artisans à Sarreguemines. Création sur mesure à partir de 1 000€, hébergement inclus. Devis gratuit.",
    },
    hero: {
      h1: "Votre vitrine en ligne à Sarreguemines",
      subtitle:
        "Commerces du centre-ville, artisans, professions libérales : donnez à vos clients sarregueminois une raison de vous choisir avant même de franchir votre porte.",
      ctaLabel: "Obtenir un devis à Sarreguemines",
    },
    intro: {
      heading: "Un site web au service de votre commerce à Sarreguemines",
      paragraphs: [
        "Sarreguemines, avec son centre historique, ses commerces de rue et son héritage céramique, attire autant les habitants que les visiteurs. Pourtant, beaucoup de commerçants et d'artisans locaux n'ont pas encore de site à la hauteur de leur savoir-faire. Résultat : leurs concurrents en ligne captent une partie de la demande.",
        "Un site vitrine bien fait permet de présenter vos horaires, vos services, vos réalisations et un moyen de contact direct. C'est particulièrement utile pour les professions libérales, les restaurateurs et les artisans qui veulent être trouvés quand on cherche « près de Sarreguemines ».",
        "Je crée des sites sobres, rapides et faciles à mettre à jour. Pas de plateforme impersonnelle : vous échangez directement avec moi, et vos modifications passent par un simple message WhatsApp.",
      ],
    },
    sectors: {
      heading: "À qui s'adresse mon offre à Sarreguemines",
      items: [
        "Commerces de centre-ville et boutiques",
        "Artisans d'art et céramistes",
        "Plombiers, chauffagistes et menuisiers",
        "Restaurants, bars et traiteurs",
        "Professions libérales et cabinets médicaux",
        "Agences immobilières et services à la personne",
        "Artisans du bâtiment et rénovation",
        "Associations et structures culturelles",
      ],
    },
    sectionOrder: [
      "intro",
      "sectors",
      "trust",
      "pricing",
      "realisations",
      "process",
      "faq",
      "links",
    ],
    faq: [
      {
        question: "Combien coûte un site pour un commerce à Sarreguemines ?",
        answer:
          "À partir de 1 000€ pour un site vitrine complet. Le prix varie selon le nombre de pages et les fonctionnalités souhaitées. Contactez-moi pour un devis personnalisé, réponse garantie sous 24h.",
      },
      {
        question: "Puis-je modifier mon site moi-même après la livraison ?",
        answer:
          "Oui, via votre abonnement mensuel. Envoyez-moi vos modifications par WhatsApp ou email, et je les mets en ligne dans la journée. Pas besoin de toucher au code.",
      },
      {
        question: "Intervenez-vous à Sarreguemines et dans les communes voisines ?",
        answer:
          "Absolument. Sarreguemines, Grosbliederstroff, Bliesbruck, Woustviller et les alentours font partie de ma zone d'intervention habituelle en Moselle-Est.",
      },
      {
        question: "Proposez-vous l'hébergement et le nom de domaine ?",
        answer:
          "Oui, tout est inclus dans l'abonnement à partir de 29€/mois : hébergement en Europe, nom de domaine, sauvegardes, mises à jour techniques et adresses email professionnelles.",
      },
      {
        question: "Mon site sera-t-il adapté aux mobiles ?",
        answer:
          "Chaque site est conçu mobile-first. La majorité des recherches locales se font sur smartphone : votre site s'affichera parfaitement sur tous les écrans.",
      },
    ],
    blogLinks: [
      {
        href: "/blog/site-internet-plombier",
        label: "Site internet plombier : guide complet",
      },
      {
        href: "/blog/combien-coute-un-site-internet",
        label: "Tarifs création de site web",
      },
    ],
    contactIntro:
      "Vous avez un commerce ou une activité à Sarreguemines ? Parlons de votre projet.",
  },
  {
    slug: "stiring-wendel",
    city: "Stiring-Wendel",
    type: "city",
    pillarSlug: PILLAR_SLUG,
    realisationVille: "Stiring-Wendel",
    seo: {
      title: "Création de site internet à Stiring-Wendel",
      description:
        "Agence web basée à Stiring-Wendel. Sites professionnels pour artisans et PME locales. À partir de 1 000€, livraison sous 2 semaines.",
    },
    hero: {
      h1: "Création de site web à Stiring-Wendel",
      subtitle:
        "Basé ici même, je connais le terrain. Artisans et PME de Stiring-Wendel : un site pro, un interlocuteur de proximité, zéro intermédiaire.",
      ctaLabel: "Me contacter à Stiring-Wendel",
    },
    intro: {
      heading: "Pourquoi choisir un créateur de sites local à Stiring-Wendel ?",
      paragraphs: [
        "Stiring-Wendel, aux portes de Forbach, abrite de nombreuses PME, artisans et commerces qui font vivre le quotidien du bassin frontalier. Quand vous cherchez un prestataire web, avoir quelqu'un à deux pas de chez vous change la donne : réactivité, compréhension du contexte local, possibilité de se voir en personne.",
        "C'est ici que je suis installé. Je ne suis pas une agence parisienne déconnectée du terrain mosellan. Je travaille en direct avec chaque client, du premier appel à la mise en ligne, sans chef de projet ni sous-traitance.",
        "Un site vitrine bien construit vous permet d'être visible quand un habitant de Stiring-Wendel ou des communes voisines cherche un professionnel sur Google. C'est un investissement concret, pas une dépense abstraite.",
      ],
    },
    sectors: {
      heading: "Activités que j'accompagne à Stiring-Wendel",
      items: [
        "Artisans et entreprises du bâtiment",
        "Commerces de proximité",
        "Garages et services automobiles",
        "Coiffeurs, esthéticiennes et bien-être",
        "Professions libérales",
        "Restaurants et food trucks",
        "Entreprises de services (nettoyage, jardinage)",
        "Auto-entrepreneurs et consultants",
      ],
    },
    sectionOrder: [
      "intro",
      "trust",
      "sectors",
      "pricing",
      "process",
      "realisations",
      "faq",
      "links",
    ],
    faq: [
      {
        question: "Êtes-vous vraiment basé à Stiring-Wendel ?",
        answer:
          "Oui, c'est mon adresse professionnelle et ma zone d'intervention principale. Vous pouvez me joindre par téléphone, WhatsApp ou email, et nous pouvons nous rencontrer sur place si le projet le nécessite.",
      },
      {
        question: "Quel est le prix d'un site vitrine à Stiring-Wendel ?",
        answer:
          "La création démarre à 1 000€, avec un devis détaillé avant tout engagement. Pas d'acompte : vous payez à la livraison, quand le site vous convient.",
      },
      {
        question: "En combien de temps mon site sera-t-il prêt ?",
        answer:
          "Comptez environ 2 semaines en moyenne. Le délai dépend de la rapidité avec laquelle vous validez les étapes (brief, maquette, contenus).",
      },
      {
        question: "Puis-je vous confier la maintenance de mon site ?",
        answer:
          "Oui, via un abonnement mensuel à partir de 29€. Hébergement, domaine, sauvegardes, mises à jour et modifications de contenu sont inclus selon la formule choisie.",
      },
    ],
    blogLinks: [
      {
        href: "/blog/combien-coute-un-site-internet",
        label: "Prix d'un site internet pour artisan",
      },
    ],
    contactIntro:
      "Basé à Stiring-Wendel, je suis à votre écoute pour votre projet de site.",
  },
  {
    slug: "saint-avold",
    city: "Saint-Avold",
    type: "city",
    pillarSlug: PILLAR_SLUG,
    realisationVille: "Saint-Avold",
    seo: {
      title: "Création de site internet à Saint-Avold",
      description:
        "Site internet pour artisans, commerçants et PME à Saint-Avold. Création à partir de 1 000€, accompagnement personnalisé. Devis gratuit.",
    },
    hero: {
      h1: "Site internet professionnel à Saint-Avold",
      subtitle:
        "PME, commerces et artisans du sud de la Moselle : un site qui vous positionne sur Google quand vos clients cherchent un professionnel de confiance.",
      ctaLabel: "Demander un devis à Saint-Avold",
    },
    intro: {
      heading: "Votre activité à Saint-Avold mérite une vraie présence en ligne",
      paragraphs: [
        "Saint-Avold est un pôle économique important du sud mosellan, avec un tissu varié de commerces, d'entreprises de services et d'artisans. Dans ce contexte, ne pas avoir de site internet revient à laisser le champ libre aux concurrents qui, eux, apparaissent quand on tape « plombier Saint-Avold » ou « restaurant Saint-Avold » sur Google.",
        "Un site vitrine professionnel rassure vos prospects avant même le premier contact : ils voient vos services, vos horaires, éventuellement vos réalisations, et peuvent vous joindre en un clic. C'est particulièrement important pour les entreprises de services, la restauration et les professions libérales.",
        "Je travaille avec des artisans et PME de toute la Moselle, dont Saint-Avold et ses environs. Mon approche est directe : un seul interlocuteur, des délais tenus, un tarif annoncé dès le devis.",
      ],
    },
    sectors: {
      heading: "Clients que j'accompagne à Saint-Avold et environs",
      items: [
        "Entreprises de BTP et second œuvre",
        "Commerces et franchises locales",
        "Restaurants et brasseries",
        "Professions libérales et cabinets",
        "Entreprises de nettoyage professionnel",
        "Garages et carrossiers",
        "Services à la personne",
        "Associations sportives et culturelles",
      ],
    },
    sectionOrder: [
      "sectors",
      "intro",
      "pricing",
      "trust",
      "realisations",
      "process",
      "faq",
      "links",
    ],
    faq: [
      {
        question: "Combien coûte un site pour une PME à Saint-Avold ?",
        answer:
          "À partir de 1 000€ pour un site vitrine sur mesure. Le devis dépend du nombre de pages et des fonctionnalités. Réponse sous 24h, sans engagement.",
      },
      {
        question: "Travaillez-vous avec des clients à Saint-Avold ?",
        answer:
          "Oui, Saint-Avold fait partie de ma zone d'intervention en Moselle-Est. Les échanges se font principalement à distance, avec possibilité de rendez-vous si nécessaire.",
      },
      {
        question: "Que comprend l'abonnement mensuel ?",
        answer:
          "Hébergement en Europe, nom de domaine, sauvegardes automatiques, mises à jour de sécurité, adresses email pro et modifications de contenu. Trois formules : Présence (29€), Visibilité (69€) et Croissance (179€).",
      },
      {
        question: "Mon site sera-t-il conforme RGPD ?",
        answer:
          "Oui, chaque site inclut une bannière cookies conforme, une politique de confidentialité et un hébergement en Union européenne. C'est non négociable.",
      },
    ],
    blogLinks: [
      {
        href: "/blog/combien-coute-un-site-internet",
        label: "Combien coûte un site pour une PME ?",
      },
    ],
    contactIntro:
      "Un projet de site à Saint-Avold ? Contactez-moi pour en discuter.",
  },
  {
    slug: "metz",
    city: "Metz",
    type: "city",
    pillarSlug: PILLAR_SLUG,
    realisationVille: "Metz",
    seo: {
      title: "Création de site internet à Metz : agence web pour artisans",
      description:
        "Site internet professionnel pour artisans et PME à Metz. Création à partir de 1 000€, livré sous 2 semaines. Devis gratuit sous 24h.",
    },
    hero: {
      h1: "Votre site internet professionnel à Metz",
      subtitle:
        "Artisans, commerçants et PME messines : un site vitrine rapide, bien référencé et adapté à la recherche locale sur Google.",
      ctaLabel: "Demander un devis à Metz",
    },
    intro: {
      heading: "Pourquoi un site web pour votre activité à Metz ?",
      paragraphs: [
        "Metz concentre un bassin économique dense : artisans du bâtiment, professions libérales, commerces et entreprises de services. Quand un habitant cherche un professionnel, il tape « plombier Metz » ou « électricien Metz » sur son téléphone. Sans site, vous n'apparaissez pas dans ces recherches.",
        "La concurrence en ligne est réelle à Metz, mais beaucoup d'entreprises locales n'ont toujours pas de vitrine web à la hauteur de leur savoir-faire. Un site clair, rapide et optimisé pour le référencement local vous place devant celles qui comptent uniquement sur le bouche-à-oreille.",
        "Je conçois des sites sur mesure pour les artisans et PME de Metz et de la métropole : pages services lisibles, formulaire de contact, affichage mobile impeccable. Un interlocuteur unique, basé en Moselle-Est, à une courte distance de Metz.",
      ],
    },
    sectors: {
      heading: "Secteurs que j'accompagne à Metz et environs",
      items: [
        "Artisans du bâtiment et rénovation",
        "Électriciens et installateurs",
        "Plombiers et chauffagistes",
        "Commerces et boutiques",
        "Restaurants et métiers de bouche",
        "Professions libérales",
        "Entreprises de nettoyage et services",
        "Garages et mécaniciens auto",
      ],
    },
    sectionOrder: [
      "intro",
      "sectors",
      "pricing",
      "trust",
      "realisations",
      "process",
      "faq",
      "links",
    ],
    faq: [
      {
        question: "Combien coûte un site internet pour un artisan à Metz ?",
        answer:
          "La création d'un site vitrine professionnel démarre à partir de 1 000€. Le tarif exact dépend de vos besoins. Devis gratuit et détaillé sous 24h, sans engagement.",
      },
      {
        question: "Intervenez-vous à Metz depuis la Moselle-Est ?",
        answer:
          "Oui, Metz fait partie de ma zone d'intervention. Les échanges se font à distance (visio, téléphone, WhatsApp) avec possibilité de rendez-vous sur place si le projet le nécessite.",
      },
      {
        question: "Combien de temps pour mettre mon site en ligne ?",
        answer:
          "En moyenne 2 semaines entre la validation du devis et la mise en ligne. Je vous tiens informé à chaque étape.",
      },
      {
        question: "Mon site sera-t-il visible sur Google à Metz ?",
        answer:
          "Oui, chaque site est conçu avec le référencement local en tête. L'abonnement Visibilité inclut un suivi SEO et un article par mois.",
      },
    ],
    blogLinks: [
      {
        href: "/blog/combien-coute-un-site-internet",
        label: "Combien coûte un site internet ?",
      },
      {
        href: "/blog/site-internet-plombier",
        label: "Site internet pour artisans du bâtiment",
      },
    ],
    contactIntro:
      "Un projet de site à Metz ? Décrivez-moi votre activité, je vous réponds sous 24h.",
  },
  {
    slug: PILLAR_SLUG,
    city: "Moselle-Est",
    type: "pillar",
    relatedCities: [...CITY_SLUGS],
    seo: {
      title: "Création de site internet en Moselle-Est",
      description:
        "Agence web pour artisans et PME en Moselle-Est : Forbach, Sarreguemines, Stiring-Wendel, Saint-Avold. Sites à partir de 1 000€, livrés sous 2 semaines.",
    },
    hero: {
      h1: "Création de sites internet en Moselle-Est",
      subtitle:
        "Forbach, Sarreguemines, Stiring-Wendel, Saint-Avold, Metz : j'accompagne les artisans et PME de l'est de la Moselle avec des sites professionnels, rapides et bien référencés.",
      ctaLabel: "Demander un devis en Moselle-Est",
    },
    intro: {
      heading: "Un partenaire web pour tout le bassin de Moselle-Est",
      paragraphs: [
        "La Moselle-Est, de Forbach à Saint-Avold, regroupe des milliers d'artisans, de commerçants et de PME qui font tourner l'économie locale. Pourtant, une part significative de ces entreprises n'a toujours pas de site internet adapté à la recherche locale sur Google.",
        "Nowakowski Web est une agence web indépendante, basée à Stiring-Wendel, spécialisée dans la création de sites vitrines pour les artisans et petites entreprises. Pas de plateforme impersonnelle, pas de sous-traitance : vous travaillez directement avec le créateur du site, du brief à la mise en ligne.",
        "Que vous soyez électricien à Forbach, commerçant à Sarreguemines, artisan à Stiring-Wendel, restaurateur à Saint-Avold ou PME à Metz, je conçois un site sur mesure, optimisé pour le référencement local et livré en moyenne sous 2 semaines.",
      ],
    },
    sectors: {
      heading: "Qui je accompagne en Moselle-Est",
      items: [
        "Artisans du bâtiment et du second œuvre",
        "Électriciens, plombiers et chauffagistes",
        "Commerces de proximité et boutiques",
        "Restaurants, traiteurs et métiers de bouche",
        "Professions libérales",
        "Garages et services automobiles",
        "Entreprises de nettoyage et services aux entreprises",
        "Auto-entrepreneurs et consultants indépendants",
      ],
    },
    sectionOrder: [
      "intro",
      "links",
      "sectors",
      "pricing",
      "trust",
      "realisations",
      "process",
      "faq",
    ],
    faq: [
      {
        question: "Dans quelles villes de Moselle-Est intervenez-vous ?",
        answer:
          "Principalement Forbach, Sarreguemines, Stiring-Wendel, Saint-Avold et Metz, ainsi que les communes alentours. La zone s'étend à l'ensemble de la Moselle et du Grand Est.",
      },
      {
        question: "Combien coûte la création d'un site en Moselle-Est ?",
        answer:
          "La création d'un site vitrine démarre à 1 000€. Des abonnements mensuels (à partir de 29€) couvrent l'hébergement, le domaine et la maintenance. Devis gratuit sous 24h.",
      },
      {
        question: "Pourquoi choisir une agence locale plutôt qu'une plateforme en ligne ?",
        answer:
          "Avec une plateforme, vous êtes un numéro. Avec moi, vous avez un interlocuteur unique qui connaît le contexte mosellan, parle votre langue et répond en personne. Pas de chatbot, pas de ticket support.",
      },
      {
        question: "Proposez-vous le référencement local (SEO) ?",
        answer:
          "Oui, chaque site est conçu avec le SEO local en tête. L'abonnement Visibilité (69€/mois) ajoute un article SEO mensuel et un suivi de positionnement local.",
      },
      {
        question: "Comment se déroule un projet de A à Z ?",
        answer:
          "Devis gratuit, puis brief (visio ou téléphone), maquette, validation, mise en ligne. En moyenne 2 semaines. Paiement intégral à la livraison, sans acompte.",
      },
    ],
    blogLinks: [
      {
        href: "/blog/combien-coute-un-site-internet",
        label: "Combien coûte un site internet ?",
      },
      {
        href: "/blog/site-internet-plombier",
        label: "Site internet pour artisans du bâtiment",
      },
    ],
    contactIntro:
      "Un projet de site en Moselle-Est ? Décrivez-moi votre activité, je vous réponds sous 24h.",
  },
]

export const getLocalPageBySlug = (slug: string): LocalPage | undefined =>
  LOCAL_PAGES.find((page) => page.slug === slug)

export const getAllLocalPageSlugs = (): string[] =>
  LOCAL_PAGES.map((page) => page.slug)
