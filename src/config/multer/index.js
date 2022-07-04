const multer = require('multer')
const path = require('path')
const MulterUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, 'public/uploads/')
      } else {
        cb({ message: 'This file is not an image file' }, false)
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
  }),
})

module.exports = MulterUpload
