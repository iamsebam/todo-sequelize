require('dotenv').config()
const port = process.env.PORT || require('./config/config')[process.env.NODE_ENV].port

const express = require('express')
  , bodyParser = require('body-parser')
  , passport = require('passport')
  , session = require('express-session')
  , flash = require('express-flash')
  , SequelizeStore = require('connect-session-sequelize')(session.Store)

const { models, sequelize } = require('./models')

const sessionStore = new SequelizeStore({ db: sequelize })

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require('./config/session')(app, session, sessionStore)
require('./config/passport')(app, passport, models.User)

app.use(flash())

app.use('/', require('./routes'))

models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
}).catch(err => {
  console.log('Unable to sync db', err)
})
