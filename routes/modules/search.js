const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Category = require('../../models/category')
const Expense = require('../../models/expense')

router.get('/', (req, res) => {

  // Category.find({ name: categoryChoose ? new RegExp(categoryChoose, 'i') : { $regex: /.+/, $options: 'si' } })
  const userId = req.user._id
  const categoryChoose = req.query.category

  if(!categoryChoose){
    return res.redirect('/')  
  }
  Category.find()
    .lean()
    .then(category => {
      Expense.find({ userId, categoryId: String(categoryChoose) })
        .populate('categoryId')
        .lean()
        .then(data => {
          const Expensedata = data
          const ObjectId = mongoose.Types.ObjectId
          Expense.aggregate([{$match: {categoryId: ObjectId(categoryChoose)}}, {$group: { _id: null, total: {$sum :"$amount"}}}])
            .then(amountSum => {
              return Expense.aggregate([{$project: { yearMonthDayUTC: { $dateToString: { format: "%Y-%m-%d", date: "$date" }}}}]
              )
              .then(date => {
                Promise.all(Expensedata.map((item, index) => {
                    const dateFormat = { dateFormat: date[index]['yearMonthDayUTC'] }
                    return Object.assign(item, dateFormat)
                  })
                )
                .then(data => res.render('index', { data, category, categoryChoose, amountSum: amountSum[0].total }))
              })
            })
        })
        .catch(console.error)
    })
    .catch(console.error)

})
module.exports = router

  // .then(data => {
  //   const Expensedata = data
  //   Expense.aggregate([{$group: { _id: null, total: {$sum :"$amount"}}}])
  //     .then(amountSum => {
  //       return Expense.aggregate([{$project: { yearMonthDayUTC: { $dateToString: { format: "%Y-%m-%d", date: "$date" }}}}]
  //       )
  //       .then(date => {
  //         Promise.all(Expensedata.map((item, index) => {
  //             const dateFormat = { dateFormat: date[index]['yearMonthDayUTC'] }
  //             return Object.assign(item, dateFormat)
  //           })
  //         )
  //         .then(data => res.render('index', { data, category, amountSum: amountSum[0].total }))
  //       })
  //     })
  // })