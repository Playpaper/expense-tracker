const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const expense = require('./modules/expense')
const search = require('./modules/search')
const auth = require('./modules/auth')  
const { authenticator } = require('../middleware/loginAuth')

router.use('/expense',authenticator , expense) // 加入驗證程序
router.use('/search',authenticator , search) // 加入驗證程序
router.use('/auth', auth) 
router.use('/users', users)
router.use('/',authenticator, home) // 加入驗證程序

module.exports = router
