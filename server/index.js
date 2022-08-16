const express = require('express');

const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const PORT = 4000;


app.use(cors())

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
    socket.on('message', (data) => {
        // console.log(data);
        socketIO.emit('messageResponse', data);
      });
});


app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});