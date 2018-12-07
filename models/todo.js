module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('todo', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    body: DataTypes.TEXT,
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
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