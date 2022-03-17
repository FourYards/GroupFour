'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models['UserAccount'])
      this.hasOne(models['Listing'])
    }
  }
  Review.init({
    author: {
      type: DataTypes.INTEGER,
      references: "UserAccounts",
      referencesKey: "id",
    },
    listing: {
      type: DataTypes.INTEGER,
      references: "Listings",
      referencesKey: "id",
    },
    comment: DataTypes.STRING,
    rating: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Review',
  });

  return Review;
};
