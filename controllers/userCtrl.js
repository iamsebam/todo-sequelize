module.exports = {
  signUp: (req, res) => {
    res.render('pages/signup', { title: 'Sign Up' })
  },
  login: (req, res) => {
    res.render('pages/login', { title: 'Login' })
  },
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.log(err)
      }
      res.redirect('/')
    })
  }
}