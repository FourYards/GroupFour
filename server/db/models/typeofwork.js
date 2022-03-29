'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TypeOfWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models['Listing'], {
        foreignKey: {
          allowNull: false,
          field: 'type',
        },
        onDelete: 'RESTRICT',
      });
    }
  }
  TypeOfWork.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeOfWork',
  });
  return TypeOfWork;
};
