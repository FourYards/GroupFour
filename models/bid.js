'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models['UserAccount']);
      this.hasOne(models['Listing']);
    }
  }
  Bid.init({
    bidder: {
      type: DataTypes.INTEGER,
      references: "UserAccount",
      referencesKey: "id",
    },
    amount: DataTypes.INTEGER,
    order: {
      type: DataTypes.INTEGER,
      references: "DisplayTypes",
      referencesKey: "id",
    },
  }, {
    sequelize,
    modelName: 'Bid',
  });

  return Bid;
};
