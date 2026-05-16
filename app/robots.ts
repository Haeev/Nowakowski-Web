import type { MetadataRoute } from "next"

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/" },
  sitemap: "https://nowakowski-web.fr/sitemap.xml",
  host: "https://nowakowski-web.fr",
})

export default robots
