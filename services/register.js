const admin = require('../middleware/auth')


module.exports = {
    register: async function (data) {
        const { email, password } = data;

        if (!email || !password) {
            const error = new Error("Invalid email or password provided");
            error.status = 400;
            throw error;
        }

        try {
            const userRecord = await admin.auth().createUser(data);
            return userRecord;
        } catch (err) {
            const error = new Error(err.message || "Error creating user");
            error.status = 409;
            throw error;
        }
    },
    login: async function (req, res) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                const error = new Error("No token provided");
                error.status = 401;
                throw error;
            }

            const idToken = authHeader.split(" ")[1];

            const decodedToken = await admin.auth().verifyIdToken(idToken);

            // You now have the user info
            const uid = decodedToken.uid;

            return res.status(200).json({
                message: "Login successful",
                uid,
                email: decodedToken.email,
            });
        } catch (err) {
            console.error("Login error:", err);
            const error = new Error(err.message || "Invalid or expired token");
            error.status = 401;
            throw error;

        }
    }

}