const Model = require('./../models/product')

const find = async (req) => {
  try {
    const { filter } = req.query
    return await Model.find(filter ? JSON.parse(filter) : {})
  } catch (error) {
    throw error
  }
}

const findById = async (req) => {
  try {
    const { id } = req.params

    return await Model.findById(id)
  } catch (error) {
    throw error
  }
}

const create = async (req) => {
  try {
    let data = { ...req.body }

    return await Model.create(data)
  } catch (error) {
    throw error
  }
}

const update = async (req) => {
  try {
    const { id } = req.params
    const data = { ...req.body }
    console.log('{ id, data }', { id, data })
    return await Model.update({ id, data })
  } catch (error) {
    throw error
  }
}

const _delete = async (req) => {
  try {
    const { id } = req.params
    return await Model.delete(id)
  } catch (error) {
    throw error
  }
}

const upLoadImage = async (req) => {}

module.exports = {
  find,
  findById,
  create,
  update,
  delete: _delete,
  upLoadImage,
}
