const LocalStrategy = require('passport-local').Strategy
  , bcrypt = require('bcryptjs')

module.exports = (passport, User) => {
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
      const user = await User.findOne({ where: { username } })
      if (user) {
        return done(null, false, { message: 'Username already in use.' })
      }
      const newUser = await User.create({
        username: username,
        password: bcrypt.hashSync(password, 10)
      })
      if (!newUser) { 
        return done(null, false, { message: 'Unable to create an account, try later!' }) 
      }
      return done(null, newUser)
    } catch (err) {
      return done(err)
    }
  }))

  passport.use('login', new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } })
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Invalid username/password!' })
      }
      return done(null, user)
    } catch (err) {
      done(err)
    }
  }))
}
