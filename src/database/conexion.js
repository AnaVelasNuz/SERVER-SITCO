const { Sequelize } = require("sequelize");
require('dotenv').config()

const { DATABASE, MSSQL_HOST, SQL_USER, SQL_PASSWORD } = process.env

const db = new Sequelize(DATABASE, SQL_USER, SQL_PASSWORD, {
    host: MSSQL_HOST,
    dialect: 'mssql',
    
});

module.exports = {
    db
};