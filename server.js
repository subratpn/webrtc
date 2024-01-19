const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(express.static('public'));


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('offer', (offer) => {
    console.log('Forwarding Offer : ' + JSON.stringify(offer));
    // Forward the offer to the other peer
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    console.log('Forwarding Answer : ' + JSON.stringify(answer));
    // Forward the answer to the other peer
    socket.broadcast.emit('answer', answer);
  });

  socket.on('ice-candidate', (candidate) => {
    // Forward the ICE candidate to the other peer
    socket.broadcast.emit('ice-candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
