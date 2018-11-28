require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const models = require('./models')

const port = process.env.PORT || require('./config/config')[process.env.NODE_ENV].port 

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.use(session({
  secret: 'its a secret',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/user', require('./routes/user'))

app.get('/', (req, res) => {
  res.render('pages/index', {title: 'Home', user: req.user})
})

models.sequelize.sync({force: true}).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
}).catch(err => {
  console.log('Unable to sync db', err)
})
