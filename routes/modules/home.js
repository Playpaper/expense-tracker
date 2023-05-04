const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')

// router.get('/', (req, res) => {
//   const userId = req.user._id
//   Expense.find({ userId })
//     .lean()
//     .then(items => {
//       Promise.all(
//         items.map(item => {
//         return Category.findById(item.categoryId)
//           .lean()
//           .then(category => category.name)
//           .then(categoryName => {
//             item.categoryName = categoryName
//             return item
//           })
//         })
//       )
//       .then(data => {
//         return Category.find()
//           .lean()
//           .then(category => {
//             console.log('category = ', category)
//             console.log('data = ', data)
//             res.render('index', { data, category })
//           })
//       })
//       .catch(console.error)
//     })
//     .catch(console.error)
// })

router.get('/', (req, res) => {
  const userId = req.user._id
  Category.find()
    .lean()
    .then(category => {
      Expense.find({ userId })
        .populate('categoryId')
        .lean()
        .then(data => res.render('index', { data, category }))
        .catch(console.error)
    })
    .catch(console.error)
})

module.exports = router