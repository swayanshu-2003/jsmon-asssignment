const express = require('express')
const uploadFile = require('../controller/uploadFile')

const router = express.Router()

router.post("/uploadFile", uploadFile)

module.exports = router