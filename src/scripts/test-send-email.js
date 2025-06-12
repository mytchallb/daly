import EmailService from "../services/email.js"
import fs from "fs"
import path from "path"

async function testSendEmail() {
  try {
    console.log("Testing email sending...")
    const logDir = path.join(process.cwd(), "logs")
    const logFiles = fs
      .readdirSync(logDir)
      .filter((file) => file.startsWith("email-") && file.endsWith(".html"))
      .sort()
      .reverse()

    if (logFiles.length === 0) {
      throw new Error("No email log files found")
    }

    const latestLogFile = logFiles[0]
    const logFilePath = path.join(logDir, latestLogFile)
    const emailContent = fs.readFileSync(logFilePath, "utf-8")

    const emailService = new EmailService()
    await emailService.sendDailySummary({
      html: emailContent,
    })

    console.log(`Finished test email function`)
    process.exit(0)
  } catch (error) {
    console.error("Email sending test failed:", error)
    process.exit(1)
  }
}

testSendEmail()
