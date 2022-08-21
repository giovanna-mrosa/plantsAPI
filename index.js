const dotenv = require('dotenv').config()
const { DB_URL } = process.env

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const port = process.env.PORT || 3333

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

const plantRoutes = require('./routes/plantRoutes')

app.use('/plant', plantRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Hello express' })
})

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Connected to mongoBD')

    app.listen(port)
  })
  .catch(err => console.log(err))
