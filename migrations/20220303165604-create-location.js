'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("Locations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      owner: {
        type: Sequelize.INTEGER,
        references: {
          model: "UserAccounts",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      streetAddress: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      zipCode: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
        references: {
          model: "USStates",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("Locations");
  }
};
