const cloudinary = require('cloudinary').v2

exports.uploadFiles = (file) => cloudinary.uploader(file)
