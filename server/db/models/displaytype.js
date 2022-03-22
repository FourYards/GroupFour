'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DisplayType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models['UserAccount'], {
        foreignKey: {
          field: 'displayType',
        },
        onDelete: 'SET NULL',
      });
    }
  }
  DisplayType.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'DisplayType',
      timestamps: false,
    }
  );
  return DisplayType;
};
