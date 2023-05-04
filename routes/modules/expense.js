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

router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Expense.findById(id)
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
        })
    })
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const options = req.body
  
  Expense.findOneAndUpdate({ _id, userId }, options)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Expense.findOne({ _id, userId })
    .then(item => item.remove())
    .then(() => res.redirect('/'))
    .catch(console.error)
})

module.exports = router