'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Places extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Places.init(
    {
      id_city: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      rooms: DataTypes.INTEGER,
      bathrooms: DataTypes.INTEGER,
      max_guests: DataTypes.INTEGER,
      price_by_night: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Places',
    }
  );
  return Places;
};
