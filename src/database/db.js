'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('bitespeed_identity_reconciliation', 'your_username', 'your_password', {
    host: 'localhost',
    dialect: 'mysql',
    port: 33061
});
sequelize
    .authenticate()
    .then(() => {
    console.log('DB Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
exports.default = sequelize;
