const express = require('express');

const { getAllMessages } = require('./controllers/messages');

const apiMessages = express.Router();

apiMessages.get('/', (req, res) => {
    getAllMessages().then(messages => {
        res.status(200).send({
            success: true,
            profile: messages,
            message: 'messages retrieved with success'
        })
    })
});

module.exports =  apiMessages;
