const express = require('express');

const { getAllMessages } = require('../builders/message.builder');

const apiMessages = express.Router();

apiMessages.get('/', (req, res) => {
  getAllMessages().then(messages => {
    res.status(200).send(messages);
  });
});

module.exports = apiMessages;
