const Sequelize = require('sequelize')
require('dotenv').config()

let sequelize

sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: 3306,
        // dialectOptions: {
        //     ssl: {
        //         require: true
        //     }
        // }
    }
)

module.exports = sequelize
