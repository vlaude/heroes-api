const express = require('express');

const messageController = require('../controllers/message.controller');

const apiMessage = express.Router();
const apiMessageProtected = express.Router();

apiMessageProtected.get('/', messageController.getAllMessage);
apiMessageProtected.post('/', messageController.createMessage);

module.exports = { apiMessage, apiMessageProtected };
