/**
 * Vérifie que l'orb n'est pas chargé sur mobile et l'est sur desktop.
 */
import { chromium, devices } from "playwright"

const base = process.argv[2] ?? "http://localhost:3003"

const browser = await chromium.launch({ headless: true })

const mobileContext = await browser.newContext({
  ...devices["iPhone 13"],
  reducedMotion: "no-preference",
})
const mobilePage = await mobileContext.newPage()
await mobilePage.goto(`${base}/`, { waitUntil: "networkidle", timeout: 90000 })
await mobilePage.waitForTimeout(2000)
const mobileCanvas = await mobilePage.locator("#top canvas").count()
await mobileContext.close()

const desktopContext = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  reducedMotion: "no-preference",
})
const desktopPage = await desktopContext.newPage()
await desktopPage.goto(`${base}/`, { waitUntil: "networkidle", timeout: 90000 })
await desktopPage.waitForTimeout(3000)
const desktopCanvas = await desktopPage.locator("#top canvas").count()
await desktopContext.close()

await browser.close()

const ok = mobileCanvas === 0 && desktopCanvas >= 1
const report = { base, mobileCanvas, desktopCanvas, ok }

console.log(JSON.stringify(report, null, 2))
process.exit(ok ? 0 : 1)
