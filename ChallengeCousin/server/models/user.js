'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Item, {foreignKey: "authorId"})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "email cannot be empty"
        },
        notEmpty: {
          msg: "email cannot be empty"
        },
        isEmail: {
          msg: "invalid email format"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be empty"
        },
        notEmpty: {
          msg: "password cannot be empty"
        },
        len: {
          args: [5, 100],
          msg: "password must be more than 5 letters"
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance) => {
        instance.password = hashPassword(instance.password)
        instance.role = "admin"
      }
    }
  });
  return User;
};