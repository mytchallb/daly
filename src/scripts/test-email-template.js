import { generateEmailTemplate } from "../templates/template_email.js"
import config from "../config.js"

async function testEmailTemplate() {
  const weatherImageUrl = `${config.settings.appUrl}/assets/weather-tile.jpg`

  try {
    console.log("Testing email template generation...")
    const testData = {
      weather: {
        imageUrl: weatherImageUrl,
      },
      news: "Test news headline",
      crypto: "BTC: $50,000",
      calendar: "Test calendar event",
      rss: "Test RSS feed",
    }
    const result = generateEmailTemplate(testData)
    console.log("Email template generated successfully")
    console.log("Template preview:", result.substring(0, 200) + "...")
    process.exit(0)
  } catch (error) {
    console.error("Email template test failed:", error)
    process.exit(1)
  }
}

testEmailTemplate()
