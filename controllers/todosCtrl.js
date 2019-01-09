const Todo = require('../models').models.Todo
  , { validationResult } = require('express-validator/check')
module.exports = {
  todosView: async (req, res) => {
    try {
      const todos = await Todo.findAll({
        where: {
          creator: req.user.id
        },
        order: [['created_at', 'ASC']]
      })
      res.render('pages/todos', {
        title: 'Todos',
        todos,
        errors: req.flash('alert'),
        success: req.flash('success'),
        user: req.user
      })
    } catch (err) {
      req.flash('alert', 'Unable to load todos')
      res.redirect('/todos')
    }
  },
  addTodo: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const messages = errors.array().map(err => err.msg)
        req.flash('alert', messages)
        return res.redirect('/todos')
      }
      await Todo.create({
        body: req.body.todo.trim(),
        is_completed: false,
        creator: req.user.id
      })
      req.flash('success', 'New todo created!')
      res.redirect('/todos')
    } catch (err) {
      req.flash('alert', 'Unable to create todo.')
      res.status(500).send()
    }
  },
  updateTodo: async (req, res) => {
    try {
      await Todo.update(
        {
          body: req.body.todo,
          is_completed: req.body.isCompleted
        },
        {
          where: {
            id: req.params.id,
            creator: req.user.id
          }
        }
      )
      req.flash('success', 'Todo updated!')
      res.status(200).send()
    } catch (err) {
      req.flash('alert', 'Unable to update todo.')
      res.status(500).send()
    }
  },
  deleteTodo: async (req, res) => {
    try {
      await Todo.destroy({
        where: {
          id: req.params.id,
          creator: req.user.id
        }
      })
      req.flash('success', 'Todo deleted!')
      res.status(200).send()
    } catch (err) {
      req.flash('alert', 'Unable to delete todo.')
      res.status(500).send()
    }
  }
}
