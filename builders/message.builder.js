const { Messages, Users } = require('../../db');

const getAllMessages = () =>
  Messages.findAll({
    attributes: ['timeStamp', 'message'],
    include: [
      {
        model: Users,
        as: 'poster',
        attributes: ['id', 'username'],
      },
    ],
  });

const createMessage = (timeStamp, message, poster) => {
  return Messages.create({
    timeStamp,
    message,
    posterId: poster.id,
  });
};

module.exports = { getAllMessages, createMessage };
