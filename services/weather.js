import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getWeather() {
    try {
        // Create assets directory if it doesn't exist
        const assetsDir = path.join(__dirname, '..', 'public', 'assets');
        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
        }

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto('https://www.metservice.com/towns-cities/regions/christchurch/locations/christchurch/7-days');
        
        // Wait for the element to load
        await page.waitForSelector('.Tile[data-module-name="city-forecast-tab-large"]');
        
        // Find the element and screenshot it
        const element = await page.$('.Tile[data-module-name="city-forecast-tab-large"]');
        const screenshotPath = path.join(assetsDir, 'weather-tile.png');
        await element.screenshot({ path: screenshotPath });
        
        await browser.close();
        
        return `Weather forecast screenshot saved to: ${screenshotPath}`;
    } catch (error) {
        console.error('Weather Screenshot Error:', error.message);
        return 'Weather data unavailable';
    }
}

export { getWeather }; 