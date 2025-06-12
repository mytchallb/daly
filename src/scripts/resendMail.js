// resend mail from log file (get latest file)

import fs from "fs"
import path from "path"
import EmailService from "../services/email.js"

async function resendLatestEmail() {
  try {
    // Get the logs directory
    const logDir = path.join(process.cwd(), "logs")

    // Check if logs directory exists
    if (!fs.existsSync(logDir)) {
      throw new Error("Logs directory not found")
    }

    // Get all email log files
    const logFiles = fs
      .readdirSync(logDir)
      .filter((file) => file.startsWith("email-") && file.endsWith(".html"))
      .sort()
      .reverse() // Sort in descending order to get the latest file first

    if (logFiles.length === 0) {
      throw new Error("No email log files found")
    }

    // Get the latest log file
    const latestLogFile = logFiles[0]
    const logFilePath = path.join(logDir, latestLogFile)

    // Read the email content
    const emailContent = fs.readFileSync(logFilePath, "utf-8")

    // Initialize email service and send the email
    const emailService = new EmailService()
    await emailService.sendDailySummary({
      html: emailContent,
    })

    console.log(`Successfully resent email from ${latestLogFile}`)
  } catch (error) {
    console.error("Failed to resend email:", error.message)
    process.exit(1)
  }
}

// Run the function
resendLatestEmail()
