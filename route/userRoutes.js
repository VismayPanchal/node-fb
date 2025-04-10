var router = require('express').Router()
var userController = require('../controller/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = { router }