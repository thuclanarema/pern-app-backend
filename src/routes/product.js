const express = require('express')
const router = express.Router()
const Controller = require('./../controllers/product')

router.get('/', Controller.find)
router.post('/', Controller.create)
router.get('/:id', Controller.findById)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

module.exports = router
