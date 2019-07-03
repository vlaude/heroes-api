const express = require('express');

const config = require('../config');
const userController = require('../controllers/user.controller');
const { allowOnly } = require('../middlewares/auth.middleware');

const apiUser = express.Router();
const apiUserProtected = express.Router();

apiUser.post('/', userController.createUser);

apiUserProtected.get('/', allowOnly(config.accessLevels.ADMIN, userController.getAllUsers));
apiUserProtected.get('/:id', userController.getUserById);

module.exports = { apiUser, apiUserProtected };
