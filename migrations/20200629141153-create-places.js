'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Places', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      idCity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      rooms: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      bathrooms: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      maxGuests: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      priceByNight: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      available: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Places');
  },
};
