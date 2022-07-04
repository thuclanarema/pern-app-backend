'use strict'
const ResponseHandler = require('../helpers/responseHandler')
const cloudinary = require('./../models/cloudinary'),
  path = require('path')
module.exports = {
  uploadSingleFile: async (req, res) => {
    //req.file.path chính là đường dẫn của file khi upload bằng multer
    let img = await cloudinary.uploadSingle(req.file.path)
    console.log('img', img)

    return res.json({ file: req.file, img })
    // return ResponseHandler.success(res, { file: req.file, img })
  },
  //up multiple files
  uploadMultipleFiles: async (req, res) => {
    //req.files chính là khi upload multiple images
    for (let i = 0; i < req.files.length; i++) {
      // await cloudinary.uploadMultiple(req.files[i].path)
      let img = await cloudinary.uploadSingle(req.files[i].path)
    }

    res.json({ files: req.files })
    console.log('first', { files: req.files })

    // let res_promises = req.files.map(
    //   (file) =>
    //     new Promise((resolve, reject) => {
    //       cloudinary.uploadMultiple(file.path).then((result) => {
    //         resolve(result)
    //         console.log('file.path', file.path)
    //       })
    //     }),
    // )
    // console.log('res_promises', res_promises)

    // // Promise.all get imgas
    // return Promise.all(res_promises)
    //   .then(() => {
    //     //arrImg chính là array mà chúng ta đã upload
    //     // các bạn có thể sử dụng arrImg để save vào database, hay hơn thì sử dụng mongodb
    //     res.json(req.files)
    //     console.log('req.files', req.files)
    //   })
    //   .catch((error) => {
    //     console.error('> Error>', error)
    //   })
  },
}
