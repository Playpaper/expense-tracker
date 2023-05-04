module.exports = {
  authenticator : (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'Flash-請先登入才能使用！')
    res.redirect('/users/login')

    // const errorMessages = [{ msg: '請先登入才能使用！' }]
    // res.render('login', { errorMessages })
  }
}