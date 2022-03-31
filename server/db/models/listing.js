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
      this.belongsTo(models['UserAccount'])
      this.belongsTo(models['Location'])
      this.belongsTo(models['TypeOfWork'])
      this.belongsTo(models['Review'])
      this.belongsTo(models['WorkStatus'])

      this.hasMany(models['Bid'], {
        foreignKey: {
          allowNull: false,
          field: 'order',
        },
        onDelete: 'CASCADE',
      });

      this.hasMany(models['Review'], {
        foreignKey: {
          allowNull: false,
          field: 'listing',
        },
        onDelete: 'SET NULL',
      });
    }
  }
  Listing.init({
    description: DataTypes.STRING,
    lengthInMinutes: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Listing',
  });

  return Listing;
};
