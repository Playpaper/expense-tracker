const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Expense = require('../../models/expense')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, date, category, amount } = req.body
  Category.findOne({ name: category })
    .then(category => category._id)
    .then(categoryId => Expense.create({ name, date, amount, categoryId }))
    .then(() => res.redirect('/'))
    .catch(console.error)
})

module.exports = router