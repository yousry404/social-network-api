module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  })
  User.associate = models => {
    User.hasMany(models.Post, {
      as: "Posts",
      foreignKey: "user_id"
    })
  }
  return User;
}