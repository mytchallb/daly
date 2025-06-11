import 'dotenv/config';

export default {
    email: {
        to: process.env.EMAIL_TO,
        from: process.env.EMAIL_FROM,
        subject: `Daily Summary - ${new Date().toISOString().split('T')[0]}`,
        domain: process.env.EMAIL_DOMAIN
    },
    news: {
        apiKey: process.env.NEWS_API_KEY
    },
    calendar: {
        credentials: process.env.GOOGLE_CREDENTIALS
    },
    freshrss: {
        baseUrl: process.env.FRESHRSS_URL,
        apiKey: process.env.FRESHRSS_API_KEY,
        userId: process.env.FRESHRSS_USER_ID
    },
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    },
    settings: {
        sendEmail: process.env.SEND_EMAIL
    }
}; 



