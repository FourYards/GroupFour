'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models['UserAccount'])
      this.hasOne(models['USState'])
    }
  }
  Location.init({
    owner: {
      type: DataTypes.INTEGER,
      references: "UserAccounts",
      referencesKey: "id",
    },
    streetAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    state: {
      type: DataTypes.STRING,
      references: "USStates",
      referencesKey: "id",
    },
  }, {
    sequelize,
    modelName: 'Location',
  });

  return Location;
};
