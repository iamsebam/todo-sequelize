const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.NODE_ENV || 3000;

app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.render('pages/index', {title: 'Home'})
})
app.get('/login', (req, res) => {
  res.render('pages/login', {title: 'Login'})
})
app.get('/signup', (req, res) => {
  res.render('pages/signup', {title: 'Sign Up'})
})
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})