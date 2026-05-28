/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
    ],
  },
  async rewrites() {
    const privateClientPaths = ["olivia", "bocreno", "braun"]

    return privateClientPaths.map((slug) => ({
      source: `/${slug}`,
      destination: `/${slug}/index.html`,
    }))
  },
  async headers() {
    const privateNoIndex = {
      key: "X-Robots-Tag",
      value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
    }
    const privateClientPaths = ["olivia", "bocreno", "braun"]
    const privateHeaders = privateClientPaths.flatMap((slug) => [
      {
        source: `/${slug}`,
        headers: [...securityHeaders, privateNoIndex],
      },
      {
        source: `/${slug}/:path*`,
        headers: [...securityHeaders, privateNoIndex],
      },
    ])

    return [
      ...privateHeaders,
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
