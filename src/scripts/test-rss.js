import { getRssFeeds } from "../services/rss.js"

async function testRss() {
  try {
    console.log("Testing RSS service...")
    const result = await getRssFeeds()
    console.log("RSS result:", result)
    process.exit(0)
  } catch (error) {
    console.error("RSS test failed:", error)
    process.exit(1)
  }
}

testRss()
