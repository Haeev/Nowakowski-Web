#!/usr/bin/env node
/**
 * Réaligne les slugs/titles SEO des articles Sanity vers les requêtes nationales.
 * Usage : SANITY_API_WRITE_TOKEN=xxx node scripts/realign-blog-slugs.mjs
 */
import { createClient } from "@sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    "Variables requises : NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN",
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
})

const REALIGNMENTS = [
  {
    oldSlug: "site-internet-plombier-moselle",
    newSlug: "site-internet-plombier",
    seoTitle: "Site internet plombier : guide complet pour artisans",
    title: "Site internet plombier : ce qu'il faut savoir",
  },
  {
    oldSlug: "site-web-artisan-moselle-tarif",
    newSlug: "combien-coute-un-site-internet",
    seoTitle: "Combien coûte un site internet en 2026 ?",
    title: "Combien coûte un site internet ?",
  },
]

const run = async () => {
  for (const item of REALIGNMENTS) {
    const docs = await client.fetch(
      `*[_type == "article" && slug.current == $slug][0..1]{ _id, title, "slug": slug.current }`,
      { slug: item.oldSlug },
    )

    if (!docs.length) {
      const existing = await client.fetch(
        `*[_type == "article" && slug.current == $slug][0]{ _id, title }`,
        { slug: item.newSlug },
      )
      if (existing) {
        console.log(`skip ${item.oldSlug} → déjà migré (${item.newSlug})`)
        continue
      }
      console.warn(`article introuvable : ${item.oldSlug}`)
      continue
    }

    const doc = docs[0]
    await client
      .patch(doc._id)
      .set({
        title: item.title,
        seoTitle: item.seoTitle,
        slug: { _type: "slug", current: item.newSlug },
      })
      .commit()

    console.log(`migré ${item.oldSlug} → ${item.newSlug} (${doc._id})`)
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
