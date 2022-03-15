'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models['UserAccount'])
      this.hasOne(models['Location'])
      this.hasOne(models['TypeOfWork'])
      this.hasOne(models['Reviews'])
      this.hasOne(models['WorkStatuses'])
    }
  }
  Listing.init({
    creator: {
      type: DataTypes.INTEGER,
      references: "UserAccounts",
      referencesKey: "id",
    },
    place: {
      type: DataTypes.INTEGER,
      references: "Locations",
      referencesKey: "id",
    },
    typeOfWork: {
      type: DataTypes.INTEGER,
      references: "TypesOfWork",
      referencesKey: "id",
    },
    description: DataTypes.STRING,
    lengthInMinutes: DataTypes.INTEGER,
    review: {
      type: DataTypes.INTEGER,
      references: "Reviews",
      referencesKey: "id",
    },
    workStatus: {
      type: DataTypes.INTEGER,
      references: "WorkStatuses",
      referencesKey: "id",
    },
  }, {
    sequelize,
    modelName: 'Listing',
  });

  return Listing;
};
