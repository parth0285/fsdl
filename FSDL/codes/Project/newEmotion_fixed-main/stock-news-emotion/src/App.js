import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fetchNews } from "./api"; // Ensure this file exists and exports fetchNews
import Home from "./pages/Home";
import NewsList from "./components/NewsList"; // Import NewsList component

const App = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNews = async () => {
            try {
                if (!fetchNews) {
                    throw new Error("fetchNews is not defined.");
                }
                const data = await fetchNews();
                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format received.");
                }
                setNews(data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError(err.message);
            }
        };
        getNews();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<NewsList />} />
            </Routes>

            <div>
                <h1>Stock Market News</h1>
                {error ? (
                    <p style={{ color: "red" }}>Error: {error}</p>
                ) : (
                    <ul>
                        {news.length > 0 ? (
                            news.map((article, index) => (
                                <li key={index}>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                                        {article.title}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <p>Loading news...</p>
                        )}
                    </ul>
                )}
            </div>
        </Router>
    );
};

export default App;
