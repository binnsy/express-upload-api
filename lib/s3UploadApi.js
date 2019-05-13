require('dotenv').config()
const AWS = require('aws-sdk')
//
// const s3 = new AWS.S3()
const fs = require('fs')
const s3 = new AWS.S3()

// const mime = require('mime-types')
// const mimeType = mime.lookup(process.argv[2])
// const extension = mime.extension(mimeType)

const promiseReadFile = function (fileObj) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileObj.path, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const promiseS3Upload = function (params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}
// promiseReadFile()
//   .then(fileData => ({
//     Key: fileObj.filename,
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Body: fileData,
//     ACL: 'public-read',
//     ContentType: fileObj.mimeType
//   }))
// .then(params => {
//   s3.upload(params, (err, data) => {
//     if (err) {
//       return err
//     }
//     return data
//   })
// })
// .then(data => {
//   console.log('*******')
//   console.log(data)
//   console.log('*******')
// })
// .catch(console.err)

module.exports = {
  promiseReadFile,
  promiseS3Upload
}
