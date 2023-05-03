const db = require('../../config/mongoose')
const Category = require('../category')
const Expense = require('../expense')
const seedExpense = require('../../expense.json')

db.once('open', () => {
  // console.log('seed expense')
  Promise.all(seedExpense.map(seed => {
    const { name, date, amount, category } = seed
    return Category.findOne({ name: category })
      .then(category => category._id)
      .then(categoryId => {
        return Expense.create({ name, date, amount, categoryId })
      })
      .catch(console.error)

    })
  )
  .then(value => console.log('Done = ', value))
  .catch(console.error)
  .finally(() => process.exit())

})