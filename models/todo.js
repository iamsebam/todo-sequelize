module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('todo', {
    body: DataTypes.TEXT
  }, {})
  Todo.associate = models => {
    Todo.belongsTo(models.User, {
      foreignKey: {
        name: 'creator',
        allowNull: false
      }
    })
  }
  return Todo
}