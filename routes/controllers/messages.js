const { Messages } = require('../../db/models/messages');

const getAllMessages = () =>
    Messages.findAll();

module.exports = { getAllMessages };
