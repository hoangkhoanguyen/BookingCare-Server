const Sequelize = require('sequelize');
require('dotenv').config();
// Option 1: Passing parameters separately
const sequelize = new Sequelize(
    process.env.DB_DATABASE_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
        query: {
            raw: true
        },
        timezone: "+07:00",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

let connectDB = async () => {
    try {
        await sequelize
            .authenticate()
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    };
}

module.exports = connectDB;