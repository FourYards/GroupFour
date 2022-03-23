'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: "UserAccounts",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      listing: {
        type: Sequelize.INTEGER,
        references: {
          model: "Listing",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Reviews");
  }
};
