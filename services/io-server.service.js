const { createMessage } = require('../routes/controllers/messages');
const { getUserByUsername } = require('../routes/controllers/users');

// TODO Store server somewhere ?
const sayNewUserConnected = (io, user) => {
  getUserByUsername('bbot').then(server => {
    const message = {
      message: `${user.username} is connected. Hello ${user.username} !`,
      poster: server,
      timeStamp: new Date(),
    };
    console.log(message.message);
    io.emit('new-message', message);
    createMessage(message.timeStamp, message.message, message.poster);
  });
};

const sayNewUserDisconnected = (io, user) => {
  getUserByUsername('bbot').then(server => {
    const message = {
      message: `${user.username} is disconnected. Bye ${user.username} !`,
      poster: server,
      timeStamp: new Date(),
    };
    console.log(message.message);
    io.emit('new-message', message);
    createMessage(message.timeStamp, message.message, message.poster);
  });
};

module.exports = { sayNewUserConnected, sayNewUserDisconnected };
