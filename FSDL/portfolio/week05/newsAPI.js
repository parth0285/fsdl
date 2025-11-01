// newsAPI.js
const apiKey = 'hWxBCJtb7m1aPy0QreUSPmI6cPFelMIhqvm_WN3y64ScZLkg'; // Replace with your CurrentsAPI key

export async function fetchNews() {
    const url = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`;
    const response = await fetch(url);
    
    // Check if the response is successful
    if (!response.ok) {
        throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    return data.news;  // Adjusted based on the structure of the response from CurrentsAPI
}
