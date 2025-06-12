# Daly

Your personalised daily email summary.

Send a quick overview of the weather, news headlines, favourite blog posts, crypto prices and weekly calender events.

A simple Node.js app which can be set up to run as a CRON job.

## Installation

Copy the `.env.example` into an `.env` file and set up your defaults.

Run `npm i` then `npm run start` to run the app.

It can take a while to send the email and return a response.

## Development


## Testing

```bash
npm run test:weather
npm run test:rss
npm run test:news
npm run test:crypto
npm run test:calendar
npm run test:email-template
npm run test:send-email

#or
npm run test:all
```