const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const expressPino = require('express-pino-logger');
const logger = require('../util/logger');

const api = express();
const apiRoutes = express.Router();

const { isAuthenticated, initAuth } = require('../middlewares/auth.middleware');
const apiLogin = require('./auth.route');
const { apiUser } = require('./user.route');
const { apiUserProtected } = require('./user.route');
const { apiMessageProtected } = require('./message.route');

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(helmet());
api.use(cors());
if (process.env.NODE_ENV !== 'test') {
    api.use(expressPino({ logger }));
}

initAuth();

apiRoutes.get('/', (req, res) => {
    res.status(200).send({ message: `Hello from my awesome API !` });
});

apiRoutes
    .use('/login', apiLogin)
    .use('/users', apiUser)
    .use(isAuthenticated)
    .use('/users', apiUserProtected)
    .use('/messages', apiMessageProtected);

api.use('/api/v1', apiRoutes);

module.exports = api;
