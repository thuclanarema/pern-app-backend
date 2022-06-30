const express = require('express')
const router = express.Router()
const MulterUpload = require('../config/multer')

router.post('/single', MulterUpload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

  res.send(req.file)
})

router.post('/multiple', MulterUpload.array('files', 10), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any

  res.send(req.files)
})

module.exports = router
