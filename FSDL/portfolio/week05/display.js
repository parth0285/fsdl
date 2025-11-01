// display.js
export function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) {
        console.error('News container not found');
        return;
    }

    newsContainer.innerHTML = ''; // Clear previous news

    // Check if articles exist and are valid
    if (!articles || articles.length === 0) {
        console.log('No news articles found');
        newsContainer.innerHTML = '<p>No news articles available.</p>';
        return;
    }

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        // Check if article has an image and create an img element
        if (article.image || article.imageUrl) {
            const image = document.createElement('img');
            image.src = article.image || article.imageUrl; // Use imageUrl if image is not available
            image.alt = article.title;
            image.classList.add('news-image');
            newsCard.appendChild(image);
        }

        const title = document.createElement('h3');
        title.textContent = article.title;
        newsCard.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description || 'No description available';
        newsCard.appendChild(description);

        const link = document.createElement('a');
        link.href = article.url;
        link.target = '_blank';
        link.textContent = 'Read more';
        newsCard.appendChild(link);

        newsContainer.appendChild(newsCard);
    });
}
