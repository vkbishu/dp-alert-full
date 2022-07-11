const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'drop_price_alert', 
    'root',
    '', 
    {
        host: 'localhost',
        dialect: 'mysql',
        define: {
            "underscored": true
        }
    }
);

module.exports = sequelize;