module.exports = (app, session, sessionStore) => {
  app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }))
}