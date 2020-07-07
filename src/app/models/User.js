const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      provider: DataTypes.BOOLEAN,
      password_hash: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
