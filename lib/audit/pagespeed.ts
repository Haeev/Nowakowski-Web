import type {
  AuditErrorCode,
  AuditIssue,
  AuditScores,
  AuditStrategy,
  AuditStrategyResult,
} from "@/components/audit/types"

const PSI_ENDPOINT =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"

const PSI_CATEGORIES = [
  "performance",
  "accessibility",
  "best-practices",
  "seo",
] as const

const PASS_THRESHOLD = 0.9
const MAX_ISSUES = 3

/**
 * Audits qui sont de purs indicateurs de mesure (pas des actions concretes).
 * On les exclut du "top 3" pour ne montrer que des problemes actionnables.
 */
const METRIC_AUDIT_IDS = new Set<string>([
  "first-contentful-paint",
  "largest-contentful-paint",
  "first-meaningful-paint",
  "speed-index",
  "interactive",
  "total-blocking-time",
  "cumulative-layout-shift",
  "max-potential-fid",
])

/**
 * Traduction des principaux audits Lighthouse en phrases simples, orientees
 * benefice, comprehensibles par un non-technicien. Fallback sur le titre FR
 * renvoye par l'API (locale=fr) pour les audits non listes ici.
 */
const ISSUE_LABELS: Record<string, string> = {
  "uses-optimized-images":
    "Vos images sont trop lourdes et ralentissent l'affichage de vos pages.",
  "modern-image-formats":
    "Vos images gagneraient à utiliser un format plus léger (WebP) pour charger plus vite.",
  "uses-responsive-images":
    "Des images plus grandes que nécessaire sont envoyées : elles pèsent inutilement sur le chargement.",
  "offscreen-images":
    "Les images hors écran se chargent trop tôt et retardent l'affichage du contenu visible.",
  "render-blocking-resources":
    "Des fichiers bloquent l'affichage : votre page met plus de temps à apparaître.",
  "unused-javascript":
    "Du code JavaScript inutile est chargé et ralentit votre site.",
  "unused-css-rules":
    "Du style (CSS) inutilisé est chargé pour rien et alourdit vos pages.",
  "unminified-javascript":
    "Vos fichiers JavaScript ne sont pas compressés au minimum, ce qui ralentit le chargement.",
  "unminified-css":
    "Vos fichiers de style ne sont pas compressés au minimum, ce qui ralentit le chargement.",
  "uses-text-compression":
    "La compression des fichiers n'est pas activée : vos pages sont plus lourdes à télécharger.",
  "server-response-time":
    "Votre serveur met trop de temps à répondre avant même d'afficher la page.",
  "total-byte-weight":
    "Vos pages sont globalement très lourdes, ce qui pénalise les connexions mobiles.",
  "uses-long-cache-ttl":
    "Les fichiers ne sont pas gardés en mémoire par le navigateur : tout se recharge à chaque visite.",
  "dom-size":
    "Vos pages contiennent trop d'éléments, ce qui les rend plus lentes à afficher.",
  redirects:
    "Des redirections inutiles ajoutent du délai avant d'arriver sur la bonne page.",
  "uses-rel-preconnect":
    "Les connexions aux services externes pourraient être anticipées pour gagner du temps.",
  "efficient-animated-content":
    "Des animations ou GIF lourds pourraient être remplacés par des vidéos plus légères.",
  "third-party-summary":
    "Des services externes (trackers, widgets) ralentissent votre site.",
  "color-contrast":
    "Certains textes manquent de contraste et sont difficiles à lire.",
  "image-alt":
    "Des images n'ont pas de description : un frein pour l'accessibilité et le référencement.",
  "link-name":
    "Certains liens n'ont pas de texte clair, ce qui gêne l'accessibilité.",
  "button-name":
    "Certains boutons n'ont pas de libellé clair pour les lecteurs d'écran.",
  "document-title":
    "Le titre de la page est absent ou peu clair pour Google.",
  "meta-description":
    "La description de la page (affichée dans Google) est manquante.",
  "link-text":
    "Certains liens ont un texte peu explicite (« cliquez ici »), peu utile pour le référencement.",
  "is-crawlable":
    "La page bloque l'indexation : Google risque de ne pas l'afficher dans ses résultats.",
  "tap-targets":
    "Sur mobile, certains boutons ou liens sont trop petits ou trop rapprochés pour être cliqués facilement.",
  viewport:
    "La page n'est pas correctement adaptée à l'affichage sur mobile.",
  "errors-in-console":
    "Des erreurs techniques se produisent en arrière-plan sur votre site.",
  "is-on-https":
    "Votre site n'est pas entièrement sécurisé en HTTPS.",
  "font-display":
    "Le texte reste invisible le temps que les polices se chargent.",
}

export class AuditError extends Error {
  readonly code: AuditErrorCode
  readonly status: number

  constructor(code: AuditErrorCode, message: string, status = 502) {
    super(message)
    this.name = "AuditError"
    this.code = code
    this.status = status
  }
}

type PsiAuditDetails = {
  type?: string
  overallSavingsMs?: number
}

type PsiAudit = {
  title?: string
  description?: string
  score: number | null
  scoreDisplayMode?: string
  displayValue?: string
  details?: PsiAuditDetails
}

type PsiAuditRef = {
  id: string
  weight: number
}

type PsiCategory = {
  score: number | null
  auditRefs?: PsiAuditRef[]
}

type PsiCategories = {
  performance?: PsiCategory
  seo?: PsiCategory
  accessibility?: PsiCategory
  "best-practices"?: PsiCategory
}

type PsiLighthouseResult = {
  categories?: PsiCategories
  audits?: Record<string, PsiAudit>
}

type PsiResponse = {
  lighthouseResult?: PsiLighthouseResult
}

const scoreToPercent = (score: number | null | undefined): number | null => {
  if (typeof score !== "number" || Number.isNaN(score)) return null
  return Math.round(score * 100)
}

const isSkippable = (audit: PsiAudit): boolean =>
  audit.scoreDisplayMode === "informative" ||
  audit.scoreDisplayMode === "notApplicable" ||
  audit.scoreDisplayMode === "manual"

const collectIssues = (lighthouse: PsiLighthouseResult): AuditIssue[] => {
  const audits = lighthouse.audits ?? {}
  const categories = lighthouse.categories ?? {}

  const weightById = new Map<string, number>()
  Object.values(categories).forEach((category) => {
    category?.auditRefs?.forEach((ref) => {
      const current = weightById.get(ref.id) ?? 0
      if (ref.weight > current) weightById.set(ref.id, ref.weight)
    })
  })

  type Candidate = { id: string; audit: PsiAudit; priority: number }
  const candidates: Candidate[] = []

  Object.entries(audits).forEach(([id, audit]) => {
    if (METRIC_AUDIT_IDS.has(id)) return
    if (isSkippable(audit)) return
    if (typeof audit.score !== "number") return
    if (audit.score >= PASS_THRESHOLD) return

    const savings = audit.details?.overallSavingsMs ?? 0
    const weight = weightById.get(id) ?? 0
    const priority =
      savings > 0
        ? 1_000_000 + savings
        : (1 - audit.score) * (weight + 1) * 100

    candidates.push({ id, audit, priority })
  })

  candidates.sort((a, b) => b.priority - a.priority)

  const issues: AuditIssue[] = []
  for (const candidate of candidates) {
    if (issues.length >= MAX_ISSUES) break
    const title = ISSUE_LABELS[candidate.id] ?? candidate.audit.title
    if (!title) continue
    issues.push({
      id: candidate.id,
      title,
      detail: candidate.audit.displayValue ?? null,
    })
  }

  return issues
}

const parseStrategyResult = (
  lighthouse: PsiLighthouseResult,
): AuditStrategyResult => {
  const categories = lighthouse.categories ?? {}
  const scores: AuditScores = {
    performance: scoreToPercent(categories.performance?.score),
    seo: scoreToPercent(categories.seo?.score),
    accessibility: scoreToPercent(categories.accessibility?.score),
    bestPractices: scoreToPercent(categories["best-practices"]?.score),
  }
  return { scores, issues: collectIssues(lighthouse) }
}

const buildRequestUrl = (
  targetUrl: string,
  strategy: AuditStrategy,
  key: string,
): string => {
  const params = new URLSearchParams()
  params.set("url", targetUrl)
  params.set("key", key)
  params.set("strategy", strategy)
  params.set("locale", "fr")
  PSI_CATEGORIES.forEach((category) => params.append("category", category))
  return `${PSI_ENDPOINT}?${params.toString()}`
}

export const runPageSpeed = async (
  targetUrl: string,
  strategy: AuditStrategy,
  key: string,
  signal: AbortSignal,
): Promise<AuditStrategyResult> => {
  let res: Response
  try {
    res = await fetch(buildRequestUrl(targetUrl, strategy, key), {
      signal,
      headers: { Accept: "application/json" },
    })
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new AuditError(
        "timeout",
        "L'analyse a pris trop de temps. Réessayez dans un instant.",
        504,
      )
    }
    throw new AuditError(
      "unreachable",
      "Impossible de contacter le service d'analyse. Réessayez dans un instant.",
      502,
    )
  }

  if (!res.ok) {
    if (res.status === 429) {
      throw new AuditError(
        "quota",
        "Le nombre d'analyses autorisées est atteint pour le moment. Réessayez dans quelques minutes.",
        429,
      )
    }
    if (res.status === 400 || res.status === 404 || res.status === 422) {
      throw new AuditError(
        "unreachable",
        "Ce site n'a pas pu être analysé. Vérifiez que l'adresse est correcte et que le site est en ligne.",
        422,
      )
    }
    throw new AuditError(
      "server",
      "Le service d'analyse a renvoyé une erreur. Réessayez dans un instant.",
      502,
    )
  }

  let json: PsiResponse
  try {
    json = (await res.json()) as PsiResponse
  } catch {
    throw new AuditError(
      "server",
      "Réponse inattendue du service d'analyse.",
      502,
    )
  }

  const lighthouse = json.lighthouseResult
  if (!lighthouse || !lighthouse.categories) {
    throw new AuditError(
      "unreachable",
      "Ce site n'a pas pu être analysé. Vérifiez que l'adresse est correcte et que le site est en ligne.",
      422,
    )
  }

  return parseStrategyResult(lighthouse)
}
