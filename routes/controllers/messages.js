const { Messages } = require('../../db');

const getAllMessages = () =>
    Messages.findAll({
        attributes: ['timeStamp', 'message']
    });

module.exports = { getAllMessages };
