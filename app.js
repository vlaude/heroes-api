const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

require('./db');

app.get('/', (req, res) => {
    res.send('Hello World');
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
        console.log(message);
        io.emit('new-message', message);
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('🏋  Server listening on port 3000 ...');
});
