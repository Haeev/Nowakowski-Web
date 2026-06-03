const AUDIT_TITLES_FR: Record<string, string> = {
  "meta-description":
    "Il manque une description qui aide Google à présenter votre site dans les résultats.",
  "link-text":
    "Certains liens ont un texte peu explicite (« cliquez ici »), peu utile pour le référencement.",
  charset:
    "L'encodage des caractères n'est pas correctement déclaré, ce qui peut provoquer des affichages incorrects.",
  redirects:
    "Des redirections inutiles ajoutent du délai avant d'arriver sur la bonne page.",
  "unused-javascript": "Du code inutile est chargé et ralentit votre site.",
  "color-contrast":
    "Certains textes manquent de contraste et sont difficiles à lire.",
  "document-title":
    "Le titre de la page n'est pas optimisé pour le référencement.",
  "image-alt": "Certaines images n'ont pas de description textuelle.",
  "crawlable-anchors": "Certains liens ne sont pas correctement détectés par Google.",
  "is-crawlable": "Google ne peut pas explorer correctement certaines pages.",
  "hreflang": "Les indications de langue pour Google sont incomplètes ou incorrectes.",
  "canonical": "La page canonique n'est pas correctement indiquée à Google.",
  "robots-txt": "Le fichier robots.txt bloque peut-être l'exploration de votre site.",
  "tap-targets":
    "Certains boutons ou liens sont trop petits ou trop proches sur mobile.",
  "font-size": "Le texte est trop petit sur mobile pour être lu confortablement.",
  "uses-long-cache-ttl":
    "Certaines ressources ne sont pas mises en cache assez longtemps.",
  "uses-optimized-images": "Certaines images pourraient être mieux compressées.",
  "uses-responsive-images":
    "Certaines images ne s'adaptent pas correctement aux écrans.",
  "largest-contentful-paint":
    "L'élément principal de la page met trop de temps à s'afficher.",
  "total-blocking-time":
    "La page reste bloquée trop longtemps avant d'être utilisable.",
  "cumulative-layout-shift":
    "Des éléments bougent pendant le chargement, ce qui gêne la lecture.",
  "speed-index": "La page met trop de temps à devenir visuellement complète.",
  "render-blocking-resources":
    "Certains fichiers bloquent l'affichage initial de la page.",
  "uses-text-compression":
    "Certaines ressources ne sont pas compressées, ce qui ralentit le chargement.",
  "uses-http2": "Le site pourrait mieux profiter des connexions modernes (HTTP/2).",
  "is-on-https": "Le site n'est pas entièrement servi en HTTPS sécurisé.",
  "errors-in-console": "Des erreurs techniques apparaissent dans la console du navigateur.",
  "valid-source-maps": "Des fichiers techniques de débogage posent problème.",
  "geolocation-on-start":
    "Le site demande la localisation dès l'arrivée, ce qui peut inquiéter les visiteurs.",
  "notification-on-start":
    "Le site demande des notifications dès l'arrivée, ce qui peut déranger.",
}

export const getAuditTitleFr = (
  auditId: string,
  fallbackTitle: string | undefined,
): string => {
  if (AUDIT_TITLES_FR[auditId]) return AUDIT_TITLES_FR[auditId]
  if (fallbackTitle?.trim()) return fallbackTitle.trim()
  return "Un point d'amélioration a été détecté sur votre site."
}
