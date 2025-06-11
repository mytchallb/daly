import config from "../config.js"

export async function getNews() {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.news.apiKey}`)
    const data = await response.json()
    return data.articles
      .slice(0, 5)
      .map((article) => `- ${article.title}`)
      .join("\n")
  } catch (error) {
    console.error("News API Error:", error.message)
    return "News data unavailable"
  }
}
