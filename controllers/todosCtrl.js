const Todo = require('../models').models.Todo,
  { validationResult } = require('express-validator/check')
module.exports = {
  todosView: async (req, res) => {
    try {
      res.render('pages/todos', {
        title: 'Todos',
        errors: req.flash('alert'),
        success: req.flash('success'),
        user: req.user
      })
    } catch (err) {
      res.redirect('/')
    }
  },
  getAll: async (req, res) => {
    try {
      let responseBody = {}
      const todos = await Todo.findAll({
        where: {
          creator: req.user.id
        }
      })
      if (todos) {
        responseBody = {
          info: {
            success: true,
            messages: ['Todos successfully received.']
          },
          todos
        }
      } else {
        responseBody = {
          info: {
            success: false,
            messages: ['Cannot fetch todos.']
          },
          todos: []
        }
        return res.status(404).send(responseBody)
      }
      res.status(200).send(responseBody)
    } catch (err) {
      responseBody = {
        info: {
          success: false,
          messages: ['An error occurred processing your request.']
        },
        todos: []
      }
      res.status(500).send(responseBody)
    }
  },
  addTodo: async (req, res) => {
    try {
      let responseBody = {}
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        responseBody = {
          info: {
            success: false,
            messages: errors.array().map(err => err.msg)
          },
          todos: []
        }
        return res.status(400).send(responseBody)
      }
      const todo = await Todo.create({
        body: req.body.todo.trim(),
        is_completed: false,
        creator: req.user.id
      })
      if (todo) {
        responseBody = {
          info: {
            success: true,
            messages: ['Todo successfully created.']
          },
          todos: [todo]
        }
      }
      return res.status(200).send(responseBody)
    } catch (err) {
      responseBody = {
        info: {
          success: false,
          messages: ['An error occurred processing your request.']
        },
        todos: []
      }
      res.status(500).send(responseBody)
    }
  },
  updateTodo: async (req, res) => {
    try {
      let responseBody = {}
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        responseBody = {
          info: {
            success: false,
            messages: errors.array().map(err => err.msg)
          },
          todos: []
        }
        return res.status(400).send(responseBody)
      }
      const isUpdated = await Todo.update(
        {
          body: req.body.todo.trim(),
          is_completed: req.body.isCompleted
        },
        {
          where: {
            id: req.params.id,
            creator: req.user.id
          }
        }
      )
      const todo = await Todo.findOne({
        where: {
          id: req.params.id,
          creator: req.user.id
        }
      })
      if (todo && isUpdated) {
        responseBody = {
          info: {
            success: true,
            messages: ['Todo successfully updated.']
          },
          todos: [todo]
        }
      }
      return res.status(200).send(responseBody)
    } catch (err) {
      responseBody = {
        info: {
          success: false,
          messages: ['An error occurred processing your request.']
        },
        todos: []
      }
      res.status(500).send(responseBody)
    }
  },
  deleteTodo: async (req, res) => {
    try {
      let responseBody = {}
      const todo = await Todo.findOne({
        where: {
          id: req.params.id,
          creator: req.user.id
        }
      })
      const isDeleted = await Todo.destroy({
        where: {
          id: req.params.id,
          creator: req.user.id
        }
      })
      if (isDeleted) {
        responseBody = {
          info: {
            success: true,
            messages: ['Todo successfully deleted.']
          },
          todos: [todo]
        }
      } else {
        responseBody = {
          info: {
            success: false,
            messages: ['Unable to delete todo.']
          },
          todos: []
        }
      }
      res.status(200).send(responseBody)
    } catch (err) {
      responseBody = {
        info: {
          success: false,
          messages: ['An error occurred processing your request.']
        },
        todos: []
      }
      res.status(500).send(responseBody)
    }
  }
}
