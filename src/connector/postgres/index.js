require('dotenv').config()

const pg = require('pg')
const { Client } = pg

const postgresQuery = async (sql) => {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PWD,
    port: process.env.POSTGRES_PORT,
  })
  client.connect()

  try {
    return await client.query(sql)
  } catch (error) {
    throw error
  } finally {
    client.end()
  }
}

/**
 * Test
 */
const __test__ = async () => {
  try {
    let res = await postgresQuery(
      `select * from information_schema.tables where table_schema = 'public';`,
    )
    console.log('__test__ postgresQuery tables :>> ', res.rows)
  } catch (error) {
    console.log('__test__ postgresQuery error :>> ', error.message)
  }
}
// __test__()

module.exports = postgresQuery
