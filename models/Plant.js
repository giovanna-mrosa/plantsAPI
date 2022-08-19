const mongoose = require('mongoose')

const Plant = mongoose.model('Plant', {
  name: String,
  description: String,
  imageUrl: String,
  listPrice: Number,
  price: Number,
  installmentsQuantity: Number,
  installmentsValue: Number
})

module.exports = Plant
