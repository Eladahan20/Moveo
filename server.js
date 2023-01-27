const express = require('express');
const request = require('request');
const path = require('path');
const readXlsxFile = require("read-excel-file/node");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const WebSocket = require('ws')


API_URL = 'https://randomuser.me/api/';

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', (event) => {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
});

// File path.
const port = process.env.PORT || 8080;
const app = express();
// app.get('/', (req, res) => {
//   request('API_URL', (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       res.send(body);
//     }
//   });
// });
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

app.get('/data', (req, res) => {
    request(API_URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send(body);
      } else {
        res.send("An error occurred while fetching data.")
      }
    });
  });

  app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    const stream = fs.createReadStream(file.path);
    stream.on('data', (chunk) => {
      console.log(chunk)
    });
  stream.on('end', () => {
      console.log('End')
  });
});

app.use("/static", express.static('./static/'));

app.listen(port, () => {
  console.log('Server started');
});
