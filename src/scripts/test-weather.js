import { getWeather } from "../services/weather.js"

async function testWeather() {
  try {
    console.log("Testing weather service...")
    const result = await getWeather()
    console.log("Weather result:", result)
    process.exit(0)
  } catch (error) {
    console.error("Weather test failed:", error)
    process.exit(1)
  }
}

testWeather()
