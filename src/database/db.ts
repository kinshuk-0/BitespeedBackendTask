'use strict'

import { Sequelize } from 'sequelize'
require('dotenv').config()

const sequelize = new Sequelize('bitespeed_identity_reconciliation', process.env.DB_USERNAME!!, process.env.DB_PASSWORD, {
  host    : process.env.DB_HOST,
  dialect : 'mysql',
  port    :  33061
});

sequelize
  .authenticate()
  .then(() => {
    console.log('DB Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

export default sequelize
