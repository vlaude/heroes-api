const http = require('http');
const socketIO = require('socket.io');

const api = require('./routes/routes');
const server = http.Server(api);
const io = socketIO(server);

require('./db');

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
