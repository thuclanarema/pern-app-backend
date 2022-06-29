const postgresQuery = require('../connector/postgres')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { JWT_SECRET, JWT_EXPIRATION } = process.env

const SELECT_FIELDS = `id,first_name,last_name,email,username,genre,birthday,role,created_at,updated_at`

const init = async () => {
  try {
    await postgresQuery(`
      create table if not exists Users (
        id serial not null primary key,
        first_name varchar not null,
        last_name varchar not null,
        email varchar not null unique,
        username varchar not null unique,
        password varchar not null,
        genre boolean not null default false,
        birthday date,
        role varchar default 'GUEST',
        created_at timestamp without time zone not null,
          updated_at timestamp without time zone
      );
    `)
    console.log('User table init success')
    return
  } catch (error) {
    throw error
  }
}

const find = async ({ page, limit, keyword }) => {
  try {
    let _page = parseInt(page) || 1
    let _limit = parseInt(limit) || 20
    let _offset = (_page - 1) * _limit

    let _where = ''

    return new Promise((resolve, reject) => {
      let prom0 = new Promise((_resolve, _reject) => {
        let query = `select count(*) from users ${_where};`
        postgresQuery(query)
          .then((res) => _resolve(res.rows[0]))
          .catch((err) => _reject(err))
      })

      let prom1 = new Promise((_resolve, _reject) => {
        let query = `select ${SELECT_FIELDS} from users ${_where} order by created_at desc limit ${_limit} offset ${_offset};`
        postgresQuery(query)
          .then((res) => _resolve(res.rows))
          .catch((err) => _reject(err))
      })

      Promise.all([prom0, prom1])
        .then((values) => {
          let count = values[0].count
          let items = values[1]

          let payload = {
            items,
            page: _page,
            limit: _limit,
            totalItems: parseInt(count),
            totalPages: Math.ceil(count / _limit),
          }

          resolve(payload)
        })
        .catch((err) => reject(err))
    })
  } catch (error) {
    throw error
  }
}

const findById = async (id) => {
  try {
    let query = `select ${SELECT_FIELDS} from users where id = ${id};`
    let res = await postgresQuery(query)
    if (res.rowCount) {
      return res.rows[0]
    } else {
      throw new Error('Not found')
    }
  } catch (error) {
    throw error
  }
}

const create = async (data) => {
  try {
    // generate password encode
    const salt = bcrypt.genSaltSync(10)
    const passwordEncode = bcrypt.hashSync(data.password, salt)
    data.password = passwordEncode

    let str = `(created_at`
    Object.keys(data).forEach((key) => (str += `, ${key}`))
    str += `) values (now()`
    Object.keys(data).forEach((key) => (str += `, '${data[key]}'`))
    str += `)`

    let query = `insert into users ${str} returning ${SELECT_FIELDS};`
    let res = await postgresQuery(query)

    return res.rows[0]
  } catch (error) {
    throw error
  }
}

const update = async ({ id, data }) => {
  try {
    let str = `updated_at = now()`
    Object.keys(data).forEach((key) => (str += `, ${key} = '${data[key]}'`))

    let query = `update users set ${str} where id = ${id} returning ${SELECT_FIELDS};`
    let res = await postgresQuery(query)

    return res.rows[0]
  } catch (error) {
    throw error
  }
}

const _delete = async (id) => {
  try {
    let query = `delete from users where id = ${id};`
    return await postgresQuery(query)
  } catch (error) {
    throw res
  }
}

const login = async ({ username, password }) => {
  try {
    let user = null

    if (!user) {
      user = await postgresQuery(`select * from users where username = '${username}';`)
      user = user.rows[0]
    }
    if (!user) {
      user = await postgresQuery(`select * from users where email = '${username}';`)
      user = user.rows[0]
    }
    if (!user) {
      throw new Error('Username or Password incorrect')
    }

    const passwordCompare = await bcrypt.compareSync(password, user.password)
    if (!passwordCompare) {
      throw new Error('Username or Password incorrect')
    }

    const token = await jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    })

    delete user.password

    return { user, token }
  } catch (error) {
    throw error
  }
}

const getUserByToken = async (token) => {
  try {
    const bearerToken = token.replace(/Bearer/g, '').replace(/\s/g, '')
    const decoded = await jwt.verify(bearerToken, JWT_SECRET)

    if (decoded.email) {
      let user = await postgresQuery(`select * from users where email = '${decoded.email}';`)
      user = user.rows[0]
      if (!user) {
        throw new Error('Unauthorized')
      }
      if (user.email === decoded.email) {
        delete user.password

        return user
      }
    }

    throw new Error('Unauthorized')
  } catch (error) {
    throw error
  }
}

module.exports = {
  init,
  find,
  findById,
  create,
  update,
  delete: _delete,
  login,
  getUserByToken,
}
