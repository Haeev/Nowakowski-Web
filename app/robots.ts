import type { MetadataRoute } from "next"

const SITE_URL = "https://nowakowski-web.fr"

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/mentions-legales",
        "/cgv",
        "/politique-confidentialite",
      ],
    },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
})

export default robots
