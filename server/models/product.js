'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, ProductUser, PriceChangeHistory}) {
      // define association here
      this.belongsToMany(User, {through: ProductUser, as: 'users'});
      this.hasMany(PriceChangeHistory);
    }
  };
  Product.init({
    seller: DataTypes.STRING,
    url: DataTypes.TEXT,
    affiliate: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    title: DataTypes.STRING,
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    org_price: DataTypes.FLOAT,
    fetched_price: DataTypes.FLOAT,
    current_price: DataTypes.FLOAT,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};