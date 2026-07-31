require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function extractIntent(text) {
    const response = await client.responses.create({
        model: "gpt-5-mini",
        input: `
        You are an AI for an Indian railway voice assistant.

        Return ONLY valid JSON.
        Allowed intents:
        - TRAIN_SEARCH
        - LIVE_STATUS
        - PNR_STATUS
        - TRAIN_ROUTE
        - PLATFORM
        - UNKNOWN

        If the user wants to travel from one place to another, use TRAIN_SEARCH.

        User:"${text}"

        Extract:
        - intent
        - from:{"name": , "code": } like for Begusarai code "BGS", for Patna code "PNBE"
        - to:{"name": , "code": } like for Begusarai code "BGS", for Patna code "PNBE"
        - trainNumber
        - pnr
        - date
        `
    });

    return JSON.parse(response.output_text);
}

module.exports = { extractIntent };