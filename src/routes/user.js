const express = require('express')
const router = express.Router()
const Controller = require('../controllers/user')
const UserValidator = require('../validator/user')
const AuthValidator = require('../validator/auth')
const MulterUpload = require('../config/multer')

router.get('/', Controller.find)
router.post('/', MulterUpload.single('avatar'), UserValidator.create, Controller.create)
router.get('/me', AuthValidator.verifyToken, Controller.getUserByToken)
router.post('/login', UserValidator.login, Controller.login)
router.get('/:id', Controller.findById)
router.put('/:id', MulterUpload.single('avatar'), Controller.update)
router.delete('/:id', Controller.delete)

module.exports = router
