const { Sequelize, DataTypes } = require('sequelize')
const postgresSequelize = require('../connector/postgres/index')
const Product = require('../models/product').Product

const Vendor = postgresSequelize.define('vendor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'compositeIndex',
    primaryKey: true,
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
})

Vendor.hasMany(Product)
Product.belongsTo(Vendor, {
  foreignKey: {
    name: 'group_id',
  },
})

Vendor.sync({ after: true })
