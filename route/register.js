var router = require('express').Router()
var registerController = require('../controller/registerController')

router.post('/register', registerController.register)

module.exports = { router }