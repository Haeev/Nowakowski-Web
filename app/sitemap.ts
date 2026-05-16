import type { MetadataRoute } from "next"

import { getAllArticles } from "@/sanity/lib/queries"

const SITE_URL = "https://nowakowski-web.fr"

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const articles = await getAllArticles().catch(() => [])

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...articleEntries,
  ]
}

export default sitemap
