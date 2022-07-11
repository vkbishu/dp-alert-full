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
    static associate({Product, ProductUser}) {
      // define association here
      this.belongsToMany(Product, {through: ProductUser, as: 'products'});
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            async uniqueEmail(value){
              let self = this;
                const check = await User.findOne({where: {email: value}});
                if(check && check.id !== self.id){
                throw new Error("Email already exists");
                }
            }
        }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    remember_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};