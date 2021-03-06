const dbURL = process.env.DATABASE_URL || require('../config/config')[process.env.NODE_ENV].url

const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbURL, {
  dialect: 'postgres',
  timestamps: true,
  oparatorsAliases: false,
  define: {
    underscored: true
  }
})

const models = {
  User: sequelize.import('./user'),
  Todo: sequelize.import('./todo')
}

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = { models, sequelize}
