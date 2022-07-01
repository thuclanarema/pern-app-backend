const express = require('express')
const router = express.Router()
const Controller = require('./../controllers/product')
// console.log('Controller', Controller.find)
// console.log('Controller', Controller.update(1))
// console.log('Controller', Controller.findById())
// console.log('Controller', Controller.update())
// console.log('Controller', Controller.delete())

router.get('/', Controller.find)
router.post('/', Controller.create)
router.get('/:id', Controller.findById)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

module.exports = router
