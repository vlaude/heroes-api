const express = require('express');

const loginController = require('../controllers/auth.controller');

const apiLogin = express.Router();

apiLogin.post('/', loginController.loginUser);

module.exports = apiLogin;
