'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models['UserAccount'], {
        foreignKey: {
          allowNull: false,
          name: 'role',
          field: 'role',
        },
        onDelete: 'RESTRICT',
        as: 'users',
      });
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        primaryKey: true,
        type: DataTypes.STRING(3),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Role',
      timestamps: false,
    }
  );
  return Role;
};
