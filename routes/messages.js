const express = require('express');

const { getAllMessages } = require('./controllers/messages');

const apiMessages = express.Router();

apiMessages.get('/', (req, res) => {
  getAllMessages().then(messages => {
    res.status(200).send(messages);
  });
});

module.exports = apiMessages;
