const express = require('express');

const userController = require('../controllers/user.controller');

const apiUser = express.Router();

apiUser.get('/', userController.getAllUsers);
apiUser.get('/:id', userController.getUserById);
apiUser.post('/', userController.createUser);

module.exports = apiUser;
