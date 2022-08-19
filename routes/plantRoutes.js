const router = require('express').Router()

const Plant = require('../models/Plant')

// Criação de dados

router.post('/', async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    listPrice,
    price,
    installmentsQuantity,
    installmentsValue
  } = req.body

  if (!name) {
    res.status(422).json({ message: 'Plant name is required' })
    return
  }

  const plant = {
    name,
    description,
    imageUrl,
    listPrice,
    price,
    installmentsQuantity,
    installmentsValue
  }

  try {
    await Plant.create(plant)

    res.status(201).json({ message: 'Created with succes' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// Leitura de dados

router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find()

    res.status(200).json(plants)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const plant = await Plant.findOne({ _id: id })

    if (!plant) {
      res.status(422).json({ message: 'Plant not found by this id' })
      return
    }

    res.status(200).json(plant)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Atualização de dados

router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const {
    name,
    description,
    imageUrl,
    listPrice,
    price,
    installmentsQuantity,
    installmentsValue
  } = req.body

  const plant = {
    name,
    description,
    imageUrl,
    listPrice,
    price,
    installmentsQuantity,
    installmentsValue
  }

  try {
    const updatedPlant = await Plant.updateOne({ _id: id }, plant)

    if (updatedPlant.matchedCount === 0) {
      res.status(422).json({ message: 'Plant not found by this id' })
      return
    }

    res.status(200).json(plant)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//Deletar dados

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const plant = await Plant.findOne({ _id: id })

  if (!plant) {
    res.status(422).json({ message: 'Plant not found by this id' })
    return
  }

  try {
    await Plant.deleteOne({ _id: id })

    res.status(200).json({ message: 'Deleted with success' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
