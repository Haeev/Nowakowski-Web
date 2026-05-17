import { NextResponse, type NextRequest } from "next/server"

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
}

export const middleware = (_request: NextRequest) => {
  const response = NextResponse.next()

  if (process.env.VERCEL_ENV !== "production") {
    response.headers.set(
      "X-Robots-Tag",
      "noindex, nofollow, noarchive, nosnippet, noimageindex",
    )
  }

  return response
}
