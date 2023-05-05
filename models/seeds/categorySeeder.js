const db = require('../../config/mongoose')
const Category = require('../category')
const seedCategory = require('./category.json')

db.once('open', () => {
  Promise.all(seedCategory.map(item => {
      return Category.create({ ...item })
    })
  )
  .then(data => console.log('Done = ', data))
  .catch(console.error)
  .finally(() => process.exit())
})