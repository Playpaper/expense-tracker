const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const expenses = require('./modules/expenses')

router.use('/expenses', expenses)
router.use('/users', users)
router.use('/', home)

module.exports = router