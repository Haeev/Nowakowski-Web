import type { MetadataRoute } from "next"

import { getAllArticlesSafe } from "@/sanity/lib/fetch-articles-safe"
import { getAllLocalPageSlugs, getLocalPagePath } from "@/lib/content/local-pages"
import { getAllRealisations } from "@/lib/realisations"
import { siteConfig } from "@/lib/site-config"

export const revalidate = 3600

const SITE_URL = siteConfig.productionUrl

const safeDate = (value?: string) => {
  if (!value) return new Date()
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? new Date() : d
}

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const articles = await getAllArticlesSafe()
  const now = new Date()

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: safeDate(article.publishedAt ?? article._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const localPageEntries: MetadataRoute.Sitemap = getAllLocalPageSlugs().map(
    (slug) => ({
      url: `${SITE_URL}${getLocalPagePath(slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }),
  )

  const realisationEntries: MetadataRoute.Sitemap = getAllRealisations().map(
    (realisation) => ({
      url: `${SITE_URL}/realisations/${realisation.slug}`,
      lastModified: safeDate(realisation.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }),
  )

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/audit-gratuit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/accessibilite`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...localPageEntries,
    ...realisationEntries,
    ...articleEntries,
  ]
}

export default sitemap
