import type { ArticleListItem } from "@/sanity/lib/queries"
import { siteConfig } from "@/lib/site-config"

export const SCHEMA_SITE_URL = siteConfig.productionUrl

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
