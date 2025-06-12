import { getCalendarEvents } from "../services/calendar.js"

async function testCalendar() {
  try {
    console.log("Testing calendar service...")
    const result = await getCalendarEvents()
    console.log("Calendar result:", result)
    process.exit(0)
  } catch (error) {
    console.error("Calendar test failed:", error)
    process.exit(1)
  }
}

testCalendar()
