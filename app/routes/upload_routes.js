
const express = require('express')
const s3UploadFile = require('../../lib/s3UploadApi')
const Upload = require('../models/upload')
const multer = require('multer')
const multerUpload = multer({ dest: 'uploads/' })
require('dotenv').config()
// const AWS = require('aws-sdk')

// const s3 = new AWS.S3()

const router = express.Router()

// CREATE
// POST /uploads
router.post('/uploads', multerUpload.single('image'), (req, res, next) => {
  // console.log('===========')
  // console.log(req.file)
  // console.log('===========')
  s3UploadFile.promiseReadFile(req.file)
    .then(fileData => ({
      Key: req.file.filename,
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: fileData,
      ACL: 'public-read',
      ContentType: req.file.mimeType
    }))
    .then(s3UploadFile.promiseS3Upload)
    .then(s3Response => {
      return Upload.create({url: s3Response.Location, filename: req.file.originalname})
    })
    .then(uploadDocument => {
      res.status(201).json({ upload: uploadDocument.toObject() })
    })
    .catch(next)
})
// params => {
//   return s3.upload(params, (err, data) => {
//     if (err) {
//       console.log(err)
//       return
//     }
//     Upload.create({ url: data.Location, filename: req.file.originalname })
//   })
// })

// .catch(console.err)
// Upload.create(req.body.upload)
//   .then(upload => {
//     res.status(201).json({ upload: upload.toObject() })
//   })
//   .catch(next)

module.exports = router
