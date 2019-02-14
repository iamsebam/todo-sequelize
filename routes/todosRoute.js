const router = require('express').Router(),
  todosCtrl = require('../controllers/todosCtrl'),
  userCtrl = require('../controllers/userCtrl'),
  validate = require('../config/validators')

//router.use(userCtrl.isLoggedIn)

router.get('/', todosCtrl.todosView)
router.get('/all-todos', todosCtrl.getAll)
router.post('/todo', validate.todoData, todosCtrl.addTodo)
router.delete('/todo/:id', todosCtrl.deleteTodo)
router.patch('/todo/:id', validate.todoData, todosCtrl.updateTodo)

module.exports = router
