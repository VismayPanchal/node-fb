var router = require('express').Router()
var registerController = require('../controller/registerController')

router.post('/testRoute', registerController.huhu)

module.exports = { router }