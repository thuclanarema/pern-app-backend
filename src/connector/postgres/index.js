require('dotenv').config()

const { Sequelize } = require('sequelize')

const { POSTGRES_USER, POSTGRES_PWD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = process.env

const postgresSequelize = new Sequelize(
  `postgres://${POSTGRES_USER}:${POSTGRES_PWD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
)

const __test__ = async () => {
  try {
    await postgresSequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
__test__()

module.exports = postgresSequelize
