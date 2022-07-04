const ResponseHandler = require('../helpers/responseHandler')
const Service = require('./../services/product')

const find = async (req, res) => {
  try {
    const data = await Service.find(req)
    return ResponseHandler.success(res, data)
  } catch (error) {
    console.log(error)
    return ResponseHandler.error(res, error)
  }
}

const findById = async (req, res) => {
  try {
    const data = await Service.findById(req)
    return ResponseHandler.success(res, data)
  } catch (error) {
    console.log(error)
    return ResponseHandler.error(res, error)
  }
}

const create = async (req, res) => {
  try {
    const data = await Service.create(req)
    return ResponseHandler.success(res, data)
  } catch (error) {
    console.log(error)
    return ResponseHandler.error(res, error)
  }
}

const update = async (req, res) => {
  try {
    const data = await Service.update(req)
    return ResponseHandler.success(res, data)
  } catch (error) {
    console.log(error)
    return ResponseHandler.error(res, error)
  }
}

const _delete = async (req, res) => {
  try {
    const data = await Service.delete(req)
    return ResponseHandler.success(res, data)
  } catch (error) {
    console.log(error)
    return ResponseHandler.error(res, error)
  }
}

const upLoadImage = async (req, res) => {}

module.exports = {
  find,
  findById,
  create,
  update,
  delete: _delete,
  upLoadImage,
}
