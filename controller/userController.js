var registerservice = require('../services/register')

module.exports = {
    register: async function (req, res) {
        try {
            var result = await registerservice.register(req.body)
            res.send(result)
        } catch (err) {
            console.error(err);

            const statusCode = err.statusCode || 406;
            const message = err.message || "Something went wrong during registration.";

            res.status(statusCode).json({ error: message });
        }
    },
    login: async function (req, res) {
        try {
            var result = await registerservice.login(req)
            res.send(result)
        } catch (err) {
            console.error(err);

            const statusCode = err.statusCode || 406;
            const message = err.message || "Something went wrong during login.";

            res.status(statusCode).json({ error: message });
        }
    },
    huhu: async function (req, res) {
        res.send({ message: "hhuu" })
    }
}