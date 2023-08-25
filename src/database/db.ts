'use strict'

import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('bitespeed_identity_reconciliation', 'root', 'root@123', {
  host    : 'localhost',
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
