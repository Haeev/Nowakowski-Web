import { groq } from "next-sanity"
import type { PortableTextBlock } from "@portabletext/types"

import { client } from "./client"

export type ArticleListItem = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  mainImage?: {
    asset?: { _ref: string; _type: "reference" }
    alt?: string
  }
  categories?: string[]
  readingTime?: number
  estimatedReadingTime?: number
}

export type Article = ArticleListItem & {
  body: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
}

const articleListProjection = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage{ asset, alt },
  categories,
  readingTime,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
`

const articleFullProjection = `
  ${articleListProjection},
  body,
  seoTitle,
  seoDescription
`

export const getAllArticles = async (): Promise<ArticleListItem[]> => {
  const query = groq`*[_type == "article" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc){
    ${articleListProjection}
  }`
  return client.fetch<ArticleListItem[]>(query)
}

export const getArticleBySlug = async (
  slug: string,
): Promise<Article | null> => {
  const query = groq`*[_type == "article" && slug.current == $slug][0]{
    ${articleFullProjection}
  }`
  return client.fetch<Article | null>(query, { slug })
}

export const getArticlesSlugs = async (): Promise<string[]> => {
  const query = groq`*[_type == "article" && defined(slug.current)][].slug.current`
  return client.fetch<string[]>(query)
}
