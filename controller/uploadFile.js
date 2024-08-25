const multer = require('multer')
const fs = require('fs')

const upload = multer({ dest: 'uploads/' })
const uploadFile = async (req, res, next) => {
    console.log("hello")
}

module.exports = uploadFile