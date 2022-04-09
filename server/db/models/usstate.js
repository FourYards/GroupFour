'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class USState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models['Location'], {
        foreignKey: {
          allowNull: false,
          field: 'state',
        },
        onDelete: 'RESTRICT',
      });
    }
  }
  USState.init({
    id: {
      type: DataTypes.STRING(2),
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'USState',
  });
  return USState;
};
