module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {})
  User.associate = models => {
    User.hasMany(models.Todo, {
      foreignKey: {
        name: 'creator',
        allowNull: false
      }
    })
  }
  return User
}