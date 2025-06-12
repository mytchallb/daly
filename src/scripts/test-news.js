import { getNews } from "../services/news.js"

async function testNews() {
  try {
    console.log("Testing news service...")
    const result = await getNews()
    console.log("News result:", result)
    process.exit(0)
  } catch (error) {
    console.error("News test failed:", error)
    process.exit(1)
  }
}

testNews()
