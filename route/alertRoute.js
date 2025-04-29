var router = require('express').Router()
var alertController = require('../controller/alertController')

router.post('/create', alertController.create)

module.exports = { router }