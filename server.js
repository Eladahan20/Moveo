const express = require('express');
const request = require('request');
const path = require('path');
const WebSocket = require('ws')


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

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });


  
app.use("/static", express.static('./static/'));

app.listen(port, () => {
  console.log('Server started');
});
