const redis = require("../redis/redisClient");

async function saveConversation(sessionId, data) {
    console.log("Saving Key:", `call:${sessionId}`);
    await redis.set(
        `call:${sessionId}`,
        JSON.stringify(data),
        {
            EX: 900 //15 Min
        }
    );
}

async function getConversation(sessionId) {

    console.log("Getting Key:", `call:${sessionId}`);
    const data = await redis.get(`call:${sessionId}`);

    if (!data) return null;

    return JSON.parse(data);
}

async function deleteConversation(sessionId) {
    await redis.del(`call:${sessionId}`);
}

module.exports = {
    saveConversation,
    getConversation,
    deleteConversation
};