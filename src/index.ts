'use strict'

import express from 'express'

const app = express()
const port = 8088

app.use(express.json())

app.listen(port, () => {
    console.log('Connected...')
})