const express = require('express')
const router = express.Router()
const MulterUpload = require('../config/multer')
const productController = require('../controllers/upload')

router.post('/single', MulterUpload.single('file'), productController.uploadSingleFile)

router.post('/multiple', MulterUpload.array('files', 10), productController.uploadMultipleFiles)

module.exports = router
