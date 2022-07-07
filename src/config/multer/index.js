const multer = require('multer')

const MulterUpload = multer({ dest: 'public/uploads/' })

module.exports = MulterUpload
