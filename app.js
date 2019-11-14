const http = require('http');
const socketIO = require('socket.io');

const api = require('./routes/routes');

const server = http.Server(api);
const io = socketIO(server);

const db = require('./db');
const {
  sayNewUserConnected,
  sayNewUserDisconnected,
} = require('./services/io-server.service');
const { createMessage } = require('./routes/controllers/messages');

io.on('connection', socket => {
  socket.on('user-connected', user => {
    sayNewUserConnected(io, user);
  });
  socket.on('user-disconnected', user => {
    sayNewUserDisconnected(io, user);
  });
  socket.on('new-message', message => {
    io.emit('new-message', message);
    createMessage(message.timeStamp, message.message, message.poster);
  });
});

db.sequelize
  .sync()
  .then(() =>
    server.listen(process.env.PORT || 3000, () => {
      console.log('🏋 Server listening on port 3000 ...');
    })
  )
  .catch(err => console.log(`🔥 Failed to connect database : ${err.stack}`));