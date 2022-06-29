const ResponseHandler = require('../helpers/responseHandler')

const create = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body

  // validate
  let paramObj = { first_name, last_name, email, password }
  let paramKeys = Object.keys(paramObj)
  for (let i = 0, leng = paramKeys.length; i < leng; i++) {
    if (!paramObj[paramKeys[i]]) {
      return ResponseHandler.error(res, {
        message: `Bad request. Field ${paramKeys[i]} cannot be blank`,
        field: paramKeys[i],
      })
    }
  }

  next()
}

const login = async (req, res, next) => {
  const { username, password } = req.body

  // validate
  let paramObj = { username, password }
  let paramKeys = Object.keys(paramObj)
  for (let i = 0, leng = paramKeys.length; i < leng; i++) {
    if (!paramObj[paramKeys[i]]) {
      return ResponseHandler.error(res, {
        message: `Bad request. Field ${paramKeys[i]} cannot be blank`,
        field: paramKeys[i],
      })
    }
  }

  next()
}

module.exports = {
  create,
  login,
}
