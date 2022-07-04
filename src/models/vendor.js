const { Sequelize, DataTypes } = require('sequelize')
const postgresSequelize = require('../connector/postgres/index')

const Vendor = postgresSequelize.define('vendor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'compositeIndex',
    primaryKey: true,
  },
})
