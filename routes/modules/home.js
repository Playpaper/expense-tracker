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
        .then(data => {
          const Expensedata = data
          Expense.aggregate([{$group: { _id: null, total: {$sum :"$amount"}}}])
            .then(amountSum => {
              return Expense.aggregate([{$project: { yearMonthDayUTC: { $dateToString: { format: "%Y-%m-%d", date: "$date" }}}}]
              )
              .then(date => {
                Promise.all(Expensedata.map((item, index) => {
                    const dateFormat = { dateFormat: date[index]['yearMonthDayUTC'] }
                    return Object.assign(item, dateFormat)
                  })
                )
                .then(data => res.render('index', { data, category, amountSum: amountSum[0].total }))
              })
            })
        })
        .catch(console.error)
    })
    .catch(console.error)
})

module.exports = router