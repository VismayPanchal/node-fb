const admin = require("./auth");

const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded; // Pass user info to the next middleware
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = verifyFirebaseToken;
