import config from '../config.js';

export async function getRssFeeds() {
    try {
        const response = await fetch(
            `${config.freshrss.baseUrl}/api/greader.php/stream/contents?output=json&n=20&c=${config.freshrss.apiKey}&u=${config.freshrss.userId}`
        );
        const data = await response.json();

        // Group articles by feed
        const feedGroups = {};
        data.items.forEach(item => {
            const feedTitle = item.origin.title;
            if (!feedGroups[feedTitle]) {
                feedGroups[feedTitle] = [];
            }
            feedGroups[feedTitle].push(item);
        });

        // Format the output
        return Object.entries(feedGroups)
            .map(([feedTitle, articles]) => {
                const topArticles = articles
                    .slice(0, 3)
                    .map(article => `- ${article.title}`)
                    .join('\n');
                return `\n${feedTitle}:\n${topArticles}`;
            })
            .join('\n');
    } catch (error) {
        console.error('FreshRSS API Error:', error.message);
        return 'RSS feeds unavailable';
    }
}

