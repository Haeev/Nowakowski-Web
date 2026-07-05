import { groq } from "next-sanity"
import { createClient } from "next-sanity"
import type { ArticleListItem } from "./queries"

const articleListProjection = `
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage{ asset, alt },
  categories,
  readingTime,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
`

const articlesQuery = groq`*[_type == "article" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc){
  ${articleListProjection}
}`

export const getAllArticlesSafe = async (): Promise<ArticleListItem[]> => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

  if (!projectId || !dataset) return []

  const client = createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
    useCdn: false,
  })

  try {
    return await client.fetch<ArticleListItem[]>(articlesQuery)
  } catch {
    return []
  }
}
