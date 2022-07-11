'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Token.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token_type:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    token:  {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};