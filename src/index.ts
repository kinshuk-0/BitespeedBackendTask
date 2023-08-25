'use strict'

import express from 'express'
import router from './routes/contactRoutes'

const app  = express()
const port = 8083

app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log('Connected...')
})