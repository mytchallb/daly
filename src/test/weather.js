import puppeteer from "puppeteer"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function screenshotElement() {
  // Create assets directory if it doesn't exist
  const assetsDir = path.join(__dirname, "assets")
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir)
  }

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setViewport({ width: 1280, height: 800 })
  await page.goto("https://www.metservice.com/towns-cities/regions/christchurch/locations/christchurch/7-days")

  // Wait for the element to load
  await page.waitForSelector('.Tile[data-module-name="city-forecast-tab-large"]')

  // Find the element and screenshot it
  const element = await page.$('.Tile[data-module-name="city-forecast-tab-large"]')
  await element.screenshot({ path: path.join(assetsDir, "weather-tile.png") })

  await browser.close()
}

screenshotElement()
