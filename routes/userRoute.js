const router = require('express').Router()
  , passport = require('passport')
  , userCtrl = require('../controllers/userCtrl')
  , validate = require('../config/validators')

router.get('/login', userCtrl.isNotLoggedIn, userCtrl.loginView)
router.get('/signup', userCtrl.isNotLoggedIn,  userCtrl.signUpView)

router.post('/signup', validate.signUpData, passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: 'signup'
}))

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: 'login'
}))
router.get('/logout', userCtrl.logout)

module.exports = router
