var cloudinary = require('cloudinary').v2
//lấy trong https://cloudinary.com/console/welcome
cloudinary.config({
  cloud_name: 'arenacommerce',
  api_key: '623485233856724',
  api_secret: 'A_BY4KGfZUYXStFIik9OYywZmMs',
})
module.exports = {
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
            resolve(result)
          }
        })
    })
  },
  uploadMultiple: (files) => {
    return new Promise((resolve) => {
      cloudinary.uploader
        .upload(files, {
          folder: 'uploads',
        })
        .then((result) => {
          if (result) {
            const fs = require('fs')
            fs.unlinkSync(files)
            console.log('result', result)
            resolve({
              url: result.url,
              id: result.public_id,
              thumb1: reSizeImage(result.public_id, 200, 200),
              main: reSizeImage(result.public_id, 500, 500),
              thumb2: reSizeImage(result.public_id, 300, 300),
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
}
