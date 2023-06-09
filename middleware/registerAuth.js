const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = registerAuth = (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = validationResult(req) // 從請求中提取所有錯誤訊息，並將回傳的 Result 物件存在 errors 變數中
  
  if (!errors.isEmpty()) { // 如果有錯誤訊息＝驗證失敗
    // 顯示驗證失敗的代號 422，渲染註冊頁面、錯誤訊息，並保留原本的使用者輸入
    return res.render('register', { ...req.body, register_msg: errors.array() })
    // return res.status(422).render('register', { ...req.body, register_msg: errors.array() })
  }

  // 如果沒有錯誤訊息＝驗證成功，新增一筆使用者 Document 到 users collection 中
  User.findOne({ email })
    .then(user => {
      if(user) {
        const register_msg = [{ msg: 'The email is already existed !' }]
        res.render('register', {...req.body, register_msg })
      }
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({name, email, password: hash })
        .then(() => res.redirect('/'))
        .catch(console.error))
    })
    .catch(console.error)
}

// 將回傳的 Result 物件存在 errors 變數中
// const errors = validationResult(req)

// 印出 Result 物件
// Result {
//  formatter: [Function: formatter],
//  errors:
//   [ 
//     { value: '', msg: '名字必填，且不能是空格', param: 'name', location: 'body' },
//     { value: '', msg: '密碼必填，且至少需要五位', param: 'password', location: 'body' } 
//   ] 
//}