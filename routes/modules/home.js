const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  Expense.find()
    .lean()
    .then(expense => {
      return Promise.all(expense.map(item => {
        return Category.find({ _id: item['categoryId'] })
          .lean()
          .then(category => Object.assign(item, { categoryName: category[0]['name'] }))
        })
      )
    })
    .then(data => res.render('index', { data }))
    .catch(console.error)
})

module.exports = router