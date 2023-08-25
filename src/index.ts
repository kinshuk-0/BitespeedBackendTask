'use strict'

import express from 'express'
import router from './routes/contactRoutes'
require('dotenv').config()

const app = express()

app.use(express.json())
app.use('/', router)

app.listen(process.env.PORT, () => {
    console.log('Connected...',process.env.PORT)
})