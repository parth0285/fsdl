const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Debugging: Log the API Key to check if it's loaded
console.log("API Key:", NEWS_API_KEY);

// Validate API Key at Startup
if (!NEWS_API_KEY) {
    console.error("❌ Missing NEWS_API_KEY in .env file");
    process.exit(1);
}

const allowedOrigins = [
    "https://crispy-fishstick-4jg669qq7wxv26xq-3000.app.github.dev",
    "https://crispy-fishstick-4jg669qq7wxv26xq-5000.app.github.dev"
];

// ✅ Explicitly allow all origins for testing (change later)
app.use((req, res, next) => {
    const origin = req.get("origin");
    if (!origin || allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin || "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    next();
});

// ✅ Handle Preflight CORS Requests Properly
app.options("*", (req, res) => {
    res.status(204).end();
});

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Stock Market News API");
});

// Fetch stock market news
app.get("/news", async (req, res) => {
    try {
        console.log("Fetching news..."); 
        console.log("Using API Key:", NEWS_API_KEY); // Debug API key

        const response = await axios.get("https://newsapi.org/v2/everything", {
            params: {
                q: "NSE OR BSE OR stock market India",
                language: "en",
                apiKey: NEWS_API_KEY
            },
        });

        console.log("News API Response:", response.data); // Debug API response

        if (!response.data.articles || response.data.articles.length === 0) {
            return res.status(404).json({ error: "No news articles found" });
        }

        res.json(response.data);
    } catch (error) {
        console.error("❌ Error fetching news:", error.response?.status, error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to fetch news" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
