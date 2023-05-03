const db = require('../../config/mongoose')
const Category = require('../category')
const seedCategory = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

db.once('open', () => {
  Promise.all(seedCategory.map(value => {
      return Category.create({ name: value })
    })
  )
  .then(value => console.log('Done = ', value))
  .catch(console.error)
  .finally(() => process.exit())
})