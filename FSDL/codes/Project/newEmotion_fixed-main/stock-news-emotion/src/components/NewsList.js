import React, { useEffect, useState } from "react";
import { fetchNews } from "../api"; // ✅ Corrected import
import { analyzeSentiment } from "./SentimentAnalyzer";
import NewsItem from "./NewsItem";

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNews = async () => {
            try {
                const articles = await fetchNews(); // ✅ Changed 'fetchStockNews()' to 'fetchNews()'
                console.log("Fetched News Articles:", articles);

                if (!articles || articles.length === 0) {
                    throw new Error("No news articles found.");
                }

                setNews(articles);
            } catch (err) {
                console.error("⚠️ Error fetching news:", err);
                setError(err.message || "Failed to load news.");
            } finally {
                setLoading(false);
            }
        };

        getNews();
    }, []);

    if (loading) return <p>Loading news...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Stock Market News (NSE & BSE)</h2>
            {news.map((article, index) => {
                const sentiment = analyzeSentiment(article.title);
                return <NewsItem key={index} article={article} sentiment={sentiment} />;
            })}
        </div>
    );
};

export default NewsList;
