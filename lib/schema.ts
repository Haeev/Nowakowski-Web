import type { ArticleListItem } from "@/sanity/lib/queries"
import type { LocalPage } from "@/lib/content/local-pages"
import {
  getLocalPageBySlug,
  getLocalPagePath,
  PILLAR_SLUG,
} from "@/lib/content/local-pages"
import { getEmail, siteConfig } from "@/lib/site-config"

export const SCHEMA_SITE_URL = siteConfig.productionUrl

const PHONE = siteConfig.contact.phoneRaw
const EMAIL = getEmail()

export const SCHEMA_PUBLISHER = {
  "@type": "Organization" as const,
  name: siteConfig.name,
  logo: {
    "@type": "ImageObject" as const,
    url: `${SCHEMA_SITE_URL}/icon.png`,
    width: 192,
    height: 192,
  },
}

export const SCHEMA_AUTHOR = {
  "@type": "Person" as const,
  name: siteConfig.founder.fullName,
  url: `${SCHEMA_SITE_URL}/about`,
}

type ArticleSchemaInput = {
  title: string
  slug: string
  publishedAt: string
  updatedAt?: string
  excerpt?: string
  seoDescription?: string
  imageUrl?: string
}

export const buildArticleBreadcrumbJsonLd = (
  title: string,
  slug: string,
) => ({
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: SCHEMA_SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${SCHEMA_SITE_URL}/blog`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: title,
      item: `${SCHEMA_SITE_URL}/blog/${slug}`,
    },
  ],
})

export const buildBlogPostingJsonLd = (article: ArticleSchemaInput) => {
  const url = `${SCHEMA_SITE_URL}/blog/${article.slug}`
  const description =
    article.excerpt || article.seoDescription || ""

  return {
    "@type": "BlogPosting",
    headline: article.title,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: SCHEMA_AUTHOR,
    publisher: SCHEMA_PUBLISHER,
    image: article.imageUrl ? [article.imageUrl] : undefined,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    description,
    inLanguage: "fr-FR",
  }
}

export const buildArticlePageJsonLd = (article: ArticleSchemaInput) => ({
  "@context": "https://schema.org",
  "@graph": [
    buildBlogPostingJsonLd(article),
    buildArticleBreadcrumbJsonLd(article.title, article.slug),
  ],
})

export const buildLocalPageBreadcrumbJsonLd = (page: LocalPage) => {
  const pageUrl = `${SCHEMA_SITE_URL}${getLocalPagePath(page.slug)}`
  const items = [
    {
      "@type": "ListItem" as const,
      position: 1,
      name: "Accueil",
      item: SCHEMA_SITE_URL,
    },
    {
      "@type": "ListItem" as const,
      position: 2,
      name: "Moselle-Est",
      item: `${SCHEMA_SITE_URL}${getLocalPagePath(PILLAR_SLUG)}`,
    },
  ]

  if (page.type === "city") {
    items.push({
      "@type": "ListItem" as const,
      position: 3,
      name: page.city,
      item: pageUrl,
    })
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: items,
  }
}

export const buildLocalPageJsonLd = (page: LocalPage) => {
  const pageUrl = `${SCHEMA_SITE_URL}${getLocalPagePath(page.slug)}`

  const areaServed =
    page.type === "pillar"
      ? [
          ...(page.relatedCities ?? []).map((slug) => {
            const cityPage = getLocalPageBySlug(slug)
            return {
              "@type": "City" as const,
              name: cityPage?.city ?? slug,
            }
          }),
          { "@type": "AdministrativeArea" as const, name: "Moselle-Est" },
          { "@type": "AdministrativeArea" as const, name: "Moselle" },
        ]
      : [
          { "@type": "City" as const, name: page.city },
          { "@type": "AdministrativeArea" as const, name: "Moselle" },
        ]

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${pageUrl}#business`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        description: page.seo.description,
        url: pageUrl,
        telephone: PHONE,
        email: EMAIL,
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
        areaServed,
        serviceType: `Création de site internet à ${page.city}`,
        image: `${SCHEMA_SITE_URL}/og-image.jpg`,
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Virement bancaire",
        founder: {
          "@type": "Person",
          name: siteConfig.founder.fullName,
          url: `${SCHEMA_SITE_URL}/about`,
        },
        makesOffer: [
          {
            "@type": "Offer",
            name: "Création de site vitrine",
            description: `Site vitrine professionnel pour artisans et PME à ${page.city}, livré sous 2 semaines en moyenne.`,
            priceSpecification: {
              "@type": "PriceSpecification",
              price: "1000",
              priceCurrency: "EUR",
              minPrice: "1000",
            },
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      buildLocalPageBreadcrumbJsonLd(page),
    ],
  }
}

export const buildBlogIndexJsonLd = (articles: ArticleListItem[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${SCHEMA_SITE_URL}/blog#blog`,
      url: `${SCHEMA_SITE_URL}/blog`,
      name: "Blog Nowakowski Web",
      description:
        "Conseils, astuces et actualités sur la création de sites web pour artisans et PME en Moselle et Grand Est.",
      inLanguage: "fr-FR",
      publisher: SCHEMA_PUBLISHER,
      blogPost: articles.map((article) => ({
        "@type": "BlogPosting",
        headline: article.title,
        url: `${SCHEMA_SITE_URL}/blog/${article.slug}`,
        datePublished: article.publishedAt,
        dateModified: article._updatedAt ?? article.publishedAt,
        author: SCHEMA_AUTHOR,
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${SCHEMA_SITE_URL}/blog#list`,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SCHEMA_SITE_URL}/blog/${article.slug}`,
        name: article.title,
      })),
    },
  ],
})
