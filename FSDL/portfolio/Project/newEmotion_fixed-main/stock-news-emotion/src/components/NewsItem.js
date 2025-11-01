import React from "react";

const NewsItem = ({ article, sentiment }) => {
    return (
        <div className="news-item">
            <h3>{article?.title || 'No Title Available'} {sentiment.emoji}</h3>
            <p>{article?.description || 'No Description Available'}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
            </a>
        </div>
    );
};

export default NewsItem;
