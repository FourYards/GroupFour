'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Listings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      creator: {
        type: Sequelize.INTEGER,
        references: {
          model: "UserAccounts",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      place: {
        type: Sequelize.INTEGER,
        references: {
          model: "Locations",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      typeOfWork: {
        type: Sequelize.INTEGER,
        references: {
          model: "TypesOfWork",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      description: {
        type: Sequelize.STRING
      },
      lengthInMinutes: {
        type: Sequelize.INTEGER
      },
      review: {
        type: Sequelize.INTEGER,
        references: {
          model: "Reviews",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      workStatus: {
        type: Sequelize.INTEGER,
        references: {
          model: "WorkStatuses",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("Listings");
  }
};
