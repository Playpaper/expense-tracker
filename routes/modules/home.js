const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')
const category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Expense.find({ userId })
    .lean()
    .then(items => {
      Promise.all(
        items.map(item => {
        return Category.findById(item.categoryId)
          .lean()
          .then(category => category.name)
          .then(categoryName => {
            item.categoryName = categoryName
            return item
          })
        })
      )
      .then(data => res.render('index', { data }))
      .catch(console.error)
    })
    .catch(console.error)
})

module.exports = router