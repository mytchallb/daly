import puppeteer from "puppeteer"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"
import sharp from "sharp"

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function getWeather() {
  try {
    // Create assets directory if it doesn't exist
    const assetsDir = path.join(process.cwd(), "public", "assets")
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true })
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })
    const page = await browser.newPage()

    // Set longer timeouts
    await page.setDefaultNavigationTimeout(60000) // 60 seconds
    await page.setDefaultTimeout(60000)

    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto("https://www.metservice.com/towns-cities/regions/christchurch/locations/christchurch/7-days", {
      waitUntil: "networkidle0",
      timeout: 60000,
    })

    // Wait for the element to load
    await page.waitForSelector('.Tile[data-module-name="city-forecast-tab-large"]')

    // Find the element and screenshot it
    const element = await page.$('.Tile[data-module-name="city-forecast-tab-large"]')
    const screenshotPath = path.join(assetsDir, "weather-tile.jpg")

    // Get the screenshot as a buffer
    const screenshotBuffer = await element.screenshot({
      type: "jpeg",
      quality: 80, // Value between 0-100
    })

    // Optimize the image using Sharp
    const optimizedBuffer = await sharp(screenshotBuffer)
      .jpeg({
        quality: 80,
        mozjpeg: true, // Use mozjpeg for better compression
        chromaSubsampling: "4:2:0", // Reduces color information
      })
      .toBuffer()

    // Save the file
    fs.writeFileSync(screenshotPath, optimizedBuffer)

    await browser.close()

    return {
      filePath: screenshotPath,
      imageUrl: `${process.env.APP_URL}/assets/weather-tile.jpg`,
    }
  } catch (error) {
    console.error("Weather Screenshot Error:", error.message)
    return "Weather data unavailable"
  }
}

export { getWeather }
