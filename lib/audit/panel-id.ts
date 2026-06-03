import type { AuditCategory } from "./types"

export const getAuditPanelId = (category: AuditCategory): string =>
  `audit-panel-${category}`
