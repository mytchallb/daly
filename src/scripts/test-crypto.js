import { getCryptoPrice } from "../services/crypto.js"

async function testCrypto() {
  try {
    console.log("Testing crypto service...")
    const result = await getCryptoPrice()
    console.log("Crypto result:", result)
    process.exit(0)
  } catch (error) {
    console.error("Crypto test failed:", error)
    process.exit(1)
  }
}

testCrypto()
