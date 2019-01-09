const LocalStrategy = require('passport-local').Strategy
  , bcrypt = require('bcryptjs')
  , { validationResult } = require('express-validator/check')

module.exports = (app, passport, User) => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } }).then(user => {
      done(null, user.get())
    })
  })

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  }, async (req, username, password, done) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const messages = errors.array().map(err => err.msg)
        return done(null, false, req.flash('alert', messages))
      }
      const newUser = await User.create({
        username: username,
        password: bcrypt.hashSync(password, 10)
      })
      if (!newUser) { 
        return done(null, false, req.flash('alert', 'Unable to create an account, try again later.')) 
      }
      return done(null, newUser, req.flash('success', 'User created!'))
    } catch (err) {
      return done(err)
    }
  }))

  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  }, async (req, username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } })
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, req.flash('alert', 'Wrong username/password.'))
      }
      return done(null, user, req.flash('success', 'Successfully logged in.'))
    } catch (err) {
      done(err)
    }
  }))

  app.use(passport.initialize())
  app.use(passport.session())
}
