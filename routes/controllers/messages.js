const { Messages } = require('../../db');

const getAllMessages = () =>
  Messages.findAll({
    attributes: ['timeStamp', 'message', 'poster'],
  });

const createMessage = (timeStamp, message, poster) =>
  Messages.create({
    timeStamp,
    message,
    poster,
  });

module.exports = { getAllMessages, createMessage };
