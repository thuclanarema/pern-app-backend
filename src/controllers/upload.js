'use strict'
const cloudinary = require('./../models/cloudinary')
module.exports = {
  uploadSingleFile: async (req, res) => {
    //req.file.path chính là đường dẫn của file khi upload bằng multer
    cloudinary.uploadSingle(req.file.path).then((result) => {
      console.log('result :>> ', result)
      let imageDetails = {
        cloudImage: result.url,
      }
    })
    res.json(req.file)
    console.log('req.file', req.file)
  },
  //up multiple files
  uploadMultipleFiles: async (req, res) => {
    //req.files chính là khi upload multiple images
    for (let i = 0; i < req.files.length; i++) {
      let img = cloudinary.uploadMultiple(req.files[i].path)
    }

    res.json({ files: req.files })

    console.log('files', { files: req.files })
  },
}
