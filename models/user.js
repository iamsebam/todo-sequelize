module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  })
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