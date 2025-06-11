import { google } from "googleapis"
import config from "../config.js"

export async function getCalendarEvents() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(config.calendar.credentials),
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    })

    const calendar = google.calendar({ version: "v3", auth })
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: now.toISOString(),
      timeMax: tomorrow.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    })

    return response.data.items.map((event) => `- ${event.summary} (${new Date(event.start.dateTime).toLocaleTimeString()})`).join("\n")
  } catch (error) {
    console.error("Calendar API Error:", error.message)
    return "Calendar data unavailable"
  }
}
