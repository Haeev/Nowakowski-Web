import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export type Realisation = {
  slug: string
  title: string
  secteur: string
  ville: string
  url: string
  image?: string
  couleur: string
  date: string
  description: string
  content: string
}

const REALISATIONS_DIR = path.join(process.cwd(), "content", "realisations")

const readRealisationFile = (filename: string): Realisation | null => {
  if (!filename.endsWith(".mdx")) return null

  const slug = filename.replace(/\.mdx$/, "")
  const fullPath = path.join(REALISATIONS_DIR, filename)
  const fileContents = fs.readFileSync(fullPath, "utf-8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: String(data.title ?? slug),
    secteur: String(data.secteur ?? ""),
    ville: String(data.ville ?? ""),
    url: String(data.url ?? "#"),
    image: data.image ? String(data.image) : undefined,
    couleur: String(data.couleur ?? "#7C3AED"),
    date: String(data.date ?? ""),
    description: String(data.description ?? ""),
    content,
  }
}

export const getAllRealisations = (): Realisation[] => {
  if (!fs.existsSync(REALISATIONS_DIR)) return []

  const files = fs.readdirSync(REALISATIONS_DIR)
  const realisations = files
    .map(readRealisationFile)
    .filter((r): r is Realisation => r !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return realisations
}

export const getRealisationBySlug = (slug: string): Realisation | null => {
  const filename = `${slug}.mdx`
  const fullPath = path.join(REALISATIONS_DIR, filename)
  if (!fs.existsSync(fullPath)) return null
  return readRealisationFile(filename)
}
