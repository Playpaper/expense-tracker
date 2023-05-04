const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Expense = require('../../models/expense')
const category = require('../../models/category')

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

router.get('/edit/:id', (req, res) => {
  const categoryId = req.params.id
  Expense.findOne({ categoryId })
    .lean()
    .then(expense => {
      Category.findById(expense.categoryId)
        .lean()
        .then(category => {
          const categoryName = category.name
          const expenseData = {...expense, categoryName }
          return expenseData
        })
        .then(expenseData => {
          Category.find()
          .lean()
          .then(category => {
            console.log('expenseData = ', expenseData)
            res.render('edit', { ...expenseData, category })
          })
          // .then(category => res.render('edit', { ...expenseData, category }))
        })
    })
})

router.put('/:id', (req, res) => {
  
})

router.delete('/:id', (req, res) => {
  const categoryId = req.params.id
  console.log('Delete categoryId = ', categoryId)
})

module.exports = router
