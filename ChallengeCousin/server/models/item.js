'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.User, {foreignKey: "authorId"})
      Item.belongsTo(models.Category, {foreignKey: "categoryId"})
      Item.hasMany(models.Ingredient, {foreignKey: "itemId"})
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name cannot be empty"
        },
        notEmpty: {
          msg: "name cannot be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "description cannot be empty"
        },
        notEmpty: {
          msg: "description cannot be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "price cannot be empty"
        },
        notEmpty: {
          msg: "price cannot be empty"
        },
        min: {
          args: [5000],
          msg: "minimum price is 5000"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "image url cannot be empty"
        },
        notEmpty: {
          msg: "image url cannot be empty"
        }
      }
    },
    authorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};