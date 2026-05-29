/**
 * Audits qui sont de purs indicateurs de mesure (pas des actions concretes).
 * On les exclut des listes de problemes pour ne montrer que des actions actionnables.
 */
export const METRIC_AUDIT_IDS = new Set<string>([
  "first-contentful-paint",
  "largest-contentful-paint",
  "first-meaningful-paint",
  "speed-index",
  "interactive",
  "total-blocking-time",
  "cumulative-layout-shift",
  "max-potential-fid",
  "experimental-interaction-to-next-paint",
  "interaction-to-next-paint",
])

/**
 * Traduction des audits Lighthouse en phrases simples, orientees benefice,
 * comprehensibles par un non-technicien. Fallback sur le titre FR de PSI.
 */
export const ISSUE_LABELS: Record<string, string> = {
  "uses-optimized-images":
    "Vos images sont trop lourdes et ralentissent l'affichage de vos pages.",
  "modern-image-formats":
    "Vos images gagneraient à utiliser un format plus léger (WebP) pour charger plus vite.",
  "uses-responsive-images":
    "Vos images sont plus grandes que nécessaire et alourdissent le chargement.",
  "offscreen-images":
    "Les images hors écran se chargent trop tôt et retardent l'affichage du contenu visible.",
  "render-blocking-resources":
    "Des éléments bloquent l'affichage et retardent l'apparition de votre page.",
  "unused-javascript":
    "Du code inutile est chargé et ralentit votre site.",
  "legacy-javascript":
    "Votre site charge du code ancien qui pourrait être allégé pour gagner en vitesse.",
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
  "duplicated-javascript":
    "Du code JavaScript est chargé plusieurs fois inutilement, ce qui alourdit vos pages.",
  "unsized-images":
    "Certaines images n'ont pas de dimensions définies, ce qui provoque des sauts de mise en page.",
  "bootup-time":
    "Le temps de démarrage du JavaScript est trop long et retarde l'affichage de la page.",
  "mainthread-work-breakdown":
    "Le navigateur est surchargé au chargement, ce qui ralentit l'affichage de votre site.",
  "no-document-write":
    "Des scripts utilisent une méthode obsolète qui bloque l'affichage de la page.",
  "color-contrast":
    "Certains textes manquent de contraste et sont difficiles à lire.",
  "image-alt":
    "Certaines images n'ont pas de texte alternatif, important pour Google et l'accessibilité.",
  "link-name":
    "Certains liens ne sont pas explicites, ce qui gêne Google et les lecteurs d'écran.",
  "button-name":
    "Certains boutons n'ont pas de libellé clair pour les lecteurs d'écran.",
  "document-title":
    "Le titre de votre page n'est pas optimisé pour les moteurs de recherche.",
  "meta-description":
    "Il manque une description qui aide Google à présenter votre site dans les résultats.",
  "link-text":
    "Certains liens ont un texte peu explicite (« cliquez ici »), peu utile pour le référencement.",
  "is-crawlable":
    "La page bloque l'indexation : Google risque de ne pas l'afficher dans ses résultats.",
  "crawlable-anchors":
    "Certains liens ne sont pas correctement configurés pour que Google les suive.",
  "robots-txt":
    "Le fichier robots.txt pourrait bloquer l'exploration de certaines pages par Google.",
  hreflang:
    "Les balises de langue ne sont pas correctement configurées pour le référencement international.",
  canonical:
    "La page n'indique pas clairement quelle est sa version principale pour Google.",
  "structured-data":
    "Les données structurées sont absentes ou incorrectes, ce qui limite votre visibilité dans Google.",
  "tap-targets":
    "Certains boutons sont trop petits ou trop rapprochés pour être cliqués facilement sur mobile.",
  viewport:
    "La page n'est pas correctement adaptée à l'affichage sur mobile.",
  "heading-order":
    "La hiérarchie des titres de la page n'est pas logique, ce qui complique la lecture.",
  "html-has-lang":
    "La langue de la page n'est pas indiquée, ce qui gêne Google et les lecteurs d'écran.",
  label:
    "Certains champs de formulaire n'ont pas de libellé clair, ce qui complique leur utilisation.",
  "errors-in-console":
    "Des erreurs techniques se produisent en arrière-plan sur votre site.",
  "is-on-https":
    "Votre site n'est pas entièrement sécurisé en HTTPS.",
  "font-display":
    "Le texte reste invisible le temps que les polices se chargent.",
  deprecations:
    "Votre site utilise des technologies obsolètes qui pourraient poser problème à terme.",
  "csp-xss":
    "La protection contre les failles de sécurité (XSS) n'est pas correctement configurée.",
  doctype:
    "La page n'utilise pas le format HTML moderne attendu par les navigateurs.",
  charset:
    "L'encodage des caractères n'est pas correctement déclaré, ce qui peut provoquer des affichages incorrects.",
  "geolocation-on-start":
    "Votre site demande la localisation dès l'arrivée, ce qui peut inquiéter les visiteurs.",
  "notification-on-start":
    "Votre site demande l'autorisation de notifications dès l'arrivée, ce qui peut agacer les visiteurs.",
  "paste-preventing-inputs":
    "Certains champs empêchent le copier-coller, ce qui complique l'utilisation du site.",
  "accesskeys":
    "Des raccourcis clavier peuvent entrer en conflit avec ceux du navigateur.",
  "aria-allowed-attr":
    "Certains attributs d'accessibilité ne sont pas utilisés correctement.",
  "aria-required-attr":
    "Des éléments interactifs manquent d'attributs d'accessibilité obligatoires.",
  "aria-valid-attr-value":
    "Certaines valeurs d'accessibilité sont incorrectes.",
  "bypass":
    "Il manque un lien pour sauter directement au contenu principal de la page.",
  "form-field-multiple-labels":
    "Certains champs de formulaire ont plusieurs libellés, ce qui crée de la confusion.",
  "frame-title":
    "Certaines fenêtres intégrées n'ont pas de titre, ce qui gêne les lecteurs d'écran.",
  "input-image-alt":
    "Des boutons-image n'ont pas de description textuelle.",
  list:
    "La structure de certaines listes n'est pas correcte, ce qui complique la lecture.",
  listitem:
    "Certains éléments de liste ne sont pas correctement structurés.",
  "meta-refresh":
    "La page utilise une redirection automatique, ce qui nuit au référencement.",
  "object-alt":
    "Certains éléments multimédias n'ont pas de description textuelle.",
  tabindex:
    "L'ordre de navigation au clavier n'est pas optimal sur votre site.",
  "td-headers-attr":
    "Certaines tableaux de données ne sont pas correctement structurés pour l'accessibilité.",
  "th-has-data-cells":
    "Certaines tableaux manquent de liens entre en-têtes et cellules de données.",
  "valid-lang":
    "La langue indiquée sur certains éléments de la page est incorrecte.",
  "video-caption":
    "Certaines vidéos n'ont pas de sous-titres, ce qui limite l'accessibilité.",
  "video-description":
    "Certaines vidéos n'ont pas de description audio pour les personnes malvoyantes.",
  "lcp-lazy-loaded":
    "L'image principale de la page est chargée en différé, ce qui retarde l'affichage.",
  "prioritize-lcp-image":
    "L'image principale de la page n'est pas chargée en priorité.",
  "uses-passive-event-listeners":
    "Certains scripts ralentissent le défilement de la page sur mobile.",
  "inspector-issues":
    "Des problèmes techniques ont été détectés dans le code de votre site.",
  "valid-source-maps":
    "Des fichiers de débogage sont exposés publiquement, ce qui peut révéler du code interne.",
  "password-inputs-can-be-pasted-into":
    "Les champs de mot de passe empêchent le copier-coller, ce qui complique la saisie.",
  "image-size-responsive":
    "Certaines images ne s'adaptent pas correctement à la taille de l'écran.",
  "preload-lcp-image":
    "L'image principale de la page pourrait être préchargée pour un affichage plus rapide.",
}

export const translateIssue = (
  id: string,
  fallbackTitle?: string,
): string | null => {
  const mapped = ISSUE_LABELS[id]
  if (mapped) return mapped
  if (fallbackTitle && fallbackTitle.trim() !== "") return fallbackTitle.trim()
  return null
}
