const { Messages } = require('../../db');

const getAllMessages = () =>
  Messages.findAll({
    attributes: ['timeStamp', 'message'],
  });

const createMessage = (timeStamp, message) =>
  Messages.create({
    timeStamp,
    message,
  });

module.exports = { getAllMessages, createMessage };
