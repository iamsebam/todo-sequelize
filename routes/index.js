const router = require('express').Router()

router.use('/user', require('./userRoute'))
router.use('/todos', require('./todosRoute'))

router.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Home',
    user: req.user,
    errors: req.flash('alert'),
    success: req.flash('success')
  })
})

module.exports = router