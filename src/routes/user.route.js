const express = require('express');

const userController = require('../controllers/user.controller');

const apiUser = express.Router();
const apiUserProtected = express.Router();

apiUser.post('/', userController.createUser);

apiUserProtected.get('/', userController.getAllUsers);
apiUserProtected.get('/:id', userController.getUserById);

module.exports = { apiUser, apiUserProtected };
