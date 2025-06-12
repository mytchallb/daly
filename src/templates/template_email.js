// template_email.js

import fs from "fs"
import path from "path"

export function generateEmailTemplate(data) {
  const { weather, news, crypto, calendar, rss } = data
  const date = new Date().toISOString().split("T")[0]
  const sections = []

  // Only add sections that have data
  if (weather && weather.imageUrl) {
    sections.push(`
            <h2>Weather Forecast</h2>
            <img src="${weather.imageUrl}" alt="Weather Forecast" style="max-width: 100%; height: auto;">
        `)
  }
  if (news) {
    sections.push(`
            <h2>News Headlines</h2>
            <div>${news}</div>
        `)
  }
  if (crypto) {
    sections.push(`
            <h2>Bitcoin Price</h2>
            <div>${crypto}</div>
        `)
  }
  if (calendar) {
    sections.push(`
            <h2>Calendar Events</h2>
            <div>${calendar}</div>
        `)
  }
  if (rss) {
    sections.push(`
            <h2>RSS Feeds</h2>
            <div>${rss}</div>
        `)
  }

  const emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                h2 { color: #333; margin-top: 20px; }
                div { margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <h1>Daily Summary for ${date}</h1>
            ${sections.join("\n")}
        </body>
        </html>
    `.trim()

  // Log the email content to a file
  const logDir = path.join(process.cwd(), "logs")
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
  }
  const logFile = path.join(logDir, `email-${date}.html`)
  fs.writeFileSync(logFile, emailContent)

  return emailContent
}
