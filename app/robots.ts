import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site-config"

const SITE_URL = siteConfig.productionUrl

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
