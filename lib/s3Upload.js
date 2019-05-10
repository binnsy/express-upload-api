require('dotenv').config()
const AWS = require('aws-sdk')

const s3 = new AWS.S3()
const fs = require('fs')

const mime = require('mime-types')
const mimeType = mime.lookup(process.argv[2])
const extension = mime.extension(mimeType)

const promiseReadFile = function () {
  return new Promise((resolve, reject) => {
    fs.readFile(process.argv[2], (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

promiseReadFile()
  .then(fileData => ({
    Key: `${Date.now()}.${extension}`,
    Bucket: 'alice-wdi-bucket',
    Body: fileData,
    ACL: 'public-read',
    ContentType: mimeType
  }))
  .then(params => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(data)
    })
  })
  .catch(console.err)
