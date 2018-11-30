const router = require('express').Router()
  , passport = require('passport')
  , userCtrl = require('../controllers/userCtrl')

router.get('/login', userCtrl.login)
router.get('/signup', userCtrl.signUp)

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/user/login',
  failureRedirect: '/user/signup'
}))

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))
router.get('/logout', userCtrl.logout)

module.exports = router
