export async function getCryptoPrice() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
    const data = await response.json()
    return `BTC Price: $${data.bitcoin.usd.toLocaleString()}`
  } catch (error) {
    console.error("Crypto API Error:", error.message)
    return "Crypto data unavailable"
  }
}
