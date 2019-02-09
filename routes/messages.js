const express = require('express');

const { getAllMessages, createMessage } = require('./controllers/messages');

const apiMessages = express.Router();

apiMessages.get('/', (req, res) => {
  getAllMessages().then(messages => {
    res.status(200).send(messages);
  });
});

apiMessages.post('/', (req, res) =>
  !req.body.timeStamp || !req.body.message
    ? res.status(400).send({
        success: false,
        message: 'timeStamp and message required',
      })
    : createMessage(req.body.timeStamp, req.body.message, req.body.poster)
        .then(() =>
          res.status(201).send({
            success: true,
            message: 'message posted',
          })
        )
        .catch(err => {
          console.log(`💥 Failed to post message : ${err.stack}`);
          return res.status(500).send({
            success: false,
            message: `${err.name} : ${err.message}`,
          });
        })
);

module.exports = apiMessages;
