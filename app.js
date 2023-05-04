const express = require('express')
const routes = require('./routes')
const methodOverride = require("method-override")
const exphbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
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

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.login_error = req.flash('error')
  next()
})
app.use(routes)

app.listen(PORT, () => {
  console.log(`The express server is listening on http://localhost:${PORT}`)
})
