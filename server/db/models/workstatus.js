'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WorkStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models['Listing'], {
        foreignKey: {
          allowNull: false,
          field: 'status',
        },
        onDelete: 'RESTRICT',
      });
    }
  }
  WorkStatus.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WorkStatus',
  });

  return WorkStatus;
};
