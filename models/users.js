'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      firstName: DataTypes.STRING(50),
      lastName: DataTypes.STRING(50),
      email: DataTypes.STRING(255),
      password: DataTypes.STRING(255),
      city: DataTypes.STRING(50),
      description: DataTypes.STRING(1000),
      birthday: DataTypes.DATE,
      role: DataTypes.STRING(30),
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
