const router = require('express').Router()
  , todosCtrl = require('../controllers/todosCtrl')
  , userCtrl = require('../controllers/userCtrl')
  , validate = require('../config/validators')

router.use(userCtrl.isLoggedIn)

router.get('/', todosCtrl.todosView)
router.post('/todo', validate.todoData, todosCtrl.addTodo)
router.delete('/todo/:id', todosCtrl.deleteTodo)
router.patch('/todo/:id', todosCtrl.updateTodo)

module.exports = router
