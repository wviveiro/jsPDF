'use strict'

/**
 * The reference server collects and saves reference PDFs for the tests.
 */
const http = require('http')
const PORT = 9090
const fs = require('fs')

const cors = require('cors')
const express = require('express')

const app = express()
//const multer = require('multer')
//const upload = multer({ dest: 'uploads/' })
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.raw({ limit: 100000000}))

app.post('/*', function (req, res, next) {
  var buf = new Buffer(('' + req.body).replace('data:application/pdf;base64,', ''), 'base64'); // decode
   console.log('🙌 Creating reference PDF ' + req.url + '.')
  fs.writeFile('./' + req.url, buf, function(err) {
    if(err) {
      console.log("err", err);
    } else {
      return res.json({'status': 'success'});
    }
  }) 
  // fs.createReadStream(req.file.path)
  //   .pipe(fs.createWriteStream('./' + req.url))
})

var port = 3000
app.listen(PORT, function () {
  console.log(`Server listening on: http://localhost:${PORT}`)
})
// Create a server
// const server = http.createServer((request, response) => {
//   console.log(request.url)
//
//   const wstream = fs.createWriteStream('./' + request.url)
//   console.log('🙌 Creating reference PDF ' + request.url + '.')
//   request.on('data', (chunk) => {
//     //console.log(chunk.toString('hex'))
//     wstream.write(chunk)
//   })
//   request.on('end', () => {
//     wstream.end()
//   })
//   response.end('Test has sent reference PDF for ' + request.url)
// })
//
// // Lets start our server
// server.listen(PORT, () => {
//   console.log(`Server listening on: http://localhost:${PORT}`)
// })
