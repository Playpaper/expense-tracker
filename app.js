const express = require('express')
const routes = require('./routes')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const app = express()
const PORT = 3000

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.set('view engine', 'hbs')

app.use(routes)


app.listen(PORT, () => {
  console.log(`The express server is listening on http://localhost:${PORT}`)
})
