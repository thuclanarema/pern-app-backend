const express = require('express')
const router = express.Router()
const Controller = require('./../controllers/product')
const productController = require('../controllers/upload')
const MulterUpload = require('../config/multer')

router.get('/', Controller.find)

router.post(
  '/',
  MulterUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'photos', maxCount: 8 },
  ]),
  Controller.create,
)
// Khi MulterUpload run thi no se send image to local => Den Controller => Service Upload len cloudinary
router.get('/:id', Controller.findById)
router.put(
  '/:id',
  MulterUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'photos', maxCount: 8 },
  ]),
  Controller.update,
)
router.delete('/:id', Controller.delete)

module.exports = router
