import Sentiment from "sentiment";

const sentiment = new Sentiment();

export const analyzeSentiment = (text) => {
    const result = sentiment.analyze(text);
    if (result.score > 1) return { sentiment: "Positive", emoji: "📈" };
    if (result.score < -1) return { sentiment: "Negative", emoji: "📉" };
    return { sentiment: "Neutral", emoji: "😐" };
};
