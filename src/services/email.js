import nodemailer from "nodemailer"
import config from "../config.js"
import { generateEmailTemplate } from "../templates/template_email.js"

export default class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport(config.smtp)
  }

  async sendDailySummary(data) {
    try {
      // If data contains html property, use it directly
      // Otherwise, generate template from the data
      const message = data.html || generateEmailTemplate(data)

      if (config.settings.sendEmail === "true") {
        await this.transporter.sendMail({
          from: config.email.from,
          to: config.email.to,
          subject: config.email.subject,
          html: message,
        })
        console.log("Daily summary email sent successfully!")
      } else {
        console.log("Config set to not send email, Daily summary email not sent!")
      }
    } catch (error) {
      console.error("Email Error:", error.message)
      throw error
    }
  }
}
