const { randomUUID } = require("crypto");

module.exports = (req, res, next) => {

    let sessionId =
        req.body.CallSid ||            // Twilio
        req.headers["x-session-id"];  // Postman / Frontend

    if (!sessionId) {
        sessionId = randomUUID();
    }

    req.sessionId = sessionId;

    res.setHeader("x-session-id", sessionId);

    next();
};