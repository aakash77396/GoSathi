const { extractIntent } = require("../services/ai/openai");
const { searchTrains, formatTrainList } = require("../services/train/trainService");
const { saveConversation, getConversation } = require("../services/redis/conversationCache");

exports.receiveCall = async (req, res) => {

    const aiResult = await extractIntent(req.body.speech);

    if (aiResult.intent === "TRAIN_SEARCH") {

        const cache = await getConversation(req.sessionId);

        if (
            cache &&
            cache.query.from.code === aiResult.from.code &&
            cache.query.to.code === aiResult.to.code
        ) {
            console.log("✅ Data from Redis");

            const formatted = formatTrainList({ data: { trains: cache.trains } });

            return res.json({ formatted });
        }

        console.log("🌐 Data from API");

        const trains = await searchTrains(aiResult.from.code, aiResult.to.code, aiResult.date);

        await saveConversation(req.sessionId, {
            query: aiResult,
            trains: trains.data.trains
        });

        const formatted = formatTrainList(trains);

        return res.status(200).json({
            formatted
        });
    }

    res.json(aiResult);
}
