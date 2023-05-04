const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Expense = require('../../models/expense')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(category => res.render('new', { category }))
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  Expense.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(console.error)
})

module.exports = router
