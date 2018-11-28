const router = require('express').Router()

router.get('/login', (req, res) => {
  res.render('pages/login', {title: 'Login'})
})
router.get('/signup', (req, res) => {
  res.render('pages/signup', {title: 'Sign Up'})
})

module.exports = router