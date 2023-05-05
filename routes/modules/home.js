const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Expense = require('../../models/expense')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Category.find()
    .lean()
    .then(category => {
      Expense.find({ userId })
        .populate('categoryId')
        .lean()
        .then(data => {
          if(!data.length){
            return res.render('index', { data, category, amountSum: 0 })
          }
          const Expensedata = data
          const ObjectId = mongoose.Types.ObjectId
          Expense.aggregate([{$match: {userId: ObjectId(userId)}},{$group: { _id: null, total: {$sum :"$amount"}}}])
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