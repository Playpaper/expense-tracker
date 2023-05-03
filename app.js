const express = require('express')
const routes = require('./routes')
const exphbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
require('./config/mongoose')
const app = express()
const PORT = 3000

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsExpenseSecret',
  resave: false,
  saveUninitialized:true
}))

usePassport(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use((req, res, next) => {
  console.log('req.user = ', req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)


app.listen(PORT, () => {
  console.log(`The express server is listening on http://localhost:${PORT}`)
})

// app.use((req, res, next) => {
//   // 你可以在這裡 console.log(req.user) 等資訊來觀察
//   res.locals.isAuthenticated = req.isAuthenticated()
//   res.locals.user = req.user
//   next()
// })
// 使用 app.use 代表這組 middleware 會作用於所有的路由，裡面我們設定了兩個本地變數：

// res.locals.isAuthenticated：把 req.isAuthenticated() 回傳的布林值，交接給 res 使用
// res.locals.user：把使用者資料交接給 res 使用
// 要交接給 res，我們才能在前端樣板裡使用這些資訊。