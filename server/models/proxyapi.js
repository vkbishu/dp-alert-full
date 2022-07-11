'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProxyApi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProxyApi.init({
    name: DataTypes.STRING,
    url: DataTypes.TEXT,
    call_month: DataTypes.INTEGER,
    call_total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProxyApi',
  });
  return ProxyApi;
};