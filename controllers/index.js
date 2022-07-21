const Plant = require('../models/plant')

const createPlant = async (req, res) => {
  try {
    const plant = await new Plant(req.body)
    await plant.save()
    return res.status(201).json({
      plant,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find()
    return res.status(200).json({ plants })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getPlantById = async (req, res) => {
  try {
    const { id } = req.params
    const plant = await Plant.findById(id)
    if (plant) {
      return res.status(200).json({ plant })
    } else {
      return res.status(404).send(`${req.params} does not correspond to any plant in this database.`)
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updatePlantById = async (req, res) => {
  try {
    const { id } = req.params
    const plant = await Plant.findByIdAndUpdate(id, req.body, { new: true})
    res.status(200).json(plant)
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const deletePlantById = async (req, res) => {
  try {
    const { id } = req.params
    const deletedPlant = await Plant.findByIdAndDelete(id)
    if (deletedPlant) {
      return res.status(200).send("Plant deleted!")
    } else {
      throw new Error("Plant not found!")
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createPlant,
  getAllPlants,
  getPlantById,
  updatePlantById,
  deletePlantById
}