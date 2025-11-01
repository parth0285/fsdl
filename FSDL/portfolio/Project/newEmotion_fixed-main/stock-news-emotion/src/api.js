import axios from "axios";

// Use environment variables for flexibility
const API_URL = process.env.REACT_APP_API_URL || "https://crispy-fishstick-4jg669qq7wvx26xq-5000.app.github.dev/news";

export const fetchNews = async () => {
    try {
        const response = await axios.get(API_URL);

        // Ensure response data exists and contains articles
        if (!response.data || typeof response.data !== "object" || !Array.isArray(response.data.articles)) {
            throw new Error("Invalid response structure: Expected an object with an 'articles' array.");
        }

        return response.data.articles;
    } catch (error) {
        console.error("⚠️ Error fetching news:", error.response?.data || error.message);
        
        // Return an empty array to prevent breaking the UI
        return [];
    }
};
