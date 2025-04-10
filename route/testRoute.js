var router = require('express').Router()
var registerController = require('../controller/userController')
var verifyFirebaseToken = require('../middleware/validateuser')

router.get('/testRoute', registerController.huhu)

module.exports = { router }