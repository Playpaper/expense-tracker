const db = require('../../config/mongoose')
const Category = require('../category')
const Expense = require('../expense')
const User = require('../user')
const seedExpense = require('./expense.json')
const bcrypt = require('bcryptjs')
const user = {
  name: 'user',
  email: "user@example.com",
  password: "12345678"
}

db.once('open', () => {
  // console.log('seed expense')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then(hash => User.create({ 
      name: user.name, 
      email: user.email, 
      password: hash 
    }))
    .then(user => {
      return Promise.all(seedExpense.map(item => {
        return Category.findOne({ name: item.category })
          .then(category => {
            return Expense.create({ 
              name: item.name,
              date: item.date,
              amount: item.amount,
              categoryId: category._id,
              userId: user._id
            })
          })
          .then(expense => console.log('expense = ', expense))
      }))
    })
    .then(() => console.log('Done !'))
    .finally(() => process.exit())

    // .then(() => res.redirect('/'))
    // .catch(console.error))


  // Promise.all(seedExpense.map(seed => {
  //   const { name, date, amount, category } = seed
  //   return Category.findOne({ name: category })
  //     .then(category => category._id)
  //     .then(categoryId => {
  //       return Expense.create({ name, date, amount, categoryId })
  //     })
  //     .catch(console.error)

  //   })
  // )
  // .then(value => console.log('Done = ', value))
  // .catch(console.error)
  // .finally(() => process.exit())

})