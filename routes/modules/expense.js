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
    .populate('categoryId')
    .lean()
    .then(expense => {
      Category.find()
        .lean()
        .then(category => {
          Expense.aggregate([{$match: {_id: expense._id}}, {$project: { yearMonthDayUTC: { $dateToString: { format: "%Y-%m-%d", date: "$date" }}}}]
          )
          .then(dateFormat => res.render('edit', { ...expense, category, dateFormat: dateFormat[0]['yearMonthDayUTC'] }))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))  
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