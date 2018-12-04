module.exports = {
  signUpView: (req, res) => {
    return res.render('pages/signup', { 
      title: 'Sign Up', 
      errors: req.flash('alert'),
      success: req.flash('success') 
    })
  },
  loginView: (req, res) => {
    return res.render('pages/login', { 
      title: 'Login', 
      errors: req.flash('alert'), 
      success: req.flash('success') 
    })
  },
  logout: (req, res) => {
    if (req.isUnauthenticated()) {
      req.flash('alert', 'You have to be logged in.')
      return res.redirect('login')
    }
    req.session.destroy(err => {
      if (err) {
        console.log(err)
      }
      return res.redirect('/')
    })
  },
  isNotLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      req.flash('alert', 'You are already logged in.')
      return res.redirect('/')
    }
    next()
  }
}