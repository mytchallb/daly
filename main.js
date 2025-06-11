import 'dotenv/config';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import config from './config.js';
import { getWeather } from './services/weather.js';
import { getNews } from './services/news.js';
import { getCryptoPrice } from './services/crypto.js';
import { getCalendarEvents } from './services/calendar.js';
import { getRssFeeds } from './services/rss.js';
import EmailService from './services/email.js';

async function generateDailySummary() {
    try {
        // Implement services one at a time
        // const weather = await getWeather();
        const weather = "weather test";
        // const news = await getNews();
        // const crypto = await getCryptoPrice();
        // const calendar = await getCalendarEvents();
        // const rss = await getRssFeeds();

        const emailService = new EmailService();
        await emailService.sendDailySummary({
            weather,
            // news,
            // crypto,
            // calendar,
            // rss
        });
    } catch (error) {
        console.error('Failed to generate daily summary:', error.message);
        process.exit(1);
    }
}

// Run the daily summary
generateDailySummary();
