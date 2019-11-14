const express = require('express');

const authController = require('../controllers/auth.controller');

const apiAuth = express.Router();

apiAuth.post('/login', authController.login);

module.exports = apiAuth;
