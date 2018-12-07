const router = require('express').Router()
  , todosCtrl = require('../controllers/todosCtrl')
  , userCtrl = require('../controllers/userCtrl')

router.use(userCtrl.isLoggedIn)

router.get('/', todosCtrl.todosView)
router.post('/add', todosCtrl.addTodo)
router.delete('/delete/:id', todosCtrl.deleteTodo)
router.patch('/update/:id', todosCtrl.updateTodo)

module.exports = router