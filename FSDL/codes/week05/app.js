// app.js
import { fetchNews } from './newsAPI.js';
import { displayNews } from './display.js';

// Wait for the DOM content to be fully loaded before calling loadNews
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const articles = await fetchNews();
        console.log('Fetched articles:', articles);  // Debugging line to check the fetched articles
        displayNews(articles);
    } catch (error) {
        console.error('Error loading news:', error);  // Log any errors
    }
});
