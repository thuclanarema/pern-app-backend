const { Sequelize, DataTypes } = require('sequelize')
const postgresSequelize = require('../connector/postgres/index')

const Product = postgresSequelize.define(
  'product',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.JSON,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
)

Product.prototype.toJSON = function () {
  var values = Object.assign({}, this.get())

  return values
}
//  This creates the table if it doesn't exist (and does nothing if it already exists)
Product.sync()
// console.log('Product', Product)
const find = async (filter) => {
  try {
    console.log('filter', filter)
    return await Product.findAll(filter)
  } catch (error) {
    throw error
  }
}

const findById = async (id) => {
  try {
    let res = await Product.findOne({ where: { id } })
    if (!res) {
      throw new Error('Not found')
    }
    return res
  } catch (error) {
    throw err
  }
}

const create = async (data) => {
  try {
    return await Product.create(data)
  } catch (error) {
    throw error
  }
}

const update = async ({ id, data }) => {
  try {
    await findById(id)
    res = await Product.update(data, { where: { id }, returning: true, plain: true })
    return res[1]
  } catch (error) {
    throw error
  }
}
const _delete = async (id) => {
  try {
    await findById(id)
    return await Product.destroy({ where: { id } })
  } catch (error) {
    throw error
  }
}

module.exports = {
  Product,
  find,
  findById,
  create,
  update,
  delete: _delete,
}
