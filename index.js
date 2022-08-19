const dotenv = require('dotenv').config()
const { DB_URL } = process.env

const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

const plantRoutes = require('./routes/plantRoutes')

app.use('/plant', plantRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Hello express' })
})

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Connected to mongoBD')

    app.listen(3333)
  })
  .catch(err => console.log(err))
