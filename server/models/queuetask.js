'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QueueTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  QueueTask.init({
    job: DataTypes.STRING,
    data: {
      type: DataTypes.TEXT,
      allowNull: true,
      get(){
        return this.getDataValue('data').length > 0 ? JSON.parse(this.getDataValue('data')) : {};
      },
      set(value){
        this.setDataValue('data', JSON.stringify(value));
      }
    },
    schedule_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'QueueTask',
  });
  return QueueTask;
};