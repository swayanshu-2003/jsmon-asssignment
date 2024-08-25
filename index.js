const express = require('express')
const router = require('./router/router')
const multer = require('multer')
const fs = require('fs')
var path = require('path');
const app = express()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(express.json())

app.post("/uploadFile", upload.single('file'), async (req, res) => {

    const file = req.file;
    const filePath = path.join(__dirname, "uploads", req?.file?.filename)
    console.log(filePath)



    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.log(err)
            return;
        }
        let lines = data.split('\n');
        const chunkSize = Math.ceil(lines?.length / 5);
        const chunks = [];

        for (let i = 0; i < 5; i++) {
            chunks.push(lines.slice(i * chunkSize, (i + 1) * chunkSize));
        }

        chunks.forEach((chunk, index) => {
            chunks[index] = chunk?.map((line) => `R${line}`);
        })

        chunks.forEach((chunk, index) => {
            chunks[index] = chunk?.map((line) => `2${line}`);
        })

        const processedData = chunks?.flat().join("\n");

        const newFilePath = path.join(__dirname, 'uploads', `processed-${req.file?.originalname}`);

        fs.writeFile(newFilePath, processedData, (err) => {
            if (err) {
                console.log(err)
                return;
            }
            res.status(200).json({
                message: "file uploaded successfully in chunks"
            })
        })

    })


})

app.listen(1337, () => {
    console.log("server started at port 1337")
})