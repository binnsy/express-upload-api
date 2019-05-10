require('dotenv').config()
const AWS = require('aws-sdk')

const s3 = new AWS.S3()

const params = {
  Key: 'filename',
  Bucket: 'alice-wdi-bucket',
  Body: 'hello',
  ACL: 'public-read'
}
s3.upload(params, (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(data)
})
