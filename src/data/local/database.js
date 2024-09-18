require("dotenv").config();
const { Sequelize } = require('sequelize');

let DATABASE_PATH

if(!process.env.DB_PATH)
    DATABASE_PATH = '/home/joshtalks/database/data_server.sqlite'
else
    DATABASE_PATH = `${process.env.DB_PATH}/data_server.sqlite`

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: DATABASE_PATH
});

module.exports = sequelize;