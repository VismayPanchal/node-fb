var registerservice = require('../services/register')

module.exports = {
    register: async function (req, res) {
        var result = await registerservice.register(req.body)
        res.send(result)
    },
    huhu: async function (req, res) {
        res.send({ message: "hhuu" })
    }
}