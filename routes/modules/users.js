const express = require('express')
// const { body, validationResult  } = require('express-validator')
const { body } = require('express-validator')
const registerAuth = require('../../middleware/registerAuth')
const passport = require('passport')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', [
  // check('password', 'The password must be at least 8 characters, and must contain a symbol')
  body('name')
    .trim() // 去除空白的 Sanitizer
    .isLength({ min: 1 }) // 長度至少 > 0
    .withMessage('名字不可輸入空白 !'), // 驗證失敗的客製化訊息
  body('password') 
    .trim() 
    .isLength({ min: 5 }) 
    // .matches(/[-_$#]/)
    .withMessage('密碼長度至少需要5個字元 !'), 
  body('confirmPassword') 
    .trim() 
    .custom((confirmPassword, { req }) => { // 加入客製化驗證函式，並保留請求 req 做後續使用
      if (confirmPassword !== req.body.password) { // 確認密碼欄位的值需要和密碼欄位的值相符
        throw new Error('兩次輸入的密碼不相同') // 驗證失敗時的錯誤訊息
      }
      return true // 成功驗證回傳 true
    })
], registerAuth)

module.exports = router

// routes/modules/users.js
