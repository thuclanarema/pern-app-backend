var cloudinary = require('cloudinary').v2
//lấy trong https://cloudinary.com/console/welcome
cloudinary.config({
  cloud_name: 'arenacommerce',
  api_key: '623485233856724',
  api_secret: 'A_BY4KGfZUYXStFIik9OYywZmMs',
})

var self = (module.exports = {
  uploadSingle: (file) => {
    return new Promise((resolve) => {
      cloudinary.uploader
        .upload(file, {
          folder: 'uploads',
        })
        .then((result) => {
          if (result) {
            const fs = require('fs')
            fs.unlinkSync(file)
            resolve({
              url: result.secure_url,
            })
          }
        })
    })
  },
  uploadMultiple: (file) => {
    return new Promise((resolve) => {
      cloudinary.uploader
        .upload(file, {
          folder: 'uploads',
        })
        .then((result) => {
          if (result) {
            const fs = require('fs')
            fs.unlinkSync(file)
            resolve({
              url: result.secure_url,
              id: result.public_id,
              thumb1: self.reSizeImage(result.public_id, 200, 200),
              main: self.reSizeImage(result.public_id, 500, 500),
              thumb2: self.reSizeImage(result.public_id, 300, 300),
            })
          }
        })
    })
  },
  reSizeImage: (id, h, w) => {
    return cloudinary.url(id, {
      height: h,
      width: w,
      crop: 'scale',
      format: 'jpg',
    })
  },
})
