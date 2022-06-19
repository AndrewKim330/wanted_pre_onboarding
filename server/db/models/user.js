'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    user_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    desired_position: DataTypes.STRING,
    user_mail: DataTypes.STRING,
    tech_stack: DataTypes.STRING,
    certificates: DataTypes.STRING,
    career: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};