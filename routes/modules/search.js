const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Expense = require('../../models/expense')

router.get('/', (req, res) => {

  // Category.find({ name: categoryChoose ? new RegExp(categoryChoose, 'i') : { $regex: /.+/, $options: 'si' } })
  const userId = req.user._id
  const categoryChoose = req.query.category

  if(!categoryChoose){
    res.redirect('/')  
  }
  Category.find()
    .lean()
    .then(category => {
      Expense.find({ userId, categoryId: categoryChoose })
        .populate('categoryId')
        .lean()
        .then(data => res.render('index', { data, category, categoryChoose }))
        .catch(console.error)
    })
    .catch(console.error)

})
module.exports = router
