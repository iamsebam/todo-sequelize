const { body } = require('express-validator/check')
  , User = require('../models').models.User

module.exports = {
  signUpData: [
    body('username')
      .not().isEmpty().withMessage('Username field is required.')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.')
      .isAlphanumeric().withMessage('Username must contain of only letters and numbers.')
      .custom(async username => {
        try {
          const user = await User.findOne({ where: {username} })
          if (user) {
            return Promise.reject('Username already in use.')
          }
        } catch (err) {
          return Promise.reject(err)
        }
      }),
    body('password')
      .not().isEmpty().withMessage('Password field is required.')
      .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long.')
      .custom((password, { req }) => {
        if (password !== req.body.password2) {
          return false
        } else {
          return password
        }
      }).withMessage('Passwords do not match.')
  ],
  todoData: [
    body('todo')
      .not().isEmpty().withMessage('Todo cannot be empty')
  ]
}