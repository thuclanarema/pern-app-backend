const generateSlug = require('../helpers/generateSlug')
const Repository = require('./../repositories/user')

const find = async (req) => {
  try {
    const { page, limit, keyword } = req.query

    return await Repository.find({ page, limit, keyword })
  } catch (error) {
    throw error
  }
}

const findById = async (req) => {
  try {
    const { id } = req.params

    return await Repository.findById(id)
  } catch (error) {
    throw error
  }
}

const create = async (req) => {
  try {
    let data = { ...req.body }

    data.username = data.username
      ? data.username
      : generateSlug(data.first_name + '-' + data.last_name)

    return await Repository.create(data)
  } catch (error) {
    throw error
  }
}

const update = async (req) => {
  try {
    const { id } = req.params
    const data = { ...req.body }

    return await Repository.update({ id, data })
  } catch (error) {
    throw error
  }
}

const _delete = async (req) => {
  try {
    const { id } = req.params

    return await Repository.delete(id)
  } catch (error) {
    throw error
  }
}

const login = async (req) => {
  try {
    const { username, password } = req.body

    return await Repository.login({ username, password })
  } catch (error) {
    throw error
  }
}

const getUserByToken = async (req) => {
  try {
    const { authorization } = req.headers

    return await Repository.getUserByToken(authorization)
  } catch (error) {
    throw error
  }
}

module.exports = {
  find,
  findById,
  create,
  update,
  delete: _delete,
  login,
  getUserByToken,
}
