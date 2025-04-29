var alertservice = require('../services/webhook')

module.exports = {
    create: async function (req, res) {
        try {
            var result = await alertservice.createAlert(req.body)
            res.send(result)
        } catch (err) {
            console.error(err);

            const statusCode = err.statusCode || 406;
            const message = err.message || "Something went wrong during creating alert.";

            res.status(statusCode).json({ error: message });
        }
    },
}