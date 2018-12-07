require('dotenv').config()
const port = process.env.PORT || require('./config/config')[process.env.NODE_ENV].port

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const { models, sequelize } = require('./models')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('./public'))

const sessionStore = new SequelizeStore({ db: sequelize })
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport, models.User)
app.use(flash())

app.use('/user', require('./routes/userRoute'))
app.use('/todos', require('./routes/todosRoute'))
app.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Home', 
    user: req.user, 
    errors: req.flash('alert'), 
    success: req.flash('success')
  })
})

models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
}).catch(err => {
  console.log('Unable to sync db', err)
})
