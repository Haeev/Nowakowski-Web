import { getVercelEnv } from "@/lib/env"

const labels: Record<"preview" | "development", string> = {
  preview: "PREVIEW · environnement de test",
  development: "DEV · environnement local",
}

const PreviewBanner = () => {
  const env = getVercelEnv()
  if (env === "production") return null

  return (
    <div
      role="status"
      aria-label={labels[env]}
      className="sticky top-0 z-[200] flex items-center justify-center gap-2 bg-brand-red px-4 py-1.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white"
    >
      <span aria-hidden className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
      {labels[env]}
    </div>
  )
}

export default PreviewBanner
