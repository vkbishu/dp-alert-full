const fs = require('fs');
require('dotenv').config();
module.exports = {
    development: {
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME,
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true
        },
        define: {
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true
        },
        define: {
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
           /*  ssl: {
                ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
            } */
        },
        define: {
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
};